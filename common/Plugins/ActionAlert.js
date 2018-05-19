//
// Shows an alert to the user.

import BasePlugin from './BasePlugin'

export default class ActionAlert extends BasePlugin {

    /** Plugin ID */
    static get pluginID() { return "com.jjv360.actions.Alert" }

    /** Plugin name */
    static get pluginName() { return "Show alert popup" }

    /** Plugin type */
    static get pluginType() { return "action" }

    /** Plugin icon */
    static get pluginIcon() { return "flag" }

    /** Configurable fields */
    static get fields() { return [
        { id: "title", name: "Title" },
        { id: "text", name: "Text" }
    ]}

    /** Called in High Fidelity when this action is triggered. Return a Promise. */
    onTrigger() {

        // Output to console
        var boxid = Window.openMessageBox(this.option("title") || "", this.option("text") || "", 0x400, 0x400)

        // Return promise
        return new Promise((onSuccess, onFail) => {

            // Listen for close
            function onClose(id, button) {
                if (id != boxid) return
                onSuccess(true)
                Window.messageBoxClosed.disconnect(onClose)
            }
            Window.messageBoxClosed.connect(onClose)

        })

    }

}
