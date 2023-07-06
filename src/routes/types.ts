export interface ITicket {
	id: number;
	created_at: string;
	boardID: number;
	projectID: number;
	title: string;
	description: string;
	position: number;
}

export interface IKanbanBoard {
	id: number;
	created_at?: string;
	projectID: number;
	boardName: string;
	position: number;
}

export interface IProjects {
	id: number;
	created_at?: string;
	projectName: string;
}

export interface IColumns{
	id: number,
	boardName: string,
	projectID: number,
	position: number ,
	items: ITicket[]
}

export interface IComments{
	id: number;
	created_at: string;
	ticketID: number;
	boardID: number;
	projectID: number;
	comment: string;
}

export interface INewTicket extends IColumns {
	title: string
}
