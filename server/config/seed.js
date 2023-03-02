const path = require("path");
require('dotenv').config(path.join(__dirname, '../.env')); // .env is in different folder
const mongoose = require('mongoose');
const { MONGO_URL } = process.env;
const User = require("../models/User");
const Post = require("../models/Post");

async function run() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB.");

    // Resetting User
    await Promise.all([User.collection.drop(), Post.collection.drop()]);

    // Create a user
    const createUser = await User.create({ username: "user1", email: "user1@gmail.com" });
    console.log("createUser =", createUser);
    // Create many posts
    const posts = [];
    for (let i = 1; i <= 5; i++) {
      posts.push({ title: `Post${i}`, body: `Post${i} Body Data` });
    }
    const insertManyPosts = await Post.insertMany(posts);
    // console.log("insertManyPosts =", insertManyPosts);
    const postIds = insertManyPosts.map((post) => post._id);

    // Update the user reference to a list of post IDs
    const updatedUser = await User.findByIdAndUpdate(createUser._id, { posts: postIds }, { new: true });
    // console.log("updatedUser =", updatedUser);

  } catch (err) {
    console.log(err);
  } finally {
    await mongoose.connection.close();
  }
}

run().catch(console.dir);