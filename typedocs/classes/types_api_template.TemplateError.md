[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [types/api/template](../modules/types_api_template.md) / TemplateError

# Class: TemplateError

[types/api/template](../modules/types_api_template.md).TemplateError

## Hierarchy

- `Error`

  ↳ **`TemplateError`**

## Table of contents

### Constructors

- [constructor](types_api_template.TemplateError.md#constructor)

### Properties

- [template](types_api_template.TemplateError.md#template)

## Constructors

### constructor

• **new TemplateError**(`message`, `template`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `template` | `string` |

#### Overrides

Error.constructor

## Properties

### template

• **template**: `string`

Provides the generic rendered HTML error template that would be rendered via the page on a failure. You can choose to use this to display a rendered error, or handle it how you see fit.
