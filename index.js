const express=require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app=express()
const cors=require('cors')

// const jwt=require('jsonwebtoken')
require('dotenv').config()
const port=process.env.PORT || 5000;

//middle wire

app.use(express.json())
app.use(cors())



const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.7auoehb.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const teamCollection=client.db('To-do-application').collection('team-member')
    const testimonialCollection=client.db('To-do-application').collection('testimonials')
    const contactCollection=client.db('To-do-application').collection('contacts')
    
    app.get('/teams',async(req,res)=>{
  
        const result=await teamCollection.find().toArray()
        res.send(result)
      })

    app.get('/users',async(req,res)=>{
  
        const result=await testimonialCollection.find().toArray()
        res.send(result)
      })

    app.get('/contact',async(req,res)=>{
  
        const result=await contactCollection.find().toArray()
        res.send(result)
      })



    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('bos the sitting')
})

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})