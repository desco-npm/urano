const dataWatchPositionGPS = {}

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
      return navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 60000, ...params, })
    },
    clearWatchPositionGPS (id) {
      navigator.geolocation.clearWatch(id)
    },
    async suspendWatchPositionGPSWhile (id, fun) {
      const { onSuccess, onError, params, } = dataWatchPositionGPS[id]

      this.clearWatch(id)

      await fun()

      this.watchPositionGPS(onSuccess, onError, params)
    }
  },
}