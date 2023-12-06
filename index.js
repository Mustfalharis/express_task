
const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
const fs = require("fs");
app.use(express.json());
const data = fs.readFileSync("./users.json", "utf8");
const users = JSON.parse(data)
const responseError = (message)=>{
    return  response = {
        success: false,
        message: message,
    };
}
const responseSuccess = (data)=>{
    return  response = {
        success: true,
        data: data,
    };
}

app.get('/', (req, res) => {
    
    res.send('Hello World')
})
app.get('/getUsers', (req, res) => {
    if(users.length==0)
    {
        res.json(responseError('Array Empty '));
    }
    res.json(responseSuccess(users)); 
})
app.get('/getFirstUser', (req, res) => {
    if(users.length ==0)
    {
        res.json(responseError('Array Empty '));
    }
    const firstUser  = users[0];
    res.json(responseSuccess(firstUser));
})
app.get('/getLastUser', (req, res) => {
    if(users.length ==0)
    {
        res.json(responseError('Array Empty '));
    }
      arrayLenght  = users.length;
      lsatUser = users[arrayLenght-1];
    res.json(responseSuccess(lsatUser));
})
app.post('/userById', (req, res) => {
    const userId = parseInt(req.body.id);
    // check 
    if(isNaN(userId)){
        res.json(responseError('Please Enter ID'));
    }
    const user =  users.find(e=>e.id==userId);
        if (user) {
            res.json(responseSuccess(user));
        } else {
            res.json(responseError('User Not Found'));

        }
})

app.post('/compName', (req, res) => {
    const compyName = req.body.name;
    // check 
    if(compyName === ""){
        res.json(responseError('Please Enter compyName'));
    }
    const compy =  users.find(e=>e.company.name==compyName)
        if (compy) {
            res.json(responseSuccess(compy));
        } else {
            res.json(responseError('comp Not Found'));

        }
})

app.post('/cityName', (req, res) => {
    const cityName = req.body.name;
    // check 
    if(cityName === ""){
        res.json(responseError('Please Enter cityName'));
    }
    const  city =  users.find(e=>e.address.city==cityName)
        if (city) {
            res.json(responseSuccess(city));
        } else {
            res.json(responseError('city Not Found'));

        }
})

app.post('/street', (req, res) => {
    const userId = parseInt(req.body.id);
    // check 
    if(isNaN(userId)){
        res.json(responseError('Please Enter ID'));
    }
    const user =  users.find(e=>e.id==userId);
        if (user) {
            res.json(responseSuccess(user.address.street));
        } else {
            res.json(responseError('User Not Found'));

        }
})

app.post('/addUser', (req, res) => {
    const userName = req.body.name;
    const age = parseInt(req.body.age)
    if(userName == ""){
        res.json(responseError('Please Enter Name'));
    }
    if(isNaN(age)){
        res.json(responseError('Please Enter Age'));
    }
    const newUser = {
        id:users.length,
        name:userName,
        age:age
    }
    try {
        users.push(newUser);
        res.json(responseSuccess());
    } catch (error) {
        res.json(responseError(error));

    }
})

app.post('/updateUser', (req, res) => {
    const newName = parseInt(req.body.name)
    const userId = parseInt(req.body.id)
    if(newName == ""){
        res.json(responseError('Please Enter Name'));
    }
   
    if(isNaN(userId)){
        res.json(responseError('Please Enter Id'));
    }
    const user = users.find(e=>e.id==userId);
    user.name = newName
    res.json(responseSuccess());
})

app.post('/deleteUser', (req, res) => {
    const userId = parseInt(req.body.id)
    if(isNaN(userId)){
        res.json(responseError('Please Enter Id'));
    }
    users = users.filter(e=>e.id !=userId)
    res.json(responseSuccess());
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
