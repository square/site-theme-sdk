import {
	ResourceResponse,
	ResourceRequest,
	ResourceInput,
} from '../types/api/resource';
import {
	buildHeaders
} from '../helpers/auth';
import { ResourceMap } from '../types/api/resource/private.types';

export class Resource {

	/**
     * Used to load up to 5 resources.
     *
     * ```ts
     *  const resourceRequest = {
     *      'categoryListResource': {
     *          type: 'category-list'
     *      },
     *      'categoryOptionsResource': {
     *          type: 'category-options',
     *          filters: {
     *              category_id: '2'
     *          }   
     *      },
     *      'itemListResource': {
     *          type: 'item-list',
     *          filters: {
     *              'option_choices': [ "11ee258c913644169c41a2491ad79fa8" ],
     *              'square_online_id': true
     *          }
     *      },
     *      'cartResource': {
     *          type: 'cart',
     *      },
     *      'itemResource': {
     *          type: 'item',
     *          filters: {
     *              'id': "47HCEE6ZQUFFY3Y7X52CRVCO"
     *          }
     *      }
     *  };
     *	try {
     *		const resources = await sdk.resource.getResource(resourceRequest);
     *	} catch (error) {
     *		// Handle errors
     *	}
     * ```
     * @throws {@link Error}
     */
	async getResource(request: ResourceRequest): Promise<ResourceResponse> {
		const resources: ResourceMap = {};
		for (const key in request) {
			const resource: ResourceInput = request[key];
			resources[key] = resource;
		}

		const response = await fetch('/s/api/v1/resource', {
			method: 'POST',
			body: JSON.stringify({
				input: resources
			}),
			headers: buildHeaders()
		});
		const resourceResponse = await response.json() as ResourceResponse;
		return resourceResponse;
	}
}
