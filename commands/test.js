const { database } = require('../config.json');
const Keyv = require('keyv');

module.exports = {
	name: 'test',
    description: 'Test!',
    args: false,
    guildOnly: true,
	async execute(client, message, args) {
        const inactivityTimes = new Keyv('sqlite://db.sqlite', { namespace: 'inactivityTimes' });
        inactivityTimes.on('error', err => console.error('Keyv connection error:', err));
        const time = await inactivityTimes.get(message.guild.id);
        message.guild.members.fetch()
        .then(fetchedMembers => {
            const inactive = fetchedMembers.filter(member => {
                if (member.user.bot) {
                    return false;
                }
                if (member.lastMessage == null) {
                    return true;
                }
                console.log(Date.now() - member.lastMessage.createdTimestamp);
                return member.lastMessage.createdTimestamp <= Date.now() - time;
            });
            message.channel.send(inactive.map(member => member.user.username));
        })

        .catch(console.error);
	},
};