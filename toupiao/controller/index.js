/**
 * 控制層函式封裝
 * add(Entity,params,res)
 * update(Entity,where,params,res)
 * del(Entity,where,res)
 * find(Entity,where,res)
 * findOne(Entity,where,res)
 * findAll(Entity,page,pageSize,where,sort,res)
 * */

/**
 * 用於增加資料的函式
 * @param {Object} Entity 要增加的資料庫物件
 * @param {Object} params 要增加的參數
 * @param {Object} res 回應物件
 * */
function add(Entity, params, res) {
    Entity.create(params).then(function (rel) {
        if (rel) {
            res.json({
                code: 200,
                msg: '增加成功',
                data: rel
            });
        } else {
            res.json({
                code: 400,
                msg: '增加失敗',
                data: null
            });
        }
    }).catch(function (err) {
        res.json({
            code: 500,
            msg: '增加時出現異常',
            data: null
        });
    });
}

/**
 * 用於修改資料的函式
 * @param {Object} Entity 要修改的資料庫物件
 * @param {Object} where 修改查詢的條件
 * @param {Object} params 修改後的資料參數
 * @param {Object} res 回應物件
 * */

function update(Entity, where, params, res) {
    Entity.updateOne(where, params).then(function (rel) {
        if (rel.n > 0) {
            res.json({
                code: 200,
                msg: '更新成功'
            });
        } else {
            res.json({
                code: 400,
                msg: '更新失敗'
            });
        }
    }).catch(function (err) {
        res.json({
            code: 500,
            msg: '更新時出現異常'
        });
    });
}

/**
 * 用於刪除資料的函式
 * @param {Object} Entity 要刪除的資料庫物件
 * @param {Object} where 要刪除條件的參數
 * @param {Object} res 回應物件
 * */

function del(Entity, where, res) {
    Entity.findOneAndDelete(where).then(function (rel) {
        if (rel) {
            res.json({
                code: 200,
                msg: '刪除成功'
            });
        } else {
            res.json({
                code: 400,
                msg: '刪除失敗'
            });
        }
    }).catch(function (err) {
        res.json({
            code: 500,
            msg: '刪除時出現異常'
        });
    });
}

/**
 * 查詢單一元素
 * @param {Object} Entity 要查詢的資料庫物件
 * @param {Object} where 查詢準則
 * @param {Object} res 回應物件
 * */

function findOne(Entity, where, res) {
    Entity.findOne(where).then(function (rel) {
        if (rel) {
            res.json({
                code: 200,
                msg: '查詢成功',
                data: rel
            });
        } else {
            res.json({
                code: 400,
                msg: '沒有查詢到資料',
                data: null
            });
        }
    }).catch(function (err) {
        res.json({
            code: 500,
            msg: '查詢時出現異常',
            data: null
        });
    });
}

/**
 * 查詢所有,不分頁
 * @param {Object} Entity
 * @param {Object} where
 * @param {Object} res
 * */

function find(Entity, where, res) {
    if (!where) {
        where = {};
    }
    Entity.find(where).then(function (rel) {
        res.json({
            list: rel
        });
    }).catch(function (err) {
        console.log(err);
        res.json({
            list: []
        });
    });
}

/**
 * 查詢資料量,傳回值為資料量值
 * @param {*} Entity 要查詢的實體物件
 * @param {*} where  查詢準則
 * */

async function count(Entity, where) {
    if (!where) {
        where = {};
    }
    let count = 0;
    await Entity.find(where).count().then(function (rel) {
        count = rel;
    })

    return count;
}

/**
 * 查詢所有元素 - 分頁
 * @param {Object} Entity 要查詢的資料庫物件
 * @param {Object} page 當前頁碼
 * @param {Object} pageSize 每頁查詢筆數
 * @param {Object} where 查詢準則
 * @param {Object} sort 排序條件
 * @param {Object} res 回應物件
 * */

async function findAll(Entity, page, pageSize, where, sort, res) {
    //處理頁面
    if (!page) {
        page = 1;
    } else if (isNaN(page)) {
        page = 1;
    } else if (page < 1) {
        page = 1;
    }else{
        page = Math.abs(Number(page));
    }

    //處理每筆頁數
    if (!pageSize){
        pageSize = 10;
    }else if (isNaN(pageSize)){
        pageSize = 10;
    }else{
        pageSize = Math.abs(Number(pageSize));
    }

    //查詢總筆數
    let count = 0;

    if (!where){
        where = {};
    }

    await Entity.find(where).count().then(function(rel){
        count = rel;
    });

    let totalPage = Math.ceil(count/pageSize);
    if (totalPage > 0 && page > totalPage){
        page = totalPage;
    }

    //計算起始位置
    let start = (page -1 ) * pageSize;

    await Entity.find(where).sort(sort).skip(start).limit(pageSize).then(function (rel){
        if (rel && rel.length > 0){
            res.json({
                code : 200,
                msg:'查詢成功',
                data:rel,
                pageSize,
                page,
                count
            });
        }else{
            res.json({
                code:400,
                msg:'沒有查詢到資料',
                data:[],
                pageSize,
                page,
                count
            });
        }
    }).catch(function (err){
        console.log(err);
        res.json({
            code:500,
            msg:'查詢時出現異常',
            data:[],
            pageSize,
            page,
            count
        });
    });
}

module.exports = {
    add,        //增加函式
    update,     //修改函式
    del,        //刪除函式
    find,       //查詢所有,不分頁
    findOne,    //查詢單一元素
    findAll,    //查詢所有元素
    count       //查詢資料量
}