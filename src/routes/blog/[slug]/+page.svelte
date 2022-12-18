<script lang="ts">
	import type { BlogpostMetadata } from 'src/types';
	import SvelteMarkdown from 'svelte-markdown';
	import { marked } from 'marked';
	import { customRenderers, replaceGithubWikiLinks, triplePlusTokenizer } from '@lib/renderers';

	// Styles for the code bocks prepared in the customRenderers component Code.svelte
	import '@src/lib/prism-themes/shades-of-purple.css';
	// import 'prismjs/themes/prism-okaidia.min.css';

	// Grab the blog post data preoared by the server side
	export let data: BlogpostMetadata;

	// Desctructure the relevant content data
	const { slug, src, meta } = data;

	// Configure marked
	const options = marked.defaults;
	marked.use({
		extensions: [triplePlusTokenizer]
	});

	// Fix wiki link links by replacing [[link]] with [link](/wiki/link)
	$: wikiFixSrc = replaceGithubWikiLinks(src);
</script>

<div class="markdown-content">
	<h1>{meta.title}</h1>

	<!-- <SvelteMarkdown options={marked.defaults} source={wikiFixSrc} renderers={customRenderers} /> -->
	<SvelteMarkdown {options} source={wikiFixSrc} renderers={customRenderers} />

	<div class="tags inline-flex">
		<div class="flex gap-2">
			{#each meta.tags as tag}
				<div
					class="text-xs items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-full"
				>
					{tag}
				</div>
			{/each}
		</div>
	</div>
	<a href="/blog">
		<!-- <div
			class="fixed bottom-0 right-4 flex justify-center items-center rounded-full fill-gray-800 bg-gray-400 opacity-30 -translate-y-full p-6 w-16 h-16"
		> -->
		<button
			type="button"
			class="fixed bottom-0 right-4 -translate-y-full rotate-180 text-gray-700 border border-gray-700 hover:bg-gray-700 hover:text-white focus:ring-1 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:focus:ring-gray-800"
		>
			<svg
				aria-hidden="true"
				class="w-5 h-5"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill-rule="evenodd"
					d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
					clip-rule="evenodd"
				/></svg
			>
			<span class="sr-only">Icon description</span>
		</button>
		<!-- </div> -->
	</a>
</div>

<style>
</style>
