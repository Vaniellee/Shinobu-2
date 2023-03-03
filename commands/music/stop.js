const { QueryResolver } = require("discord-player");
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'stop',
    aliases: ['dur'],
    utilisation: '{prefix}stop',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        const semMusica = new MessageEmbed()
        .setDescription(`${message.author}, No music is currently playing.`)
        .setColor('PURPLE')
        .setTimestamp(new Date())

        if (!queue || !queue.playing) return message.reply({embeds: [semMusica]});
        message.reply(`disable media :headphones:`).then((sentMessage) => sentMessage.edit(`cleaning the queue <:thumbsup:1035237136787591289>`).then((sentMessage) => sentMessage.edit(`mute the sound :mute:`)).then((sentMessage) => sentMessage.edit(`Media disconnected and queue cleared, disconnected from audio channel <:stop_button:1035237135189545090>`)).then((sentMessage) => sentMessage.delete()))

        setTimeout(() => {
            queue.destroy();
          }, 2000);
    },
};
