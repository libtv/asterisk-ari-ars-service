import express from "express";
import bodyParser from "body-parser";
import routeHome from "./route/home.js";
import routeError from "./route/error.js";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routeHome);
app.use(routeError);

export default app;
