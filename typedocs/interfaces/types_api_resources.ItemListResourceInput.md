[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [types/api/resources](../modules/types_api_resources.md) / ItemListResourceInput

# Interface: ItemListResourceInput

[types/api/resources](../modules/types_api_resources.md).ItemListResourceInput

## Hierarchy

- [`BaseListResourceInput`](types_api_resources.BaseListResourceInput.md)

  ↳ **`ItemListResourceInput`**

## Table of contents

### Properties

- [pagination](types_api_resources.ItemListResourceInput.md#pagination)
- [sort](types_api_resources.ItemListResourceInput.md#sort)
- [type](types_api_resources.ItemListResourceInput.md#type)
- [filters](types_api_resources.ItemListResourceInput.md#filters)

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

• **type**: ``"item-list"``

___

### filters

• `Optional` **filters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ids?` | `string`[] |
| `location_id?` | `string` |
| `status?` | `string`[] |
| `category_id?` | `string` |
| `category_ids?` | `string`[] |
| `price_min?` | `number` |
| `price_max?` | `number` |
| `search?` | `string` |
| `fulfillments?` | `string`[] |
| `square_online_id?` | `boolean` |
| `similar_item_ids?` | `string`[] |
| `option_choices?` | `string`[] |
| `has_discounts?` | `boolean` |
