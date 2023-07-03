import type { IKanbanBoard, ITicket } from "../routes/types";

export function transformArray(boards: IKanbanBoard[], tickets: ITicket[]) {
    const transformedBoard = boards.map((board: IKanbanBoard) => ({
        id: board.id,
        boardName: board.boardName,
        projectID: board.projectID,
        position: board.position,
        items: tickets.filter((ticket: ITicket) => ticket.boardID === board.id)
    })).sort((a: IKanbanBoard, b: IKanbanBoard) => a?.position - b?.position);

    return transformedBoard;
}