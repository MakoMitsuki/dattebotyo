require('dotenv').config();
const { REST } = require('discord.js');
const CLIENT_ID = process.env.CLIENT_ID;
const TOKEN = process.env.TOKEN;

const rest = new REST({ version: '10' }).setToken(TOKEN);
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages ], partials: [Partials.Channel] });


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
   client.user.setPresence({activities: [{name: 'Believe it!'}], status: 'available'});
   
});

client.on('messageCreate', msg => {
    console.log('msg here');
    try {
		if (msg.author.bot) return;

        if (!msg.content.includes("dattebayo")) {
            msg.delete({ timeout: 500 });
        }

		console.log('also msg here')
	} catch (error) {
		console.log(`SOMETHING WENT WRONG WITH A MESSAGE COMMAND: ${error}`);
		return;
	}
});

client.login(process.env.TOKEN);