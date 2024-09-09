const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const router=express.Router()
app.use(cors());
app.use(express.json())

const mongoUrl = process.env.MONGO_URL;

mongoose
  .connect(mongoUrl)
  .then(() => console.log("mongo db connected"))
  .catch((err) => console.log("error", err));

const schema_todo= new mongoose.Schema({
    todo_task:{
        type:String,
        required:true,
    },
})
const Todo = mongoose.model('Todo', schema_todo);

app.get("/", (req, res) => {
    res.send("Welcome to the To-Do API");
  });
  
router.post("/",
    async (req,res)=>{
        
        const { todo_task } = req.body;
        console.log(req.body)
        if(!todo_task){
            return res.status(400).json({error:"no todo"})
        }
        const todo_data=new Todo({
            todo_task,
        })
        await todo_data.save();
        res.json({message:"Todo data saved succesfully"})
    }
)
router.get("/",
    async (req,res)=>{
        const datas=await Todo.find();
        res.json(datas);
    }
)
router.patch("/:id",
    async (req,res)=>{
        const id = req.params.id;
        const { todo_task } = req.body;
        const dataaa=await Todo.findById(id)
        if(!dataaa) return res.status(404).json({ message: "Note not found" });
        if(todo_task) dataaa.todo_task=todo_task; 
        await dataaa.save();
        res.json({ message: "Todo updated successfully" });
    }
)
router.delete("/:id",
    async (req,res)=>{
    const id = req.params.id;
    const dataaa=await Todo.findById(id)
    if(!dataaa) return res.status(404).json({ message: "Note not found" });
    await Todo.deleteOne({_id:id})
    res.json({ message: "note deleted" });
    }
)

app.use('/todos',router)

app.listen(6900, () => console.log("Server started"));
