import { Schema } from "mongoose";

const UserCollection = "usuarios";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique : true, max: 100 },
    password :{type: String, max: 30},
    carrito: { type: Schema.Types.ObjectId, ref: "carritos" },
    timestamp: { type: String, required: true, max: 100 }
  },
  {
    virtuals: true,
  }
);  

UserSchema.set("toJSON", {
  transform: (_, response) => {
    response.id = response._id;
    delete response.__v;
    delete response._id;
    return response;
  },
});

export const UserModel = { UserCollection, UserSchema };