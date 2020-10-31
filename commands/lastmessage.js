const { database } = require('../config.json');
const Keyv = require('keyv');
const Discord = require('discord.js');

module.exports = {
	name: 'lastmessage',
    description: 'lastmessage!',
    args: true,
    guildOnly: true,
	execute(client, message, args) {
        message.guild.members.fetch(args[0])
        .then(usr => console.log(usr.lastMessage.content))

        .catch(console.error);

	},
};