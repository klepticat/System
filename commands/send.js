const Discord = require('discord.js')

module.exports = {
    name: 'send',
    desc: 'Sends a message.',
    category: 'Admin',
    options: [
        {
            type:'SUB_COMMAND',
            name:'button',
            description:'Sends a button with custom text.',
            options:[
                {
                    type:'CHANNEL',
                    name:'channel',
                    description:'Channel to send message in.',
                    required:true
                },
                {
                    type:'STRING',
                    name:'btntext',
                    description:'Text to go on the button.',
                    required:true
                },
                {
                    type:'STRING',
                    name:'msgtext',
                    description:'Text to go above the button.',
                    required:true
                }
            ]
        },
        {
            type:'SUB_COMMAND',
            name:'message',
            description:'Sends a message with custom text.',
            options:[
                {
                    type:'CHANNEL',
                    name:'channel',
                    description:'Channel to send message in.',
                    required:true
                },
                {
                    type:'STRING',
                    name:'msgtext',
                    description:'Text to send.',
                    required:true
                }
            ]
        },
        {
            type:'SUB_COMMAND',
            name:'chaos',
            description:'Sends a message with enciphered with chaocipher.',
            options:[
                {
                    type:'CHANNEL',
                    name:'channel',
                    description:'Channel to send message in.',
                    required:true
                },
                {
                    type:'STRING',
                    name:'msgtext',
                    description:'Text to send.',
                    required:true
                }
            ]
        }
    ],
    async execute(action, options, client) {
        // console.log(options.first())
        let secondaryOptions = options.first().options
        let channel = secondaryOptions.get('channel').channel
        if(!action.member.permissions.has('MANAGE_MESSAGES')) action.reply('You do not have the permissions to use this command.', {ephemeral:true});
        switch (options.first().name) {
            case 'button':
                const row = new Discord.MessageActionRow()
                const button = new Discord.MessageButton({
                    label: secondaryOptions.get('btntext').value,
                    style: 4,
                    customID: 0
                })

                row.addComponents(button)

                action.reply('🆗 Button Sent.', {ephemeral: true})
                channel.send(secondaryOptions.get('msgtext').value, {components: [row]})
                break;
            case 'message':
                channel.send(secondaryOptions.get('msgtext').value)
                action.reply('🆗 Message Sent.', {ephemeral:true})
                break;
            case 'chaos':
                let message = secondaryOptions.get('msgtext').value
                let messageArray = message.split('')
                let finalMessage = ''

                let pt = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
                let ct = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

                for(i in messageArray) {
                    let ptIndex = pt.indexOf(messageArray[i])
                    let ctIndex = ct.indexOf(messageArray[i])

                    // console.log(pt.indexOf(messageArray[i]))

                    if(pt.indexOf(messageArray[i]) == -1) {finalMessage += messageArray[i]} 
                    else {
                        finalMessage += ct[ptIndex]

                        // console.log('Letters:')
                        // console.log(messageArray[i])
                        // console.log(ct[ptIndex])

                        //shift pt to letter
                        let ptB = pt
                        ptB = ptB.slice(0,ptIndex)
                        pt = pt.concat(ptB)
                        pt = pt.slice(ptIndex)
                        // console.log('PT 1:')
                        // console.log(pt)

                        //shift ct to letter
                        let ctB = ct
                        ctB = ctB.slice(0,ptIndex)
                        ct = ct.concat(ctB)
                        ct = ct.slice(ptIndex)
                        // console.log('CT 1:')
                        // console.log(ct)

                        ct.splice(14,0,ct[1])
                        ct.splice(1,1)
                        // console.log('CT 2:')
                        // console.log(ct)

                        ptB = pt
                        ptB = ptB.slice(0,1)
                        pt = pt.concat(ptB)
                        pt = pt.slice(1)
                        // console.log('PT 2:')
                        // console.log(pt)

                        pt.splice(14,0,pt[2])
                        pt.splice(2,1)
                        // console.log('PT 3:')
                        // console.log(pt)
                    }
                }

                channel.send(finalMessage.toUpperCase())
                action.reply('🆗 Sent!', {ephemeral: true})
                break;
        }
    }
};