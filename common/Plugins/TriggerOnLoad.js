//
// Triggers a script when the entity script is loaded.

import BasePlugin from './BasePlugin'

export default class TriggerOnLoad extends BasePlugin {

    /** Plugin ID */
    static get pluginID() { return "com.jjv360.triggers.OnLoad" }

    /** Plugin name */
    static get pluginName() { return "When the entity is loaded" }

    /** Plugin type */
    static get pluginType() { return "trigger" }

    /** HF event: On load */
    preload(id) {

        // Fire trigger
        this.triggerCallback()

    }

}
