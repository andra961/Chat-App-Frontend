import client from "./axios";

export type ChatData = {
  id: number;
  name: string;
  ownerId: number;
  members: {
    id: number;
    username: string;
  }[];
};

const messageService = {
  getMessages: async (id: string) =>
    await (
      await client.get(`messages/${id}`)
    ).data,
  getChats: async () => {
    const resp = await client.get<ChatData[]>("/chats");

    return resp.data;
  },
  getChat: async (chatId: string) => {
    const resp = await client.get<ChatData>(`/chats/${chatId}`);

    return resp.data;
  },
  createChat: async (name: string) => {
    const resp = await client.post<void>("/chats", { name });
    return resp.data;
  },
  deleteGroup: async (chatId: number) => {
    const resp = await client.delete<void>(`/chats/${chatId}`);
    return resp.data;
  },
};

export default messageService;
