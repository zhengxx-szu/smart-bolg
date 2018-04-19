var express = require('express')
var fs = require('fs')
var router = express.Router()
var multer  = require('multer')
var baseRecommend = require('../recommend/baseRecmd.js')
var itemRecommend = require('../recommend/itemRecmd.js')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + ".jpg")
    }
})

var upload = multer({ storage: storage })

// 上传图片
router.post('/sendAvatar', upload.single('avatar'), function (req, res) {
	var file = req.file.filename
	var user_id = req.body.user_id
	var update = { $set: { avatar: 'http://127.0.0.1:3000/' + file } }
	model('user').update({ _id: user_id }, update, function (err, state) {})
	res.send({ url: file, state: 'ok'})
})

// 注册
router.post('/register', function (req, res) {
	var user = req.body
    model('user').findOne({ account: user.account }, function (err, result) {
       	if (result) {
        	res.send({ state: 'error', content: '用户名已存在' })
      	} else {
        	model('user').findOne({ email: user.email }, function (err, result) {
          		if (result) {
            		res.send({ state: 'error', content: '邮箱已被使用' })
          		} else {
            		model('user').create(user, function (err, result) {
						res.send({ state: 'ok', content: result._id });
            		})
          		}
        	})
      	}
    })
})

// 登录
router.post('/login', function (req, res) {
	var user = req.body
    model('user').findOne({ account: user.account, password: user.password }, function (err, result) {
       	if (result) {
			itemRecommend(result._id)
        	res.send({ state: 'ok', content: '登录成功', token: result._id, info: result })
      	} else {
			res.send({ state: 'error', content: '账号或密码错误' })
      	}
    })
})

// 获取用户信息
router.get('/getUserInfo', function (req, res) {
    var user_id = req.query.user_id
    var condition = { _id: user_id }
    model('user').findOne(condition, function (err, result) {
		res.send(result)
    })
})

// 更新用户信息
router.post('/updateInfo', function (req, res) {
	var user_id = req.body.user_id,
		type = req.body.type,
		value = req.body.value,
		condition = { _id: user_id },
		update
	console.log(type)
	switch (type) {
		case 'username': update = { $set: { username: value } }; break;
		case 'email': update = { $set: { email: value } }; break;
		case 'password': update = { $set: { password: value } }; break;
		case 'signature': update = { $set: { signature: value } }; break;
		case 'homepage': update = { $set: { homepage: value } }; break;
	}
	console.log(update)
	model('user').update(condition, update, function (err, state) {
		if (state) res.send({ state: 'ok' })
	})
})

// 更新收藏
router.get('/addCollect', function (req, res) {
    var article_id = req.query.article_id
    var user_id = req.query.user_id
    var condition = { _id: user_id }
    model('user').findOne(condition, function (err, result) {
        var new_collect = result.collect
        new_collect.indexOf(article_id) === -1 ? new_collect.push(article_id) : new_collect.splice(new_collect.indexOf(article_id), 1)
        var update = { $set: { collect: new_collect } }
        model('user').update(condition, update, function (err, state) {
            if (state) res.send({ state: 'ok' })
        })
    })
})

// 更新转发
router.get('/sendTransmit', function (req, res) {
	var article_id = req.query.article_id
	var user_id = req.query.user_id
	model('article').findOne({ id: article_id }, function (err, result) {
		var new_transmit = result.transmit
        new_transmit.push(user_id)
        var update = { $set: { transmit: new_transmit } }
        model('article').update({ id: article_id }, update, function (err, state) {})
	})
	model('user').findOne({ _id: user_id }, function (err, result) {
		var new_transmit = result.transmit
        new_transmit.push(req.query)
        var update = { $set: { transmit: new_transmit } }
        model('user').update({ _id: user_id }, update, function (err, state) {
			res.send({ state: 'ok' })
		})
	})
})

// 更新关注
router.get('/sendFollow', function (req, res) {
    var user_id = req.query.user_id
    var follow_id = req.query.follow_id
	var condition = { _id: user_id }
	var flag = false
    model('user').findOne(condition, function (err, user) {
        var new_follow = user.follow
        new_follow.indexOf(follow_id) === -1 ? new_follow.push(follow_id) : new_follow.splice(new_follow.indexOf(follow_id), 1)
        var update = { $set: { follow: new_follow } }
        model('user').update(condition, update, function (err, state) {
			if (state && flag) res.send({ state: 'ok' })
			flag = true
        })
	})
	model('user').findOne({ _id: follow_id }, function (err, user) {
        var new_fans = user.fans
		new_fans.indexOf(user_id) === -1 ? new_fans.push(user_id) : new_fans.splice(new_fans.indexOf(user_id), 1)
        model('user').update({ _id: follow_id }, { $set: { fans: new_fans } }, function (err, state) {
			if (state && flag) res.send({ state: 'ok' })
			flag = true
		})
    })
})

// 获取收藏列表
router.get('/getCollectList', function (req, res) {
	var user_id = req.query.user_id
	model('user').findOne({ _id: user_id }, function (err, user) {
		var arr = user.collect
		var article_arr = []
		var flag = 0
		if (arr.length === 0) res.send([])
		arr.forEach(function(id, index) {
			model('article').findOne({ id: id }, function (err, article) {
				article_arr.push(article)
				flag++
				if (flag === arr.length) res.send(article_arr)
			})
		})
	})
})

// 获取转发列表
router.get('/getTransmitList', function (req, res) {
	var user_id = req.query.user_id
	model('user').findOne({ _id: user_id }, function (err, user) {
		var arr = user.transmit
		var article_arr = []
		if (arr.length === 0) res.send([])		
		arr.forEach(function(item, index) {
			model('article').findOne({ id: item.article_id }, function (err, article) {
				var new_article = {
					transmitText: arr[index].content,
					articleInfo: article
				}
				article_arr.push(new_article)
				if (index + 1 === arr.length) res.send(article_arr)
			})
		})
	})
})

// 获取关注列表
router.get('/getFollowList', function (req, res) {
	var user_id = req.query.user_id
	model('user').findOne({ _id: user_id }, function (err, user) {
		var arr = user.follow
		var followList = []
		var resLength = 0
		if (arr.length === 0) res.send([])
		arr.forEach(function(id, index) {
			model('user').findOne({ _id: id }, function (err, follower) {
				followList.push(follower)
				resLength++
				if (resLength === arr.length) res.send(followList)
			})
		})
	})
})

// 获取粉丝列表
router.get('/getFansList', function (req, res) {
	var user_id = req.query.user_id
	model('user').findOne({ _id: user_id }, function (err, user) {
		var arr = user.fans
		var fansList = []
		var resLength = 0
		if (arr.length === 0) res.send([])
		arr.forEach(function(id, index) {
			model('user').findOne({ _id: id }, function (err, fans) {
				fansList.push(fans)
				resLength++
				if (resLength === arr.length) res.send(fansList)
			})
		})
	})
})


module.exports = router