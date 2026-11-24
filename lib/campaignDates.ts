import {
  type CalendarDate,
  getLocalTimeZone,
  today,
} from "@internationalized/date";

export const CAMPAIGN_TIME_ZONE = "Africa/Nairobi";

// Today's date in Kenya, whatever the user's own time zone is.
export function todayInKenya(): CalendarDate {
  return today(CAMPAIGN_TIME_ZONE);
}

// Number of days a campaign runs, counting both the start and end day.
// 1 Dec → 30 Dec is 30 days.
export function campaignLength(start: CalendarDate, end: CalendarDate): number {
  return end.compare(start) + 1;
}

// "1 Dec 2026"
export function formatCampaignDate(date: CalendarDate): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date.toDate(getLocalTimeZone()));
}
