[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [types/api/cart](../modules/types_api_cart.md) / CartResponse

# Interface: CartResponse

[types/api/cart](../modules/types_api_cart.md).CartResponse

## Hierarchy

- [`CartBaseResponse`](types_api_cart.CartBaseResponse.md)

  ↳ **`CartResponse`**

## Table of contents

### Properties

- [data](types_api_cart.CartResponse.md#data)
- [response](types_api_cart.CartResponse.md#response)

## Properties

### data

• **data**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `cart` | `string` | The `orderId` for the order. Only needed if you're doing very custom order management. |
| `validation` | [`CartValidation`](types_api_cart.CartValidation.md) | Validation for scheduling. Empty if not pickup or delivery fulfillment. |

#### Inherited from

[CartBaseResponse](types_api_cart.CartBaseResponse.md).[data](types_api_cart.CartBaseResponse.md#data)

___

### response

• **response**: `Response`

The response from the Fetch API.
