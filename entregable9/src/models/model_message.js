import { Schema } from "mongoose";
import { UsersModel } from "./model_users.js";

const MessagesCollection = "mensajes";

const MessageSchema = new Schema(
  {
    text: { type: String, required: true, max: 280 },
    author:{ type: Schema.Types.ObjectId, ref: 'usuarios' }
  },
  {
    virtuals: true,
  }
);

MessageSchema.set("toJSON", {
  transform: (_, response) => {
    response.id = response._id;
    delete response.__v;
    delete response._id;
    return response;
  },
});

export const MessageModel = { MessagesCollection, MessageSchema };