/**
 * Returns formatted date string like 'Today', 'Yesterday', or 'Sep 15'
 */
export function formatFriendlyDate(dateInput: string | number | Date): string {
  const date = new Date(dateInput);
  const now = new Date();
  
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) return 'Today';

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  if (isYesterday) return 'Yesterday';

  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Formats time of day like '2:45 PM'
 */
export function formatTimeOfDay(dateInput: string | number | Date): string {
  const date = new Date(dateInput);
  return date.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  });
}
