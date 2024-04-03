[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [types/api/resource](../modules/types_api_resource.md) / CategoryListResourceInput

# Interface: CategoryListResourceInput

[types/api/resource](../modules/types_api_resource.md).CategoryListResourceInput

## Hierarchy

- [`BaseListResourceInput`](types_api_resource.BaseListResourceInput.md)

  ↳ **`CategoryListResourceInput`**

## Table of contents

### Properties

- [pagination](types_api_resource.CategoryListResourceInput.md#pagination)
- [sort](types_api_resource.CategoryListResourceInput.md#sort)
- [type](types_api_resource.CategoryListResourceInput.md#type)
- [filters](types_api_resource.CategoryListResourceInput.md#filters)

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

• **type**: ``"category-list"``

___

### filters

• `Optional` **filters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ids?` | `string`[] |
| `location_id?` | `string` |
| `status?` | `string`[] |
| `search?` | `string` |
| `availability?` | { `by`: `string` ; `time`: { `from?`: `string` ; `add?`: [`TimeOption`](types_api_resource.TimeOption.md) ; `subtract?`: [`TimeOption`](types_api_resource.TimeOption.md)  }  } |
| `availability.by` | `string` |
| `availability.time` | { `from?`: `string` ; `add?`: [`TimeOption`](types_api_resource.TimeOption.md) ; `subtract?`: [`TimeOption`](types_api_resource.TimeOption.md)  } |
| `availability.time.from?` | `string` |
| `availability.time.add?` | [`TimeOption`](types_api_resource.TimeOption.md) |
| `availability.time.subtract?` | [`TimeOption`](types_api_resource.TimeOption.md) |
