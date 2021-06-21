const express=require('express');
const path=require('path');
const port=8000;
const db=require('./config/mongoose');
const Contact=require('./models/contact');
const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
var contact_list=[
    {
        name:"abc",
        phone:"111111111"
    },
    {
        name:"ddf",
        phone:"a99999999999999"
    },
    {
        name:"ghui",
        phone:"87687797979"
    }

]


app.get('/',function(req,res){
    /*console.log(req);
    res.send('<h1>cool it is running</h1> ');
    */
   Contact.find({},function(err,contacts){
       if(err){
           console.log('error in fetching contacts from db');
           return;
       }
       return res.render('home',{
            title:"my contacts list",
            contactList:contacts
        });
   })
    
});
app.get('/practice',function(req,res){
    /*console.log(req);
    res.send('<h1>cool it is running</h1> ');
    */
    return res.render('practice',{title:"playing with ejs"});
});
app.get('/delete-contact',function(req,res){
    //get the id from query
    let id=req.query.id;
    // find the contact in the database in db and delete
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting from db');
            return;
        }
        return res.redirect('back');
    })
    /*console.log(req.query);
    let phone=req.query.phone;
    let contactindex=contact_list.findIndex(contact => contact.phone==phone);
    if(contactindex!=-1){
        contact_list.splice(contactindex,1);
    }
    return res.redirect('back');
    */
});
app.post('/create-contact',function(req,res){
    //console.log(req.body);
    //return res.redirect('/practice');
    //console.log(req.body.name);
    //console.log(req.body.phone);
    /*contact_list.push(
        {
            name:req.body.name,
            phone:req.body.phone
        }
    );*/
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){console.log('error in creating a contact');
        return;}
        console.log('****',newContact);
        return res.redirect('back');
    });

    //return res.redirect('/');
});


app.listen(port,function(err){
    if(err){
        console.log('Error in running the server',err);
    }
    console.log('server is running on port',port )
});