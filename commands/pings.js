module.exports = {
	name: 'ping',
    description: 'Ping!',
    args: false,
	execute(client, message, args) {
		message.channel.send('Pong.');
	},
};