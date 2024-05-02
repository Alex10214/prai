import {Sequelize} from "sequelize-typescript";

const connection = new Sequelize({
    dialect:"mysql",
    host:"localhost",
    username:"root",
    password:"555555555555",
    database:"todo",
    logging: false,
});

export default connection;

