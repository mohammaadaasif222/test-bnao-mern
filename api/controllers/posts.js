import Post from "../models/Post.js";

export const createPost = async (request, response) => {
  try {
    const { title, location, description, picture } = request.body;

    const newPost = new Post({
      userId:request.user.id,
      postedBy:request.user.userName,
      title,
      location,
      description,
      picturePath:picture,
      likes: {},
      comments: [],
    });

    await newPost.save();
    response.status(201).json(newPost);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getFeedPosts = async (request, response) => {
  try {
    const post = await Post.find();
    response.status(200).json(post);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getUserPosts = async (request, response) => {
  try {
    const posts = await Post.find({ userId:request.user.id });
    response.status(200).json(posts);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getPost = async (request, response) => {
  try {
    const { id } = request.params;
    const post = await Post.findById(id);
    response.status(200).json(post);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const deleteUserPost = async (request, response) => {
  try {
    const { id } = request.params;
    const deletionResult = await Post.deleteOne({ _id: id, userId: request.user.id});

    if (deletionResult.deletedCount > 0) {
      response.status(200).json({ message: "User post deleted successfully" });
    } else {
      response.status(404).json({ message: "Post not found for the user" });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const updateUserPost = async (request, response) => { 
  try {
    const { id } = request.params;
    const updateData = request.body; 

    const updatedPost = await Post.findOneAndUpdate(
      { _id: id, userId:request.user.id },
      { $set: updateData },
      { new: true } 
    );

    if (updatedPost) {
      response.status(200).json({ message: 'User post updated successfully', updatedPost });
    } else {
      response.status(404).json({ message: 'Post not found for the user' });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};


export const commentToPost = async (request, response) => {
  try {
    const { id } = request.params;
    console.log(id);
    const { commentText } = request.body;

    const newComment = {
      userId:request.user.id,
      user:request.user.userName,
      commentText,
      createdAt: new Date(),
    };

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $push: { comments: newComment } },
      { new: true }
    );

    if (!updatedPost) {
      return response.status(404).json({ message: 'Post not found' });
    }

    response.status(200).json(updatedPost);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};


export const removeCommentFromPostByIndex = async (request, response) => {
  try {
    const { postId, commentIndex } = request.params; 

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $unset: { [`comments.${commentIndex}`]: 1 }, 
        $pull: { comments: null }, 
      },
      { new: true }
    );

    if (!updatedPost) {
      return response.status(404).json({ message: 'Post not found' });
    }

    response.status(200).json(updatedPost);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};


export const likeToPost = async (request, response) => {
  try {
    const { id } = request.params;
    const userId = request.user.id;
    const post = await Post.findById(id);
    if (!post) {
      return response.status(404).json({ message: 'Post not found' });
    }
    const existingLikeIndex = post.likes.findIndex(
      (like) => like.userId === userId
    );

    if (existingLikeIndex !== -1) {
      post.likes.splice(existingLikeIndex, 1);
    } else {

      const newLike = {
        userId,
        user: request.user.userName,
        createdAt: new Date(),
      };
      post.likes.push(newLike);
    }

    const updatedPost = await post.save();

    response.status(200).json(updatedPost);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
