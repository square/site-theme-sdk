[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [types/api/resource](../modules/types_api_resource.md) / DiscountListResourceInput

# Interface: DiscountListResourceInput

[types/api/resource](../modules/types_api_resource.md).DiscountListResourceInput

## Hierarchy

- [`BaseListResourceInput`](types_api_resource.BaseListResourceInput.md)

  ↳ **`DiscountListResourceInput`**

## Table of contents

### Properties

- [pagination](types_api_resource.DiscountListResourceInput.md#pagination)
- [sort](types_api_resource.DiscountListResourceInput.md#sort)
- [type](types_api_resource.DiscountListResourceInput.md#type)

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

• **type**: ``"discount-list"``
