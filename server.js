const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.listen(8000,() => {
    console.log('server started at port 8000')
})

app.use(cors({
    origin:'*'
}))
app.get('/mobiles',(req,res)=>{
    db.getMobiles()
    .then((mobiles)=>{
        res.send(mobiles)
    })

    .catch((err)=>{
        res.send(err)
    })
})

app.post('/mobiles',(req,res)=>{
    db.addMobiles(req.body.name,req.body.price,req.body.ram,req.body.storage)
    .then(()=>{
        res.send(req.body)
    })
    .catch((err)=>{
        res.send(err)
    })
})

app.delete('/mobiles/:id',(req,res)=>{
    let id =+ req.params.id;
    db.deleteMobile(id)
    .then(()=>{
        res.send('deleted')
    })
    .catch((err)=>{
        res.send(err)
    })
})