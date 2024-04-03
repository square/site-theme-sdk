[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [types/api/resource](../modules/types_api_resource.md) / LocationListResourceInput

# Interface: LocationListResourceInput

[types/api/resource](../modules/types_api_resource.md).LocationListResourceInput

## Hierarchy

- [`BaseListResourceInput`](types_api_resource.BaseListResourceInput.md)

  ↳ **`LocationListResourceInput`**

## Table of contents

### Properties

- [pagination](types_api_resource.LocationListResourceInput.md#pagination)
- [sort](types_api_resource.LocationListResourceInput.md#sort)
- [type](types_api_resource.LocationListResourceInput.md#type)
- [filters](types_api_resource.LocationListResourceInput.md#filters)

## Properties

### pagination

• `Optional` **pagination**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `page_size?` | `number` |
| `page_query_param?` | `string` |

#### Inherited from

[BaseListResourceInput](types_api_resource.BaseListResourceInput.md).[pagination](types_api_resource.BaseListResourceInput.md#pagination)

___

### sort

• `Optional` **sort**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `by?` | `string` |
| `order?` | `string` |

#### Inherited from

[BaseListResourceInput](types_api_resource.BaseListResourceInput.md).[sort](types_api_resource.BaseListResourceInput.md#sort)

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
