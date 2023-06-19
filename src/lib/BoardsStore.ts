import { writable } from "svelte/store";
import type { IProjects, IKanbanBoard } from "../routes/types";
import { supabase } from '../supabase.js';

export const projects = writable<IProjects[] | []>([])

export const loadProjects = async () => {
    const {data, error} = await supabase.from('projects').select()
    console.log("🚀 ~ file: BoardsStore.ts:9 ~ loadBoards ~ data:", data)

    if(error) {
        return console.error(error, 'Error loading of loadProjects')
    }

    projects.set(data)
}
loadProjects()

export const kanbanBoards = writable<IKanbanBoard[] | any>([])