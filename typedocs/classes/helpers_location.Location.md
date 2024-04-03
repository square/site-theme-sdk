[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [helpers/location](../modules/helpers_location.md) / Location

# Class: Location

[helpers/location](../modules/helpers_location.md).Location

## Table of contents

### Constructors

- [constructor](helpers_location.Location.md#constructor)

### Properties

- [OpenStatus](helpers_location.Location.md#openstatus)

### Methods

- [getLocationFulfillmentOpenStatusDayAndTime](helpers_location.Location.md#getlocationfulfillmentopenstatusdayandtime)
- [getLocationBusinessHoursOpenStatusDayAndTime](helpers_location.Location.md#getlocationbusinesshoursopenstatusdayandtime)
- [getOpenStatusDayAndTime](helpers_location.Location.md#getopenstatusdayandtime)
- [getIntervalCloseDateObject](helpers_location.Location.md#getintervalclosedateobject)
- [getOpenIntervalsForToday](helpers_location.Location.md#getopenintervalsfortoday)
- [getCurrentOpenInterval](helpers_location.Location.md#getcurrentopeninterval)
- [getNextOpenIntervalToday](helpers_location.Location.md#getnextopenintervaltoday)
- [getNextOpenIntervalAfterToday](helpers_location.Location.md#getnextopenintervalaftertoday)

## Constructors

### constructor

• **new Location**()

## Properties

### OpenStatus

• `Readonly` **OpenStatus**: typeof [`OpenStatus`](../enums/types_helpers_location.OpenStatus.md) = `OpenStatus`

## Methods

### getLocationFulfillmentOpenStatusDayAndTime

▸ **getLocationFulfillmentOpenStatusDayAndTime**(`location`, `locale`, `fulfillment`): ``null`` \| [`OpenStatusDayAndTime`](../interfaces/types_helpers_location.OpenStatusDayAndTime.md)

Returns the current open status and relevant time for a location's fulfillment type

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `location` | [`Location`](../interfaces/types_helpers_location.Location.md) |  |
| `locale` | `string` | Hyphenized language/country locale combo, e.g. en-US (BCP 47). |
| `fulfillment` | ``"PICKUP"`` \| ``"DELIVERY"`` |  |

#### Returns

``null`` \| [`OpenStatusDayAndTime`](../interfaces/types_helpers_location.OpenStatusDayAndTime.md)

___

### getLocationBusinessHoursOpenStatusDayAndTime

▸ **getLocationBusinessHoursOpenStatusDayAndTime**(`location`, `locale`): ``null`` \| [`OpenStatusDayAndTime`](../interfaces/types_helpers_location.OpenStatusDayAndTime.md)

Returns the current open status and relevant time for a location's business hours

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `location` | [`Location`](../interfaces/types_helpers_location.Location.md) |  |
| `locale` | `string` | Hyphenized language/country locale combo, e.g. en-US (BCP 47). |

#### Returns

``null`` \| [`OpenStatusDayAndTime`](../interfaces/types_helpers_location.OpenStatusDayAndTime.md)

___

### getOpenStatusDayAndTime

▸ **getOpenStatusDayAndTime**(`locale`, `timezone`, `tzOffsetString`, `hours`): ``null`` \| [`OpenStatusDayAndTime`](../interfaces/types_helpers_location.OpenStatusDayAndTime.md)

Given an hours object, returns the current open status and relevant time

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `locale` | `string` | Hyphenized language/country locale combo, e.g. en-US (BCP 47). |
| `timezone` | `string` |  |
| `tzOffsetString` | `string` |  |
| `hours` | [`Hours`](../interfaces/types_helpers_location.Hours.md) |  |

#### Returns

``null`` \| [`OpenStatusDayAndTime`](../interfaces/types_helpers_location.OpenStatusDayAndTime.md)

___

### getIntervalCloseDateObject

▸ **getIntervalCloseDateObject**(`currentOpenInterval`, `locale`, `timezone`, `tzOffsetString`, `hours`): ``null`` \| `Date`

Returns date object of interval close time, accounting for 24 hour businesses, and hours that span between days

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `currentOpenInterval` | [`OpenInterval`](../interfaces/types_helpers_location.OpenInterval.md) |  |
| `locale` | `string` | Hyphenized language/country locale combo, e.g. en-US (BCP 47). |
| `timezone` | `string` |  |
| `tzOffsetString` | `string` |  |
| `hours` | [`Hours`](../interfaces/types_helpers_location.Hours.md) |  |

#### Returns

``null`` \| `Date`

___

### getOpenIntervalsForToday

▸ **getOpenIntervalsForToday**(`locale`, `timezone`, `hours`): [`OpenInterval`](../interfaces/types_helpers_location.OpenInterval.md)[]

Gets open intervals for today

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `locale` | `string` | Hyphenized language/country locale combo, e.g. en-US (BCP 47). |
| `timezone` | `string` |  |
| `hours` | [`Hours`](../interfaces/types_helpers_location.Hours.md) |  |

#### Returns

[`OpenInterval`](../interfaces/types_helpers_location.OpenInterval.md)[]

___

### getCurrentOpenInterval

▸ **getCurrentOpenInterval**(`locale`, `timezone`, `hours`): ``null`` \| [`OpenInterval`](../interfaces/types_helpers_location.OpenInterval.md)

Get the open interval if we are currently in an open interval. Otherwise null

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `locale` | `string` | Hyphenized language/country locale combo, e.g. en-US (BCP 47). |
| `timezone` | `string` |  |
| `hours` | [`Hours`](../interfaces/types_helpers_location.Hours.md) |  |

#### Returns

``null`` \| [`OpenInterval`](../interfaces/types_helpers_location.OpenInterval.md)

___

### getNextOpenIntervalToday

▸ **getNextOpenIntervalToday**(`locale`, `timezone`, `hours`): ``null`` \| [`OpenInterval`](../interfaces/types_helpers_location.OpenInterval.md)

Get the next open interval today
If we are currently open in an interval, that will be returned

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `locale` | `string` | Hyphenized language/country locale combo, e.g. en-US (BCP 47). |
| `timezone` | `string` |  |
| `hours` | [`Hours`](../interfaces/types_helpers_location.Hours.md) |  |

#### Returns

``null`` \| [`OpenInterval`](../interfaces/types_helpers_location.OpenInterval.md)

___

### getNextOpenIntervalAfterToday

▸ **getNextOpenIntervalAfterToday**(`locale`, `timezone`, `hours`): ``null`` \| { `date`: `Date` ; `interval`: [`OpenInterval`](../interfaces/types_helpers_location.OpenInterval.md)  }

Get the next opening period after today within the next seven days

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `locale` | `string` | Hyphenized language/country locale combo, e.g. en-US (BCP 47). |
| `timezone` | `string` |  |
| `hours` | [`Hours`](../interfaces/types_helpers_location.Hours.md) |  |

#### Returns

``null`` \| { `date`: `Date` ; `interval`: [`OpenInterval`](../interfaces/types_helpers_location.OpenInterval.md)  }

{ open: openTime, close: closeTime }
