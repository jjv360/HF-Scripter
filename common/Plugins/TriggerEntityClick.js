//
// Triggers a script when the player clicks on an entity.

import BasePlugin from './BasePlugin'

export default class TriggerEntityClick extends BasePlugin {

    /** Plugin ID */
    static get pluginID() { return "com.jjv360.triggers.EntityClick" }

    /** Plugin name */
    static get pluginName() { return "When the player clicks on the entity" }

    /** Plugin type */
    static get pluginType() { return "trigger" }

    /** Plugin icon */
    static get pluginIcon() { return "mouse" }

    /** HF event: Clicking on the entity */
    clickDownOnEntity(id) {

        // Check if ours
        if (id != this.localEntity.id)
            return

        // Fire trigger
        this.triggerCallback()

    }

}
