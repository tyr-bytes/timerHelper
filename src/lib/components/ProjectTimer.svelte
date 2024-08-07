<script>
	import { Timer } from '$lib/timerUtils';
	import { onMount, onDestroy } from 'svelte';
	import { human_readable_from_seconds } from '$lib/util';

	let { projectId, timeSpent = $bindable(), isActive = $bindable(), onToggle } = $props();

	/**
	 * @type {Timer}
	 */
	let timer;

	onMount(() => {
		timer = new Timer(
			(/** @type {any} */ delta, /** @type {unknown} */ total) => {
				timeSpent = total; // This updates the parent's value
			},
			(/** @type {unknown} */ running) => {
				isActive = running; // This updates the parent's value
			}
		);
		timer.totalElapsedTime = timeSpent;
	});

	onDestroy(() => {
		if (timer) timer.stop();
	});

	function toggleTimer() {
		onToggle();
		timer.toggle();
	}

	function stop() {
		timer.stop();
	}

	function reset() {
		timer.reset();
		timeSpent = 0; // This updates the parent's value
	}

	function deleteProject() {
		// Implement delete logic here
		console.log('Delete project', projectId);
	}

	$effect(() => {
		if (timer) {
			if (isActive) {
				timer.start();
			} else {
				timer.stop();
			}
		}
	});
</script>

<div class="flex items-center space-x-3">
	<div class="w-24 text-sm">{human_readable_from_seconds(timeSpent)}</div>
	<!-- Play/Pause Button -->
	<button
		onclick={toggleTimer}
		class="w-12 h-12 flex items-center justify-center rounded-lg {isActive
			? 'bg-blue-500 hover:bg-blue-600'
			: 'bg-blue-600 hover:bg-blue-700'} text-white transition duration-150 ease-in-out"
	>
		<svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
			{#if isActive}
				<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
			{:else}
				<path d="M8 5v14l11-7z" />
			{/if}
		</svg>
	</button>

	<!-- Stop Button -->
	<button
		onclick={stop}
		disabled={!isActive}
		class="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
	>
		<svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
			<rect x="6" y="6" width="12" height="12" />
		</svg>
	</button>

	<!-- Delete Button -->
	<button
		onclick={deleteProject}
		class="w-12 h-12 flex items-center justify-center rounded-lg bg-red-600 hover:bg-red-700 text-white transition duration-150 ease-in-out"
	>
		<svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
			/>
		</svg>
	</button>
</div>
