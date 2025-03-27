import mongoose from "mongoose";
import { constants } from "../constants.js";

export const dbConnect = async () => {
  try {
    const dbConnection = await mongoose.connect(
      `${process.env.DB_CONNECTION_STRING}/${constants.DB_NAME}`
    );
    console.log(
      `db connected successfully on HOST : ${dbConnection.connection.host}`
    );
  } catch (error) {
    console.log(`db connection failed with error : ${error}`);
    process.exit(1);
  }
};
