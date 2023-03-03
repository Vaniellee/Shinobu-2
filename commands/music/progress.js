const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'progress',
    aliases: ['time'],
    utilisation: '{prefix}progress',
    voiceChannel: true,

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        const semMusica = new MessageEmbed()
            .setDescription(`${message.author}, No music is currently playing.`)
            .setColor('PURPLE')
            .setTimestamp(new Date())
    
        const erro1 = new MessageEmbed()
            .setDescription(`${message.author}, does not play current media. Since it is live, it is not possible to show its duration.`)
            .setColor('PURPLE')
            .setTimestamp(new Date())
        
        if (!queue || !queue.playing) return message.reply({embeds: [semMusica]});

        const progress = queue.createProgressBar();
        const timestamp = queue.getPlayerTimestamp();

        if (timestamp.progress == 'forever') return message.reply({embeds: [erro1]});

        message.reply(`${progress} (**${timestamp.progress}**%)`);
    },
};