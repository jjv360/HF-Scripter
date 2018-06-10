//
// Edits an entity property

import BasePlugin from './BasePlugin'

export default class ActionEditEntity extends BasePlugin {

    /** Plugin ID */
    static get pluginID() { return "com.jjv360.actions.PlayAudio" }

    /** Plugin name */
    static get pluginName() { return "Play audio" }

    /** Plugin type */
    static get pluginType() { return "action" }

    /** Plugin icon */
    static get pluginIcon() { return "audiotrack" }

    /** Configurable fields */
    static get fields() { return [
        { id: "url", name: "Sound URL", type: "url" },
        { id: "volume", name: "Volume", type: "number" },
        { id: "loop", name: "Loop", type: "boolean" }
    ]}

    /** Called by HF on startup */
    preload() {

        // Get sound file
        this.sound = SoundCache.getSound(this.option("url"))

    }

    /** Called by HF when entity is unloaded */
    unload() {

        // Stop if a player exists
        if (this.player) {
            this.player.stop()
            this.player = null
        }

    }

    /** Called in High Fidelity when this action is triggered. Return a Promise. */
    onTrigger() {

        // Stop if a player exists already, if we're looping. If not looping, we
        // can allow the audio to overlap.
        if (this.player && this.option("loop"))
            this.player.stop()

        // Edit entity
        print(`[HF Scripter] Playing audio`)
        this.player = Audio.playSound(this.sound, {
            position: this.localEntity.getProperty("position"),
            volume: this.option("volume") || 1,
            loop: this.option("loop"),
            localOnly: true
        })

    }

}
