const responseConfig = (res, statusCode, data, message) => {
  res.status(statusCode).json({
    message,
    data,
    date: new Date(),
  });
};

export { responseConfig };
