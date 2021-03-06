"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRC8 = exports.CrcPoly = void 0;
// Reference - https://github.com/mode80/crc8js
// "Class" for calculating CRC8 checksums...
let table;
let initial_value;
exports.CrcPoly = {
    CRC8: 0xd5,
    CRC8_CCITT: 0x07,
    CRC8_DALLAS_MAXIM: 0x31,
    CRC8_SAE_J1850: 0x1D,
    CRC_8_WCDMA: 0x9b,
};
class CRC8 {
    constructor(polynomial, initial_value) {
        this.initial_value = exports.CrcPoly.CRC8_DALLAS_MAXIM;
        this.polynomial = exports.CrcPoly.CRC8_DALLAS_MAXIM;
        this.table = this.generateTable();
        this.initial_value = initial_value;
    }
    generateTable() {
        const csTable = []; // 256 max len byte array
        for (let i = 0; i < 256; ++i) {
            let curr = i;
            for (let j = 0; j < 8; ++j) {
                if ((curr & 0x80) !== 0) {
                    curr = ((curr << 1) ^ this.polynomial) % 256;
                }
                else {
                    curr = (curr << 1) % 256;
                }
            }
            csTable[i] = curr;
        }
        return csTable;
    }
    checksum(byte_array) {
        let c = this.initial_value;
        for (let i = 0; i < byte_array.length; i++)
            c = this.table[(c ^ byte_array[i]) % 256];
        return c;
    }
}
exports.CRC8 = CRC8;
// // This "enum" can be used to indicate what kind of CRC8 checksum you will be calculating
//  CRC8.POLY = {
// }
// function CRC8(polynomial: any, initial_value: any):any { // constructor takes an optional polynomial type from CRC8.POLY
// }
// // Returns the 8-bit checksum given an array of byte-sized numbers
// CRC8.prototype.checksum = function (byte_array: any) {
// }
// // returns a lookup table byte array given one of the values from CRC8.POLY
// CRC8.generateTable = function (polynomial: number) {
// }
// export {CRC8}
//# sourceMappingURL=crc8.js.map