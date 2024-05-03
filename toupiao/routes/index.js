var express = require('express');
var router = express.Router();

/**
 * 頁面跳躍由路由處理
 * */

//網站前台首頁
router.get('/',function (req, res, next){
  res.render('index',{title:'Express'});
});

//後台登入
router.get('/admin/login',function (req,res,next){
  res.render('admin/login',{msg:''});
});

//後台首頁
router.get('/admin/main',function (req,res,next){
  let username = req.session.username;
  if (username){
    res.render('admin/main',{
      username
    })
  }else{
    res.redirect('/admin/login')
  }
});

//投票統計
router.get('/page/admin/count',function(req,res,next){
  res.render('admin/count');
});

//投票統計詳情
router.get('/page/admin/count/detail',function (req, res,next){
  res.render('admin/count_detail');
});

//投票環節
router.get('/page/admin/flowpath',function (req,res,next){
  res.render('admin/flowpath');
});

//增加候選物件
router.get('/page/admin/person/add',function(req,res,next){
  res.render('admin/person_add');
});

//更新候選物件
router.get('/page/admin/person/update',function(req,res,next){
  res.render('admin/person_update');
});

//所有候選物件
router.get('/page/admin/person/list',function (req, res, next){
  res.render('admin/person_list');
});

//增加新主題
router.get('/page/admin/vote/add',function (req, res, next){
  res.render('admin/vote_add');
});

//修改新主題
router.get('/page/admin/vote',function (req, res, next){
  res.render('admin/vote_update');
});

//所有投票主題
router.get('/page/admin/vote/list',function (req, res, next){
  res.render('admin/vote_list');
});

//增加使用者
router.get('/page/admin/user/add',function (req, res, next){
  res.render('admin/user_add');
});

//所有使用者
router.get('/page/admin/user/list',function(req, res, next){
  res.render('admin/user_list');
});

//修改使用者
router.get('/page/admin/user/update',function (req, res, next){
  res.render('admin/user_update');
});

module.exports = router;