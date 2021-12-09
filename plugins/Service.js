import { getHttp, } from '@desco/urano/plugins/Http'
import objectFilter from '@desco/urano/functions/objectFilter'

class DefaultService {
  constructor(params = {}) {
    if (!params.entity) {
      console.error(`@desco/urano: Entity Model not defined for the service`)
    }

    this.prefix = params.prefix || ''
    this.entity = params.entity
    this.pkName = params.pkName || 'id'
    this.staticData = params.staticData
  }

  Http () {
    return getHttp()
  }

  read (id, params = {}, options = {}) {
    if (this.isStatic()) {
      return this.staticRead(id, params)
    }

    const url = this.mountUrl('{prefix}{entity}/{id}', options.url)

    if (typeof id === 'object') {
      const [ [ idProp, idValue, ], ] = Object.entries(id)

      params[idProp] = idValue
    }


    return this.Http().get(url, { params, })
      .then(resp => resp.data)
  }

  staticRead (id, params) {
    if (!this.isStatic()) return Promise.revolve(null)

    return Promise.resolve(this.staticData.filter(i => i.Id === id)[0])
  }

  list (params = {}, options = {}) {
    if (this.isStatic()) {
      return this.staticList(params)
    }

    const url = this.mountUrl('{prefix}{entity}', options.url)

    return this.Http().get(url, { params, })
      .then(resp => resp.data)
  }

  staticList (params) {
    if (!this.isStatic()) return Promise.revolve(null)

    return Promise.resolve(this.staticData)
  }

  async save (data, params = {}, options = {}) {
    if (data[this.pkName]) {
      try {
        this.update(data, params, options)
      }
      catch(e) {
        console.log(e)
      }
      return this.update(data, params, options)
    }
    else {
      return this.create(data, params, options)
    }
  }

  update (data, params = {}, options = {}) {
    if (this.isStatic()) return Promise.reject(null)

    const url = this.mountUrl('{prefix}{entity}/{id}', options.url)

    return this.Http().put(url, this.clean(data, params.clean), { params, })
      .then(resp => resp.data)
  }

  create (data, params = {}, options = {}) {
    if (this.isStatic()) return Promise.reject(null)

    const url = this.mountUrl('{prefix}{entity}', options.url)

    return this.Http().post(url, this.clean(data, params.clean), { params, })
      .then(resp => resp.data)
  }

  delete (id, options = {}) {
    if (this.staticData) return Promise.reject(null)

    const url = this.mountUrl('{prefix}{entity}/{id}', options.url)

    return this.Http().delete(url, { data: { Id: id, }, })
  }

  model () {
    console.error(`@desco/urano: Model not defined for the ${this.entity} service`)

    return {}
  }

  clean (data, list) {
    if (!list) return data

    return objectFilter(data, (v, k) => list.indexOf(k) === -1)
  }

  mountUrl (nativeUrl, url, params = {}) {
    return (url || nativeUrl)
      .replace('{prefix}', this.prefix)
      .replace('{entity}', this.entity)
      .replace('{id}', params.id)
  }

  isStatic () {
    return !!this.staticData
  }
}

export default DefaultService
