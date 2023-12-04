import { runDb } from "./repositories/dataBase/blogsDb";
import { app } from "./settings";
const port = process.env.PORT || 3000;

export const startApp = async () => {
  await runDb();
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};
app.set("trust proxy", true);

startApp();
