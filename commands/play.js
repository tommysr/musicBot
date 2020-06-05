const ytdl = require('ytdl-core');

function play(guild, song, queue) {

	const serverQueue = queue.get(guild.id);
	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}


	const dispatcher = serverQueue.connection
		.play(ytdl(song.url, { filter: 'audioonly' }))
		.on('end', () => {
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0], queue);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
	serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}


module.exports = {
	name: 'play',
	description: 'Play',
	args: true,
	queue: true,
	usage: '<youtube link>',
	execute: async function execute(message, args, queue) {
		if (message.member.voice.channel) {
			const channel = message.member.voice.channel;
			const serverQueue = queue.get(message.guild.id);
			const songInfo = await ytdl.getInfo(args[0]);
			const song = {
				title: songInfo.videoDetails.title,
				url: songInfo.videoDetails.video_url,
			};

			if (!serverQueue) {
				const queueContruct = {
					textChannel: message.channel,
					voiceChannel: channel,
					connection: null,
					songs: [],
					volume: 5,
					playing: true,
				};

				queue.set(message.guild.id, queueContruct);
				queueContruct.songs.push(song);

				try {
					const connection = await channel.join();
					queueContruct.connection = connection;
					play(message.guild, queueContruct.songs[0], queue);
				}
				catch (error) {
					console.log(error);
					queue.delete(message.guild.id);
					return message.channel.send(error);
				}
			}
			else {
				serverQueue.songs.push(song);
				console.log(serverQueue);
				return message.channel.send(`${song.title} has been added to the queue!`);
			}
		}
		else {
			message.reply('You need to join a voice channel first!');
		}
	},
};

