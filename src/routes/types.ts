export interface ListItem {
    id: number,
    title: string,
    description: string,
}

export interface IKanbanBoard{
    id: number,
    boardName: string,
    tickets: ListItem[],
}

export interface IBoards{
    boardId: number,
    boardName: string,
    kanbanBoards: IKanbanBoard[]
}