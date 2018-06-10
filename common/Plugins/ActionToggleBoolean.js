//
// Edits an entity property

import BasePlugin from './BasePlugin'

export default class ActionToggleBoolean extends BasePlugin {

    /** Plugin ID */
    static get pluginID() { return "com.jjv360.actions.ToggleBoolean" }

    /** Plugin name */
    static get pluginName() { return "Toggle boolean variable" }

    /** Plugin type */
    static get pluginType() { return "action" }

    /** Plugin icon */
    static get pluginIcon() { return "toggle_on" }

    /** Configurable fields */
    static get fields() { return [
        { id: "varname", name: "Variable Name", type: "variable" },
    ]}

    /** Called in High Fidelity when this action is triggered. Return a Promise. */
    onTrigger(v) {

        // Toggle variable
        var varname = this.option("varname").toLowerCase()
        this.localEntity.variables[varname] = !this.localEntity.variables[varname]

    }

}
