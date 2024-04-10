[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [types/api/resources](../modules/types_api_resources.md) / ScheduleResourceInput

# Interface: ScheduleResourceInput

[types/api/resources](../modules/types_api_resources.md).ScheduleResourceInput

## Table of contents

### Properties

- [type](types_api_resources.ScheduleResourceInput.md#type)
- [filters](types_api_resources.ScheduleResourceInput.md#filters)

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
| `end?` | { `from?`: `string` ; `add?`: [`TimeOption`](types_api_resources.TimeOption.md) ; `subtract?`: [`TimeOption`](types_api_resources.TimeOption.md)  } |
| `end.from?` | `string` |
| `end.add?` | [`TimeOption`](types_api_resources.TimeOption.md) |
| `end.subtract?` | [`TimeOption`](types_api_resources.TimeOption.md) |
| `start?` | { `from?`: `string` ; `add?`: [`TimeOption`](types_api_resources.TimeOption.md) ; `subtract?`: [`TimeOption`](types_api_resources.TimeOption.md)  } |
| `start.from?` | `string` |
| `start.add?` | [`TimeOption`](types_api_resources.TimeOption.md) |
| `start.subtract?` | [`TimeOption`](types_api_resources.TimeOption.md) |
| `interval?` | `string` |
| `fulfillment?` | `string` |
