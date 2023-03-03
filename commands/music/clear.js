const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'clear',
    aliases: ['temizle'],
    utilisation: '{prefix}clear',
    voiceChannel: true,

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        const semMusica = new MessageEmbed()
        .setDescription(`${message.author}, No music is currently playing.`)
        .setColor('PURPLE')
        .setTimestamp(new Date())

        const semMusica2 = new MessageEmbed()
        .setDescription(`${message.author}, the game queue is empty so it is not possible to clear it.`)
        .setColor('PURPLE')
        .setTimestamp(new Date())

        const sucesso = new MessageEmbed()
        .setDescription(`:wastebasket: | The queue has been successfully cleared. <:thumbsup:1035237136787591289>`)
        .setColor('PURPLE')
        .setTimestamp(new Date())

        if (!queue || !queue.playing) return message.reply({embeds: [semMusica]});

        if (!queue.tracks[0]) return message.reply({embeds: [semMusica2]});

        await queue.clear();

        message.reply({embeds: [sucesso]});
    },
};