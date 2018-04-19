var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.connect("mongodb://127.0.0.1:27017/smart_blog");
const con = mongoose.connection;
con.on("error", console.error.bind(console, "连接数据库失败"));

// 用户信息和发表的文章
mongoose.model(
  "user",
  new mongoose.Schema({
    account: { type: String, isRequired: true },
    password: { type: String, isRequired: true },
    email: { type: String, isRequired: true },
    list: { type: Array, default: [] },
    username: { type: String, default: '用户名' + Number.parseInt(Math.random() * 100000) },
    signature: { type: String, default: '这家伙很懒，什么也没有留下...'},
    homepage: { type: String, default: '' },
    avatar: { type: String, default: "http://www.qdaily.com/images/missing_face.png" },
    follow: { type: Array, default: [] },
    fans: { type: Array, default: [] },
    collect: { type: Array, default: [] },
    transmit: { type: Array, default: [] }
  })
);

//列表Model
mongoose.model(
  "article",
  new mongoose.Schema({
    title: { type: String, isRequired: true },
    time: { type: String, isRequired: true },    
    content: { type: String, default: '' },
    authorId: { type: String, default: 0 },
    username: { type: String, isRequired: true },
    useravatar: { type: String, default: "http://www.qdaily.com/images/missing_face.png" },
    keyword: { type: Array, default: [] },
    imgList: { type: Array, default: [] },
    id: { type: String, default: 0 },
    transmit: { type: Array, default: [] },
    comment: { type: Array, default: [] },
    favor: { type: Array, default: [] },
    type: { type: String, default: '__all__' }
  })
);

//列表Model
mongoose.model(
  "ubt",
  new mongoose.Schema({
    user_id: { type: String, isRequired: true },
    article_id: { type: String, isRequired: true },
    havior: { type: String, isRequired: true }
  })
);

global.model = function(modelName) {
  return mongoose.model(modelName);
};
