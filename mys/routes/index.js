var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.session.username);
  res.render('index', { title: '首页' ,
						user:req.session.username});
 
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: '登录' ,
						user:req.session.username});
});
router.get('/registered', function(req, res, next) {
  res.render('registered', { title: '注册' ,
							user:req.session.username});
});
router.get('/inLogin', function(req, res, next) {
  res.render('inLogin', { title: '登录成功',
  						user:req.session.username});
});
router.get('/loginOut', function(req, res, next) {
	//初始化session
	req.session.destroy(function(err){
	if(err) console.log("session重新初始化失败.");
	else console.log(req.session.username);
	});
  res.render('login', { title: '登录' ,
						user:0});
});
module.exports = router;
