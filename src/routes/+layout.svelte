<script>
	import '../global.css';
	import { page } from '$app/stores';
</script>

<header class="fixed top-0 w-full flex justify-center items-center h-16 text-gray-100 bg-blue-800">
	<nav>
		<a class:current={$page.url.pathname === '/'} href="/" class="p-4">Home</a>
		<a class:current={$page.url.pathname === '/blog'} href="/blog" class="p-4">Blog</a>
	</nav>
</header>

<main class="container mx-auto p-4 mt-16 mb-6 border-0 border-red-600 prose">
	<slot />
</main>

<footer
	class="fixed bottom-0 w-full flex justify-center items-center h-6 text-xs lowercase text-gray-100 bg-blue-800"
>
	<div>&copy; Consoso AG, 2022</div>
</footer>

<style>
	.current {
		@apply underline underline-offset-8;
	}
</style>
