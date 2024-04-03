[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [api/orders](../modules/api_orders.md) / Orders

# Class: Orders

[api/orders](../modules/api_orders.md).Orders

## Table of contents

### Constructors

- [constructor](api_orders.Orders.md#constructor)

### Properties

- [initConfig](api_orders.Orders.md#initconfig)

### Methods

- [getOrder](api_orders.Orders.md#getorder)

## Constructors

### constructor

• **new Orders**(`initObj`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `initObj` | [`InitConfig`](../interfaces/index.InitConfig.md) |

## Properties

### initConfig

• **initConfig**: [`InitConfig`](../interfaces/index.InitConfig.md)

## Methods

### getOrder

▸ **getOrder**(`request`): `Promise`<[`GetOrderResponse`](../interfaces/types_api_orders.GetOrderResponse.md)\>

Fetches complete details about a past order using the jwt token associated with that order.

```ts
 const orderRequest = {
     jwtToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE...truncated',
     locationId: '11ecdbb1f3706d91a4ab2c601c83f953',
     fulfillments: ['shipping']
 };
	try {
		const response = await sdk.orders.getOrder(orderRequest);
	} catch (error) {
		// Handle errors
	}
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetOrderRequest`](../interfaces/types_api_orders.GetOrderRequest.md) |

#### Returns

`Promise`<[`GetOrderResponse`](../interfaces/types_api_orders.GetOrderResponse.md)\>
