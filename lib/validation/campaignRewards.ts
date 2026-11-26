export const MAX_TIERS = 6;
export const REWARD_TITLE_MIN = 10;
export const REWARD_AMOUNT_MIN = 100; // KES

type Tier = {
  id: string;
  title: string;
  amount: number | null;
  description: string;
};

export type TierErrors = {
  title?: string;
  amount?: string;
  description?: string;
};

// Errors for each tier, keyed by the tier's id.
export type RewardsErrors = Record<string, TierErrors>;

// A blank tier, ready to add to the list.
export function createEmptyTier(): Tier {
  return { id: crypto.randomUUID(), title: "", amount: null, description: "" };
}

export function validateTier(tier: Tier, goal: number | null): TierErrors {
  const errors: TierErrors = {};

  const title = tier.title.trim();
  if (!title) errors.title = "Give this reward a title";
  else if (title.length < REWARD_TITLE_MIN)
    errors.title = `Title must be at least ${REWARD_TITLE_MIN} characters`;

  const { amount } = tier;
  if (amount === null || Number.isNaN(amount))
    errors.amount = "Set the contribution amount";
  else if (!Number.isInteger(amount))
    errors.amount = "Use whole shillings, with no cents";
  else if (amount < REWARD_AMOUNT_MIN)
    errors.amount = `Amount must be at least KES ${REWARD_AMOUNT_MIN.toLocaleString()}`;
  else if (goal !== null && amount > goal)
    errors.amount = "Amount can't be more than your funding goal";

  const description = tier.description.trim();
  if (!description) errors.description = "Describe what contributors get";

  return errors;
}

// Only tiers with problems appear in the result.
// An empty object means the step is valid. Zero tiers is allowed:
// rewards are optional.
export function validateRewards(
  rewards: Tier[],
  goal: number | null,
): RewardsErrors {
  const errors: RewardsErrors = {};
  for (const tier of rewards) {
    const tierErrors = validateTier(tier, goal);
    if (Object.keys(tierErrors).length > 0) errors[tier.id] = tierErrors;
  }
  return errors;
}
