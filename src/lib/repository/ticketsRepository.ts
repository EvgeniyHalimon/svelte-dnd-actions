import type { ITicket } from '../../routes/types.js';
import { supabase } from '../../supabase.js';

export const ticketRepository = {
	getByProjectID: async (projectID: number): Promise<ITicket[] | [] | null> => {
		const { data: tickets, error } = await supabase
			.from('tickets')
			.select()
			.eq('projectID', projectID);

		if (error) {
			console.error(error, 'Error loading of tickets');
		}
		return tickets;
	},
	getByBoardID: async (boardID: number): Promise<any> => {
		const { data, error } = await supabase.from('tickets').select('*').eq('boardID', boardID);
		return data;
	},
	updateTitle: async (id: number, title: string) => {
		const { data, error } = await supabase.from('tickets').update({ title: title }).eq('id', id);
		if (error) {
			console.error(error, 'Error loading of tickets');
		}
		return data;
	},
	post: async (position: number, newTicket: any) => {
		const { error } = await supabase.from('tickets').insert([
			{
				boardID: newTicket.id,
				title: newTicket.title,
				description: '',
				position: position,
				projectID: newTicket.projectID
			}
		]);
	}
};
