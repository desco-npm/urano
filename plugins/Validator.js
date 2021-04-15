import { required, minLength, maxLength, email, sameAs } from 'vuelidate/lib/validators'

import objectMap from '@desco/urano/functions/objectMap'
import objectFilter from '@desco/urano/functions/objectFilter'
import isArray from '@desco/urano/functions/isArray'

export default (service, params = {}) => {
  const { only, remove, } = params

  const originalValidatorRules = service.validatorRules()
  
  const onlyValidatorRules = !only
    ? undefined
    : objectFilter(originalValidatorRules, (rule, name) => {
      return only.indexOf(name) !== -1
    })
  
  const removeValidatorRules = !remove
    ? undefined
    : objectFilter(originalValidatorRules, (rule, name) => {
      return remove.indexOf(name) === -1
    })
  
  const validatorRules = onlyValidatorRules || removeValidatorRules  || originalValidatorRules

  const validators = objectMap(validatorRules, data => {
    if (data.required) {
      data.required = required
    }

    if (data.minLength) {
      data.minLength = minLength(data.minLength)
    }

    if (data.maxLength) {
      data.maxLength = maxLength(data.maxLength)
    }

    if (data.email) {
      data.email = email
    }

    if (data.sameAs) {
      data.sameAs = sameAs(isArray(data.sameAs) ? data.sameAs[0] : data.sameAss)
    }

    return data
  })

  return validators
}
