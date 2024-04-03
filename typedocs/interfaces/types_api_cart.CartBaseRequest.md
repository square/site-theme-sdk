[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [types/api/cart](../modules/types_api_cart.md) / CartBaseRequest

# Interface: CartBaseRequest

[types/api/cart](../modules/types_api_cart.md).CartBaseRequest

## Hierarchy

- **`CartBaseRequest`**

  ↳ [`AddItemRequest`](types_api_cart.AddItemRequest.md)

  ↳ [`UpdateItemQuantityRequest`](types_api_cart.UpdateItemQuantityRequest.md)

  ↳ [`RemoveItemRequest`](types_api_cart.RemoveItemRequest.md)

  ↳ [`PutFulfillmentRequest`](types_api_cart.PutFulfillmentRequest.md)

## Table of contents

### Properties

- [orderId](types_api_cart.CartBaseRequest.md#orderid)

## Properties

### orderId

• `Optional` **orderId**: `string`

The ID of an existing order if adding to it. If not provided, the existing order from
the cookies will be used or a new order will be created if one doesn't exist. Can
also pass an empty string to force a new order to be created.
