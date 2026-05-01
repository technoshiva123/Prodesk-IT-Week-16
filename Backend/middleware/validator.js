const { z } = require('zod');

const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters")
});

const validateLogin = (req, res, next) => {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ errors: result.error.errors });
    }
    next();
};

module.exports = { validateLogin };