import { ResponseParameters, ResponseOptions, ResponseCallback, ResponseData } from '../global';

enum APIMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

enum ResponseStatus {
    Unauthorized = 401,
    NotFound = 404,
}

interface APIOptions {
    apiKey: string;
}

type URLOptions = ResponseOptions & APIOptions;

class Loader {
    private readonly baseLink: string;
    private readonly options: APIOptions;

    constructor(baseLink: string, options: APIOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResponse(
        parameters: ResponseParameters = { endpoint: '', options: {} },
        callback: ResponseCallback = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load(APIMethod.GET, parameters.endpoint, callback, parameters.options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === ResponseStatus.Unauthorized || res.status === ResponseStatus.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }
        return res;
    }

    private makeUrl(options: ResponseOptions, endpoint: string): string {
        const urlOptions: URLOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as keyof URLOptions]}&`;
        });

        return url.slice(0, -1);
    }

    protected load(
        method: APIMethod,
        endpoint: string,
        callback: ResponseCallback,
        options: ResponseOptions = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((response: Response): Promise<ResponseData> => response.json())
            .then((data: ResponseData): void => callback(data))
            .catch((error: Error): void => console.error(error));
    }
}

export default Loader;
