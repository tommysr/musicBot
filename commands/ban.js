module.exports = {
	name: 'ban',
	description: 'Ban',
	args: true,
	usage: '<user> <reason>',
	execute(message, reason) {
		const user = message.mentions.users.first();
		if (user) {
			const member = message.guild.member(user);
			if (member) {
				member
					.ban({
						reason: toString(reason[0]),
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
	},
};

