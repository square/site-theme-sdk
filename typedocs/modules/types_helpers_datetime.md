[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / types/helpers/datetime

# Module: types/helpers/datetime

## Table of contents

### Interfaces

- [Duration](../interfaces/types_helpers_datetime.Duration.md)
- [weekdayShort](../interfaces/types_helpers_datetime.weekdayShort.md)
- [weekdayLong](../interfaces/types_helpers_datetime.weekdayLong.md)
- [hourNminuteN](../interfaces/types_helpers_datetime.hourNminuteN.md)
- [hourNminuteNsecondN](../interfaces/types_helpers_datetime.hourNminuteNsecondN.md)
- [yearNmonth2day2](../interfaces/types_helpers_datetime.yearNmonth2day2.md)
- [yearNmonthNdayN](../interfaces/types_helpers_datetime.yearNmonthNdayN.md)
- [yearNmonthLdayN](../interfaces/types_helpers_datetime.yearNmonthLdayN.md)
- [yearNmonthSdayN](../interfaces/types_helpers_datetime.yearNmonthSdayN.md)
- [yearNmonthLdayNhourNminuteN](../interfaces/types_helpers_datetime.yearNmonthLdayNhourNminuteN.md)
- [yearNmonthSdayNhourNminuteN](../interfaces/types_helpers_datetime.yearNmonthSdayNhourNminuteN.md)
- [weekdayLyearNmonthLdayNhourNminuteN](../interfaces/types_helpers_datetime.weekdayLyearNmonthLdayNhourNminuteN.md)
- [weekdaySyearNmonthSdayNhourNminuteN](../interfaces/types_helpers_datetime.weekdaySyearNmonthSdayNhourNminuteN.md)
- [weekdayLhourNminuteN](../interfaces/types_helpers_datetime.weekdayLhourNminuteN.md)

### Type Aliases

- [TimeString](types_helpers_datetime.md#timestring)
- [DayOfWeek](types_helpers_datetime.md#dayofweek)
- [localizeDateFormats](types_helpers_datetime.md#localizedateformats)

### Variables

- [DateFormats](types_helpers_datetime.md#dateformats)

## Type Aliases

### TimeString

Ƭ **TimeString**: \`${number}${number}:${number}${number}:${number}${number}\`

___

### DayOfWeek

Ƭ **DayOfWeek**: ``"MON"`` \| ``"TUE"`` \| ``"WED"`` \| ``"THU"`` \| ``"FRI"`` \| ``"SAT"`` \| ``"SUN"``

___

### localizeDateFormats

Ƭ **localizeDateFormats**: [`weekdayLong`](../interfaces/types_helpers_datetime.weekdayLong.md) \| [`weekdayShort`](../interfaces/types_helpers_datetime.weekdayShort.md) \| [`hourNminuteN`](../interfaces/types_helpers_datetime.hourNminuteN.md) \| [`hourNminuteNsecondN`](../interfaces/types_helpers_datetime.hourNminuteNsecondN.md) \| [`yearNmonth2day2`](../interfaces/types_helpers_datetime.yearNmonth2day2.md) \| [`yearNmonthNdayN`](../interfaces/types_helpers_datetime.yearNmonthNdayN.md) \| [`yearNmonthLdayN`](../interfaces/types_helpers_datetime.yearNmonthLdayN.md) \| [`yearNmonthSdayN`](../interfaces/types_helpers_datetime.yearNmonthSdayN.md) \| [`yearNmonthLdayNhourNminuteN`](../interfaces/types_helpers_datetime.yearNmonthLdayNhourNminuteN.md) \| [`yearNmonthSdayNhourNminuteN`](../interfaces/types_helpers_datetime.yearNmonthSdayNhourNminuteN.md) \| [`weekdayLyearNmonthLdayNhourNminuteN`](../interfaces/types_helpers_datetime.weekdayLyearNmonthLdayNhourNminuteN.md) \| [`weekdaySyearNmonthSdayNhourNminuteN`](../interfaces/types_helpers_datetime.weekdaySyearNmonthSdayNhourNminuteN.md) \| [`weekdayLhourNminuteN`](../interfaces/types_helpers_datetime.weekdayLhourNminuteN.md)

## Variables

### DateFormats

• `Const` **DateFormats**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `weekdayShort` | { `weekday`: ``"short"`` = 'short' } |
| `weekdayShort.weekday` | ``"short"`` |
| `weekdayLong` | { `weekday`: ``"long"`` = 'long' } |
| `weekdayLong.weekday` | ``"long"`` |
| `hourNminuteN` | { `hour`: ``"numeric"`` = 'numeric'; `minute`: ``"numeric"`` = 'numeric' } |
| `hourNminuteN.hour` | ``"numeric"`` |
| `hourNminuteN.minute` | ``"numeric"`` |
| `hourNminuteNsecondN` | { `hour`: ``"numeric"`` = 'numeric'; `minute`: ``"numeric"`` = 'numeric'; `second`: ``"numeric"`` = 'numeric' } |
| `hourNminuteNsecondN.hour` | ``"numeric"`` |
| `hourNminuteNsecondN.minute` | ``"numeric"`` |
| `hourNminuteNsecondN.second` | ``"numeric"`` |
| `yearNmonth2day2` | { `year`: ``"numeric"`` = 'numeric'; `month`: ``"2-digit"`` = '2-digit'; `day`: ``"2-digit"`` = '2-digit' } |
| `yearNmonth2day2.year` | ``"numeric"`` |
| `yearNmonth2day2.month` | ``"2-digit"`` |
| `yearNmonth2day2.day` | ``"2-digit"`` |
| `yearNmonthNdayN` | { `year`: ``"numeric"`` = 'numeric'; `month`: ``"numeric"`` = 'numeric'; `day`: ``"numeric"`` = 'numeric' } |
| `yearNmonthNdayN.year` | ``"numeric"`` |
| `yearNmonthNdayN.month` | ``"numeric"`` |
| `yearNmonthNdayN.day` | ``"numeric"`` |
| `yearNmonthLdayN` | { `year`: ``"numeric"`` = 'numeric'; `month`: ``"long"`` = 'long'; `day`: ``"numeric"`` = 'numeric' } |
| `yearNmonthLdayN.year` | ``"numeric"`` |
| `yearNmonthLdayN.month` | ``"long"`` |
| `yearNmonthLdayN.day` | ``"numeric"`` |
| `yearNmonthSdayN` | { `year`: ``"numeric"`` = 'numeric'; `month`: ``"short"`` = 'short'; `day`: ``"numeric"`` = 'numeric' } |
| `yearNmonthSdayN.year` | ``"numeric"`` |
| `yearNmonthSdayN.month` | ``"short"`` |
| `yearNmonthSdayN.day` | ``"numeric"`` |
| `yearNmonthLdayNhourNminuteN` | { `year`: ``"numeric"`` = 'numeric'; `month`: ``"long"`` = 'long'; `day`: ``"numeric"`` = 'numeric'; `hour`: ``"numeric"`` = 'numeric'; `minute`: ``"numeric"`` = 'numeric' } |
| `yearNmonthLdayNhourNminuteN.year` | ``"numeric"`` |
| `yearNmonthLdayNhourNminuteN.month` | ``"long"`` |
| `yearNmonthLdayNhourNminuteN.day` | ``"numeric"`` |
| `yearNmonthLdayNhourNminuteN.hour` | ``"numeric"`` |
| `yearNmonthLdayNhourNminuteN.minute` | ``"numeric"`` |
| `yearNmonthSdayNhourNminuteN` | { `year`: ``"numeric"`` = 'numeric'; `month`: ``"short"`` = 'short'; `day`: ``"numeric"`` = 'numeric'; `hour`: ``"numeric"`` = 'numeric'; `minute`: ``"numeric"`` = 'numeric' } |
| `yearNmonthSdayNhourNminuteN.year` | ``"numeric"`` |
| `yearNmonthSdayNhourNminuteN.month` | ``"short"`` |
| `yearNmonthSdayNhourNminuteN.day` | ``"numeric"`` |
| `yearNmonthSdayNhourNminuteN.hour` | ``"numeric"`` |
| `yearNmonthSdayNhourNminuteN.minute` | ``"numeric"`` |
| `weekdayLyearNmonthLdayNhourNminuteN` | { `weekday`: ``"long"`` = 'long'; `year`: ``"numeric"`` = 'numeric'; `month`: ``"long"`` = 'long'; `day`: ``"numeric"`` = 'numeric'; `hour`: ``"numeric"`` = 'numeric'; `minute`: ``"numeric"`` = 'numeric' } |
| `weekdayLyearNmonthLdayNhourNminuteN.weekday` | ``"long"`` |
| `weekdayLyearNmonthLdayNhourNminuteN.year` | ``"numeric"`` |
| `weekdayLyearNmonthLdayNhourNminuteN.month` | ``"long"`` |
| `weekdayLyearNmonthLdayNhourNminuteN.day` | ``"numeric"`` |
| `weekdayLyearNmonthLdayNhourNminuteN.hour` | ``"numeric"`` |
| `weekdayLyearNmonthLdayNhourNminuteN.minute` | ``"numeric"`` |
| `weekdaySyearNmonthSdayNhourNminuteN` | { `weekday`: ``"short"`` = 'short'; `year`: ``"numeric"`` = 'numeric'; `month`: ``"short"`` = 'short'; `day`: ``"numeric"`` = 'numeric'; `hour`: ``"numeric"`` = 'numeric'; `minute`: ``"numeric"`` = 'numeric' } |
| `weekdaySyearNmonthSdayNhourNminuteN.weekday` | ``"short"`` |
| `weekdaySyearNmonthSdayNhourNminuteN.year` | ``"numeric"`` |
| `weekdaySyearNmonthSdayNhourNminuteN.month` | ``"short"`` |
| `weekdaySyearNmonthSdayNhourNminuteN.day` | ``"numeric"`` |
| `weekdaySyearNmonthSdayNhourNminuteN.hour` | ``"numeric"`` |
| `weekdaySyearNmonthSdayNhourNminuteN.minute` | ``"numeric"`` |
| `weekdayLhourNminuteN` | { `weekday`: ``"long"`` = 'long'; `hour`: ``"numeric"`` = 'numeric'; `minute`: ``"numeric"`` = 'numeric' } |
| `weekdayLhourNminuteN.weekday` | ``"long"`` |
| `weekdayLhourNminuteN.hour` | ``"numeric"`` |
| `weekdayLhourNminuteN.minute` | ``"numeric"`` |
