[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [types/api/cart](../modules/types_api_cart.md) / CartBaseResponse

# Interface: CartBaseResponse

[types/api/cart](../modules/types_api_cart.md).CartBaseResponse

## Hierarchy

- **`CartBaseResponse`**

  ↳ [`CartResponse`](types_api_cart.CartResponse.md)

## Table of contents

### Properties

- [data](types_api_cart.CartBaseResponse.md#data)

## Properties

### data

• **data**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `cart` | `string` | The `orderId` for the order. Only needed if you're doing very custom order management. |
| `validation` | [`CartValidation`](types_api_cart.CartValidation.md) | Validation for scheduling. Empty if not pickup or delivery fulfillment. |
