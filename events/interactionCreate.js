  module.exports = (client, int) => {
    if (!int.isButton()) return;

    const queue = client.player.getQueue(int.guildId);

    switch (int.customId) {
        case 'saveTrack': {
          if (!queue || !queue.playing) return int.reply({ content: `No music currently playing. <:stop_button:1035237135189545090>`, ephemeral: true, components: [] });

            int.member.send(`**save the music: \`${queue.current.title}\` | send by \`${queue.current.author}\`, registered server: \`${int.member.guild.name}\` :thumbsup:**`).then(() => {
                return int.reply({ content: `I sent the name of this song to your DM. <:thumbsup:1035237136787591289>`, ephemeral: true, components: [] });
            }).catch(error => {
                return int.reply({ content: `I can't send a message to your DM, activate it damn it... <:stop_button:1035237135189545090>`, ephemeral: true, components: [] });
            });
        }
    }
};