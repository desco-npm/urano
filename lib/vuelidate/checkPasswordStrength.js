import { passwordStrength, } from '../../functions/checkPasswordStrength'
import { helpers, } from './'

export function checkPasswordStrength (minStrong) {
  const params = { type: 'passwordStrength', required: minStrong, }

  return helpers.withParams(params, (value) => {
    const strongs = [ 'Too weak', 'Weak', 'Medium', 'Strong', ]
    const strong = passwordStrength(value).value
    const strongKey = strongs.indexOf(strong)
    const isValid = strongKey >= minStrong

    params.strong = strongKey

    return isValid
  })
}

export default checkPasswordStrength