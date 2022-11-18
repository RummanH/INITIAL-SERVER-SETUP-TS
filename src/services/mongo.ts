import mongoose from "mongoose";

import { config } from "../config";

mongoose.connection.once("open", () => {
  console.log("✔ MongoDB connection is ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(`🤔 There was an error connecting to MongoDB ${err}`);
});

async function mongoConnect() {
  await mongoose.connect(config.MONGO_URL);
}

export { mongoConnect };
