import express from 'express';
import connection from "./db/config";
import {json} from "body-parser";
import booksRoutes from "./routes/books";
import usersRoutes from "./routes/users";
import rolesRoutes from "./routes/roles";
import authRoutes from "./routes/auth";

const app = express();

app.use(json());

app.use('/api/books', booksRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/auth', authRoutes);

connection.sync().then(() =>  {
    console.log("DB connection successfully");
    app.listen(3000);
}).catch((e) => {
    console.error("Error", e);
})


