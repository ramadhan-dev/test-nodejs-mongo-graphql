const Post = require('./../models/post');

exports.getPost = (req, res) => {
  Post.find()
    .then(posts => {
      res.json({
        data: posts,
        message: 'Success',
        status: res.statusCode
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.pagePost = (req, res) => {
  const id = req.params.id;
  Post.findById(id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
};

exports.createPost = (req, res) => {
  const post = new Post(req.body);
  post.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }

    res.status(200).json({
      message: result
    });
  });
};
