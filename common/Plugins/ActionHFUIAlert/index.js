//
// Shows an alert to the user.

import BasePlugin from '../BasePlugin'
import { View, Label, ImageView, animate } from 'hf-ui'

export default class ActionHFUIAlert extends BasePlugin {

    /** Plugin ID */
    static get pluginID() { return "com.jjv360.actions.HFUIAlert" }

    /** Plugin name */
    static get pluginName() { return "Show on-screen message" }

    /** Plugin type */
    static get pluginType() { return "action" }

    /** Plugin icon */
    static get pluginIcon() { return "chat" }

    /** Configurable fields */
    static get fields() { return [
        { id: "title", name: "Title" },
        { id: "text", name: "Text" },
        { id: "footer", name: "Footer" },
        { id: "icon", name: "Icon (info, question, warning, error)" },
        { id: "timeout", name: "Dismiss in (seconds)" }
    ]}

    /** Called in High Fidelity when this action is triggered. Return a Promise. */
    onTrigger() {

        // Stop if already created overlay
        if (this.overlay)
            return

        // Clear timer
        if (this.removeTimer) {
            Script.clearTimeout(this.removeTimer)
            this.removeTimer = null
        }

        // Get alert information
        var icon = this.option("icon")
        var title = this.option("title")
        var text = this.option("text")
        var footer = this.option("footer")
        var timeout = parseFloat(this.option("timeout")) || 0

        // Replace built-in icons with their URLs NOTE: These images are from flaticon.com
        // TODO: Use remote URLs instead of embedding into the script itself like this
        if (icon == "info")
            icon = require("./info.png")
        else if (icon == "question")
            icon = require("./question.png")
        else if (icon == "warning")
            icon = require("./warning.png")
        else if (icon == "error")
            icon = require("./error.png")

        // Create overlay
        this.overlay = new View()
        this.overlay.x = -400
        this.overlay.y = 100
        this.overlay.width = 400
        this.overlay.height = 100
        this.overlay.alpha = 0
        this.overlay.backgroundAlpha = 0.75
        this.overlay.backgroundColor = { red: 0, green: 0, blue: 10 }
        this.overlay.show()

        // Create icon
        this.icon = new ImageView()
        this.icon.x = 10
        this.icon.y = 10
        this.icon.width = 32
        this.icon.height = 32
        this.icon.imageURL = icon
        this.overlay.addSubview(this.icon)

        // Create title label
        this.title = new Label()
        this.title.x = 10 + 32 + 10
        this.title.y = 10
        this.title.width = this.overlay.width - 10 - 32 - 10
        this.title.height = 20
        this.title.color = { red: 255, green: 255, blue: 255 }
        this.title.font = { size: 17 }
        this.title.text = title
        this.overlay.addSubview(this.title)

        // Create subtitle label
        this.subtitle = new Label()
        this.subtitle.x = 10 + 32 + 10
        this.subtitle.y = this.title.y + this.title.height + 10
        this.subtitle.width = this.overlay.width - 10 - 32 - 10
        this.subtitle.height = text.split("\n").length * 18
        this.subtitle.color = { red: 200, green: 200, blue: 200 }
        this.subtitle.font = { size: 13 }
        this.subtitle.text = text
        this.overlay.addSubview(this.subtitle)

        // Create footer view
        this.footer = new Label()
        this.footer.x = 0
        this.footer.y = this.subtitle.y + this.subtitle.height + 10
        this.footer.width = this.overlay.width
        this.footer.height = footer ? 24 : 0
        this.footer.color = { red: 100, green: 100, blue: 100 }
        this.footer.font = { size: 11 }
        this.footer.text = footer
        this.footer.topMargin = 5
        this.footer.leftMargin = 10
        this.footer.backgroundAlpha = 0.5
        this.footer.backgroundColor = { red: 0, green: 0, blue: 0 }
        this.overlay.addSubview(this.footer)

        // Set overlay size
        this.overlay.height = this.footer.y + this.footer.height

        // Animate in
        // animate(this.overlay, { alpha: 1, x: 20 })
        this.overlay.alpha = 1
        this.overlay.x = 20

        // Start timer to remove the element, if needed
        if (timeout > 0)
            this.removeTimer = Script.setTimeout(this.removeOverlay.bind(this), timeout * 1000)

    }

    /** Removes any overlay */
    removeOverlay() {

        // Clear timer
        if (this.removeTimer) {
            Script.clearTimeout(this.removeTimer)
            this.removeTimer = null
        }

        // Stop if overlay has been removed already
        if (!this.overlay)
            return

        this.overlay.remove()
        this.overlay = null

    }

    /** Always remove overlay when unloading */
    unload() {
        this.removeOverlay()
    }

}
