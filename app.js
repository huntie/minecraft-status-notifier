const fs = require('fs');
const supervisor = require('supervisord-eventlistener');
const WebhookPublisher = require('./utils/webhook-publisher');

require('dotenv').config();

const messages = require('./config/messages.json');

supervisor.on('event', (type, headers, data) => {
    const publisher = new WebhookPublisher(process.env.WEBHOOK_URL, process.env.SERVER_NAME);

    if (fs.existsSync('MAINTENANCE_MODE')) {
        let downState = JSON.parse(fs.readFileSync('MAINTENANCE_MODE', 'utf-8'));

        if (!('notified' in downState)) {
            downState.notified = true;
            publisher.postStatus('Server is down for maintenance')
                .catch(console.error)
                .then(fs.writeFileSync('MAINTENANCE_MODE', JSON.stringify(downState) + '\n', 'utf-8'));
        }
    } else if (data.groupname === process.env.PROCESS_GROUP_NAME && Object.keys(messages).includes(type)) {
        publisher.postStatus(messages[type])
            .catch(console.error);
    }
});

supervisor.listen(process.stdin, process.stdout);
