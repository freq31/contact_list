const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/contacts_list_db');
const db=mongoose.connection;//connection is our db
db.on('error',console.error.bind(console,'error connecting to db'));
db.once('open',function(){
    console.log('succesfully connected to database');
});