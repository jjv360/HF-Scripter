//
// Edits an entity property

import BasePlugin from './BasePlugin'

export default class ActionSetEntityData extends BasePlugin {

    /** Plugin ID */
    static get pluginID() { return "com.jjv360.actions.SetEntityData" }

    /** Plugin name */
    static get pluginName() { return "Set entity data field" }

    /** Plugin type */
    static get pluginType() { return "action" }

    /** Plugin icon */
    static get pluginIcon() { return "edit" }

    /** Configurable fields */
    static get fields() { return [
        { id: "varname", name: "Property Name", type: "string" },
        { id: "value", name: "Value", type: "string" },
    ]}

    /** Called in High Fidelity when this action is triggered. Return a Promise. */
    onTrigger(v) {

        // Toggle variable
        var prop = this.option("varname")
        var val = this.option("value")
        print(`[HF Scripter] Setting entity user data property ${prop} = ${val}`)
        this.localEntity.setUserData(prop, val)

    }

}
