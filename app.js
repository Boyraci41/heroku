const app = require("express")()
const db = require("./db.json")
const bodyparser = require("body-parser")
const { urlencoded } = require("body-parser")

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended :true}))


app.get("/users",(req,res) => {
    res.send(200,db)
})
app.get("/users/:id",(req,res) => {
   let id =  req.params.id
   if(isNaN(id)){
        res.send(400,{
            message:"işlenemeyen verii..."
        })
   }else{
        let user = db.find(u => u.id = id)

        if(user){
            res.send(200,user)
        } else{
            res.send(404,{
                message : "NOT FOUND"
            })
        }
   }
})
app.post("/users",(req,res) => {
    const willSaveData = {
        id : new Date().getTime(),
        name : req.body.name,
        username : req.body.username
    }

    db.push(willSaveData)
    res.send(willSaveData);
})
app.patch("/users/:id",(req,res) => {
    let id =  req.params.id
    if(isNaN(id)){
         res.send(400,{
             message:"işlenemeyen verii..."
         })
    }else{
         let user = db.find(u => u.id = id)
 
         if(user){
             Object.keys(req.body).forEach(key =>{
                 user[key] = req.body[key];
             })
             res.send(200,user);
         } else{
             res.send(404,{
                 message : "NOT FOUND"
             })
         }
    }

})
app.delete,("/",(req,res) => {  let id =  req.params.id
    if(isNaN(id)){
         res.send(400,{
             message:"işlenemeyen verii..."
         })
    }else{
         let userIndex = db.findIndex(u => u.id = id)
 
         if(userIndex > -1){
             db.splice(userIndex,1)
             res.send(201,{
                 messsage :"No content"
             }
    
             )
         } else{
             res.send(404,{
                 message : "NOT FOUND"
             })
         }
    }})


app.listen(process.env.PORT || 3000, () =>{
    console.log("Sunucu Ayaktadır çalışıyor");
})
