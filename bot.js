const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');

const kick = (message) => {
	const user = message.mentions.users.first();
	if (user) {
		const member = message.guild.member(user);
		if (member) {
			member
				.kick('Optional reason that will display in the audit logs')
				.then(() => {
					message.reply(`Successfully kicked ${user.tag}`);
				})
				.catch((err) => {
					message.reply('I was unable to kick the member');
					console.error(err);
				});
		}
		else {
			message.reply('That user isn\'t in this guild!');
		}
	}
	else {
		message.reply('You didn\'t mention the user to kick!');
	}
};

const ban = (message) => {
	const user = message.mentions.users.first();
	if (user) {
		const member = message.guild.member(user);
		if (member) {
			member
				.ban({
					reason: 'They were bad!',
				})
				.then(() => {
					message.reply(`Successfully banned ${user.tag}`);
				})
				.catch((err) => {
					message.reply('I was unable to ban the member');
					console.error(err);
				});
		}
		else {
			message.reply('That user isn\'t in this guild!');
		}
	}
	else {
		message.reply('You didn\'t mention the user to ban!');
	}
};

const waitForMember = (message) =>{
	return new Promise(resolve => {
		resolve(message.member.voice.channel.join());
	});
};

async function play(message) {
    console.log(message.content);
	if (message.member.voice.channel) {
		const connection = await waitForMember(message);
		connection.play(
			ytdl(message.content.split(' ')[1], { filter: 'audioonly' }),
		);
	}
	else {
		message.reply('You need to join a voice channel first!');
	}
}

const executeCommand = (message) => {
	if (message.content.startsWith('!kick')) {
		kick(message);
	}
	else if (message.content.startsWith('!ban')) {
		ban(message);
	}
	else if (message.content.startsWith('/play')) {
		play(message);
	}
};

client.on('message', (message) => {
	if (!message.guild) return;
	executeCommand(message);
});

client.login('NzE4MDY4MDY5Mzg1MjQwNjU2.XtjfaA.8VPZUaNo8FAnhq4zbRGyVf_CUfk');
