const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qzdbt4w.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const userCollection = client.db("photography").collection("user");
    const orderCollection = client.db("customer").collection("order");
    const reviewCollection = client.db("userSummery").collection("review");

    app.post("/review", async (req, res) => {
      const order = req.body;
      const result = await reviewCollection.insertOne(order);
      console.log(result);
      res.send(result);
    });

    app.delete("/review/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await reviewCollection.deleteOne(query);
      res.send(result);
    });

    app.get("/review", async (req, res) => {
      const email = req.query.email;
      console.log(email);
      const query = { email: email };
      const cursor = reviewCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/items", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query).limit(3);
      const result = await cursor.toArray();
      // console.log(result);
      res.send(result);
    });
    app.get("/allcatg", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const result = await cursor.toArray();
      // console.log(result);
      res.send(result);
    });

    app.get("/detail/:id", async (req, res) => {
      const id = req.params.id;

      const filter = { _id: ObjectId(id) };
      const cursor = await userCollection.findOne(filter);

      res.send(cursor);
    });

    // app.get("/detail/:id", async (req, res) => {
    //   const id = req.params.id;

    //   const filter = { _id: ObjectId(id) };
    //   const cursor = await userCollection.findOne(filter);

    //   res.send(cursor);
    // });

    app.get("/orders/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const filter = { service_id: id };
      const cursor = orderCollection.find(filter);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/orders", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const cursor = orderCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/orders", async (req, res) => {
      const order = req.body;
      const result = await orderCollection.insertOne(order);
      console.log(result);
      res.send(result);
    });

    app.delete("/orders/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await orderCollection.deleteOne(query);
      res.send(result);
    });

    // const name = {
    //   address: "mirpur",
    // };
    // const item = await orderCollection.insertOne(name);
    // console.log(item);
    // res.send(item);

   
  } finally {
  }
}
run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Everything will be okay");
});
app.listen(port, () => {
  console.log(`port is running on ${port}`);
});
