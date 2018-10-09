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

module.exports = router;
