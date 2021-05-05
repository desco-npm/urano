import moment from '@desco/urano/functions/moment'

export default class Formatter {
  constructor (service) {
    this.service = service
  }

  enum (field, value) {
    return this.service.model()[field].options[value]
  }

  dateBr(value) {
    return moment(value).format('DD/MM/YYYY')
  }
}