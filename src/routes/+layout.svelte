<script>
	import '../global.css';
	import { page } from '$app/stores';
</script>

<!-- <header class="sticky top-0 flex justify-center items-center h-16"> -->
<div class="max-w-prose mx-auto">
	<nav
		class="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-prose flex flex-row justify-between items-center bg-white border-b border-gray-800 pb-4"
	>
		<div class="w-8 h-8 ml-4 p-1 fill-gray-900">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 2048 2048"
				class="svg_dd790ee3"
				focusable="false"
			>
				<path
					d="M2048 0v1536H731l-475 475v-475H0V0h2048zM128 128v256h1792V128H128zm1792 1280V512H128v896h256v293l293-293h1243zm-640-768h512v640h-512V640zm128 512h256V768h-256v384zM256 768h896v128H256V768zm0 256h896v128H256v-128z"
				/>
			</svg>
		</div>
		<div class="flex justify-center items-center bg-white">
			<a class:current={$page.url.pathname === '/'} href="/" class="p-4">Home</a>
			<a class:current={$page.url.pathname.startsWith('/blog')} href="/blog" class="p-4">Blog</a>
		</div>
		<!-- <div class="w-full max-w-prose mx-auto border-b border-gray-800" /> -->
	</nav>
	<!-- </div> -->
	<!-- </header> -->

	<main class="p-4 mt-28 mb-24 border-0 border-red-600 prose">
		<slot />
	</main>

	<footer
		class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-prose flex flex-col justify-center items-center bg-white border-t border-gray-800"
	>
		<div class="flex justify-center items-center max-w-prose mx-auto py-4 w-full bg-white">
			<span class="text-xs lowercase">&copy; Consoso AG, 2022</span>
		</div>
	</footer>
</div>

<style>
	.current {
		/* @apply underline underline-offset-8; */
		background: linear-gradient(120deg, #f917f9 0%, #f917f9 100%);
		background-repeat: no-repeat;
		background-size: 100% 20%;
		background-position: 0 70%;
	}
</style>
