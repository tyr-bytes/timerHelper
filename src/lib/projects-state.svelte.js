import { getContext, setContext } from "svelte";
import { projects } from './projects'

export class ProjectStore {
    /**
     * @type {Array<any>}
     */
    projects = $state([]);
    activeTimerId = $state(null);

    constructor() {
        this.loadProjects();
    }

    async loadProjects() {
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.projects = projects.map(project => ({
            id: project.id,
            project_code: project.project_code,
            name: project.name,
            description: project.description,
            timespent: project.timeSpent
        }))
    }

    /**
     * @param {string} descri
     */
    async addThing(descri) {
        const id = crypto.randomUUID();

        this.projects.push({
            id: id,
            name: descri,
            url: '/',
            timespent: 0
        });
    }

    /**
    * @param {string} id
    * @param {number} seconds
    */
    updateTimeSpent(id, seconds) {
        const project = this.projects.find(p => p.id === id);
        if (project) {
            project.timespent += seconds;
        }
    }

    /**
     * @param {string} id
     * @returns {number}
     */
    getTimeSpent(id) {
        const project = this.projects.find(p => p.id === id);
        return project ? project.timespent : 0;
    }


}

const PROJECTS_KEY = Symbol('PROJECTS');
export function setProjectsState() {
    return setContext(PROJECTS_KEY, new ProjectStore());
}

export function getProjectsState() {
    // return getContext<ReturnType<typeof setProjectsState>>(PROJECTS_KEY);
    return getContext(PROJECTS_KEY)
}

