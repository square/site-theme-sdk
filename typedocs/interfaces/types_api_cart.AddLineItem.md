[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [types/api/cart](../modules/types_api_cart.md) / AddLineItem

# Interface: AddLineItem

[types/api/cart](../modules/types_api_cart.md).AddLineItem

The item being added for the `addItem` API.

## Table of contents

### Properties

- [itemId](types_api_cart.AddLineItem.md#itemid)
- [variationId](types_api_cart.AddLineItem.md#variationid)
- [quantity](types_api_cart.AddLineItem.md#quantity)
- [modifiers](types_api_cart.AddLineItem.md#modifiers)
- [priceOverride](types_api_cart.AddLineItem.md#priceoverride)
- [subscriptionPlanVariationId](types_api_cart.AddLineItem.md#subscriptionplanvariationid)

## Properties

### itemId

• **itemId**: `string`

The ID of the item being added.

___

### variationId

• **variationId**: `string`

The variaton for the item being added.

___

### quantity

• `Optional` **quantity**: `number`

The quantity of the item being added. Defaults to 1.

___

### modifiers

• `Optional` **modifiers**: [`AddItemModifier`](../modules/types_api_cart.md#additemmodifier)[]

An array of modifiers applied to the item being added.

___

### priceOverride

• `Optional` **priceOverride**: `Object`

Price override for a custom amount. Only applicable for donations.
```ts
	priceOverride: {
		amount: 1000, // $10.00
		currency: CurrencyType.USD
	}
```

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `number` | The amount in subunits based on the provided currency. |
| `currency` | [`CurrencyTypeEnum`](../modules/types_api_cart.md#currencytypeenum) | The currency type to use. |

___

### subscriptionPlanVariationId

• `Optional` **subscriptionPlanVariationId**: `undefined`

Subscriptions unavailable on `AddLineItem`.
