/**
 * A dictionary of major global and common holidays.
 * Format: { "MM-DD": "Holiday Name" }
 */
export const holidays = {
  "01-01": "New Year's Day",
  "02-14": "Valentine's Day",
  "03-17": "St. Patrick's Day",
  "04-22": "Earth Day",
  "05-01": "May Day",
  "06-19": "Juneteenth",
  "07-04": "Independence Day",
  "08-15": "Midsummer",
  "09-21": "Peace Day",
  "10-31": "Halloween",
  "11-11": "Veterans Day",
  "12-25": "Christmas Day",
  "12-31": "New Year's Eve",
};

export function getHoliday(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return holidays[`${month}-${day}`];
}
