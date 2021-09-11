const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client({
    intents: new Discord.Intents(65535)
});
var clientapp
var gcommands
var commands
var config = require('./config.json');

client.commands = new Discord.Collection();

var smileCount = 0;

client.once('ready', () => {
    client.guilds.fetch()
    clientapp = client.application
    gcommands = client.application.commands
    commands = client.guilds.cache.get('530269802405822484').commands
    gcommands.set([])
    commands.set([])
    console.log(`${client.user.username} is now online!`)
    loadCommands()
})

client.on('message', (msg) => {
    if(msg.author.bot == true) return;
    if(msg.content == ':)') {
        smileCount++
        if(smileCount >= 2) {
            msg.channel.send(':)')
            smileCount = 0
        }
    } else smileCount = 0;
})

client.on('interaction', (action) => {
    if(action.isMessageComponent()) {
        console.log(`${action.user.username} clicked a button hehe`)
    }
    if(action.isCommand()) {
        try {
            client.commands.get(action.commandName).execute(action, action.options, client)
        } catch (e) {
            console.error(e)
        }
    }
})

function loadCommands() {
    const cmdFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
    for(const file of cmdFiles) {
        console.log(`${file} loaded!`)
        const command = require(`./commands/${file}`)
        client.commands.set(command.name, command)

        commands.fetch()
        .then(cmds => {
            let cmdNames = []
            let cmdIds = []
            cmds.each(cmd => {
                cmdNames.push(cmd.name)
                cmdIds.push(cmd.id)
            })
            // console.log(cmdNames)
            // console.log(cmdIds)
            // console.log(commands.fetch(cmdIds[cmdNames.indexOf(command.name)]))
            if(cmdNames.indexOf(command.name) >= 0) {
                commands.edit(
                    cmdIds[cmdNames.indexOf(command.name)],
                    {
                        name: command.name,
                        description: command.desc,
                        options: command.options
                    }
                )
            } else {
                commands.create({
                    name: command.name,
                    description: command.desc,
                    options: command.options
                })
            }
        })
    }
}

client.login(config.global.token)