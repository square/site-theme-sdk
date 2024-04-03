[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [api/places](../modules/api_places.md) / Places

# Class: Places

[api/places](../modules/api_places.md).Places

## Table of contents

### Constructors

- [constructor](api_places.Places.md#constructor)

### Properties

- [initConfig](api_places.Places.md#initconfig)

### Methods

- [autocompletePlaces](api_places.Places.md#autocompleteplaces)
- [getPlace](api_places.Places.md#getplace)

## Constructors

### constructor

• **new Places**(`initObj`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `initObj` | [`InitConfig`](../interfaces/index.InitConfig.md) |

## Properties

### initConfig

• **initConfig**: [`InitConfig`](../interfaces/index.InitConfig.md)

## Methods

### autocompletePlaces

▸ **autocompletePlaces**(`request`): `Promise`<[`AutocompletePlacesResponse`](../interfaces/types_api_places.AutocompletePlacesResponse.md)\>

Used to get a list of places autocompleted from an address (or partial address).

```ts
 const autocompletePlacesRequest = {
     address: '4 Pennsylvania Plaza'
     types: 'address'
 };
	try {
		const response = await sdk.places.autocompletePlaces(autocompletePlacesRequest);
	} catch (error) {
		// Handle errors
	}
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`AutocompletePlacesRequest`](../interfaces/types_api_places.AutocompletePlacesRequest.md) |

#### Returns

`Promise`<[`AutocompletePlacesResponse`](../interfaces/types_api_places.AutocompletePlacesResponse.md)\>

**`Throws`**

Error

___

### getPlace

▸ **getPlace**(`request`): `Promise`<[`GetPlaceResponse`](../interfaces/types_api_places.GetPlaceResponse.md)\>

Used to get the full details for a place using a `place_id` from autocompletePlaces.

```ts
 const getPlaceRequest = {
     placeId: 'G:ChIJFcXEG65ZwokRLH0n5pmtMIQ'
 };
	try {
		const response = await sdk.places.getPlace(getPlaceRequest);
	} catch (error) {
		// Handle errors
	}
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`GetPlaceRequest`](../interfaces/types_api_places.GetPlaceRequest.md) |

#### Returns

`Promise`<[`GetPlaceResponse`](../interfaces/types_api_places.GetPlaceResponse.md)\>

**`Throws`**

Error
