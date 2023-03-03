const { time } = require('console');
const { channel } = require('diagnostics_channel');
const { Player } = require('discord-player');
const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const fs = require('fs');
const config = require("./config.js")


let client = new Client({
    intents: [
    ],
    disableMentions: 'everyone',
});

client.config = require('./config');
client.player = new Player(client, client.config.opt.discordPlayer);
client.commands = new Collection();
const player = client.player

const events = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));
for (const file of events) {
    const event = require(`./events/${file}`);
    console.log(`-> Loaded event ${file.split('.')[0]}`);
    client.on(file.split('.')[0], event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
};
console.log(`-> Loaded commands...`);
fs.readdirSync('./commands/').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));
    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`${command.name.toLowerCase()} Load Command!`);
        client.commands.set(command.name.toLowerCase(), command);
        delete require.cache[require.resolve(`./commands/${dirs}/${file}`)];
    };
});

client.on('message', message=>{
    if (message.author.bot) return;
    if (message.author == "285547573991833600"){
        const eb = new MessageEmbed()
            .setDescription(`Bir enayi sohbette konuşmaya çalıştı ama yasaklandı hihihihihi
            
            Otário: ${message.author}
            ID do otário: **${message.author.id}**
            Canal: **${message.channel}**

            Mensagem:

            \` ${message.content} \`
            
            `)
            .setTimestamp(new Date())
            .setColor('AQUA')

        const channel = client.channels.cache.find(channel => channel.id === '940742662892445716')
        channel.send({embeds: [eb]})
        message.delete()
    }

})

player.on('error', (queue, error) => {
    console.log(`Some problem with the queue => ${error.message}`);
});

player.on('connectionError', (queue, error) => {
    console.log(`I'm having trouble connecting => ${error.message}`);
});

player.on('trackStart', (queue, track) => {

    const trackStart = new MessageEmbed()
        .setColor('GREEN')
        .setTimestamp(new Date())
        .setDescription(`🎵 starting to play: **${track.title}** 
        
        Duração: **${track.duration}**
        
        `)
        

    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    queue.metadata.send({embeds: [trackStart]});
});

player.on('trackAdd', (queue, track) => {

    const trackAdd = new MessageEmbed()
        .setColor('BLUE')
        .setDescription(`To music: **${track.title}** has been added to the queue.`)
        .setTimestamp(new Date())
        
    queue.metadata.send({embeds: [trackAdd]});
});

player.on('botDisconnect', (queue) => {

    const botDisconnect = new MessageEmbed()

        .setColor('RED')
        .setDescription('Some motherfucker with nothing to do kicked me or moved me from the audio channel, stopping the music playing.')
        .setTimestamp(new Date())

    queue.metadata.send({embeds: [botDisconnect]});
});

player.on('channelEmpty', (queue) => {

    const channelEmpty = new MessageEmbed()
        .setColor('RED')
        .setDescription('Im leaving the voice channel because there are no fags listening to music at the moment.')
        .setTimestamp(new Date())

    queue.metadata.send({embeds: [channelEmpty]});
});

player.on('queueEnd', (queue) => {

    const queueEnd = new MessageEmbed()
        .setColor('GOLD')
        .setDescription('The song queue has come to an end.')
        .setTimestamp(new Date())

    queue.metadata.send({embeds: [queueEnd]});
});
//bot icin\\

//bot icin\\
client.on("guildCreate", async guild => {
 var exampleEmbed = { 
        color: 0x198754,
        title: ":tada: Sunucuya Eklendim!", 
        description:  `Sunucu adı: ${guild.name} 
Sunucu sahibi etiketi: <@${guild.ownerId}>
Üye Sayısı : ${guild.memberCount} `,
   thumbnail: {url: guild.iconURL({dynamic: true})},
           }; 
 client.channels.cache.get("1030544620070903858").send({ 
    embeds: [exampleEmbed] 
 } );
}); 
//bot icin\\
client.on("guildCreate", guild => {
let Covid = "1030544620070903858"
if (guild.memberCount <  10) { //kişi sınırı ayarlayabilirsiniz
guild.leave()
return client.channels.cache.get(Covid).send("Eklendigim swde 10 kişiden az kişi vardı bende kaçtım.")
};
});
//bot icin\\
client.on("guildDelete", async guild => {
 var exampleEmbed = { 
        color: "PURPLE",
        title: ":tada: Sunucudan Çıkarıldım!", 
        description:  `Sunucu adı: ${guild.name} 
Sunucu sahibi etiketi: <@${guild.ownerId}>
Üye Sayısı : ${guild.memberCount} `,
   thumbnail: {url: guild.iconURL({dynamic: true})},
           }; 
 client.channels.cache.get("1030544620070903858").send({ 
    embeds: [exampleEmbed] 
 } );
});
//bot icin\\
//slash icin
 const { REST } = require('@discordjs/rest');
  const { Routes } = require('discord-api-types/v9');  
  client.slashcommands = new Collection();
  var slashcommands = [];
  
  fs.readdirSync("./Slashcommands/").forEach((file) => {
    const command = require(`./Slashcommands/${file}`);
    client.slashcommands.set(command.data.name, command);
    slashcommands.push(command.data.toJSON());
  });
  
  const rest = new REST({ version: '9' }).setToken('MTAzMTIwMTEzMDgwMzM2ODA2Ng.GQgth7.0efc0UYl1HUVH1M6hR0c7jcXUE1bJzB_NXrSgY');
  (async () => {
    try {
      console.log('Shinobu Slash Komutlar yükleniyor.');
      await rest.put(
        Routes.applicationCommands(config.BotClientID),
        { body: slashcommands },
      );
      console.log('Shinobu Slash Komutlar yüklendi.');
    } catch (error) {
      console.error(error);
    }
  })();
  
  client.on('interactionCreate', (interaction) => {
    if (!interaction.isCommand()) return;
    const command = client.slashcommands.get(interaction.commandName);
    if (!command) return;
    try {
       command.execute(interaction, client);
    } catch (err) {
      if (err) console.error("Error: ", err);
    }
  });
//slash icin



client.login('MTAzMTIwMTEzMDgwMzM2ODA2Ng.GQgth7.0efc0UYl1HUVH1M6hR0c7jcXUE1bJzB_NXrSgY');