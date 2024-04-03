[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [types/api/cart](../modules/types_api_cart.md) / UpdateItemQuantityRequest

# Interface: UpdateItemQuantityRequest

[types/api/cart](../modules/types_api_cart.md).UpdateItemQuantityRequest

## Hierarchy

- [`CartBaseRequest`](types_api_cart.CartBaseRequest.md)

  ↳ **`UpdateItemQuantityRequest`**

## Table of contents

### Properties

- [orderId](types_api_cart.UpdateItemQuantityRequest.md#orderid)
- [orderItemId](types_api_cart.UpdateItemQuantityRequest.md#orderitemid)
- [quantity](types_api_cart.UpdateItemQuantityRequest.md#quantity)

## Properties

### orderId

• `Optional` **orderId**: `string`

The ID of an existing order if adding to it. If not provided, the existing order from
the cookies will be used or a new order will be created if one doesn't exist. Can
also pass an empty string to force a new order to be created.

#### Inherited from

[CartBaseRequest](types_api_cart.CartBaseRequest.md).[orderId](types_api_cart.CartBaseRequest.md#orderid)

___

### orderItemId

• **orderItemId**: `string`

Order item ID from the order to update quantity for.

___

### quantity

• **quantity**: `number`

Quantity to be updated to. Must be larger than 0.
