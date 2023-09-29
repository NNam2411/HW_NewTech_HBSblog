const { comments } = require("../models/comments");
const { posts } = require("../models/posts");

exports.getComment = (req, res) => {
  const post_id = Number(req.params.id);
  const comment = comments.filter((comment) => comment.post_id === post_id);
  if (comment) {
    res.status(200).json(comment);
  } else {
    res.status(400).json({ error: "No comment" });
  }
};
exports.postComment = (req, res) => {
  // Lấy thông tin từ request body
  const postId = Number(req.params.id);
  const { author, content } = req.body;
  const id = comments.length + 1;

  // Tạo một đối tượng comment mới
  const newComment = {
    id: id, // Hãy tạo một hàm generateUniqueId để tạo ID mới
    postId,
    author,
    content,
  };

  // Thêm comment mới vào danh sách comments (models)
  comments.push(newComment);

  // Chuyển hướng hoặc hiển thị thông báo thành công
  res.redirect(`/detail/${postId}`); // Chuyển hướng đến trang danh sách bài viết sau khi thêm comment
};
