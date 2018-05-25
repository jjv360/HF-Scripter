//
// Logs text to the console.

import BasePlugin from './BasePlugin'

export default class ActionInstallInterfaceScript extends BasePlugin {

    /** Plugin ID */
    static get pluginID() { return "com.jjv360.actions.InstallInterfaceScript" }

    /** Plugin name */
    static get pluginName() { return "Install an Interface script" }

    /** Plugin type */
    static get pluginType() { return "action" }

    /** Plugin icon */
    static get pluginIcon() { return "build" }

    /** Configurable fields */
    static get fields() { return [
        { id: "url", name: "URL" }
    ]}

    /** Called in High Fidelity when this action is triggered. Return a Promise. */
    onTrigger() {

        // Install script
        Script.load(this.option("url"))

    }

}
