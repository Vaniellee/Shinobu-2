const { QueryType } = require('discord-player');
const { MessageEmbed, MessageActionRow, MessageSelectMenu, IntegrationApplication, EmbedBuilder } = require("discord.js");
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Play the song"),

    async execute(interaction, client) {

        const eb1 = new MessageEmbed()
            .setDescription(`${message.author}, <:loud_sound:1035237122208174123> You have to be in a voice channel to use this command.`)
            .setColor('PURPLE')
            .setTimestamp(new Date())

        if (!args[0]) return message.channel.send({ embeds: [eb1] });

        const res = await client.player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        const semresultado = new MessageEmbed()
            .setDescription(`${message.author}, no results found, try using the search command.`)
            .setColor('PURPLE')
            .setTimestamp(new Date())

        const erro = new MessageEmbed()
            .setDescription(`${message.author}, I can't join this audio channel, let's see if Frankie manages to configure permissions...`)
            .setColor('PURPLE')
            .setTimestamp(new Date())

        const carregando = new MessageEmbed()
            .setDescription(`${res.playlist ? 'Your playlist' : 'your music'} loading... <:minidisc:1035237124661841980>`)
            .setColor('PURPLE')
            .setTimestamp(new Date())

        if (!res || !res.tracks.length) return message.reply({ embeds: [semresultado] });

        const queue = await client.player.createQueue(message.guild, {
            metadata: message.channel
        });

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            await client.player.deleteQueue(message.guild.id);
            return message.reply({ embeds: [erro] });
        }

        await message.reply({ embeds: [carregando] });

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();
    },
};