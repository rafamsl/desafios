import { Schema } from "mongoose";

const CartCollection = "carritos";

const CartSchema = new Schema(
  {
    timestamp: { type: String, required: true, max: 100 },
    productos: [{id: { type: Schema.Types.ObjectId, ref: "productos" }, quantity: {type: Number}}],
  },
  {
    virtuals: true,
  }
);

CartSchema.set("toJSON", {
  transform: (_, response) => {
    response.id = response._id;
    delete response._id;
    return response;
  },
});

export const CartModel = { CartCollection, CartSchema };