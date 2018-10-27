var express = require('express');
var router = express.Router();
var pgclient =require('dao/pgHelper');
pgclient.getConnection();


/* GET home page. */
router.get('/', function(req, res) {
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }
	if(req.session.islogin){
	    res.locals.islogin=req.session.islogin;
	}
  	res.render('index', { title: 'HOME',test:res.locals.islogin});
});

router.route('/login')
    .get(function(req, res) {
        if(req.session.islogin){
            res.locals.islogin=req.session.islogin;
        }

        if(req.cookies.islogin){
            req.session.islogin=req.cookies.islogin;
        }
        res.render('login', { title: '用户登录' ,test:res.locals.islogin});
    })
    .post(function(req, res) {
        
        result=null;
        //调用数据库管理类中的查询语句，参数是表名、用户名
		  pgclient.select('userinfo',{'username': req.body.username},'', function (result) {
            if(result[0]===undefined){
                res.send('没有该用户');
            }else{
                if(result[0].password===req.body.password){
                    req.session.islogin=req.body.username;
                    res.locals.islogin=req.session.islogin;
                    res.cookie('islogin',res.locals.islogin,{maxAge:60000});
                    res.redirect('/');
                }else
                {
                    res.redirect('/login');
                }
               }
        });
    });

router.get('/logout', function(req, res) {
    res.clearCookie('islogin');
    req.session.destroy();
    res.redirect('/');
});
router.get('/home', function(req, res) {
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }
    res.render('index', { title: 'Home', test: res.locals.islogin });
});

router.route('/reg')
    .get(function(req,res){
        res.render('reg',{title:'注册'});
    })
    .post(function(req,res) {
        //调用数据库管理类中的写入语句，参数是表名userinfo，username、password、emal、telephone
		pgclient.save('userinfo',{'username': req.body.username,'password': req.body.password2,'email': req.body.email,'telephone': req.body.telephone}, function (err) {
            pgclient.select('userinfo',{'username': req.body.username},'', function (result) {
				if(result[0]===undefined){
					res.send('注册没有成功，请重新注册');
				}else{
//					res.send('注册成功！');
					res.redirect('/login');
				}
			}); 
        });
    });

//添加查询省GDP表的路由
router.get('/GDPQuery', function(req, res) {
	pgclient.select('Province_GDP', {'pro_code': req.query.code}, '', function(data) {
		if(data[0] === undefined) {
			res.send('返回空值');
		} else {
			res.status(200)
				.json({
					data: data
				});
			console.log("查询：" + req.query.code);
			console.log("返回结果：" + data[0].pro_name)
		}
	});

});


module.exports = router;

