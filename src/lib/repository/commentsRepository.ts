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
		const { data, error } = await supabaseRoot('comments').update({ comment: comment }).eq('id', id);
		if (error) {
			console.error(error, 'Error updating of title');
		}
		return data;
	},
	post: async (id: number, newComment: string) => {
		const { error } = await supabaseRoot('comments').insert([
			{
				ticketID: id,
                comment: newComment
			}
		]);
	},
	delete: async (id: number) => {
		const { error } = await supabaseRoot('comments').delete().eq('id', id);
	}
};
