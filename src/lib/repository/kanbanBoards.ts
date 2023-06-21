import type { IKanbanBoard } from "../../routes/types.js";
import { supabase } from "../../supabase.js";

export const kanbanBoardsRepository = {

    get: async (id: number) => {

        const { data, error } = await supabase.from('kanbanBoards').select().eq('projectID', id)

        if (error) {
            return console.error(error, 'Error loading of kanbanBoards')
        }

        return data
    },
    post: async (newBoard: IKanbanBoard) => {

        const { data, error } = await supabase
            .from('kanbanBoards')
            .insert([newBoard])
        if (error) {
            return console.error(error, 'Error posting of kanbanBoards')
        }
    },
    update: async (id: number, newBoardName: string) => {
        console.log("🚀 ~ file: kanbanBoards.ts:26 ~ update: ~ id:", id, newBoardName)
        const { data, error } = await supabase
            .from('kanbanBoards')
            .update({ boardName: newBoardName })
            .eq('id', id)
        console.log("🚀 ~ file: kanbanBoards.ts:30 ~ update: ~ data:", data)

        if (error) {
            return console.error(error, 'Error updating of kanbanBoards')
        }
    },
    delete: async (id: number) => {

        const { error } = await supabase
            .from('kanbanBoards')
            .delete()
            .eq('id', id)

        if (error) {
            return console.error(error, 'Error deleting of kanbanBoards')
        }

    },

}