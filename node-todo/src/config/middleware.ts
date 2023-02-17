import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Schema } from 'joi';

export const validate = (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({
      message: error.details?.[0].message || 'Validation error',
    });
  } else {
    next();
  }
};
