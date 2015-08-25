'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodashLangIsObject = require('lodash/lang/isObject');

var _lodashLangIsObject2 = _interopRequireDefault(_lodashLangIsObject);

var PolymorphicSchema = (function () {
  function PolymorphicSchema(baseSchema, entityMap) {
    _classCallCheck(this, PolymorphicSchema);

    if (!_lodashLangIsObject2['default'](baseSchema)) {
      throw new Error('PolymorphicSchema requires baseSchema to be an object.');
    }
    if (!_lodashLangIsObject2['default'](entityMap)) {
      throw new Error('PolymorphicSchema requires an entityMap object.');
    }

    this._baseSchema = baseSchema;
    this._entityMap = entityMap;
  }

  PolymorphicSchema.prototype.getBaseSchema = function getBaseSchema() {
    return this._baseSchema;
  };

  PolymorphicSchema.prototype.getEntityMap = function getEntityMap() {
    return this._entityMap;
  };

  return PolymorphicSchema;
})();

exports['default'] = PolymorphicSchema;
module.exports = exports['default'];