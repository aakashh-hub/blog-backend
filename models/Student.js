const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('aakash', 'root', 'admin', {
  host: 'localhost',
  dialect: 'mysql',
});

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  course: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'student', 
  freezeTableName: true, 
  timestamps: false,
});

sequelize.sync().then(() => {
  console.log("Students table synced!");
});

module.exports = Student;