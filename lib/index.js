'use strict';

exports.__esModule = true;
exports.arrayOf = arrayOf;
exports.arrayOfPolymorphic = arrayOfPolymorphic;
exports.normalize = normalize;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _EntitySchema = require('./EntitySchema');

var _EntitySchema2 = _interopRequireDefault(_EntitySchema);

var _ArraySchema = require('./ArraySchema');

var _ArraySchema2 = _interopRequireDefault(_ArraySchema);

var _PolymorphicSchema = require('./PolymorphicSchema');

var _PolymorphicSchema2 = _interopRequireDefault(_PolymorphicSchema);

var _lodashLangIsObject = require('lodash/lang/isObject');

var _lodashLangIsObject2 = _interopRequireDefault(_lodashLangIsObject);

var _lodashLangIsEqual = require('lodash/lang/isEqual');

var _lodashLangIsEqual2 = _interopRequireDefault(_lodashLangIsEqual);

function defaultAssignEntity(normalized, key, entity) {
  normalized[key] = entity;
}

function visitObject(obj, schema, bag, options) {
  var _options$assignEntity = options.assignEntity;
  var assignEntity = _options$assignEntity === undefined ? defaultAssignEntity : _options$assignEntity;

  var normalized = {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var entity = visit(obj[key], schema[key], bag, options);
      assignEntity.call(null, normalized, key, entity);
    }
  }
  return normalized;
}

function visitArray(obj, arraySchema, bag, options) {
  var itemSchema = arraySchema.getItemSchema();

  var normalized = obj.map(function (childObj) {
    return visit(childObj, itemSchema, bag, options);
  });
  return normalized;
}

function visitPolymorphic(obj, polymorphicSchema, bag, options) {
  var baseSchema = polymorphicSchema.getBaseSchema();
  var entityMap = polymorphicSchema.getEntityMap();
  var typeAttribute = baseSchema.getTypeAttribute();

  var normalized = obj.map(function (childObj) {
    var type = childObj[typeAttribute];
    var itemSchema = entityMap[type];

    return { type: type, id: visit(childObj, itemSchema, bag, options) };
  });
  return normalized;
}

function mergeIntoEntity(entityA, entityB, entityKey) {
  for (var key in entityB) {
    if (!entityB.hasOwnProperty(key)) {
      continue;
    }

    if (!entityA.hasOwnProperty(key) || _lodashLangIsEqual2['default'](entityA[key], entityB[key])) {
      entityA[key] = entityB[key];
      continue;
    }

    console.warn('When merging two ' + entityKey + ', found unequal data in their "' + key + '" values. Using the earlier value.', entityA[key], entityB[key]);
  }
}

function visitEntity(entity, entitySchema, bag, options) {
  var entityKey = entitySchema.getKey();
  var idAttribute = entitySchema.getIdAttribute();
  var id = entity[idAttribute];

  if (!bag[entityKey]) {
    bag[entityKey] = {};
  }

  if (!bag[entityKey][id]) {
    bag[entityKey][id] = {};
  }

  var stored = bag[entityKey][id];
  var normalized = visitObject(entity, entitySchema, bag, options);
  mergeIntoEntity(stored, normalized, entityKey);

  return id;
}

function visit(obj, schema, bag, options) {
  if (!_lodashLangIsObject2['default'](obj) || !_lodashLangIsObject2['default'](schema)) {
    return obj;
  }

  if (schema instanceof _EntitySchema2['default']) {
    return visitEntity(obj, schema, bag, options);
  } else if (schema instanceof _ArraySchema2['default']) {
    return visitArray(obj, schema, bag, options);
  } else if (schema instanceof _PolymorphicSchema2['default']) {
    return visitPolymorphic(obj, schema, bag, options);
  } else {
    return visitObject(obj, schema, bag, options);
  }
}

function arrayOf(schema) {
  return new _ArraySchema2['default'](schema);
}

function arrayOfPolymorphic(schema, map) {
  return new _PolymorphicSchema2['default'](schema, map);
}

exports.Schema = _EntitySchema2['default'];

function normalize(obj, schema) {
  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  if (!_lodashLangIsObject2['default'](obj) && !Array.isArray(obj)) {
    throw new Error('Normalize accepts an object or an array as its input.');
  }

  if (!_lodashLangIsObject2['default'](schema) || Array.isArray(schema)) {
    throw new Error('Normalize accepts an object for schema.');
  }

  var bag = {};
  var result = visit(obj, schema, bag, options);

  return {
    entities: bag,
    result: result
  };
}