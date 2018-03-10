var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.connect("mongodb://127.0.0.1:27017/smart_blog");
const con = mongoose.connection;
con.on("error", console.error.bind(console, "连接数据库失败"));

// 用户信息和发表的文章
mongoose.model(
  "user",
  new mongoose.Schema({
    username: { type: String, isRequired: true },
    password: { type: String, isRequired: true },
    email: { type: String, isRequired: true },
    list: { type: Object, default: [] },
    avatar: { type: String, default: "http://www.qdaily.com/images/missing_face.png" }
  })
);

//列表Model
mongoose.model(
  "article",
  new mongoose.Schema({
    title: { type: String, isRequired: true }, //标题
    content: { type: String, isRequired: true }, //内容
    createAt: { type: String, isRequired: true },
    pv: { type: Number, default: 0 },
    user: { type: ObjectId, ref: "User" },
    username: { type: String, isRequired: true },
    star: { type: Array, default: [] },
    comments: [
      {
        user: { type: ObjectId, ref: "User" }, //评论人
        content: { type: String }, //评论的内容
        createAt: { type: String, isRequired: true } //评论的时间
      }
    ]
  })
);

global.model = function(modelName) {
  return mongoose.model(modelName);
};
