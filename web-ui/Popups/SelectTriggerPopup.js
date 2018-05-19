//
// Allows the user to edit an action

import React from 'react'
import Popup from './Popup'
import { List, ListItem, ListDivider } from 'react-toolbox/lib/list';
import Plugins from '../../common/Plugins/PluginManager'

export default class SelectTriggerPopup extends Popup {

    constructor() {
        super()

        // Setup vars
        this.state = {}

    }

    render() {

        return <div>

            {/* Header */}
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 40, paddingTop: 20, display: "flex", alignItems: "center", borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}>

                {/* Title label */}
                <div style={{ padding: "0px 14px 0px 24px", fontSize: 16, color: "#444", flexShrink: "1", flexGrow: "1", textAlign: "left" }}>Select Trigger</div>

                {/* Cancel button */}
                <div style={{ padding: "10px 24px 10px 24px", fontSize: 16, color: "#5393c6", cursor: "pointer", textTransform: "uppercase", flexShrink: "0", flexGrow: "0" }} onClick={this.close.bind(this)}>Cancel</div>

            </div>

            {/* Scrollable content */}
            <div style={{ position: "absolute", top: 61, left: 0, width: "100%", height: "calc(100% - 61px)", overflowX: "hidden", overflowY: "auto", WebkitOverflowScrolling: "touch" }}>

                <List selectable ripple>

                    {/* All items */}
                    {Plugins.withType("trigger").map(p =>
                        <ListItem key={p.pluginID} leftIcon={p.pluginIcon || 'label'} caption={p.pluginName} legend={p.pluginDescription} rightIcon={p.pluginID == this.props.selectedID ? "check" : null} onClick={e => { this.close() ; this.props.onSelect(p) }} />
                    )}

                </List>

            </div>

        </div>

    }

}
