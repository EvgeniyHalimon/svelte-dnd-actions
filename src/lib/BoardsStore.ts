import { writable } from 'svelte/store';
import type { IProjects, IKanbanBoard, ITicket, IColumns, IComments } from '../routes/types';

export const projects = writable<IProjects[] | []>([]);
export const kanbanBoards = writable<IKanbanBoard[] | any>([]);
export const columns = writable<IColumns[] | []>([]);
export const tickets = writable<ITicket[] | []>([]);
export const comments = writable<IComments[] | []>([]);
export const userID = writable<string>('');
