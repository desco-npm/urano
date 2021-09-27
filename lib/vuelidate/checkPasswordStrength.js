import { passwordStrength, } from '../../functions/checkPasswordStrength'

export function checkPasswordStrength (minStrong) {
  return value => {
    const strongs = [ 'Too weak', 'Weak', 'Medium', 'Strong', ]
    const strong = passwordStrength(value).value
    const strongKey = strongs.indexOf(strong)
    const isValid = strongKey >= minStrong

    return isValid
  }
}

export default checkPasswordStrength