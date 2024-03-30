// const { json } = require("express");

// const fetch = require("node-fetch");
let runfrequency=0;
let numberofquestion=0;
let times=0;
let jason={};

let zeesha = document.getElementById('zeeshan')

function createform(){
    times = document.getElementById("NumberofQuestions").value;
    if(numberofquestion!=times){
        if(document.forms.length == 2){
            numberofquestion=0;
            createform_soul(times);
            runfrequency++;
            numberofquestion=times;
        }
        else{
            let div = document.querySelectorAll("#Question");
            div.forEach(dynamicdiv =>{
                dynamicdiv.remove()
            });
            numberofquestion=0;
            createform_soul(times);
            runfrequency++;
            numberofquestion=times;
        }
    }
    else if(runfrequency){
        alert("you have to retype the number of questions");
    }
}

function createform_soul(times){
    for (let index = 0; index < times; index++) {
        let div = document.createElement("div");
        div.setAttribute("id", "Question");
        div.setAttribute("class" ,`Questions${index + 1}`);
        div.textContent=`Questions${index + 1}`;
        let form = document.createElement("form");
        form.setAttribute("id","dynamicForm");
        let rating = document.createElement("label");
        rating.setAttribute("for", "input_rating");
        rating.innerHTML= "Rating";
        let input_rating = document.createElement("input");
        input_rating.setAttribute("id", "input_rating");
        input_rating.setAttribute("name", "Rating");
        input_rating.setAttribute("type", "text");
        form.appendChild(rating);
        form.appendChild(input_rating);
        let tag = document.createElement("label");
        tag.setAttribute("for", "input_tag");
        tag.innerHTML= "tag";
        let input_tag = document.createElement("input");
        input_tag.setAttribute("id", "input_tag");
        input_tag.setAttribute("name", "tag");
        input_tag.setAttribute("type", "text");
        form.appendChild(tag);
        form.appendChild(input_tag);
        div.appendChild(form);
        document.getElementById("formcontainer").appendChild(div);
        
    }
}

document.getElementById("fetch").addEventListener("click",createJSON);

function sendhandle(){
    
}
function createJSON(){
    let question_data = document.querySelectorAll("#Question");
    let jason_obj1 = {}
    
    //Added the handle name for in the json object
    let handle_names = document.getElementById('EnterHandle')
    jason_obj1['Handle'] = handle_names.value
    for(let j = 0;j<question_data.length;++j){
        let jason_obj = {}
        let data_point = question_data[j].childNodes[1];

        for(let i = 0;i<data_point.elements.length;++i){
            let element = data_point.elements[i];
            jason_obj[element.name] = element.value;
        }
        jason_obj1[data_point.parentElement.className] = jason_obj;
    }
    jason = JSON.stringify(jason_obj1);
    console.log(jason);
    let questions = fetchQuestion(jason);
    // Questions(questions);
    


    //
    // return jason
}
var quest_automate_id = []


// {
//     {name:"",contestid:"",index:""},
//     {name:"",contestid:"",index:""},
//     {name:"",contestid:"",index:""},

// }
var questionContainer = document.getElementById('questionContainer')
async function fetchQuestion(data){
    // data = await axios(endpoint,data)
    questionContainer.innerHTML = ''
    await fetch('http://localhost:8200/sendData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    })
    .then(response => response.json())
    .then(data => {
        quest_automate_id = []
        console.log(data)
        for(i in data){
            quest_automate_id.push(data[i]); 
            console.log(i) 
            link = `<a href="https://codeforces.com/contest/${data[i].contestId}/problem/${data[i].index}" target="_blank">Link</a>`;

            questionContainer.innerHTML+= `${data[i].name} - ${link}<br>`;
        }
        console.log('Response from server:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    ///Here above in the data you will get the data from the server


    return data;
}


async function automateContest(){
    var dataa = {
        'Username' : document.getElementById('username'),
        'Password': document.getElementById('password'),
        'Contest Name':document.getElementById('contestName'),
        'Contest Duration':document.getElementById('contestDuration')
    }


    dataa = JSON.stringify(dataa)
    await fetch('http://localhost:8100/run-python-script', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: dataa
    })
    // .then(response => response.json())
    // .then(data => {
    //     console.log('Response from server:', data);
    //     zeesha.innerHTML+=data+'<br>'+'Hi this is the name'
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    // });


}
var button_contest = document.getElementById('button_contest').addEventListener('click',automateContest)


function Questions(questions){
    let div = document.getElementById("questionContainer");
    div.innerHTML="";
    let object = JSON.parse(questions);
    for(let index = 0;index<times;index++){
        let sect = document.createElement("section");
        sect.setAttribute("id", "Questiondisplay");
        sect.setAttribute("class", `Questions${index + 1}`);
        let heading = document.createElement("h3");
        heading.innerHTML = `Questions${index + 1}`;
        sect.appendChild(heading);
        for(let key in object[`Questions${index + 1}`]){
            if( (object[`Questions${index + 1}`]).hasOwnProperty(key)){
                let para = document.createElement("p");
                para.innerHTML = object[`Questions${index + 1}`][key];
                sect.appendChild(para);
            }
        }
        div.appendChild(sect);
    }
}

function selenium(id){
    let div = document.getElementById("answer");
    if(id.value == "yes"){
        div.innerHTML="";
        let para = document.createElement("p");
        para.innerHTML = "Nice";
        div.appendChild(para);
    }
    else{
        div.innerHTML = "";
        let questions = fetchQuestion(jason);
        Questions(questions);
    }
}
