//
// Logs text to the console.

import BasePlugin from './BasePlugin'

export default class ActionLog extends BasePlugin {

    /** Plugin ID */
    static get pluginID() { return "com.jjv360.actions.Log" }

    /** Plugin name */
    static get pluginName() { return "Log to console" }

    /** Plugin type */
    static get pluginType() { return "action" }

    /** Plugin icon */
    static get pluginIcon() { return "short_text" }

    /** Configurable fields */
    static get fields() { return [
        { id: "text", name: "Text" }
    ]}

    /** Called in High Fidelity when this action is triggered. Return a Promise. */
    onTrigger() {

        // Output to console
        print(this.option("text"))

    }

}
