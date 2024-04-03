[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [types/api/resource](../modules/types_api_resource.md) / ScheduleResourceInput

# Interface: ScheduleResourceInput

[types/api/resource](../modules/types_api_resource.md).ScheduleResourceInput

## Table of contents

### Properties

- [type](types_api_resource.ScheduleResourceInput.md#type)
- [filters](types_api_resource.ScheduleResourceInput.md#filters)

## Properties

### type

• **type**: ``"schedule"``

___

### filters

• `Optional` **filters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `location_id?` | `string` |
| `square_online_id?` | `boolean` |
| `end?` | { `from?`: `string` ; `add?`: [`TimeOption`](types_api_resource.TimeOption.md) ; `subtract?`: [`TimeOption`](types_api_resource.TimeOption.md)  } |
| `end.from?` | `string` |
| `end.add?` | [`TimeOption`](types_api_resource.TimeOption.md) |
| `end.subtract?` | [`TimeOption`](types_api_resource.TimeOption.md) |
| `start?` | { `from?`: `string` ; `add?`: [`TimeOption`](types_api_resource.TimeOption.md) ; `subtract?`: [`TimeOption`](types_api_resource.TimeOption.md)  } |
| `start.from?` | `string` |
| `start.add?` | [`TimeOption`](types_api_resource.TimeOption.md) |
| `start.subtract?` | [`TimeOption`](types_api_resource.TimeOption.md) |
| `interval?` | `string` |
| `fulfillment?` | `string` |
