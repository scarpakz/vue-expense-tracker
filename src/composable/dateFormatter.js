export const useDateFormatter = (dateStr) => {
    const date = new Date(dateStr);

    const formatted = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC"
    }).format(date);

    return formatted
}