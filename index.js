require('dotenv').config();
const { REST } = require('discord.js');
const CLIENT_ID = process.env.CLIENT_ID;
const TOKEN = process.env.TOKEN;

const rest = new REST({ version: '10' }).setToken(TOKEN);
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages ], partials: [Partials.Channel] });


/*let allowedChannels = [
    process.env.GENERAL,
    process.env.IRL,
    process.env.FILTHDEN,
    process.env.OTHERMEDIA,
    process.env.NOMIC
];*/

let allowedChannels = [ process.env.YONKO, process.env.WARLORDS ];
let keywords = ['dattebayo', 'hokage', 'jutsu', 'believe it', 'naruto', 'sasuke', 'nindo']

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
   client.user.setPresence({activities: [{name: 'Believe it!'}], status: 'available'});
   
});

client.on('messageCreate', msg => {
    try {
        if (allowedChannels.includes(msg.channelId) ) {
            if (msg.author.bot || msg.member.roles.cache.has(process.env.ADMIN_FM)) return;
            //if (msg.author.bot) return;

            // stickers get bypass
            if(msg.stickers.size == 1) return;

            // bypass media
            if (msg.content.includes('.png')) return;
            if (msg.content.includes('.jpg')) return;
            if (msg.content.includes('.jpeg')) return;
            if (msg.content.includes('prnt.sc')) return;
            if (msg.attachments.size > 0) return;

            if (!keywords.some(word => msg.content.includes(word))) {
                msg.delete({ timeout: 500 });
            }
        }
	} catch (error) {
		console.log(`SOMETHING WENT WRONG WITH A MESSAGE COMMAND: ${error}`);
		return;
	}
});

client.login(process.env.TOKEN);