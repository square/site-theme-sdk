[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [types/helpers/item](../modules/types_helpers_item.md) / Item

# Interface: Item

[types/helpers/item](../modules/types_helpers_item.md).Item

## Table of contents

### Properties

- [id](types_helpers_item.Item.md#id)
- [variations](types_helpers_item.Item.md#variations)
- [item\_options](types_helpers_item.Item.md#item_options)
- [modifier\_lists](types_helpers_item.Item.md#modifier_lists)
- [per\_order\_max](types_helpers_item.Item.md#per_order_max)
- [square\_online\_type](types_helpers_item.Item.md#square_online_type)
- [item\_type\_details](types_helpers_item.Item.md#item_type_details)
- [preordering](types_helpers_item.Item.md#preordering)
- [fulfillment\_availability](types_helpers_item.Item.md#fulfillment_availability)

## Properties

### id

• **id**: `string`

___

### variations

• **variations**: [`Variation`](types_helpers_item.Variation.md)[]

___

### item\_options

• `Optional` **item\_options**: [`ItemOption`](types_helpers_item.ItemOption.md)[]

___

### modifier\_lists

• `Optional` **modifier\_lists**: [`ModifierList`](types_helpers_item.ModifierList.md)[]

___

### per\_order\_max

• **per\_order\_max**: ``null`` \| `number`

___

### square\_online\_type

• **square\_online\_type**: [`SquareOnlineTypeEnum`](../modules/types_helpers_item.md#squareonlinetypeenum)

___

### item\_type\_details

• **item\_type\_details**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `end_date?` | `string` |
| `end_time?` | `string` |
| `timezone_info?` | { `utc_offset_string`: `string`  } |
| `timezone_info.utc_offset_string` | `string` |

___

### preordering

• **preordering**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `PICKUP` | `boolean` |

___

### fulfillment\_availability

• **fulfillment\_availability**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `PICKUP` | { `availability_cutoff_at`: `string`  }[] |
