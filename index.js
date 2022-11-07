const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();

// user:mirpurUser
// pass:841HXzXx5kLLaiCE

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
    app.get("/item", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const result = await cursor.toArray();
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
