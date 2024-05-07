var express = require('express');
var router = express.Router();
var model = require('../../model');
var ctl = require('../../controller');

/**
 * 投票統計
 * */

//查詢投票數量
router.post('/num',function(req, res, next){
    let {id} = req.body;
    model.Flowpath.find({"vote:_id":id}.count().then(function(rel){
        res.json({
            num:rel
        })
    }));
});

//查詢候選物件選票
router.post('/person',async function(req, res, next){
    let {voteid,personid} = req.body;

    let count = 0;
    await model.Flowpath.find({"vote._id":voteid}).count().then(function(rel){
        count = rel;
    });

    let personNum = 0;
    await model.Flowpath.find({"vote._id":voteid,"person._id":personid}).count().then(function(rel){
        personNum = rel;
    });

    res.json({
        count,
        personNum
    });
});

module.exports = router;