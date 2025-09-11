// Utility to convert old string steps to new timestamp format
export const convertStepsToTimestamp = (steps: string[], videoDurationInSeconds: number): { text: string; timestamp: number }[] => {
  const stepCount = steps.length;
  const timePerStep = videoDurationInSeconds / stepCount;
  
  return steps.map((step, index) => ({
    text: step,
    timestamp: Math.round(index * timePerStep)
  }));
};

// Parse duration string (like "3:24") to seconds
export const parseDurationToSeconds = (duration: string): number => {
  const parts = duration.split(':');
  const minutes = parseInt(parts[0]);
  const seconds = parseInt(parts[1]);
  return minutes * 60 + seconds;
};