const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('blog', 'root', 'aakash', {
  host: 'localhost',
  dialect: 'mysql',
});

const Blog = sequelize.define('Blog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  blogContent: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'blog',
  freezeTableName: true,
  timestamps: false,
});

sequelize.sync().then(() => {
  console.log("Blogs table synced!");
});

module.exports = Blog;