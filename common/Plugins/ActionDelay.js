//
// Delays script operation.

import BasePlugin from './BasePlugin'

export default class ActionDelay extends BasePlugin {

    /** Plugin ID */
    static get pluginID() { return "com.jjv360.actions.Delay" }

    /** Plugin name */
    static get pluginName() { return "Delay script execution" }

    /** Plugin type */
    static get pluginType() { return "action" }

    /** Plugin icon */
    static get pluginIcon() { return "snooze" }

    /** Configurable fields */
    static get fields() { return [
        { id: "duration", name: "Duration (seconds)" }
    ]}

    /** Called in High Fidelity when this action is triggered. Return a Promise. */
    onTrigger() {

        // Return promise
        return new Promise((onSuccess, onFail) => {

            // Set timeout
            var duration = parseFloat(this.option("duration")) || 0
            Script.setTimeout(onSuccess, duration * 1000)

        })

    }

}
