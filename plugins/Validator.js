import { required, minLength, maxLength, email, sameAs } from 'vuelidate/lib/validators'

import objectMap from '@desco/urano/functions/objectMap'
import isArray from '@desco/urano/functions/isArray'

export default service => {
  const validators = objectMap(service.validatorRules(), data => {
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
