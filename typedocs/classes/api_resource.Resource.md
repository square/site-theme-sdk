[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [api/resource](../modules/api_resource.md) / Resource

# Class: Resource

[api/resource](../modules/api_resource.md).Resource

## Table of contents

### Constructors

- [constructor](api_resource.Resource.md#constructor)

### Methods

- [getResource](api_resource.Resource.md#getresource)

## Constructors

### constructor

• **new Resource**()

## Methods

### getResource

▸ **getResource**(`request`): `Promise`<[`ResourceResponse`](../interfaces/types_api_resource.ResourceResponse.md)\>

Used to load up to 5 resources.

```ts
 const resourceRequest = {
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
		const resources = await sdk.resource.getResource(resourceRequest);
	} catch (error) {
		// Handle errors
	}
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`ResourceRequest`](../interfaces/types_api_resource.ResourceRequest.md) |

#### Returns

`Promise`<[`ResourceResponse`](../interfaces/types_api_resource.ResourceResponse.md)\>

**`Throws`**

Error
