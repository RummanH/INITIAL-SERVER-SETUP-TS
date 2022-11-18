import https from "https";
import path from "path";
import fs from "fs";

import dotenv from "dotenv";
dotenv.config();

import { config } from "./config";

process.on("uncaughtException", (err) => {
  console.error(`Uncaught exception: ${err.name}, ${err.message}`);
  console.error("🤔 App is shutting down...");
  process.exit(1);
});

import app from "./app";
import { mongoConnect } from "./services/mongo";

const server = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "..", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "..", "cert.pem")),
  },
  app
);

const PORT = config.PORT;
(async () => {
  try {
    await mongoConnect();
    server.listen(PORT, () => {
      console.log(
        `✔ Server is listening on port: ${PORT} in ${process.env.NODE_ENV} environment.`
      );
    });
  } catch (err) {
    console.error(`🤔 There was an error starting the server ${err}`);
  }
})();

process.on("unhandledRejection", (err: any) => {
  console.error(`Unhandled rejection: ${err.name} ${err.message}`);
  console.error("🤔 App is shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
