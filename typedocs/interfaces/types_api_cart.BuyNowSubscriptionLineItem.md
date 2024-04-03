[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [types/api/cart](../modules/types_api_cart.md) / BuyNowSubscriptionLineItem

# Interface: BuyNowSubscriptionLineItem

[types/api/cart](../modules/types_api_cart.md).BuyNowSubscriptionLineItem

The item being added for the `buyNowItem` API.

## Hierarchy

- `Omit`<[`AddLineItem`](types_api_cart.AddLineItem.md), ``"subscriptionPlanVariationId"``\>

  ↳ **`BuyNowSubscriptionLineItem`**

## Table of contents

### Properties

- [itemId](types_api_cart.BuyNowSubscriptionLineItem.md#itemid)
- [variationId](types_api_cart.BuyNowSubscriptionLineItem.md#variationid)
- [quantity](types_api_cart.BuyNowSubscriptionLineItem.md#quantity)
- [priceOverride](types_api_cart.BuyNowSubscriptionLineItem.md#priceoverride)
- [modifiers](types_api_cart.BuyNowSubscriptionLineItem.md#modifiers)
- [subscriptionPlanVariationId](types_api_cart.BuyNowSubscriptionLineItem.md#subscriptionplanvariationid)

## Properties

### itemId

• **itemId**: `string`

The ID of the item being added.

#### Inherited from

Omit.itemId

___

### variationId

• **variationId**: `string`

The variaton for the item being added.

#### Inherited from

Omit.variationId

___

### quantity

• `Optional` **quantity**: `number`

The quantity of the item being added. Defaults to 1.

#### Inherited from

Omit.quantity

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

#### Inherited from

Omit.priceOverride

___

### modifiers

• `Optional` **modifiers**: [`BuyNowSubscriptionItemModifier`](../modules/types_api_cart.md#buynowsubscriptionitemmodifier)[]

If `subscriptionPlanVariationId` is set, modifiers are limited to
the types in `BuyNowSubscriptionItemModifier`

#### Overrides

Omit.modifiers

___

### subscriptionPlanVariationId

• **subscriptionPlanVariationId**: `string`

The variation ID for the subscription plan to be applied to the item.
The Buy Now will redirect to /s/subscription-checkout.
