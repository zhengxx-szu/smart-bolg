
var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var axios = require('axios')
var data_base = require('./data_base/index.js')
var user = require('./router/user')
var article = require('./router/article')
var ubt = require('./router/ubt')
var app = express()

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "content-type")
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', user)
app.use('/article', article)
app.use('/ubt', ubt)
app.use(express.static('uploads'))
app.use(express.static('dist'))

// 轮询获取文章列表
setInterval(function () {
  var url = 'https://m.toutiao.com/list/'
  var tagList = ['__all__', 'news_hot', 'news_society', 'news_entertainment', 'news_tech', 'news_sports', 'news_world']
  var commonParams = {
		ac: 'wap',
		count: 20,
		format: 'json_raw',
		as: 'A1154ABB9CCA15C',
		cp: '5ABC0AC1A54C0E1',
		max_behot_time: parseInt(new Date().getTime() / 1000)
  }
  for(var i = 0; i < tagList.length; i++) {
    (function(i){
      setTimeout(function(){
        var params = Object.assign(commonParams, {tag: tagList[i]})
        axios.get(url, {
          headers: {
            referer: 'https://m.toutiao.com/?',
            host: 'm.toutiao.com',
            cookie: 'UM_distinctid=1620961ffe43e6-0310cd7dbe87e7-32637b05-13c680-1620961ffe5459; csrftoken=267d69c05bc38432da4b1252fec41b0a; W2atIF=1; _ga=GA1.2.1848643236.1520575847; _gid=GA1.2.2068808734.1520575847; _ba=BA0.2-20180309-51225-NAYLXFQCLe99p7IG2EfD; bottom-banner-hide-status=true; tt_track_id=4f59b415fb409dd71eb3dbf4d41b32d2; uuid="w:f534ffe0b07f46c48f9091b55dfd867c"; login_flag=5bd06e7274d3398faa5238142524fb6d; sessionid=f2a92441dba70ce34db829f8a84a4c58; uid_tt=aad26983e880885abcf73617ce40700d; sid_tt=f2a92441dba70ce34db829f8a84a4c58; sid_guard="f2a92441dba70ce34db829f8a84a4c58|1520577022|15552000|Wed\054 05-Sep-2018 06:30:22 GMT"; defaultSearchAction=toutiao; sso_login_status=0; tt_webid=75186185892; utm_source=toutiao'
          },
          params: params
        }).then((response) => {
          response.data.data.filter(item => item.tag !== 'ad').forEach((item) => {
            model('article').findOne({ id: item.item_id }, function (err, result) {
              if (!result) {
                var article = {
                  title: item.title,
                  time: item.publish_time,
                  username: item.media_name,
                  useravatar: item.media_info && item.media_info.avatar_url,
                  content: item.abstract,
                  imgList: item.image_list,
                  id: item.item_id,
                  keyword: item.keywords && item.keywords.split(','),
                  type: response.data.page_id.replace(/\//g, '')
                }
                model('article').create(article)
              }
            })
          })
        }).catch((e) => {})
      }, i * 50000)
    })(i)
    
  }
}, 350000)

// 热门话题
app.get('/api/getHotTopic', function (req, res) {
  var url = 'https://m.toutiao.com/baidu_top_words'
  axios.get(url, {
    headers: {
			referer: 'https://m.toutiao.com',
			host: 'm.toutiao.com',
			cookie: 'UM_distinctid=1620961ffe43e6-0310cd7dbe87e7-32637b05-13c680-1620961ffe5459; csrftoken=267d69c05bc38432da4b1252fec41b0a; W2atIF=1; _ga=GA1.2.1848643236.1520575847; _gid=GA1.2.2068808734.1520575847; _ba=BA0.2-20180309-51225-NAYLXFQCLe99p7IG2EfD; bottom-banner-hide-status=true; tt_track_id=4f59b415fb409dd71eb3dbf4d41b32d2; uuid="w:f534ffe0b07f46c48f9091b55dfd867c"; login_flag=5bd06e7274d3398faa5238142524fb6d; sessionid=f2a92441dba70ce34db829f8a84a4c58; uid_tt=aad26983e880885abcf73617ce40700d; sid_tt=f2a92441dba70ce34db829f8a84a4c58; sid_guard="f2a92441dba70ce34db829f8a84a4c58|1520577022|15552000|Wed\054 05-Sep-2018 06:30:22 GMT"; defaultSearchAction=toutiao; sso_login_status=0; __tasessionId=1dpncgqp71520580228312; tt_webid=75186185892; utm_source=toutiao'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

// 热门新闻
app.get('/api/getHotNews', function (req, res) {
  var url = 'https://m.weibo.cn/api/container/getIndex'
  axios.get(url, {
    headers: {
			referer: 'https://m.weibo.com/p/index',
      host: 'm.weibo.cn'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

// 文章详情
app.get('/api/getBlogDetail', function (req, res) {
  var url = 'https://m.toutiao.com/i' + req.query.id + '/info/'
  axios.get(url, {
    headers: {
			referer: 'https://m.toutiao.com',
			host: 'm.toutiao.com',
			cookie: 'UM_distinctid=1620961ffe43e6-0310cd7dbe87e7-32637b05-13c680-1620961ffe5459; tt_webid=6530823498980787726; csrftoken=267d69c05bc38432da4b1252fec41b0a; W2atIF=1; _ga=GA1.2.1848643236.1520575847; _gid=GA1.2.2068808734.1520575847; __tasessionId=aiitcjctm1520575848860; _ba=BA0.2-20180309-51225-NAYLXFQCLe99p7IG2EfD; bottom-banner-hide-status=true; tt_track_id=4f59b415fb409dd71eb3dbf4d41b32d2; uuid="w:f534ffe0b07f46c48f9091b55dfd867c"; sso_login_status=1; login_flag=5bd06e7274d3398faa5238142524fb6d; sessionid=f2a92441dba70ce34db829f8a84a4c58; uid_tt=aad26983e880885abcf73617ce40700d; sid_tt=f2a92441dba70ce34db829f8a84a4c58; sid_guard="f2a92441dba70ce34db829f8a84a4c58|1520577022|15552000|Wed\054 05-Sep-2018 06:30:22 GMT"'
    }
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

app.get('/channel', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html')
})

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});