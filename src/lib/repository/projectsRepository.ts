import type { IProjects } from '../../routes/types.js';
import { supabaseRoot } from '../../supabase';

export const projectRepository = {
	get: async (): Promise<IProjects[] | []> => {
		const { data, error } = await supabaseRoot('projects').select();

		if (error) {
			console.error(error, 'Error loading of loadProjects');
		}

		return data || [];
	},
	delete: async (id: number) => {
		const { error } = await supabaseRoot('projects').delete().eq('id', id);
		if (error) {
			return console.error(error, 'Error of delete project');
		}
	},
	post: async (data: IProjects) => {
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
