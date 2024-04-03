import type LooseObject from '../../looseobject';

export class TemplateError extends Error {
	/** Provides the generic rendered HTML error template that would be rendered via the page on a failure. You can choose to use this to display a rendered error, or handle it how you see fit. */
	template: string;

	constructor(message: string, template: string) {
		super(message);
		this.template = template;
	}
}

export interface TemplateRequest {
    /** The path of your `.html.twig` file in the theme folder. Exclude the `theme` path as well as the `.html.twig` extension. For example, "theme/sections/item-modal.html.twig" would be passed in as "sections/item-modal". */
    template: string;
    /** An object that contains the props that your template requires in its schema (with each key representing a prop). */
    props: LooseObject;
}
