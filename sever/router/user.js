var express = require('express')
var router = express.Router()

router.post('/register', function (req, res) {
	var user = req.body
    model('user').findOne({ username: user.username }, function (err, result) {
       	if (result) {
        	res.send({ state: 1, content: '用户名已存在' })
      	} else {
        	model('user').findOne({ email: user.email }, function (err, result) {
          		if (result) {
            		res.send({ state: 2, content: '邮箱已被使用' })
          		} else {
            		model('user').create(user, function (err, result) {
						res.send({ state: 0, content: result._id });
            		})
          		}
        	})
      	}
    })
})

module.exports = router