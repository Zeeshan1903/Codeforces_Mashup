const express = require('express');
// const { get } = require('http');
const app = express();
const path = require('path')
const cors = require('cors')
const fetch = require('node-fetch'); // Import fetch
app.use(express.json());
app.use(cors())
app.get('/',(req,res)=>{
    const index = path.join(__dirname,'index.html')
    res.sendFile(index)
})
app.get('/script.js',(req,res)=>{
    const js = path.join(__dirname,'script.js')
    res.sendFile(js)
})





var data_qu = {}

app.post('/sendData', async (req, res) => {
    // Receive data from client
    const receivedData = req.body;

    //Here we are checking just what data we have received now 
    console.log(receivedData.Handle)
    console.log(receivedData.Questions1.tag)
    data_qu = {
        0: {name:"zeeshan" , contestId:"967",index:"A"},
        1: {name:"zeeshan" , contestId:"947",index:"A"},
        2 : {name:"zeeshan" , contestId:"927",index:"A"}
    }
    res.json(data_qu)
    
    // async function getData(rating,types) {



    //     //Here just addd the rating and teh types in between the urls to make them input oriented
    //     let url_myprob = ' https://codeforces.com/api/user.status?handle=Fefer_Ivan&from=1&count=1000';
    
    //     //Taking url of all problem set 
    //     let url_probSet = 'https://codeforces.com/api/problemset.problems?tags=implementation';
    //     //Fetching mine problems 
    //     // let data1 = await fetch(url_myprob);
    //     // let convertdata1 = await data1.json();
    
    //     // //Fetching the problems 
    //     // let data2 = await fetch(url_probSet);
    //     // let convertdata2 = await data2.json();
        
        
    //     //No of problems we want 
    //     var no_prob = 0;
    //     var qus_sets = []
    //     for (let i = 0; i < convertdata2.result.problems.length && no_prob <= 1; i++) {
        
    //         for (let j = 0; j < convertdata1.result.length && no_prob <= 1; j++) {
             
    //             if (convertdata2.result.problems[j].contestId == convertdata1.result[j].contestId) {
    //                 j++;
    //             }
    //             else  {
             
    //                 let t = [convertdata2.result.problems[j].contestId, convertdata2.result.problems[j].index]
              
    //                 qus_sets.push(t)
      
    //                 no_prob++;
    //             }
    //         }
    //     }

    //     return qus_sets
    // }
    

    // for(ele in receivedData){
    //     if(ele == 'Handle'){

    //     }
    //     else{
  
    //         let a = await getData(parseInt(ele.Range_of_Rating),ele.Implimentation)

    //         console.log(a)
            
    //         data_qu[ele] = a
    //     }
    // }
    // console.log(data_qu)

    // console.log('Data received from client:', receivedData);
    
    // // Send a response back to the client


    ///Here I am sending the data in the form of the json Now you have to add this by properly seeing and running this file to your frontend
    const responseData =  data_qu ;
    res.json(responseData);
});

var port  = 8200
app.listen(port, () => {
    console.log('Server started at http://localhost: '+port);
});
