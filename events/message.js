module.exports = async (client, message) => {
    // It's good practice to ignore other bots. This also makes your bot ignore itself
    // and not get into a spam loop (we call that "botception").
    if (message.author.bot) return;
  
    // Also good practice to ignore any message that does not start with our prefix,
    // which is set in the configuration file.
    if (message.content.indexOf(client.config.prefix) !== 0) return;
  
    // Here we separate our "command" name, and our "arguments" for the command.
    // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
    // command = say
    // args = ["Is", "this", "the", "real", "life?"]
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
  
    // If the member on a guild is invisible or not cached, fetch them.
    if (message.guild && !message.member) await message.guild.members.fetch(message.author);

    if (!client.commands.has(commandName)) return;

    const cmd = client.commands.get(commandName);
  
    if (cmd.guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t execute that command inside DMs!');
    }   
  
    
    if (cmd.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
        if (cmd.usage) {
            reply += `\nThe proper usage would be: \`${config.prefix}${cmd.name} ${cmd.usage}\``;
        }
        return message.channel.send(reply);
    }

    try {
        cmd.execute(client, message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
  };