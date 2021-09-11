module.exports = {
    name: 'leave',
    desc: 'Leaves the current Voice Chat.',
    category: 'Fun',
    options: [],
    async execute(action, options, client) {
        if(action.member.voice.channel) {
            if(client.voice.connections.array().length > 0) {
                client.voice.connections.each(connection => {
                    connection.disconnect()
                    action.reply('🆗 Left voice channel.', {ephemeral:true})
                })
            }
        }
    }
}