const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qzdbt4w.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const userCollection = client.db("photography").collection("user");
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

    // const name = {
    //   address: "mirpur",
    // };
    // const item = await userCollection.insertOne(name);
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
