export const STORY_MIN = 150;
export const STORY_MAX = 10000;

export type StoryErrors = {
  story?: string;
};

export function validateStory(story: string): string | undefined {
  const length = story.trim().length;
  if (!length) return "Tell contributors your story";
  if (length < STORY_MIN)
    return `Your story needs at least ${STORY_MIN} characters (${length} so far)`;
  if (length > STORY_MAX)
    return `Your story must be ${STORY_MAX.toLocaleString()} characters or fewer`;
}

// An empty object means the step is valid.
export function validateStoryStep(data: { story: string }): StoryErrors {
  const story = validateStory(data.story);
  return story ? { story } : {};
}
