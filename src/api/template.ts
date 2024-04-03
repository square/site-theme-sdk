import {
	TemplateRequest,
	TemplateError
} from '../types/api/template';

import {
	buildHeaders
} from '../helpers/auth';

export class Template {

	/**
     * Used to load a Twig template via the API.
     *
     * ```ts
     *  const templateRequest = {
     *      template: 'sections/item-modal',
     *      props: {
     *          item: {
     *              filters: {
     *                  id: item.id
     *              }
     *          }
     *      }
     *  };
     *	try {
     *		const template = await sdk.template.getTemplate(templateRequest);
     *	} catch (error) {
     *		// Handle errors
     *	}
     * ```
     * @throws {@link TemplateError}
     */
	async getTemplate(request: TemplateRequest): Promise<string> {
		const response = await fetch('/s/api/v1/template', {
			method: 'POST',
			body: JSON.stringify({
				template: request.template,
				props: request.props,
			}),
			headers: buildHeaders()
		});

		const resourceResponse: string = await response.text();

		if (response.ok === false) {
			throw new TemplateError('Unable to render template', resourceResponse);
		}

		return resourceResponse;
	}
}
