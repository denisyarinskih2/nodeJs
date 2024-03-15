module.exports = {
  testEnvironment: "node",
  roots: ["./src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
  coverageThreshold: {
    global: {
      lines: 85,
    },
  },
};
