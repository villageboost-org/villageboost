import type { CalendarDate } from "@internationalized/date";
import { campaignLength, todayInKenya } from "@/lib/campaignDates";

export const GOAL_MIN = 1_000; // KES
export const GOAL_MAX = 50_000_000; // KES
export const LENGTH_MIN = 7; // days

export type FundingErrors = {
  goal?: string;
  startDate?: string;
  endDate?: string;
};

export function validateGoal(goal: number | null): string | undefined {
  if (goal === null || Number.isNaN(goal)) return "Set a funding goal";
  if (!Number.isInteger(goal)) return "Use whole shillings, with no cents";
  if (goal < GOAL_MIN)
    return `Goal must be at least KES ${GOAL_MIN.toLocaleString()}`;
  if (goal > GOAL_MAX)
    return `Goal must be KES ${GOAL_MAX.toLocaleString()} or less`;
}

export function validateStartDate(
  start: CalendarDate | null,
): string | undefined {
  if (!start) return "Choose a start date";
  if (start.compare(todayInKenya()) < 0)
    return "Start date can't be in the past";
}

export function validateEndDate(
  start: CalendarDate | null,
  end: CalendarDate | null,
): string | undefined {
  if (!end) return "Choose an end date";
  if (!start) return; // the start date error covers this
  if (end.compare(start) <= 0) return "End date must be after the start date";
  const days = campaignLength(start, end);
  if (days < LENGTH_MIN)
    return `Campaigns must run for at least ${LENGTH_MIN} days`;
}

// An empty object means the step is valid.
export function validateFunding(data: {
  goal: number | null;
  startDate: CalendarDate | null;
  endDate: CalendarDate | null;
}): FundingErrors {
  const errors: FundingErrors = {};
  const goal = validateGoal(data.goal);
  const startDate = validateStartDate(data.startDate);
  const endDate = validateEndDate(data.startDate, data.endDate);
  if (goal) errors.goal = goal;
  if (startDate) errors.startDate = startDate;
  if (endDate) errors.endDate = endDate;
  return errors;
}
