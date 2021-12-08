import isObject from 'is-object';

export default {
  mixins: [
    require('../../mixins/watch/model').default,
  ],
  props: {
    service: Object,
    name: String,
    params: { type: Object, default: () => ({}) },
    validation: Object,
  },
  computed: {
    field () {
      return this.service.model()[this.name]
    },
    attrs () {
      const attrs = {
        ...this.service.model()[this.name],
        ...this.params,
      };

      if(this.element === 'select') {
        attrs.remoteMethod = attrs.remoteMethod || (() => {})
        attrs.filterMethod = attrs.filterMethod || (() => {})
      }
      else if (this.element === 'password') {
        if (
          this.validation[this.name] &&
          this.validation[this.name].$params.passwordStrength &&
          this.validation[this.name].$params.passwordStrength.required >= 0
        ) {
          attrs.strengthRequired = this.validation[this.name].$params.passwordStrength.required
          attrs.strength = this.validation[this.name].$invalid
            ? this.validation[this.name].$params.passwordStrength.strong
            : attrs.strengthRequired
        }
      }

      return attrs
    },
    element () {
      if (!this.field.type && !this.params.type) return 'string'

      switch ((this.params.type || this.field.type).toLowerCase()) {
        case 'string':
          return 'string'
        case 'text':
          return 'text'
        case 'password':
          return 'password'
        case 'email':
          return 'email'
        case 'date':
          return 'date'
        case 'texteditor':
          return 'texteditor'
        case 'imageupload':
          return 'imageupload'
        case 'select': 
          return 'select'
        case 'boolean': 
        case 'toogle': 
        case 'switch': 
          return 'switch'
        case 'iconpicker': 
          return 'iconpicker'
        case 'autocomplete':
          return 'autocomplete'
        case 'number':
          return 'number'
        case 'tag':
          return 'tag'
        default: {
          if (typeof this.field.type === 'string') {
            return this.field.type.toLowerCase()
          }
          else {
            return this.field.type
          }
        }
      }
    },
  },
  methods: {
    setTouched () {
      this.touched = true

      this.$emit('touched')
    },
  },
}