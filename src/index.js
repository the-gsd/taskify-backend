import "dotenv/config";
import { dbConnect } from "./db/index.js";
import { app } from "./app.js";

const port = process.env.PORT || 4000;

dbConnect()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(`error while connecting database :\n ${err}`);
  });
