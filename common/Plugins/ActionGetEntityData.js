//
// Edits an entity property

import BasePlugin from './BasePlugin'

export default class ActionGetEntityData extends BasePlugin {

    /** Plugin ID */
    static get pluginID() { return "com.jjv360.actions.GetEntityData" }

    /** Plugin name */
    static get pluginName() { return "Get entity data field" }

    /** Plugin type */
    static get pluginType() { return "action" }

    /** Plugin icon */
    static get pluginIcon() { return "edit" }

    /** Configurable fields */
    static get fields() { return [
        { id: "varname", name: "Property Name", type: "string" },
    ]}

    /** Called in High Fidelity when this action is triggered. Return a Promise. */
    onTrigger(v) {

        // Toggle variable
        return this.localEntity.getUserData(this.option("varname")) || ""

    }

}
