import type { marked } from "marked";
import type { Renderers } from "svelte-markdown";

import HelloComponent from "./components/Hello.svelte";
import LinkComponent from "./components/Link.svelte";
import CodeComponent from "./components/Code.svelte";

export interface MyRerenderers extends Renderers {
    triplePlus: typeof HelloComponent;
    link: typeof LinkComponent;
    code: typeof CodeComponent;
}

export const customRenderers = {
    link: LinkComponent,    // Fixes a marked/sveltekit <a> link problem by adding the a-tag property 'data-sveltekit-reload'
    triplePlus: HelloComponent, // Example how to add a custom renderer
    code: CodeComponent // Replaces the default code renderer with a custom one using prismjs for syntax highlighting
} as Partial<MyRerenderers>;


/**
 * Tokenizer extension for triple plus
 * Just an example how to add custom tokenizers
 * Renders a dummy HelloComponent
 */
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

/**
 * Transforms github wiki links to markdown links
 * @param markdown markdown text to be processed
 * @returns markdown text with transformed github wiki links
 */
export const replaceGithubWikiLinks = (markdown: string) => {
    // TODO: add support for images
    // TODO: Find reference for credit

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