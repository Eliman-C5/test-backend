import request from 'supertest'
import app from '../../src/app';
import { describe, test, expect } from '@jest/globals'

type Responds = {
  email: string,
  tasks: [] | null,
  _id: string,
  __v: number
}

type User = {
  _id: string,
  __v: number,
  done: boolean,
  task: string,
  user: string
}

let testingTask: User

describe('GET /users', () => {
  
  test('Should return an array', async () => {
        
    const response = await request('http://localhost:8000').get('/api/users').send();

    expect(response.body).toBeInstanceOf(Array)
    
  })
  
  test('Should return status 200', async () => {
  
    const response = await request('http://localhost:8000').get('/api/users').send();
    
    expect(response.status).toBe(200)
  
  })
  
})

/////////////////////////////
describe('GET /get', () => {

  test('Should return the task passed by paremeter', async () => {
  
    //Se obtienen los usuarios
    const users = await request('http://localhost:8000').get('/api/users').send();

    //Se obtiene un usuario de la lista de usuarios
    const user = users.body.filter((item: Responds) => item.email === 'eliman1926@gmail.com')
  
    //Se obtiene el id del usuario
    const userId = user[0]._id
    
    //Se llaman las tareas de ese usuario
    const userTasks = await request('http://localhost:8000')
    .get(`/api/get/${userId}`)
    .send()
    .set('Authorization', 'Bearer testing');
    
    const currentTask = userTasks.body
    
    expect(currentTask).toContainEqual({
      _id: '65bb799ee753470fb408d66d',
      task: 'Prueba1',
      done: false,
      user: '65b9350ba23ec84d86ddfa95',
      __v: 0
    })
  
  })

})

/////////////////////////////
describe('POST /create', () => {

  test('It should return unauthorized if there is no user auhtenticated', async () => {
  
    const response = await request('http://localhost:8000')
    .post('/api/create')
    .send({task: 'Prueba1', email: 'pepito@test.com'})
    
    expect(response.body.error).toBe('Unauthorized - please login')

  
  })
  
  test(`It should return 'User not found'`, async () => {
  
    const response = await request('http://localhost:8000')
    .post('/api/create')
    .send({task: 'Prueba1', email: 'pepito@test.com'})
    .set('Authorization', 'Bearer testing')
    
    expect(response.body.error).toBe('User not found.')
  
  })
  
  test(`It should create a test user`, async () => {
  
    const response = await request('http://localhost:8000')
    .post('/api/create')
    .send({task: 'Prueba desde test', email: 'eliman1926@gmail.com'})
    .set('Authorization', 'Bearer testing')
    
    testingTask = response.body
    
    console.log(testingTask)
    
    expect(response.body.task).toBe('Prueba desde test')
  
  })

})

/////////////////////////////
describe('PUT /update/:id', () => {

  test('Should return a status code 200', async () => {
    
    //Se actualiza el usuario de prueba
    const updatedTask = await request('http://localhost:8000')
    .put(`/api/update/${testingTask._id}`)
    .send({task: testingTask.task, done: testingTask.done})
    .set('Authorization', 'Bearer testing')
    
    expect(updatedTask.statusCode).toBe(200)
  
  })

})

/////////////////////////////
describe('DELETE /delete/:id', () => {

  test('Should delete testingTask', async () => {
  
    const response = await request('http://localhost:8000')
    .delete(`/api/delete/${testingTask._id}`)
    .send()
    .set('Authorization', 'Bearer testing')
    
    expect(response.statusCode).toBe(200)
  
  })

})