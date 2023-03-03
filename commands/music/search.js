const { MessageEmbed } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'search',
    aliases: ['ara'],
    utilisation: '{prefix}search [müzik ismi]',
    voiceChannel: true,

    async execute(client, message, args) {
      
if (!args[0]) return message.channel.send(`${message.author}, Please enter a valid name. :face_with_monocle:`);

        const res = await client.player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        const semMusica = new MessageEmbed()
        .setDescription(`${message.author}, no music is playing right now.`)
        .setColor('PURPLE')

        if (!res || !res.tracks.length) return message.channel.send({embeds: [semMusica]});

        const queue = await client.player.createQueue(message.guild, {
            metadata: message.channel
        });

        const embed = new MessageEmbed();

        embed.setColor('PURPLE');
        embed.setTitle(`Aranan Müzik: ${args.join(' ')}`);

        const maxTracks = res.tracks.slice(0, 10);

        embed.setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\n choose music **1** e.g **${maxTracks.length}** or type **cancel** deselect.⬇️`);

        embed.setTimestamp();

        message.channel.send({ embeds: [embed] });

        const collector = message.channel.createMessageCollector({
            time: 15000,
            errors: ['time'],
            filter: m => m.author.id === message.author.id
        });

       collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'cancelar') return message.reply(`This operation has been successfully canceled <:thumbsup:1035237136787591289>`) && collector.stop();

            const value = parseInt(query.content);

            if (!value || value <= 0 || value > maxTracks.length) return message.reply(`Error: choose a song from **1** e.g **${maxTracks.length}** or type **cancel** to cancel the selection <:stop_button:1035237135189545090>`);

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(message.member.voice.channel);
            } catch {
                await client.player.deleteQueue(message.guild.id);
                return message.reply(`${message.author}, I can't join the audio channel. <:stop_button:1035237135189545090>`);
            }

            await message.reply(`Your music is loading... <:notes:1035237126364741733>`);

            queue.addTrack(res.tracks[Number(query.content)-1]);
            if (!queue.playing) await queue.play();
           
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time') return message.reply(`${message.author}, call has expired. <:stop_button:1035237135189545090>`);
        });
    },
};