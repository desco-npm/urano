import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import toCamelCase from 'camelcase'

Vue.component('font-awesome-icon', FontAwesomeIcon)

export default icons => {
  icons.map(icon => {
    if (icon === 'fas') {
      library.add(fas)
    }
    else if (icon === 'fab') {
      library.add(fab)
    }
    else {
      icon = icon.split(' ')
      icon[1] = toCamelCase(icon[1])

      switch (icon[0]) {
        case 'fas': library.add(fas[icon[1]])
          break
        case 'fab': library.add(fab[icon[1]])
      }

      console.log(fab[icon[1]])
    }
  })
}