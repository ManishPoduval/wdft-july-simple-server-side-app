const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const TodoModel = require('../models/Todo.model')

router.get('/', (req, res) => {
    res.render('landing.hbs')
})

router.get('/all-todos', (req, res) => {
    TodoModel.find()
        .then((todos) => {
            console.log(todos)
            res.render('all-todo.hbs', {todos})
        })
    
})

//GET REQUEST
router.get('/create', (req, res) => {
    res.render('create-todo.hbs')
})

//POST REQUEST
router.post('/create', (req, res) => {
    console.log(req.body)
    TodoModel.create(req.body)
        .then(() => {
            res.render('create-todo.hbs', {successTodo: true})
        })
   
})



router.get('/todo/:id', (req, res) => {
    console.log(req.params.id)
    TodoModel.findById(req.params.id)
        .then((result) => {
            console.log(result)
            res.render('todo-detail.hbs', {result})
        })
})

router.get('/todo/:id/delete', (req, res) => {
    console.log(req.params.id)
    TodoModel.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/all-todos')
        })
})


router.get('/todo/:id/edit', (req, res) => {
    TodoModel.findById(req.params.id)
        .then((todo) => {
            res.render('edit-todo.hbs', {todo})
        })
})

router.post('/todo/:id/edit', (req, res) => {
    let {name, description} = req.body
    let todoId = req.params.id
    TodoModel.findByIdAndUpdate(todoId, {$set: {name, description}})
        .then(() => {
            res.redirect('/all-todos')
        })
})

module.exports = router