export const idToTimeStamp = (id?: string) => {
    if (!id) {
        return 0;
    }
    const timestamp = id.substring(0, 8);
    return parseInt(timestamp, 16) * 1000;
};
