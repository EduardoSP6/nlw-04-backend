import { Request, Response } from 'express';
import { User } from '../models/User';
import { getRepository } from 'typeorm';

class UserController {

    async create(request: Request, response: Response) {
        const {name, email} = request.body;

        const userRepository = getRepository(User);

        const userAlreadyExists = await userRepository.findOne({
            email
        });

        if (userAlreadyExists) {
            return response.status(400).json({
                error: 'User already exists!'
            });
        }

        const user = userRepository.create({
            name,
            email
        });

        await userRepository.save(user);

        return response.json(user);   
    }
}

export { UserController }