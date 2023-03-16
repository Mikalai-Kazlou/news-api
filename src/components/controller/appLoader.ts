import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi-redirect-production.up.railway.app/', { // https://newsapi.org/v2/
            apiKey: '2273453c02a7438cbe1a4ec23fc71f8b',
        });
    }
}

export default AppLoader;
