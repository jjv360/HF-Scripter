//
// Edits an entity property

import BasePlugin from './BasePlugin'

export default class ActionEditEntity extends BasePlugin {

    /** Plugin ID */
    static get pluginID() { return "com.jjv360.actions.SendMessage" }

    /** Plugin name */
    static get pluginName() { return "Send broadcast message" }

    /** Plugin type */
    static get pluginType() { return "action" }

    /** Plugin icon */
    static get pluginIcon() { return "message" }

    /** Configurable fields */
    static get fields() { return [
        { id: "actionID", name: "Action ID" }
    ]}

    /** Called in High Fidelity when this action is triggered. Return a Promise. */
    onTrigger() {

        // Edit entity
        var action = this.option("actionID")
        print(`[HF Scripter] Sending broadcast message: Channel = com.hf-scripter, action = ${action}`)
        Messages.sendMessage("com.hf-scripter", JSON.stringify({ action }), false)

    }

}
