#! /usr/bin/env node

import inquirer from "inquirer"
import chalk from "chalk"


const apiLink = 'https://opentdb.com/api.php?amount=30&category=18&difficulty=easy&type=multiple'

const fetchData = async (data:string) => {
    let fetchQuiz = await fetch(data);
    let response = await fetchQuiz.json();
    return response.results
}

let data = await fetchData(apiLink)


let startQuiz = async() => {
    let score:number = 0
    // for userName
    let name = await inquirer.prompt([

       { name: 'userName',
        type: 'input',
        message: 'What is your Name?'}
    ])
    let quizAttempt = await inquirer.prompt({
        name:'quizCount',
        type: 'number',
        message: 'How many quizzes do you want to attempt?\n (maximum 30)',
    })

    let quizzes = parseInt(quizAttempt.quizCount)

    for (let i = 1; i <= quizzes; i++){
        let answers = [...data[i].incorrect_answers, data[i].correct_answer]

        let ans = await inquirer.prompt({
            name: 'quiz',
            type: 'list',
            message: data[i].question,
            choices: answers.map((val:any)=>  val)
        })

        if(ans.quiz == data[i].correct_answer) {
            ++score


        }
    }
    
    if(score == 0){
        console.log(chalk.red.bold(`${name.userName} Your Quiz score is ${score}`));
    }else{
        console.log(chalk.green.bold(`${name.userName} Your Quiz score is ${score}`));
    }
}

startQuiz()
