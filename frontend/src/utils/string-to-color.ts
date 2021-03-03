export const stringToColor = (s?: string): string => {
    if (!s) return DEFAULT_COLOR;

    const hash = Array.from(s.substring(0, 5))
        .reduce((acc, cur) => {
            acc = cur.charCodeAt(0) + ((acc << 5) - acc);
            return (acc & acc);
        }, 0);

    const asIndex = ((hash % COLOR_PALETTE.length) + COLOR_PALETTE.length) % COLOR_PALETTE.length

    return COLOR_PALETTE[asIndex];
};

const COLOR_PALETTE: string[] = [
    "#e51c23",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#5677fc",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#259b24",
    "#8bc34a",
    "#afb42b",
    "#ff9800",
    "#ff5722",
    "#795548",
    "#607d8b"
];

const DEFAULT_COLOR = 'black';