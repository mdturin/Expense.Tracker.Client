export function getFormattedDate(date: Date): string {
  // If date is already a string, return it as is
  if (typeof date === 'string') {
    date = new Date(date);
  }

  // Check if date is a valid Date object
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error("Invalid date provided: not an instance of Date or is NaN!");
  }

  // Format the date as YYYY-MM-DD
  return (
    date.getFullYear() +
    '-' +
    String(date.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(date.getDate()).padStart(2, '0')
  );
}
