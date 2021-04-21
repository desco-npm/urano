import Http from '@desco/urano/plugins/Http'
import objectMap from '@desco/urano/functions/objectMap'
import objectFilter from '@desco/urano/functions/objectFilter'

class DefaultService {
  constructor (params = {}) {
    this.entity = params.entity || this.constructor.name
  }

  Http () {
    return Http
  }

  read (id, params = {}) {
    const url = `CRUD/${this.entity}/${id}`

    return Http.get(url, { params, }).then(resp => resp.data)
  }

  list (params = {}) {
    const url = `CRUD/${this.entity}`

    return Http.get(url, { params, }).then(resp => resp.data)
  }

  save (data, params) {
    if (data.id) {
      return this.update(data, params)
    }
    else {
      return this.create(data, params)
    }
  }

  update (data, params = {}) {
    const url = `CRUD/${this.entity}`

    return Http.put(url, this.clean(data, params.clean)).then(resp => resp.data)
  }

  create (data, params = {}) {
    const url = `CRUD/${this.entity}`

    return Http.post(url, this.clean(data, params.clean)).then(resp => resp.data)
  }

  delete (id) {
    const url = `CRUD/${this.entity}/Delete`

    return Http.post(url, { data: { Id: id, }, })
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
