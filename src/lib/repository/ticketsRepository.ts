import { supabase } from "../../supabase.js";

export const ticketBoardsRepository = {

    get: async (id: number) => {

        const { data, error } = await supabase.from('tickets').select().eq('id', id)

        if (error) {
            return console.error(error, 'Error loading of tickets')
        }

        return data
    },
    post: async () => {
        1
    },
    update: async () => {
        1

    },
    delete: async () => {
        1
    },

}