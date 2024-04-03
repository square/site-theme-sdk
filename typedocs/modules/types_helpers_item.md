[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / types/helpers/item

# Module: types/helpers/item

## Table of contents

### Interfaces

- [OptionSelection](../interfaces/types_helpers_item.OptionSelection.md)
- [ItemPrice](../interfaces/types_helpers_item.ItemPrice.md)
- [ValidateItemError](../interfaces/types_helpers_item.ValidateItemError.md)
- [GetInStockVariationsForSelectedOptionsOrVariationRequest](../interfaces/types_helpers_item.GetInStockVariationsForSelectedOptionsOrVariationRequest.md)
- [ValidateItemRequest](../interfaces/types_helpers_item.ValidateItemRequest.md)
- [GetItemPriceRequest](../interfaces/types_helpers_item.GetItemPriceRequest.md)
- [Variation](../interfaces/types_helpers_item.Variation.md)
- [ItemOption](../interfaces/types_helpers_item.ItemOption.md)
- [Modifier](../interfaces/types_helpers_item.Modifier.md)
- [ModifierList](../interfaces/types_helpers_item.ModifierList.md)
- [Item](../interfaces/types_helpers_item.Item.md)

### Type Aliases

- [QuantityErrorTypeEnum](types_helpers_item.md#quantityerrortypeenum)
- [SquareOnlineTypeEnum](types_helpers_item.md#squareonlinetypeenum)

### Variables

- [QuantityErrorType](types_helpers_item.md#quantityerrortype)
- [SquareOnlineType](types_helpers_item.md#squareonlinetype)

## Type Aliases

### QuantityErrorTypeEnum

Ƭ **QuantityErrorTypeEnum**: typeof [`QuantityErrorType`](types_helpers_item.md#quantityerrortype)[keyof typeof [`QuantityErrorType`](types_helpers_item.md#quantityerrortype)]

___

### SquareOnlineTypeEnum

Ƭ **SquareOnlineTypeEnum**: typeof [`SquareOnlineType`](types_helpers_item.md#squareonlinetype)[keyof typeof [`SquareOnlineType`](types_helpers_item.md#squareonlinetype)]

## Variables

### QuantityErrorType

• `Const` **QuantityErrorType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `INVALID_QUANTITY` | ``"INVALID_QUANTITY"`` |
| `SOLD_OUT` | ``"SOLD_OUT"`` |
| `STOCK_EXCEEDED` | ``"STOCK_EXCEEDED"`` |
| `PER_ORDER_MAX_EXCEEDED` | ``"PER_ORDER_MAX_EXCEEDED"`` |

___

### SquareOnlineType

• `Const` **SquareOnlineType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `EVENT` | ``"EVENT"`` |
| `PHYSICAL` | ``"PHYSICAL"`` |
