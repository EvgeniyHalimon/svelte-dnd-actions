import type { ITicket } from '../../routes/types.js';
import { supabase, supabaseRoot } from '../../supabase';

export const ticketRepository = {
	getByProjectID: async (projectID: number): Promise<ITicket[] | [] | null> => {
		const { data: tickets, error } = await supabaseRoot('tickets')
			.select()
			.eq('projectID', projectID);

		if (error) {
			console.error(error, 'Error loading of tickets');
		}
		return tickets;
	},
	getByBoardID: async (boardID: number): Promise<any> => {
		const { data, error } = await supabaseRoot('tickets').select('*').eq('boardID', boardID);
		return data;
	},
	updateTitle: async (id: number, title: string) => {
		const { data, error } = await supabase.from('tickets').update({ title: title }).eq('id', id);
		if (error) {
			console.error(error, 'Error loading of tickets');
		}
		return data;
	},
	updatePositions: async (tickets: any) => {
		console.log('🚀 ~ file: kanbanBoards.ts:26 ~ update: ~ id:', tickets);
		const { data, error } = await supabaseRoot('tickets')
			.upsert(tickets)

		if (error) {
			return console.error(error, 'Error in updating positions for tickets');
		}
	},
	post: async (position: number, newTicket: any) => {
		const { error } = await supabaseRoot('tickets').insert([
			{
				boardID: newTicket.id,
				title: newTicket.title,
				description: '',
				position: position,
				projectID: newTicket.projectID
			}
		]);
	},
	delete: async (id: number) => {
		const { error } = await supabaseRoot('tickets').delete()
			.eq('id', id)
	}
};
