<script>
	import '../app.css';
	import { links } from '$lib/links';
	import { onMount } from 'svelte';
	import toast, { Toaster } from 'svelte-french-toast';
	import { setProjectsState } from '$lib/projects-state.svelte';
	let { children } = $props();
</script>

<Toaster />
<div class="min-h-screen bg-background text-foreground">
	<header class="bg-card shadow">
		<nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between flex-wrap h-16">
				<div class="flex-shrink-0 mr-6">
					<a href="/" class="text-lg font-semibold">TimeTracker</a>
				</div>
				<div class="flex flex-grow items-center justify-end flex-wrap">
					{#each links as link}
						<a
							href={link.href}
							class="text-sm font-medium hover:text-primary hover:bg-secondary px-3 py-2 rounded-md transition duration-150 ease-in-out"
						>
							{link.label}
						</a>
					{/each}
				</div>
			</div>
		</nav>
	</header>
	<main class="py-6">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			{@render children()}
		</div>
	</main>
</div>
