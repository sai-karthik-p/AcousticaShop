import { createServer, Model, RestSerializer } from "miragejs";
import faker from "faker";

faker.seed(123);

export default function setupMockServer() {
  createServer({
    serializers: {
      application: RestSerializer
    },

    models: {
      product: Model
    },

    routes() {
      this.namespace = "api";
      this.timing = 3000;
      this.resource("products");
    },

    seeds(server) {
      [...Array(50)].forEach((_) => {
        server.create("product", {
          id: faker.datatype.uuid(),
          name: faker.commerce.productName(),
          image: faker.image.imageUrl(250, 250, "tech", true, false),
          price: faker.commerce.price(),
          discount: faker.datatype.number({ min: 3, max: 85 }),
          material: faker.commerce.productMaterial(),
          brand: faker.lorem.word(),
          inStock: faker.datatype.boolean(),
          fastDelivery: faker.datatype.boolean(),
          ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
          numberOfRatings: faker.datatype.number({ min: 1, max: 2000 }),
          offer: faker.random.arrayElement([
            "Big Billion Sale",
            "Black Friday Sale",
            "Republic Day Sale"
          ]),
          idealFor: faker.random.arrayElement([
            "Men",
            "Women",
            "Girl",
            "Boy",
            "Senior"
          ]),
          level: faker.random.arrayElement([
            "beginner",
            "intermediate",
            "advanced"
          ]),
          color: faker.commerce.color(),
          isInWishlist: false,
          isInCart: false
        });
      });
    }
  });
}
