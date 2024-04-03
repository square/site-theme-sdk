[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [types/api/cart](../modules/types_api_cart.md) / BuyNowItemRequest

# Interface: BuyNowItemRequest

[types/api/cart](../modules/types_api_cart.md).BuyNowItemRequest

## Hierarchy

- [`AddItemBaseRequest`](types_api_cart.AddItemBaseRequest.md)

  ↳ **`BuyNowItemRequest`**

## Table of contents

### Properties

- [fulfillment](types_api_cart.BuyNowItemRequest.md#fulfillment)
- [locationId](types_api_cart.BuyNowItemRequest.md#locationid)
- [lineItem](types_api_cart.BuyNowItemRequest.md#lineitem)

## Properties

### fulfillment

• **fulfillment**: [`CartFulfillment`](types_api_cart.CartFulfillment.md)

The fulfillment for the order.

#### Inherited from

[AddItemBaseRequest](types_api_cart.AddItemBaseRequest.md).[fulfillment](types_api_cart.AddItemBaseRequest.md#fulfillment)

___

### locationId

• **locationId**: `string`

The ID of the location for the order.

#### Inherited from

[AddItemBaseRequest](types_api_cart.AddItemBaseRequest.md).[locationId](types_api_cart.AddItemBaseRequest.md#locationid)

___

### lineItem

• **lineItem**: [`AddLineItem`](types_api_cart.AddLineItem.md) \| [`BuyNowSubscriptionLineItem`](types_api_cart.BuyNowSubscriptionLineItem.md)

Item to be added to the order.
