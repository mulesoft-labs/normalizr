'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var EntitySchema = (function () {
  function EntitySchema(key) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, EntitySchema);

    if (!key || typeof key !== 'string') {
      throw new Error('A string non-empty key is required');
    }

    this._idAttribute = options.idAttribute || 'id';
    this._key = key;
    if (options.typeAttribute) {
      this._typeAttribute = options.typeAttribute;
    }
  }

  EntitySchema.prototype.getKey = function getKey() {
    return this._key;
  };

  EntitySchema.prototype.getIdAttribute = function getIdAttribute() {
    return this._idAttribute;
  };

  EntitySchema.prototype.getTypeAttribute = function getTypeAttribute() {
    return this._typeAttribute;
  };

  EntitySchema.prototype.define = function define(nestedSchema) {
    for (var key in nestedSchema) {
      if (nestedSchema.hasOwnProperty(key)) {
        this[key] = nestedSchema[key];
      }
    }
  };

  return EntitySchema;
})();

exports['default'] = EntitySchema;
module.exports = exports['default'];