import Http from '@desco/urano/plugins/Http'
import objectMap from '@desco/urano/functions/objectMap'
import objectFilter from '@desco/urano/functions/objectFilter'

class DefaultService {
  constructor(params = {}) {
    if (!params.entity) {
      console.error(`@desco/urano: Entity Model not defined for the service`)
    }

    this.entity = params.entity
    this.pkName = params.pkName || 'id'
  }

  Http () {
    return Http
  }

  read (id, params = {}) {
    const url = `${this.entity}/${id}`

    return Http.get(url, { params, }).then(resp => resp.data)
  }

  list (params = {}) {
    const url = `${this.entity}`

    return Http.get(url, { params, }).then(resp => resp.data)
  }

  save (data, params = {}) {
    if (data[this.pkName]) {
      return this.update(data, params)
    }
    else {
      return this.create(data, params)
    }
  }

  update (data, params = {}) {
    const url = `${this.entity}/${data[this.pkName]}`

    return Http.put(url, this.clean(data, params.clean), { params, }).then(resp => resp.data)
  }

  create (data, params = {}) {
    const url = `${this.entity}`

    return Http.post(url, this.clean(data, params.clean), { params, }).then(resp => resp.data)
  }

  delete (id) {
    const url = `${this.entity}/${id}`

    return Http.delete(url)
  }

  model () {
    console.error(`@desco/urano: Model not defined for the ${this.entity} service`)

    return {}
  }

  clean(data, list) {
    if (!list) return data

    return objectFilter(data, (v, k) => list.indexOf(k) === -1)
  }

  validatorRules() {
    const validRules = [ 'required', 'minLength', 'maxLength', 'email', 'sameAs' ]

    return objectMap(this.model(), field => {
      return objectFilter(field, (value, key) => validRules.indexOf(key) !== -1)
    })
  }
}

export default DefaultService
