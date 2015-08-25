'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodashLangIsObject = require('lodash/lang/isObject');

var _lodashLangIsObject2 = _interopRequireDefault(_lodashLangIsObject);

var ArraySchema = (function () {
  function ArraySchema(itemSchema) {
    _classCallCheck(this, ArraySchema);

    if (!_lodashLangIsObject2['default'](itemSchema)) {
      throw new Error('ArraySchema requires item schema to be an object.');
    }

    this._itemSchema = itemSchema;
  }

  ArraySchema.prototype.getItemSchema = function getItemSchema() {
    return this._itemSchema;
  };

  return ArraySchema;
})();

exports['default'] = ArraySchema;
module.exports = exports['default'];