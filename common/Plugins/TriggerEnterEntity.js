//
// Triggers a script when the player enters an entity.

import BasePlugin from './BasePlugin'

export default class TriggerEnterEntity extends BasePlugin {

    /** Plugin ID */
    static get pluginID() { return "com.jjv360.triggers.EnterEntity" }

    /** Plugin name */
    static get pluginName() { return "When the player enters the entity" }

    /** Plugin type */
    static get pluginType() { return "trigger" }

    /** Plugin icon */
    static get pluginIcon() { return "subdirectory_arrow_right" }

    /** HF event: On load */
    preload(id) {

        // Stop on server
        if (Script.isEntityServerScript())
            return

        // Check if the user is already inside the entity
        var zoneProps = this.localEntity.getProperties(["position", "dimensions"])
        if (MyAvatar.position.x > zoneProps.position.x - zoneProps.dimensions.x/2 && MyAvatar.position.x < zoneProps.position.x + zoneProps.dimensions.x/2
         && MyAvatar.position.y > zoneProps.position.y - zoneProps.dimensions.y/2 && MyAvatar.position.y < zoneProps.position.y + zoneProps.dimensions.y/2
         && MyAvatar.position.z > zoneProps.position.z - zoneProps.dimensions.z/2 && MyAvatar.position.z < zoneProps.position.z + zoneProps.dimensions.z/2) {

            // We are already inside the entity, trigger event
            this.triggerCallback()

        }

    }

    /** HF event: Entering the entity */
    enterEntity(id) {

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
