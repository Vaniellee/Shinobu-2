const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'sponsor',
    showHelp: false,
    utilisation: '{prefix}sponsor',

    execute(client, message, args) {
        const embed = new MessageEmbed();

        embed.setColor('PURPLE');
        embed.setTitle("RasByte - En iyi Almanya lokasyon sunucu sağlayıcısı!");
        const commands = client.commands.filter(x => x.showHelp !== false);

        embed.setDescription("Hey! Sende RasByte'a katılarak ücretsiz olarak **Discord Bot**, **Website** Projelerinizi 7/24 aktif halde tutabilirsiniz. RasByte 2 Yıldır hizmet vermektedir ve sunucuları Almanya lokasyonda yerleşiyor. Zaman kaybetme [bize katıl](https://discord.rasbyte.net)!") ;
        embed.setTimestamp();
        embed.setFooter("Shinobu RasByte'ın yüksek performanslı sunucularında yer alıyor!");
        embed.setImage("https://client.rasbyte.net/storage/icon.png")
        message.reply({ embeds: [embed] });
    },
}; 
