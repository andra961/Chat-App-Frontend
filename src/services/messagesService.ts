const messageService = {
  getMessages: async () =>
    await (
      await fetch(
        `${
          process.env.REACT_APP_HTTP_SERVER_URL || "http://localhost:4000"
        }/messages`
      )
    ).json(),
};

export default messageService;
