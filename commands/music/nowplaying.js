const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    utilisation: '{prefix}nowplaying',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);
 
 const semMusica = new MessageEmbed()
    .setDescription(`${message.author}, No music is currently playing.`)
    .setColor('PURPLE')
    .setTimestamp(new Date())

 if (!queue || !queue.playing) return message.reply({embeds: [semMusica]});

        const track = queue.current;

        const embed = new MessageEmbed();

        embed.setColor('PURPLE');
        embed.setThumbnail(track.thumbnail);
        embed.setTitle(track.title)

        const methods = ['disabled', 'track', 'queue'];

        const timestamp = queue.getPlayerTimestamp();
        const progress = queue.createProgressBar();

const trackDuration = timestamp.progress == 'forever' ? 'Infinite (Live)' : track.duration;

        embed.setDescription(`sound: **${queue.volume}%**
        to go forward: **${progress}**
        Loop: **${methods[queue.repeatMode]}**
        
        requested by: ${track.requestedBy}`);

        embed.setTimestamp();

        const saveButton = new MessageButton();

        saveButton.setLabel('save us');
        saveButton.setCustomId('saveTrack');
        saveButton.setStyle('SUCCESS');

        const row = new MessageActionRow().addComponents(saveButton);

        message.reply({ embeds: [embed], components: [row] });
    },
};