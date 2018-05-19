//
// This plugin modified the webpack output so it's compatible with High Fidelity.

// const babel = require("babel-core")
const es3ify = require("es3ify")

module.exports = class HighFidelityWebpackPlugin {

    /** Constructor */
    constructor() {

        // List of replacements
        this.replacements = [
            // { regex: /\.default/g, replaceWith: '["default"]' },
            // { regex: /default\s*:/g, replaceWith: '"default":'}
        ]

    }

    /** @private Called on build */
    apply(compiler) {

        // Listen for compile start
        compiler.hooks.emit.tap("HighFidelityWebpackPlugin", compilation => {

            // Go through all files
            for (var chunk of compilation.chunks) {
                for (var filename of chunk.files) {
                    var file = compilation.assets[filename]

                    // Replace strings
                    var text = file.source()
                    for (var r of this.replacements)
                        text = text.replace(r.regex, r.replaceWith)

                    // ES3ify (yep, seriously)
                    text = es3ify.transform(text)
                    // var resp = babel.transform(text, { plugins: ["babel-plugin-transform-es3-member-expression-literals", "babel-plugin-transform-es3-property-literals"] })
                    // text = resp.code

                    // "return" the final library
                    text += "\n\n(HFScript && HFScript['default'] || HFScript)"

                    // Done, replace asset
                    compilation.assets[filename] = {
                        source: function() {
                            return text
                        },
                        size: function() {
                            return text.length
                        }
                    }

                }
            }

        })

    }

}
