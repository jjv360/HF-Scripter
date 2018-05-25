//
// Shows subtitles to the user.

import BasePlugin from './BasePlugin'
import { View, Label, ImageView, animate } from 'hf-ui'

// Trims extra whitespace and breaks into lines of length no more than MAX_LENGTH, breaking at spaces. Trims extra whitespace.
function wordWrap(string, maxLength = 42) {
    var finishedLines = [], currentLine = '';
    string.split(/\s/).forEach(function (word) {
        var tail = currentLine ? ' ' + word : word;
        if ((currentLine.length + tail.length) <= maxLength) {
            currentLine += tail;
        } else {
            finishedLines.push(currentLine);
            currentLine = word;
        }
    });
    if (currentLine) {
        finishedLines.push(currentLine);
    }
    return finishedLines.join('\n');
}

export default class ActionHFUISubtitle extends BasePlugin {

    /** Plugin ID */
    static get pluginID() { return "com.jjv360.actions.HFUISubtitle" }

    /** Plugin name */
    static get pluginName() { return "Show subtitle message" }

    /** Plugin type */
    static get pluginType() { return "action" }

    /** Plugin icon */
    static get pluginIcon() { return "closed_caption" }

    /** Configurable fields */
    static get fields() { return [
        { id: "text", name: "Text" },
    ]}

    /** Message channel name */
    get channelName() { return ActionHFUISubtitle.pluginID + ":" + "events" }

    /** Called in High Fidelity when this action is triggered. Return a Promise. */
    onTrigger() {

        // Remove old overlay if any
        this.removeOverlay()

        // Ask other client entity scripts to remove their overlays, if there are any
        Messages.sendMessage(this.channelName, JSON.stringify({
            event: "remove"
        }), true)

        // Get text, break up long lines
        var text = this.option("text")
        text = wordWrap(text, 100)

        // Create text label
        this.overlay = new Label()
        this.overlay.width = 800
        this.overlay.height = text.split("\n").length * 22 + 20
        this.overlay.x = Overlays.width() / 2 - this.overlay.width / 2
        this.overlay.y = Overlays.height() - 120 - this.overlay.height
        this.overlay.color = { red: 255, green: 255, blue: 255 }
        this.overlay.backgroundColor = { red: 0, green: 4, blue: 8 }
        this.overlay.backgroundAlpha = 0.75
        this.overlay.font = { size: 17 }
        this.overlay.text = ""
        this.overlay.leftMargin = 10
        this.overlay.topMargin = 10
        this.overlay.show()

        // Start timer to remove the element, if needed
        this.removeTimer = Script.setTimeout(this.removeOverlay.bind(this), 30 * 1000)

        // Create a loop to display each character one at a time
        var numChars = 0
        var textTimer = 0
        var overlay = this.overlay
        textTimer = Script.setInterval(e => {

            // Add another char
            numChars += 1

            // Check if done
            if (numChars > text.length) {
                Script.clearInterval(textTimer)
                return
            }

            // Set text
            overlay.text = text.substring(0, numChars)

        }, 1000 / 30)

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

    /** Called on startup */
    preload() {

        // Listen for incoming subtitle messages
        this.onMessage = this.onMessage.bind(this)
        Messages.subscribe(this.channelName)
        Messages.messageReceived.connect(this.onMessage)

    }

    /** Called when the script is unloaded */
    unload() {

        // Always remove overlay when unloading
        this.removeOverlay()

        // Stop listening for incoming subtitle messages
        Messages.messageReceived.disconnect(this.onMessage)

    }

    /** Called when a message is received */
    onMessage(channel, message, sender, localOnly) {

        // Ignore if we're not showing an overlay right now
        if (!this.overlay)
            return

        // Ignore if not ours
        if (channel != this.channelName)
            return

        // Convert to JSON if needed
        if (typeof message == "string") {
            try {
                message = JSON.parse(message)
            } catch (e) {
            }
        }

        // Check action
        if (message.event == "remove") {

            // Another entity script is about to show a subtitle, remove ours
            this.removeOverlay()

        }

    }

}
