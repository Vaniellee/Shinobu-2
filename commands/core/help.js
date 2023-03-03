const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['h'],
    showHelp: false,
    utilisation: '{prefix}help',

    execute(client, message, args) {
        const embed = new MessageEmbed();

        embed.setColor('PURPLE');
        embed.setTitle(client.user.username);
        embed.setThumbnail(client.user.displayAvatarURL())
        const commands = client.commands.filter(x => x.showHelp !== false);

        embed.setDescription('Brand new advanced music bot that everyone will love :) ') ;
        embed.addField(` ${commands.size} There are available commands`, commands.map(x => `\`${x.name}${x.aliases[0] ? ` (${x.aliases.map(y => y).join(', ')})\`` : '\`'}`).join(' | '));

        embed.setTimestamp();
        embed.setFooter({text:'Shinobu help menu', iconURL:message.author.avatarURL({ dynamic: true })});
        embed.setImage("https://www.icegif.com/wp-content/uploads/2022/03/icegif-8.gif")
        message.reply({ embeds: [embed] });
    },
}; 
