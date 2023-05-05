const { PORT } = require('./src/config/config')
const app = require('./src/app')

// Server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
