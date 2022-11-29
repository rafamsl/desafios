import {faker} from "@faker-js/faker";
import { DATE_UTILS } from "./index.js"
faker.locale = "es";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const createFakeProduct = () => {
  return {
    id:faker.datatype.uuid(),
    title:faker.commerce.productName(),
    description:faker.commerce.productDescription(),
    code:faker.commerce.product(),
    price:faker.commerce.price(),
    thumbnail:faker.image.business(),
    stock: getRandomInt(1,50),
    timestamp: DATE_UTILS.getTimestamp(),
  }
};

export const FAKER = { createFakeProduct }
