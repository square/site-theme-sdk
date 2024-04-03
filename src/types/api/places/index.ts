/* eslint-disable @typescript-eslint/naming-convention */

export const AutocompletePlaceType = {
	ADDRESS: 'address',
	GEOCODE: 'geocode'
} as const;

export type AutocompletePlaceTypeEnum = typeof AutocompletePlaceType[keyof typeof AutocompletePlaceType];

export interface AutocompletePlacesRequest {
    /** A partial or full address (e.g. "4 Pennsylvania Plaza" or "4 Pennsylvania Plaza, New York, NY 10001, United States"). */
    address: string;

    /** The type of places that you want to include in the result. Defaults to "geocode". */
    types?: AutocompletePlaceTypeEnum;
}

export interface GetPlaceRequest {
    /** The `place_id` from an `AutocompletePlace` object returned from the `autocompletePlaces`. */
    placeId: string;
}

export interface AutocompletePlace {
    /** The id of the place (e.g. "G:ChIJFcXEG65ZwokRLH0n5pmtMIQ"). */
    place_id: string;
    /** The shorthand address of the place (e.g. "4 Pennsylvania Plaza"). */
    main_text: string;
    /** The full address of the place (e.g. "4 Pennsylvania Plaza, New York, NY, USA"). */
    description: string;
    /** An additional type data about the place (e.g. types: ["street_address", "geocode"]). */
    api_specific_data: {
        types: string[];
    };
}

export interface AutocompletePlacesResponse {
    data: AutocompletePlace[];
}

export interface Place {
    street_number?: string;
    street?: string;
    street2?: string;
    subpremise?: string;
    neighborhood?: string;
    city?: string;
    sublocality_level_1?: string;
    sublocality_level_2?: string;
    sublocality_level_3?: string;
    sublocality_level_4?: string;
    region_code?: string;
    county?: string;
    country_code?: string;
    postal_code?: string;
    premise?: string;
    lat?: number;
    latitude?: number;
    long?: number;
    longitude?: number;
}

export interface GetPlaceResponse {
    data: Place;
}
