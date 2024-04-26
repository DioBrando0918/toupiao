let mongoose = require('mongoose');
const {mongo} = require("mongoose");

//使用者管理模型
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
const User = mongoose.model('users', userSchema);

//投票主題管理
const voteSchema = new mongoose.Schema({
    title: String,              //主題標題
    desc: String,               //主題描述
    createTime: String,         //建立時間
    startDate: String,          //投票開始時間
    endDate: String,            //投票結束時間
    persons: Array,             //候選物件集合
    num: Number                 //投票數
});
const Vote = mongoose.model('votes', voteSchema);

//候選物件管理
const personSchema = new mongoose.Schema({
    name: String,        //候選人姓名
    desc: String,        //候選人介紹
    photo: String        //候選人照片
});
const Person = mongoose.model('persons', personSchema);

//投票環節管理
const flowpathSchema = new mongoose.Schema({
    createTime: String,      //投票時間
    ip: String,              //網友ip位址
    address: String,         //網友所在地區
    vote: Object,            //投票主題
    person: Object           //投票物件
});
const Flowpath = mongoose.model('flowPaths', flowpathSchema);

module.exports = {
    User,
    Vote,
    Person,
    Flowpath
}
