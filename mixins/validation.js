import isArray from '@desco/urano/functions/isArray'
import objectMap from '@desco/urano/functions/objectMap'
import objectFilter from '@desco/urano/functions/objectFilter'

export default {
  methods: {
    getValidations (Service, params = {}) {
      if (params.only) {
        var model = this.getValidateOnlyFields(Service, params.only)
      }
      else if (params.ignore) {
        var model = this.getValidateIgnoreFields(Service, params.ignore)
      }
      else {
        var model = Service.model()
      }

      return objectMap(model, fieldData => {
        return objectMap(fieldData.validations, validation => {
          return isArray(validation) ? validation[0] : validation
        })
      })
    },
    getValidateOnlyFields (Service, onlyFields) {
      const model = Service.model()
      const fields = !isArray(onlyFields) ? Object.keys(onlyFields) : onlyFields

      return objectFilter(model, (fieldData, fieldName) => fields.indexOf(fieldName) !== -1)
    },
    getValidateIgnoreFields (Service, ignoreFields) {
      const model = Service.model()
      const fields = !isArray(ignoreFields) ? Object.keys(ignoreFields) : ignoreFields

      return objectFilter(model, (fieldData, fieldName) => fields.indexOf(fieldName) === -1)
    }
  },
}