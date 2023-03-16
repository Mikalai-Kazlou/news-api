import { NewsItem, modifyElement } from '../../global';
import './news.css';

class News {
    draw(data: NewsItem[]): void {
        const news: NewsItem[] =
            data.length >= 12 ? data.filter((_item: NewsItem, idx: number): boolean => idx < 12) : data;

        const uiTemplate: HTMLTemplateElement = document.querySelector('#newsItemTemp') as HTMLTemplateElement;
        const uiFragment: DocumentFragment = document.createDocumentFragment();
        const uiReceiver: HTMLElement = document.querySelector('.news') as HTMLElement;

        news.forEach((item: NewsItem, idx: number): void => {
            if (uiTemplate) {
                let selector: string;
                const clone: HTMLElement = uiTemplate.content.cloneNode(true) as HTMLElement;

                if (idx % 2) {
                    selector = '.news__item';
                    modifyElement(clone, selector, (ui: HTMLElement): void => {
                        ui.classList.add('alt');
                    });
                }

                selector = '.news__meta-photo';
                modifyElement(clone, selector, (ui: HTMLElement): void => {
                    ui.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
                });

                selector = '.news__meta-author';
                modifyElement(clone, selector, (ui: HTMLElement): void => {
                    ui.textContent = item.author || item.source.name;
                });

                selector = '.news__meta-date';
                modifyElement(clone, selector, (ui: HTMLElement): void => {
                    ui.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
                });

                selector = '.news__description-title';
                modifyElement(clone, selector, (ui: HTMLElement): void => {
                    ui.textContent = item.title;
                });

                selector = '.news__description-source';
                modifyElement(clone, selector, (ui: HTMLElement): void => {
                    ui.textContent = item.source.name;
                });

                selector = '.news__description-content';
                modifyElement(clone, selector, (ui: HTMLElement): void => {
                    ui.textContent = item.description;
                });

                selector = '.news__read-more a';
                modifyElement(clone, selector, (ui: HTMLElement): void => {
                    ui.setAttribute('href', item.url);
                });

                uiFragment.append(clone);
            }
        });

        if (uiReceiver) {
            uiReceiver.innerHTML = '';
            uiReceiver.appendChild(uiFragment);
        }
    }
}

export default News;
