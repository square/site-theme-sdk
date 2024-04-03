import { Money as MoneyType } from '../types/helpers/money';

// This works for all the currencies Square currently supports, but have noticed some differentiation from the BE package we 
// use for currencies like "IQD" which is considered 0 decimal places from this logic, but 3 decimal places in the BE package
// and the ISO 4217 spec. May need to re-visit if Square expands currency support.
const getCurrencyFractionLength = (currency: string) => {
	const numberFormat = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: currency
	});
	const fractionLength = numberFormat.formatToParts(1).find(part => part.type === 'fraction')?.value.length ?? 0;
	return fractionLength;
};

export class Money {
	/**
	 * Formats the Money object based on the provided locale.
	 * 
	 * @param money - The Money object to format.
	 * @param formattedLocale - The locale to format the Money object in (BCP 47).
	 * @returns The formatted amount.
	 */
	formatMoney(money: MoneyType, formattedLocale = 'en-US'): string {
		return this.formatAmount(money.amount, money.currency, formattedLocale);
	}

	/**
	 * Formats a subunits amount based on the provided currency and locale.
	 * 
	 * @param amount - The amount in subunits.
	 * @param currency - The currency of the amount (ISO 4217).
	 * @param formattedLocale - The locale to format the amount in (BCP 47).
	 * @returns The formatted amount.
	 */
	formatAmount(amount: number, currency: string, formattedLocale = 'en-US'): string {
		let formatter;
		try {
			formatter = new Intl.NumberFormat(formattedLocale, {
				style: 'currency',
				currency: currency
			});
		} catch (err) {
			// Fallback to en-US if it's an invalid BCP 47 locale
			formatter = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: currency
			});
		}
		amount = this.convertSubunitsToFloat(amount, currency);
		return formatter.format(amount);
	}

	/**
	 * Converts a float amount to the lowest subunits for the currency, e.g. 10.00 to 1000 for USD.
	 * 
	 * @param float - The float amount to convert.
	 * @param currency - The currency of the amount (ISO 4217).
	 * @returns The amount in subunits.
	 */
	convertFloatToSubunits(float: number, currency: string): number {
		const fractionLength = getCurrencyFractionLength(currency);
		if (fractionLength > 0) {
			return float * Math.pow(10, fractionLength);
		}
		return float;
	}

	/**
	 * Converts a subunits amount to a float for the currency, e.g. 1000 subunits to 10.00 for USD.
	 * 
	 * @param subunits - The subunits amount to convert.
	 * @param currency - The currency of the amount (ISO 4217).
	 * @returns The amount as a float.
	 */
	convertSubunitsToFloat(subunits: number, currency: string): number {
		const fractionLength = getCurrencyFractionLength(currency);
		if (fractionLength > 0) {
			return subunits / Math.pow(10, fractionLength);
		}
		return subunits;
	}
}