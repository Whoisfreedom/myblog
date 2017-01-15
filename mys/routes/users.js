var express = require('express');
var router = express.Router();
var query = require('mysql1');
// var mysql      = require('mysql');
// var connection = mysql.createConnection({
// 	  host     : 'localhost',
// 	  user     : 'root',
// 	  password : '123456',
// 	  database : 'mysql'
// 	});
// 	connection.connect();
/* GET users listing. */
router.post('/', function(req, res, next) {
	// connection.connect();
	// connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
	//   if (err) console.log(err);

	//   console.log('The solution is: ', rows[0].solution);
	// });
	// connection.query('insert into test (name ,number,id) values ("wangbo",1200403121,2)');
	// connection.query("SELECT * FROM test", function selectTable(err, rows, fields){
	//  if (err){
	//   throw err;
	//  }
	//  if (rows){
	//  	for(var i = 0;i<rows.length;i++){
	//  		console.log(rows[i].name,rows[i].password,rows[i].id);
	//  	}
	//  	res.send(rows);
	//  }
	// });
	
});
router.post('/login', function(req, res, next) {

	console.log(req.body.port);
	console.log(req.body.password);
	var _port = req.body.port;
	var _password = req.body.password;
	query("SELECT * FROM test WHERE NAME ='"+ _port +"' AND PASSWORD ='"+ _password +"'", function selectTable(err, rows, fields){
	 if (err){
	  throw err;
	 }
	 if (rows.length){
	 	req.session.username=_port ;
		req.session.password=_password;
		req.session.myid = rows[0].id;
		// query("SELECT * FROM myarticle WHERE authorid ='"+ req.session.myid +"'",function selectTable(err, rows ,fields){
		// 	if (err){
	 // 			 throw err;
		// 	 }
		// 	if (rows.length){
		// 		console.log(rows);
		// 	}else{
		// 		console.log("没有文章");
		// 	}
		// })
	 	// console.log(req.session);
  	// 	console.log('you viewed this page ' + req.session.views['/'] + ' times')
	 	// console.log(rows[0].id);
	 	res.send({result:true})
	 }else{
	 	res.send({result:false});
	 }
	  // connection.end();
	});
});
router.post('/newLogin', function(req, res, next) {
	console.log(1111);
	console.log(req.body.registeredName);
	console.log(req.body.registeredPassword);
	var _port = req.body.registeredName;
	var _password = req.body.registeredPassword;
	query("SELECT * FROM test WHERE NAME ='"+ _port +"' AND PASSWORD ='"+ _password +"'", function selectTable(err, rows, fields){
	 if (err){
	  throw err;
	 }
	 if (rows.length){
	 	res.send({result:false});
	 	console.log("用户名重复");
	 	console.log(rows);
	 // 	req.session.username=_port ;
		// req.session.password=_password;
	 // 	console.log(req.session);
  // 		console.log('you viewed this page ' + req.session.views['/'] + ' times')
	 // 	console.log(rows);
	 }else{
	 	// connection.query("INSERT INTO TEST(name,password) values("+ _port +","+ _password +")", function selectTable(err, rows, fields){

	 	// }
	 	query("INSERT INTO TEST(name,password) values('"+ _port +"','"+ _password +"')", function selectTable(err, rows, fields){
			 if (err){
			  throw err;
			 }
			 if (rows){
			 	// res.send({result:false});
			 	console.log("用户名创建成功");
			 	// console.log(rows);
			 	req.session.username=_port ;
				req.session.password=_password;
			 // 	req.session.username=_port ;
				// req.session.password=_password;
			 // 	console.log(req.session);
		  // 		console.log('you viewed this page ' + req.session.views['/'] + ' times')
			 // 	console.log(rows);
			 	res.send({result:true});
			 	
			 }

	});
	 }
	 // connection.end();
	});
	
	
});

module.exports = router;
