<script lang="ts">
	export let href = '';
	export let title: string | undefined = undefined;
</script>

<a data-sveltekit-reload {href} {title}><slot /></a>
