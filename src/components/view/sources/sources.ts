import { SourceItem, modifyElement } from '../../global';
import './sources.css';

class Sources {
    draw(data: SourceItem[]): void {
        const uiTemplate: HTMLTemplateElement = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;
        const uiFragment: DocumentFragment = document.createDocumentFragment();
        const uiReceiver: HTMLElement = document.querySelector('.sources') as HTMLElement;

        if (uiTemplate) {
            data.forEach((item: SourceItem): void => {
                let selector: string;
                const clone: HTMLElement = uiTemplate.content.cloneNode(true) as HTMLElement;

                selector = '.source__item-name';
                modifyElement(clone, selector, (ui: HTMLElement): void => {
                    ui.textContent = item.name;
                });

                selector = '.source__item';
                modifyElement(clone, selector, (ui: HTMLElement): void => {
                    ui.setAttribute('data-source-id', item.id);
                });

                uiFragment.append(clone);
            });
        }

        if (uiReceiver) {
            uiReceiver.append(uiFragment);
        }
    }
}

export default Sources;
