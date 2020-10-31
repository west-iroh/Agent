module.exports = (client) => {

    const Enmap = require('enmap');

    const defaultSettings = {
        "logChannel": null,
        "modRoles": null,
        "monitoredChannels": null,
        "monitoredRoles": null
    };

    client.settings = new Enmap({name: "settings"});
    
      // getSettings merges the client defaults with the guild settings. guild settings in
      // enmap should only have *unique* overrides that are different from defaults.
    client.getSettings = (guild) => {
        client.settings.ensure("default", defaultSettings);
        if(!guild) return client.settings.get("default");
        const guildConf = client.settings.get(guild.id) || {};
        // This "..." thing is the "Spread Operator". It's awesome!
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        return ({...client.settings.get("default"), ...guildConf});
    };
};