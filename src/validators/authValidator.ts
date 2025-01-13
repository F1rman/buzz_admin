import Joi from 'joi';

const authValidator = Joi.object({
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
    }).required().messages({
        "string.empty": `Email is required`,
        "any.required": `Email is required`,
        "string.email": `Must be a valid email`,
    }),

    password: Joi.string()
        .min(8)
        .required()
        .messages({
            "string.min": `Password must be at least 8 characters`,
            "string.empty": `Password is required`,
            "any.required": `Password is required`,
        }),
});

export { authValidator };