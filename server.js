const app = require('./app.js')

app.set('port', 3000)
app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
});

