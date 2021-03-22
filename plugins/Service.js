import Http from '@desco/urano/plugins/Http'
import isObject from '@desco/urano/functions/isObject'
import isArray from '@desco/urano/functions/isArray'

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
}

export default DefaultService
