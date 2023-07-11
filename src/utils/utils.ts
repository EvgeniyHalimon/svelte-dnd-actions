import type { IKanbanBoard, ITicket } from '../routes/types';

export function transformArray(boards: IKanbanBoard[], tickets: ITicket[]) {
	const transformedBoard = boards
		.map((board: IKanbanBoard) => ({
			id: board.id,
			boardName: board.boardName,
			projectID: board.projectID,
			position: board.position,
			userID: board.userID,
			items: tickets.filter((ticket: ITicket) => ticket.boardID === board.id)
		}))
		.sort((a: IKanbanBoard, b: IKanbanBoard) => a?.position - b?.position);

	return transformedBoard;
}

export function getDate(date: string) {
	const d = new Date(date);

	return `${d.toLocaleTimeString('en-GB')} ${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
}
