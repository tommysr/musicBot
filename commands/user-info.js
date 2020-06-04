module.exports = {
	name: 'user-info',
	description: 'User-info',
	args: false,
	execute(message) {
		message.channel.send(
			`Your username: ${message.author.username}\nYour ID: ${message.author.id}`,
		);
	},
};