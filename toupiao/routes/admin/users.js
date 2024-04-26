var express = require('express');
var router = express.Router();
var model = require('../../model');
var ctl = require('../../controller');

/**
 * 使用者管理
 * */

//使用者登入
router.post('/login',function (req, res, next){
    let {username = '',password = ''} = req.body;

    model.User.findOne({username,password}).then(function(rel){
        if (rel){
            req.session.username = username;
            res.redirect('/admin/main');
        }else{
            res.render('admin/login',{
                msg:'帳號或密碼錯誤'
            })
        }
    }).catch(function (err){
        res.render('admin/login',{
            msg:'登入時出現異常'
        })
    });
});

router.get('/exit',function (req, res, next){
    req.session.destroy(function(err){});
    res.redirect('admin/login');
});

module.exports = router;