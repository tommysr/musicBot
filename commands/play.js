const ytdl = require('ytdl-core');

// const waitForMember = (message) => {
// 	return new Promise((resolve) => {
// 		resolve(message.member.voice.channel.join());
// 	});
// };

async function play(message, songs) {
	if (message.member.voice.channel) {
		const channel = message.member.voice.channel;
		channel.join().then(connection =>{
			const stream = ytdl(songs[0], { filter: 'audioonly' });
			const dispatcher = connection.play(stream);

			dispatcher.on('end', () => channel.leave());
		});
	}
	else {
		message.reply('You need to join a voice channel first!');
	}
}

module.exports = {
	name: 'play',
	description: 'Play',
	args: true,
	usage: '<youtube link>',
	execute(message, song) {
		play(message, song);
	},
};

