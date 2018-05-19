//
//

import Entity from "./Entity"

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/** The base class for the local entity. This should be subclassed and returned from
 *  your starting JS file. Do not create new instances of this class. See https://docs.highfidelity.com/api-reference/namespaces/entities#signals
 *  for other event functions which can be specified. */
export default class LocalEntity extends Entity {

    /** @private Should never be called, except by the entity subclass. */
    constructor() {
        super(null)

    }

    /** Called by HF on startup */
    preload(id) {

        // Store our entity ID
        this.id = id

        // I literally do not understand why all promise polyfills fail without this. Is there a setImmediate
        // in HiFi's script global scope which doesn't do anything? What's more, this only works in the main
        // entity's preload() function. Huh...
        global.setTimeout = global.setTimeout || Script.setTimeout
        Promise = require("promise-polyfill")
        Promise._immediateFn = function(fn) {
            Script.setTimeout(function() {
                fn()
            }, 0)
        }

    }

    /** Called by HF when the script is shutting down */
    unload() {}

}
