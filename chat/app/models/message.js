var Sequelize = require('sequelize');
var seq = new Sequelize('chat', 'root', '', 'localhost');

exports.connection = seq;

exports.tblchats = seq.define('tblchats',
{
	text: Sequelize.STRING(500),
	username: Sequelize.STRING(250),
},
{timestamps : false}
);

exports.users = seq.define('users',
{
	id: {type: Sequelize.INTEGER, primaryKey: true},
	username: Sequelize.STRING(250),
	password: Sequelize.STRING(255),
	peer: Sequelize.STRING(25),
	status: Sequelize.INTEGER
});

exports.pmessages = seq.define('pmessages',
{
	id: {type: Sequelize.INTEGER, primaryKey: true},
	uid: Sequelize.STRING,
	toid: Sequelize.STRING,
	message: Sequelize.STRING,
	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE,
});

exports.newsfeeds = seq.define('newsfeeds',{
	id: {type: Sequelize.INTEGER, primaryKey: true},
	message: Sequelize.STRING,
	username: Sequelize.STRING,
	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE,
});