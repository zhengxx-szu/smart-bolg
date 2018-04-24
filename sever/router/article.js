var express = require('express')
var router = express.Router()

// 获取指定类型的列表
router.get('/getBlogList', function (req, res) {
    var skipCount = req.query.page * 10
    var user_id = req.query.token
    if (!user_id || req.query.tag !== '__all__') {
        model('article').find({type: req.query.tag}).sort({time: -1}).skip(skipCount).limit(10).exec(function (err, result) {
            res.send(result)
        })
    } else {
        model('user').findOne({ _id: user_id }, function (err, user) {
            var list = user.list
            if (list.length > 10) {
                // 取出前十条进行推荐
                var recommendList = list.splice(0, 10)
                // 更新数据库字段
                var update = { $set: { list: list } }
                model('user').update({ _id: user_id }, update, function (err, state) {
                    if (err) console.log(err)
                })
                // 查询数据库并返回列表
                var sendCount = 0
                var sendList = []
                recommendList.forEach(function (article_id, index) {
                    model('article').findOne({ id: article_id }, function (err, article) {
                        sendList.push(article)
                        sendCount++
                        if (sendCount === recommendList.length) {
                            res.send(sendList)
                        }
                    })
                })
            } else {
                // 更新数据库字段
                var recommendList = list                
                var update = { $set: { list: [] } }
                model('user').update({ _id: user_id }, update, function (err, state) {
                    if (err) console.log(err)
                })

                // 查询数据库并返回列表                                
                var baseLength = 10 - recommendList.length
                var sendCount = 0
                var sendList = []

                recommendList.forEach(function (article_id, index) {
                    model('article').findOne({ id: article_id }, function (err, article) {
                        sendList.push(article)
                        sendCount++
                        if (sendCount === 10) {
                            res.send(sendList)
                        }
                    })
                })
                model('article')
                    .find({type: req.query.tag})
                    .sort({time: -1})
                    .skip(skipCount)
                    .limit(baseLength)
                    .exec(function (err, articles) {
                        articles.forEach(function (article) {
                            sendList.push(article)
                            sendCount++
                            if (sendCount === 10) {
                                res.send(sendList)
                            }
                        })
                })
            }
        })

    }

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