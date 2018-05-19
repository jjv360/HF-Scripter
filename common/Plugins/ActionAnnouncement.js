//
// Shows an announcement to the user.

import BasePlugin from './BasePlugin'

export default class ActionAnnouncement extends BasePlugin {

    /** Plugin ID */
    static get pluginID() { return "com.jjv360.actions.Annoucement" }

    /** Plugin name */
    static get pluginName() { return "Show an announcement" }

    /** Plugin type */
    static get pluginType() { return "action" }

    /** Plugin icon */
    static get pluginIcon() { return "flag" }

    /** Configurable fields */
    static get fields() { return [
        { id: "text", name: "Text" }
    ]}

    /** Called in High Fidelity when this action is triggered. Return a Promise. */
    onTrigger() {

        Window.displayAnnouncement(this.option("text"))

    }

}
