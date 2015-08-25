import isObject from 'lodash/lang/isObject';

export default class PolymorphicSchema {
  constructor(baseSchema, entityMap) {
    if (!isObject(baseSchema)) {
      throw new Error('PolymorphicSchema requires baseSchema to be an object.')
    }
    if (!isObject(entityMap)) {
      throw new Error('PolymorphicSchema requires an entityMap object.');
    }

    this._baseSchema = baseSchema;
    this._entityMap = entityMap;
  }

  getBaseSchema() {
    return this._baseSchema;
  }

  getEntityMap() {
    return this._entityMap;
  }
}
