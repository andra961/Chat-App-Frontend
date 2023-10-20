import client from "./axios";

const messageService = {
  getMessages: async (id: string) =>
    await (
      await client.get(`messages/${id}`)
    ).data,
  getChats: async () => {
    const resp = await client.get<
      {
        id: number;
        name: string;
        ownerId: number;
      }[]
    >("/chats");

    return resp.data;
  },
};

export default messageService;
