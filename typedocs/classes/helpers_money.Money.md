[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [helpers/money](../modules/helpers_money.md) / Money

# Class: Money

[helpers/money](../modules/helpers_money.md).Money

## Table of contents

### Constructors

- [constructor](helpers_money.Money.md#constructor)

### Methods

- [formatMoney](helpers_money.Money.md#formatmoney)
- [formatAmount](helpers_money.Money.md#formatamount)
- [convertFloatToSubunits](helpers_money.Money.md#convertfloattosubunits)
- [convertSubunitsToFloat](helpers_money.Money.md#convertsubunitstofloat)

## Constructors

### constructor

• **new Money**()

## Methods

### formatMoney

▸ **formatMoney**(`money`, `formattedLocale?`): `string`

Formats the Money object based on the provided locale.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `money` | [`Money`](../interfaces/types_helpers_money.Money.md) | `undefined` | The Money object to format. |
| `formattedLocale` | `string` | `'en-US'` | The locale to format the Money object in (BCP 47). |

#### Returns

`string`

The formatted amount.

___

### formatAmount

▸ **formatAmount**(`amount`, `currency`, `formattedLocale?`): `string`

Formats a subunits amount based on the provided currency and locale.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `amount` | `number` | `undefined` | The amount in subunits. |
| `currency` | `string` | `undefined` | The currency of the amount (ISO 4217). |
| `formattedLocale` | `string` | `'en-US'` | The locale to format the amount in (BCP 47). |

#### Returns

`string`

The formatted amount.

___

### convertFloatToSubunits

▸ **convertFloatToSubunits**(`float`, `currency`): `number`

Converts a float amount to the lowest subunits for the currency, e.g. 10.00 to 1000 for USD.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `float` | `number` | The float amount to convert. |
| `currency` | `string` | The currency of the amount (ISO 4217). |

#### Returns

`number`

The amount in subunits.

___

### convertSubunitsToFloat

▸ **convertSubunitsToFloat**(`subunits`, `currency`): `number`

Converts a subunits amount to a float for the currency, e.g. 1000 subunits to 10.00 for USD.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `subunits` | `number` | The subunits amount to convert. |
| `currency` | `string` | The currency of the amount (ISO 4217). |

#### Returns

`number`

The amount as a float.
