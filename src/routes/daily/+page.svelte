<script>
	// @ts-nocheck

	import { getProjectsState, setProjectsState } from '$lib/projects-state.svelte';
	import toast from 'svelte-french-toast';
	import { format, nextSunday } from 'date-fns';
	import { human_readable_from_seconds } from '$lib/util';
	import Search from '$lib/components/Search.svelte';
	import ProjectTimer from '$lib/components/ProjectTimer.svelte';
	import { projects } from '$lib/projects';

	const projectState = setProjectsState();
	let selectedProject = $state();
	/**
	 * @type {any[]}
	 */
	let currentProjects = $state([]);

	let isDiabled = $derived(selectedProject === '');
	const timeSpent = $derived.by(() => {
		let total = 0;
		for (const n of currentProjects) {
			total += n.timespent;
		}
		return total.toFixed(2);
	});

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

	function deleteProject(projectId) {
		console.log(projectId);
		currentProjects = currentProjects.filter((proj) => projectId !== proj.id);
		toast.success(`Deleted project ${projectId}`);
	}

	/**
	 * @param {{ target: any; }} event
	 */
	function addProject(selectedProject) {
		console.log(event);
		if (currentProjects.includes(selectedProject) === false) {
			currentProjects.push(selectedProject);
			selectedProject = '';
		}
	}

	/**
	 * @param {any} projectId
	 */
	function toggleTimer(projectId) {
		// Implement timer toggle logic here
		toast.success(`Toggled timer for project ${projectId}`);
		const elapsedSeconds = 120; // Example: 2 minutes elapsed
		// projectState.updateTimeSpent(projectId, elapsedSeconds);
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
			<div class="flex">
				<Search add={addProject} {isDiabled} alloptions={projectState.projects} />
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
									isActive={activeTimerId === project.id}
									onDelete={deleteProject}
									bind:project={currentProjects[i]}
								/>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<div class="text-right mt-4">
			<div class="text-xl">{human_readable_from_seconds(timeSpent)}</div>
		</div>
	</div>
</div>
