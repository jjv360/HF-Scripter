//
// Shows an alert to the user.

import BasePlugin from './BasePlugin'

export default class ActionPrompt extends BasePlugin {

    /** Plugin ID */
    static get pluginID() { return "com.jjv360.actions.Prompt" }

    /** Plugin name */
    static get pluginName() { return "Show prompt popup" }

    /** Plugin type */
    static get pluginType() { return "action" }

    /** Plugin icon */
    static get pluginIcon() { return "flag" }

    /** Configurable fields */
    static get fields() { return [
        { id: "text", name: "Text" },
        { id: "defaultText", name: "Default Input" },
    ]}

    /** Called in High Fidelity when this action is triggered. Return a Promise. */
    onTrigger() {

        // Output to console
        return Window.prompt(this.option("text"), this.option("defaultText"))

    }

}
