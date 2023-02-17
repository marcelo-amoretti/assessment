import Joi from 'joi';

const createTodo = Joi.object({
  body: {
    text: Joi.string().required(),
    priority: Joi.number().min(1).max(5).default(3),
    done: Joi.boolean().default(false),
  },
});

const getTodo = Joi.object({
  params: {
    id: Joi.string(),
  },
});
export { createTodo, getTodo };
