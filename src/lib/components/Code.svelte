<script lang="ts">
	import Prism from 'prismjs';

	export let lang: string;
	export let text: string;

	const html = Prism.highlight(text, Prism.languages[lang], lang);
</script>

<pre><code class="language-{lang}">{@html html}</code></pre>
