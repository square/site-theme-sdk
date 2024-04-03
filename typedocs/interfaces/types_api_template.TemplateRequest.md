[@square/site-theme-sdk](../GettingStarted.md) / [Modules](../modules.md) / [types/api/template](../modules/types_api_template.md) / TemplateRequest

# Interface: TemplateRequest

[types/api/template](../modules/types_api_template.md).TemplateRequest

## Table of contents

### Properties

- [template](types_api_template.TemplateRequest.md#template)
- [props](types_api_template.TemplateRequest.md#props)

## Properties

### template

• **template**: `string`

The path of your `.html.twig` file in the theme folder. Exclude the `theme` path as well as the `.html.twig` extension. For example, "theme/sections/item-modal.html.twig" would be passed in as "sections/item-modal".

___

### props

• **props**: [`default`](types_looseobject.default.md)

An object that contains the props that your template requires in its schema (with each key representing a prop).
