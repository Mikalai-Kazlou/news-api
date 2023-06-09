import { ResponseParameters, CallbackSource, CallbackNews } from '../global';
import AppLoader from './appLoader';

enum APIEndpoint {
    sources = 'sources',
    everything = 'everything',
}

class AppController extends AppLoader {
    getSources(callback: CallbackSource): void {
        const parameters: ResponseParameters = {
            endpoint: APIEndpoint.sources,
        };
        super.getResponse(parameters, callback);
    }

    getNews(e: Event, callback: CallbackNews): void {
        let target: HTMLElement = e.target as HTMLElement;
        const newsContainer: HTMLElement = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string = target.getAttribute('data-source-id') as string;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    const parameters: ResponseParameters = {
                        endpoint: APIEndpoint.everything,
                        options: {
                            sources: sourceId,
                        },
                    };
                    super.getResponse(parameters, callback);
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
