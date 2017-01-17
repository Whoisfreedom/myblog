var express = require('express');
var router = express.Router();
var query = require('mysql1');
/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.session.username);
  res.render(
  	'index', 
  	{ 
  		title: '首页' ,
		user:req.session.username
	}
  );
});
router.get('/login', function(req, res, next) {
  res.render(
  	'login', 
  	{ 
  		title: '登录' ,
		user:req.session.username,
		clk : true,
	}
  );
});
router.get('/registered', function(req, res, next) {
  res.render(
  	'registered', 
  	{
	  	title:'注册',
		user:req.session.username
	}
  );
});
router.get('/inLogin', function(req, res, next) {
  res.render(
  	'inLogin',
  	{
  		title: '登录成功',
  		user:req.session.username
  	}
  );
});
router.get('/loginOut', function(req, res, next) {
	//初始化session
	req.session.destroy(function(err){
		if(err) console.log("session重新初始化失败.");
		else console.log("初始化成功");
	});
 	res.render(
 	 	'index', 
 	 	{ 
 	 		title: '登录' ,
			user:0
		}
	);
});
router.get('/userblog', function(req, res, next) {

  if(!req.session.myid || req.session.myid=='underfined'){
  	console.log("没有登录");
  	res.render(
  	'login',
  	{
  		title: '登录',
  		user:req.session.username,
  		clk : false,
  	}
  	);
  }else{
    var eachPage = 10;
    var page = parseInt(req.query.page);
    console.log(req.query.page);
  	console.log("登录了");
  	var myblog = [];
    var myArticleId = [];
  query("SELECT count(*) FROM myarticle WHERE authorid ='"+ req.session.myid +"'",function selectTable(err, rows ,fields){
			if (err){
	 			 throw err;
			 }
			if (rows){
        var from = (page-1)*eachPage;
        var maxNum = rows[0]['count(*)'];
				var maxPage = Math.ceil(maxNum/eachPage);
        query("SELECT * FROM myarticle WHERE authorid ='"+ req.session.myid +"' LIMIT "+from+","+eachPage,function selectTable(err, rows ,fields){
          if(err){
            throw err;
          }
          if(rows.length){
            console.log(rows);
              for(var i = 0;i<rows.length;i++){
              myblog.push(rows[i].title);
              myArticleId.push(rows[i].id);
              console.log(myblog);
            }
            res.render(
              'userblog',
              {
                title: '我的博客',
                user:req.session.username,
                blog1:myblog,
                art:myArticleId,
                page:page,
                maxPage:maxPage
              }
            ); 
          }else{
        console.log("没有文章");
        res.render(
          'userblog',
          {
            title: '我的博客',
            user:req.session.username,
            blog1:myblog,
            art:myArticleId,
            page : 1,
            maxPage:1
              }
            );
          }
                   
        });
		
        
			}
		})  
  }
});
router.get('/article', function(req, res, next) {
  var articleId = req.query.id;
  console.log(articleId);
  console.log(1);
  query("SELECT * FROM myarticle WHERE id ='"+ articleId +"'",function selectTable(err, rows ,fields){
      if (err){
         throw err;
       }
      if (rows.length){
        console.log(rows);
        res.render(
          'article',
          {
            title: rows[0].title,
            user:req.session.username,
            myArticle: rows[0].article
          }
        );
  }
})
});
router.get('/write', function(req, res, next) {
  //初始化session
  res.render(
    'write', 
    { 
      title: '写我的博客' ,
      user:req.session.username,
    }
  );
});
router.get('/writeSucceed', function(req, res, next) {
  res.render(
    'writeSucceed',
    {
      title: '文章发表成功',
      user:req.session.username
    }
  );
});
module.exports = router;
