const express= require("express");
const app = express();
const methodOverride = require('method-override');
const port = process.env.PORT || 8080;


const path = require("path");
app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,"public")));

const { v4 : uuidv4 } =require('uuid');
 // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

let posts=[{ 
      id:uuidv4(),
     username:"arunnaik",
     quote:"just take a step",
      content:"this not a show its a life you need to live..",
},
{   id:uuidv4(),
    username:"rohith",
    quote:"you are not a common man",
    content:"this is not a easy content you need to update..",
},
{    id:uuidv4(),
    username:"gokul",
    quote:"fun song",
    content:"killa killa navutundi chudu milla mila tara",

},
];

app.get("/post",(req,res)=>{
res.render("posts.ejs",{posts})
});

app.get("/post/new",(req,res)=>{
    res.render("user.ejs");

});

app.post("/post",(req,res)=>{
    let {username,quote,content}=req.body;
    let id= uuidv4();
    posts.push({id,username,quote,content});
     res.redirect("/post");
})

app.get("/post/:id",(req,res)=>{
    let{ id }=req.params;
    let post=posts.find((p)=>id===p.id);
   res.render("new.ejs",{post});
  
})

app.patch("/post/:id",(req,res)=>{
    let{ id }=req.params;
     let newContent=req.body.content
    let post=posts.find((p)=>id===p.id);
    post.content=newContent;
   console.log(post);
   res.redirect("/post");
  
  
})
app.get("/post/:id/edit",(req,res)=>{
     let{ id }=req.params;
      let post=posts.find((p)=>id===p.id);
       res.render("edit.ejs",{post});
})


app.delete("/post/:id",(req,res)=>{
    let{ id }=req.params;
    posts=posts.filter((p)=>id !==p.id);
 res.redirect("/post");
  
})

app.listen(port,()=>{
    console.log("listening to port 8080");
});
