import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/config';
import Role from '../models/role';

class User extends Model {
    public id!: number;
    public username!: string;
    public password!: string;
    public roleId!: number;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Role,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: false,
    }
);

User.belongsTo(Role, { foreignKey: 'roleId' });

export default User;

