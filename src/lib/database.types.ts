export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
	public: {
		Tables: {
			comments: {
				Row: {
					boardID: number | null;
					comment: string | null;
					created_at: string | null;
					id: number;
					projectID: number | null;
					ticketID: number | null;
				};
				Insert: {
					boardID?: number | null;
					comment?: string | null;
					created_at?: string | null;
					id?: number;
					projectID?: number | null;
					ticketID?: number | null;
				};
				Update: {
					boardID?: number | null;
					comment?: string | null;
					created_at?: string | null;
					id?: number;
					projectID?: number | null;
					ticketID?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: 'comments_boardID_fkey';
						columns: ['boardID'];
						referencedRelation: 'kanbanBoards';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'comments_projectID_fkey';
						columns: ['projectID'];
						referencedRelation: 'projects';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'comments_ticketID_fkey';
						columns: ['ticketID'];
						referencedRelation: 'tickets';
						referencedColumns: ['id'];
					}
				];
			};
			kanbanBoards: {
				Row: {
					boardName: string | null;
					created_at: string | null;
					id: number;
					position: number | null;
					projectID: number | null;
				};
				Insert: {
					boardName?: string | null;
					created_at?: string | null;
					id?: number;
					position?: number | null;
					projectID?: number | null;
				};
				Update: {
					boardName?: string | null;
					created_at?: string | null;
					id?: number;
					position?: number | null;
					projectID?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: 'kanbanBoards_projectID_fkey';
						columns: ['projectID'];
						referencedRelation: 'projects';
						referencedColumns: ['id'];
					}
				];
			};
			projects: {
				Row: {
					created_at: string | null;
					id: number;
					projectName: string | null;
				};
				Insert: {
					created_at?: string | null;
					id?: number;
					projectName?: string | null;
				};
				Update: {
					created_at?: string | null;
					id?: number;
					projectName?: string | null;
				};
				Relationships: [];
			};
			tickets: {
				Row: {
					boardID: number | null;
					created_at: string | null;
					description: string | null;
					id: number;
					position: number | null;
					projectID: number | null;
					title: string | null;
				};
				Insert: {
					boardID?: number | null;
					created_at?: string | null;
					description?: string | null;
					id?: number;
					position?: number | null;
					projectID?: number | null;
					title?: string | null;
				};
				Update: {
					boardID?: number | null;
					created_at?: string | null;
					description?: string | null;
					id?: number;
					position?: number | null;
					projectID?: number | null;
					title?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'tickets_boardID_fkey';
						columns: ['boardID'];
						referencedRelation: 'kanbanBoards';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'tickets_projectID_fkey';
						columns: ['projectID'];
						referencedRelation: 'projects';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
