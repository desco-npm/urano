export default {
  methods: {
    takePicture (options = {}) {
      return new Promise((resolve, reject) => {
        const success = p => resolve(p)
        const error = e => reject(e)

        try {
          navigator.camera.getPicture(success, error, {
            destinationType: navigator.camera.DestinationType.DATA_URL,
            ...options,
          })
        }
        catch (e) {
          error(e)
        }
      })
    },
  },
}
