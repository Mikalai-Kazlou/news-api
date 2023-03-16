import { NewsData, NewsItem, SourceData, SourceItem } from '../global';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    private readonly news: News;
    private readonly sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: NewsData): void {
        const values: NewsItem[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: SourceData): void {
        const values: SourceItem[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
