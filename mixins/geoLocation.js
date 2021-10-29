export default {
  methods: {
    getPositionGPS (options = {}) {
      return new Promise((resolve, reject) => {
        const success = p => resolve(p)
        const error = e => reject(e)

        navigator.geolocation.getCurrentPosition(success, error, options)
      })
    },
    watchPositionGPS (onSuccess, onError = () => {}, params = {}) {
      navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 60000, ...params, })
    }
  },
}
