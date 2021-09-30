import express, { Request, Response } from 'express'

const app = express()

app.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Welcome to WebCalendar API' })
})

app.listen(3333)
