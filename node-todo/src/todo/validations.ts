import Joi from 'joi';

const createTodo = Joi.object({
  body: {
    text: Joi.string().required(),
    priority: Joi.number().min(1).max(5).default(3),
    done: Joi.boolean().default(false),
  },
});

export { createTodo };
