module.exports = {
    name: 'ping',
    desc: 'Pings the System',
    category: 'Fun',
    options: [],
    async execute(action, options, client) {
        action.reply('🆗 System Online.', {ephemeral: true})
        action.followUp('💭 Thinking...', {ephemeral: true}).then (async (msgB) => {
            msgB.edit(`📡 Latency is ${msgB.createdTimestamp - msg.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)
        })
    }
}