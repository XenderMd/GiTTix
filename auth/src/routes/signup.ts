import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest, BadRequestError } from '@dstavila-gittix/common';
import { User } from '../models/user';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characthers'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new BadRequestError('Email in use');
      }

      const user = new User({ email, password });

      await user.save();

      // Generate JWT
      const userJwt = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_KEY!
      );

      // Store it on the session object

      req.session = {
        jwt: userJwt,
      };

      return res.status(201).send(user);
    } catch (error) {
      next(error);
    }
  }
);

export { router as signupRouter };
