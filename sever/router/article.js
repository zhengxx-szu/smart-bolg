var express = require('express')
var router = express.Router()

// 获取指定类型的列表
router.get('/getBlogList', function (req, res) {
    var skipCount = req.query.page * 10
    model('article').find({type: req.query.tag}).sort({time: -1}).skip(skipCount).limit(10).exec(function (err, result) {
      res.send(result)
    })
})

// 更新文章赞的个数
router.get('/addFavor', function (req, res) {
    var article_id = req.query.article_id
    var user_id = req.query.user_id
    var condition = { id: article_id }
    model('article').findOne(condition, function (err, result) {
        var new_favor = result.favor
        new_favor.indexOf(user_id) === -1 ? new_favor.push(user_id) : new_favor.splice(new_favor.indexOf(user_id), 1)
        var update = { $set: { favor: new_favor } }
        model('article').update(condition, update, function (err, state) {
            if (state) res.send({ state: 'ok' })
        })
    })
})

// 获取文章信息
router.get('/articleInfo', function (req, res) {
    var article_id = req.query.article_id
    var user_id = req.query.user_id
    var condition = { id: article_id }
    model('article').findOne(condition, function (err, result) {
        res.send(result)
    })
})

// 增加评论
router.post('/sendComment', function (req, res) {
    var article_id = req.body.article_id
    var condition = { id: article_id }
    model('article').findOne(condition, function (err, result) {
        var new_comment = result.comment
        new_comment.push(req.body)
        var update = { $set: { comment: new_comment } }
        model('article').update(condition, update, function (err, state) {
            if (state) res.send({ state: 'ok' })
        })
    })
})

// 获取评论
router.get('/getComment', function (req, res) {
    var article_id = req.query.article_id
    var condition = { id: article_id }
    model('article').findOne(condition, function (err, result) {
        var comments = result.comment
        var arr = []
        var resLength = 0
        comments.forEach(function(item, index) {
            model('user').findOne({ _id: item.user_id}, function (err, info) {
                var comment = {
                    avatar: info.avatar,
                    time: item.time,
                    name: info.username,
                    content: item.content,
                    user_id: item.user_id
                }
                if (item.reply_user_id) {
                    model('user').findOne({ _id: item.reply_user_id}, function (err, reply_user) {
                        comment.reply_name = reply_user.username
                        comment.reply_user_id = item.reply_user_id
                        arr.push(comment)
                        resLength++
                        if (resLength === comments.length) res.send(arr)
                    })
                } else {
                    arr.push(comment)
                    resLength ++
                    if (resLength === comments.length) res.send(arr)
                }
            })
        })
    })
})

module.exports = router