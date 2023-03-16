export interface SourceItem {
    id: string;
    name: string;
}

export interface SourceData {
    sources: SourceItem[];
    result: string;
}

export interface NewsItem {
    source: SourceItem;
    title: string;
    description: string;
    author: string;
    publishedAt: string;
    url: string;
    urlToImage: string;
}
export interface NewsData {
    articles: NewsItem[];
    result: string;
}

export interface ResponseOptions {
    sources?: string;
}
export interface ResponseParameters {
    endpoint: string;
    options?: ResponseOptions;
}

export type ProcessDataCallback<T> = (data: T) => void;
export type CallbackSource = ProcessDataCallback<SourceData>;
export type CallbackNews = ProcessDataCallback<NewsData>;

export type ResponseCallback = CallbackSource | CallbackNews;
export type ResponseData = SourceData & NewsData;

export function modifyElement(clone: HTMLElement, selector: string, operation: (ui: HTMLElement) => void) {
    const uiElement: HTMLElement = clone.querySelector(selector) as HTMLElement;
    if (uiElement) {
        operation(uiElement);
    }
}
