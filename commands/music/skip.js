const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'skip',
    aliases: ['s', 'geç'],
    utilisation: '{prefix}skip',
    voiceChannel: true,

    execute(client, message) {

        const semMsc = new MessageEmbed()
            .setDescription(`${message.author}, No music is currently playing.`)
            .setColor('PURPLE')
            .setTimestamp(new Date())

        const queue = client.player.getQueue(message.guild.id);
 
        if (!queue || !queue.playing) return message.reply({embeds: [semMsc]});

        const success = queue.skip();

        const skipou = new MessageEmbed()
        .setDescription(success ? `to music: **${queue.current.title}**, successfully skipped. <:thumbsup:1035237136787591289>` : `${message.author}, gone bad`)
        .setColor('PURPLE')
        .setTimestamp(new Date())

        return message.reply({embeds: [skipou]});
    },
};