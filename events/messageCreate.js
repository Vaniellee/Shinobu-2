const { MessageEmbed } = require("discord.js");

module.exports = (client, message) => {
    if (message.author.bot || message.channel.type === 'DM') return;

    const prefix = client.config.px;

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    const DJ = client.config.opt.DJ;

    if (cmd && DJ.enabled && DJ.commands.includes(cmd.name)) {
        const roleDJ = message.guild.roles.cache.find(x => x.name === DJ.roleName);

        if (!message.member.roles.includes(roleDJ.id)) {
            return message.reply(`${message.author}, This command is only ${DJ.roleName} authorized persons can use. <:stop_button:1035237135189545090>`);
        }
    }

    const erro1 = new MessageEmbed()
        .setDescription(`${message.author}, you are not connected to any audio channel.`)
        .setColor('AQUA')
        .setTimestamp(new Date())

    const erro2 = new MessageEmbed()
        .setDescription(`${message.author}, We are on different channels...`)
        .setColor('AQUA')
        .setTimestamp(new Date())

    if (cmd && cmd.voiceChannel) {
        if (!message.member.voice.channel) return message.reply({embeds: [erro1]});
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({embeds: [erro2]});
    }

    if (cmd) cmd.execute(client, message, args);
};