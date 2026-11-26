import type { CalendarDate } from "@internationalized/date";

// Everything the start-campaign wizard collects, across all steps.
// Add each step's fields here as the step gets built.
export interface CampaignData {
  // Step 1: Basics
  title: string;
  category: string;
  coverImage: File | null;

  // Step 2: Story
  story: string;

  // Step 3: Funding
  goal: number | null; // whole KES
  startDate: CalendarDate | null;
  endDate: CalendarDate | null;

  // Step 4: Rewards
  rewards: RewardTier[];
}

// One reward tier. `id` only exists in the browser, to give React a stable
// key; the database assigns the real id when the campaign is saved.
export interface RewardTier {
  id: string;
  title: string;
  amount: number | null; // whole KES
  description: string;
}
