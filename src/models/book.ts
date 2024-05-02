import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/config';

class Book extends Model {
    public id!: number;
    public title!: string;
    public author!: string;
    public year!: number;
    public genre!: string;
}

Book.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true,
            },
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'books',
        timestamps: false,
    }
);

export default Book;
