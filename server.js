var express=require("express");
var body=require("body-parser");
var file=require("fs");
var app=express();

app.use(express.static('static'));

// for post access
app.use(body.urlencoded({ extended: false }));
app.use(body.json());



app.get('/',function(req,res){
	res.sendFile(__dirname+"/static/html/client.html");
})
app.post('/login',function(req,res){

file.open(__dirname+'/static/json/userdata.json', 'a+', function(err, fd){
  if (err) throw err;
  console.log("file opened : "+fd);
});


file.readFile(__dirname+'/static/json/userdata.json','utf8', function(err, data){
  if (err) throw err;
  var obj=JSON.parse(data);
});
var dt=JSON.stringify({name:req.body.username,pass:req.body.pass});
file.appendFile(__dirname+'/static/json/userdata.json',dt,'utf8',function(err){
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});


	res.send("logged in as "+req.body.username);
	console.log(req.body.username);
})
app.listen(3000);
console.log("Server is listening to port:3000");