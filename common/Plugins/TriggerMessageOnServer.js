//
// Triggers a script when a broadcast message is received on the server

import BasePlugin from './BasePlugin'

export default class TriggerMessageOnServer extends BasePlugin {

    /** Plugin ID */
    static get pluginID() { return "com.jjv360.triggers.MessageOnServer" }

    /** Plugin name */
    static get pluginName() { return "When the server entity script receives a message" }

    /** Plugin type */
    static get pluginType() { return "trigger" }

    /** Plugin icon */
    static get pluginIcon() { return "message" }

    /** HF event: On load */
    preload(id) {

        // Only on server
        if (!Script.isEntityServerScript())
            return

        // Add listener
        this.onMsg = this.onMsg.bind(this)
        Messages.subscribe("com.hf-scripter")
        Messages.messageReceived.connect(this.onMsg)

    }

    /** HF event: On unload */
    unload(id) {

        // Only on server
        if (!Script.isEntityServerScript())
            return

        // Remove listener
        Messages.messageReceived.disconnect(this.onMsg)

    }

    /** Called when a new message is received */
    onMsg(channel, msg, sender, localOnly) {

        // Decode message
        msg = JSON.parse(msg)

        // Fire trigger
        this.triggerCallback(msg.action)

    }

}
