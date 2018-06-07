//
// Stops execution if the value doesn't match

import BasePlugin from './BasePlugin'

export default class ActionIf extends BasePlugin {

    /** Plugin ID */
    static get pluginID() { return "com.jjv360.actions.If" }

    /** Plugin name */
    static get pluginName() { return "Stop if..." }

    /** Plugin type */
    static get pluginType() { return "action" }

    /** Plugin icon */
    static get pluginIcon() { return "help" }

    /** Configurable fields */
    static get fields() { return [
        { id: "value", name: "Stop if previous output is not" },
    ]}

    /** Called in High Fidelity when this action is triggered. Return a Promise. */
    onTrigger(prevValue) {

        // Compare
        if (prevValue != this.option("value"))
            throw "cancelled"

        // Continue
        return prevValue

    }

}
