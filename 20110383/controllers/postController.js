const { comments } = require("../models/comments");
const { posts } = require("../models/posts");

exports.getAllPost = (req, res) => {
  // res.status(200).json(posts);
  res.render("posts/getAllPost", { posts: posts });
};

exports.getAuthorPost = (req, res) => {
  const author = req.params.author;
  const postAuthor = posts.filter((post) => post.author === author);
  if (postAuthor) {
    res.render("posts/getAuthorPost", { posts: postAuthor });
  } else {
    res.status(400).json({ error: "No post" });
  }
};

exports.getDetailPost = (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((post) => post.id === id);
  const commentPost = comments.filter((comment) => comment.postId === post.id);
  if (post) {
    res.render("posts/getDetailPost", { post: post, comment: commentPost });
  } else {
    res.status(400).json({ error: "No post" });
  }
};

exports.addPost = (req, res) => {
  const id = posts.length + 1;
  // Lấy thông tin từ request body
  const { title, content, author } = req.body;
  // Tạo một đối tượng post mới
  const newPost = {
    id: id, // Hãy tạo một hàm generateUniqueId để tạo ID mới
    title,
    author,
    content,
  };

  posts.push(newPost);
  res.redirect("/");
};

exports.editPost = (req, res) => {
  // Lấy ID bài viết cần sửa từ request params
  const postId = req.params.id;
  // Tìm bài viết trong danh sách posts (models) dựa trên ID
  const postIndex = posts.findIndex((post) => post.id == postId);
  // Kiểm tra nếu không tìm thấy bài viết
  if (postIndex === -1) {
    return res.status(404).send("The Posts is not existed.");
  }
  // Lấy thông tin cần sửa từ request body
  const { title, content, author } = req.body;

  // Cập nhật thông tin bài viết
  posts[postIndex].title = title;
  posts[postIndex].content = content;
  posts[postIndex].author = author;

  // Chuyển hướng hoặc hiển thị thông báo thành công
  res.redirect("/"); // Chuyển hướng đến trang danh sách bài viết sau khi sửa
};

exports.deletePost = (req, res) => {
  // Lấy ID bài viết cần xóa từ request params
  const postId = req.params.id;
  // Tìm bài viết trong danh sách posts (models) dựa trên ID
  const postIndex = posts.findIndex((post) => post.id == postId);
  // Kiểm tra nếu không tìm thấy bài viết
  if (postIndex === -1) {
    return res.status(404).send("Bài viết không tồn tại.");
  }
  // Xóa bài viết khỏi danh sách
  posts.splice(postIndex, 1);

  // Chuyển hướng hoặc hiển thị thông báo thành công
  res.redirect("/"); // Chuyển hướng đến trang danh sách bài viết sau khi xóa
};
