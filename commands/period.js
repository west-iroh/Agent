const { database } = require('../config.json');
const Keyv = require('keyv');

module.exports = {
	name: 'period',
    description: 'The length of time (in seconds) for someone to be considered inactive.',
    args: false,
    usage: '[time]',
    guildOnly: true,
	async execute(client, message, args) {
        const inactivityTimes = new Keyv('sqlite://db.sqlite', { namespace: 'inactivityTimes' });
        inactivityTimes.on('error', err => console.error('Keyv connection error:', err));
        if (!args.length) {
            const time = await inactivityTimes.get(message.guild.id);
            message.channel.send(`Period is \`${time}\``);
        }
        else {
            await inactivityTimes.set(message.guild.id, args[0]);
            message.channel.send(`Successfully set period to \`${args[0]}\``);
        }
	},
};