const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'pause',
    aliases: ['pausar'],
    utilisation: '{prefix}pause',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        const eb1 = new MessageEmbed()
            .setDescription(`${message.author}, No music is currently playing.`)
            .setColor('PURPLE')
            .setTimestamp(new Date())

        const eb2 = new MessageEmbed()
            .setDescription(success ? `current song: **${queue.current.title}** successfully paused. <:arrow_forward:1035237099839954954>` : `${message.author}, something went wrong. <:stop_button:1035237135189545090>`)
            .setColor('PURPLE')
            .setTimestamp(new Date())

       if (!queue || !queue.playing) return message.reply({embeds: [eb1]});

        const success = queue.setPaused(true);

        return message.reply({embeds: [eb2]});
    },
};