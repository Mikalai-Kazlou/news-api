import { NewsData, SourceData } from '../global';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const uiSources: HTMLElement = document.querySelector('.sources') as HTMLElement;

        if (uiSources) {
            uiSources.addEventListener('click', (e: Event): void => {
                this.controller.getNews(e, (data: NewsData): void => this.view.drawNews(data));
            });
        }

        this.controller.getSources((data: SourceData): void => this.view.drawSources(data));
    }
}

export default App;
