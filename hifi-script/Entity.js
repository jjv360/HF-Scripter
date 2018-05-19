//
//

export default class Entity {

    constructor(id) {

        /** Entity ID */
        this.id = id

    }

    /** Fetch properties for this entity */
    getProperties(names = []) {
        return Entities.getEntityProperties(this.id, names)
    }

    /** Fetch user data object, or a single field if specified */
    getUserData(field) {

        // Get it
        var props = this.getProperties("userData")

        // Decode it
        var userData = {}
        try {
            userData = JSON.parse(props.userData)
        } catch (e) {

        }

        // Done
        if (field)
            return userData[field]
        else
            return userData

    }

    /** Set a user data field */
    setUserData(field, value) {

        // Get all user data
        var userData = this.getUserData()

        // Set new field
        userData[field] = value

        // Update entity
        Entities.editEntity(this.id, JSON.stringify(userData))

    }

}
