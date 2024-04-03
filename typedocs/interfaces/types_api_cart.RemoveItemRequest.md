[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [types/api/cart](../modules/types_api_cart.md) / RemoveItemRequest

# Interface: RemoveItemRequest

[types/api/cart](../modules/types_api_cart.md).RemoveItemRequest

## Hierarchy

- [`CartBaseRequest`](types_api_cart.CartBaseRequest.md)

  ↳ **`RemoveItemRequest`**

## Table of contents

### Properties

- [orderId](types_api_cart.RemoveItemRequest.md#orderid)
- [orderItemId](types_api_cart.RemoveItemRequest.md#orderitemid)

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

Order item ID from the order to remove.
