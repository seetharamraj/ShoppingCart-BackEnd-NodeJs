var express=require('express');
var router=express.Router();
var Book=require('../models/dataSchema');
var Mobile=require('../models/mobileSchema');
var multer = require('multer');
var User = require('../models/user');
var passport = require('passport');
var cartdatabase=require('../models/cartitem');

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
  };
  const fs = require('fs');


  const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        console.log('in storage');
        const isValid = MIME_TYPE_MAP[file.mimetype];
        console.log('in storage' + file);
        let error = new Error("Invalid mime type");
        if (isValid) {
          error = null;
        }
        console.log('in storage');
        cb(error, "public/images");
      },
      filename: (req, file, cb) => {
        const name = file.originalname
          .toLowerCase()
          .split(" ")
          .join("-");
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
      }
    });

var upload = multer({storage: storage});
// var upload = multer({storage: storage});
router.post('/createImage',upload.single('image'),(req,res,next)=>
{  
   // console.log("coming ...");
    console.log("--------------------");
    console.log("this-----"+req.body.title);
  const url = req.protocol + "://" + req.get("host");
  var a= url + "/images/" + req.file.filename;
  console.log("heloo");
   console.log(a);

    var book = new Book(
        {
            title:req.body.title,
            price:req.body.price,
            author:req.body.author,
            bookDesc:req.body.bookDesc,
            image:a
        });
        addToprodDB(req,res,a);
        console.log(book);
        try{
          console.log('in adding to database pod')
          console.log(book.body)
          doc1= book.save();
          console.log(doc1);
          return res.status(201).json(doc1);
        }
        catch(err)
        {
        return releaseEvents.status(501).json(err);
        }

    // newBook.save((err,book)=>
    // {
    // if(err)
    //     res.status(500).json({errmsg:err});
    //     console.log(book);
    // res.status(200).json({msg:book});
    
    // });


});
async function addToprodDB(req,res,a){
  
  var book=new Book({
  title:req.body.title,
        price:req.body.price,
        author:req.body.author,
        bookDesc:req.body.bookDesc,
        image:a
  });
console.log(book)
try{
  console.log('in adding to database pod')
  console.log(book.body)
  doc1=await book.save();
  console.log(doc1);
  return res.status(201).json(doc1);
}
catch(err)
{
return releaseEvents.status(501).json(err);
}
}

router.post('/create/mobiles',upload.single('image'),(req,res,next)=>
{  
    console.log("heloo");
    console.log("--------------------");
    console.log("this-----"+req.body.name);
  const url = req.protocol + "://" + req.get("host");
  var a= url + "/images/" + req.file.filename;
  console.log("heloo");
   console.log(a);
    var newMobile = new Mobile(
        {
            name:req.body.name,
            price:req.body.price,
            ram:req.body.ram,
            mobileDesc:req.body.mobileDesc,
            image:a

        });
        addToDB(req,res,a);
        console.log(newMobile);
        try{
          console.log('in adding to database pod')
          console.log(newMobile.body)
          doc1= newMobile.save();
          console.log(doc1);
          return res.status(201).json(doc1);
        }
        catch(err)
        {
        return releaseEvents.status(501).json(err);
        }

});
async function addToDB(req,res,a){
  
  var newMobile=new Mobile({
  name:req.body.name,
        price:req.body.price,
        ram:req.body.ram,
        mobileDesc:req.body.mobileDesc,
   image:a
  });
console.log(newMobile)
try{
  console.log('in adding to database pod')
  console.log(newMobile.body)
  doc1=await newMobile.save();
  console.log(doc1);
  return res.status(201).json(doc1);
}
catch(err)
{
return releaseEvents.status(501).json(err);
}
}

router.get('/read/books',(req,res,next)=>
{
    console.log("hello");
    Book.find({},(err,books)=>
    {
        if(err)
            res.status(500).json({errmsg:err});  
        res.status(200).json({msg:books});
    });
});
router.get('/read/mobiles',(req,res,next)=>
{
    console.log("hello");
    Mobile.find({},(err,mobiles)=>
    {
        if(err)
            res.status(500).json({errmsg:err});  
        res.status(200).json({msg:mobiles});
    });
});
router.delete('/delete/:id',(req,res,next)=> {
  Book.findOneAndRemove({_id:req.params.id},(err,book)=>{
         if(err)
            res.status(500).json({errmsg : err});

         res.status(200).json({msg : book});
  })
 // res.status(200).json({msg:'delete request is working'});
});
// router.post('/login',(req,res,next)=>
// {
//     console.log("hello");
//     console.log("hello");
//     User.find({},(err,users)=>
//     {
//         if(err)
//             res.status(500).json({errmsg:err});  
//         res.status(200).json({msg:users});
//     });
    
// });
router.post('/login/:p1/:p2',function(req,res,next){
  console.log('hiii');
      console.log(req.params.p1);
      // console.log(req.body.password);
      // emails='"'+req.params.p1+'\"';
      // emails='\'+emails;
      // passwords='\"'+req.params.p2+'\"';
      // console.log(emails);
      // console.log(passwords);
      email=req.params.p1;
      password=req.params.p2;
      User.findOne({email,password},(err,result)=>{
        console.log(result);
          if(err)
          res.status(500).json({errmsg:err});
          res.status(200).json({msg:result});
      })
    });
router.post('/register/:p1/:p2/:p3',(req,res,next)=>
{
  console.log("heloo");
  console.log(req.params.p1)
  var newUser = new User(
      {
          email:req.params.p1,
          username:req.params.p2,
          password:req.params.p3,
      });
  newUser.save((err,user)=>
  {
  if(err)
      res.status(500).json({errmsg:err});
      console.log(user);
  res.status(200).json({msg:user});
  
  });
});











router.post('/addtocart/:p1/:p2/:p3/:p4/:p5',function(req,res,next){
  console.log('==in users add to cart');
 console.log(req.params.p1);
 console.log(req.params.p2);
 console.log(req.params.p3);
 console.log(req.params.p4);
 console.log(req.params.p5);
 var a={};
 a={t:req.params.p5};
 console.log(JSON.stringify(req.params.p5));
 console.log(a.t);
 console.log(req.body);


 console.log(req.body.price+".....name."+typeof(req.body.price)+"mmmmmmmmmmm"+typeof(parseInt(req.body.price)))
 console.log('----body---'+JSON.stringify(req.body))

 someFunction(req.params.p4,req.params.p3,req.params.p1,req.params.p2,req.body.image) ;

 function someFunction(us,id,title,price,image) {
  cartdatabase.findOne({ User: us }, function(err, document) {
    if (document) {
      i=0;
      this.totalQuantity++;
      this.totalPrice=this.totalPrice+parseInt(price);
      
        document.prodata.push({
          id: id,
          title: title,
          image: image,
          price: parseInt(price),
          quantity: 1,
          totalPrice:parseInt(price),
  
        })
  
      
      document.save(function(err) {
        err != null ? console.log(err+"nnnnnnnnnn") : console.log('Data updated')
      })
      
    }
    else{
      console.log('in else')
var cd=new cartdatabase({
  totalQuantity:1,
  totalPrice:parseInt(price),
  User:us,
  prodata:[{id: id,
    title: title,
    image: image,
    price: parseInt(price),
    quantity: 1,
    totalPrice:parseInt(price),


  }]


})
      cd.save()
    }
  })
}

 
return res.status(200).json({msg:"added sucessfully"});
});




router.get('/getcartitems',function(req,res,next){
console.log("--d----d-d--d-");
  cartdatabase.find({},(err,cart)=>{
    console.log(cart);
    if(err)
        res.status(500).json({errmsg:err});
    res.status(200).json({msg:cart});
});

 } );

 router.put('/update',(req,res,next)=>{

  cartdatabase.findById(req.body._id,(err,cart) =>
  {
      if(err)
          res.status(500).json({errmsg:err});
      cart.name=req.body.name;
      cart.capital=req.body.capital;
      cart.save((err,country)=>
      {
          //res.status(500).json({errmsg:err});
          res.status(200).json({msg:cart});
      });

  });
  //res.status(200).json({msg:'put request is working'});
});



router.put('/updatecart',function(req,res,next){
  console.log('==in users update  cart');
 
 someFunction(req.body) ;

 function someFunction(updateddata) {
   console.log('3333333'+JSON.stringify(updateddata))

   var cc=new cartdatabase(updateddata);
  cartdatabase.update( {_id:updateddata._id} ,updateddata,function(err, document){
    if(document)
    {
   
    cc.save((err,document)=>
    {
        
        console.log('im here')
    });
    }
    else{
      console.log('in else')
    }

  }
  )
}

return res.status(200).json({msg:"updated sucessfully"});
});

router.delete('/deleting/:id',(req,res,next)=>{
  console.log("id is"+req.params.id)
  cartdatabase.findByIdAndDelete(req.params.id,(err,doc)=>{
      if(err)
         {
           console.log('im in del if')
         }
  })
  res.status(200).json({msg:'delette request is working'});
});
 


module.exports = router;