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

    /** Get a specific property */
    getProperty(name) {
        return this.getProperties([name])[name]
    }

    /** Set a specific property */
    setProperty(name, value) {
        var obj = {}
        obj[name] = value
        this.setProperties(obj)
    }

    /** Set multiple properties */
    setProperties(newProps) {
        Entities.editEntity(this.id, newProps)
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
        Entities.editEntity(this.id, { userData: JSON.stringify(userData) })

    }

}
