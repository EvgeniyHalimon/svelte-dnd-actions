import { kanbanBoardsRepository } from '$lib/repository/kanbanBoardsRepository.js';
import { redirect } from '@sveltejs/kit';
import type { IKanbanBoard } from '../../types.js';

export async function load({ params, locals }) {
	const kanbanBoards = (await kanbanBoardsRepository.get(Number(params.id))) as IKanbanBoard[];

	if ((await locals.getSession()) === null) {
		throw redirect(302, '/login');
	}

	return {
		kanbanBoards: kanbanBoards.sort((a: IKanbanBoard, b: IKanbanBoard) => a.position - b.position)
	};
}
