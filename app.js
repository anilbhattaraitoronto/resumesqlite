if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express')
const app = express();
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser');

//import routes

const indexRouter = require('./routes/index')
const educationRouter = require('./routes/education')
const projectsRouter = require('./routes/projects')
const aboutRouter = require('./routes/about')
const blogsRouter = require('./routes/blogs')

//set app parameters

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))


app.use('/', indexRouter)
app.use('/education', educationRouter)
app.use('/projects', projectsRouter)
app.use('/about', aboutRouter)
app.use('/blogs', blogsRouter)




app.listen(process.env.PORT || 3000)