import percent from 'percent-value'

function of (p, v) {
  return percent(p).from(v)
}

function rest (p, v) {
  return v - of(p, v)
}

export default { of, rest, }