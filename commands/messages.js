const { database } = require('../config.json');
const Keyv = require('keyv');
const Discord = require('discord.js');

module.exports = {
	name: 'messages',
    description: 'Messages!',
    args: false,
    guildOnly: true,
	execute(client, message, args) {
        // const inactivityTimes = new Keyv('sqlite://db.sqlite', { namespace: 'inactivityTimes' });
        // inactivityTimes.on('error', err => console.error('Keyv connection error:', err));
        // const time = await inactivityTimes.get(message.guild.id);
        message.channel.messages.fetch({limit:100}, false, true)
        .then(messages => console.log(`Received ${messages.size} messages`))
        .catch(console.error);

	},
};