[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [types/api/resources](../modules/types_api_resources.md) / CategoryResourceInput

# Interface: CategoryResourceInput

[types/api/resources](../modules/types_api_resources.md).CategoryResourceInput

## Table of contents

### Properties

- [type](types_api_resources.CategoryResourceInput.md#type)
- [filters](types_api_resources.CategoryResourceInput.md#filters)

## Properties

### type

• **type**: ``"category"``

___

### filters

• **filters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `location_id?` | `string` |
| `status?` | `string`[] |
| `availability?` | { `by`: `string` ; `time`: { `from?`: `string` ; `add?`: [`TimeOption`](types_api_resources.TimeOption.md) ; `subtract?`: [`TimeOption`](types_api_resources.TimeOption.md)  }  } |
| `availability.by` | `string` |
| `availability.time` | { `from?`: `string` ; `add?`: [`TimeOption`](types_api_resources.TimeOption.md) ; `subtract?`: [`TimeOption`](types_api_resources.TimeOption.md)  } |
| `availability.time.from?` | `string` |
| `availability.time.add?` | [`TimeOption`](types_api_resources.TimeOption.md) |
| `availability.time.subtract?` | [`TimeOption`](types_api_resources.TimeOption.md) |
