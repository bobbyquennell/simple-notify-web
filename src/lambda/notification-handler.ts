const notificationHandler = async (event: any, context: any) => {
  console.log('notificationHandler', event, context);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from notificationHandler',
      input: event,
    }),
  };
};

export { notificationHandler };
