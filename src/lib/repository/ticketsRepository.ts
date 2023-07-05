import type { INewTicket } from '../../routes/types.js';
import { supabaseRoot } from '../../supabase';

export const ticketRepository = {
	getByProjectID: async (projectID: number) => {
		const { data: tickets, error } = await supabaseRoot('tickets')
			.select()
			.eq('projectID', projectID);

		if (error) {
			console.error(error, 'Error loading of tickets');
		}
		return tickets;
	},
	getByBoardID: async (boardID: number) => {
		const { data, error } = await supabaseRoot('tickets').select('*').eq('boardID', boardID);
		if (error) {
			console.error(error, 'Error loading of tickets by board ID');
		}
		return data;
	},
	updateTitle: async (id: number, title: string) => {
		const { data, error } = await supabaseRoot('tickets').update({ title: title }).eq('id', id);
		if (error) {
			console.error(error, 'Error updating of title');
		}
		return data;
	},
	updateDescription: async (id: number, description: string) => {
		const { data, error } = await supabaseRoot('tickets').update({ description: description }).eq('id', id);
		if (error) {
			console.error(error, 'Error updating of description');
		}
		return data;
	},
	updatePositions: async (tickets: {id: number, position: number}[]) => {
		const { error } = await supabaseRoot('tickets').upsert(tickets);

		if (error) {
			return console.error(error, 'Error in updating positions for tickets');
		}
	},
	post: async (position: number, newTicket: INewTicket) => {
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
		const { error } = await supabaseRoot('tickets').delete().eq('id', id);
	}
};
