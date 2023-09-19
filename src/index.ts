import { app } from "./settings";
const port = 3000;

export const startApp = async () => {
    app.listen(port, ()=>{
        console.log(`Example app listening on port ${port}`);
    });
}

startApp()
