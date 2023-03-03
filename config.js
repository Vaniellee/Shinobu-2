module.exports = {
        TOKEN: 'MTAzMTIwMTEzMDgwMzM2ODA2Ng.GQgth7.0efc0UYl1HUVH1M6hR0c7jcXUE1bJzB_NXrSgY', //seu token aqui
        px: '-',
        playing: '🚀 Sponsor: RasByte.net',
        BotClientID: '1031201130803368066',

    opt: {
        DJ: {
            enabled: false, //se for usar o cargo de DJ meter um true aq.
            roleName: 'DJ', //nome do cargo de DJ
            commands: ['back', 'clear', 'fltre', 'loop', 'pause', 'resume', 'skip', 'stop', 'volume'] //não mexa sem saber o que está fazendo
        },
        maxVol: 250, //Volume máximo.
        loopMessage: false, //não mexa sem saber o que está fazendo
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio', //não mexa sem saber o que está fazendo
                highWaterMark: 1 << 25 //não mexa sem saber o que está fazendo
            }
        }
    }
};
