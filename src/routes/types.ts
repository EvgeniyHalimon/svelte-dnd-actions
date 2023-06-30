export interface ITicket {
	id?: number;
	created_at?: string;
	boardID?: number;
	title: string;
	description: string;
	position: number;
}

export interface IKanbanBoard {
	id: number;
	created_at?: string;
	projectID?: number;
	boardName: string;
	position?: number;
}

export interface IProjects {
	id?: number;
	created_at?: any;
	projectName: string;
}

export type TransformedTicketArray = Record<string, ITicket[]>