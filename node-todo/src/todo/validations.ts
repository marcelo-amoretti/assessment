import Joi from 'joi';

const createTodo = Joi.object({
  body: {
    text: Joi.string().required(),
    priority: Joi.number().min(1).max(5).default(3),
    done: Joi.boolean().default(false),
  },
});

const deleteTodo = Joi.object({
  params: {
    id: Joi.string().required(),
  },
});

const getTodo = Joi.object({
  params: {
    id: Joi.string(),
  },
});

const updateTodo = Joi.object({
  body: {
    id: Joi.string().required(),
    text: Joi.string()
      .required()
      .regex(/^[a-zA-Z ]*$/),
    priority: Joi.number().min(1).max(5).optional(),
    done: Joi.boolean().optional(),
    updated_at: Joi.string().allow(null, ''),
    deleted_at: Joi.string().allow(null, ''),
  },
  params: {
    id: Joi.string().required(),
  },
});

export { createTodo, deleteTodo, getTodo, updateTodo };
