[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / helpers/datetime

# Module: helpers/datetime

## Table of contents

### Functions

- [getNumericTime](helpers_datetime.md#getnumerictime)
- [getDateObjInTimezone](helpers_datetime.md#getdateobjintimezone)
- [localizeDate](helpers_datetime.md#localizedate)
- [getDayOfWeekKey](helpers_datetime.md#getdayofweekkey)
- [getFormattedTime](helpers_datetime.md#getformattedtime)

## Functions

### getNumericTime

▸ **getNumericTime**(`timeString`): `number`

Returns the time provided as a number
e.g) "22:00:00" to 220000

#### Parameters

| Name | Type |
| :------ | :------ |
| `timeString` | \`${number}${number}:${number}${number}:${number}${number}\` |

#### Returns

`number`

___

### getDateObjInTimezone

▸ **getDateObjInTimezone**(`dateString`, `timeString`, `tzOffsetStr`): `Date`

Get the date object in the given timezone

#### Parameters

| Name | Type |
| :------ | :------ |
| `dateString` | `string` |
| `timeString` | \`${number}${number}:${number}${number}:${number}${number}\` |
| `tzOffsetStr` | `string` |

#### Returns

`Date`

___

### localizeDate

▸ **localizeDate**(`dateObj`, `locale`, `format`, `timezone`, `hour12?`): `string`

Transform native JS date objects into a localized string, based on the locale and the format
specified.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dateObj` | `Date` | Date object to be localized |
| `locale` | `string` | Hyphenized language/country locale combo, e.g. en-US (BCP 47). |
| `format` | [`localizeDateFormats`](types_helpers_datetime.md#localizedateformats) | Options object specifying the date/time parts to be included in the formatted string |
| `timezone` | `string` | string specifying a timezone offset the time into |
| `hour12?` | `boolean` | - |

#### Returns

`string`

___

### getDayOfWeekKey

▸ **getDayOfWeekKey**(`dateObj`, `locale`, `timezone`): [`DayOfWeek`](types_helpers_datetime.md#dayofweek)

Gets the appropriate 3 letter key for the day of the week for a given date object
used to find the correct key of the hour data to pull data off of

#### Parameters

| Name | Type |
| :------ | :------ |
| `dateObj` | `Date` |
| `locale` | `string` |
| `timezone` | `string` |

#### Returns

[`DayOfWeek`](types_helpers_datetime.md#dayofweek)

___

### getFormattedTime

▸ **getFormattedTime**(`date`, `timeString`, `timeFormat`, `storeLocale`, `timezone`): `string`

Returns time formatted for the user

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `date` | `Date` |  |
| `timeString` | `string` | of the format HH:MM:SS |
| `timeFormat` | [`localizeDateFormats`](types_helpers_datetime.md#localizedateformats) |  |
| `storeLocale` | `string` | Hyphenized language/country locale combo, e.g. en-US (BCP 47). |
| `timezone` | `string` |  |

#### Returns

`string`

Ex: 9:00 am
