import { writable } from "svelte/store";
import type { IBoards, IKanbanBoard } from "../routes/types";

export const boards = writable<IBoards[] | []>([])
export const kanbanBoards = writable<IKanbanBoard[] | any>([])