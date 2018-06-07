//
// Triggers a script when the player enters an entity.

import BasePlugin from './BasePlugin'

export default class TriggerEnterEntity extends BasePlugin {

    /** Plugin ID */
    static get pluginID() { return "com.jjv360.triggers.LeaveEntity" }

    /** Plugin name */
    static get pluginName() { return "When the player leaves the entity" }

    /** Plugin type */
    static get pluginType() { return "trigger" }

    /** Plugin icon */
    static get pluginIcon() { return "subdirectory_arrow_left" }

    /** HF event: Leaving the entity */
    leaveEntity(id) {

        // Stop on server
        if (Script.isEntityServerScript())
            return

        // Check if ours
        if (id != this.localEntity.id)
            return

        // Fire trigger
        this.triggerCallback()

    }

}
