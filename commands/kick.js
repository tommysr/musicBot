module.exports = {
	name: 'kick',
	description: 'Kick',
	args: true,
	usage: '<user> <reason>',
	execute(message, reason) {
		const user = message.mentions.users.first();
		if (user) {
			const member = message.guild.member(user);
			if (member) {
				member
					.kick({
						reason: toString(reason[0]),
					})
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
	},
};