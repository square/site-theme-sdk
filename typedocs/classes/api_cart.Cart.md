[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [api/cart](../modules/api_cart.md) / Cart

# Class: Cart

[api/cart](../modules/api_cart.md).Cart

## Table of contents

### Constructors

- [constructor](api_cart.Cart.md#constructor)

### Methods

- [getActiveId](api_cart.Cart.md#getactiveid)
- [addItem](api_cart.Cart.md#additem)
- [buyNowItem](api_cart.Cart.md#buynowitem)
- [updateItemQuantity](api_cart.Cart.md#updateitemquantity)
- [removeItem](api_cart.Cart.md#removeitem)
- [putFulfillment](api_cart.Cart.md#putfulfillment)

## Constructors

### constructor

• **new Cart**()

## Methods

### getActiveId

▸ **getActiveId**(): `undefined` \| `string`

Retrieves the active cart id if it exists.

```ts
	const cartId = sdk.cart.getActiveId();
```

#### Returns

`undefined` \| `string`

___

### addItem

▸ **addItem**(`request`): `Promise`<[`CartResponse`](../interfaces/types_api_cart.CartResponse.md)\>

Adds an item to your cart order.

```ts
	const addItemRequest = {
		lineItem: {
			itemId: '47HCEE6ZQUFFY3Y7X52CRVCO',
			variationId: '6YOTMYGOFTJR4PTTYRCLE7BH',
			quantity: 1,
			modifiers: [
				{
					id: '6WVGAE3PKEHRWZHF54KR2PIN',
					type: 'CHOICE',
					choiceSelections: ['E3MWZ3PJ3VZDQWGW4G3KFZGW', 'GKCUYTB7ARN25J7BTRTOSVHO']
				},
				{
					id: '11ede91fbff63a3ab4dbde667deefb9b',
					type: 'TEXT',
					textEntry: 'my t-shirt-text'
				},
				{
					id: '11ee185ca1cd3e98a25c9e3d692ffefb',
					type: 'GIFT_WRAP',
					choiceSelections: ['11ee185ca1cd7daebd029e3d692ffefb']
				},
				{
					id: '11ee185ca17973e490449e3d692ffefb',
					type: 'GIFT_MESSAGE',
					textEntry: 'happy bday'
				}
			]
		},
		fulfillment: {
			fulfillmentType: 'SHIPMENT'
		},
		locationId: 'L36RW9ABXQTEE'
	};
	try {
		const response = await sdk.cart.addItem(addItemRequest);
	} catch (error) {
		// Handle errors
	}
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`AddItemRequest`](../interfaces/types_api_cart.AddItemRequest.md) |

#### Returns

`Promise`<[`CartResponse`](../interfaces/types_api_cart.CartResponse.md)\>

**`Throws`**

[CartError](../interfaces/types_api_cart.CartError.md)

___

### buyNowItem

▸ **buyNowItem**(`request`): `Promise`<`void`\>

Adds an item to a new order and redirects to checkout on success.

```ts
	const buyNowItemRequest = {
		lineItem: {
			itemId: '47HCEE6ZQUFFY3Y7X52CRVCO',
			variationId: '6YOTMYGOFTJR4PTTYRCLE7BH',
			quantity: 1,
			modifiers: [
				{
					id: '6WVGAE3PKEHRWZHF54KR2PIN',
					type: 'CHOICE',
					choiceSelections: ['E3MWZ3PJ3VZDQWGW4G3KFZGW', 'GKCUYTB7ARN25J7BTRTOSVHO']
				},
				{
					id: '11ede91fbff63a3ab4dbde667deefb9b',
					type: 'TEXT',
					textEntry: 'my t-shirt-text'
				},
				{
					id: '11ee185ca1cd3e98a25c9e3d692ffefb',
					type: 'GIFT_WRAP',
					choiceSelections: ['11ee185ca1cd7daebd029e3d692ffefb']
				},
				{
					id: '11ee185ca17973e490449e3d692ffefb',
					type: 'GIFT_MESSAGE',
					textEntry: 'happy bday'
				}
			]
		},
		fulfillment: {
			fulfillmentType: 'SHIPMENT'
		},
		locationId: 'L36RW9ABXQTEE'
	};
	try {
		await sdk.cart.buyNowItem(buyNowItemRequest);
	} catch (error) {
		// Handle errors
	}
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`BuyNowItemRequest`](../interfaces/types_api_cart.BuyNowItemRequest.md) |

#### Returns

`Promise`<`void`\>

**`Throws`**

[CartError](../interfaces/types_api_cart.CartError.md)

___

### updateItemQuantity

▸ **updateItemQuantity**(`request`): `Promise`<[`CartResponse`](../interfaces/types_api_cart.CartResponse.md)\>

Updates the quantity of an item on an order. Quantity must be greater than 0.

```ts
	const updateItemQuantityRequest = {
		orderItemId: '11ee2722e42886d182fa089e019fd17a',
		quantity: 2
	};
	try {
		const response = await SDK.cart.updateItemQuantity(updateItemQuantityRequest);
	} catch (error) {
		// Handle errors
	}
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`UpdateItemQuantityRequest`](../interfaces/types_api_cart.UpdateItemQuantityRequest.md) |

#### Returns

`Promise`<[`CartResponse`](../interfaces/types_api_cart.CartResponse.md)\>

**`Throws`**

[CartError](../interfaces/types_api_cart.CartError.md)

___

### removeItem

▸ **removeItem**(`request`): `Promise`<[`CartResponse`](../interfaces/types_api_cart.CartResponse.md)\>

Removes a line item from an order.

```ts
	const removeItemRequest = {
		orderItemId: '11ee2722e42886d182fa089e019fd17a'
	};
	try {
		const response = await SDK.cart.removeItem(removeItemRequest);
	} catch (error) {
		// Handle errors
	}
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`RemoveItemRequest`](../interfaces/types_api_cart.RemoveItemRequest.md) |

#### Returns

`Promise`<[`CartResponse`](../interfaces/types_api_cart.CartResponse.md)\>

**`Throws`**

[CartError](../interfaces/types_api_cart.CartError.md)

___

### putFulfillment

▸ **putFulfillment**(`request`): `Promise`<[`CartResponse`](../interfaces/types_api_cart.CartResponse.md)\>

Replaces the fulfillment on an order.

```ts
	const putFulfillmentRequest = {
		fulfillment: {
			fulfillmentType: 'PICKUP',
			pickupDetails: {
				curbsidePickupRequested: true,
				curbsidePickupDetails: {
					curbsideDetails: 'Contactless please'
				},
			}
		}
	};
	try {
		const response = await sdk.cart.putFulfillment(putFulfillmentRequest);
	} catch (error) {
		// Handle errors
	}
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`PutFulfillmentRequest`](../interfaces/types_api_cart.PutFulfillmentRequest.md) |

#### Returns

`Promise`<[`CartResponse`](../interfaces/types_api_cart.CartResponse.md)\>

**`Throws`**

[CartError](../interfaces/types_api_cart.CartError.md)
