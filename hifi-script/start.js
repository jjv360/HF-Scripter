//
// Entry point for the script

import LocalEntity from './LocalEntity'
import Plugins from '../common/Plugins/PluginManager'

/** This is the entity class for the entity this script is attached to. */
export default class MyEntity extends LocalEntity {

    /** Passes an event to all plugins */
    passEvent(name, arg1, arg2) {

        // Go through all scripts
        for (var script of this.scripts || []) {

            // Send to trigger plugin
            if (script.triggerPlugin && script.triggerPlugin[name])
                script.triggerPlugin[name](arg1, arg2)

            // Go through all actions
            for (var action of script.actions || []) {

                // Send to action plugin
                if (action.plugin && action.plugin[name])
                    action.plugin[name](arg1, arg2)

            }

        }

    }

    /** Called when the script is loaded, and the entity ID has been retrieved. */
    preload(id) {
        super.preload(id)

        print("HiFi Scripter: Preload")
        this.unloaded = false

        // Get scripts
        this.scripts = this.getUserData("scripterScripts") || []

        // For each script, create plugin instances
        for (let script of this.scripts) {

            // Get trigger plugin
            var Plugin = Plugins.withID(script.triggerID)
            if (!Plugin) {
                print("Scripter: Unable to find trigger plugin with ID " + script.triggerID)
                continue
            }

            // Create trigger plugin instance
            script.triggerPlugin = new Plugin(this, {}, e => this.executeScript(script, e))

            // Create instance for each action
            for (let action of script.actions || []) {

                // Get plugin
                Plugin = Plugins.withID(action.pluginID)
                if (!Plugin) {
                    print("Scripter: Unable to find action plugin with ID " + action.pluginID)
                    continue
                }

                // Create plugin instance, passing in user options
                action.plugin = new Plugin(this, action.options || {}, null)

            }

        }

        // Pass on event to all plugins
        this.passEvent("preload", id)

    }

    /** Called when the script is unloaded */
    unload() {
        super.unload()

        print("HiFi Scripter: Unload")
        this.unloaded = true

        // Pass on event to all plugins
        this.passEvent("unload")

    }

    /** Called when user enters an entity */
    enterEntity(id) {

        // Pass on event to all plugins
        this.passEvent("enterEntity", id)

    }

    /** Called when user leaves an entity */
    leaveEntity(id) {

        // Pass on event to all plugins
        this.passEvent("leaveEntity", id)

    }

    /** Called when the user clicks down on an entity */
    clickDownOnEntity(id) {

        // Pass on event to all plugins
        this.passEvent("clickDownOnEntity", id)

    }

    /** Executes a script. This is called by a Trigger plugin. @returns Promise resolved to final action's output. */
    executeScript(script, triggerOutput) {

        // Execute first action of script
        print("Scripter: Running script")
        return this.executeScriptAction(script, 0, triggerOutput).catch(err => {

            // Check if cancelled
            if (err == "cancelled")
                return print("Scripter: Script cancelled")

            // Failed!
            print("Scripter: [ERROR] " + err.message)
            print(err)

        })

    }

    /** Recursive function. Called to execute each action in a script. */
    executeScriptAction(script, actionIndex = 0, previousOutput = null) {

        // Check if done
        if (actionIndex >= script.actions.length) {
            print("Scripter: Script completed")
            return previousOutput
        }

        // Check if unloaded
        if (this.unloaded) {
            print("Scripter: Script interrupted, plugin unloaded")
            return previousOutput
        }

        // Get action
        var action = script.actions[actionIndex]

        // Trigger action plugin, wait for completion
        return Promise.resolve(action.plugin.onTrigger(previousOutput)).then(output => {

            // Step complete, run next step
            return this.executeScriptAction(script, actionIndex + 1, output)

        })

    }

}
