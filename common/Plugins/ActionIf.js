//
// Stops execution if the value doesn't match

import BasePlugin from './BasePlugin'

export default class ActionIf extends BasePlugin {

    /** Plugin ID */
    static get pluginID() { return "com.jjv360.actions.If" }

    /** Plugin name */
    static get pluginName() { return "Continue only if..." }

    /** Plugin type */
    static get pluginType() { return "action" }

    /** Plugin icon */
    static get pluginIcon() { return "help" }

    /** Configurable fields */
    static get fields() { return [
        { id: "varname", name: "Variable" },
        { id: "value", name: "Continue only if value is" },
    ]}

    /** Called in High Fidelity when this action is triggered. Return a Promise. */
    onTrigger(prevValue) {
        super.onTrigger(prevValue)

        // Compare
        var value = this.variable(this.option("varname") || "input")
        var check = this.option("value")
        if (value != check)
            throw "cancelled"

        // Continue
        return prevValue

    }

}
