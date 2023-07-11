import type { IKanbanBoard } from '../../routes/types.js';
import { supabaseRoot } from '../../supabase.js';
import { commentsRepository } from './commentsRepository.js';
import { ticketRepository } from './ticketsRepository.js';

export const kanbanBoardsRepository = {
	get: async (id: number) => {
		const { data, error } = await supabaseRoot('kanbanBoards').select().eq('projectID', id);

		if (error) {
			return console.error(error, 'Error loading of kanbanBoards');
		}

		return data;
	},
	post: async (newBoard: Omit<IKanbanBoard, 'id'>) => {
		const { data, error } = await supabaseRoot('kanbanBoards').insert([newBoard]);
		if (error) {
			return console.error(error, 'Error posting of kanbanBoards');
		}
	},
	update: async (id: number, newBoardName: string) => {
		const { data, error } = await supabaseRoot('kanbanBoards')
			.update({ boardName: newBoardName })
			.eq('id', id);

		if (error) {
			return console.error(error, 'Error updating of kanbanBoards');
		}
	},
	updatePositions: async (boards: any) => {
		const { error } = await supabaseRoot('kanbanBoards').upsert(boards);

		if (error) {
			return console.error(error, 'Error in updating positions for kanbanBoards');
		}
	},
	delete: async (id: number) => {
		await commentsRepository.deleteByBoardID(id);
		await ticketRepository.deleteByBoardID(id);
		const { error } = await supabaseRoot('kanbanBoards').delete().eq('id', id);
		if (error) {
			return console.error(error, 'Error deleting of kanbanBoards');
		}
	},
	deleteByProjectID: async (projectID: number) => {
		const { error } = await supabaseRoot('kanbanBoards').delete().eq('projectID', projectID);

		if (error) {
			return console.error(error, 'Error deleting of kanbanBoards by projectsID');
		}
	}
};
