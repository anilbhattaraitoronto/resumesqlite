if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express')
const app = express();
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser');

const dbSchema = require('./databases/dbtables/dbSchema')

//sqlite database
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./databases/resumedb.sqlite', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message)
        return
    }
    console.log("Connected to resumedb SQlite database");
});
//create database tables/execute dbSchema
db.exec(dbSchema, (err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log('tables are created')
})
//close database
if (process.env.NODE_ENV !== 'production') {


    db.close((err) => {
        if (err) {
            console.log(err)
            return
        }
        console.log('Database is closed.')
    })
}
//import routes

const indexRouter = require('./routes/index')
const educationRouter = require('./routes/education')
const projectsRouter = require('./routes/projects')
const aboutRouter = require('./routes/about')
const blogsRouter = require('./routes/blogs')
const skillsRouter = require('./routes/skils')

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
app.use('/skills', skillsRouter)




app.listen(process.env.PORT || 3000)