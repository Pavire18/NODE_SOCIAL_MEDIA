import mongoose, { Schema } from "mongoose";
import { connect } from "../db";
import { User, userA } from "../models/User";;
import { randomNumber } from "../utils/utils";
import { userList } from "./data/user.data";
import { friendRequestList } from "./data/friendRequest.data";
import { FriendRequest, friendRequestA } from "../models/FriendRequest";
import { Group, groupA } from "../models/Group";
import { groupList } from "./data/group.data";
import { postList } from "./data/post.data";
import { Post, postA } from "../models/Post";


async function populateBBDD() {
  try {
    await connect();
    console.log("Tenemos conexión");

    // BORRADO DE DATOS
    await User.collection.drop();
    await FriendRequest.collection.drop();
    await Group.collection.drop();
    await Post.collection.drop();

    // USERS
    const userDocuments : userA[]= userList.map((user) => new User(user));
    for (let i = 0; i < userDocuments.length; i++) {
      const user = userDocuments[i];
      user.friends =[userDocuments[randomNumber(0,userDocuments.length-1)]._id];
      await user.save();
    }

    // FRIEND REQUESTS
    const friendRequestDocuments: friendRequestA[] = friendRequestList.map((friendRequest) => new FriendRequest(friendRequest));
    friendRequestDocuments.forEach(fr => {
      const senderNum=randomNumber(0,userDocuments.length-1);
      fr.sender = userDocuments[senderNum]._id;
      fr.receiver = userDocuments[randomNumber(0,userDocuments.length-1,senderNum)]._id;
    });

    // GROUPS
    const groupDocuments : groupA[]= groupList.map((group) => new Group(group));
    groupDocuments.forEach(g => {
      const adminNum=randomNumber(0,userDocuments.length-1);
      g.admin=userDocuments[adminNum]._id;
      g.members= [g.admin];
    });

    // POSTS
    const postDocuments : postA[] = postList.map((post) => new Post(post));
    postDocuments.forEach(p => {
      p.publisher = userDocuments[randomNumber(0,userDocuments.length-1)]._id;
      if(p.group === null){
        p.group = groupDocuments[randomNumber(0,groupDocuments.length-1)]._id;
      }
    });

    // INSERTS
    console.log(friendRequestDocuments);
    await FriendRequest.insertMany(friendRequestDocuments);
    await Group.insertMany(groupDocuments);
    await Post.insertMany(postDocuments);
    console.log("Datos guardados correctamente!");
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
}

populateBBDD();
