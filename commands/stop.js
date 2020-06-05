module.exports = {
	name: 'stop',
	description: 'Stop',
	args: false,
	queue: true,
	usage: '<youtube link>',
	execute(message, args, queue) {
		const serverQueue = queue.get(message.guild.id);
		if (!message.member.voice.channel) {
			return message.channel.send(
				'You have to be in a voice channel to stop the music!',
			);
		}
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end();
	},
};

