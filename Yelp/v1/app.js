var express=require('express');
var app=express();
var bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');



var campgrounds=[
        {name: 'Mark', image:"https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg"},
        {name: 'Creek', image:"https://farm7.staticflickr.com/6014/6015893151_044a2af184.jpg"},  
        {name: 'Mountain', image:"https://farm8.staticflickr.com/7042/7121867321_65b5f46ef1.jpg"}   
    ];
    
app.get('/', function(req,res){
   res.render('landing');
});

app.get('/campgrounds',function(req,res){
   
    res.render('campgrounds', {campgrounds:campgrounds});
});

app.post('/campgrounds', function(req,res){
   var name=req.body.name;
   var image=req.body.image;
   var newCampground={name:name, image:image};
   campgrounds.push(newCampground);
   res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req, res){
   res.render('new.ejs'); 
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log('started!'); 
});