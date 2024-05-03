var express = require('express');
var router = express.Router();
var model = require('../../model');
var ctl = require('../../controller');
const {json} = require("express");

/**
 * 投票流程
 * */

//網友投票
router.post('/vote', function (req, res, next) {
    let flowpath = req.body;
    let date = new Date();
    let Y = date.getFullYear();
    let M = date.getMonth() + 1;
    let D = date.getDate();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    flowpath.createTime = `${Y}-${M}-${D} ${h}:${m}:${s}`;
    flowpath.vote = JSON.parse(flowpath.vote);
    flowpath.person = JSON.parse(flowpath.person);

    ctl.add(model.Flowpath,flowpath,res);
});

//查詢所有候選物件
router.post('findall',function (req,res,next){
    let {page,pageSize} = req.body;
    ctl.findAll(model.Flowpath,page,pageSize,null,{createTime:-1},res);
});

module.exports = router;