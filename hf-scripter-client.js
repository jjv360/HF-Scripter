//
// This small script loads the HF Scripter web app onto the tablet, and applies
// modifications to the selected entity.

(function() {

    // Every great app starts with a great name (keep it short so that it can fit in the tablet button)
    var APP_NAME = "SCRIPTER";

    // Link to your app's HTML file
    // var APP_URL = "http://localhost:8080"
    var APP_URL = "https://s3.amazonaws.com/jjv360/hifi/hf-scripter"

    // Get a reference to the tablet
    var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");

    // "Install" your cool new app to the tablet
    // The following lines create a button on the tablet's menu screen
    var button = tablet.addButton({
        text: APP_NAME,
        icon: APP_URL + "/tableticon.svg"
    });

    // When user click the app button, we'll display our app on the tablet screen
    function onClicked() {

        // Get currently selected entity
        var selectedEntities = Selection.getSelectedItemsList("editHandleHighlightList").entities
        var selectedEntity = selectedEntities && selectedEntities.length ? selectedEntities[selectedEntities.length-1] : null

        // If no entity, warn the user
        if (!selectedEntity)
            return Window.alert("Please select the entity you would like to modify first.")

        // HACK: I have no idea how to properly identify the selected item. This list gets confused,
        // so let's empty it out now.
        for (var i = 0 ; i < selectedEntities.length ; i++)
            Selection.removeFromSelectedItemsList("editHandleHighlightList", "entity", selectedEntities[i])

        // Get entity properties
        var props = Entities.getEntityProperties(selectedEntity, ["name", "userData"]) || {}
        var userData = {}
        try {
            userData = JSON.parse(props.userData)
        } catch (e) {

        }

        // Create URL
        var url = APP_URL + "/web-ui/index.html#" + encodeURIComponent(JSON.stringify({
            id: selectedEntity,
            name: props.name || "Untitled Object",
            scripts: userData.scripterScripts || []
        }))

        // Open web app
        console.log("Showing URL: " + url)
        tablet.gotoWebScreen(url);

    }
    button.clicked.connect(onClicked);

    // Handle the events we're receiving from the web UI
    function onWebEventReceived(event) {

        // Converts the event to a JavaScript Object
        if (typeof event === "string") {
            event = JSON.parse(event);
        }

        // Make sure it's for us
        if (event.type == "scripter.write")
            onWriteEvent(event)

    }
    tablet.webEventReceived.connect(onWebEventReceived);

    // Provide a way to "uninstall" the app
    // Here, we write a function called "cleanup" which gets executed when
    // this script stops running. It'll remove the app button from the tablet.
    function cleanup() {
        tablet.removeButton(button);
        tablet.webEventReceived.disconnect(onWebEventReceived)
    }
    Script.scriptEnding.connect(cleanup);

    // Called when the web UI wants us to write new script data to an entity
    function onWriteEvent(event) {

        // Get entity properties
        var props = Entities.getEntityProperties(event.entityID, ["userData"]) || {}
        var userData = {}
        try {
            userData = JSON.parse(props.userData)
        } catch (e) {

        }

        // Set scripts
        userData.scripterScripts = event.scripts || []

        // Write userData back
        Entities.editEntity(event.entityID, {
            userData: JSON.stringify(userData)
        })

        // Re-attach script
        Entities.editEntity(event.entityID, { script: "" })
        Script.setTimeout(function() {
            Entities.editEntity(event.entityID, { script: APP_URL + "/hifi-scripter.min.js" })
        }, 250)

    }

}());
