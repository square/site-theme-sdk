import {
	OptionSelection,
	Item as ItemResource,
	ItemOption, 
	ModifierList,
	Variation,
	ValidateItemError,
	ItemPrice,
	QuantityErrorType,
	QuantityErrorTypeEnum,
	GetItemPriceRequest,
	ValidateItemRequest,
	GetInStockVariationsForSelectedOptionsOrVariationRequest
} from '../types/helpers/item';
import { 
	AddLineItem,
	AddItemModifier,
	ChoiceModifier,
	TextModifier,
	ModifierType
} from '../types/api/cart';
import {
	Money
} from './money';

const getVariationSelections = (variation: Variation) => {
	const variationSelections: OptionSelection[] = [];
	if (variation.item_option_values) {
		Object.keys(variation.item_option_values).forEach(itemOptionValuesKey => {
			variationSelections.push({
				itemOptionId: itemOptionValuesKey,
				choice: variation.item_option_values![itemOptionValuesKey].choice
			});
		});
	}
	return variationSelections;
};

const getEventEndDate = (item: ItemResource): Date => {
    
	const endDate = item.item_type_details.end_date;
	const endTime = item.item_type_details.end_time!;

	// date is in the format YYYY-MM-DD
	let dateString = endDate + 'T';

	// time is in the format HH:MM AA
	const timePieces = endTime.split(' ');
	const numericTimePieces = timePieces[0].split(':');
	let hour = parseInt(numericTimePieces[0]) + (timePieces[1] === 'PM' ? 12 : 0);
	hour -= numericTimePieces[0] === '12' ? 12 : 0;
	const minute = numericTimePieces[1];
	if (hour.toString().length === 1) {
		dateString += '0';
	}
	dateString += `${hour}:${minute}:00${item.item_type_details.timezone_info!.utc_offset_string}`;

	return new Date(dateString);
};

export class Item {

	/**
     * Returns the variations for an item resource.
     */
	getVariations(item: ItemResource): Variation[] {
		return item.variations;
	}

	/**
     * Returns the item options for an item resource.
     */
	getItemOptions(item: ItemResource): ItemOption[] | undefined {
		return item.item_options;
	}

	/**
     * Returns the modifier lists for an item resource.
     */
	getModifierLists(item: ItemResource): ModifierList[] | undefined {
		return item.modifier_lists;
	}

	/**
     * Returns whether a particular variation is sold out.
     */
	isVariationSoldOut(variation: Variation): boolean {
		return variation.sold_out || (variation.inventory_tracking_enabled && variation.inventory === 0);
	}
    
	/**
     * Returns the QuantityErrorType if there's an item quantity error with the item varation, otherwise null.
     */
	getItemQuantityError(item: ItemResource, variation: Variation, quantity: number): QuantityErrorTypeEnum | null {
		if (quantity <= 0) {
			return QuantityErrorType.INVALID_QUANTITY;
		} else if (this.isVariationSoldOut(variation)) {
			return QuantityErrorType.SOLD_OUT;
		} else if (variation.inventory_tracking_enabled && quantity > variation.inventory!) {
			return QuantityErrorType.STOCK_EXCEEDED;
		} else if (item.per_order_max && quantity > item.per_order_max) {
			return QuantityErrorType.PER_ORDER_MAX_EXCEEDED;
		}
		return null;
	}

	/**
     * Returns whether all variations of an item are sold out.
     */
	isItemSoldOut(item: ItemResource): boolean {
		return item.variations.every(v => this.isVariationSoldOut(v));
	}

	/**
     * Returns all variations in stock for the selected options or variation.
     */
	getInStockVariationsForSelectedOptionsOrVariation({ item, selectedOptions = [], selectedVariationId = '', skipStockCheck = false }: GetInStockVariationsForSelectedOptionsOrVariationRequest): Variation[] {
		return this.getVariations(item).reduce((acc: Variation[], variation) => {
			if (!selectedVariationId && variation.item_option_values) {
				const variationSelections = getVariationSelections(variation);

				// If choice does not exist in the variation, do not include
				if (!selectedOptions.every((c) => variationSelections.find(vs => vs.itemOptionId === c.itemOptionId && vs.choice === c.choice))) {
					return acc;
				}
			} else if (item.variations.length > 1) {
				// If no item_option_values we have a flat variation. Only care if we have multiple flat variations.
				if (variation.id !== selectedVariationId) {
					return acc;
				}
			}

			// If the variation is marked as sold out, or the variation has no inventory, do not include
			if (!skipStockCheck && this.isVariationSoldOut(variation)) {
				return acc;
			}

			acc.push(variation);
			return acc;
		}, []);
	}

	/**
     * Returns whether an item's option choice is disabled based on the selected options.
     */
	isOptionChoiceDisabledForSelectedOptions(item: ItemResource, optionChoice: OptionSelection, selectedOptions: OptionSelection[], removeMatchingOptionSet = true) {
		// In most use cases we want to compare the itemOption against OTHER selectedOptions' option sets
		if (removeMatchingOptionSet) {
			selectedOptions = selectedOptions.filter(s => s.itemOptionId !== optionChoice.itemOptionId);
		}
		// Get in stock variations
		const variationsInStockForChoices = this.getInStockVariationsForSelectedOptionsOrVariation({ item, selectedOptions });

		let isInStock = false;

		variationsInStockForChoices.forEach(v => {
			const variationSelections = getVariationSelections(v);
			if (variationSelections.find(vs => vs.itemOptionId === optionChoice.itemOptionId && vs.choice === optionChoice.choice)) {
				isInStock = true;
			}
		});
		return !isInStock;
	}

	/**
     * Returns whether a modifier list is valid for the selected modifiers.
     */
	isModifierListForSelectedModifiersValid(modifierList: ModifierList, selectedModifiers: AddItemModifier[]) {
		const selectedModifier = selectedModifiers.find(m => m.id == modifierList.id);

		const min = modifierList.min_selected_modifiers;
		const max = modifierList.max_selected_modifiers;

		let selectedValueCount = (<TextModifier>selectedModifier)?.textEntry?.length || 0;
		if ((<ChoiceModifier>selectedModifier)?.choiceSelections?.length) {
			// Invalid or sold out choices
			const invalidChoice = (<ChoiceModifier>selectedModifier).choiceSelections.find(s => !modifierList.modifiers?.find(m => {
				if (typeof s === 'object') {
					return m.id === s.id;
				}
				return m.id === s;
			}));
			const soldOutChoice = (<ChoiceModifier>selectedModifier).choiceSelections.find(s => modifierList.modifiers?.find(m => {
				if (typeof s === 'object') {
					return m.id === s.id;
				}
				return m.id === s;
			})?.sold_out);
			if (invalidChoice || soldOutChoice) {
				return false;
			}
			selectedValueCount = (<ChoiceModifier>selectedModifier).choiceSelections.length;
		}

		if (min && max && min === max) {
			return selectedValueCount === min;
		}

		if (min && max) {
			return selectedValueCount >= min && selectedValueCount <= max;
		}

		if (max) {
			return selectedValueCount <= max;
		}

		if (min) {
			return selectedValueCount >= min;
		}

		// min/max === 0 (i.e. not required)
		return true;
	}

	/**
     * Returns the disabled option choices for an item based on the selected options.
     */
	getDisabledOptionChoicesForSelectedOptions(item: ItemResource, itemOption: ItemOption, selectedOptions: OptionSelection[], removeMatchingOptionSet = true) {
		const itemOptionChoices: OptionSelection[] = itemOption.choices.map(c => ({
			itemOptionId: itemOption.id,
			choice: c
		}));
		const disabledOptionChoiceValues: string[] = [];
		// In most use cases we want to compare the itemOption against OTHER selectedOptions' option sets
		if (removeMatchingOptionSet) {
			selectedOptions = selectedOptions.filter(s => s.itemOptionId !== itemOption.id);
		}
		itemOptionChoices.forEach((optionChoice) => {
			if (this.isOptionChoiceDisabledForSelectedOptions(item, optionChoice, selectedOptions, removeMatchingOptionSet)) {
				disabledOptionChoiceValues.push(optionChoice.choice);
			}
		});
		return disabledOptionChoiceValues;
	}

	/**
     * Returns whether an item with any combination of selected options, modifiers, variationId, and quantity is valid.
     * @throws {@link ValidateItemError}
     */
	validateItem({ item, selectedOptions = [], selectedModifiers = [], selectedVariationId = '', quantity = undefined, skipStockCheck = false, skipModifierCheck = false }: ValidateItemRequest): AddLineItem {
		const errorItemOptionIds: string[] = [];
		let flatVariationSelectionMissing = false;
		let errorVariationId: string = '';
		let quantityErrorType: QuantityErrorTypeEnum = QuantityErrorType.SOLD_OUT;
		const errorModifierListIds: string[] = [];

		if (item.item_options?.length && !selectedVariationId) {
			item.item_options.forEach(o => {
				if (!selectedOptions?.find(s => s.itemOptionId === o.id && o.choices.includes(s.choice))) {
					errorItemOptionIds.push(o.id);
				}
			});
		} else if (!item.item_options && item.variations.length > 1 && !selectedVariationId) {
			flatVariationSelectionMissing = true;
		}

		// Only check in stock if there's no missing options (or selectedVariationId for flat variations)
		let inStockVariation: Variation | null = null;
		if (errorItemOptionIds.length === 0 && !flatVariationSelectionMissing) {
			const inStockVariations = this.getInStockVariationsForSelectedOptionsOrVariation({ item, selectedOptions, selectedVariationId, skipStockCheck });
			if (inStockVariations.length === 0) {
				const outOfStockVariations = this.getInStockVariationsForSelectedOptionsOrVariation({ item, selectedOptions, selectedVariationId, skipStockCheck: true });
				if (outOfStockVariations.length > 0) {
					errorVariationId = outOfStockVariations[0].id;
				}
			} else {
				inStockVariation = inStockVariations[0];
				if (quantity != null) {
					const error = this.getItemQuantityError(item, inStockVariation, quantity);
					if (error) {
						quantityErrorType = error;
						errorVariationId = inStockVariation.id;
					}
				}
			}
		}

		if (item.modifier_lists?.length && !skipModifierCheck) {
			item.modifier_lists.forEach(m => {
				if (!this.isModifierListForSelectedModifiersValid(m, selectedModifiers)) {
					errorModifierListIds.push(m.id);
				}
			});
		}

		if (!inStockVariation || errorItemOptionIds.length || errorVariationId || errorModifierListIds.length) {
			const validateError = new Error('Failed to validate item.') as ValidateItemError;
			if (errorItemOptionIds.length) {
				validateError.itemOptionIds = errorItemOptionIds;
			}
			if (flatVariationSelectionMissing) {
				validateError.flatVariationSelectionMissing = true;
			}
			if (errorVariationId) {
				validateError.variationId = errorVariationId;
				validateError.quantityErrorType = quantityErrorType;
			}
			if (errorModifierListIds.length) {
				validateError.modifierListIds = errorModifierListIds;
			}
			throw validateError;
		}

		const addLineItem: AddLineItem = {
			itemId: item.id,
			variationId: inStockVariation.id,
			modifiers: selectedModifiers
		};
		if (quantity) {
			addLineItem.quantity = quantity;
		}
		return addLineItem;
	}

	/**
     * Returns the price of an item based on the selected options, modifiers, and/or variation id.
     */
	getItemPrice({ item, selectedOptions = [], selectedVariationId = '', selectedModifiers = [], skipStockCheck = false, skipModifierCheck = false, formattedLocale = undefined }: GetItemPriceRequest): ItemPrice | null {
		let validatedItem: AddLineItem | null = null;
		try {
			validatedItem = this.validateItem({ item, selectedOptions, selectedVariationId, selectedModifiers, skipStockCheck, skipModifierCheck });
		} catch (ex) {
			// no-op
		}
		if (validatedItem) {
			const variation = item.variations.find(v => v.id === validatedItem!.variationId)!;
			let regularPrice = variation.price.regular.amount;
			let salePrice = variation.price.sale.amount;
			const currency = variation.price.regular.currency;
			validatedItem.modifiers?.forEach(selectedModifier => {
				if (selectedModifier.type === ModifierType.CHOICE || selectedModifier.type === ModifierType.GIFT_WRAP) {
					const matchingModifierList = item.modifier_lists?.find(l => l.id === selectedModifier.id);
					if (matchingModifierList) {
						matchingModifierList.modifiers?.forEach(m => {
							let quantity = 1;
							if (selectedModifier.choiceSelections.find(s => {
								if (typeof s === 'object') {
									if (m.id === s.id) {
										quantity = s.quantity;
										return true;
									}
								}
								return m.id === s;
							}) && m.price_money) {
								regularPrice += m.price_money.amount * quantity;
								salePrice += m.price_money.amount * quantity;
							}
						});
					}
				}
			});
			const itemPrice: ItemPrice = {
				regular: {
					amount: regularPrice,
					currency: currency,
					formatted: '',
				},
				sale: {
					amount: salePrice,
					currency: currency,
					formatted: '',
				}
			};
			if (formattedLocale) {
				const moneyHelper = new Money();
				itemPrice.regular.formatted = moneyHelper.formatMoney({
					amount: regularPrice,
					currency: currency,
					formatted: ''
				}, formattedLocale);
				itemPrice.sale.formatted = moneyHelper.formatMoney({
					amount: salePrice,
					currency: currency,
					formatted: ''
				}, formattedLocale);
			}
			return itemPrice;
		}
		
		return null;
	}

	/**
     * Returns whether an item is an event and has ended.
     */
	isEventItemInThePast(item: ItemResource) {
		if (item.square_online_type !== 'EVENT') {
			return false;
		}
		const endDate = getEventEndDate(item);
		return endDate <= new Date();
	}

	/**
     * Returns whether an item is a preorder and the cutoff time has passed.
     */
	isPreorderItemCutoffInThePast(item: ItemResource) {
		if (!item.preordering.PICKUP) {
			return false;
		}
		const cutoffTime = item.fulfillment_availability.PICKUP[0].availability_cutoff_at;
		return new Date(cutoffTime) <= new Date();
	}
}