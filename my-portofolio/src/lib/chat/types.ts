export type ChatRole = "user" | "model";

export interface ChatTurn {
  role: ChatRole;
  content: string;
}

export interface ChatMessage extends ChatTurn {
  id: string;
  createdAt: number;
  isError?: boolean;
}

export interface ChatRequestPayload {
  messages: ChatTurn[];
}

