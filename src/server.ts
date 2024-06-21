import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";
import { Server } from "http"


let server: Server;

async function main() {
  try {
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });

    await mongoose.connect(config.database_url as string);
    console.log("MongoDB Connect");
  } catch (error) {
    console.log(error);
  }
}

main();

process.on("unhandledRejection", () => {
  console.log("Unhandled rejection is detected, Sutting down...");

  if (server) {
    server.close(() => {
      process.exit(1);
    })
  }
  process.exit(1);
})

process.on("uncaughtException", () => {
  console.log("UncaughtException rejection is detected, Sutting down...");
  process.exit(1);
})