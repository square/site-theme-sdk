[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [types/api/cart](../modules/types_api_cart.md) / CartFulfillment

# Interface: CartFulfillment

[types/api/cart](../modules/types_api_cart.md).CartFulfillment

The order fullfillment to be provided when adding an item or
replacing an existing order's fulfillment.
```ts
	{
		fulfillmentType: FulfillmentType.SHIPMENT
	}
```
```ts
	{
		fulfillmentType: FulfillmentType.PICKUP,
		pickupDetails: {
			scheduleType: ScheduleType.ASAP,
			curbsidePickupRequested: true,
			curbsidePickupDetails: {
				curbsideDetails: 'Please leave box on the sidewalk'
			},
			pickupAt: new Date().toISOString().split('.')[0] + 'Z'
		}
	}
```

## Table of contents

### Properties

- [fulfillmentType](types_api_cart.CartFulfillment.md#fulfillmenttype)
- [pickupDetails](types_api_cart.CartFulfillment.md#pickupdetails)
- [deliveryDetails](types_api_cart.CartFulfillment.md#deliverydetails)

## Properties

### fulfillmentType

• **fulfillmentType**: [`FulfillmentTypeEnum`](../modules/types_api_cart.md#fulfillmenttypeenum)

The fulfillment type to use.

Note that `MANUAL` is used for `DONATION`, `EVENT`, `OTHER`, and `SIMPLE_DIGITAL` item types.

___

### pickupDetails

• `Optional` **pickupDetails**: `Object`

If the `fulfillmentType` is `PICKUP`, then pickup details must be provided. The SDK will create a
 default if not provided for 'PICKUP'.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `scheduleType?` | [`ScheduleTypeEnum`](../modules/types_api_cart.md#scheduletypeenum) | The schedule type to use for pickup. `ASAP` is the default if not provided. |
| `curbsidePickupRequested?` | `boolean` | Set to true if curbside pickup is requested. Default is false. |
| `curbsidePickupDetails?` | { `curbsideDetails`: `string`  } | Required if `curbsidePickupRequested` is set to true. |
| `curbsidePickupDetails.curbsideDetails` | `string` | Message from buyer for curbside details. Maximum 500 characters. Default is an empty string. |
| `pickupAt?` | `string` | The time for the order to be picked up in RFC 3339 format. For schedule type `ASAP` it does not need to be included. |

___

### deliveryDetails

• `Optional` **deliveryDetails**: `Object`

If the `fulfillmentType` is `DELIVERY`, then delivery details must be provided.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `scheduleType?` | [`ScheduleTypeEnum`](../modules/types_api_cart.md#scheduletypeenum) | The schedule type to use for pickup. `ASAP` is the default if not provided. |
| `noContactDelivery?` | `boolean` | Denotes whether the delivery should done with no contact. Default is false. |
| `note?` | `string` | Order note information provided to the seller. |
| `recipient` | [`DeliveryRecipient`](types_api_cart.DeliveryRecipient.md) | Delivery address information. |
| `deliverAt?` | `string` | The delivery window start time for the order in RFC 3339 format. For schedule type `ASAP` it does not need to be included. |
