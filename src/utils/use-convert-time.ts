export function useConvertTime(utcTimestamp) {
    const date = new Date(utcTimestamp);
    const options = {
        timeZone: "Asia/Ho_Chi_Minh",
        hour12: false,
    };
    return date.toLocaleString("en-US", options);
}