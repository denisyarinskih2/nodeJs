const parseRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      if (Buffer.isBuffer(chunk)) {
        body += chunk.toString();
      } else {
        reject(new Error("Received unexpected chunk type"));
      }
    });

    req.on("end", () => {
      try {
        const parsedBody = JSON.parse(body);
        resolve(parsedBody);
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", (error) => {
      reject(error);
    });
  });
};

module.exports = parseRequestBody;
