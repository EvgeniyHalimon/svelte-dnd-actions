import { kanbanBoardsRepository } from '$lib/repository/kanbanBoards.js';


export async function load({ params }) {
    const kanbanBoards = await kanbanBoardsRepository.get(Number(params.id))

    return {
        kanbanBoards
    };
}