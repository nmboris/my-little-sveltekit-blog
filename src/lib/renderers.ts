import type { marked } from "marked";
import type { Renderers } from "svelte-markdown";

import HelloComponent from "./components/Hello.svelte";
import LinkComponent from "./components/Link.svelte";

export interface MyRererers extends Renderers {
    triplePlus: typeof HelloComponent;
    link: typeof LinkComponent;
}

export const customRenderers = { link: LinkComponent, triplePlus: HelloComponent } as Partial<MyRererers>;

export const triplePlusTokenizer = {
    name: 'triplePlus',
    level: 'block',
    start(src: string) {
        return src.indexOf('+++');
    },
    tokenizer(src: string) {
        const rule = /^\+\+\+ (.*)/;
        const match = rule.exec(src);

        if (match) {
            return {
                type: 'triplePlus',
                raw: match[0],
                text: match[1]
            };
        }
    }
} as marked.TokenizerExtension;



export const replaceGithubWikiLinks = (markdown: string) => {
    // github supports [[...]] declaration of links. find all of them
    return markdown.replace(/\[\[([^\]]+)\]\]/g, function (allPattern, link) {

        // inside of brekets link can be added as:
        // - page name only [[Calls]], [[Call-Log]];
        // - link title only [[Call Log]];
        // - link title and page name [[Call Log|Call-Log]], [[Log|Call Log]].

        // search for link title
        let linkTitle = link.replace(/\|([^|]+)/, "");
        console.log('linkTitle', linkTitle);

        // search for page name
        let pageName = link.replace(/([^|]+)\|/, "");
        console.log('pageName', pageName);

        if (!linkTitle) {
            linkTitle = link;
        }

        if (!pageName) {
            pageName = link;
        }

        // make sure page name has correct format
        link = pageName.replace(" ", "-");

        // convert [[<link title> | <page name>]] to [<link title>](<page name>)
        link = `[${linkTitle}](${pageName})`;

        console.log('link', link);

        return link;
    });
};