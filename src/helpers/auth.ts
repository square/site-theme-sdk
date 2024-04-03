/**
 * Returns the CSRF token from a custom page.
 */
export const getCsrfToken = () => {
	return (<HTMLMetaElement>document.querySelector('meta[name="csrf-token"]'))?.content;
};

/**
 * Returns the headers required to make an API request for a custom page.
 */
export const buildHeaders = (): HeadersInit => ({
	'Accept': 'application/json',
	'content-type' : 'application/json; charset=UTF-8',
	'X-CSRF-TOKEN': getCsrfToken()
});
