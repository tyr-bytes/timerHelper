<script>
	// @ts-nocheck

	import { getProjectsState, setProjectsState } from '$lib/projects-state.svelte';
	import toast from 'svelte-french-toast';
	import { format, nextSunday } from 'date-fns';
	import { human_readable_from_seconds } from '$lib/util';
	import Search from '$lib/components/Search.svelte';
	import ProjectTimer from '$lib/components/ProjectTimer.svelte';

	const projectState = setProjectsState();
	let selectedProject = $state();
	/**
	 * @type {any[]}
	 */
	let currentProjects = $state([]);

	let isDiabled = $derived(selectedProject === '');
	let totalTime = $derived(
		currentProjects.reduce((total, project) => total + project.timeSpent, 0).toFixed(2)
	);

	const currentDate = format(Date.now(), 'E MM/dd/yyyy');
	const weekEnding = format(nextSunday(currentDate), 'MM/dd/yyyy');

	let activeTimerId = $state(null);

	function handleTimerToggle(projectId) {
		if (activeTimerId && activeTimerId !== projectId) {
			// Stop the currently active timer
			projectStore.stopTimer(activeTimerId);
		}
		activeTimerId = activeTimerId === projectId ? null : projectId;
	}

	/**
	 * @param {{ target: any; }} event
	 */
	function addProject(event) {
		const text = event.target;
		currentProjects.push(selectedProject);
		selectedProject = '';
		text?.focus();
	}

	/**
	 * @param {any} projectId
	 */
	function toggleTimer(projectId) {
		// Implement timer toggle logic here
		toast.success(`Toggled timer for project ${projectId}`);
		const elapsedSeconds = 120; // Example: 2 minutes elapsed
		projectState.updateTimeSpent(projectId, elapsedSeconds);
	}

	/**
	 * @param {any} projectId
	 */
	function deleteProject(projectId) {
		// Implement project deletion logic here
		toast.success(`Deleted project ${projectId}`);
	}

	$effect(() => console.log(projectState.projects));
</script>

<div class="bg-gray-900 text-white min-h-screen p-6">
	<div class="max-w-4xl mx-auto">
		<!-- Changed from max-w-4x1 to max-w-4xl for consistency -->
		<h1 class="text-4xl font-bold mb-4">{currentDate}</h1>
		<div class="text-sm mb-2">Last Working Day: {weekEnding}</div>
		<button class="text-blue-400 hover:underline mb-4">Import from yesterday?</button>

		<div class="bg-gray-800 p-4 rounded-lg mb-6">
			<h2 class="text-xl mb-2">Quick Project Add</h2>
			<Search />
			<div class="flex">
				<select bind:value={selectedProject} class="bg-gray-700 p-2 rounded flex-grow mr-2">
					<option value="">Select a project...</option>
					{#each projectState.projects as project, i}
						<option value={project}>{project.name}-{project.project_code}</option>
					{/each}
				</select>
				<button
					disabled={isDiabled}
					onclick={addProject}
					class="bg-green-600 hover:bg-green-700 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Add
				</button>
			</div>
		</div>

		<div class="overflow-x-auto">
			<!-- Added for horizontal scrolling if needed -->
			<table class="w-full table-auto">
				<thead>
					<tr class="text-left border-b border-gray-700">
						<th class="pb-2">Time Code</th>
						<th class="pb-2">Time Spent</th>
						<!-- <th class="pb-2">Interval(s)</th> -->
					</tr>
				</thead>
				<tbody>
					{#each currentProjects as project, i}
						<tr class="border-b border-gray-800">
							<td class="py-2 px-4">{project.name}</td>
							<td class="py-2 px-4">
								<ProjectTimer
									projectId={project.id}
									timeSpent={project.timespent}
									isActive={activeTimerId === project.id}
									onToggle={() => handleTimerToggle(project.id)}
								/>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<div class="text-right mt-4">
			<div class="text-xl">{totalTime}</div>
		</div>
	</div>
</div>
