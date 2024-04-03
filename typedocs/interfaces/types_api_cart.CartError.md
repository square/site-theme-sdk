[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [types/api/cart](../modules/types_api_cart.md) / CartError

# Interface: CartError

[types/api/cart](../modules/types_api_cart.md).CartError

Depending on the error encountered, the `CartError` may contain any of the properties below.

## Hierarchy

- `Error`

  ↳ **`CartError`**

## Table of contents

### Properties

- [status](types_api_cart.CartError.md#status)
- [fields](types_api_cart.CartError.md#fields)
- [errors](types_api_cart.CartError.md#errors)

## Properties

### status

• `Optional` **status**: `number`

Populated if an error status is received on the response.
```ts
	message: 'Something went wrong',
	status: 500
```

___

### fields

• `Optional` **fields**: `string`[]

Populated if there are any invalid IDs passed.
```ts
	message: 'Invalid IDs passed in payload',
	fields: [
		'invalidId1',
		'invalidId2'
	]
```

___

### errors

• `Optional` **errors**: [`CartValidationErrors`](types_api_cart.CartValidationErrors.md)

Populated if there are any validation errors
```ts
	message: 'fulfillment is required (and 1 more error)',
	errors: {
		'fulfillment': [
			'fulfillment is required'
		],
		'fulfillment.fulfillmentType': [
			'fulfillment.fulfillment type is required'
		]
	}
```
