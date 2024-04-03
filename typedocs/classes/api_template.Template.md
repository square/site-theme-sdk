[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [api/template](../modules/api_template.md) / Template

# Class: Template

[api/template](../modules/api_template.md).Template

## Table of contents

### Constructors

- [constructor](api_template.Template.md#constructor)

### Methods

- [getTemplate](api_template.Template.md#gettemplate)

## Constructors

### constructor

• **new Template**()

## Methods

### getTemplate

▸ **getTemplate**(`request`): `Promise`<`string`\>

Used to load a Twig template via the API.

```ts
 const templateRequest = {
     template: 'sections/item-modal',
     props: {
         item: {
             filters: {
                 id: item.id
             }
         }
     }
 };
	try {
		const template = await sdk.template.getTemplate(templateRequest);
	} catch (error) {
		// Handle errors
	}
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`TemplateRequest`](../interfaces/types_api_template.TemplateRequest.md) |

#### Returns

`Promise`<`string`\>

**`Throws`**

[TemplateError](types_api_template.TemplateError.md)
