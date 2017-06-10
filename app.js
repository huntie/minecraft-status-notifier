const supervisor = require('supervisord-eventlistener');
const fetch = require('node-fetch');

require('dotenv').config();

const messages = require('./config/messages.json');

supervisor.on('event', (type, headers, data) => {
    if (data.groupname === process.env.PROCESS_GROUP_NAME && Object.keys(messages).includes(type)) {
        fetch(process.env.WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: `[${process.env.SERVER_NAME}] ${messages[type]}`
            })
        })
        .catch(console.error);
    }
});

supervisor.listen(process.stdin, process.stdout);
