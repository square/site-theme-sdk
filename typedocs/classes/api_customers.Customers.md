[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [api/customers](../modules/api_customers.md) / Customers

# Class: Customers

[api/customers](../modules/api_customers.md).Customers

## Table of contents

### Constructors

- [constructor](api_customers.Customers.md#constructor)

### Properties

- [initConfig](api_customers.Customers.md#initconfig)
- [buyersServiceClient](api_customers.Customers.md#buyersserviceclient)

### Methods

- [getCoordinates](api_customers.Customers.md#getcoordinates)
- [getLoyaltyAccount](api_customers.Customers.md#getloyaltyaccount)

## Constructors

### constructor

• **new Customers**(`initObj`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `initObj` | [`InitConfig`](../interfaces/index.InitConfig.md) |

## Properties

### initConfig

• **initConfig**: [`InitConfig`](../interfaces/index.InitConfig.md)

___

### buyersServiceClient

• **buyersServiceClient**: `BuyersServiceClient`

## Methods

### getCoordinates

▸ **getCoordinates**(): `Promise`<[`GetCoordinatesResponse`](../interfaces/types_api_customers.GetCoordinatesResponse.md)\>

Used to try and get the coordinates of the buyer based on their IP address.
If the coordinates can't be determined, this method returns an empty object.

```ts
	try {
		const coordinates = await sdk.customers.getCoordinates();
	} catch (error) {
		// Handle errors
	}
```

#### Returns

`Promise`<[`GetCoordinatesResponse`](../interfaces/types_api_customers.GetCoordinatesResponse.md)\>

**`Throws`**

Error

___

### getLoyaltyAccount

▸ **getLoyaltyAccount**(`request`): `Promise`<[`GetLoyaltyAccountResponse`](../interfaces/types_api_customers.GetLoyaltyAccountResponse.md) \| [`NoLoyaltyAccountResponse`](../interfaces/types_api_customers.NoLoyaltyAccountResponse.md)\>

Search for an existing customer loyalty account by phone number. 
If no loyalty account exists, this method returns an empty object.

```ts
	try {
		const loyaltyAccount = await sdk.customers.getLoyaltyAccount();
	} catch (error) {
		// Handle errors
	}
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetLoyaltyAccountRequest`](../interfaces/types_api_customers.GetLoyaltyAccountRequest.md) |

#### Returns

`Promise`<[`GetLoyaltyAccountResponse`](../interfaces/types_api_customers.GetLoyaltyAccountResponse.md) \| [`NoLoyaltyAccountResponse`](../interfaces/types_api_customers.NoLoyaltyAccountResponse.md)\>

**`Throws`**

Error
