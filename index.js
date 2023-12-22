const express=require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app=express()
const cors=require('cors')

// const jwt=require('jsonwebtoken')
require('dotenv').config()
const port=process.env.PORT || 5000;

//middle wire
app.use(cors({
  origin:[
   'http://localhost:5173',
   'https://toothsome-cellar.surge.sh',
    'https://task-management-system-8c466.firebaseapp.com',
    'https://task-management-system-8c466.web.app'
  ],
  credentials:true
}));
app.use(express.json())
app.use(cors())

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
    const taskCollection=client.db('To-do-application').collection('task-gallary')
    const addTaskCollection=client.db('To-do-application').collection('addTask')
    
    //Team section
    app.get('/teams',async(req,res)=>{
  
        const result=await teamCollection.find().toArray()
        res.send(result)
      })

      //Testimonials section
    app.get('/users',async(req,res)=>{
  
        const result=await testimonialCollection.find().toArray()
        res.send(result)
      })

      //Contact section
    app.get('/contact',async(req,res)=>{
  
        const result=await contactCollection.find().toArray()
        res.send(result)
      })

      //Task section
    app.get('/taskGallary',async(req,res)=>{
  
        const result=await taskCollection.find().toArray()
        res.send(result)
      })

      //Added a task by mongodb 

      app.post('/addTask',async(req,res)=>{
        const items=req.body;
        const result=await addTaskCollection.insertOne(items)
        res.send(result)
      })

      //Get Task
      app.get('/getTask',async(req,res)=>{
  
        const result=await addTaskCollection.find().toArray()
        res.send(result)
      })

      app.delete('/deleteTask/:id',async(req,res)=>{
        const id=req.params.id;
        const query={_id: new ObjectId(id)}
      
        const result=await addTaskCollection.deleteOne(query)
        res.send(result)
      })

      app.get('/tasks/:id',async(req,res)=>{
        const id=req.params.id;
        const query={_id:new ObjectId(id)};
        const result=await addTaskCollection.findOne(query)
        res.send(result)
  
      })
      app.put('/tasks/:id',async(req,res)=>{
        const id=req.params.id;
        const filter={_id:new ObjectId(id)}
        const options = { upsert: true };
        const upDateTask=req.body;
        const task = {
          
          $set: {
            name:upDateTask.name,
            task_name:upDateTask.task_name,
            date:upDateTask.date,
            
             priority:upDateTask.priority,
             
          },
        
        };
        const result = await addTaskCollection.updateOne(filter, task, options);
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