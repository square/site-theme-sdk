import {
	AutocompletePlacesRequest,
	AutocompletePlacesResponse,
	AutocompletePlaceType,
	GetPlaceRequest,
	GetPlaceResponse
} from '../types/api/places';

import {
	buildHeaders
} from '../helpers/auth';

import { InitConfig } from '..';

export class Places {
	initConfig: InitConfig;

	constructor(initObj: InitConfig) {
		this.initConfig = initObj;
	}

	/**
     * Used to get a list of places autocompleted from an address (or partial address).
     *
     * ```ts
     *  const autocompletePlacesRequest = {
     *      address: '4 Pennsylvania Plaza'
     *      types: 'address'
     *  };
     *	try {
     *		const response = await sdk.places.autocompletePlaces(autocompletePlacesRequest);
     *	} catch (error) {
     *		// Handle errors
     *	}
     * ```
     * @throws {@link Error}
     */
	async autocompletePlaces(request: AutocompletePlacesRequest): Promise<AutocompletePlacesResponse> {
		const userId: number = this.initConfig.userId;
		const siteId: string = this.initConfig.siteId;
		const address = request.address;
		const types = request.types ?? AutocompletePlaceType.GEOCODE;

		const requestUrl = `/app/store/api/v28/pub/users/${userId}/sites/${siteId}/places?types=${types}&input=${address}`;

		const response = await fetch(requestUrl, {
			method: 'GET',
			headers: buildHeaders()
		});
		const placesResponse = await response.json() as AutocompletePlacesResponse;
		return placesResponse;
	}

	/**
     * Used to get the full details for a place using a `place_id` from autocompletePlaces.
     *
     * ```ts
     *  const getPlaceRequest = {
     *      placeId: 'G:ChIJFcXEG65ZwokRLH0n5pmtMIQ'
     *  };
     *	try {
     *		const response = await sdk.places.getPlace(getPlaceRequest);
     *	} catch (error) {
     *		// Handle errors
     *	}
     * ```
     * @throws {@link Error}
     */
	async getPlace(request: GetPlaceRequest): Promise<GetPlaceResponse> {
		const userId: number = this.initConfig.userId;
		const siteId: string = this.initConfig.siteId;
		const placeId = request.placeId;

		const requestUrl = `/app/store/api/v28/pub/users/${userId}/sites/${siteId}/places/${placeId}`;

		const response = await fetch(requestUrl, {
			method: 'GET',
			headers: buildHeaders()
		});
		const placesResponse = await response.json();
		// Transform empty array to empty object if no match is found
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		if (Array.isArray(placesResponse.data)) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			placesResponse.data = {};
		}
		return placesResponse as GetPlaceResponse;
	}
}
