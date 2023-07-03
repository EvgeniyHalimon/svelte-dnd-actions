import type { IKanbanBoard } from '../../routes/types.js';
import { supabase, supabaseRoot } from '../../supabase.js';

export const kanbanBoardsRepository = {
	get: async (id: number) => {
		const { data, error } = await supabaseRoot('kanbanBoards').select().eq('projectID', id);

		if (error) {
			return console.error(error, 'Error loading of kanbanBoards');
		}

		return data;
	},
	post: async (newBoard: Omit<IKanbanBoard, "id">) => {
		const { data, error } = await supabaseRoot('kanbanBoards').insert([newBoard]);
		if (error) {
			return console.error(error, 'Error posting of kanbanBoards');
		}
	},
	update: async (id: number, newBoardName: string) => {
		console.log('🚀 ~ file: kanbanBoards.ts:26 ~ update: ~ id:', id, newBoardName);
		const { data, error } = await supabaseRoot('kanbanBoards')
			.update({ boardName: newBoardName })
			.eq('id', id);

		if (error) {
			return console.error(error, 'Error updating of kanbanBoards');
		}
	},
	updatePositions: async (boards: any) => {
		console.log('🚀 ~ file: kanbanBoards.ts:26 ~ update: ~ id:', boards);
		const { data, error } = await supabaseRoot('kanbanBoards')
			.upsert(boards)

		if (error) {
			return console.error(error, 'Error in updating positions for kanbanBoards');
		}
	},
	delete: async (id: number) => {
		const { error } = await supabaseRoot('kanbanBoards').delete().eq('id', id);

		if (error) {
			return console.error(error, 'Error deleting of kanbanBoards');
		}
	}
};
