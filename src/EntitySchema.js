export default class EntitySchema {
  constructor(key, options = {}) {
    if (!key || typeof key !== 'string') {
      throw new Error('A string non-empty key is required');
    }

    this._idAttribute = options.idAttribute || 'id';
    this._key = key;
    if(options.typeAttribute) {
      this._typeAttribute = options.typeAttribute;
    }
  }

  getKey() {
    return this._key;
  }

  getIdAttribute() {
    return this._idAttribute;
  }

  getTypeAttribute() {
    return this._typeAttribute;
  }

  define(nestedSchema) {
    for (let key in nestedSchema) {
      if (nestedSchema.hasOwnProperty(key)) {
        this[key] = nestedSchema[key];
      }
    }
  }
}
