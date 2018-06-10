//
// Edits an entity property

import BasePlugin from './BasePlugin'

export default class ActionSetJointRotation extends BasePlugin {

    /** Plugin ID */
    static get pluginID() { return "com.jjv360.actions.SetJointRotation" }

    /** Plugin name */
    static get pluginName() { return "Set joint rotation" }

    /** Plugin type */
    static get pluginType() { return "action" }

    /** Plugin icon */
    static get pluginIcon() { return "share" }

    /** Configurable fields */
    static get fields() { return [
        { id: "jointName", name: "Joint Name", type: "string" },
        { id: "pitch", name: "Pitch", type: "number" },
        { id: "yaw", name: "Yaw", type: "number" },
        { id: "roll", name: "Roll", type: "number" },
    ]}

    /** Called in High Fidelity when this action is triggered. Return a Promise. */
    onTrigger(v) {

        // Toggle variable
        var jointName = this.option("jointName")
        var jointIndex = Entities.getJointIndex(this.localEntity.id, jointName)
        var pitch = this.option("pitch")
        var yaw = this.option("yaw")
        var roll = this.option("roll")
        print(`[HF Scripter] Setting entity joint rotation, name = ${jointName}, index = ${jointIndex}, pitch = ${pitch}, yaw = ${yaw}, roll = ${roll}`)
        Entities.setLocalJointRotation(this.localEntity.id, jointIndex, Quat.fromPitchYawRollDegrees(pitch, yaw, roll))

    }

}
