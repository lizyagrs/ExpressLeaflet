var express = require('express');
var router = express.Router();
var pgclient =require('dao/pgHelper');

/* GET users listing. */
//router.get('/users', function(req, res, next) {
//res.send('respond with a resource');
//});


/**
 * 查询列表页
 */
router.get('/', function (req, res, next) {
    //页面跳转时，如果要保留登录信息，需要增加session的传递
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }
    //查数据库userinfo表并获取表中所有数据
    pgclient.select('userinfo','','',function (result) {
        //console.log(result);
        if(result[0]===undefined){
            res.send('没有用户信息！');
        }else{
           	//页面跳转时，如果要保留登录信息，需要增加session的传递
            res.render('users', {title: '用户管理', datas: result,test:res.locals.islogin});
        }
    })
});

/**
 * 新增页面跳转
 */

router.route('/add')
    .get(function(req,res){
        res.render('users_add',{title:'新增'});
    })
    .post(function(req,res) {
        
		pgclient.save('userinfo',{'username': req.body.username,'password': req.body.password2,'email': req.body.email,'telephone': req.body.telephone}, function (err) {
            pgclient.select('userinfo',{'username': req.body.username},'', function (result) {
				if(result[0]===undefined){
					res.send('添加未成功，请重新输入');
				}else{
//					res.send('添加成功！');
					res.redirect('/users');
				}
			}); 
        });
    });

/**
 * 删
 */
router.get('/del/:id', function (req, res) {
    console.log('id:'+req.params.id);
    pgclient.remove('userinfo',{'id': req.params.id},function(err){
        if (err !='') {
            res.send("删除失败："+err)
        } else {
            res.redirect('/users')
        }
    });
});


/**
 * 修改
 */
router.get('/toUpdate/:id', function (req, res) {
    //页面跳转时，如果要保留登录信息，需要增加session的传递
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }
    var id = req.params.id;
    console.log(id);
    pgclient.select('userinfo',{'id':id},'',function (result) {
        if(result[0]===undefined){
            res.send('修改失败！');
        }else{
            res.render("users_update", {title: '用户信息更新', datas: result,test:res.locals.islogin});       //直接跳转
        }
    });
});

/**
 * 修改
 */
router.post('/update', function (req, res) {
    var id = req.body.id;
    //console.log('id===='+id);
    var username = req.body.username;
    var email = req.body.email;
    var telephone = req.body.telephone;
    var professional = req.body.professional;
    pgclient.update('userinfo',{'id':id},{'username':username,'email':email,'telephone':telephone},function (err) {
        if (err !='') {
            res.send("修改失败："+err)
        } else {
            res.redirect('/users');
        }
    });
});


/**
 * 搜索
 */
router.post('/search', function (req, res) {
    //获取页面中搜索框中的用户名参数
    var username = req.body.s_username;
    //获取页面中搜索框中的电话号码参数
    var telephone = req.body.s_telephone;
     //页面跳转时，如果要保留登录信息，需要增加session的传递
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }
    
    //如果姓名和电话都为空，则查询所有信息；
    if(!username&&!telephone){
        //查数据库userinfo表并获取表中所有数据
        pgclient.select('userinfo','','',function (result) {
            //console.log(result);
            if(result[0]===undefined){
                res.send('没有用户信息！');
            }else{
                //页面跳转时，如果要保留登录信息，需要增加session的传递
                res.render('users', {title: '用户管理', datas: result,test:res.locals.islogin});
            }
        })
    }
    //如果用户名不为空，则以用户名为条件进行查询
    if(username){
        pgclient.select('userinfo',{'username':username},'',function (result) {
            if(result[0]===undefined){
                res.send('查询失败！');
            }else{
                res.render("users", {title: '用户信息更新', datas: result,test:res.locals.islogin}); //直接跳转
            }
        });
    }
    //如果电话号码不为空，则以电话号码为条件进行查询
    if(telephone){
        pgclient.select('userinfo',{'telephone':telephone},'',function (result) {
            if(result[0]===undefined){
                res.send('查询失败！');
            }else{
                res.render("users", {title: '用户信息更新', datas: result,test:res.locals.islogin}); //直接跳转
            }
        });
    }
    //如果姓名和电话号码都不为空，则同时以姓名和电话号码为条件进行查询
    if(username&&telephone){
        pgclient.select('userinfo',{'username':username,'telephone':telephone},'',function (result) {
            if(result[0]===undefined){
                res.send('查询失败！');
            }else{
                res.render("users", {title: '用户信息更新', datas: result,test:res.locals.islogin}); //直接跳转
            }
        });
    }
    
});

module.exports = router;
