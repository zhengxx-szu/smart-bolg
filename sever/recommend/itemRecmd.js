function itemRecommend (id) {
    var recommendList = []
    var ubtArticleList = []
    var haviorScore = {
        'detail': 1,
        'favor': 2,
        'collect': 3,
        'comment': 4,
        'transmit': 5
    }

    recommend()

    // 基于物品的协同过滤主函数
    function recommend () {
        // 初始化用户-物品倒排表
        var user_item_table = {}
        var item_user_table = {}
        var echoMatrix = {}
        var cosSimMatrix = {}
        var rankList = {}
        // 遍历数据库，获取用户物品反馈信息
        model('ubt').find({}, function (err, users) {
            users.forEach(function (user, index) {
                // 初始化物品列表
                if (!ubtArticleList.includes(user.article_id)) {
                    ubtArticleList.push(user.article_id)
                }
                // 创建用户的反馈表
                if (!user_item_table[user.user_id]) {
                    user_item_table[user.user_id] = []
                }
                
                user_item_table[user.user_id].push(user.article_id)
            })
            echoMatrix = calculateEchoMatrix(user_item_table)
            item_user_table = calculateItemUserTable(user_item_table)
            cosSimMatrix = calculateCosSimMatrix(echoMatrix, item_user_table)
            rankList = buildRecommend(cosSimMatrix)
        })
    }

    // 计算共现矩阵
    function calculateEchoMatrix(table) {
        var echoMatrix = {}
        for (var m = 0; m < ubtArticleList.length; m++) {
            echoMatrix[ubtArticleList[m]] = {}
            for (var n = 0; n < ubtArticleList.length; n++) {
                echoMatrix[ubtArticleList[m]][ubtArticleList[n]] = 0
                for (var k in table) {
                    if (m !== n) {
                        if (table[k].includes(ubtArticleList[m]) && table[k].includes(ubtArticleList[n])) {
                            echoMatrix[ubtArticleList[m]][ubtArticleList[n]]++
                        }
                    }
                }
            }
        }
        return echoMatrix
    }

    // 计算物品用户表
    function calculateItemUserTable (table) {
        var item_user_table = {}
        for (var k = 0; k < ubtArticleList.length; k++) {
            item_user_table[ubtArticleList[k]] = 0
            for (var m in table) {
                if (table[m].includes(ubtArticleList[k])) {
                    item_user_table[ubtArticleList[k]]++
                }
            }
        }
        return item_user_table
    }

    // 计算物品的余弦相似度矩阵
    function calculateCosSimMatrix (echoMatrix, N) {
        var cosSimMatrix = {}
        for (var m in echoMatrix) {
            cosSimMatrix[m] = {}
            for (var n in echoMatrix[m]) {
                cosSimMatrix[m][n] = (echoMatrix[m][n] / Math.sqrt(N[m] * N[n])).toFixed(2)
            }
        }
        return cosSimMatrix
    }

    // 计算用户推荐列表
    function buildRecommend (table) {
        var rankList = {}
        model('ubt').find({ user_id: id }, function (err, users) {
            var itemList = {}
            users.forEach(function (user, index) {
                if (!itemList[user.article_id]) itemList[user.article_id] = 0
                itemList[user.article_id] += haviorScore[user.havior]
            })
            for (var m = 0; m < ubtArticleList.length; m++) {
                if (!itemList[ubtArticleList[m]]) {
                    if (!rankList[ubtArticleList[m]]) {
                        rankList[ubtArticleList[m]] = 0
                    }
                    for (var n = 0; n < ubtArticleList.length; n++) {
                        if (itemList[ubtArticleList[n]]) {
                            rankList[ubtArticleList[m]] += itemList[ubtArticleList[n]] * table[ubtArticleList[m]][ubtArticleList[n]]
                        }
                    }
                }
            }
            updateRecommend(rankList)
            // 更新数据库
            var condition = { _id: id }
            model('user').findOne(condition, function (err, user) {
                var oldList = user.list
                var update = {
                    $set: {
                        list: recommendList.splice(0, 20).concat(oldList)
                    }
                }
                model('user').update(condition, update, function (err, state) {
                    if (state) console.log('itemRecommend ok!')
                })
            })
        })
    }

    // 对推荐权重表进行排序
    function updateRecommend (list) {
        for (var m = 0; m < Object.keys(list).length; m++) {
            var maxScore = null, maxScoreId = null
            for (var i in list) {
                if (!maxScore && !maxScoreId) {
                    maxScore = list[i]
                    maxScoreId = i
                } else if (maxScore < list[i]) {
                    maxScore = list[i]
                    maxScoreId = i
                }
            }
            list[maxScoreId] = 0
            if (maxScore !== 0){
                recommendList.push(maxScoreId)
            }
        }
    }
}

module.exports = itemRecommend