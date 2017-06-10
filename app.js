const supervisor = require('supervisord-eventlistener');
const fetch = require('node-fetch');
const WebhookPublisher = require('./utils/webhook-publisher');

require('dotenv').config();

const messages = require('./config/messages.json');

supervisor.on('event', (type, headers, data) => {
    const publisher = new WebhookPublisher(process.env.WEBHOOK_URL, process.env.SERVER_NAME);

    if (data.groupname === process.env.PROCESS_GROUP_NAME && Object.keys(messages).includes(type)) {
        publisher.postStatus(messages[type])
            .catch(console.error);
    }
});

supervisor.listen(process.stdin, process.stdout);
