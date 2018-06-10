//
// Base abstract plugin class

export default class BasePlugin {

    /** Constructor */
    constructor(localEntity, options, triggerCallback) {
        this.localEntity = localEntity
        this.options = options
        this.triggerCallback = triggerCallback
    }

    /** Get an option, replacing variables if needed */
    option(name) {

        // Get it
        var value = this.options[name]

        // If a string, check for variables
        if (typeof value == "string") {

            // Replace variables
            while (true) {

                // Find index of ${
                var startIdx = value.indexOf("${")
                if (startIdx == -1)
                    break

                // Find end index
                var endIdx = value.indexOf("}")
                if (endIdx == -1)
                    break

                // Get variable
                var varName = value.substring(startIdx + 2, endIdx)
                var varValue = this.variable(varName)

                // Replace it
                value = value.substring(0, startIdx) + varValue + value.substring(endIdx + 1)

            }

        }

        // Check option type
        var fieldInfo = this.constructor.fields.find(f => f.id == name)
        if (!fieldInfo) {

            // Plugin passed an option name they didn't register in the `fields` array.
            print(`[HF Scripter] Plugin option not found in fields array: ${name}`)
            return value

        } else if (fieldInfo.type == "boolean") {

            // Boolean field, convert value
            if (typeof value == "string") value = value.toLowerCase()
            return !value || value == "false" || value == "off" || value == "no" || value == "0" ? false : true

        } else if (fieldInfo.type == "number") {

            // Number field, convert value
            return parseFloat(value) || 0

        } else {

            // String field
            return value

        }

    }

    /** Get value of variable */
    variable(name) {

        // Check which one it is
        name = name.toLowerCase()
        if (name == "user.displayname") {

            // Get user's name
            return Account.username || "User"

        } else {

            // Unkown variable
            return "<???>"

        }

    }

    /** Triggers a server action */
    triggerServer(payload) {

        // Send request
        Entities.callEntityServerMethod(this.localEntity.id, "clientRequestForServer", [JSON.stringify({
            plugin: this.constructor.pluginID,
            data: payload
        })])

    }

}
