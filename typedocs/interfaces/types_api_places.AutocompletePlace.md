[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [types/api/places](../modules/types_api_places.md) / AutocompletePlace

# Interface: AutocompletePlace

[types/api/places](../modules/types_api_places.md).AutocompletePlace

## Table of contents

### Properties

- [place\_id](types_api_places.AutocompletePlace.md#place_id)
- [main\_text](types_api_places.AutocompletePlace.md#main_text)
- [description](types_api_places.AutocompletePlace.md#description)
- [api\_specific\_data](types_api_places.AutocompletePlace.md#api_specific_data)

## Properties

### place\_id

• **place\_id**: `string`

The id of the place (e.g. "G:ChIJFcXEG65ZwokRLH0n5pmtMIQ").

___

### main\_text

• **main\_text**: `string`

The shorthand address of the place (e.g. "4 Pennsylvania Plaza").

___

### description

• **description**: `string`

The full address of the place (e.g. "4 Pennsylvania Plaza, New York, NY, USA").

___

### api\_specific\_data

• **api\_specific\_data**: `Object`

An additional type data about the place (e.g. types: ["street_address", "geocode"]).

#### Type declaration

| Name | Type |
| :------ | :------ |
| `types` | `string`[] |
