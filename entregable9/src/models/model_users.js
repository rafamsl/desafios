import { Schema } from "mongoose";

const UsersCollection = "usuarios";

const UsersSchema = new Schema(
  {
   id:{ type: String, required: true, max: 100 },
    nombre: { type: String, required: true, max: 150 },
    apellido: { type: String, required: true, max: 150 },
    edad: { type: Number, required: true },
    alias: { type: String, required: true, max: 150 },
    avatar: { type: String, required: true, max: 100 }},
  {
    virtuals: true,
  }
);

UsersSchema.set("toJSON", {
  transform: (_, response) => {
    response.id = response._id;
    delete response.__v;
    delete response._id;
    return response;
  },
});

export const UsersModel = { UsersCollection, UsersSchema };