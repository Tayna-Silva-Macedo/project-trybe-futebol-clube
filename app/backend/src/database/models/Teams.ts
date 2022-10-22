import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Teams extends Model {
  id!: number;
  teamName!: string;
}

Teams.init(
  {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: INTEGER,
    },
    teamsName: {
      allowNull: false,
      type: STRING,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'Teams',
    tableName: 'teams',
    timestamps: false,
  },
);

export default Teams;
