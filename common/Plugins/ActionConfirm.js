//
// Shows a confirmation prompt to the user.

import BasePlugin from './BasePlugin'

export default class ActionConfirm extends BasePlugin {

    /** Plugin ID */
    static get pluginID() { return "com.jjv360.actions.Confirm" }

    /** Plugin name */
    static get pluginName() { return "Show confirm prompt" }

    /** Plugin type */
    static get pluginType() { return "action" }

    /** Plugin icon */
    static get pluginIcon() { return "help" }

    /** Configurable fields */
    static get fields() { return [
        { id: "title", name: "Title" },
        { id: "text", name: "Text" }
    ]}

    /** Called in High Fidelity when this action is triggered. Return a Promise. */
    onTrigger() {

        // Output to console
        var boxid = Window.openMessageBox(this.option("title"), this.option("text"), 0x4000 | 0x10000, 0x4000)

        // Return promise
        return new Promise((onSuccess, onFail) => {

            // Listen for close
            function onClose(id, button) {

                // Ignore other dialogs closing
                if (id != boxid)
                    return

                // Check which button was pressed
                if (button == 0x4000)
                    onSuccess(true)
                else
                    onFail("cancelled")

                // Remove listener
                Window.messageBoxClosed.disconnect(onClose)

            }
            Window.messageBoxClosed.connect(onClose)

        })

    }

}
