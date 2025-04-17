// URL regex pattern to find URLs in text
const URL_PATTERN = /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/gi;
/**
 * Extract URLs from text and create view actions and markdown links
 *
 * @param text The text to process for URLs
 * @returns Object containing view actions and processed message with markdown links
 */
export function processUrls(text) {
    // Using matchAll to get all matches with their positions
    const urlMatches = Array.from(text.matchAll(new RegExp(URL_PATTERN)));
    const actions = [];
    if (urlMatches.length === 0) {
        return { actions, processedMessage: text };
    }
    // Sort matches by position to process them in reverse order (to avoid position shifts)
    const sortedMatches = urlMatches
        .map(match => ({ url: match[0], index: match.index }))
        .sort((a, b) => b.index - a.index);
    // Create a working copy of the text
    let processedMessage = text;
    // Process URLs for actions (first 3)
    const actionUrls = sortedMatches
        .slice(0, Math.min(3, sortedMatches.length))
        .map(match => match.url);
    for (const url of actionUrls) {
        let label;
        try {
            const urlObj = new URL(url);
            label = urlObj.hostname.replace(/^www\./, '').replace(/\.(com|org|net|io|dev)$/, '');
        }
        catch {
            label = 'link';
        }
        actions.push({
            action: "view",
            label: `Open ${label}`,
            url: url.trim(),
            clear: true
        });
    }
    return { actions, processedMessage };
}
