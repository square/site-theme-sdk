import {
	localizeDate,
	getDayOfWeekKey,
	getNumericTime,
	getDateObjInTimezone,
	getFormattedTime,
} from './datetime';

import {
	Hours,
	OpenInterval,
	OpenStatus,
	OpenStatusDayAndTime,
	Location as LocationResource,
} from '../types/helpers/location';

import {
	DayOfWeek,
	TimeString,
	DateFormats,
} from '../types/helpers/datetime';

import type {
	FulfillmentType,
} from '../types/api/cart';

export class Location {
	readonly OpenStatus = OpenStatus;

	/**
	 * Returns the current open status and relevant time for a location's fulfillment type
	 *
	 * @param {LocationResource} location
	 * @param {string} locale - Hyphenized language/country locale combo, e.g. en-US (BCP 47).
	 * @param {'PICKUP' | 'DELIVERY'} fulfillment
	 * @return { OpenStatusDayAndTime | null }	
	 */
	getLocationFulfillmentOpenStatusDayAndTime(
		location: LocationResource,
		locale: string,
		fulfillment: typeof FulfillmentType.PICKUP | typeof FulfillmentType.DELIVERY,
	): OpenStatusDayAndTime | null {
		const timezone = location.timezone.name;
		const tzOffsetString = location.timezone.offset_string;
		const hours = location[fulfillment].hours;
		return this.getOpenStatusDayAndTime(locale, timezone, tzOffsetString, hours);
	}

	/**
	 * Returns the current open status and relevant time for a location's business hours
	 *
	 * @param {LocationResource} location
	 * @param {string} locale - Hyphenized language/country locale combo, e.g. en-US (BCP 47).
	 * @return { OpenStatusDayAndTime | null }	
	 */
	getLocationBusinessHoursOpenStatusDayAndTime(
		location: LocationResource,
		locale: string,
	): OpenStatusDayAndTime | null {
		const timezone = location.timezone.name;
		const tzOffsetString = location.timezone.offset_string;
		const hours = location.square_business_hours;
		return this.getOpenStatusDayAndTime(locale, timezone, tzOffsetString, hours);
	}

	/**
	 * Given an hours object, returns the current open status and relevant time
	 *
	 * @param {string} locale - Hyphenized language/country locale combo, e.g. en-US (BCP 47).
	 * @param {string} timezone
	 * @param {string} tzOffsetString
	 * @param {Hours} hours
	 * @return { OpenStatusDayAndTime | null }
	 */
	getOpenStatusDayAndTime(
		locale: string,
		timezone: string,
		tzOffsetString: string,
		hours: Hours,
	): OpenStatusDayAndTime | null {
		const dateNow = new Date();
		const currentOpenInterval = this.getCurrentOpenInterval(locale, timezone, hours);
		if (currentOpenInterval) {
			const dateObj = this.getIntervalCloseDateObject(currentOpenInterval, locale, timezone, tzOffsetString, hours);
			if (!dateObj) {
				// return special case for 24/7 businesses
				return {
					status: this.OpenStatus.CURRENTLY_OPEN,
					time: '',
					day: '',
				};
			}

			const closeTime = localizeDate(dateObj, locale, DateFormats.hourNminuteNsecondN, timezone, false);
			const openUntil = getFormattedTime(dateObj, closeTime, DateFormats.hourNminuteN, locale, timezone);
			const openUntilDay = getFormattedTime(dateObj, closeTime, DateFormats.weekdayLong, locale, timezone);
			return {
				status: this.OpenStatus.CURRENTLY_OPEN,
				time: openUntil,
				day: openUntilDay,
			};
		}

		const nextOpenIntervalToday = this.getNextOpenIntervalToday(locale, timezone, hours);
		if (nextOpenIntervalToday) {
			const opensAt = getFormattedTime(dateNow, nextOpenIntervalToday.open, DateFormats.hourNminuteN, locale, timezone);
			const opensAtDay = getFormattedTime(dateNow, nextOpenIntervalToday.open, DateFormats.weekdayLong, locale, timezone);
			return {
				status: this.OpenStatus.OPENS_LATER_TODAY,
				time: opensAt,
				day: opensAtDay,
			};
		}

		const nextOpenIntervalAfterToday = this.getNextOpenIntervalAfterToday(locale, timezone, hours);
		if (nextOpenIntervalAfterToday) {
			const { date, interval: nextInterval } = nextOpenIntervalAfterToday;
			const opensAt = getFormattedTime(date, nextInterval.open, DateFormats.hourNminuteN, locale, timezone);
			const opensAtDay = getFormattedTime(date, nextInterval.open, DateFormats.weekdayLong, locale, timezone);
			return {
				status: this.OpenStatus.OPENS_ANOTHER_DAY,
				time: opensAt,
				day: opensAtDay,
			};
		}

		return null;
	}

	/**
	 * Returns date object of interval close time, accounting for 24 hour businesses, and hours that span between days
	 *
	 * @param {OpenInterval} currentOpenInterval
	 * @param {string} locale - Hyphenized language/country locale combo, e.g. en-US (BCP 47).
	 * @param {string} timezone
	 * @param {string} tzOffsetString
	 * @param {Hours} hours
	 * @return {Date}
	 */
	getIntervalCloseDateObject(
		currentOpenInterval: OpenInterval,
		locale: string,
		timezone: string,
		tzOffsetString: string,
		hours: Hours
	): Date | null {
		const dateNow = new Date();
		let currentTimeString = currentOpenInterval.close;
		let currentDateString = localizeDate(dateNow, locale, DateFormats.yearNmonthNdayN, timezone);

		// This bit of logic is for handling businesses that are open for 24 hours a day, or for businesses
		// that are open across days (e.g. 10:00 PM - 2:00 AM)
		let previousOpenInterval: null | OpenInterval = null;
		let previousOpenDay = 0;
		if (currentTimeString === '24:00:00') {
			const nextDateObj = new Date();
			for (let i = 0; i < 8; i += 1) {
				// If we are on the 8th loop, then the business is open 24/7
				if (i === 7) {
					return null;
				}

				nextDateObj.setDate(nextDateObj.getDate() + 1);
				const dayOfWeekKey = getDayOfWeekKey(
					nextDateObj,
					locale,
					timezone,
				);
	
				const openIntervals = hours[dayOfWeekKey];
				if (openIntervals.length) {
					const openInterval = openIntervals.find(time => time.open === '00:00:00');
			
					// If interval opens at 00:00:00 and closes at 24:00:00, then the business is open that full day
					// continue to the next day
					if (openInterval && openInterval.close === '24:00:00') {
						previousOpenInterval = openInterval;
						previousOpenDay = nextDateObj.getDay();
						continue;
					}

					// If interval is open at 00:00:00 and closes at a time before 24:00:00, we should return that closing time and day
					if (openInterval) {
						currentTimeString = openInterval.close;
						currentDateString = localizeDate(nextDateObj, locale, DateFormats.yearNmonthNdayN, timezone);
						break;
					}
				}

				// This handles the case where a business is open for 24 hours a day for multiple days in a row, but not fully 24/7
				if (previousOpenInterval) {
					currentTimeString = previousOpenInterval.close;
					nextDateObj.setDate(previousOpenDay);
					currentDateString = localizeDate(nextDateObj, locale, DateFormats.yearNmonthNdayN, timezone);
				}
				break;
			}
		}

		return getDateObjInTimezone(
			currentDateString,
			currentTimeString,
			tzOffsetString,
		);
	}

	/**
	 * Gets open intervals for today
	 *
	 * @param {string} locale - Hyphenized language/country locale combo, e.g. en-US (BCP 47).
	 * @param {string} timezone
	 * @param {Hours} hours
	 * @return {OpenInterval[]}
	 */
	getOpenIntervalsForToday(
		locale: string,
		timezone: string,
		hours: Hours
	): OpenInterval[] {
		const dayOfWeekKey: DayOfWeek = getDayOfWeekKey(
			new Date(),
			locale,
			timezone
		);
		return hours[dayOfWeekKey];
	}
	
	/**
	 * Get the open interval if we are currently in an open interval. Otherwise null
	 *
	 * @param {string} locale - Hyphenized language/country locale combo, e.g. en-US (BCP 47).
	 * @param {string} timezone
	 * @param {Hours} hours
	 * @return {OpenInterval | null }
	 */
	getCurrentOpenInterval(
		locale: string,
		timezone: string,
		hours: Hours
	): OpenInterval | null {
		const todayOpenIntervals = this.getOpenIntervalsForToday(locale, timezone, hours);
		if (!todayOpenIntervals.length) {
			return null;
		}
		const currentTimeStr = localizeDate(new Date(), locale, DateFormats.hourNminuteNsecondN, timezone, false) as TimeString;
		let currentTimeNum = getNumericTime(currentTimeStr);

		// Times between 00:00:00 and 01:00:00 are between 240000 and 250000... so we need to adjust
		if (currentTimeNum >= 240000) {
			currentTimeNum -= 240000;
		}

		const openInterval = todayOpenIntervals.find((openInterval) => {
			const { open, close } = openInterval;
			return currentTimeNum >= getNumericTime(open) && currentTimeNum < getNumericTime(close);
		});

		return openInterval || null;
	}

	/**
	 * Get the next open interval today
	 * If we are currently open in an interval, that will be returned
	 *
	 * @param {string} locale - Hyphenized language/country locale combo, e.g. en-US (BCP 47).
	 * @param {string} timezone
	 * @param {Hours} hours
	 * @return {OpenInterval | null }
	 */
	getNextOpenIntervalToday(
		locale: string,
		timezone: string,
		hours: Hours
	): OpenInterval | null {
		const todayOpenIntervals = this.getOpenIntervalsForToday(locale, timezone, hours);
		if (!todayOpenIntervals.length) {
			return null;
		}

		const currentTimeStr = localizeDate(new Date(), locale, DateFormats.hourNminuteNsecondN, timezone, false) as TimeString;
		const currentTimeNum = getNumericTime(currentTimeStr);
		let currentOrNextInterval: OpenInterval | null = null;
		todayOpenIntervals.forEach((openInterval) => {
			const intervalStartNum = getNumericTime(openInterval.open);
			const intervalEndNum = getNumericTime(openInterval.close);
			const intervalIsCurrentOrLater = currentTimeNum < intervalStartNum
				|| (currentTimeNum >= intervalStartNum && currentTimeNum < intervalEndNum);
			if (
				intervalIsCurrentOrLater
				&& (
					// If we don't have a currentOrNextInterval yet, or if the current interval is earlier than the currentOrNextInterval
					// we are doing this check since the intervals could be be out of order, and we want to make sure we are returing the
					// next closest interval
					!currentOrNextInterval || intervalStartNum < getNumericTime(currentOrNextInterval.open)
				)
			) {
				currentOrNextInterval = openInterval;
			}
		});
		return currentOrNextInterval;
	}

	/**
	 * Get the next opening period after today within the next seven days
	 *
	 * @param {string} locale - Hyphenized language/country locale combo, e.g. en-US (BCP 47).
	 * @param {string} timezone
	 * @param {Hours} hours
	 * @return {Object | null} { open: openTime, close: closeTime }
	 */
	getNextOpenIntervalAfterToday(
		locale: string,
		timezone: string,
		hours: Hours,
	): {
		date: Date;
		interval: OpenInterval;
	} | null
	{
		const nextDateObj = new Date();
		let nextOpenInterval = null;
		for (let i = 0; i < 7; i += 1) {
			nextDateObj.setDate(nextDateObj.getDate() + 1);
			const dayOfWeekKey = getDayOfWeekKey(
				nextDateObj,
				locale,
				timezone,
			);

			const openIntervals = hours[dayOfWeekKey];

			if (openIntervals.length) {
				nextOpenInterval = openIntervals[0];
				break;
			}
		}

		if (!nextOpenInterval) {
			return null;
		}

		// Set the hours and minutes of nextDateObj to nextOpenPeriod.open
		const [nextHours, nextMinutes,] = nextOpenInterval.open.split(':');
		nextDateObj.setHours(Number.parseInt(nextHours, 10), Number.parseInt(nextMinutes, 10), 0);

		return {
			date: nextDateObj,
			interval: nextOpenInterval,
		};
	}
}