const responseBuilder = (res, status, message) => {
  return res
    .status(status)
    .json({
      status,
      ...message,
    })
    .end();
};

exports.OK = (res, data) => {
  return responseBuilder(res, 200, { data });
};

exports.CREATED = (res, data) => {
  return responseBuilder(res, 201, { data });
};

exports.NO_CONTENT = (res) => {
  return responseBuilder(res, 204);
};

exports.BAD_REQUEST = (res, message) => {
  return responseBuilder(res, 400, { error: message });
};

exports.INTERNAL_ERROR = (res, message) => {
  return responseBuilder(res, 500, { error: message });
};
