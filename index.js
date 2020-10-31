if (Number(process.version.slice(1).split(".")[0]) < 12) throw new Error("Node 12.0.0 or higher is required. Update Node on your system.");

const fs = require('fs');
const config = require('./config.json');
const Discord = require('discord.js');

require('dotenv').config();

const token = process.env.CLIENT_TOKEN;

const client = new Discord.Client({
    ws: {
      intents: config.intents
    }
  });

client.config = config;

// SETTINGS

require("./modules/settings.js")(client);

// COMMANDS

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

// EVENTS

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for(const file of eventFiles) {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);

    client.on(eventName, event.bind(null, client));
}

client.login(token);