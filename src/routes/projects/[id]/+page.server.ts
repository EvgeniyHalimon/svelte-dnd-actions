import { kanbanBoardsRepository } from '$lib/repository/kanbanBoardsRepository.js';
import type { IKanbanBoard } from '../../types.js';

export async function load({ params }) {
	const kanbanBoards = (await kanbanBoardsRepository.get(Number(params.id))) as IKanbanBoard[];

	return {
		kanbanBoards: kanbanBoards.sort((a: IKanbanBoard, b: IKanbanBoard) => a.position - b.position)
	};
}
