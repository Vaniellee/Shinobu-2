const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'back',
    aliases: ['geri'],
    utilisation: '{prefix}back',
    voiceChannel: true,

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        const semMusica = new MessageEmbed()
        .setDescription(`${message.author}, No music is currently playing.`)
        .setColor('PURPLE')
        .setTimestamp(new Date())

        const cannotBack = new MessageEmbed()
        .setDescription(`${message.author}, Could not revert to the previous song as there is no previous song currently playing.`)
        .setColor('PURPLE')
        .setTimestamp(new Date())

        const anterior = new MessageEmbed()
        .setDescription(`The previous song is playing...`)
        .setColor('PURPLE')
        .setTimestamp(new Date())

        if (!queue || !queue.playing) return message.reply({embeds: [semMusica]});

        if (!queue.previousTracks[1]) return message.reply({embeds: [cannotBack]});

        await queue.back();

        message.reply({embeds: [anterior]});
    },
};