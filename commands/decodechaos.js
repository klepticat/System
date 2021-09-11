module.exports = {
    name: 'decodechaos',
    desc: 'Decodes Caocipher text..',
    category: 'Admin',
    options: [
        {
            type: 'STRING',
            name: 'message',
            description: 'Message to decode.',
            required: true
        }
    ],
    async execute(action, options, client) {
        if(!action.member.permissions.has('MANAGE_MESSAGES')) return;
        let message = options.get('message').value.toLowerCase()
        let messageArray = message.split('')
        let finalMessage = ''

        let pt = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
        let ct = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

        for(i in messageArray) {
            let ptIndex = pt.indexOf(messageArray[i])
            let ctIndex = ct.indexOf(messageArray[i])

            // console.log('-------')
            // console.log('PT Index: ' + ptIndex)
            // console.log('PT Alphabet: ' + pt.join(''))
            // console.log('CT Index: ' + ctIndex)
            // console.log('CT Alphabet: ' + ct.join(''))

            if(ct.indexOf(messageArray[i]) == -1) {finalMessage += messageArray[i]} 
            else {
                finalMessage += pt[ctIndex]
                // console.log(`${ct[ctIndex]} <-> ${pt[ctIndex]}`)

                //shift pt to letter
                let ptB = pt
                ptB = ptB.slice(0,ctIndex)
                pt = pt.concat(ptB)
                pt = pt.slice(ctIndex)

                //shift ct to letter
                let ctB = ct
                ctB = ctB.slice(0,ctIndex)
                ct = ct.concat(ctB)
                ct = ct.slice(ctIndex)

                ct.splice(14,0,ct[1])
                ct.splice(1,1)

                ptB = pt
                ptB = ptB.slice(0,1)
                pt = pt.concat(ptB)
                pt = pt.slice(1)

                pt.splice(14,0,pt[2])
                pt.splice(2,1)
            }
        }

        action.reply(finalMessage.toUpperCase(), {ephemeral: true})
    }
}