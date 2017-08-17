var express=require('express');
var app=express();
var bodyParser=require("body-parser");
var mongoose=require('mongoose');


mongoose.connect('mongodb://localhost/yelp_camp', { useMongoClient: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var campgroundSchema= new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create(
//     {
//         name: 'Salmon Creek',
//         image: 'https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg',
//         description: 'This one is great! I like it. No fun for old people.'
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         }else{
//             console.log(campground);
//         }
//     });


    
app.get('/', function(req,res){
   res.render('landing');
});

app.get('/campgrounds',function(req,res){
   Campground.find({}, function(err, allcampgrounds){
      if(err){
          console.log(err);
      } else{
          res.render('index', {campgrounds:allcampgrounds})
      }
   });
});

app.post('/campgrounds', function(req,res){
   var name=req.body.name;
   var image=req.body.image;
   var desc=req.body.description;
   var newCampground={name:name, image:image, description:desc};
   Campground.create(newCampground, function(err, newlyCreated){
      if(err){
          console.log(err);
      } else{
          res.redirect('/campgrounds');
      }
   });
   
});

app.get('/campgrounds/new', function(req, res){
   res.render('new.ejs'); 
});

app.get('/campgrounds/:id', function(req,res){
   Campground.findById(req.params.id, function(err,foundCampground){
      if(err){
          console.log(err);
      } else{
          res.render('show',{campground: foundCampground});
      }
   });
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log('started!'); 
});