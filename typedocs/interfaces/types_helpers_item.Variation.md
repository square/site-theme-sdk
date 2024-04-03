[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [types/helpers/item](../modules/types_helpers_item.md) / Variation

# Interface: Variation

[types/helpers/item](../modules/types_helpers_item.md).Variation

## Table of contents

### Properties

- [id](types_helpers_item.Variation.md#id)
- [item\_option\_values](types_helpers_item.Variation.md#item_option_values)
- [sold\_out](types_helpers_item.Variation.md#sold_out)
- [inventory](types_helpers_item.Variation.md#inventory)
- [inventory\_tracking\_enabled](types_helpers_item.Variation.md#inventory_tracking_enabled)
- [price](types_helpers_item.Variation.md#price)

## Properties

### id

• **id**: `string`

___

### item\_option\_values

• `Optional` **item\_option\_values**: `Object`

#### Index signature

▪ [itemOptionId: `string`]: { `choice`: `string` ; `name`: `string`  }

___

### sold\_out

• **sold\_out**: `boolean`

___

### inventory

• `Optional` **inventory**: `number`

___

### inventory\_tracking\_enabled

• **inventory\_tracking\_enabled**: `boolean`

___

### price

• **price**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `regular` | [`Money`](types_helpers_money.Money.md) |
| `sale` | [`Money`](types_helpers_money.Money.md) |
