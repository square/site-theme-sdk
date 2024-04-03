[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / types/api/cart

# Module: types/api/cart

## Table of contents

### Interfaces

- [CartValidationErrors](../interfaces/types_api_cart.CartValidationErrors.md)
- [CartError](../interfaces/types_api_cart.CartError.md)
- [BaseModifier](../interfaces/types_api_cart.BaseModifier.md)
- [ChoiceModifier](../interfaces/types_api_cart.ChoiceModifier.md)
- [TextModifier](../interfaces/types_api_cart.TextModifier.md)
- [GiftWrapModifier](../interfaces/types_api_cart.GiftWrapModifier.md)
- [GiftMessageModifier](../interfaces/types_api_cart.GiftMessageModifier.md)
- [AddLineItem](../interfaces/types_api_cart.AddLineItem.md)
- [BuyNowSubscriptionLineItem](../interfaces/types_api_cart.BuyNowSubscriptionLineItem.md)
- [CartBaseRequest](../interfaces/types_api_cart.CartBaseRequest.md)
- [DeliveryRecipient](../interfaces/types_api_cart.DeliveryRecipient.md)
- [CartFulfillment](../interfaces/types_api_cart.CartFulfillment.md)
- [AddItemBaseRequest](../interfaces/types_api_cart.AddItemBaseRequest.md)
- [AddItemRequest](../interfaces/types_api_cart.AddItemRequest.md)
- [BuyNowItemRequest](../interfaces/types_api_cart.BuyNowItemRequest.md)
- [UpdateItemQuantityRequest](../interfaces/types_api_cart.UpdateItemQuantityRequest.md)
- [RemoveItemRequest](../interfaces/types_api_cart.RemoveItemRequest.md)
- [PutFulfillmentRequest](../interfaces/types_api_cart.PutFulfillmentRequest.md)
- [CartBaseResponse](../interfaces/types_api_cart.CartBaseResponse.md)
- [CartValidation](../interfaces/types_api_cart.CartValidation.md)
- [CartResponse](../interfaces/types_api_cart.CartResponse.md)

### Type Aliases

- [FulfillmentTypeEnum](types_api_cart.md#fulfillmenttypeenum)
- [ScheduleTypeEnum](types_api_cart.md#scheduletypeenum)
- [ModifierTypeEnum](types_api_cart.md#modifiertypeenum)
- [CurrencyTypeEnum](types_api_cart.md#currencytypeenum)
- [AddItemModifier](types_api_cart.md#additemmodifier)
- [BuyNowSubscriptionItemModifier](types_api_cart.md#buynowsubscriptionitemmodifier)

### Variables

- [FulfillmentType](types_api_cart.md#fulfillmenttype)
- [ScheduleType](types_api_cart.md#scheduletype)
- [ModifierType](types_api_cart.md#modifiertype)
- [CurrencyType](types_api_cart.md#currencytype)

## Type Aliases

### FulfillmentTypeEnum

Ƭ **FulfillmentTypeEnum**: typeof [`FulfillmentType`](types_api_cart.md#fulfillmenttype)[keyof typeof [`FulfillmentType`](types_api_cart.md#fulfillmenttype)]

___

### ScheduleTypeEnum

Ƭ **ScheduleTypeEnum**: typeof [`ScheduleType`](types_api_cart.md#scheduletype)[keyof typeof [`ScheduleType`](types_api_cart.md#scheduletype)]

___

### ModifierTypeEnum

Ƭ **ModifierTypeEnum**: typeof [`ModifierType`](types_api_cart.md#modifiertype)[keyof typeof [`ModifierType`](types_api_cart.md#modifiertype)]

___

### CurrencyTypeEnum

Ƭ **CurrencyTypeEnum**: typeof [`CurrencyType`](types_api_cart.md#currencytype)[keyof typeof [`CurrencyType`](types_api_cart.md#currencytype)]

___

### AddItemModifier

Ƭ **AddItemModifier**: [`ChoiceModifier`](../interfaces/types_api_cart.ChoiceModifier.md) \| [`TextModifier`](../interfaces/types_api_cart.TextModifier.md) \| [`GiftWrapModifier`](../interfaces/types_api_cart.GiftWrapModifier.md) \| [`GiftMessageModifier`](../interfaces/types_api_cart.GiftMessageModifier.md)

A modifier that can be applied to the item for the `addItem` API.
```ts
	[
		{
			id: '6WVGAE3PKEHRWZHF54KR2PIN',
			type: ModifierType.CHOICE,
			choiceSelections: ['E3MWZ3PJ3VZDQWGW4G3KFZGW', 'GKCUYTB7ARN25J7BTRTOSVHO']
		},
		{
			id: '11ede91fbff63a3ab4dbde667deefb9b',
			type: ModifierType.TEXT,
			textEntry: 'My T-Shirt Text'
		},
		{
			id: '11ee185ca1cd3e98a25c9e3d692ffefb',
			type: ModifierType.GIFT_WRAP,
			choiceSelections: ['11ee185ca1cd7daebd029e3d692ffefb']
		},
		{
			id: '11ee185ca17973e490449e3d692ffefb',
			type: ModifierType.GIFT_MESSAGE,
			textEntry: 'Happy Birthday!'
		}
	]
```

___

### BuyNowSubscriptionItemModifier

Ƭ **BuyNowSubscriptionItemModifier**: [`ChoiceModifier`](../interfaces/types_api_cart.ChoiceModifier.md) \| [`TextModifier`](../interfaces/types_api_cart.TextModifier.md)

A modifier that can be applied to the item for the `buyNowItem` API with a `subscriptionPlanVariationId` set.
Only difference from the `AddItemModifier` is `GIFT_WRAP` and `GIFT_MESSAGE` types are unavailable.
```ts
	[
		{
			id: '6WVGAE3PKEHRWZHF54KR2PIN',
			type: ModifierType.CHOICE,
			choiceSelections: ['E3MWZ3PJ3VZDQWGW4G3KFZGW', 'GKCUYTB7ARN25J7BTRTOSVHO']
		},
		{
			id: '11ede91fbff63a3ab4dbde667deefb9b',
			type: ModifierType.TEXT,
			textEntry: 'My T-Shirt Text'
		}
	]
```

## Variables

### FulfillmentType

• `Const` **FulfillmentType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `SHIPMENT` | ``"SHIPMENT"`` |
| `PICKUP` | ``"PICKUP"`` |
| `DELIVERY` | ``"DELIVERY"`` |
| `MANUAL` | ``"MANUAL"`` |

___

### ScheduleType

• `Const` **ScheduleType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ASAP` | ``"ASAP"`` |
| `SCHEDULED` | ``"SCHEDULED"`` |

___

### ModifierType

• `Const` **ModifierType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `CHOICE` | ``"CHOICE"`` |
| `TEXT` | ``"TEXT"`` |
| `GIFT_WRAP` | ``"GIFT_WRAP"`` |
| `GIFT_MESSAGE` | ``"GIFT_MESSAGE"`` |

___

### CurrencyType

• `Const` **CurrencyType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `AUD` | ``"AUD"`` |
| `CAD` | ``"CAD"`` |
| `JPY` | ``"JPY"`` |
| `GBP` | ``"GBP"`` |
| `USD` | ``"USD"`` |
| `EUR` | ``"EUR"`` |
