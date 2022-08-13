// import mongoose from "mongoose";

// //An interface that describes the properties required to create a new User
// interface UserAttrs {
//     email:string;
//     password:string;
// }

// // An interface that describes the properties that User model has
// interface UserModel extends mongoose.Model<UserDoc>{
//     build(attrs: UserAttrs):UserDoc;
// }

// // An interface taht describes the properties that a User Document has
// interface UserDoc extends mongoose.Document {
//     email:string;
//     password:string;
// }

// const userSchema = new mongoose.Schema({
//     email:{
//         type:String,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     }
// });

// userSchema.statics.build=(attrs:UserAttrs)=>{
//     return new User(attrs);
// }

// const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

// // const user = User.build({
// //     email:'test@test.com',
// //     password:'password'
// // });

// export {User};

//////////// Official Mongoose documentation implementation /////////////

import { Schema, model, connect } from 'mongoose';
import {Password} from '../services/password';

// 1. Create an interface representing a document in MongoDB.
interface IUserDocument {
  email: string;
  password: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUserDocument>({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

userSchema.pre('save', async function(done){
  if(this.isModified('password')){
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
})

// 3. Create a Model.
const UserModel = model<IUserDocument>('User', userSchema);

export class User extends UserModel {
    constructor(params: IUserDocument) {
      super(params)
    }
}