//
// Main screen

import React from 'react'
import EditScriptPopup from '../Popups/EditScriptPopup'
import uuidv4 from 'uuid/v4'
import { List, ListItem, ListDivider } from 'react-toolbox/lib/list';
import { IconButton } from 'react-toolbox/lib/button';
import Plugins from '../../common/Plugins/PluginManager'

export default class Main extends React.Component {

    constructor() {
        super()

        // Fetch entity info from High Fidelity
        this.entityInfo = {}
        try {
            var str = window.location.hash || ""
            if (str.indexOf("#") == 0)
                str = str.substring(1)

            this.entityInfo = JSON.parse(decodeURIComponent(str))
        } catch (e) {
            console.warn("Unable to read entity info!", e)
        }

        // Setup state
        this.state = {}
        this.state.scripts = this.entityInfo.scripts || []

    }

    render() {

        return <div>

            {/* Header */}
            <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: 80, display: "flex", alignItems: "center", backgroundColor: "#222", background: "linear-gradient(#2b2b2b, #1e1e1e)" }}>

                {/* Icon */}
                <img src={require("./Main.icon.svg")} style={{ margin: 32, height: 32, }} />

                {/* Text */}
                <div>
                    <div style={{ fontSize: 15, color: "#FFF", }}>{this.entityInfo.name || "Untitled Object"}</div>
                    <div style={{ fontSize: 13, color: "#AAA", paddingTop: 2 }}>{this.state.scripts.length == 1 ? "1 script" : this.state.scripts.length + " scripts"}</div>
                </div>

                {/* Divider */}
                <div style={{ flexGrow: "1", flexShrink: "1" }} />

                {/* Action buttons */}
                <img src={require("./Main.add.svg")} style={{ padding: 24, height: 24, cursor: "pointer" }} onClick={this.add.bind(this)} />

            </div>

            {/* Header padding */}
            <div style={{ height: 80 }}/>

            {/* No items label */}
            {this.state.scripts.length == 0 ?
                <div style={{ textAlign: "center", fontSize: 13, fontStyle: "italic", color: "#AAA", padding: 60, }}>No actions</div>
            : null}

            {/* Script items */}
            <List selectable ripple>

                {this.state.scripts.map(script => {
                    var plugin = Plugins.withID(script.triggerID)
                    var actions = script.actions || []
                    return <ListItem leftIcon='code' caption={plugin && plugin.pluginName || script.triggerID || "No trigger"} legend={actions.length == 1 ? "1 action" : actions.length + " actions"} onClick={e => this.editScript(script)} rightActions={[
                        <IconButton icon='delete' onClick={e => this.deleteScript(script)} />
                    ]} />
                })}

            </List>

        </div>

    }

    /** Called when the user presses the Add button */
    add(e) {
        e.preventDefault()

        // Create new script
        var script = { id: uuidv4() }
        this.state.scripts.unshift(script)
        this.forceUpdate()

        // Show editor
        EditScriptPopup.show({ script, onSave: script => {

            // Remove existing script
            for (var i = 0 ; i < this.state.scripts.length ; i++)
                if (this.state.scripts[i].id == script.id)
                    this.state.scripts.splice(i--, 1)

            // Add new script
            this.state.scripts.unshift(script)
            this.forceUpdate()

            // Update entity
            this.writeEntity()

        }})

    }

    /** Called when the user selects a script */
    editScript(script) {

        // Show editor
        EditScriptPopup.show({ script, onSave: script => {

            // Remove existing script
            for (var i = 0 ; i < this.state.scripts.length ; i++)
                if (this.state.scripts[i].id == script.id)
                    this.state.scripts.splice(i--, 1)

            // Add new script
            this.state.scripts.unshift(script)
            this.forceUpdate()

            // Update entity
            this.writeEntity()

        }})

    }

    /** Delete a script */
    deleteScript(script) {

        // Remove existing script
        for (var i = 0 ; i < this.state.scripts.length ; i++)
            if (this.state.scripts[i].id == script.id)
                this.state.scripts.splice(i--, 1)

        // Update UI
        this.forceUpdate()

        // Update entity
        this.writeEntity()

    }

    /** Write changes to the entity */
    writeEntity() {

        // Send event
        EventBridge.emitWebEvent(JSON.stringify({
            type: "scripter.write",
            entityID: this.entityInfo.id,
            scripts: this.state.scripts
        }))

    }

}
