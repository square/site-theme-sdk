[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [types/api/resource](../modules/types_api_resource.md) / BaseListResourceInput

# Interface: BaseListResourceInput

[types/api/resource](../modules/types_api_resource.md).BaseListResourceInput

## Hierarchy

- **`BaseListResourceInput`**

  ↳ [`CategoryListResourceInput`](types_api_resource.CategoryListResourceInput.md)

  ↳ [`DiscountListResourceInput`](types_api_resource.DiscountListResourceInput.md)

  ↳ [`ItemListResourceInput`](types_api_resource.ItemListResourceInput.md)

  ↳ [`LocationListResourceInput`](types_api_resource.LocationListResourceInput.md)

  ↳ [`StoryListResourceInput`](types_api_resource.StoryListResourceInput.md)

## Table of contents

### Properties

- [pagination](types_api_resource.BaseListResourceInput.md#pagination)
- [sort](types_api_resource.BaseListResourceInput.md#sort)

## Properties

### pagination

• `Optional` **pagination**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `page_size?` | `number` |
| `page_query_param?` | `string` |

___

### sort

• `Optional` **sort**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `by?` | `string` |
| `order?` | `string` |
