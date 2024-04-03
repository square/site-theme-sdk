import {
	DayOfWeek,
	TimeString,
	localizeDateFormats,
	DateFormats,
} from '../types/helpers/datetime';

/**
 * Returns the time provided as a number
 * e.g) "22:00:00" to 220000
 *
 * @param {String} timeString
 * @return {Number}
 */
export const getNumericTime = (timeString: TimeString): number => Number(timeString.replace(/:/g, ''));

/**
 * Get the date object in the given timezone
 *
 * @param {String} dateString
 * @param {TimeString} timeString
 * @param {String} tzOffsetStr
 * @return {Date}
 */
export const getDateObjInTimezone = (dateString: string, timeString: TimeString, tzOffsetStr: string) => {
	const isoDate = new Date(dateString).toISOString().slice(0, 10);
	return new Date(`${isoDate}T${timeString}${tzOffsetStr}`);
};

/**
 * Transform native JS date objects into a localized string, based on the locale and the format
 * specified.
 *
 * @param {Date} dateObj Date object to be localized
 * @param {string} locale Hyphenized language/country locale combo, e.g. en-US (BCP 47).
 * @param {Object} format Options object specifying the date/time parts to be included in the formatted string
 * @param {string} timezone string specifying a timezone offset the time into
 * @returns {string}
 */
export const localizeDate = (dateObj: Date, locale: string, format: localizeDateFormats, timezone: string, hour12?: boolean) => {
	const options: localizeDateFormats & { timeZone?: string; hour12?: boolean } = { ...format };
	options.timeZone = timezone;

	if (typeof hour12 === 'boolean') {
		options.hour12 = hour12;
	}
	return dateObj.toLocaleString(locale, options);
};

/**
 * Gets the appropriate 3 letter key for the day of the week for a given date object
 * used to find the correct key of the hour data to pull data off of
 *
 * @param {Date} dateObj
 * @param {locale} string - Hyphenized language/country locale combo, e.g. en-US (BCP 47).
 * @param {String} timezone
 * @return {DayOfWeek}
 */
export const getDayOfWeekKey = (dateObj: Date, locale: string, timezone: string): DayOfWeek => {
	const dayOfWeek = localizeDate(dateObj, locale,	DateFormats.weekdayShort, timezone);
	return dayOfWeek.toUpperCase() as DayOfWeek;
};

/**
 * Returns time formatted for the user
 * @param {Date} date
 * @param {TimeString} timeString - of the format HH:MM:SS
 * @param {localizeDateFormats} timeFormat
 * @param {string} storeLocale - Hyphenized language/country locale combo, e.g. en-US (BCP 47).
 * @param {string} timezone
 * @return {String} Ex: 9:00 am
 */
export const getFormattedTime = (
	date: Date,
	timeString: string,
	timeFormat: localizeDateFormats,
	storeLocale: string,
	timezone: string,
) => {
	const timeStrings = timeString.split(':');
	let hours = timeStrings[0];
	const minutes = timeStrings[1];
	if (Number.parseInt(hours, 10) === 24) {
		hours = '0';
	}
	date.setHours(Number.parseInt(hours, 10), Number.parseInt(minutes, 10));
	return localizeDate(date, storeLocale, timeFormat, timezone).replace('AM', 'am').replace('PM', 'pm');
};
