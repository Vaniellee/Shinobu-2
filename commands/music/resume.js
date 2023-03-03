const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'resume',
    aliases: ['devam', 'continue'],
    utilisation: '{prefix}resume',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        const semMusica = new MessageEmbed()
            .setDescription(`${message.author}, no music is playing right now.`)
            .setColor('PURPLE')
            .setTimestamp(new Date())

        const eb1 = new MessageEmbed()
            .setDescription(success ? `**${queue.current.title}**,the current song was married. <:notes:1035237126364741733>` : `${message.author}, something went wrong. <:stop_button:1035237135189545090>`)
            .setColor('PURPLE')
            .setTimestamp(new Date())

        if (!queue) return message.reply({embeds: [semMusica]});

        const success = queue.setPaused(false);

        return message.reply({embeds: [eb1]});
    },
};