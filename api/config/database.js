import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "api/config/config.env" });
export const connectDataBase = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.DATABASE_CLOUD)
    .then((con) => {
      console.log("DB connected");
    });
};


