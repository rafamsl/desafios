import mongoose from "mongoose";

class ContenedorMongo {
  constructor({ name, schema }) {
    this.model = mongoose.model(name, schema);
  }

  async getAll() {
    const response = await this.model.find();
    return response;
  }

  async save(element) {
    console.log("saving")
    const response = await this.model.create(element);
    return response;
  }

  async getById(id) {
    const response = await this.model.findById(id);

    return response;
  }
  async getByCodigo(codigo){
    return null // TBD
  }

  async update(id, newData) {
    const response = await this.model.findByIdAndUpdate(id, newData, {
      new: true,
    });
    return response;
  }

  async deleteById(id) {
    const response = await this.model.findByIdAndDelete(id);
    return response;
  }
}

export default ContenedorMongo ;