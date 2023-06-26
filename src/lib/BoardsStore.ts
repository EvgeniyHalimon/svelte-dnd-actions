import { writable } from 'svelte/store';
import type { IProjects, IKanbanBoard } from '../routes/types';
import { projectRepository } from '$lib/repository/projectsRepository';

export const projects = writable<IProjects[] | []>([]);

export const loadProjects = async () => {
	const data = await projectRepository.get();

	projects.set(data);
};
loadProjects();

export const kanbanBoards = writable<IKanbanBoard[] | any>([]);
