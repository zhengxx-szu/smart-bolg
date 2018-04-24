function baseRecommend (id) {
    var recommendList = []
    var ubtArticleList = {}
    var user_length = 0
    var count = 0
    var haviorScore = {
        'detail': 1,
        'favor': 2,
        'collect': 3,
        'comment': 4,
        'transmit': 5
    }

    recommend(id)

    function recommend (id) {
        model('ubt').find({ user_id: id }, function (err, users) {
            user_length = users.length
            users.forEach(function (user, index) {
                // if (!ubtArticleList[user.article_id]) ubtArticleList[user.article_id] = 0
                model('article').findOne({ id: user.article_id }, function (err, article) {
                    var keyword = article.keyword
                    searchKeyword(keyword, haviorScore[user.havior], user.article_id)
                })
            })
        })
    }

    function searchKeyword (keywords, score, oldId) {

        model('article').find({}).limit(10000).sort({time: -1}).exec(function (err, articleArray) {
            articleArray.forEach(function (article, index) {
                if (article.id !== oldId) {
                    keywords.forEach(function (keyword, index) {
                        if (article.keyword.includes(keyword)) {
                            calculateScore(article.id, score)
                        }
                    })
                }
            })
            count++
            if (user_length === count) {
                updateRecommend()
                var condition = { _id: id }
                model('user').findOne(condition, function (err, user) {
                    var oldList = user.list
                    var update = {
                        $set: {
                            list: oldList.concat(recommendList.splice(0, 20))
                        }
                    }
                    model('user').update(condition, update, function (err, state) {
                        if (state) console.log('baseRecommend ok!')
                    })
                })
            }
        })
    }

    function calculateScore (article_id, score) {
        if (!ubtArticleList[article_id]) ubtArticleList[article_id] = 0
        ubtArticleList[article_id] += score
    }

    function updateRecommend () {
        for (var m = 0; m < Object.keys(ubtArticleList).length; m++) {
            var maxScore = null, maxScoreId = null
            for (var i in ubtArticleList) {
                if (!maxScore && !maxScoreId) {
                    maxScore = ubtArticleList[i]
                    maxScoreId = i
                } else if (maxScore < ubtArticleList[i]) {
                    maxScore = ubtArticleList[i]
                    maxScoreId = i
                }
            }
            ubtArticleList[maxScoreId] = 0
            recommendList.push(maxScoreId)
        }
    }
}

module.exports = baseRecommend