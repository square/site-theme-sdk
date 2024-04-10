[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [api/resources](../modules/api_resources.md) / Resources

# Class: Resources

[api/resources](../modules/api_resources.md).Resources

## Table of contents

### Constructors

- [constructor](api_resources.Resources.md#constructor)

### Methods

- [getResources](api_resources.Resources.md#getresources)

## Constructors

### constructor

• **new Resources**()

## Methods

### getResources

▸ **getResources**(`request`): `Promise`<[`ResourcesResponse`](../interfaces/types_api_resources.ResourcesResponse.md)\>

Used to load up to 5 resources.

```ts
 const resourcesRequest = {
     'categoryListResource': {
         type: 'category-list'
     },
     'categoryOptionsResource': {
         type: 'category-options',
         filters: {
             category_id: '2'
         }   
     },
     'itemListResource': {
         type: 'item-list',
         filters: {
             'option_choices': [ "11ee258c913644169c41a2491ad79fa8" ],
             'square_online_id': true
         }
     },
     'cartResource': {
         type: 'cart',
     },
     'itemResource': {
         type: 'item',
         filters: {
             'id': "47HCEE6ZQUFFY3Y7X52CRVCO"
         }
     }
 };
	try {
		const resources = await sdk.resources.getResources(resourcesRequest);
	} catch (error) {
		// Handle errors
	}
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`ResourcesRequest`](../interfaces/types_api_resources.ResourcesRequest.md) |

#### Returns

`Promise`<[`ResourcesResponse`](../interfaces/types_api_resources.ResourcesResponse.md)\>

**`Throws`**

Error
