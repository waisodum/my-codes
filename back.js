//getting packages
const express =require('express');
const mongoose=require('mongoose');
const path=require('path');
const bodyParser = require("body-parser");
const app=express();
const port=80;
//connect to mongod
mongoose.connect('mongodb://127.0.0.1:27017/contact' ,{ useNewUrlParser: true , useUnifiedTopology: true });
//setting view engine
let imgpt=path.join(__dirname,'./static');
//path
app.set('view engine', 'pug');
//using static files 
app.use(express.static(imgpt));
//usingurlencoded
app.use(express.urlencoded({ extended: true }));
//preparing schema
 const contactSchema = new mongoose.Schema({
     name: String,
     email: String,
     phone: String,
     concern: String,
    
});
const Contact = mongoose.model('contact', contactSchema);
contactSchema.methods.onsave=()=>{
var save= "contact info of " + this.name +" is saved";
console.log(save);
}
app.get('/', (req, res) => {
res.render('elec.pug');
})
app.get('/accs',(req , res)=>{
    res.render('accs.pug');
})
app.get('/contact',(req , res)=>{
    res.render('contact.pug');
})
app.post('/submit',(req , res)=>{  
var data = req.body;
var mydata= new Contact(req.body);
mydata.save()
.then( ()=>{console.log(req.body);
    res.send('data is saved')} )
.catch(()=>{res.send('data was not saved')})
})

app.get('/data', (req, res) => {
    Contact.find({}, (err, result) => {
      if (err) {
        console.error('Error retrieving form data', err);
        return res.status(500).send('Internal Server Error');
      }
  
      res.json(result);
    });
  });
  







app.listen(port,()=>{
console.log(`the server has started at port ${port}`);
 })