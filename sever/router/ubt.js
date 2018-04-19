
var express = require('express')
var router = express.Router()

router.get('/reportDetail', function (req, res) {
	var user_id = req.query.user_id
    var article_id = req.query.article_id
    var condition = {
        user_id: user_id,
        article_id: article_id,
        havior: 'detail'
    }
    model('ubt').findOne(condition, function (err, ubt) {
       	if (!ubt) {
            var newUBT = {
                user_id: user_id,
                article_id: article_id,
                havior: 'detail'
            }
            model('ubt').create(newUBT, function (err, result) {
                res.send({ state: 'ok' });
            })
      	}
    })
})

router.get('/reportFavor', function (req, res) {
	var user_id = req.query.user_id
    var article_id = req.query.article_id
    var condition = {
        user_id: user_id,
        article_id: article_id,
        havior: 'favor'
    }
    model('ubt').findOne(condition, function (err, ubt) {
       	if (!ubt) {
            var newUBT = {
                user_id: user_id,
                article_id: article_id,
                havior: 'favor'
            }
            model('ubt').create(newUBT, function (err, result) {
                res.send({ state: 'ok' });
            })
      	}
    })
})

router.get('/reportCollect', function (req, res) {
	var user_id = req.query.user_id
    var article_id = req.query.article_id
    var condition = {
        user_id: user_id,
        article_id: article_id,
        havior: 'collect'
    }
    model('ubt').findOne(condition, function (err, ubt) {
       	if (!ubt) {
            var newUBT = {
                user_id: user_id,
                article_id: article_id,
                havior: 'collect'
            }
            model('ubt').create(newUBT, function (err, result) {
                res.send({ state: 'ok' });
            })
      	}
    })
})

router.get('/reportTransmit', function (req, res) {
	var user_id = req.query.user_id
    var article_id = req.query.article_id
    var condition = {
        user_id: user_id,
        article_id: article_id,
        havior: 'transmit'
    }
    model('ubt').findOne(condition, function (err, ubt) {
       	if (!ubt) {
            var newUBT = {
                user_id: user_id,
                article_id: article_id,
                havior: 'transmit'
            }
            model('ubt').create(newUBT, function (err, result) {
                res.send({ state: 'ok' });
            })
      	}
    })
})

router.get('/reportComment', function (req, res) {
	var user_id = req.query.user_id
    var article_id = req.query.article_id
    var condition = {
        user_id: user_id,
        article_id: article_id,
        havior: 'comment'
    }
    model('ubt').findOne(condition, function (err, ubt) {
       	if (!ubt) {
            var newUBT = {
                user_id: user_id,
                article_id: article_id,
                havior: 'comment'
            }
            model('ubt').create(newUBT, function (err, result) {
                res.send({ state: 'ok' });
            })
      	}
    })
})

module.exports = router