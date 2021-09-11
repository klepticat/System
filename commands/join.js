module.exports = {
    name: 'join',
    desc: 'Joins the current Voice Chat.',
    category: 'Fun',
    options: [],
    async execute(action, options, client) {
        if(action.member.voice.channel) {
            const connection = await action.member.voice.channel.join();
            action.reply('🆗 Joined voice channel.', {ephemeral: true})
        }
    }
}