//
// Allows the user to edit an action

import React from 'react'
import Popup from './Popup'
import { List, ListItem, ListDivider } from 'react-toolbox/lib/list';
import { IconButton } from 'react-toolbox/lib/button';
import SelectTriggerPopup from './SelectTriggerPopup'
import SelectActionPopup from './SelectActionPopup'
import Plugins from '../../common/Plugins/PluginManager'
import uuidv4 from 'uuid/v4'

export default class EditScriptPopup extends Popup {

    constructor(props) {
        super(props)

        // Setup vars
        this.state = {}
        this.state.triggerID = props.script.triggerID || ""
        this.state.actions = props.script.actions || []

    }

    componentDidMount() {

        // Focus input field
        setTimeout(e => {
            // this.refs['inputField'].focus()
        }, 250)

    }

    render() {

        // Get trigger plugin
        var trigger = Plugins.withID(this.state.triggerID)

        return <div>

            {/* Header */}
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 40, paddingTop: 20, display: "flex", alignItems: "center", borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}>

                {/* Title label */}
                <div style={{ padding: "0px 14px 0px 24px", fontSize: 16, color: "#444", flexShrink: "1", flexGrow: "1", textAlign: "left" }}>Edit Script</div>

                {/* Save button */}
                <div style={{ padding: "10px 24px 10px 24px", fontSize: 16, color: "#5393c6", cursor: "pointer", textTransform: "uppercase", flexShrink: "0", flexGrow: "0" }} onClick={this.save.bind(this)}>Save</div>

            </div>

            {/* Scrollable content */}
            <div style={{ position: "absolute", top: 61, left: 0, width: "100%", height: "calc(100% - 61px)", overflowX: "hidden", overflowY: "auto", WebkitOverflowScrolling: "touch" }}>

                {/* Trigger */}
                <List selectable ripple>
                    <ListItem leftIcon={trigger && trigger.pluginIcon || 'label'} caption={trigger && trigger.pluginName || this.state.triggerID || "Select trigger..."} onClick={this.selectTrigger.bind(this)} />
                    <ListDivider />
                </List>

                {/* Each action */}
                {this.state.actions.map(a =>
                    <ActionItem key={a.id} action={a} onDelete={e => this.deleteAction(a)} />
                )}

                {/* Add action button */}
                <List selectable ripple>
                    <ListItem leftIcon='add_box' caption='Add action...' onClick={this.addAction.bind(this)} />
                </List>

            </div>

        </div>

    }

    /** Called when the user presses the Trigger button */
    selectTrigger() {

        // Show popup
        SelectTriggerPopup.show({ selectedID: this.state.triggerID, onSelect: plugin => {
            this.setState({ triggerID: plugin.pluginID })
        }})

    }

    /** Called when the user presses the Add Action button */
    addAction() {

        // Show popup
        SelectActionPopup.show({ selectedID: this.state.triggerID, onSelect: plugin => {

            // Add new action
            var action = {}
            action.id = uuidv4()
            action.pluginID = plugin.pluginID
            action.options = {}
            this.state.actions.push(action)
            this.forceUpdate()

        }})

    }

    /** Remove the specified action */
    deleteAction(action) {

        // Remove it
        for (var i = 0 ; i < this.state.actions.length ; i++)
            if (this.state.actions[i] == action)
                this.state.actions.splice(i--, 1)

        // Update UI
        this.forceUpdate()

    }

    /** Save script */
    save() {

        // Close us
        this.close()

        // Save script
        this.props.onSave({
            id: this.props.script.id,
            triggerID: this.state.triggerID,
            actions: this.state.actions
        })

    }

}



class ActionItem extends React.Component {

    constructor(props) {
        super(props)

        // Setup state
        this.state = {}

    }

    /** Renders the action */
    render() {

        // Get plugin
        var plugin = Plugins.withID(this.props.action.pluginID)

        // Create UI for action element
        return <List selectable ripple>

            {/* Action item */}
            <ListItem leftIcon={plugin.pluginIcon || 'code'} caption={plugin.pluginName} rightActions={[
                <IconButton icon='delete' onClick={this.props.onDelete} />
            ]} />

            {/* Fields */}
            {plugin.fields.map(f =>
                <ListItem key={f.id} leftIcon='text_fields' onClick={e => this.modifyField(f)} itemContent={
                    <div style={{ fontSize: 13, whiteSpace: "wrap" }}><b>{f.name}:</b> <font style={{fontWeight: "400", color: "#666", }}>{this.props.action.options[f.id] || "<none>"}</font></div>
                } />
            )}

            {/* Padding */}
            <ListDivider />

        </List>

    }

    /** Called when the user clicks a field */
    modifyField(field) {

        // Ask user for value
        var value = prompt(field.description || field.name, this.props.action.options[field.id] || "")
        if (!value)
            return

        // Store value
        this.props.action.options[field.id] = value
        this.forceUpdate()

    }

}
