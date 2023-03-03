const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'filtre',
    aliases: ['filtre'],
    utilisation: '{prefix}filtre [filtre adı]',
    voiceChannel: true,

    async execute(client, message, args) {
        const queue = client.player.getQueue(message.guild.id);

    const semMusica = new MessageEmbed()
        .setDescription(`${message.author}, No music is currently playing.`)
        .setColor('PURPLE')
        .setTimestamp(new Date())

    const semArgs = new MessageEmbed()
        .setDescription(`${message.author}, enter a valid name for the filter...
        
        **MEVCUT FİLTRELER:**
        
        ➡️ \`'bassbost' - increase the bass of the music\` 
        ➡️ \`'8D' - adjust the audio channels to make the music 8D\`
        ➡️ \`'nightcore' - Increases pitch and speed at play\`

        **HOW TO USE:**

        \`-filtre <filtre adı> - The same will apply to the currently running song.\`
        
        `)
        .setColor('PURPLE') 
        .setTimestamp(new Date())

   if (!queue || !queue.playing) return message.channel.send({embeds: [semMusica]});

        const actualFilter = queue.getFiltersEnabled()[0];

        if (!args[0]) return message.reply({embeds: [semArgs]});

        const filters = [];
        queue.getFiltersEnabled().map(x => filters.push(x));
        queue.getFiltersDisabled().map(x => filters.push(x));

        const filter = filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

        if (!filter) return message.reply({embeds: [semArgs]});

        const filtersUpdated = {};

        filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true;

        await queue.setFilters(filtersUpdated);

        const applied = new MessageEmbed()
            .setDescription(`The filter was applied successfully for this sequence/song. <:thumbsup:1035237136787591289>
            
            Filtro aplicado: **${filter}**
            Status: **${queue.getFiltersEnabled().includes(filter) ? 'active' : 'inactive'}**
            
            \`filter, adapts to the length of the song and/or applies to all songs in the queue.\`
            `)
            .setColor('PURPLE')
            .setTimestamp(new Date())
            
        message.reply({embeds: [applied]});
    },
};