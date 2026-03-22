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
 * Converts YYYY-MM-DD back to Full ISO String
 */
export const useDateToISO = (dateStr) => {
    if (!dateStr) return null;
    
    const date = new Date(dateStr);
    return date.toISOString(); 
    // Result: "2026-03-10T00:00:00.000Z"
}