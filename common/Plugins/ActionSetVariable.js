//
// Edits an entity property

import BasePlugin from './BasePlugin'

export default class ActionSetVariable extends BasePlugin {

    /** Plugin ID */
    static get pluginID() { return "com.jjv360.actions.SetVariable" }

    /** Plugin name */
    static get pluginName() { return "Set variable" }

    /** Plugin type */
    static get pluginType() { return "action" }

    /** Plugin icon */
    static get pluginIcon() { return "edit" }

    /** Configurable fields */
    static get fields() { return [
        { id: "varname", name: "Variable Name", type: "variable" },
        { id: "value", name: "Value", type: "string" },
    ]}

    /** Called in High Fidelity when this action is triggered. Return a Promise. */
    onTrigger(v) {

        // Toggle variable
        var varname = this.option("varname").toLowerCase()
        this.localEntity.variables[varname] = this.option("value")

    }

}
