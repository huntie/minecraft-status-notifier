# Minecraft server status notifier

A small Node.js utility to listen to [Supervisord](http://supervisord.org/) events and publish status messages to a webhook receiver such as [Discord](https://discordapp.com/), [Telegram](https://telegram.org/) or [Slack](https://slack.com/).

## Usage

    npm install

Edit `.env` to specify a target webhook URL and Supervisor process group name to match.

Next, define a event listener in your Supervisor configuration (under `/etc/supervisor/conf.d/`). A subset of [event types](http://supervisord.org/events.html#event-types) can be matched.

    [eventlistener:minecraft_status]
    command=node app.js
    directory=/home/minecraft/minecraft-status-notifier
    user=minecraft
    events=PROCESS_STATE

Finally, load the updated configuration.

    supervisorctl update

To match additional event types and customise broadcasted messages, edit `config/messages.json`.

### Maintenance mode

Maintenance mode can be set from the package directory. When enabled, new event messages will be suppressed.

    npm run down

This creates a `MAINTENANCE_MODE` file which can be deleted manually, or is removed when maintenance mode is disabled.

    npm run up

## Sidenote

This implementation can easily be generalised for any Supervisor-managed process, however was created as a quick personal tool and serves for reference purposes.
