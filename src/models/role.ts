import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/config';

class Role extends Model {
    public id!: number;
    public name!: string;
}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'roles',
        timestamps: false,
    }
);

export default Role;
