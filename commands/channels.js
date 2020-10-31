
module.exports = {
	name: 'channels',
    description: 'channels!',
    args: true,
    usage: '[list/add/remove] [#channels]',
    guildOnly: true,
	execute(client, message, args) {
        if(args[0] === 'list') {

        }
        else if(args[0] === 'add'){
            const channels = message.mentions.channels;
            const channel_ids = channels.map(c => c.id);
            message.channel.send(`You wanted to add: ${channels.map(c => c.toString())}`);
        }
        else if (args[0] === 'remove'){

        }
        else{

        }
	},
};