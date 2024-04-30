var express = require('express');
var router = express.Router();
var ctl = require('../../controller');
var model = require('../../model');

/**
 * 候選物件
 * */

//增加候選物件
router.post('/add',function(req, res, next){
    let person = req.body;
    ctl.add(model.Person,person,res);
});

//查詢所有候選物件
router.post('/findall',function (req, res, next){
    let {page,pageSize} = req.body;
    ctl.findAll(model.Person,page,pageSize,null,null,res);
});

//查詢所有候選物件(不分頁)
router.post('/queryall')