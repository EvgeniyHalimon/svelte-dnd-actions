import type { ITicket } from '../../routes/types';
import { supabaseRoot } from '../../supabase';

export const commentsRepository = {
	getByTicketID: async (ticketID: number) => {
		const { data: tickets, error } = await supabaseRoot('comments')
			.select()
			.eq('ticketID', ticketID);

		if (error) {
			console.error(error, 'Error loading of comments');
		}
		return tickets;
	},
	update: async (id: number, comment: string) => {
		const { error } = await supabaseRoot('comments').update({ comment: comment }).eq('id', id);
		if (error) {
			console.error(error, 'Error updating of title');
		}
	},
	post: async (ticket: ITicket, newComment: string) => {
		const { error } = await supabaseRoot('comments').insert([
			{
				ticketID: ticket.id,
				boardID: ticket.boardID,
				projectID: ticket.projectID,
				userID: ticket.userID,
				comment: newComment
			}
		]);
		if (error) {
			console.error(error, 'Error in posting of comment');
		}
	},
	delete: async (id: number) => {
		const { error } = await supabaseRoot('comments').delete().eq('id', id);
		if (error) {
			console.error(error, 'Error in deleting comment by id');
		}
	},
	deleteByTicketID: async (ticketID: number) => {
		const { error } = await supabaseRoot('comments').delete().eq('ticketID', ticketID);
		if (error) {
			console.error(error, 'Error in deleting comment by ticketID');
		}
	},
	deleteByBoardID: async (boardID: number) => {
		const { error } = await supabaseRoot('comments').delete().eq('boardID', boardID);
		if (error) {
			console.error(error, 'Error in deleting comment by of boardID');
		}
	},
	deleteByProjectID: async (projectID: number) => {
		const { error } = await supabaseRoot('comments').delete().eq('projectID', projectID);
		if (error) {
			console.error(error, 'Error in deleting comment by of projectID');
		}
	}
};
