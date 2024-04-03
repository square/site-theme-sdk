[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [types/helpers/item](../modules/types_helpers_item.md) / GetItemPriceRequest

# Interface: GetItemPriceRequest

[types/helpers/item](../modules/types_helpers_item.md).GetItemPriceRequest

## Table of contents

### Properties

- [item](types_helpers_item.GetItemPriceRequest.md#item)
- [selectedOptions](types_helpers_item.GetItemPriceRequest.md#selectedoptions)
- [selectedModifiers](types_helpers_item.GetItemPriceRequest.md#selectedmodifiers)
- [selectedVariationId](types_helpers_item.GetItemPriceRequest.md#selectedvariationid)
- [skipStockCheck](types_helpers_item.GetItemPriceRequest.md#skipstockcheck)
- [skipModifierCheck](types_helpers_item.GetItemPriceRequest.md#skipmodifiercheck)
- [formattedLocale](types_helpers_item.GetItemPriceRequest.md#formattedlocale)

## Properties

### item

• **item**: [`Item`](types_helpers_item.Item.md)

___

### selectedOptions

• `Optional` **selectedOptions**: [`OptionSelection`](types_helpers_item.OptionSelection.md)[]

___

### selectedModifiers

• `Optional` **selectedModifiers**: [`AddItemModifier`](../modules/types_api_cart.md#additemmodifier)[]

___

### selectedVariationId

• `Optional` **selectedVariationId**: `string`

___

### skipStockCheck

• `Optional` **skipStockCheck**: `boolean`

___

### skipModifierCheck

• `Optional` **skipModifierCheck**: `boolean`

___

### formattedLocale

• `Optional` **formattedLocale**: `string`

The locale to format the Money object in (BCP 47).
