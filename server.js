const { PORT } = require('./src/configs/general.config')
const app = require('./src/app')

// Server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
