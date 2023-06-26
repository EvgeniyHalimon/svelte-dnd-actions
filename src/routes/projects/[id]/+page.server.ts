import { kanbanBoardsRepository } from '$lib/repository/kanbanBoards.js';

export async function load({ params }) {
	const kanbanBoards: any = await kanbanBoardsRepository.get(Number(params.id));

	return {
		kanbanBoards: kanbanBoards.sort((a: any, b: any) => a.position - b.position)
	};
}
