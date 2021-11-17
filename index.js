import expressApp from "./express.js";
import { SERVER_PORT } from "./const/const.js";

expressApp.listen(SERVER_PORT, () => {
    console.log("server listen... ");
});
