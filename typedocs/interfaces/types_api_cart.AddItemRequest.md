[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [types/api/cart](../modules/types_api_cart.md) / AddItemRequest

# Interface: AddItemRequest

[types/api/cart](../modules/types_api_cart.md).AddItemRequest

## Hierarchy

- [`AddItemBaseRequest`](types_api_cart.AddItemBaseRequest.md)

- [`CartBaseRequest`](types_api_cart.CartBaseRequest.md)

  ↳ **`AddItemRequest`**

## Table of contents

### Properties

- [orderId](types_api_cart.AddItemRequest.md#orderid)
- [fulfillment](types_api_cart.AddItemRequest.md#fulfillment)
- [locationId](types_api_cart.AddItemRequest.md#locationid)
- [lineItem](types_api_cart.AddItemRequest.md#lineitem)

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

• **lineItem**: [`AddLineItem`](types_api_cart.AddLineItem.md)

Item to be added to the order.
