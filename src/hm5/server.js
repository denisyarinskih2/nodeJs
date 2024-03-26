const http = require("http");
const router = require("./router");

const server = http.createServer(router);

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});