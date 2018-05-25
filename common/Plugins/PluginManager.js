
/** Manages all plugins */
class PluginManager {

    constructor() {

        /** All registered plugins */
        this.plugins = []

        // Add built-in plugins
        this.add(require("./ActionAlert").default)
        this.add(require("./ActionAnnouncement").default)
        this.add(require("./ActionConfirm").default)
        this.add(require("./ActionDelay").default)
        this.add(require("./ActionHFUIAlert").default)
        this.add(require("./ActionHFUISubtitle").default)
        this.add(require("./ActionInstallInterfaceScript").default)
        this.add(require("./ActionLog").default)
        this.add(require("./ActionPrompt").default)
        this.add(require("./TriggerLeaveEntity").default)
        this.add(require("./TriggerEnterEntity").default)
        this.add(require("./TriggerOnLoad").default)
        this.add(require("./TriggerEntityClick").default)

    }

    /** Add a plugin */
    add(plugin) {
        this.plugins.push(plugin)
    }

    /** Get all plugins of a certain type. @returns [Plugin] */
    withType(type) {
        return this.plugins.filter(p => p.pluginType == type)
    }

    /** Get the plugin with the specified ID. @returns Plugin or null. */
    withID(id) {
        return this.plugins.find(p => p.pluginID == id)
    }

}

export default new PluginManager()
