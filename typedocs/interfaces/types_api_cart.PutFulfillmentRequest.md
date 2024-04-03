[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [types/api/cart](../modules/types_api_cart.md) / PutFulfillmentRequest

# Interface: PutFulfillmentRequest

[types/api/cart](../modules/types_api_cart.md).PutFulfillmentRequest

## Hierarchy

- [`CartBaseRequest`](types_api_cart.CartBaseRequest.md)

  ↳ **`PutFulfillmentRequest`**

## Table of contents

### Properties

- [orderId](types_api_cart.PutFulfillmentRequest.md#orderid)
- [fulfillment](types_api_cart.PutFulfillmentRequest.md#fulfillment)
- [locationId](types_api_cart.PutFulfillmentRequest.md#locationid)

## Properties

### orderId

• `Optional` **orderId**: `string`

The ID of an existing order if adding to it. If not provided, the existing order from
the cookies will be used or a new order will be created if one doesn't exist. Can
also pass an empty string to force a new order to be created.

#### Inherited from

[CartBaseRequest](types_api_cart.CartBaseRequest.md).[orderId](types_api_cart.CartBaseRequest.md#orderid)

___

### fulfillment

• **fulfillment**: [`CartFulfillment`](types_api_cart.CartFulfillment.md)

The fulfillment for the order.

___

### locationId

• `Optional` **locationId**: `string`

The ID of the location for the order.
