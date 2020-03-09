const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()

// define paths for express config
const publicDirPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

// app.com
// app.com/help or ../about
// shortcuts for response and request

// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

// setup static directory to serve
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Khushi Rai'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Khushi Rai'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Khushi Rai',
        helpText:'This is some helpful text'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide an address'
        })
    }
    
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})
//     res.send({
//         forecast:'it is raining',
//         location:'Toronto',
//         address:req.query.address
//     })
// })

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'you must provide a search term!'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 help',
        name:'khushi',
        errorMessage:'help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'khushi',
        errorMessage:'Page not found'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})







// express will automatically stringify JSON and send it to requester

// app.get('/help',(req,res)=>{
//     res.send([{
//         name:'khushi'},
//         {
//         age:12
//     }])
// })

// // title and weather route

// app.get('/about',(req,res)=>{
//     res.send('<h1>Welcome to the Title page</h1>')
// })