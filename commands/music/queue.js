const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'queue',
    aliases: ['q', 'döngü'],
    utilisation: '{prefix}queue',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);
        const semMusica = new MessageEmbed()
        .setDescription(`${message.author}, No music is currently playing.`)

        const semFila = new MessageEmbed()
        .setDescription(`${message.author}, There are no songs currently queued.`)
 
        if (!queue || !queue.playing) return message.reply({embeds: [semMusica]});

        if (!queue.tracks[0]) return message.reply({embeds: [semFila]});

        const embed = new MessageEmbed();
        const methods = [':loop:', ':repeat_one:'];

        embed.setColor('PURPLE');
        embed.setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }));
        embed.setTitle(`play queue - ${message.guild.name} ${methods[queue.repeatMode]}`);

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - **${track.title} | ${track.author}** (ordered by: <@${track. requestedBy.id}>)`);

        const songs = queue.tracks.length;
        const nextSongs = songs > 5 ? `e **${songs - 5}** other songs...` : `we have **${songs}** queued songs.`;

        embed.setDescription(`ringing now: \`${queue.current.title}\`\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs }`);

        embed.setTimestamp();

        message.reply({ embeds: [embed] });
    },
};