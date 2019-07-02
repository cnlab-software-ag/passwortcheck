"use strict";
var PasswordPartial = (function () {
    function PasswordPartial() {
    }
    PasswordPartial.prototype.entropie = function () {
        return Math.log(this.numberOfattemps()) / Math.log(2);
    };
    return PasswordPartial;
}());
exports.PasswordPartial = PasswordPartial;
