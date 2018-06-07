//
// Edits an entity property

import BasePlugin from './BasePlugin'

export default class ActionEditEntity extends BasePlugin {

    /** Plugin ID */
    static get pluginID() { return "com.jjv360.actions.EditEntity" }

    /** Plugin name */
    static get pluginName() { return "Edit entity property" }

    /** Plugin type */
    static get pluginType() { return "action" }

    /** Plugin icon */
    static get pluginIcon() { return "border_color" }

    /** Configurable fields */
    static get fields() { return [
        { id: "entityID", name: "Entity ID (blank for current)" },
        { id: "propname", name: "Property Name" },
        { id: "propvalue", name: "Value" }
    ]}

    /** Called in High Fidelity when this action is triggered. Return a Promise. */
    onTrigger() {

        // Edit entity
        var entityID = this.option("entityID") || this.localEntity.id
        var propName = this.option("propname")
        var props = {}
        props[propName] = this.option("propvalue")
        print(`[HF Scripter] Editing entity: ID = ${entityID}, property = ${propName}, value = ${props[propName]}`)
        if (!Entities.editEntity(entityID, props))
            print(`[HF Scripter - Server] Entity edit failed!`)

    }

}
