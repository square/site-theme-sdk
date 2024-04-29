import { ModifierType, AddItemModifier } from '../src/types/api/cart';
import { Item, ItemOption, OptionSelection, ValidateItemError, QuantityErrorType, SquareOnlineTypeEnum } from '../src/types/helpers/item';
import { describe, expect, it, vi } from 'vitest';
import { getTestSiteThemeSDK } from './helpers';

function createTestItem(
	{
		variationType = 'multiple',
		setSoldOut = false,
		setAllSoldOut = false,
		setInventoryZero = false,
		setAllInventoryZero = false,
		setInventoryAboveZero = false,
		choiceModifierMax = 2,
		choiceModifierMin = 0,
		textModifierMax = 2,
		textModifierMin = 0,
		zeroChoiceModifiers = false,
		soldOutChoiceModifier = false,
		perOrderMax = null,
		squareOnlineType = 'PHYSICAL',
		itemTypeDetailsEndDate = null,
		itemTypeDetailsEndTime = null,
		itemTypeDetailsOffset = null,
		preorderingCutoff = null,
		currency = 'USD',
	}: {
		variationType?: 'multiple' | 'single' | 'flat';
        setSoldOut?: boolean;
		setAllSoldOut?: boolean;
        setInventoryZero?: boolean;
		setAllInventoryZero?: boolean;
        setInventoryAboveZero?: boolean;
        choiceModifierMax?: number;
        choiceModifierMin?: number;
        textModifierMax?: number;
        textModifierMin?: number;
        zeroChoiceModifiers?: boolean;
        soldOutChoiceModifier?: boolean;
		perOrderMax?: number | null;
        squareOnlineType?: SquareOnlineTypeEnum;
        itemTypeDetailsEndDate?: string | null;
        itemTypeDetailsEndTime?: string | null;
        itemTypeDetailsOffset?: string | null;
        preorderingCutoff?: string | null;
		currency?: string;
	}
) {
	const testItem: Item = {
		id: 'testItemId',
		variations: [],
		per_order_max: perOrderMax,
		square_online_type: 'PHYSICAL',
		item_type_details: {},
		preordering: {
			'PICKUP': false
		},
		fulfillment_availability: {
			'PICKUP': []
		}
	};

	testItem.modifier_lists = [
		{
			id: 'modifierListGiftWrapId',
			max_selected_modifiers: 1,
			min_selected_modifiers: 0,
			modifiers: [
				{
					id: 'modifierGiftWrapId1',
					name: 'modifierGiftWrap1',
					price_money: {
						amount: 1000,
						currency: currency,
						formatted: '$10.00'
					},
					sold_out: false
				}
			],
			name: 'modifierListGiftWrap',
			type: ModifierType.GIFT_WRAP
		},
		{
			id: 'modifierListChoiceId',
			max_selected_modifiers: choiceModifierMax,
			min_selected_modifiers: choiceModifierMin,
			modifiers: [
				{
					id: 'modifierChoiceId1',
					name: 'modifierChoice1',
					price_money: {
						amount: 100,
						currency: currency,
						formatted: '$1.00'
					},
					sold_out: false
				},
				{
					id: 'modifierChoiceId2',
					name: 'modifierChoice2',
					price_money: {
						amount: 200,
						currency: currency,
						formatted: '$2.00'
					},
					sold_out: soldOutChoiceModifier ? true : false
				},
				{
					id: 'modifierChoiceId3',
					name: 'modifierChoice3',
					price_money: {
						amount: 300,
						currency: currency,
						formatted: '$3.00'
					},
					sold_out: false
				}
			],
			name: 'modifierListChoice',
			type: ModifierType.CHOICE
		},
		{
			id: 'modifierListGiftMessageId',
			max_selected_modifiers: 220,
			min_selected_modifiers: 0,
			name: 'modifierListGiftMessage',
			type: ModifierType.GIFT_MESSAGE
		},
		{
			id: 'modifierListTextId',
			max_selected_modifiers: textModifierMax,
			min_selected_modifiers: textModifierMin,
			name: 'modifierListText',
			type: ModifierType.TEXT
		},
	];

	if (zeroChoiceModifiers) {
		testItem.modifier_lists[1].modifiers = [];
		testItem.modifier_lists[1].max_selected_modifiers = 0;
		testItem.modifier_lists[1].min_selected_modifiers = 0;
	}

	if (!variationType || variationType === 'multiple') {
		testItem.item_options = [
			{
				choices: ['choice1', 'choice2'],
				id: 'itemOptionId1',
				name: 'itemOption1'
			},
			{
				choices: ['choice1', 'choice2'],
				id: 'itemOptionId2',
				name: 'itemOption2'
			},
		];
		testItem.variations = [
			{
				id: 'variation1',
				item_option_values: {
					'itemOptionId1': {
						choice: 'choice1',
						name: 'itemOption1'
					},
					'itemOptionId2': {
						choice: 'choice1',
						name: 'itemOption2'
					}
				},
				sold_out: setAllSoldOut,
				inventory_tracking_enabled: setAllInventoryZero,
				price: {
					regular: {
						amount: 200,
						currency: currency,
						formatted: '$2.00'
					},
					sale: {
						amount: 100,
						currency: currency,
						formatted: '$1.00'
					},
				}
			},
			{
				id: 'variation2',
				item_option_values: {
					'itemOptionId1': {
						choice: 'choice1',
						name: 'itemOption1'
					},
					'itemOptionId2': {
						choice: 'choice2',
						name: 'itemOption2'
					}
				},
				sold_out: setAllSoldOut,
				inventory_tracking_enabled: setAllInventoryZero,
				price: {
					regular: {
						amount: 300,
						currency: currency,
						formatted: '$3.00'
					},
					sale: {
						amount: 200,
						currency: currency,
						formatted: '$2.00'
					}
				}
			},
			{
				id: 'variation3',
				item_option_values: {
					'itemOptionId1': {
						choice: 'choice2',
						name: 'itemOption1'
					},
					'itemOptionId2': {
						choice: 'choice1',
						name: 'itemOption2'
					}
				},
				sold_out: setAllSoldOut,
				inventory_tracking_enabled: setAllInventoryZero,
				price: {
					regular: {
						amount: 400,
						currency: currency,
						formatted: '$4.00'
					},
					sale: {
						amount: 300,
						currency: currency,
						formatted: '$3.00'
					}
				}
			},
			{
				id: 'variation4',
				item_option_values: {
					'itemOptionId1': {
						choice: 'choice2',
						name: 'itemOption1'
					},
					'itemOptionId2': {
						choice: 'choice2',
						name: 'itemOption2'
					}
				},
				sold_out: setSoldOut || setAllSoldOut,
				inventory_tracking_enabled: setInventoryZero || setAllInventoryZero || setInventoryAboveZero,
				price: {
					regular: {
						amount: 500,
						currency: currency,
						formatted: '$5.00'
					},
					sale: {
						amount: 400,
						currency: currency,
						formatted: '$4.00'
					},
				}
			},
		];
		if (setInventoryZero) {
			testItem.variations[3].inventory = 0;
		} else if (setInventoryAboveZero) {
			testItem.variations[3].inventory = 1;
		} else if (setAllInventoryZero) {
			testItem.variations.forEach(v => v.inventory = 0);
		}
	} else if (variationType == 'flat') {
		testItem.variations = [
			{
				id: 'variation1',
				sold_out: setAllSoldOut,
				inventory_tracking_enabled: setAllInventoryZero,
				price: {
					regular: {
						amount: 200,
						currency: currency,
						formatted: '$2.00'
					},
					sale: {
						amount: 100,
						currency: currency,
						formatted: '$1.00'
					},
				}
			},
			{
				id: 'variation2',
				sold_out: setAllSoldOut,
				inventory_tracking_enabled: setAllInventoryZero,
				price: {
					regular: {
						amount: 300,
						currency: currency,
						formatted: '$3.00'
					},
					sale: {
						amount: 200,
						currency: currency,
						formatted: '$2.00'
					},
				}
			},
			{
				id: 'variation3',
				sold_out: setAllSoldOut,
				inventory_tracking_enabled: setAllInventoryZero,
				price: {
					regular: {
						amount: 300,
						currency: currency,
						formatted: '$3.00'
					},
					sale: {
						amount: 400,
						currency: currency,
						formatted: '$4.00'
					}
				}
			},
			{
				id: 'variation4',
				sold_out: setSoldOut || setAllSoldOut,
				inventory_tracking_enabled: setInventoryZero || setAllInventoryZero || setInventoryAboveZero,
				price: {
					regular: {
						amount: 400,
						currency: currency,
						formatted: '$4.00'
					},
					sale: {
						amount: 500,
						currency: currency,
						formatted: '$5.00'
					}
				}
			}
		];
		if (setInventoryZero) {
			testItem.variations[3].inventory = 0;
		} else if (setInventoryAboveZero) {
			testItem.variations[3].inventory = 1;
		} else if (setAllInventoryZero) {
			testItem.variations.forEach(v => v.inventory = 0);
		}
	} else {
		testItem.variations = [
			{
				id: 'variation1',
				sold_out: setSoldOut || setAllSoldOut,
				inventory_tracking_enabled: setInventoryZero || setAllInventoryZero || setInventoryAboveZero,
				price: {
					regular: {
						amount: 200,
						currency: currency,
						formatted: '$2.00'
					},
					sale: {
						amount: 100,
						currency: currency,
						formatted: '$1.00'
					}
				}
			},
		];
		if (setInventoryZero || setAllInventoryZero) {
			testItem.variations[0].inventory = 0;
		} else if (setInventoryAboveZero) {
			testItem.variations[0].inventory = 1;
		}
	}

	if (squareOnlineType) {
		testItem.square_online_type = squareOnlineType;
	}

	if (itemTypeDetailsEndDate || itemTypeDetailsEndTime || itemTypeDetailsOffset) {
		testItem.item_type_details = {
			end_date: itemTypeDetailsEndDate!,
			end_time: itemTypeDetailsEndTime!,
			timezone_info: {
				utc_offset_string: itemTypeDetailsOffset!
			}
		};
	}

	if (preorderingCutoff) {
		testItem.preordering = {
			'PICKUP': true
		};
		testItem.fulfillment_availability = {
			'PICKUP': [
				{
					availability_cutoff_at: preorderingCutoff
				}
			]
		};
	}

	return testItem;
}

function createOptionSelection(itemOption: ItemOption, choiceIndex: number): OptionSelection {
	return {
		itemOptionId: itemOption.id,
		choice: itemOption.choices[choiceIndex]
	};
}

function createModifierSelection({
	excludeGiftWrap = false,
	excludeChoice = false,
	excludeGiftMessage = false,
	excludeText = false,
	choiceSelectionsCount = 2,
	textSelectionCount = 2,
	invalidChoice = false,
	useChoiceSelectionObject = false,
	useMultipleChoiceSelectionQuantity = false,
}: {
    excludeGiftWrap?: boolean;
    excludeChoice?: boolean;
    excludeGiftMessage?: boolean;
    excludeText?: boolean;
    choiceSelectionsCount?: number;
    textSelectionCount?: number;
    invalidChoice?: boolean;
	useChoiceSelectionObject?: boolean;
	useMultipleChoiceSelectionQuantity?: boolean;
}) {
	const selectedModifiers: AddItemModifier[] = [];
	if (!excludeGiftWrap) {
		selectedModifiers.push({
			id: 'modifierListGiftWrapId',
			type: ModifierType.GIFT_WRAP,
			choiceSelections: useChoiceSelectionObject ? [
				{ id: 'modifierGiftWrapId1', quantity: 1 }
			] : [
				'modifierGiftWrapId1'
			]
		});
	}
	if (!excludeChoice) {
		const choiceModifier = {
			id: 'modifierListChoiceId',
			type: ModifierType.CHOICE,
			choiceSelections: useChoiceSelectionObject ? [
				invalidChoice ? { id: 'invalidChoiceId1', quantity: 1 } : { id: 'modifierChoiceId1', quantity: useMultipleChoiceSelectionQuantity ? 2 : 1 },
				{ id: 'modifierChoiceId2', quantity: 1 },
			]: [
				invalidChoice ? 'invalidChoiceId1' : 'modifierChoiceId1',
				'modifierChoiceId2',
			]
		};
		if (choiceSelectionsCount === 1) {
			choiceModifier.choiceSelections.pop();
		} else if (choiceSelectionsCount === 0) {
			choiceModifier.choiceSelections = [];
		} else if (choiceSelectionsCount === 3) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
			(<any>choiceModifier.choiceSelections).push(useChoiceSelectionObject ? { id: 'modifierChoiceId3', quantity: 1 } : 'modifierChoiceId3');
		}
		selectedModifiers.push(choiceModifier);
	}
	if (!excludeGiftMessage) {
		selectedModifiers.push({
			id: 'modifierListGiftMessageId',
			type: ModifierType.GIFT_MESSAGE,
			textEntry: 'This is test text'
		});
	}
	if (!excludeText) {
		let textEntry = '';
		for (let i = 0; i < textSelectionCount; i++) {
			textEntry += 'a';
		}
		selectedModifiers.push({
			id: 'modifierListTextId',
			type: ModifierType.TEXT,
			textEntry: textEntry
		});
	}
	return selectedModifiers;
}

const sdk = getTestSiteThemeSDK();

const defaultItem = createTestItem({ });

describe('Getters', () => {
	it('should get variations', () => {
		const result = sdk.helpers.item.getVariations(defaultItem);
		expect(result).toStrictEqual(defaultItem.variations);
	});

	it('should get item options', () => {
		const result = sdk.helpers.item.getItemOptions(defaultItem);
		expect(result).toStrictEqual(defaultItem.item_options);
	});

	it('should get modifier lists', () => {
		const result = sdk.helpers.item.getModifierLists(defaultItem);
		expect(result).toStrictEqual(defaultItem.modifier_lists);
	});
});

describe('In stock variations', () => {
	it('should return single variation for single variation', () => {
		const singleVariationItem = createTestItem({ variationType: 'single' });
		const result = sdk.helpers.item.getInStockVariationsForSelectedOptionsOrVariation({ item: singleVariationItem });
		expect(result).toStrictEqual([ singleVariationItem.variations[0] ]);
	});

	it('should return empty for single variation sold out', () => {
		const singleVariationItem = createTestItem({ variationType: 'single', setSoldOut: true });
		const result = sdk.helpers.item.getInStockVariationsForSelectedOptionsOrVariation({ item: singleVariationItem });
		expect(result).toStrictEqual([]);
		const result2 = sdk.helpers.item.getInStockVariationsForSelectedOptionsOrVariation({ item: singleVariationItem, skipStockCheck: true });
		expect(result2).toStrictEqual([ singleVariationItem.variations[0] ]);
	});

	it('should return empty for single variation with inventory 0', () => {
		const singleVariationItem = createTestItem({ variationType: 'single', setInventoryZero: true });
		const result = sdk.helpers.item.getInStockVariationsForSelectedOptionsOrVariation({ item: singleVariationItem });
		expect(result).toStrictEqual([]);
		const result2 = sdk.helpers.item.getInStockVariationsForSelectedOptionsOrVariation({ item: singleVariationItem, skipStockCheck: true });
		expect(result2).toStrictEqual([ singleVariationItem.variations[0] ]);
	});

	it('should return single variation with inventory above 0', () => {
		const singleVariationItem = createTestItem({ variationType: 'single', setInventoryAboveZero: true });
		const result = sdk.helpers.item.getInStockVariationsForSelectedOptionsOrVariation({ item: singleVariationItem, skipStockCheck: true });
		expect(result).toStrictEqual([ singleVariationItem.variations[0] ]);
	});

	it('should return all variations for no selected options', () => {
		const result = sdk.helpers.item.getInStockVariationsForSelectedOptionsOrVariation({ item: defaultItem });
		expect(result).toStrictEqual(defaultItem.variations);
	});

	it('should return single variation for all selected options', () => {
		const selectedOptions: OptionSelection[] = [
			createOptionSelection(defaultItem.item_options![0], 0),
			createOptionSelection(defaultItem.item_options![1], 0)
		];
		const result = sdk.helpers.item.getInStockVariationsForSelectedOptionsOrVariation({ item: defaultItem, selectedOptions });
		expect(result).toStrictEqual([ defaultItem.variations[0] ]);
	});

	it('should return single variation for selected variation id', () => {
		const selectedVariationId = defaultItem.variations[3].id;
		const result = sdk.helpers.item.getInStockVariationsForSelectedOptionsOrVariation({ item: defaultItem, selectedVariationId });
		expect(result).toStrictEqual([ defaultItem.variations[3] ]);
	});

	it('should return other variations for single selected option', () => {
		const selectedOptions: OptionSelection[] = [
			createOptionSelection(defaultItem.item_options![0], 0),
		];
		const result = sdk.helpers.item.getInStockVariationsForSelectedOptionsOrVariation({ item: defaultItem, selectedOptions });
		expect(result).toStrictEqual([ defaultItem.variations[0], defaultItem.variations[1] ]);
	});

	it('should exclude sold out variations for single selected option', () => {
		const withSoldOutItem = createTestItem({ setSoldOut: true });
		const selectedOptions: OptionSelection[] = [
			createOptionSelection(defaultItem.item_options![0], 1),
		];
		const result = sdk.helpers.item.getInStockVariationsForSelectedOptionsOrVariation({ item: withSoldOutItem, selectedOptions });
		expect(result).toStrictEqual([ withSoldOutItem.variations[2] ]);
		const result2 = sdk.helpers.item.getInStockVariationsForSelectedOptionsOrVariation({ item: withSoldOutItem, selectedOptions, skipStockCheck: true });
		expect(result2).toStrictEqual([ withSoldOutItem.variations[2], withSoldOutItem.variations[3] ]);
	});

	it('should exclude inventory 0 variations for single selected option', () => {
		const withInventoryZeroItem = createTestItem({ setInventoryZero: true });
		const selectedOptions: OptionSelection[] = [
			createOptionSelection(defaultItem.item_options![0], 1),
		];
		const result = sdk.helpers.item.getInStockVariationsForSelectedOptionsOrVariation({ item: withInventoryZeroItem, selectedOptions });
		expect(result).toStrictEqual([ withInventoryZeroItem.variations[2] ]);
		const result2 = sdk.helpers.item.getInStockVariationsForSelectedOptionsOrVariation({ item: withInventoryZeroItem, selectedOptions, skipStockCheck: true });
		expect(result2).toStrictEqual([ withInventoryZeroItem.variations[2], withInventoryZeroItem.variations[3] ]);
	});

	it('should include inventory above 0 variations for single selected option', () => {
		const withInventoryAboveZeroItem = createTestItem({ setInventoryAboveZero: true });
		const selectedOptions: OptionSelection[] = [
			createOptionSelection(defaultItem.item_options![0], 1),
		];
		const result = sdk.helpers.item.getInStockVariationsForSelectedOptionsOrVariation({ item: withInventoryAboveZeroItem, selectedOptions });
		expect(result).toStrictEqual([ withInventoryAboveZeroItem.variations[2], withInventoryAboveZeroItem.variations[3] ]);
	});

	it('should include selected variation for flat variations', () => {
		const flatItem = createTestItem({ variationType: 'flat' });
		const selectedVariationId = flatItem.variations[3].id;
		const result = sdk.helpers.item.getInStockVariationsForSelectedOptionsOrVariation({ item: flatItem, selectedVariationId });
		expect(result).toStrictEqual([ flatItem.variations[3] ]);
	});

	it('should exclude sold out for selected variation for flat variations', () => {
		const flatItem = createTestItem({ variationType: 'flat', setSoldOut: true });
		const selectedVariationId = flatItem.variations[3].id;
		const result = sdk.helpers.item.getInStockVariationsForSelectedOptionsOrVariation({ item: flatItem, selectedVariationId });
		expect(result).toStrictEqual([]);
	});

	it('should exclude inventory 0 for selected variation for flat variations', () => {
		const flatItem = createTestItem({ variationType: 'flat', setInventoryZero: true });
		const selectedVariationId = flatItem.variations[3].id;
		const result = sdk.helpers.item.getInStockVariationsForSelectedOptionsOrVariation({ item: flatItem, selectedVariationId });
		expect(result).toStrictEqual([]);
	});

	it('should include inventory above 0 for selected variation for flat variations', () => {
		const flatItem = createTestItem({ variationType: 'flat', setInventoryAboveZero: true });
		const selectedVariationId = flatItem.variations[3].id;
		const result = sdk.helpers.item.getInStockVariationsForSelectedOptionsOrVariation({ item: flatItem, selectedVariationId });
		expect(result).toStrictEqual([ flatItem.variations[3] ]);
	});

	it('should return empty for invalid selected variation for flat variations', () => {
		const flatItem = createTestItem({ variationType: 'flat' });
		const selectedVariationId = 'doesnotexist';
		const result = sdk.helpers.item.getInStockVariationsForSelectedOptionsOrVariation({ item: flatItem, selectedVariationId });
		expect(result).toStrictEqual([ ]);
	});

	it('should return empty for no selected variation for flat variations', () => {
		const flatItem = createTestItem({ variationType: 'flat' });
		const result = sdk.helpers.item.getInStockVariationsForSelectedOptionsOrVariation({ item: flatItem });
		expect(result).toStrictEqual([ ]);
	});
});

describe('Option choice disabled', () => {
	it('should return false for all options with no selections', () => {
		const result = sdk.helpers.item.isOptionChoiceDisabledForSelectedOptions(defaultItem, createOptionSelection(defaultItem.item_options![0], 0), []);
		expect(result).toStrictEqual(false);
		const result2 = sdk.helpers.item.isOptionChoiceDisabledForSelectedOptions(defaultItem, createOptionSelection(defaultItem.item_options![0], 1), []);
		expect(result2).toStrictEqual(false);
		const result3 = sdk.helpers.item.isOptionChoiceDisabledForSelectedOptions(defaultItem, createOptionSelection(defaultItem.item_options![1], 0), []);
		expect(result3).toStrictEqual(false);
		const result4 = sdk.helpers.item.isOptionChoiceDisabledForSelectedOptions(defaultItem, createOptionSelection(defaultItem.item_options![1], 1), []);
		expect(result4).toStrictEqual(false);
	});

	it('should return false for all options with single option selection', () => {
		const selectedOptions: OptionSelection[] = [
			createOptionSelection(defaultItem.item_options![0], 0),
		];
		const result = sdk.helpers.item.isOptionChoiceDisabledForSelectedOptions(defaultItem, createOptionSelection(defaultItem.item_options![0], 0), selectedOptions);
		expect(result).toStrictEqual(false);
		const result2 = sdk.helpers.item.isOptionChoiceDisabledForSelectedOptions(defaultItem, createOptionSelection(defaultItem.item_options![0], 1), selectedOptions);
		expect(result2).toStrictEqual(false);
		const result3 = sdk.helpers.item.isOptionChoiceDisabledForSelectedOptions(defaultItem, createOptionSelection(defaultItem.item_options![1], 0), selectedOptions);
		expect(result3).toStrictEqual(false);
		const result4 = sdk.helpers.item.isOptionChoiceDisabledForSelectedOptions(defaultItem, createOptionSelection(defaultItem.item_options![1], 1), selectedOptions);
		expect(result4).toStrictEqual(false);
		// Check removeMatchingOptionSet false
		const result5 = sdk.helpers.item.isOptionChoiceDisabledForSelectedOptions(defaultItem, createOptionSelection(defaultItem.item_options![0], 0), selectedOptions, false);
		expect(result5).toStrictEqual(false);
		const result6 = sdk.helpers.item.isOptionChoiceDisabledForSelectedOptions(defaultItem, createOptionSelection(defaultItem.item_options![0], 1), selectedOptions, false);
		expect(result6).toStrictEqual(true);
	});

	it('should return false for selected options with all option selections', () => {
		const selectedOptions: OptionSelection[] = [
			createOptionSelection(defaultItem.item_options![0], 0),
			createOptionSelection(defaultItem.item_options![1], 0),
		];
		const result = sdk.helpers.item.isOptionChoiceDisabledForSelectedOptions(defaultItem, createOptionSelection(defaultItem.item_options![0], 0), selectedOptions);
		expect(result).toStrictEqual(false);
		const result2 = sdk.helpers.item.isOptionChoiceDisabledForSelectedOptions(defaultItem, createOptionSelection(defaultItem.item_options![0], 1), selectedOptions);
		expect(result2).toStrictEqual(false);
		const result3 = sdk.helpers.item.isOptionChoiceDisabledForSelectedOptions(defaultItem, createOptionSelection(defaultItem.item_options![1], 0), selectedOptions);
		expect(result3).toStrictEqual(false);
		const result4 = sdk.helpers.item.isOptionChoiceDisabledForSelectedOptions(defaultItem, createOptionSelection(defaultItem.item_options![1], 1), selectedOptions);
		expect(result4).toStrictEqual(false);
		// Check removeMatchingOptionSet false
		const result5 = sdk.helpers.item.isOptionChoiceDisabledForSelectedOptions(defaultItem, createOptionSelection(defaultItem.item_options![0], 0), selectedOptions, false);
		expect(result5).toStrictEqual(false);
		const result6 = sdk.helpers.item.isOptionChoiceDisabledForSelectedOptions(defaultItem, createOptionSelection(defaultItem.item_options![0], 1), selectedOptions, false);
		expect(result6).toStrictEqual(true);
		const result7 = sdk.helpers.item.isOptionChoiceDisabledForSelectedOptions(defaultItem, createOptionSelection(defaultItem.item_options![1], 0), selectedOptions, false);
		expect(result7).toStrictEqual(false);
		const result8 = sdk.helpers.item.isOptionChoiceDisabledForSelectedOptions(defaultItem, createOptionSelection(defaultItem.item_options![1], 1), selectedOptions, false);
		expect(result8).toStrictEqual(true);
	});

	it('should return true for sold out variant with single option selected', () => {
		const multipleVariationsItem = createTestItem({ setSoldOut: true });
		const selectedOptions: OptionSelection[] = [
			createOptionSelection(multipleVariationsItem.item_options![0], 1),
		];
		const result = sdk.helpers.item.isOptionChoiceDisabledForSelectedOptions(multipleVariationsItem, createOptionSelection(multipleVariationsItem.item_options![0], 0), selectedOptions);
		expect(result).toStrictEqual(false);
		const result2 = sdk.helpers.item.isOptionChoiceDisabledForSelectedOptions(multipleVariationsItem, createOptionSelection(multipleVariationsItem.item_options![0], 1), selectedOptions);
		expect(result2).toStrictEqual(false);
		const result3 = sdk.helpers.item.isOptionChoiceDisabledForSelectedOptions(multipleVariationsItem, createOptionSelection(multipleVariationsItem.item_options![1], 0), selectedOptions);
		expect(result3).toStrictEqual(false);
		const result4 = sdk.helpers.item.isOptionChoiceDisabledForSelectedOptions(multipleVariationsItem, createOptionSelection(multipleVariationsItem.item_options![1], 1), selectedOptions);
		expect(result4).toStrictEqual(true);
	});

	it('should return true with inventory 0 variant with single option selected', () => {
		const multipleVariationsItem = createTestItem({ setInventoryZero: true });
		const selectedOptions: OptionSelection[] = [
			createOptionSelection(multipleVariationsItem.item_options![0], 1),
		];
		const result = sdk.helpers.item.isOptionChoiceDisabledForSelectedOptions(multipleVariationsItem, createOptionSelection(multipleVariationsItem.item_options![0], 0), selectedOptions);
		expect(result).toStrictEqual(false);
		const result2 = sdk.helpers.item.isOptionChoiceDisabledForSelectedOptions(multipleVariationsItem, createOptionSelection(multipleVariationsItem.item_options![0], 1), selectedOptions);
		expect(result2).toStrictEqual(false);
		const result3 = sdk.helpers.item.isOptionChoiceDisabledForSelectedOptions(multipleVariationsItem, createOptionSelection(multipleVariationsItem.item_options![1], 0), selectedOptions);
		expect(result3).toStrictEqual(false);
		const result4 = sdk.helpers.item.isOptionChoiceDisabledForSelectedOptions(multipleVariationsItem, createOptionSelection(multipleVariationsItem.item_options![1], 1), selectedOptions);
		expect(result4).toStrictEqual(true);
	});

	it('should return false with inventory above 0 variant with single option selected', () => {
		const multipleVariationsItem = createTestItem({ setInventoryAboveZero: true });
		const selectedOptions: OptionSelection[] = [
			createOptionSelection(multipleVariationsItem.item_options![0], 1),
		];
		const result = sdk.helpers.item.isOptionChoiceDisabledForSelectedOptions(multipleVariationsItem, createOptionSelection(multipleVariationsItem.item_options![0], 0), selectedOptions);
		expect(result).toStrictEqual(false);
		const result2 = sdk.helpers.item.isOptionChoiceDisabledForSelectedOptions(multipleVariationsItem, createOptionSelection(multipleVariationsItem.item_options![0], 1), selectedOptions);
		expect(result2).toStrictEqual(false);
		const result3 = sdk.helpers.item.isOptionChoiceDisabledForSelectedOptions(multipleVariationsItem, createOptionSelection(multipleVariationsItem.item_options![1], 0), selectedOptions);
		expect(result3).toStrictEqual(false);
		const result4 = sdk.helpers.item.isOptionChoiceDisabledForSelectedOptions(multipleVariationsItem, createOptionSelection(multipleVariationsItem.item_options![1], 1), selectedOptions);
		expect(result4).toStrictEqual(false);
	});

	it('should return true for all with sold out options selected', () => {
		const multipleVariationsItem = createTestItem({ setSoldOut: true });
		const selectedOptions: OptionSelection[] = [
			createOptionSelection(multipleVariationsItem.item_options![0], 1),
			createOptionSelection(multipleVariationsItem.item_options![1], 1),
		];
		const result = sdk.helpers.item.isOptionChoiceDisabledForSelectedOptions(multipleVariationsItem, createOptionSelection(multipleVariationsItem.item_options![0], 0), selectedOptions);
		expect(result).toStrictEqual(false);
		const result2 = sdk.helpers.item.isOptionChoiceDisabledForSelectedOptions(multipleVariationsItem, createOptionSelection(multipleVariationsItem.item_options![0], 1), selectedOptions);
		expect(result2).toStrictEqual(true);
		const result3 = sdk.helpers.item.isOptionChoiceDisabledForSelectedOptions(multipleVariationsItem, createOptionSelection(multipleVariationsItem.item_options![1], 0), selectedOptions);
		expect(result3).toStrictEqual(false);
		const result4 = sdk.helpers.item.isOptionChoiceDisabledForSelectedOptions(multipleVariationsItem, createOptionSelection(multipleVariationsItem.item_options![1], 1), selectedOptions);
		expect(result4).toStrictEqual(true);
	});
});

describe('Modifier list valid', () => {
	it('should return valid for all with no selections', () => {
		const result = sdk.helpers.item.isModifierListForSelectedModifiersValid(defaultItem.modifier_lists![0], []);
		expect(result).toStrictEqual(true);
		const result2 = sdk.helpers.item.isModifierListForSelectedModifiersValid(defaultItem.modifier_lists![1], []);
		expect(result2).toStrictEqual(true);
		const result3 = sdk.helpers.item.isModifierListForSelectedModifiersValid(defaultItem.modifier_lists![2], []);
		expect(result3).toStrictEqual(true);
		const result4 = sdk.helpers.item.isModifierListForSelectedModifiersValid(defaultItem.modifier_lists![3], []);
		expect(result4).toStrictEqual(true);
	});

	it('should return valid for all with valid modifiers selections', () => {
		const modifierSelections = createModifierSelection({});

		const result = sdk.helpers.item.isModifierListForSelectedModifiersValid(defaultItem.modifier_lists![0], modifierSelections);
		expect(result).toStrictEqual(true);
		const result2 = sdk.helpers.item.isModifierListForSelectedModifiersValid(defaultItem.modifier_lists![1], modifierSelections);
		expect(result2).toStrictEqual(true);
		const result3 = sdk.helpers.item.isModifierListForSelectedModifiersValid(defaultItem.modifier_lists![2], modifierSelections);
		expect(result3).toStrictEqual(true);
		const result4 = sdk.helpers.item.isModifierListForSelectedModifiersValid(defaultItem.modifier_lists![3], modifierSelections);
		expect(result4).toStrictEqual(true);
	});

	it('should return valid for all with valid modifiers selections using ChoiceSelection', () => {
		const modifierSelections = createModifierSelection({useChoiceSelectionObject: true});

		const result = sdk.helpers.item.isModifierListForSelectedModifiersValid(defaultItem.modifier_lists![0], modifierSelections);
		expect(result).toStrictEqual(true);
		const result2 = sdk.helpers.item.isModifierListForSelectedModifiersValid(defaultItem.modifier_lists![1], modifierSelections);
		expect(result2).toStrictEqual(true);
		const result3 = sdk.helpers.item.isModifierListForSelectedModifiersValid(defaultItem.modifier_lists![2], modifierSelections);
		expect(result3).toStrictEqual(true);
		const result4 = sdk.helpers.item.isModifierListForSelectedModifiersValid(defaultItem.modifier_lists![3], modifierSelections);
		expect(result4).toStrictEqual(true);
	});

	it('should return false for invalid choice modifier selections', () => {
		const modifierSelections = createModifierSelection({ invalidChoice: true });
		const result = sdk.helpers.item.isModifierListForSelectedModifiersValid(defaultItem.modifier_lists![1], modifierSelections);
		expect(result).toStrictEqual(false);
		const modifierSelections2 = createModifierSelection({ choiceSelectionsCount: 1 });
		const zeroChoiceModifiersItem = createTestItem({ zeroChoiceModifiers: true });
		const result2 = sdk.helpers.item.isModifierListForSelectedModifiersValid(zeroChoiceModifiersItem.modifier_lists![1], modifierSelections2);
		expect(result2).toStrictEqual(false);
	});

	it('should return false for invalid choice modifier selections using ChoiceSelection', () => {
		const modifierSelections = createModifierSelection({ invalidChoice: true, useChoiceSelectionObject: true });
		const result = sdk.helpers.item.isModifierListForSelectedModifiersValid(defaultItem.modifier_lists![1], modifierSelections);
		expect(result).toStrictEqual(false);
		const modifierSelections2 = createModifierSelection({ choiceSelectionsCount: 1, useChoiceSelectionObject: true });
		const zeroChoiceModifiersItem = createTestItem({ zeroChoiceModifiers: true });
		const result2 = sdk.helpers.item.isModifierListForSelectedModifiersValid(zeroChoiceModifiersItem.modifier_lists![1], modifierSelections2);
		expect(result2).toStrictEqual(false);
	});

	it('should return false for sold out choice modifier selections', () => {
		const soldOutChoiceModifiersItem = createTestItem({ soldOutChoiceModifier: true });
		const modifierSelections = createModifierSelection({ choiceSelectionsCount: 1 });
		const result = sdk.helpers.item.isModifierListForSelectedModifiersValid(soldOutChoiceModifiersItem.modifier_lists![1], modifierSelections);
		expect(result).toStrictEqual(true);
		const modifierSelections2 = createModifierSelection({});
		const result2 = sdk.helpers.item.isModifierListForSelectedModifiersValid(soldOutChoiceModifiersItem.modifier_lists![1], modifierSelections2);
		expect(result2).toStrictEqual(false);
	});

	it('should return false for sold out choice modifier selections using ChoiceSelection', () => {
		const soldOutChoiceModifiersItem = createTestItem({ soldOutChoiceModifier: true});
		const modifierSelections = createModifierSelection({ choiceSelectionsCount: 1, useChoiceSelectionObject: true });
		const result = sdk.helpers.item.isModifierListForSelectedModifiersValid(soldOutChoiceModifiersItem.modifier_lists![1], modifierSelections);
		expect(result).toStrictEqual(true);
		const modifierSelections2 = createModifierSelection({ useChoiceSelectionObject: true });
		const result2 = sdk.helpers.item.isModifierListForSelectedModifiersValid(soldOutChoiceModifiersItem.modifier_lists![1], modifierSelections2);
		expect(result2).toStrictEqual(false);
	});

	it('should verify choice modifier with same min/max 0', () => {
		const sameChoiceMinMaxItem = createTestItem({ choiceModifierMin: 0, choiceModifierMax: 0 });

		const result = sdk.helpers.item.isModifierListForSelectedModifiersValid(sameChoiceMinMaxItem.modifier_lists![1], []);
		expect(result).toStrictEqual(true);
		const modifierSelections0 = createModifierSelection({ choiceSelectionsCount: 0 });
		const result2 = sdk.helpers.item.isModifierListForSelectedModifiersValid(sameChoiceMinMaxItem.modifier_lists![1], modifierSelections0);
		expect(result2).toStrictEqual(true);
		const modifierSelections1 = createModifierSelection({ choiceSelectionsCount: 1 });
		const result3 = sdk.helpers.item.isModifierListForSelectedModifiersValid(sameChoiceMinMaxItem.modifier_lists![1], modifierSelections1);
		expect(result3).toStrictEqual(true);
		const modifierSelections2 = createModifierSelection({});
		const result4 = sdk.helpers.item.isModifierListForSelectedModifiersValid(sameChoiceMinMaxItem.modifier_lists![1], modifierSelections2);
		expect(result4).toStrictEqual(true);
	});

	it('should verify choice modifier with same min/max 1', () => {
		const sameChoiceMinMaxItem = createTestItem({ choiceModifierMin: 1, choiceModifierMax: 1 });

		const result = sdk.helpers.item.isModifierListForSelectedModifiersValid(sameChoiceMinMaxItem.modifier_lists![1], []);
		expect(result).toStrictEqual(false);
		const modifierSelections0 = createModifierSelection({ choiceSelectionsCount: 0 });
		const result2 = sdk.helpers.item.isModifierListForSelectedModifiersValid(sameChoiceMinMaxItem.modifier_lists![1], modifierSelections0);
		expect(result2).toStrictEqual(false);
		const modifierSelections1 = createModifierSelection({ choiceSelectionsCount: 1 });
		const result3 = sdk.helpers.item.isModifierListForSelectedModifiersValid(sameChoiceMinMaxItem.modifier_lists![1], modifierSelections1);
		expect(result3).toStrictEqual(true);
		const modifierSelections2 = createModifierSelection({});
		const result4 = sdk.helpers.item.isModifierListForSelectedModifiersValid(sameChoiceMinMaxItem.modifier_lists![1], modifierSelections2);
		expect(result4).toStrictEqual(false);
	});

	it('should verify choice modifier with min/max larger than 0', () => {
		const minMaxLargerThan0Item = createTestItem({ choiceModifierMin: 1, choiceModifierMax: 2 });

		const result = sdk.helpers.item.isModifierListForSelectedModifiersValid(minMaxLargerThan0Item.modifier_lists![1], []);
		expect(result).toStrictEqual(false);
		const modifierSelections0 = createModifierSelection({ choiceSelectionsCount: 0 });
		const result2 = sdk.helpers.item.isModifierListForSelectedModifiersValid(minMaxLargerThan0Item.modifier_lists![1], modifierSelections0);
		expect(result2).toStrictEqual(false);
		const modifierSelections1 = createModifierSelection({ choiceSelectionsCount: 1 });
		const result3 = sdk.helpers.item.isModifierListForSelectedModifiersValid(minMaxLargerThan0Item.modifier_lists![1], modifierSelections1);
		expect(result3).toStrictEqual(true);
		const modifierSelections2 = createModifierSelection({});
		const result4 = sdk.helpers.item.isModifierListForSelectedModifiersValid(minMaxLargerThan0Item.modifier_lists![1], modifierSelections2);
		expect(result4).toStrictEqual(true);
		const modifierSelections3 = createModifierSelection({ choiceSelectionsCount: 3 });
		const result5 = sdk.helpers.item.isModifierListForSelectedModifiersValid(minMaxLargerThan0Item.modifier_lists![1], modifierSelections3);
		expect(result5).toStrictEqual(false);
	});

	it('should verify choice modifier with min larger than 0', () => {
		const minLargerThan0Item = createTestItem({ choiceModifierMin: 1, choiceModifierMax: 0 });

		const result = sdk.helpers.item.isModifierListForSelectedModifiersValid(minLargerThan0Item.modifier_lists![1], []);
		expect(result).toStrictEqual(false);
		const modifierSelections0 = createModifierSelection({ choiceSelectionsCount: 0 });
		const result2 = sdk.helpers.item.isModifierListForSelectedModifiersValid(minLargerThan0Item.modifier_lists![1], modifierSelections0);
		expect(result2).toStrictEqual(false);
		const modifierSelections1 = createModifierSelection({ choiceSelectionsCount: 1 });
		const result3 = sdk.helpers.item.isModifierListForSelectedModifiersValid(minLargerThan0Item.modifier_lists![1], modifierSelections1);
		expect(result3).toStrictEqual(true);
		const modifierSelections2 = createModifierSelection({});
		const result4 = sdk.helpers.item.isModifierListForSelectedModifiersValid(minLargerThan0Item.modifier_lists![1], modifierSelections2);
		expect(result4).toStrictEqual(true);
	});

	it('should verify choice modifier with max larger than 0', () => {
		const maxLargerThan0Item = createTestItem({ choiceModifierMin: 0, choiceModifierMax: 1 });

		const result = sdk.helpers.item.isModifierListForSelectedModifiersValid(maxLargerThan0Item.modifier_lists![1], []);
		expect(result).toStrictEqual(true);
		const modifierSelections0 = createModifierSelection({ choiceSelectionsCount: 0 });
		const result2 = sdk.helpers.item.isModifierListForSelectedModifiersValid(maxLargerThan0Item.modifier_lists![1], modifierSelections0);
		expect(result2).toStrictEqual(true);
		const modifierSelections1 = createModifierSelection({ choiceSelectionsCount: 1 });
		const result3 = sdk.helpers.item.isModifierListForSelectedModifiersValid(maxLargerThan0Item.modifier_lists![1], modifierSelections1);
		expect(result3).toStrictEqual(true);
		const modifierSelections2 = createModifierSelection({});
		const result4 = sdk.helpers.item.isModifierListForSelectedModifiersValid(maxLargerThan0Item.modifier_lists![1], modifierSelections2);
		expect(result4).toStrictEqual(false);
	});

	it('should verify text modifier with same min/max 0', () => {
		const sameChoiceMinMaxItem = createTestItem({ textModifierMin: 0, textModifierMax: 0 });

		const result = sdk.helpers.item.isModifierListForSelectedModifiersValid(sameChoiceMinMaxItem.modifier_lists![3], []);
		expect(result).toStrictEqual(true);
		const modifierSelections0 = createModifierSelection({ textSelectionCount: 0 });
		const result2 = sdk.helpers.item.isModifierListForSelectedModifiersValid(sameChoiceMinMaxItem.modifier_lists![3], modifierSelections0);
		expect(result2).toStrictEqual(true);
		const modifierSelections1 = createModifierSelection({ textSelectionCount: 1 });
		const result3 = sdk.helpers.item.isModifierListForSelectedModifiersValid(sameChoiceMinMaxItem.modifier_lists![3], modifierSelections1);
		expect(result3).toStrictEqual(true);
		const modifierSelections2 = createModifierSelection({});
		const result4 = sdk.helpers.item.isModifierListForSelectedModifiersValid(sameChoiceMinMaxItem.modifier_lists![3], modifierSelections2);
		expect(result4).toStrictEqual(true);
	});

	it('should verify text modifier with same min/max 1', () => {
		const sameChoiceMinMaxItem = createTestItem({ textModifierMin: 1, textModifierMax: 1 });

		const result = sdk.helpers.item.isModifierListForSelectedModifiersValid(sameChoiceMinMaxItem.modifier_lists![3], []);
		expect(result).toStrictEqual(false);
		const modifierSelections0 = createModifierSelection({ textSelectionCount: 0 });
		const result2 = sdk.helpers.item.isModifierListForSelectedModifiersValid(sameChoiceMinMaxItem.modifier_lists![3], modifierSelections0);
		expect(result2).toStrictEqual(false);
		const modifierSelections1 = createModifierSelection({ textSelectionCount: 1 });
		const result3 = sdk.helpers.item.isModifierListForSelectedModifiersValid(sameChoiceMinMaxItem.modifier_lists![3], modifierSelections1);
		expect(result3).toStrictEqual(true);
		const modifierSelections2 = createModifierSelection({});
		const result4 = sdk.helpers.item.isModifierListForSelectedModifiersValid(sameChoiceMinMaxItem.modifier_lists![3], modifierSelections2);
		expect(result4).toStrictEqual(false);
	});

	it('should verify text modifier with min/max larger than 0', () => {
		const minMaxLargerThan0Item = createTestItem({ textModifierMin: 1, textModifierMax: 2 });

		const result = sdk.helpers.item.isModifierListForSelectedModifiersValid(minMaxLargerThan0Item.modifier_lists![3], []);
		expect(result).toStrictEqual(false);
		const modifierSelections0 = createModifierSelection({ textSelectionCount: 0 });
		const result2 = sdk.helpers.item.isModifierListForSelectedModifiersValid(minMaxLargerThan0Item.modifier_lists![3], modifierSelections0);
		expect(result2).toStrictEqual(false);
		const modifierSelections1 = createModifierSelection({ textSelectionCount: 1 });
		const result3 = sdk.helpers.item.isModifierListForSelectedModifiersValid(minMaxLargerThan0Item.modifier_lists![3], modifierSelections1);
		expect(result3).toStrictEqual(true);
		const modifierSelections2 = createModifierSelection({});
		const result4 = sdk.helpers.item.isModifierListForSelectedModifiersValid(minMaxLargerThan0Item.modifier_lists![3], modifierSelections2);
		expect(result4).toStrictEqual(true);
		const modifierSelections3 = createModifierSelection({ textSelectionCount: 3 });
		const result5 = sdk.helpers.item.isModifierListForSelectedModifiersValid(minMaxLargerThan0Item.modifier_lists![3], modifierSelections3);
		expect(result5).toStrictEqual(false);
	});

	it('should verify text modifier with min larger than 0', () => {
		const minLargerThan0Item = createTestItem({ textModifierMin: 1, textModifierMax: 0 });

		const result = sdk.helpers.item.isModifierListForSelectedModifiersValid(minLargerThan0Item.modifier_lists![3], []);
		expect(result).toStrictEqual(false);
		const modifierSelections0 = createModifierSelection({ textSelectionCount: 0 });
		const result2 = sdk.helpers.item.isModifierListForSelectedModifiersValid(minLargerThan0Item.modifier_lists![3], modifierSelections0);
		expect(result2).toStrictEqual(false);
		const modifierSelections1 = createModifierSelection({ textSelectionCount: 1 });
		const result3 = sdk.helpers.item.isModifierListForSelectedModifiersValid(minLargerThan0Item.modifier_lists![3], modifierSelections1);
		expect(result3).toStrictEqual(true);
		const modifierSelections2 = createModifierSelection({});
		const result4 = sdk.helpers.item.isModifierListForSelectedModifiersValid(minLargerThan0Item.modifier_lists![3], modifierSelections2);
		expect(result4).toStrictEqual(true);
	});

	it('should verify text modifier with max larger than 0', () => {
		const maxLargerThan0Item = createTestItem({ textModifierMin: 0, textModifierMax: 1 });

		const result = sdk.helpers.item.isModifierListForSelectedModifiersValid(maxLargerThan0Item.modifier_lists![3], []);
		expect(result).toStrictEqual(true);
		const modifierSelections0 = createModifierSelection({ textSelectionCount: 0 });
		const result2 = sdk.helpers.item.isModifierListForSelectedModifiersValid(maxLargerThan0Item.modifier_lists![3], modifierSelections0);
		expect(result2).toStrictEqual(true);
		const modifierSelections1 = createModifierSelection({ textSelectionCount: 1 });
		const result3 = sdk.helpers.item.isModifierListForSelectedModifiersValid(maxLargerThan0Item.modifier_lists![3], modifierSelections1);
		expect(result3).toStrictEqual(true);
		const modifierSelections2 = createModifierSelection({});
		const result4 = sdk.helpers.item.isModifierListForSelectedModifiersValid(maxLargerThan0Item.modifier_lists![3], modifierSelections2);
		expect(result4).toStrictEqual(false);
	});
});

describe('Get disabled option choices', () => {
	it('should return empty for all options with no selections', () => {
		const result = sdk.helpers.item.getDisabledOptionChoicesForSelectedOptions(defaultItem, defaultItem.item_options![0], []);
		expect(result).toStrictEqual([]);
		const result2 = sdk.helpers.item.getDisabledOptionChoicesForSelectedOptions(defaultItem, defaultItem.item_options![1], []);
		expect(result2).toStrictEqual([]);
	});

	it('should return empty for other options with single option selection', () => {
		const selectedOptions: OptionSelection[] = [
			createOptionSelection(defaultItem.item_options![0], 0),
		];
		const result = sdk.helpers.item.getDisabledOptionChoicesForSelectedOptions(defaultItem, defaultItem.item_options![0], selectedOptions);
		expect(result).toStrictEqual([]);
		const result2 = sdk.helpers.item.getDisabledOptionChoicesForSelectedOptions(defaultItem, defaultItem.item_options![1], selectedOptions);
		expect(result2).toStrictEqual([]);
		const result3 = sdk.helpers.item.getDisabledOptionChoicesForSelectedOptions(defaultItem, defaultItem.item_options![0], selectedOptions, false);
		expect(result3).toStrictEqual([ defaultItem.item_options![0].choices[1] ]);
	});

	it('should return invalid choices for selected options with all option selections', () => {
		const selectedOptions: OptionSelection[] = [
			createOptionSelection(defaultItem.item_options![0], 0),
			createOptionSelection(defaultItem.item_options![1], 0),
		];
		const result = sdk.helpers.item.getDisabledOptionChoicesForSelectedOptions(defaultItem, defaultItem.item_options![0], selectedOptions);
		expect(result).toStrictEqual([]);
		const result2 = sdk.helpers.item.getDisabledOptionChoicesForSelectedOptions(defaultItem, defaultItem.item_options![1], selectedOptions);
		expect(result2).toStrictEqual([]);
		const result3 = sdk.helpers.item.getDisabledOptionChoicesForSelectedOptions(defaultItem, defaultItem.item_options![0], selectedOptions, false);
		expect(result3).toStrictEqual([ defaultItem.item_options![0].choices[1] ]);
		const result4 = sdk.helpers.item.getDisabledOptionChoicesForSelectedOptions(defaultItem, defaultItem.item_options![1], selectedOptions, false);
		expect(result4).toStrictEqual([ defaultItem.item_options![1].choices[1] ]);
	});

	it('should return invalid choice for sold out variant with single option selected', () => {
		const multipleVariationsItem = createTestItem({ setSoldOut: true });
		const selectedOptions: OptionSelection[] = [
			createOptionSelection(multipleVariationsItem.item_options![0], 1),
		];
		const result = sdk.helpers.item.getDisabledOptionChoicesForSelectedOptions(multipleVariationsItem, multipleVariationsItem.item_options![0], selectedOptions);
		expect(result).toStrictEqual([]);
		const result2 = sdk.helpers.item.getDisabledOptionChoicesForSelectedOptions(multipleVariationsItem, multipleVariationsItem.item_options![1], selectedOptions);
		expect(result2).toStrictEqual([ multipleVariationsItem.item_options![1].choices[1] ]);
		const result3 = sdk.helpers.item.getDisabledOptionChoicesForSelectedOptions(multipleVariationsItem, multipleVariationsItem.item_options![0], selectedOptions, false);
		expect(result3).toStrictEqual([ multipleVariationsItem.item_options![0].choices[0] ]);
		const result4 = sdk.helpers.item.getDisabledOptionChoicesForSelectedOptions(multipleVariationsItem, multipleVariationsItem.item_options![1], selectedOptions, false);
		expect(result4).toStrictEqual([ multipleVariationsItem.item_options![1].choices[1] ]);
	});

	it('should return invalid choice with inventory 0 variant with single option selected', () => {
		const multipleVariationsItem = createTestItem({ setInventoryZero: true });
		const selectedOptions: OptionSelection[] = [
			createOptionSelection(multipleVariationsItem.item_options![0], 1),
		];
		const result = sdk.helpers.item.getDisabledOptionChoicesForSelectedOptions(multipleVariationsItem, multipleVariationsItem.item_options![0], selectedOptions);
		expect(result).toStrictEqual([]);
		const result2 = sdk.helpers.item.getDisabledOptionChoicesForSelectedOptions(multipleVariationsItem, multipleVariationsItem.item_options![1], selectedOptions);
		expect(result2).toStrictEqual([ multipleVariationsItem.item_options![1].choices[1] ]);
		const result3 = sdk.helpers.item.getDisabledOptionChoicesForSelectedOptions(multipleVariationsItem, multipleVariationsItem.item_options![0], selectedOptions, false);
		expect(result3).toStrictEqual([ multipleVariationsItem.item_options![0].choices[0] ]);
		const result4 = sdk.helpers.item.getDisabledOptionChoicesForSelectedOptions(multipleVariationsItem, multipleVariationsItem.item_options![1], selectedOptions, false);
		expect(result4).toStrictEqual([ multipleVariationsItem.item_options![1].choices[1] ]);
	});

	it('should return empty with inventory above 0 variant with single option selected', () => {
		const multipleVariationsItem = createTestItem({ setInventoryAboveZero: true });
		const selectedOptions: OptionSelection[] = [
			createOptionSelection(multipleVariationsItem.item_options![0], 1),
		];
		const result = sdk.helpers.item.getDisabledOptionChoicesForSelectedOptions(multipleVariationsItem, multipleVariationsItem.item_options![0], selectedOptions);
		expect(result).toStrictEqual([]);
		const result2 = sdk.helpers.item.getDisabledOptionChoicesForSelectedOptions(multipleVariationsItem, multipleVariationsItem.item_options![1], selectedOptions);
		expect(result2).toStrictEqual([]);
		const result3 = sdk.helpers.item.getDisabledOptionChoicesForSelectedOptions(multipleVariationsItem, multipleVariationsItem.item_options![0], selectedOptions, false);
		expect(result3).toStrictEqual([ multipleVariationsItem.item_options![0].choices[0] ]);
		const result4 = sdk.helpers.item.getDisabledOptionChoicesForSelectedOptions(multipleVariationsItem, multipleVariationsItem.item_options![1], selectedOptions, false);
		expect(result4).toStrictEqual([]);
	});

	it('should return all choices with sold out options selected', () => {
		const multipleVariationsItem = createTestItem({ setSoldOut: true });
		const selectedOptions: OptionSelection[] = [
			createOptionSelection(multipleVariationsItem.item_options![0], 1),
			createOptionSelection(multipleVariationsItem.item_options![1], 1),
		];
		const result = sdk.helpers.item.getDisabledOptionChoicesForSelectedOptions(multipleVariationsItem, multipleVariationsItem.item_options![0], selectedOptions);
		expect(result).toStrictEqual([ multipleVariationsItem.item_options![0].choices[1] ]);
		const result2 = sdk.helpers.item.getDisabledOptionChoicesForSelectedOptions(multipleVariationsItem, multipleVariationsItem.item_options![1], selectedOptions);
		expect(result2).toStrictEqual([ multipleVariationsItem.item_options![1].choices[1] ]);
		const result3 = sdk.helpers.item.getDisabledOptionChoicesForSelectedOptions(multipleVariationsItem, multipleVariationsItem.item_options![0], selectedOptions, false);
		expect(result3).toStrictEqual([ multipleVariationsItem.item_options![0].choices[0], multipleVariationsItem.item_options![0].choices[1] ]);
		const result4 = sdk.helpers.item.getDisabledOptionChoicesForSelectedOptions(multipleVariationsItem, multipleVariationsItem.item_options![1], selectedOptions, false);
		expect(result4).toStrictEqual([ multipleVariationsItem.item_options![1].choices[0], multipleVariationsItem.item_options![1].choices[1] ]);
	});
});

describe('Validate item', () => {
	it('should return for valid item with variations', () => {
		const selectedVariationId = defaultItem.variations[3].id;
		const selectedModifiers = createModifierSelection({});
		const result = sdk.helpers.item.validateItem({ item: defaultItem, selectedVariationId, selectedModifiers });
		expect(result).toStrictEqual({
			itemId: defaultItem.id,
			variationId: defaultItem.variations[3].id,
			modifiers: selectedModifiers
		});
	});

	it('should return for valid item with variations and selected variation id', () => {
		const selectedOptions: OptionSelection[] = [
			createOptionSelection(defaultItem.item_options![0], 1),
			createOptionSelection(defaultItem.item_options![1], 1),
		];
		const selectedModifiers = createModifierSelection({});
		const result = sdk.helpers.item.validateItem({ item: defaultItem, selectedOptions, selectedModifiers });
		expect(result).toStrictEqual({
			itemId: defaultItem.id,
			variationId: defaultItem.variations[3].id,
			modifiers: selectedModifiers
		});
	});

	it('should return for valid item with single variation', () => {
		const singleVariationItem = createTestItem({ variationType: 'single' });
		const selectedModifiers = createModifierSelection({});
		const result = sdk.helpers.item.validateItem({ item: singleVariationItem, selectedModifiers });
		expect(result).toStrictEqual({
			itemId: singleVariationItem.id,
			variationId: singleVariationItem.variations[0].id,
			modifiers: selectedModifiers
		});
	});

	it('should return with invalid selected variation with single variation', () => {
		const singleVariationItem = createTestItem({ variationType: 'single' });
		const selectedModifiers = createModifierSelection({});
		const result = sdk.helpers.item.validateItem({ item: singleVariationItem, selectedModifiers, selectedVariationId: 'doesnotexist' });
		expect(result).toStrictEqual({
			itemId: singleVariationItem.id,
			variationId: singleVariationItem.variations[0].id,
			modifiers: selectedModifiers
		});
	});

	it('should return for valid variation item with flat variations', () => {
		const flatVariationItem = createTestItem({ variationType: 'flat' });
		const selectedVariationId = flatVariationItem.variations[3].id;
		const selectedModifiers = createModifierSelection({});
		const result = sdk.helpers.item.validateItem({ item: flatVariationItem, selectedVariationId, selectedModifiers });
		expect(result).toStrictEqual({
			itemId: flatVariationItem.id,
			variationId: selectedVariationId,
			modifiers: selectedModifiers
		});
	});

	it('should throw with invalid selected variation for flat variations', () => {
		const flatVariationItem = createTestItem({ variationType: 'flat' });
		const validateItemFn = () => sdk.helpers.item.validateItem({ item: flatVariationItem, selectedVariationId: 'doesnotexist' });
		expect(validateItemFn).toThrowError();
		try {
			validateItemFn();
		} catch (ex) {
			expect((<ValidateItemError>ex).flatVariationSelectionMissing).toBeUndefined();
			expect((<ValidateItemError>ex).itemOptionIds).toBeUndefined();
			expect((<ValidateItemError>ex).variationId).toBeUndefined();
			expect((<ValidateItemError>ex).quantityErrorType).toBeUndefined();
			expect((<ValidateItemError>ex).modifierListIds).toBeUndefined();
		}
	});

	it('should throw with no selected variation for flat variations', () => {
		const flatVariationItem = createTestItem({ variationType: 'flat' });
		const validateItemFn = () => sdk.helpers.item.validateItem({ item: flatVariationItem });
		expect(validateItemFn).toThrowError();
		try {
			validateItemFn();
		} catch (ex) {
			expect((<ValidateItemError>ex).flatVariationSelectionMissing).toBe(true);
			expect((<ValidateItemError>ex).itemOptionIds).toBeUndefined();
			expect((<ValidateItemError>ex).variationId).toBeUndefined();
			expect((<ValidateItemError>ex).modifierListIds).toBeUndefined();
		}
	});

	it('should throw missing all required options', () => {
		const validateItemFn = () => sdk.helpers.item.validateItem({ item: defaultItem });
		expect(validateItemFn).toThrowError();
		try {
			validateItemFn();
		} catch (ex) {
			expect((<ValidateItemError>ex).itemOptionIds).toStrictEqual([
				defaultItem.item_options![0].id,
				defaultItem.item_options![1].id
			]);
			expect((<ValidateItemError>ex).flatVariationSelectionMissing).toBeUndefined();
			expect((<ValidateItemError>ex).variationId).toBeUndefined();
			expect((<ValidateItemError>ex).modifierListIds).toBeUndefined();
		}
	});

	it('should throw missed required option', () => {
		const selectedOptions: OptionSelection[] = [
			createOptionSelection(defaultItem.item_options![0], 1),
		];
		const validateItemFn = () => sdk.helpers.item.validateItem({ item: defaultItem, selectedOptions });
		expect(validateItemFn).toThrowError();
		try {
			validateItemFn();
		} catch (ex) {
			expect((<ValidateItemError>ex).itemOptionIds).toStrictEqual([defaultItem.item_options![1].id]);
			expect((<ValidateItemError>ex).flatVariationSelectionMissing).toBeUndefined();
			expect((<ValidateItemError>ex).variationId).toBeUndefined();
			expect((<ValidateItemError>ex).modifierListIds).toBeUndefined();
		}
	});

	it('should throw variation sold out for single variation', () => {
		const singleVariationItem = createTestItem({ variationType: 'single', setSoldOut: true });
		const validateItemFn = () => sdk.helpers.item.validateItem({ item: singleVariationItem });
		expect(validateItemFn).toThrowError();
		try {
			validateItemFn();
		} catch (ex) {
			expect((<ValidateItemError>ex).itemOptionIds).toBeUndefined();
			expect((<ValidateItemError>ex).flatVariationSelectionMissing).toBeUndefined();
			expect((<ValidateItemError>ex).variationId).toStrictEqual(singleVariationItem.variations[0].id);
			expect((<ValidateItemError>ex).quantityErrorType).toStrictEqual(QuantityErrorType.SOLD_OUT);
			expect((<ValidateItemError>ex).modifierListIds).toBeUndefined();
		}
	});

	it('should throw variation sold out for multiple variation', () => {
		const multipleVariationItem = createTestItem({ setSoldOut: true });
		const selectedOptions: OptionSelection[] = [
			createOptionSelection(multipleVariationItem.item_options![0], 1),
			createOptionSelection(multipleVariationItem.item_options![1], 1),
		];
		const validateItemFn = () => sdk.helpers.item.validateItem({ item: multipleVariationItem, selectedOptions });
		expect(validateItemFn).toThrowError();
		try {
			validateItemFn();
		} catch (ex) {
			expect((<ValidateItemError>ex).itemOptionIds).toBeUndefined();
			expect((<ValidateItemError>ex).flatVariationSelectionMissing).toBeUndefined();
			expect((<ValidateItemError>ex).variationId).toStrictEqual(multipleVariationItem.variations[3].id);
			expect((<ValidateItemError>ex).quantityErrorType).toStrictEqual(QuantityErrorType.SOLD_OUT);
			expect((<ValidateItemError>ex).modifierListIds).toBeUndefined();
		}
		// Verify skipStockCheck works
		const result = sdk.helpers.item.validateItem({ item: multipleVariationItem, selectedOptions, skipStockCheck: true });
		expect(result).toStrictEqual({
			itemId: multipleVariationItem.id,
			variationId: multipleVariationItem.variations[3].id,
			modifiers: []
		});
		// Verify skipStockCheck still fails with quantity
		const validateItemFn2 = () => sdk.helpers.item.validateItem({ item: multipleVariationItem, selectedOptions, skipStockCheck: true, quantity: 1 });
		expect(validateItemFn2).toThrowError();
		try {
			validateItemFn2();
		} catch (ex) {
			expect((<ValidateItemError>ex).itemOptionIds).toBeUndefined();
			expect((<ValidateItemError>ex).flatVariationSelectionMissing).toBeUndefined();
			expect((<ValidateItemError>ex).variationId).toStrictEqual(multipleVariationItem.variations[3].id);
			expect((<ValidateItemError>ex).quantityErrorType).toStrictEqual(QuantityErrorType.SOLD_OUT);
			expect((<ValidateItemError>ex).modifierListIds).toBeUndefined();
		}
		// Verify in stock works
		const selectedInStockOptions: OptionSelection[] = [
			createOptionSelection(multipleVariationItem.item_options![0], 0),
			createOptionSelection(multipleVariationItem.item_options![1], 0),
		];
		const result3 = sdk.helpers.item.validateItem({ item: multipleVariationItem, selectedOptions: selectedInStockOptions });
		expect(result3).toStrictEqual({
			itemId: multipleVariationItem.id,
			variationId: multipleVariationItem.variations[0].id,
			modifiers: []
		});
	});

	it('should throw variation invalid quantity for single variation', () => {
		const singleVariationItem = createTestItem({ variationType: 'single' });
		const validateItemFn = () => sdk.helpers.item.validateItem({ item: singleVariationItem, quantity: 0 });
		expect(validateItemFn).toThrowError();
		try {
			validateItemFn();
		} catch (ex) {
			expect((<ValidateItemError>ex).itemOptionIds).toBeUndefined();
			expect((<ValidateItemError>ex).flatVariationSelectionMissing).toBeUndefined();
			expect((<ValidateItemError>ex).variationId).toStrictEqual(singleVariationItem.variations[0].id);
			expect((<ValidateItemError>ex).quantityErrorType).toStrictEqual(QuantityErrorType.INVALID_QUANTITY);
			expect((<ValidateItemError>ex).modifierListIds).toBeUndefined();
		}
		const validateItemFn2 = () => sdk.helpers.item.validateItem({ item: singleVariationItem, quantity: -1 });
		expect(validateItemFn2).toThrowError();
		try {
			validateItemFn2();
		} catch (ex) {
			expect((<ValidateItemError>ex).itemOptionIds).toBeUndefined();
			expect((<ValidateItemError>ex).flatVariationSelectionMissing).toBeUndefined();
			expect((<ValidateItemError>ex).variationId).toStrictEqual(singleVariationItem.variations[0].id);
			expect((<ValidateItemError>ex).quantityErrorType).toStrictEqual(QuantityErrorType.INVALID_QUANTITY);
			expect((<ValidateItemError>ex).modifierListIds).toBeUndefined();
		}
	});

	it('should throw variation stock exceeded for multiple variation', () => {
		const multipleVariationItem = createTestItem({ setInventoryAboveZero: true });
		const selectedOptions: OptionSelection[] = [
			createOptionSelection(multipleVariationItem.item_options![0], 1),
			createOptionSelection(multipleVariationItem.item_options![1], 1),
		];
		const validateItemFn = () => sdk.helpers.item.validateItem({ item: multipleVariationItem, selectedOptions, quantity: 2 });
		expect(validateItemFn).toThrowError();
		try {
			validateItemFn();
		} catch (ex) {
			expect((<ValidateItemError>ex).itemOptionIds).toBeUndefined();
			expect((<ValidateItemError>ex).flatVariationSelectionMissing).toBeUndefined();
			expect((<ValidateItemError>ex).variationId).toStrictEqual(multipleVariationItem.variations[3].id);
			expect((<ValidateItemError>ex).quantityErrorType).toStrictEqual(QuantityErrorType.STOCK_EXCEEDED);
			expect((<ValidateItemError>ex).modifierListIds).toBeUndefined();
		}
		// Verify skipStockCheck still fails with quantity
		const validateItemFn2 = () => sdk.helpers.item.validateItem({ item: multipleVariationItem, selectedOptions, skipStockCheck: true, quantity: 2 });
		expect(validateItemFn2).toThrowError();
		try {
			validateItemFn2();
		} catch (ex) {
			expect((<ValidateItemError>ex).itemOptionIds).toBeUndefined();
			expect((<ValidateItemError>ex).flatVariationSelectionMissing).toBeUndefined();
			expect((<ValidateItemError>ex).variationId).toStrictEqual(multipleVariationItem.variations[3].id);
			expect((<ValidateItemError>ex).quantityErrorType).toStrictEqual(QuantityErrorType.STOCK_EXCEEDED);
			expect((<ValidateItemError>ex).modifierListIds).toBeUndefined();
		}
		// Verify stock match works
		const selectedInStockOptions: OptionSelection[] = [
			createOptionSelection(multipleVariationItem.item_options![0], 0),
			createOptionSelection(multipleVariationItem.item_options![1], 0),
		];
		const result3 = sdk.helpers.item.validateItem({ item: multipleVariationItem, selectedOptions: selectedInStockOptions, quantity: 1 });
		expect(result3).toStrictEqual({
			itemId: multipleVariationItem.id,
			variationId: multipleVariationItem.variations[0].id,
			modifiers: [],
			quantity: 1
		});
	});

	it('should throw variation per order max exceeded for multiple variation', () => {
		const multipleVariationItem = createTestItem({ perOrderMax: 2 });
		const selectedOptions: OptionSelection[] = [
			createOptionSelection(multipleVariationItem.item_options![0], 1),
			createOptionSelection(multipleVariationItem.item_options![1], 1),
		];
		const validateItemFn = () => sdk.helpers.item.validateItem({ item: multipleVariationItem, selectedOptions, quantity: 3 });
		expect(validateItemFn).toThrowError();
		try {
			validateItemFn();
		} catch (ex) {
			expect((<ValidateItemError>ex).itemOptionIds).toBeUndefined();
			expect((<ValidateItemError>ex).flatVariationSelectionMissing).toBeUndefined();
			expect((<ValidateItemError>ex).variationId).toStrictEqual(multipleVariationItem.variations[3].id);
			expect((<ValidateItemError>ex).quantityErrorType).toStrictEqual(QuantityErrorType.PER_ORDER_MAX_EXCEEDED);
			expect((<ValidateItemError>ex).modifierListIds).toBeUndefined();
		}
		// Verify skipStockCheck still fails with quantity
		const validateItemFn2 = () => sdk.helpers.item.validateItem({ item: multipleVariationItem, selectedOptions, skipStockCheck: true, quantity: 3 });
		expect(validateItemFn2).toThrowError();
		try {
			validateItemFn2();
		} catch (ex) {
			expect((<ValidateItemError>ex).itemOptionIds).toBeUndefined();
			expect((<ValidateItemError>ex).flatVariationSelectionMissing).toBeUndefined();
			expect((<ValidateItemError>ex).variationId).toStrictEqual(multipleVariationItem.variations[3].id);
			expect((<ValidateItemError>ex).quantityErrorType).toStrictEqual(QuantityErrorType.PER_ORDER_MAX_EXCEEDED);
			expect((<ValidateItemError>ex).modifierListIds).toBeUndefined();
		}
		// Verify per order max match works
		const selectedInStockOptions: OptionSelection[] = [
			createOptionSelection(multipleVariationItem.item_options![0], 0),
			createOptionSelection(multipleVariationItem.item_options![1], 0),
		];
		const result3 = sdk.helpers.item.validateItem({ item: multipleVariationItem, selectedOptions: selectedInStockOptions, quantity: 2 });
		expect(result3).toStrictEqual({
			itemId: multipleVariationItem.id,
			variationId: multipleVariationItem.variations[0].id,
			modifiers: [],
			quantity: 2
		});
	});

	it('should throw invalid or missing modifiers', () => {
		const singleVariationItem = createTestItem({ variationType: 'single' });
		const invalidChoiceModifiers = createModifierSelection({ choiceSelectionsCount: 3 });
		const validateItemFn = () => sdk.helpers.item.validateItem({ item: singleVariationItem, selectedModifiers: invalidChoiceModifiers });
		expect(validateItemFn).toThrowError();
		try {
			validateItemFn();
		} catch (ex) {
			expect((<ValidateItemError>ex).itemOptionIds).toBeUndefined();
			expect((<ValidateItemError>ex).flatVariationSelectionMissing).toBeUndefined();
			expect((<ValidateItemError>ex).variationId).toBeUndefined();
			expect((<ValidateItemError>ex).modifierListIds).toStrictEqual([singleVariationItem.modifier_lists![1].id]);
		}
		const singleVariationItem2 = createTestItem({ variationType: 'single', choiceModifierMin: 1, choiceModifierMax: 1 });
		const missingChoiceModifiers = createModifierSelection({ choiceSelectionsCount: 0 });
		const validateItemFn2 = () => sdk.helpers.item.validateItem({ item: singleVariationItem2, selectedModifiers: missingChoiceModifiers });
		expect(validateItemFn2).toThrowError();
		try {
			validateItemFn2();
		} catch (ex) {
			expect((<ValidateItemError>ex).itemOptionIds).toBeUndefined();
			expect((<ValidateItemError>ex).flatVariationSelectionMissing).toBeUndefined();
			expect((<ValidateItemError>ex).variationId).toBeUndefined();
			expect((<ValidateItemError>ex).modifierListIds).toStrictEqual([singleVariationItem.modifier_lists![1].id]);
		}
		const invalidTextModifiers = createModifierSelection({ textSelectionCount: 3 });
		const validateItemFn3 = () => sdk.helpers.item.validateItem({ item: singleVariationItem, selectedModifiers: invalidTextModifiers });
		expect(validateItemFn3).toThrowError();
		try {
			validateItemFn3();
		} catch (ex) {
			expect((<ValidateItemError>ex).itemOptionIds).toBeUndefined();
			expect((<ValidateItemError>ex).flatVariationSelectionMissing).toBeUndefined();
			expect((<ValidateItemError>ex).variationId).toBeUndefined();
			expect((<ValidateItemError>ex).modifierListIds).toStrictEqual([singleVariationItem.modifier_lists![3].id]);
		}
		const singleVariationItem3 = createTestItem(
			{ variationType: 'single', choiceModifierMin: 1, choiceModifierMax: 1, textModifierMin: 1, textModifierMax: 1 }
		);
		const validateItemFn4 = () => sdk.helpers.item.validateItem({ item: singleVariationItem3 });
		expect(validateItemFn4).toThrowError();
		try {
			validateItemFn4();
		} catch (ex) {
			expect((<ValidateItemError>ex).itemOptionIds).toBeUndefined();
			expect((<ValidateItemError>ex).flatVariationSelectionMissing).toBeUndefined();
			expect((<ValidateItemError>ex).variationId).toBeUndefined();
			expect((<ValidateItemError>ex).modifierListIds).toStrictEqual([
				singleVariationItem.modifier_lists![1].id,
				singleVariationItem.modifier_lists![3].id
			]);
		}
	});

	it('should throw invalid or missing modifiers using ChoiceSelection', () => {
		const singleVariationItem = createTestItem({ variationType: 'single' });
		const invalidChoiceModifiers = createModifierSelection({ choiceSelectionsCount: 3, useChoiceSelectionObject: true });
		const validateItemFn = () => sdk.helpers.item.validateItem({ item: singleVariationItem, selectedModifiers: invalidChoiceModifiers });
		expect(validateItemFn).toThrowError();
		try {
			validateItemFn();
		} catch (ex) {
			expect((<ValidateItemError>ex).itemOptionIds).toBeUndefined();
			expect((<ValidateItemError>ex).flatVariationSelectionMissing).toBeUndefined();
			expect((<ValidateItemError>ex).variationId).toBeUndefined();
			expect((<ValidateItemError>ex).modifierListIds).toStrictEqual([singleVariationItem.modifier_lists![1].id]);
		}
		const singleVariationItem2 = createTestItem({ variationType: 'single', choiceModifierMin: 1, choiceModifierMax: 1 });
		const missingChoiceModifiers = createModifierSelection({ choiceSelectionsCount: 0, useChoiceSelectionObject: true });
		const validateItemFn2 = () => sdk.helpers.item.validateItem({ item: singleVariationItem2, selectedModifiers: missingChoiceModifiers });
		expect(validateItemFn2).toThrowError();
	});
});

describe('Get item price', () => {
	it('should return null on invalid item', () => {
		const multipleVariationItem = createTestItem({ setSoldOut: true });
		const selectedOptions: OptionSelection[] = [
			createOptionSelection(multipleVariationItem.item_options![0], 1),
			createOptionSelection(multipleVariationItem.item_options![1], 1),
		];
		const result = sdk.helpers.item.getItemPrice({ item: multipleVariationItem, selectedOptions });
		expect(result).toStrictEqual(null);
	});

	it('should return price on sold out item with skipStockCheck', () => {
		const multipleVariationItem = createTestItem({ setSoldOut: true });
		const selectedOptions: OptionSelection[] = [
			createOptionSelection(multipleVariationItem.item_options![0], 1),
			createOptionSelection(multipleVariationItem.item_options![1], 1),
		];
		const result = sdk.helpers.item.getItemPrice({ item: multipleVariationItem, selectedOptions, skipStockCheck: true });
		expect(result).toStrictEqual({
			regular: {
				amount: multipleVariationItem.variations[3].price.regular.amount,
				formatted: '',
				currency: multipleVariationItem.variations[3].price.regular.currency
			},
			sale: {
				amount: multipleVariationItem.variations[3].price.sale.amount,
				formatted: '',
				currency: multipleVariationItem.variations[3].price.sale.currency
			}
		});
	});

	it('should return price on invalid modifiers with skipModifierCheck', () => {
		const invalidModifierItem = createTestItem({ choiceModifierMin: 1 });
		const selectedOptions: OptionSelection[] = [
			createOptionSelection(invalidModifierItem.item_options![0], 1),
			createOptionSelection(invalidModifierItem.item_options![1], 1),
		];
		const result = sdk.helpers.item.getItemPrice({ item: invalidModifierItem, selectedOptions, skipModifierCheck: true });
		expect(result).toStrictEqual({
			regular: {
				amount: invalidModifierItem.variations[3].price.regular.amount,
				formatted: '',
				currency: invalidModifierItem.variations[3].price.regular.currency
			},
			sale: {
				amount: invalidModifierItem.variations[3].price.sale.amount,
				formatted: '',
				currency: invalidModifierItem.variations[3].price.sale.currency
			}
		});
	});

	it('should return price on modifiers', () => {
		const singleVariationItem = createTestItem({ variationType: 'single' });
		const modifierSelections = createModifierSelection({});
		const modifierCost = singleVariationItem.modifier_lists![0].modifiers![0].price_money.amount
			+ singleVariationItem.modifier_lists![1].modifiers![0].price_money.amount
			+ singleVariationItem.modifier_lists![1].modifiers![1].price_money.amount;
		const result = sdk.helpers.item.getItemPrice({ item: singleVariationItem, selectedModifiers: modifierSelections });
		expect(result).toStrictEqual({
			regular: {
				amount: singleVariationItem.variations[0].price.regular.amount + modifierCost,
				formatted: '',
				currency: singleVariationItem.variations[0].price.regular.currency
			},
			sale: {
				amount: singleVariationItem.variations[0].price.sale.amount + modifierCost,
				formatted: '',
				currency: singleVariationItem.variations[0].price.sale.currency
			}
		});
	});

	it('should return price on modifiers using ChoiceSelection', () => {
		const singleVariationItem = createTestItem({ variationType: 'single' });
		const modifierSelections = createModifierSelection({ useChoiceSelectionObject: true, useMultipleChoiceSelectionQuantity: true });
		const modifierCost = singleVariationItem.modifier_lists![0].modifiers![0].price_money.amount
			+ (singleVariationItem.modifier_lists![1].modifiers![0].price_money.amount * 2)
			+ singleVariationItem.modifier_lists![1].modifiers![1].price_money.amount;
		const result = sdk.helpers.item.getItemPrice({ item: singleVariationItem, selectedModifiers: modifierSelections });
		expect(result).toStrictEqual({
			regular: {
				amount: singleVariationItem.variations[0].price.regular.amount + modifierCost,
				formatted: '',
				currency: singleVariationItem.variations[0].price.regular.currency
			},
			sale: {
				amount: singleVariationItem.variations[0].price.sale.amount + modifierCost,
				formatted: '',
				currency: singleVariationItem.variations[0].price.sale.currency
			}
		});
	});

	it('should return price on flat variation', () => {
		const flatItem = createTestItem({ variationType: 'flat' });
		const selectedVariationId = flatItem.variations[3].id;
		const result = sdk.helpers.item.getItemPrice({ item: flatItem, selectedVariationId });
		expect(result).toStrictEqual({
			regular: {
				amount: flatItem.variations[3].price.regular.amount,
				formatted: '',
				currency: flatItem.variations[3].price.regular.currency
			},
			sale: {
				amount: flatItem.variations[3].price.sale.amount,
				formatted: '',
				currency: flatItem.variations[3].price.sale.currency
			}
		});
	});

	it('should return formatted price on modifiers', () => {
		const singleVariationItem = createTestItem({ variationType: 'single' });
		const modifierSelections = createModifierSelection({});
		const modifierCost = singleVariationItem.modifier_lists![0].modifiers![0].price_money.amount
			+ singleVariationItem.modifier_lists![1].modifiers![0].price_money.amount
			+ singleVariationItem.modifier_lists![1].modifiers![1].price_money.amount;
		const result = sdk.helpers.item.getItemPrice({ item: singleVariationItem, selectedModifiers: modifierSelections, formattedLocale: 'en-US' });
		const formatter = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
		expect(result).toStrictEqual({
			regular: {
				amount: singleVariationItem.variations[0].price.regular.amount + modifierCost,
				formatted: formatter.format(15),
				currency: singleVariationItem.variations[0].price.regular.currency
			},
			sale: {
				amount: singleVariationItem.variations[0].price.sale.amount + modifierCost,
				formatted: formatter.format(14),
				currency: singleVariationItem.variations[0].price.sale.currency
			}
		});
		const result2 = sdk.helpers.item.getItemPrice({ item: singleVariationItem, selectedModifiers: modifierSelections, formattedLocale: 'fr-FR' });
		const formatter2 = Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'USD' });
		expect(result2).toStrictEqual({
			regular: {
				amount: singleVariationItem.variations[0].price.regular.amount + modifierCost,
				formatted: formatter2.format(15),
				currency: singleVariationItem.variations[0].price.regular.currency
			},
			sale: {
				amount: singleVariationItem.variations[0].price.sale.amount + modifierCost,
				formatted: formatter2.format(14),
				currency: singleVariationItem.variations[0].price.sale.currency
			}
		});
		// Test fallback to en-US
		const result3 = sdk.helpers.item.getItemPrice({ item: singleVariationItem, selectedModifiers: modifierSelections, formattedLocale: 'ar_BH' });
		expect(result3).toStrictEqual({
			regular: {
				amount: singleVariationItem.variations[0].price.regular.amount + modifierCost,
				formatted: formatter.format(15),
				currency: singleVariationItem.variations[0].price.regular.currency
			},
			sale: {
				amount: singleVariationItem.variations[0].price.sale.amount + modifierCost,
				formatted: formatter.format(14),
				currency: singleVariationItem.variations[0].price.sale.currency
			}
		});
	});

	it('should return formatted price on modifiers with other currencies', () => {
		const currencyList = [
			{
				currency: 'CAD',
				formattedRegular: 15,
				formattedSale: 14
			},
			{
				currency: 'AUD',
				formattedRegular: 15,
				formattedSale: 14
			},
			{
				currency: 'JPY',
				formattedRegular: 1500,
				formattedSale: 1400
			},
			{
				currency: 'GBP',
				formattedRegular: 15,
				formattedSale: 14
			},
			{
				currency: 'EUR',
				formattedRegular: 15,
				formattedSale: 14
			},
			// Not supported by Square, but additional tests
			{
				currency: 'IDR',
				formattedRegular: 15,
				formattedSale: 14
			},
			{
				currency: 'BHD',
				formattedRegular: 1.5,
				formattedSale: 1.4
			}
		];

		currencyList.forEach(c => {
			const singleVariationItem = createTestItem({ variationType: 'single', currency: c.currency });
			const modifierSelections = createModifierSelection({});
			const modifierCost = singleVariationItem.modifier_lists![0].modifiers![0].price_money.amount
				+ singleVariationItem.modifier_lists![1].modifiers![0].price_money.amount
				+ singleVariationItem.modifier_lists![1].modifiers![1].price_money.amount;
			const result = sdk.helpers.item.getItemPrice({ item: singleVariationItem, selectedModifiers: modifierSelections, formattedLocale: 'en-US' });
			const formatter = Intl.NumberFormat('en-US', { style: 'currency', currency: c.currency });
			expect(result).toStrictEqual({
				regular: {
					amount: singleVariationItem.variations[0].price.regular.amount + modifierCost,
					formatted: formatter.format(c.formattedRegular),
					currency: singleVariationItem.variations[0].price.regular.currency
				},
				sale: {
					amount: singleVariationItem.variations[0].price.sale.amount + modifierCost,
					formatted: formatter.format(c.formattedSale),
					currency: singleVariationItem.variations[0].price.sale.currency
				}
			});
		});
	});
});

describe('Get item sold out', () => {
	it('should return false', () => {
		const result = sdk.helpers.item.isItemSoldOut(defaultItem);
		expect(result).toStrictEqual(false);
		const flatItem = createTestItem({ variationType: 'flat' });
		const result2 = sdk.helpers.item.isItemSoldOut(flatItem);
		expect(result2).toStrictEqual(false);
		const singleItem = createTestItem({ variationType: 'single' });
		const result3 = sdk.helpers.item.isItemSoldOut(singleItem);
		expect(result3).toStrictEqual(false);
		const multiSoldOutSingleItem = createTestItem({ setSoldOut: true });
		const result4 = sdk.helpers.item.isItemSoldOut(multiSoldOutSingleItem);
		expect(result4).toStrictEqual(false);
		const flatSoldOutSingleItem = createTestItem({ variationType: 'flat', setSoldOut: true });
		const result5 = sdk.helpers.item.isItemSoldOut(flatSoldOutSingleItem);
		expect(result5).toStrictEqual(false);
		const multiInventoryZeroSingleItem = createTestItem({ setInventoryZero: true });
		const result6 = sdk.helpers.item.isItemSoldOut(multiInventoryZeroSingleItem);
		expect(result6).toStrictEqual(false);
		const flatInventoryZeroSingleItem = createTestItem({ variationType: 'flat', setInventoryZero: true });
		const result7 = sdk.helpers.item.isItemSoldOut(flatInventoryZeroSingleItem);
		expect(result7).toStrictEqual(false);
		const multiInventoryAboveZeroSingleItem = createTestItem({ setInventoryAboveZero: true });
		const result8 = sdk.helpers.item.isItemSoldOut(multiInventoryAboveZeroSingleItem);
		expect(result8).toStrictEqual(false);
		const flatInventoryAboveZeroSingleItem = createTestItem({ variationType: 'flat', setInventoryAboveZero: true });
		const result9 = sdk.helpers.item.isItemSoldOut(flatInventoryAboveZeroSingleItem);
		expect(result9).toStrictEqual(false);
	});

	it('should return true', () => {
		const multiSoldOutItem = createTestItem({ setAllSoldOut: true });
		const result = sdk.helpers.item.isItemSoldOut(multiSoldOutItem);
		expect(result).toStrictEqual(true);
		const flatSoldOutItem = createTestItem({ variationType: 'flat', setAllSoldOut: true });
		const result2 = sdk.helpers.item.isItemSoldOut(flatSoldOutItem);
		expect(result2).toStrictEqual(true);
		const singleSoldOutItem = createTestItem({ variationType: 'single', setAllSoldOut: true });
		const result3 = sdk.helpers.item.isItemSoldOut(singleSoldOutItem);
		expect(result3).toStrictEqual(true);
		const multiInventoryZeroItem = createTestItem({ setAllInventoryZero: true });
		const result4 = sdk.helpers.item.isItemSoldOut(multiInventoryZeroItem);
		expect(result4).toStrictEqual(true);
		const flatInventoryZeroItem = createTestItem({ variationType: 'flat', setAllInventoryZero: true });
		const result5 = sdk.helpers.item.isItemSoldOut(flatInventoryZeroItem);
		expect(result5).toStrictEqual(true);
		const singleInventoryZeroItem = createTestItem({ variationType: 'single', setAllInventoryZero: true });
		const result6 = sdk.helpers.item.isItemSoldOut(singleInventoryZeroItem);
		expect(result6).toStrictEqual(true);
	});
});

describe('Is event item in the past', () => {
	it('should return false for non event item', () => {
		const result = sdk.helpers.item.isEventItemInThePast(defaultItem);
		expect(result).toStrictEqual(false);
	});

	it('should test event in the future for pacific time', () => {
		const date = '2023-07-18T22:00:00-07:00';
		vi.setSystemTime(new Date(date));

		const item = createTestItem({
			squareOnlineType: 'EVENT',
			itemTypeDetailsEndDate: '2023-07-19',
			itemTypeDetailsEndTime: '1:00 AM',
			itemTypeDetailsOffset: '-04:00'
		});
		const result = sdk.helpers.item.isEventItemInThePast(item);
		expect(result).toStrictEqual(true);
		const item2 = createTestItem({
			squareOnlineType: 'EVENT',
			itemTypeDetailsEndDate: '2023-07-19',
			itemTypeDetailsEndTime: '12:59 AM',
			itemTypeDetailsOffset: '-04:00'
		});
		const result2 = sdk.helpers.item.isEventItemInThePast(item2);
		expect(result2).toStrictEqual(true);
		const item3 = createTestItem({
			squareOnlineType: 'EVENT',
			itemTypeDetailsEndDate: '2023-07-19',
			itemTypeDetailsEndTime: '1:01 AM',
			itemTypeDetailsOffset: '-04:00'
		});
		const result3 = sdk.helpers.item.isEventItemInThePast(item3);
		expect(result3).toStrictEqual(false);
	});

	it('should test event in the future for eastern time', () => {
		const date = '2023-07-18T16:00:00-04:00';
		vi.setSystemTime(new Date(date));

		const item = createTestItem({
			squareOnlineType: 'EVENT',
			itemTypeDetailsEndDate: '2023-07-18',
			itemTypeDetailsEndTime: '4:00 PM',
			itemTypeDetailsOffset: '-04:00'
		});
		const result = sdk.helpers.item.isEventItemInThePast(item);
		expect(result).toStrictEqual(true);
		const item2 = createTestItem({
			squareOnlineType: 'EVENT',
			itemTypeDetailsEndDate: '2023-07-18',
			itemTypeDetailsEndTime: '3:59 PM',
			itemTypeDetailsOffset: '-04:00'
		});
		const result2 = sdk.helpers.item.isEventItemInThePast(item2);
		expect(result2).toStrictEqual(true);
		const item3 = createTestItem({
			squareOnlineType: 'EVENT',
			itemTypeDetailsEndDate: '2023-07-18',
			itemTypeDetailsEndTime: '4:01 PM',
			itemTypeDetailsOffset: '-04:00'
		});
		const result3 = sdk.helpers.item.isEventItemInThePast(item3);
		expect(result3).toStrictEqual(false);
	});

	it('should test event in the future for eastern time at noon', () => {
		const date = '2023-07-18T12:00:00-04:00';
		vi.setSystemTime(new Date(date));

		const item = createTestItem({
			squareOnlineType: 'EVENT',
			itemTypeDetailsEndDate: '2023-07-18',
			itemTypeDetailsEndTime: '12:00 PM',
			itemTypeDetailsOffset: '-04:00'
		});
		const result = sdk.helpers.item.isEventItemInThePast(item);
		expect(result).toStrictEqual(true);
		const item2 = createTestItem({
			squareOnlineType: 'EVENT',
			itemTypeDetailsEndDate: '2023-07-18',
			itemTypeDetailsEndTime: '11:59 AM',
			itemTypeDetailsOffset: '-04:00'
		});
		const result2 = sdk.helpers.item.isEventItemInThePast(item2);
		expect(result2).toStrictEqual(true);
		const item3 = createTestItem({
			squareOnlineType: 'EVENT',
			itemTypeDetailsEndDate: '2023-07-18',
			itemTypeDetailsEndTime: '12:01 PM',
			itemTypeDetailsOffset: '-04:00'
		});
		const result3 = sdk.helpers.item.isEventItemInThePast(item3);
		expect(result3).toStrictEqual(false);
	});
});

describe('Is preorder item cutoff in the past', () => {
	it('should return false for no preorder', () => {
		const result = sdk.helpers.item.isPreorderItemCutoffInThePast(defaultItem);
		expect(result).toStrictEqual(false);
	});

	it('should test preorder cutoff times in pacific', () => {
		const date = '2023-07-18T22:00:00-07:00';
		vi.setSystemTime(new Date(date));

		const item = createTestItem({
			preorderingCutoff: '2023-07-19T01:00:00-04:00'
		});
		const result = sdk.helpers.item.isPreorderItemCutoffInThePast(item);
		expect(result).toStrictEqual(true);
		const item2 = createTestItem({
			preorderingCutoff: '2023-07-19T00:59:00-04:00'
		});
		const result2 = sdk.helpers.item.isPreorderItemCutoffInThePast(item2);
		expect(result2).toStrictEqual(true);
		const item3 = createTestItem({
			preorderingCutoff: '2023-07-19T01:01:01-04:00'
		});
		const result3 = sdk.helpers.item.isPreorderItemCutoffInThePast(item3);
		expect(result3).toStrictEqual(false);
	});

	it('should test preorder cutoff times in eastern', () => {
		const date = '2023-07-18T16:00:00-04:00';
		vi.setSystemTime(new Date(date));

		const item = createTestItem({
			preorderingCutoff: '2023-07-18T16:00:00-04:00'
		});
		const result = sdk.helpers.item.isPreorderItemCutoffInThePast(item);
		expect(result).toStrictEqual(true);
		const item2 = createTestItem({
			preorderingCutoff: '2023-07-18T15:59:00-04:00'
		});
		const result2 = sdk.helpers.item.isPreorderItemCutoffInThePast(item2);
		expect(result2).toStrictEqual(true);
		const item3 = createTestItem({
			preorderingCutoff: '2023-07-18T16:01:00-04:00'
		});
		const result3 = sdk.helpers.item.isPreorderItemCutoffInThePast(item3);
		expect(result3).toStrictEqual(false);
	});
});

describe('Is item prep time correctly parsed', () => {
	it.each([
		{ value: 'PT20M', expected: { value: 20, unit: 'M', is_time: true } },
		{ value: 'PT60M', expected: { value: 60, unit: 'M', is_time: true } },
		{ value: 'PT90M', expected: { value: 90, unit: 'M', is_time: true } },
		{ value: 'PT120M', expected: { value: 120, unit: 'M', is_time: true } },
		{ value: 'PT1H', expected: { value: 1, unit: 'H', is_time: true } },
		{ value: 'PT2H', expected: { value: 2, unit: 'H', is_time: true } },
		{ value: 'P1D', expected: { value: 1, unit: 'D', is_time: false } },
		{ value: 'P2D', expected: { value: 2, unit: 'D', is_time: false } },
		{ value: 'P7D', expected: { value: 7, unit: 'D', is_time: false } },
		{ value: 'P1W', expected: { value: 1, unit: 'W', is_time: false } },
		{ value: 'P3W', expected: { value: 3, unit: 'W', is_time: false } },
		{ value: 'P8W', expected: { value: 8, unit: 'W', is_time: false } },
		{ value: 'P1M', expected: { value: 1, unit: 'M', is_time: false } },
		{ value: 'P3M', expected: { value: 3, unit: 'M', is_time: false } },
		{ value: 'P1Y', expected: { value: 1, unit: 'Y', is_time: false } },
		{ value: 'P3Y', expected: { value: 3, unit: 'Y', is_time: false } },
		{ value: 'P3', expected: null },
		{ value: 'PD', expected: null },
		{ value: 'PT3', expected: null },
		{ value: 'PTD', expected: null },
	])('should return $expected for value $value', ({ value, expected }) => {
		expect(sdk.helpers.item.parsePrepTime(value)).toStrictEqual(expected);
	});
});
