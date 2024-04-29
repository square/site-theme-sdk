[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [helpers/item](../modules/helpers_item.md) / Item

# Class: Item

[helpers/item](../modules/helpers_item.md).Item

## Table of contents

### Constructors

- [constructor](helpers_item.Item.md#constructor)

### Methods

- [getVariations](helpers_item.Item.md#getvariations)
- [getItemOptions](helpers_item.Item.md#getitemoptions)
- [getModifierLists](helpers_item.Item.md#getmodifierlists)
- [isVariationSoldOut](helpers_item.Item.md#isvariationsoldout)
- [getItemQuantityError](helpers_item.Item.md#getitemquantityerror)
- [isItemSoldOut](helpers_item.Item.md#isitemsoldout)
- [getInStockVariationsForSelectedOptionsOrVariation](helpers_item.Item.md#getinstockvariationsforselectedoptionsorvariation)
- [isOptionChoiceDisabledForSelectedOptions](helpers_item.Item.md#isoptionchoicedisabledforselectedoptions)
- [isModifierListForSelectedModifiersValid](helpers_item.Item.md#ismodifierlistforselectedmodifiersvalid)
- [getDisabledOptionChoicesForSelectedOptions](helpers_item.Item.md#getdisabledoptionchoicesforselectedoptions)
- [validateItem](helpers_item.Item.md#validateitem)
- [getItemPrice](helpers_item.Item.md#getitemprice)
- [isEventItemInThePast](helpers_item.Item.md#iseventiteminthepast)
- [isPreorderItemCutoffInThePast](helpers_item.Item.md#ispreorderitemcutoffinthepast)
- [parsePrepTime](helpers_item.Item.md#parsepreptime)

## Constructors

### constructor

• **new Item**()

## Methods

### getVariations

▸ **getVariations**(`item`): [`Variation`](../interfaces/types_helpers_item.Variation.md)[]

Returns the variations for an item resource.

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`Item`](../interfaces/types_helpers_item.Item.md) |

#### Returns

[`Variation`](../interfaces/types_helpers_item.Variation.md)[]

___

### getItemOptions

▸ **getItemOptions**(`item`): `undefined` \| [`ItemOption`](../interfaces/types_helpers_item.ItemOption.md)[]

Returns the item options for an item resource.

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`Item`](../interfaces/types_helpers_item.Item.md) |

#### Returns

`undefined` \| [`ItemOption`](../interfaces/types_helpers_item.ItemOption.md)[]

___

### getModifierLists

▸ **getModifierLists**(`item`): `undefined` \| [`ModifierList`](../interfaces/types_helpers_item.ModifierList.md)[]

Returns the modifier lists for an item resource.

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`Item`](../interfaces/types_helpers_item.Item.md) |

#### Returns

`undefined` \| [`ModifierList`](../interfaces/types_helpers_item.ModifierList.md)[]

___

### isVariationSoldOut

▸ **isVariationSoldOut**(`variation`): `boolean`

Returns whether a particular variation is sold out.

#### Parameters

| Name | Type |
| :------ | :------ |
| `variation` | [`Variation`](../interfaces/types_helpers_item.Variation.md) |

#### Returns

`boolean`

___

### getItemQuantityError

▸ **getItemQuantityError**(`item`, `variation`, `quantity`): ``null`` \| [`QuantityErrorTypeEnum`](../modules/types_helpers_item.md#quantityerrortypeenum)

Returns the QuantityErrorType if there's an item quantity error with the item varation, otherwise null.

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`Item`](../interfaces/types_helpers_item.Item.md) |
| `variation` | [`Variation`](../interfaces/types_helpers_item.Variation.md) |
| `quantity` | `number` |

#### Returns

``null`` \| [`QuantityErrorTypeEnum`](../modules/types_helpers_item.md#quantityerrortypeenum)

___

### isItemSoldOut

▸ **isItemSoldOut**(`item`): `boolean`

Returns whether all variations of an item are sold out.

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`Item`](../interfaces/types_helpers_item.Item.md) |

#### Returns

`boolean`

___

### getInStockVariationsForSelectedOptionsOrVariation

▸ **getInStockVariationsForSelectedOptionsOrVariation**(`«destructured»`): [`Variation`](../interfaces/types_helpers_item.Variation.md)[]

Returns all variations in stock for the selected options or variation.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`GetInStockVariationsForSelectedOptionsOrVariationRequest`](../interfaces/types_helpers_item.GetInStockVariationsForSelectedOptionsOrVariationRequest.md) |

#### Returns

[`Variation`](../interfaces/types_helpers_item.Variation.md)[]

___

### isOptionChoiceDisabledForSelectedOptions

▸ **isOptionChoiceDisabledForSelectedOptions**(`item`, `optionChoice`, `selectedOptions`, `removeMatchingOptionSet?`): `boolean`

Returns whether an item's option choice is disabled based on the selected options.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `item` | [`Item`](../interfaces/types_helpers_item.Item.md) | `undefined` |
| `optionChoice` | [`OptionSelection`](../interfaces/types_helpers_item.OptionSelection.md) | `undefined` |
| `selectedOptions` | [`OptionSelection`](../interfaces/types_helpers_item.OptionSelection.md)[] | `undefined` |
| `removeMatchingOptionSet` | `boolean` | `true` |

#### Returns

`boolean`

___

### isModifierListForSelectedModifiersValid

▸ **isModifierListForSelectedModifiersValid**(`modifierList`, `selectedModifiers`): `boolean`

Returns whether a modifier list is valid for the selected modifiers.

#### Parameters

| Name | Type |
| :------ | :------ |
| `modifierList` | [`ModifierList`](../interfaces/types_helpers_item.ModifierList.md) |
| `selectedModifiers` | [`AddItemModifier`](../modules/types_api_cart.md#additemmodifier)[] |

#### Returns

`boolean`

___

### getDisabledOptionChoicesForSelectedOptions

▸ **getDisabledOptionChoicesForSelectedOptions**(`item`, `itemOption`, `selectedOptions`, `removeMatchingOptionSet?`): `string`[]

Returns the disabled option choices for an item based on the selected options.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `item` | [`Item`](../interfaces/types_helpers_item.Item.md) | `undefined` |
| `itemOption` | [`ItemOption`](../interfaces/types_helpers_item.ItemOption.md) | `undefined` |
| `selectedOptions` | [`OptionSelection`](../interfaces/types_helpers_item.OptionSelection.md)[] | `undefined` |
| `removeMatchingOptionSet` | `boolean` | `true` |

#### Returns

`string`[]

___

### validateItem

▸ **validateItem**(`«destructured»`): [`AddLineItem`](../interfaces/types_api_cart.AddLineItem.md)

Returns whether an item with any combination of selected options, modifiers, variationId, and quantity is valid.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`ValidateItemRequest`](../interfaces/types_helpers_item.ValidateItemRequest.md) |

#### Returns

[`AddLineItem`](../interfaces/types_api_cart.AddLineItem.md)

**`Throws`**

[ValidateItemError](../interfaces/types_helpers_item.ValidateItemError.md)

___

### getItemPrice

▸ **getItemPrice**(`«destructured»`): ``null`` \| [`ItemPrice`](../interfaces/types_helpers_item.ItemPrice.md)

Returns the price of an item based on the selected options, modifiers, and/or variation id.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`GetItemPriceRequest`](../interfaces/types_helpers_item.GetItemPriceRequest.md) |

#### Returns

``null`` \| [`ItemPrice`](../interfaces/types_helpers_item.ItemPrice.md)

___

### isEventItemInThePast

▸ **isEventItemInThePast**(`item`): `boolean`

Returns whether an item is an event and has ended.

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`Item`](../interfaces/types_helpers_item.Item.md) |

#### Returns

`boolean`

___

### isPreorderItemCutoffInThePast

▸ **isPreorderItemCutoffInThePast**(`item`): `boolean`

Returns whether an item is a preorder and the cutoff time has passed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`Item`](../interfaces/types_helpers_item.Item.md) |

#### Returns

`boolean`

___

### parsePrepTime

▸ **parsePrepTime**(`prepTimeDuration`): ``null`` \| [`ItemPrepTime`](../interfaces/types_helpers_item.ItemPrepTime.md)

Returns the item's prep time duration parsed into value, unit, is_time.
is_time means prep duration includes a time component (hour/minute/second). It's used to differentiate '4M' between '4 months' and '4 minutes'
Note that this function relies on the fact that prepTimeDuration currently only supports
a single time unit! I.e. P2DT6H20M is not currently supported and will not work.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prepTimeDuration` | `string` |

#### Returns

``null`` \| [`ItemPrepTime`](../interfaces/types_helpers_item.ItemPrepTime.md)
