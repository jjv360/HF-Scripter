//
// This class represents a React component which can be rendered as a popup. Popup views should subclass this.

import React from 'react'
import ReactDOM from 'react-dom'

export default class Popup extends React.Component {

    /** Show this window as a popup */
    static show(props = {}) {

        // Create div to hold the new component
        var div = document.createElement("div")
        document.body.appendChild(div)

        // This function is called when the popup is closed
        function removeDiv() {
            div.parentNode && div.parentNode.removeChild(div)
        }

        // This function is called when the popup is rendered by React
        function onRender(container) {

            // Show it soon
            setTimeout(e => {
                container.show()
            }, 100)

        }

        // Render component
        ReactDOM.render(<PopupContainer ref={onRender} cleanup={removeDiv} element={this} props={props} />, div)

    }

    /** Call this to close the popup */
    close() {

        // Will only be available once the component is mounted
        if (this._close)
            this._close()

    }

}

/** Minimum width in pixels before we enter mobile mode */
Popup.minimumWidthForMobile = 420



class PopupContainer extends React.Component {

    constructor(props) {
        super(props)

        // Set vars
        this.state = {}
        this.state.visible = false
        this.state.mobile = window.innerWidth < Popup.minimumWidthForMobile || window.innerHeight < Popup.minimumWidthForMobile

        // Bind listeners
        this.onResize = this.onResize.bind(this)

    }

    componentDidMount() {

        // Attach our methods to the element
        this.refs.element._close = this.close.bind(this)

        // Listen for window resize
        window.addEventListener("resize", this.onResize)

    }

    componentWillUnmount() {

        // Remove listeners
        window.removeEventListener("resize", this.onResize)

    }

    /** @private Called when the browser window is resized */
    onResize() {

        // Set state
        this.setState({
            mobile: window.innerWidth < Popup.minimumWidthForMobile || window.innerHeight < Popup.minimumWidthForMobile
        })

    }

    render() {

        // Create style for desktop
        var style = {
            display: "relative",
            width: "480px",
            minWidth: "320px",
            maxWidth: "calc(100% - 40px)",
            height: "576px",
            maxHeight: "calc(100% - 40px)",
            borderRadius: 3,
            backgroundColor: "#FAFAFA",
            overflow: "hidden",
            boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.2)",
            transform: this.state.visible ? "translateY(0px)" : "translateY(200px)",
            transition: "transform 0.3s",
        }

        // Create style for mobile
        if (this.state.mobile) style = {
            display: "relative",
            width: "calc(100% - 20px)",
            height: "calc(100% - 20px)",
            borderRadius: 3,
            backgroundColor: "#FAFAFA",
            overflow: "hidden",
            boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.2)",
            transform: this.state.visible ? "translateY(0px)" : "translateY(200px)",
            transition: "transform 0.3s",
        }

        return <div ref='bg' style={{
            position: "fixed",
            zIndex: "1000",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: this.state.visible ? "1" : "0",
            transition: "opacity 0.3s"
        }} onClick={this.onBackgroundClick.bind(this)}>

            {/* Render the container */}
            <div style={style}>

                {/* Subclass's content */}
                <this.props.element ref='element' mobile={this.state.mobile} {...this.props.props}/>

            </div>

        </div>

    }

    show() {

        // Show it
        this.setState({ visible: true })

    }

    hide() {

        // Hide it
        this.setState({ visible: false })

    }

    close() {

        // Hide us
        this.hide()

        // Remove dom soon
        setTimeout(this.props.cleanup, 500)

    }

    /** @private Called when the background element is clicked */
    onBackgroundClick(e) {

        // Check if it was our element that was clicked
        if (e.target != this.refs.bg)
            return

        // Close us
        this.close()

    }

}
