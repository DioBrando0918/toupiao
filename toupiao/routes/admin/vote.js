var express = require('express');
var router = express.Router();
var model = require('../../model');
var ctl = require('../../controller');

/**
 * 投票主題
 * */

//增加主題
router.post('/add',function(req, res, next){
    let vote = req.body;

    let date = new Date();
    let Y = date.getFullYear();
    let M = date.getMonth()+1;
    let D = date.getDate();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    vote.createTime = `${Y}-${M}-${D} ${h}:${m}:${s}`;
    vote.persons = JSON.parse(vote.persons);
    vote.num = 0;

    ctl.add(model.Vote,vote,res);
});

//查詢所有主題
router.post('/findall',function(req, res, next){
    let {page,pageSize} = req.body;
    ctl.findAll(model.Vote,page,pageSize,null,null,res);
});

//查詢所有主題(不分頁)
router.post('/queryall',function(req,res,next){
    ctl.find(model.Vote,{},res);
});

//刪除主題
router.post('/del',function (req,res,next){
    let {id} = req.body;
    ctl.del(model.Vote,{_id:id},res);
});

//修改主題
router.post('/update',function(req, res, next){
    let {id,title,desc,startDate,endDate,persons} = req.body;
    let params = {
        _id:id,
        title,
        desc,
        startDate,
        endDate,
        persons:JSON.parse(persons)
    }
    ctl.update(model.Vote,{_id:id},params,res);
});

module.exports = router;