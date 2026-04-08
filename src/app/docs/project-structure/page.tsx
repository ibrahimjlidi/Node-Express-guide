import { Section, CodeBlock } from "@/components";

export const metadata = {
  title: "Project Structure - API Documentation",
  description: "Understanding the backend project structure",
};

export default function ProjectStructurePage() {
  return (
    <div>
      <Section title="Project Structure" id="project-structure">
        <p>
          This section explains the organization of the Express.js backend
          project and the purpose of each directory.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Directory Layout
        </h3>

        <CodeBlock
          code={`project-root/
├── src/
│   ├── controllers/       # Request handlers and business logic
│   ├── routes/           # API endpoint definitions
│   ├── models/           # Database models (MongoDB/Mongoose)
│   ├── middleware/       # Custom middleware functions
│   ├── utils/            # Utility functions and helpers
│   ├── validators/       # Request validation schemas
│   ├── config/           # Configuration files
│   └── app.ts            # Express app setup
├── tests/                # Test files
├── public/               # Static files (if needed)
├── dist/                 # Compiled JavaScript output
├── .env                  # Environment variables (not committed)
├── .env.example          # Example environment variables
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation`}
          language="bash"
          title="Express Backend Structure"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Key Directories
        </h3>

        <h4 className="text-xl font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          /src/controllers
        </h4>
        <p>
          Controllers contain the business logic for handling requests. Each
          controller exports functions that handle specific operations.
        </p>

        <CodeBlock
          code={`// src/controllers/userController.ts
export class UserController {
  // Get all users
  static async getAllUsers(req, res) {
    try {
      const users = await User.find().select('-password');
      res.json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // Get user by ID
  static async getUserById(req, res) {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');
    res.json({ success: true, data: user });
  }
}`}
          language="typescript"
          title="Example Controller"
        />

        <h4 className="text-xl font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          /src/routes
        </h4>
        <p>
          Routes define the API endpoints and map them to controller functions.
          Each route file handles related endpoints.
        </p>

        <CodeBlock
          code={`// src/routes/userRoutes.ts
import express from 'express';
import { UserController } from '../controllers/userController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/register', UserController.register);
router.post('/login', UserController.login);

// Protected routes
router.get('/', authenticate, UserController.getAllUsers);
router.get('/:id', authenticate, UserController.getUserById);
router.put('/:id', authenticate, UserController.updateUser);
router.delete('/:id', authenticate, UserController.deleteUser);

export default router;`}
          language="typescript"
          title="Example Routes"
        />

        <h4 className="text-xl font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          /src/models
        </h4>
        <p>
          Models define the database schema and structure for collections. We
          use Mongoose for MongoDB operations.
        </p>

        <CodeBlock
          code={`// src/models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'moderator' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'moderator', 'admin'], default: 'user' }
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);`}
          language="typescript"
          title="Example Model"
        />

        <h4 className="text-xl font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          /src/middleware
        </h4>
        <p>
          Middleware functions process requests before they reach the
          controllers. Common middleware includes authentication, validation,
          and error handling.
        </p>

        <CodeBlock
          code={`// src/middleware/auth.ts
import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'No token provided' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: 'Invalid token' 
    });
  }
};`}
          language="typescript"
          title="Example Middleware"
        />

        <h4 className="text-xl font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          /src/validators
        </h4>
        <p>
          Validators use schema libraries like Joi or Zod to validate incoming
          request data.
        </p>

        <CodeBlock
          code={`// src/validators/userValidator.ts
import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});`}
          language="typescript"
          title="Example Validators"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Environment Variables
        </h3>
        <p>
          Configure your environment variables in a .env file. Here's an
          example:
        </p>

        <CodeBlock
          code={`# Database
MONGODB_URI=mongodb://localhost:27017/api-db
DB_NAME=api_database

# Authentication
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRY=24h

# Server
PORT=5000
NODE_ENV=development

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_password

# CORS
CORS_ORIGIN=http://localhost:3000`}
          language="bash"
          title=".env.example"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          File Naming Conventions
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Controllers</strong>: PascalCase, suffixed with
            "Controller" (e.g., UserController.ts)
          </li>
          <li>
            <strong>Models</strong>: PascalCase (e.g., User.ts)
          </li>
          <li>
            <strong>Routes</strong>: camelCase, suffixed with "Routes" (e.g.,
            userRoutes.ts)
          </li>
          <li>
            <strong>Middleware</strong>: camelCase (e.g., authMiddleware.ts)
          </li>
          <li>
            <strong>Validators</strong>: camelCase, suffixed with "Validator"
            (e.g., userValidator.ts)
          </li>
        </ul>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Data Flow
        </h3>
        <p>Here's the typical flow of a request through the application:</p>

        <CodeBlock
          code={`Request
   ↓
Router (matches URL to endpoint)
   ↓
Middleware (auth, validation, logging)
   ↓
Controller (business logic)
   ↓
Model (database operations)
   ↓
Response (JSON back to client)`}
          language="bash"
          title="Request Flow"
        />
      </Section>
    </div>
  );
}
