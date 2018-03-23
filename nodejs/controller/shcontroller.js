var bodyparser = require('body-parser');
var mongoose = require('mongoose');
//Connect to the ServiceHub DataBase on MLAB
var mongoDB ='mongodb://fyp2018:fyp2018@ds161146.mlab.com:61146/servicehub';
mongoose.connect  (mongoDB,{
	useMongoClient:true
});
var db =mongoose.connection;
//console.log('connection established');
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//Schema for the Labourdata collection
var ldschema = new mongoose.Schema({
 name: String,
 _id:Number, 
 phone_no:Number,
 category:String,
  Area:String,
});
//collection "Labourdata" creation
var Labourdata = mongoose.model('Labourdata',ldschema);
//console.log('collection created');
var urlencodedparser =bodyparser.urlencoded({extended:false});
//rendering all views 
module.exports = function(app){
	app.get('/',function(req,res){
	res.render('index');
	});
	app.get('/index.html',function(req,res){
	res.render('index');
	});
	app.get('/register.html',function(req,res){
	res.render('register');
	});
	app.get('/plumber.html',function(req,res){
	res.render('plumber');
	});
	app.get('/carpenter.html',function(req,res){
	res.render('carpenter');
	});
	app.get('/electrician.html',function(req,res){
	res.render('electrician');
	});
	app.get('/painter.html',function(req,res){
	res.render('painter');
	});
	app.get('/delete',function(req,res){
	res.render('delete');
	});
	//saving data into the database
	app.post('/register.html',urlencodedparser,function(req,res){
		new Labourdata ({
			name:req.body.name,
			_id:req.body.cnic,
			phone_no:req.body.contact_no,
			Area:req.body.Area,
		    category:req.body.category}).save(function(err,data){
			if (err)
		     res.json(err);
			
			else			
			res.redirect('/register.html');
		   
		});
	});
//search for plumber in an area
	 app.get('/plumber.html/table',function(req,res){
		Labourdata.find({Area:req.query.Area,category:'PLUMBER'} , function(err,data){
		if (err) res.json(err);
		else
	res.render('table',{labours:data});
	
	});
	});
	//search for electrician in an area
		app.get('/electrician.html/table',function(req,res){
		Labourdata.find({Area:req.query.Area,category:'ELECTRICIAN'} , function(err,data){
		if (err) res.json(err);
		else
	res.render('table',{labours:data});
	});
	});
	//search for carpenter in an area
		app.get('/carpenter.html/table',function(req,res){
		Labourdata.find({Area:req.query.Area,category:'CARPENTER'} , function(err,data){
		if (err) res.json(err);
		else
	res.render('table',{labours:data});
	});
	});
	//search for painter in an area
		app.get('/painter.html/table',function(req,res){
		Labourdata.find({Area:req.query.Area,category:'PAINTER'} , function(err,data){
		if (err) res.json(err);
		else
	res.render('table',{labours:data});
	});
	});
	//delete a record
       app.get('/deleterecord',function(req,res){
		Labourdata.remove({_id:req.query.cnic},function(err){
			if (err) res.json(err);
			else
				res.redirect('/delete');
		});
	});
	
			
	
	
};