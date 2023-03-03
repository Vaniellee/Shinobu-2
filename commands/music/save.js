const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'save',
    aliases: ['kaydet'],
    utilisation: '{prefix}save',
    voiceChannel: true,

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

    const semMusica = new MessageEmbed()
        .setDescription(`${message.author}, No music is currently playing.`)
        .setColor("#00ffff")
        .setTimestamp()
message.reply({embeds: [semMusica]})

  if (!queue || !queue.playing) return message.reply({embeds: [semMusica]});

        message.author.send(`Music you recorded: **${queue.current.title}** | ${queue.current.author}, Sunucu: **${message.guild.name}** :thumbsup:`) .then(() => {
            message.reply(`I sent the name of the song via DM. <:thumbsup:1035237136787591289>`);
        }).catch(error => {
            message.reply(`${message.author}, Can you enable private messages? :face_with_raised_eyebrow:`);
        });
    },
};