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

/**
 * Returns date in YYYY-MM-DD format for HTML date inputs
 */
export const useDateInputFormatter = (dateStr) => {
    if (!dateStr) return '';
    
    const date = new Date(dateStr);
    
    // toISOString() returns "YYYY-MM-DDTHH:mm:ss.sssZ"
    // split('T')[0] gives us just "YYYY-MM-DD"
    return date.toISOString().split('T')[0];
}

/**
 * Merges a new date with an existing timestamp
 */
export const mergeDateAndTime = (newDateStr, originalFullDate) => {
    if (!newDateStr) return originalFullDate;
    
    // Get the time part from the original: "11:00:00Z"
    const timePart = originalFullDate.split('T')[1]; 
    
    // Combine with the new date from the input: "2026-03-10"
    return `${newDateStr}T${timePart}`;
    // Result: "2026-03-10T11:00:00Z"
}