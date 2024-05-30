require('dotenv').config();
const { REST } = require('discord.js');
const CLIENT_ID = process.env.CLIENT_ID;
const TOKEN = process.env.TOKEN;

const rest = new REST({ version: '10' }).setToken(TOKEN);
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages ], partials: [Partials.Channel] });


let allowedChannels = [
    process.env.GENERAL,
    process.env.IRL,
    process.env.FILTHDEN,
    process.env.OTHERMEDIA,
    process.env.NOMIC
];

//let allowedChannels = [ process.env.YONKO, process.env.WARLORDS ];
let keywords = ['dattebayo', 'hokage', 'jutsu', 'believe it', 'naruto', 'sasuke', 'nindo', 'ninja', 'doton', 'だってばよ', 'konnoyaro', 'boruto', 'shinobi', 'sakura', 'chunin', 'ramen', 'bakayaro', '🥷']

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
   client.user.setPresence({activities: [{name: 'Believe it!'}], status: 'available'});
   
});

client.on('messageCreate', msg => {
    try {
        if (allowedChannels.includes(msg.channelId) ) {
            if (msg.author.bot) return;
            //if (msg.author.bot) return;

            // stickers get bypass
            if(msg.stickers.size == 1) return;

            // bypass media
            if (msg.content.includes('.png')) return;
            if (msg.content.includes('.jpg')) return;
            if (msg.content.includes('.jpeg')) return;
            if (msg.content.includes('.gif')) return;
            if (msg.content.includes('prnt.sc')) return;
            if (msg.attachments.size > 0) return;

            if (!keywords.some(word => msg.content.toLowerCase().includes(word))) {
                msg.delete({ timeout: 500 }).catch(error => {
                    console.log(error);
                    return;
                });
            }
        }
	} catch (error) {
		console.log(`SOMETHING WENT WRONG WITH A MESSAGE COMMAND: ${error}`);
		return;
	}
});

client.on('messageUpdate', (oldmsg, newmsg) => {
    try {
        if (allowedChannels.includes(newmsg.channelId) ) {
            if (newmsg.author.bot) return;
            //if (msg.author.bot) return;

            // stickers get bypass
            if(newmsg.stickers.size == 1) return;

            // bypass media
            if (newmsg.content.includes('.png')) return;
            if (newmsg.content.includes('.jpg')) return;
            if (newmsg.content.includes('.jpeg')) return;
            if (newmsg.content.includes('prnt.sc')) return;
            if (newmsg.attachments.size > 0) return;

            if (!keywords.some(word => newmsg.content.toLowerCase().includes(word) || newmsg.content.toLowerCase().includes('1244774016355537087'))) {
                newmsg.delete({ timeout: 500 }).catch(error => {
                    console.log(error);
                    return;
                });
            }
        }
	} catch (error) {
		console.log(`SOMETHING WENT WRONG WITH A MESSAGE COMMAND: ${error}`);
		return;
	}
});

client.on("error", () => {
    console.log('test')
    return;
})

client.login(process.env.TOKEN);