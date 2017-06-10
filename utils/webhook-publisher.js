const fetch = require('node-fetch');

module.exports = class WebhookPublisher {
    /**
     * Create a new WebHookPublisher instance.
     *
     * @param {string} webhookUrl
     * @param {string} serverName
     */
    constructor(webhookUrl, serverName) {
        this.webhookUrl = webhookUrl;
        this.serverName = serverName;
    }

    /**
     * Send a formatted status message to the webhook receiver asynchronously.
     *
     * @param {String} text
     *
     * @return {Promise}
     */
    postStatus(text) {
        return fetch(this.webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: `[${this.serverName}] ${text}`
            })
        });
    }
};
