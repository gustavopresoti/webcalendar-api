import { Request, Response } from 'express';
import Event from '@models/Events'

class EventController {
  async create(request: Request, response: Response) {
    const { description, beginDate, endDate } = request.body

    try {
      let newEvent = await Event.findOne({ description })

      if (!newEvent) {
        newEvent = await Event.create({
          description,
          beginDate,
          endDate
        })

        return response.status(201).json({
          id: newEvent.get('_id'),
          description: newEvent.get('description'),
          beginDate: newEvent.get('beginDate'),
          endDate: newEvent.get('endDate'),
        })
      } else {
        return response.status(409).json({ error: 'Evento já cadastrado' })
      }
    } catch (error) {
      response.status(500).json({ error: 'Erro no servidor. Tente novamente!' })
    }
  }

  async show(_: Request, response: Response) {
    try {
      const events = await Event.find({})

      return response.status(200).json(events)
    } catch (error) {
      response.status(500).json({ error: 'Erro no servidor. Tente novamente!' })
    }
  }

  async get(request: Request, response: Response) {
    const { eventDescription } = request.body

    try {
      const event = await Event.findOne({ description: { $regex: new RegExp('^' + eventDescription.toLowerCase(), 'i') } })

      if (event) {
        return response.status(200).json(event)
      } else {
        return response.status(404).json({ error: 'Evento não encontrado' })
      }

    } catch (error) {
      response.status(500).json({ error: 'Erro no servidor. Tente novamente!' })
    }
  }

  async update(request: Request, response: Response) {
    try {

    } catch (error) {
      response.status(500).json({ error: 'Erro no servidor. Tente novamente!' })
    }
  }

  async delete(request: Request, response: Response) {
    try {

    } catch (error) {
      response.status(500).json({ error: 'Erro no servidor. Tente novamente!' })
    }
  }
}

export default EventController