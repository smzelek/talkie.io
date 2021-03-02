const MILLISECONDS = 1;
const SECONDS = 1000 * MILLISECONDS;
const MINUTES = 60 * SECONDS;
const HOURS = 60 * MINUTES;
const DAYS = 24 * HOURS;
const WEEKS = 7 * DAYS;
const MONTHS = 31 * DAYS;
const YEARS = 365 * DAYS;

type Threshold = {
  beginUsingAt: number;
  mapping: (_: number) => string;
};

const THRESHOLDS: Threshold[] = [
  {
    beginUsingAt: 0 * MILLISECONDS,
    mapping: (_: number) => 'just now'
  },
  {
    beginUsingAt: 1 * MINUTES,
    mapping: (_: number) => `a few minutes ago`
  },
  {
    beginUsingAt: 5 * MINUTES,
    mapping: (t: number) => `${Math.floor(t / MINUTES)} minutes ago`
  },
  {
    beginUsingAt: 1 * HOURS,
    mapping: (t: number) => {
      const hours = Math.floor(t / HOURS);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
  },
  {
    beginUsingAt: 1 * DAYS,
    mapping: (t: number) => {
      const days = Math.floor(t / DAYS);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  },
  {
    beginUsingAt: 1 * WEEKS,
    mapping: (t: number) => {
      const weeks = Math.floor(t / WEEKS);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }
  },
  {
    beginUsingAt: 1 * MONTHS,
    mapping: (t: number) => {
      const months = Math.floor(t / MONTHS);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    }
  },
  {
    beginUsingAt: 1 * YEARS,
    mapping: (t: number) => {
      const years = Math.floor(t / YEARS);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
  },
].reverse();

export const timestampToTimeAgo = (timestamp: number): string => {
  const sinceNow = Date.now() - timestamp;
  const threshold = THRESHOLDS.find((t) => sinceNow >= t.beginUsingAt);
  return threshold!.mapping(sinceNow);
}