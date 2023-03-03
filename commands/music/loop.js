const { QueueRepeatMode } = require('discord-player');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'loop',
    aliases: ['lp'],
    utilisation: '{prefix}loop <queue>',
    voiceChannel: true,

    execute(client, message, args) {
        const queue = client.player.getQueue(message.guild.id);

const semMusica = new MessageEmbed()
    .setDescription(`${message.author}, No music is currently playing.`)
    .setColor('PURPLE')
    .setTimestamp(new Date())

const erro1 = new MessageEmbed()
    .setDescription(``)
    .setColor('PURPLE')
    .setTimestamp(new Date())
 
if (!queue || !queue.playing) return message.reply({embes: [semMusica]});

        //const si

        if (args.join('').toLowerCase() === 'queue') {
            if (queue.repeatMode === 1) return message.reply(`${message.author}, You must first disable the loop mode of the current music **(${client.config.px}loop)** <:stop_button:1035237135189545090>`);

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);

            return message.reply(success ? `Döngü Modu: **${queue.repeatMode === 0 ? 'inactive' : 'active'}**, The whole series will repeat endlessly :repeat:` : `${message.author}, Something went wrong. <:stop_button:1035237135189545090>`);
        } else {
            if (queue.repeatMode === 2) return message.reply(`${message.author}, In loop mode you must first disable the existing queue **(${client.config.px}loop queue)** <:stop_button:1035237135189545090>`);

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);

            return message.reply(success ? `Döngü Modu: **${queue.repeatMode === 0 ? 'inactive' : 'active'}**, Existing music will be repeated without interruption (all music in the list **${client.config.px}loop queue**  You can repeat with option.) :repeat:` : `${message.author}, something went wrong. <:stop_button:1035237135189545090>`);
};
    },
};