<script>
	import { getProjectsState } from '$lib/projects-state.svelte';
	import { onMount } from 'svelte';

	let { add, isDiabled, alloptions } = $props();
	let options = $state([]);

	let isOpen = $state(false);
	let selectedWithKeyboard = $state(false);
	let selectedOption = $state(null);
	let hiddenTextField;
	let searchField;
	let noResultsMessage;

	function setSelectedOption(option) {
		selectedOption = option;
		isOpen = false;
		selectedWithKeyboard = false;
		hiddenTextField.value = option.id;
	}

	function getFilteredOptions(query) {
		options = alloptions.filter((project) =>
			project.name.toLowerCase().includes(query.toLowerCase())
		);
		if (options.length === 0) {
			noResultsMessage.classList.remove('hidden');
		} else {
			noResultsMessage.classList.add('hidden');
		}
	}

	function handleKeydownOnOptions(event) {
		if (
			(event.keyCode >= 65 && event.keyCode <= 90) ||
			(event.keyCode >= 48 && event.keyCode <= 57) ||
			event.keyCode === 8
		) {
			searchField.focus();
		}
	}

	function onKeyDown(event) {
		if (event.key === 'Escape') {
			isOpen = false;
			selectedWithKeyboard = false;
		} else if ((event.ctrlKey || event.metaKey) && (event.key === 'k' || event.key === 'K')) {
			event.preventDefault();
			isOpen = !isOpen;
		}
	}
	function onAdd() {
		console.log(selectedOption);
		add(selectedOption);
	}
</script>

<svelte:window onkeydown={onKeyDown} />

<div class="flex w-full max-w-xs flex-col gap-1" onkeydown={handleKeydownOnOptions}>
	<label for="project" class="w-fit pl-0.5 text-sm text-slate-700 dark:text-slate-300"
		>Project</label
	>
	<div class="relative">
		<button
			type="button"
			class="inline-flex w-full items-center justify-between gap-2 border border-slate-300 rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium tracking-wide text-slate-700 transition hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 dark:focus-visible:outline-blue-600"
			role="combobox"
			aria-controls="projectList"
			aria-haspopup="listbox"
			onclick={() => (isOpen = !isOpen)}
			onkeydown={(e) => {
				if (['ArrowDown', 'Enter', ' '].includes(e.key)) {
					e.preventDefault();
					selectedWithKeyboard = true;
				}
			}}
			aria-expanded={isOpen || selectedWithKeyboard}
			aria-label={selectedOption ? selectedOption.name : 'Please Select a Project'}
		>
			<span class="text-sm font-normal">
				{selectedOption ? selectedOption.name : 'Please Select a Project'}
			</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				class="size-5"
				aria-hidden="true"
			>
				<path
					fill-rule="evenodd"
					d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>

		<input id="project" name="project" bind:this={hiddenTextField} hidden />
		{#if isOpen || selectedWithKeyboard}
			<div
				id="projectList"
				class="absolute left-0 top-11 z-10 w-full overflow-hidden rounded-xl border border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-slate-800"
				role="listbox"
				aria-label="projects list"
				onclick:outside={() => {
					isOpen = false;
					selectedWithKeyboard = false;
				}}
				onkeydown={(e) => {
					if (e.key === 'ArrowDown') {
						e.preventDefault();
						e.target.nextElementSibling?.focus();
					} else if (e.key === 'ArrowUp') {
						e.preventDefault();
						e.target.previousElementSibling?.focus();
					}
				}}
			>
				<div class="relative">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						stroke="currentColor"
						fill="none"
						stroke-width="1.5"
						class="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-700/50 dark:text-slate-300/50"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
						/>
					</svg>
					<input
						type="text"
						class="w-full border-b borderslate-300 bg-slate-100 py-2.5 pl-11 pr-4 text-sm text-slate-700 focus:outline-none focus-visible:border-blue-700 disabled:cursor-not-allowed disabled:opacity-75 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:focus-visible:border-blue-600"
						name="searchField"
						aria-label="Search"
						oninput={(e) => getFilteredOptions(e.target.value)}
						bind:this={searchField}
						placeholder="Search projects"
					/>
				</div>

				<ul class="flex max-h-44 flex-col overflow-y-auto">
					<li
						class="hidden px-4 py-2 text-sm text-slate-700 dark:text-slate-300"
						bind:this={noResultsMessage}
					>
						<span>No matches found</span>
					</li>
					{#each options as project, index}
						<li
							class="combobox-option inline-flex cursor-pointer justify-between gap-6 bg-slate-100 px-4 py-2 text-sm text-slate-700 hover:bg-slate-800/5 hover:text-black focus-visible:bg-slate-800/5 focus-visible:text-black focus-visible:outline-none dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-100/5 dark:hover:text-white dark:focus-visible:bg-slate-100/10 dark:focus-visible:text-white"
							role="option"
							onclick={() => setSelectedOption(project)}
							onkeydown={(e) => {
								if (e.key === 'Enter') setSelectedOption(project);
							}}
							id={'option-' + index}
							tabindex="0"
						>
							<span class={selectedOption == project ? 'font-bold' : ''}>
								{project.name}
							</span>
							<span class="text-sm text-slate-500">
								{project.project_code}
							</span>
							<span class="sr-only">
								{selectedOption == project ? 'selected' : ''}
							</span>
							{#if selectedOption == project}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									stroke="currentColor"
									fill="none"
									stroke-width="2"
									class="size-4"
									aria-hidden="true"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
								</svg>
							{/if}
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
	<button
		disabled={isDiabled}
		onclick={onAdd}
		class="bg-green-600 hover:bg-green-700 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
	>
		Add
	</button>
</div>
