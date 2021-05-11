

interface IConfig{
	baseUrl:string;
	headers: {
		Accept:string
	}
}

class Api {

	_url:string;
	_headers:{
		Accept:string
	};


	constructor(config:IConfig) {
		this._url = config.baseUrl;
		this._headers = config.headers;
	}

	_getResponse(res: Response) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`);
	}

	getSnippets(request: string) {
		return fetch(`https://${this._url}/search.json?q=${request}`, {
			headers: this._headers
		})
			.then(this._getResponse)
			.catch((err) => {
				console.error(err);
			});
	}

	getSnippetImage(id: string, size = 'L') {
		return fetch(`https://covers.${this._url}/b/id/${id}-${size}.jpg`, {
			headers: this._headers
		})
			.then(this._getResponse)
			.catch((err) => {
				console.error(err);
			});
	}
}

const api = new Api({
	baseUrl: 'openlibrary.org',
	headers: {
		Accept: 'application/json'
	}
});

export default api;
