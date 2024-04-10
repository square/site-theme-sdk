[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [types/api/resources](../modules/types_api_resources.md) / LocationListResourceInput

# Interface: LocationListResourceInput

[types/api/resources](../modules/types_api_resources.md).LocationListResourceInput

## Hierarchy

- [`BaseListResourceInput`](types_api_resources.BaseListResourceInput.md)

  ↳ **`LocationListResourceInput`**

## Table of contents

### Properties

- [pagination](types_api_resources.LocationListResourceInput.md#pagination)
- [sort](types_api_resources.LocationListResourceInput.md#sort)
- [type](types_api_resources.LocationListResourceInput.md#type)
- [filters](types_api_resources.LocationListResourceInput.md#filters)

## Properties

### pagination

• `Optional` **pagination**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `page_size?` | `number` |
| `page_query_param?` | `string` |

#### Inherited from

[BaseListResourceInput](types_api_resources.BaseListResourceInput.md).[pagination](types_api_resources.BaseListResourceInput.md#pagination)

___

### sort

• `Optional` **sort**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `by?` | `string` |
| `order?` | `string` |

#### Inherited from

[BaseListResourceInput](types_api_resources.BaseListResourceInput.md).[sort](types_api_resources.BaseListResourceInput.md#sort)

___

### type

• **type**: ``"location-list"``

___

### filters

• `Optional` **filters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ids?` | `string`[] |
| `square_online_id?` | `boolean` |
| `fulfillments?` | `string`[] |
