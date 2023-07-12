import { writable } from 'svelte/store';
import type { IProjects, IKanbanBoard, ITicket, IColumns, IComments } from '../routes/types';
import type { UserMetadata } from '@supabase/supabase-js';

export const projects = writable<IProjects[] | []>([]);
export const kanbanBoards = writable<IKanbanBoard[] | any>([]);
export const columns = writable<IColumns[] | []>([]);
export const tickets = writable<ITicket[] | []>([]);
export const comments = writable<IComments[] | []>([]);
export const userID = writable<string | null>(null);
export const userMetadata = writable<UserMetadata | undefined>(undefined);
