import client from "./axios";

const messageService = {
  getMessages: async () =>
    await (
      await client.get(
        `${
          process.env.REACT_APP_HTTP_SERVER_URL || "http://localhost:4000"
        }/messages`
      )
    ).data,
};

export default messageService;
