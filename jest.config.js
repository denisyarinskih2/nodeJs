module.exports = {
  testEnvironment: "node",
  roots: ["./src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
};
