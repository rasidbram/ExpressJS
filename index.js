const express= require('express');
const bodyParser=require('body-parser')
const moment=require('moment')
const fs=require('fs')

const app=express();
app.use(bodyParser.json());

const calculator=require('./helper')

var todoList=['do shopping','meeting on 8pm','watch the serie']

// 1./calculator/num1/num2/operator route(GET) that works with these operators: +, -, *, /
app.get('/calculator/:num1/:num2/:operator',(req,res)=>{
    let { num1, num2, operator}=req.params;
    console.log(req.params)
    res.send(String(calculator(num1, num2, operator)))
})

// 2./todo route that makes possible to add new todo with POST, get all todos with GET, delete a todo with DELETE method.

// get all todoList
app.get('/todo',(req,res)=>{ 
    res.send(todoList)
})

// add new todo to todolist
app.post('/todo',(req,res)=>{
    console.log(req.body)
    todoList.push(req.body.todo)
    res.send(todoList)
})

//delete a todo from the existing list

app.delete('/todo/:parametres',(req,res)=>{
  var {parametres}=req.params
  
  todoList=todoList.filter(n=> n !== parametres)
  res.send(todoList)
})

//3./future/hours route(GET) that adds given hours to the current datetime and returns result

app.get('/future/:hours',(req,res)=>{

 res.send(moment().add(req.params.hours,'hours').format('LLL'))
//  to get day from future, write days instead of hours
})


//4./login route((POST) that checks if the given username and password is correct or not and will respond with appropriate status code.

app.post('/login',(req,res)=>{
var {Username,Password}=req.body
    if(Username==='admin' && Password==='password'){
        res.send('Success')
    }else{
        res.sendStatus(401)
    }
})
//5./report route(POST) that gets the example data below and creates a json file based on that report in the reports folder. The json file will have the name of customer.

app.post('/report',(req,res)=>{
    var { customer }=req.body;

    var isExist=fs.existsSync('./report');

    if(!isExist){
        fs.mkdirSync('./report')
    }

    
    fs.writeFileSync(`./report/${customer}.json`,JSON.stringify(req.body))

    res.send('saved')

})




app.listen(3030,()=>{
    console.log('SErver is running on port 3030')
})