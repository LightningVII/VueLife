;
(function() {
    'use strict'

    const isEqual = (a, b) => {
        return a === b || (
            isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false
        )
    }

    const isObject = obj => {
        return obj !== null && typeof obj === 'object'
    }

    const deepCopy = from => {
        var r
        if (isObject(from)) {
            r = JSON.parse(JSON.stringify(from))
        } else {
            r = from
        }
        return r
    }

    var U = {
        isEqual: isEqual,
        isObject: isObject,
        deepCopy: deepCopy
    }

    if (typeof exports === 'object') {
        module.exports = U
    } else if (typeof define === 'function' && window.define.amd) {
        window.define(function() {
            return U
        })
    } else {
        this.U = U
    }
}.call(this))