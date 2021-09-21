export default {
  methods: {
    getCurrentPosition (options = {}) {
      return new Promise((resolve, reject) => {
        const success = p => resolve(p)
        const error = e => reject(e)

        navigator.geolocation.getCurrentPosition(success, error, options)
      })
    },
  },
}
