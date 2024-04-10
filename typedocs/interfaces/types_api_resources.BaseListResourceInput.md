[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [types/api/resources](../modules/types_api_resources.md) / BaseListResourceInput

# Interface: BaseListResourceInput

[types/api/resources](../modules/types_api_resources.md).BaseListResourceInput

## Hierarchy

- **`BaseListResourceInput`**

  ↳ [`CategoryListResourceInput`](types_api_resources.CategoryListResourceInput.md)

  ↳ [`DiscountListResourceInput`](types_api_resources.DiscountListResourceInput.md)

  ↳ [`ItemListResourceInput`](types_api_resources.ItemListResourceInput.md)

  ↳ [`LocationListResourceInput`](types_api_resources.LocationListResourceInput.md)

  ↳ [`StoryListResourceInput`](types_api_resources.StoryListResourceInput.md)

## Table of contents

### Properties

- [pagination](types_api_resources.BaseListResourceInput.md#pagination)
- [sort](types_api_resources.BaseListResourceInput.md#sort)

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
