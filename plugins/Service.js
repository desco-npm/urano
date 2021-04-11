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

  read (id) {
    const url = `CRUD/${this.entity}/?Id=${id}`

    return Http.get(url).then(resp => resp.data)
  }

  list (params = {}) {
    const url = `CRUD/${this.entity}`

    return Http.get(url, { params, }).then(resp => resp.data)
  }

  save (data) {
    if (data.id) {
      return this.update(data)
    }
    else {
      return this.create(data)
    }
  }

  update (data) {
    const url = `CRUD/${this.entity}`

    return Http.put(url, data).then(resp => resp.data)
  }

  create (data) {
    const url = `CRUD/${this.entity}`

    return Http.post(url, data).then(resp => resp.data)
  }

  delete (id) {
    const url = `${this.entity}/Delete`

    return Http.post(url, { data: { Id: id, }, })
  }

  model () {
    console.error(`@desco/urano: Model not defined for the ${this.entity} service`)

    return {}
  }

  validatorRules() {
    const validRules = [ 'required', 'minLength', 'maxLength', 'email', 'sameAs' ]

    return objectMap(this.model(), field => {
      return objectFilter(field, (value, key) => validRules.indexOf(key) !== -1)
    })
  }
}

export default DefaultService
