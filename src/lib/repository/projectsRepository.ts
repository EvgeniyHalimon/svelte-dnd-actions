import type { IProjects } from '../../routes/types.js';
import { supabaseRoot } from '../../supabase';
import { commentsRepository } from './commentsRepository.js';
import { kanbanBoardsRepository } from './kanbanBoardsRepository.js';
import { ticketRepository } from './ticketsRepository.js';

export const projectRepository = {
	get: async (): Promise<IProjects[] | []> => {
		const { data, error } = await supabaseRoot('projects').select();

		if (error) {
			console.error(error, 'Error loading of loadProjects');
		}

		return data || [];
	},
	delete: async (id: number) => {
		await commentsRepository.deleteByProjectID(id)
		await ticketRepository.deleteByProjectID(id)
		await kanbanBoardsRepository.deleteByProjectID(id)
		const { error } = await supabaseRoot('projects').delete().eq('id', id);
		if (error) {
			return console.error(error, 'Error of delete project');
		}
	},
	post: async (data: Omit<IProjects, 'id'>) => {
		const { error } = await supabaseRoot('projects').insert([data]);

		if (error) {
			return console.error(error, 'Error of post new project');
		}
	},
	update: async (id: number, projectName: IProjects) => {
		const { error } = await supabaseRoot('projects')
			.update({ projectName: projectName })
			.eq('id', id);

		if (error) {
			return console.error(error, 'Error of post new project');
		}
	}
};
