const parseRequestBody = require("./utils/swaggerParser");
const {
  createUser,
  getUsers,
  deleteUser,
  updateUserHobbies,
  getUserHobbies,
} = require("./data/memoryDB.js");

async function router(req, res) {
  try {
    if (req.method === "GET" && req.url === "/api/users") {
      const result = getUsers();
      res.setHeader("Cache-Control", "private, max-age=3600");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    } else if (req.method === "DELETE" && req.url.startsWith("/api/users/")) {
      const userId = req.url.split("/")[3];
      const result = deleteUser(userId);
      const responseValue = {
        data: result ? { success: true } : null,
        error: result ? null : `User with id ${userId} doesn't exist`,
      };
      res.writeHead(result ? 200 : 404, { "Content-Type": "application/json" });
      res.end(JSON.stringify(responseValue));
    } else if (
      req.method === "GET" &&
      req.url.startsWith("/api/users/") &&
      req.url.endsWith("/hobbies")
    ) {
      const userId = req.url.split("/")[3];
      const result = getUserHobbies(userId);
      if (result) {
        res.setHeader("Cache-Control", "private, max-age=3600");
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            data: null,
            error: `User with id ${userId} doesn't exist`,
          })
        );
      }
    } else {
      const parsedBody = await parseRequestBody(req);
      const userId = req.url.split("/")[3];

      if (req.method === "POST" && req.url === "/api/users") {
        const resp = createUser(parsedBody);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(resp));
      } else if (
        req.method === "PATCH" &&
        req.url.startsWith("/api/users/") &&
        req.url.endsWith("/hobbies")
      ) {
        const newHobbies = parsedBody.hobbies || [];
        const result = updateUserHobbies(userId, newHobbies);
        const responseValue = {
          data: result ? { success: true } : null,
          error: result ? null : `User with id ${userId} doesn't exist`,
        };
        res.writeHead(result ? 200 : 404, {
          "Content-Type": "application/json",
        });
        res.end(JSON.stringify(responseValue));
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Not Found" }));
      }
    }
  } catch (error) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Bad Request" }));
  }
}

module.exports = router;
