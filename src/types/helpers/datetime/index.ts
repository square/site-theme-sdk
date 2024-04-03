/* eslint-disable @typescript-eslint/naming-convention */
// HH:MM:SS
export type TimeString = `${number}${number}:${number}${number}:${number}${number}`;

export type DayOfWeek = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

export const DateFormats = {
	weekdayShort: { weekday: 'short' },
	weekdayLong: { weekday: 'long' },
	hourNminuteN: { hour: 'numeric', minute: 'numeric' },
	hourNminuteNsecondN: { hour: 'numeric', minute: 'numeric', second: 'numeric' },
	yearNmonth2day2: { year: 'numeric', month: '2-digit', day: '2-digit' },
	yearNmonthNdayN: { year: 'numeric', month: 'numeric', day: 'numeric' },
	yearNmonthLdayN: { year: 'numeric', month: 'long', day: 'numeric' },
	yearNmonthSdayN: { year: 'numeric', month: 'short', day: 'numeric' },
	yearNmonthLdayNhourNminuteN: { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' },
	yearNmonthSdayNhourNminuteN: { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' },
	weekdayLyearNmonthLdayNhourNminuteN: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' },
	weekdaySyearNmonthSdayNhourNminuteN: { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' },
	weekdayLhourNminuteN: { weekday: 'long', hour: 'numeric', minute: 'numeric' },
} as const;

export interface Duration {
	in_minutes: number;
	rfc3339_interval: string;
}

export interface weekdayShort {
	weekday: 'short';
}

export interface weekdayLong {
	weekday: 'long';
}

export interface hourNminuteN {
	hour: 'numeric';
	minute: 'numeric';
}

export interface hourNminuteNsecondN extends hourNminuteN {
	second: 'numeric';
}

export interface yearNmonth2day2 {
	year: 'numeric';
	month: '2-digit';
	day: '2-digit';
}

export interface yearNmonthNdayN {
	year: 'numeric';
	month: 'numeric';
	day: 'numeric';
}

export interface yearNmonthLdayN {
	year: 'numeric';
	month: 'long';
	day: 'numeric';
}

export interface yearNmonthSdayN {
	year: 'numeric';
	month: 'short';
	day: 'numeric';
}

export interface yearNmonthLdayNhourNminuteN extends yearNmonthLdayN {
	hour: 'numeric';
	minute: 'numeric';
}

export interface yearNmonthSdayNhourNminuteN extends yearNmonthSdayN {
	hour: 'numeric';
	minute: 'numeric';
}

export interface weekdayLyearNmonthLdayNhourNminuteN extends yearNmonthLdayNhourNminuteN {
	weekday: 'long';
}

export interface weekdaySyearNmonthSdayNhourNminuteN extends yearNmonthSdayNhourNminuteN {
	weekday: 'short';
}

export interface weekdayLhourNminuteN {
	weekday: 'long';
	hour: 'numeric';
	minute: 'numeric';
}

export type localizeDateFormats =
	weekdayLong |
	weekdayShort |
	hourNminuteN |
	hourNminuteNsecondN |
	yearNmonth2day2 |
	yearNmonthNdayN |	
	yearNmonthLdayN |
	yearNmonthSdayN |
	yearNmonthLdayNhourNminuteN |
	yearNmonthSdayNhourNminuteN |
	weekdayLyearNmonthLdayNhourNminuteN |
	weekdaySyearNmonthSdayNhourNminuteN |
	weekdayLhourNminuteN;