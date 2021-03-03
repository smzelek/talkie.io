export const timestampToTimeAgo = (timestamp: number): string => {
  const sinceNow = Date.now() - timestamp;
  const threshold = ORDERED_THRESHOLDS.find((t) => sinceNow <= t.useUntil);
  return threshold!.mapping(sinceNow);
};

const MILLISECONDS = 1;
const SECONDS = 1000 * MILLISECONDS;
const MINUTES = 60 * SECONDS;
const HOURS = 60 * MINUTES;
const DAYS = 24 * HOURS;
const WEEKS = 7 * DAYS;
const MONTHS = 31 * DAYS;
const YEARS = 365 * DAYS;

type Threshold = {
  useUntil: number;
  mapping: (_: number) => string;
};

const ORDERED_THRESHOLDS: Threshold[] = [
  {
    useUntil: 1 * MINUTES,
    mapping: () => 'just now'
  },
  {
    useUntil: 5 * MINUTES,
    mapping: () => `a few minutes ago`
  },
  {
    useUntil: 1 * HOURS,
    mapping: (t: number) => `${Math.floor(t / MINUTES)} minutes ago`
  },
  {
    useUntil: 1 * DAYS,
    mapping: (t: number) => {
      const hours = Math.floor(t / HOURS);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
  },
  {
    useUntil: 1 * WEEKS,
    mapping: (t: number) => {
      const days = Math.floor(t / DAYS);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  },
  {
    useUntil: 1 * MONTHS,
    mapping: (t: number) => {
      const weeks = Math.floor(t / WEEKS);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }
  },
  {
    useUntil: 1 * YEARS,
    mapping: (t: number) => {
      const months = Math.floor(t / MONTHS);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    }
  },
  {
    useUntil: Infinity,
    mapping: (t: number) => {
      const years = Math.floor(t / YEARS);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
  },
];
