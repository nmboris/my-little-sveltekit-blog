<script lang="ts">
	import type { BlogpostMetadata } from 'src/types';
	import SvelteMarkdown from 'svelte-markdown';
	import { marked } from 'marked';
	import { customRenderers, replaceGithubWikiLinks, triplePlusTokenizer } from '@lib/renderers';

	export let data: BlogpostMetadata;

	const { slug, src, meta } = data;
	const options = marked.defaults;

	marked.use({ extensions: [triplePlusTokenizer] });

	console.log(':: rendering page for slug: ', slug);

	$: wikiFixSrc = replaceGithubWikiLinks(src);
</script>

<div class="markdown-content">
	<h1>{meta.title}</h1>

	<SvelteMarkdown {options} source={wikiFixSrc} renderers={customRenderers} />

	<div class="tags">
		{#each meta.tags as tag}
			<div
				class="ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-full"
			>
				{tag}
			</div>
		{/each}
	</div>
	<div class="fixed bottom-0 right-4 rounded-full bg-blue-600 -translate-y-1/2 p-6 w-16 h-16">
		<a href="/blog">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 2048 2048"
				class="svg_dd790ee3"
				focusable="false"
				fill="white"
			>
				<path d="M2048 1088H250l787 787-90 90L6 1024 947 83l90 90-787 787h1798v128z" />
			</svg>
		</a>
	</div>
</div>
