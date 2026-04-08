import { Section, CodeBlock } from "@/components";

export const metadata = {
  title: "Advanced - Backend Architecture",
  description: "Understanding server-side architecture patterns",
};

export default function ArchitecturePage() {
  return (
    <div>
      <Section title="Backend Architecture Patterns" id="architecture">
        <p>
          Understanding how modern backends are structured helps you design better APIs and debug issues.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          MVC Architecture (Model-View-Controller)
        </h3>

        <p>
          The traditional pattern separating concerns into layers:
        </p>

        <CodeBlock
          code={`// Controller: Handles HTTP requests
app.post('/posts', async (req, res) => {
  try {
    // Controllers receive input
    const { title, content, userId } = req.body;
    
    // Validate and call business logic
    const post = await PostService.create({
      title,
      content,
      userId
    });
    
    res.json({ success: true, data: post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Service: Business logic
class PostService {
  static async create(postData) {
    // Validate
    if (!postData.title || postData.title.length < 3) {
      throw new Error('Title too short');
    }
    
    // Check permissions
    const user = await User.findById(postData.userId);
    if (!user.canCreatePost()) {
      throw new Error('User cannot create posts');
    }
    
    // Data operations
    const post = new Post(postData);
    return post.save();
  }
}

// Model: Database schema
class Post {
  constructor(data) {
    this.title = data.title;
    this.content = data.content;
    this.userId = data.userId;
    this.createdAt = new Date();
  }
  
  async save() {
    // Persist to database
    return database.post.create(this);
  }
}`}
          language="javascript"
          title="MVC Pattern Example"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Layered Architecture (N-Tier)
        </h3>

        <CodeBlock
          code={`// 1. PRESENTATION LAYER (HTTP/REST)
app.get('/api/posts/:id', (req, res) => {
  const post = PostController.getById(req.params.id);
  res.json(post);
});

// 2. APPLICATION LAYER (Business Logic)
class PostController {
  static async getById(id) {
    const post = await PostService.getById(id);
    return PostDTO.transform(post);
  }
}

// 3. DOMAIN LAYER (Core Business Rules)
class PostService {
  static async getById(id) {
    const post = await PostRepository.findById(id);
    
    // Business rules
    if (post.isDraft && !user.isAdmin()) {
      throw new Error('Cannot view draft posts');
    }
    
    return post;
  }
}

// 4. DATA ACCESS LAYER (Database)
class PostRepository {
  static async findById(id) {
    return database.query(
      'SELECT * FROM posts WHERE id = ? LIMIT 1',
      [id]
    );
  }
}

// 5. PERSISTENCE LAYER (Database, Cache)
database.query(sql, params);
cache.get('post:123');`}
          language="javascript"
          title="N-Tier Architecture"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Microservices Architecture
        </h3>

        <p>
          Breaking a monolith into independent services:
        </p>

        <CodeBlock
          code={`// Service 1: User Service (Port 3001)
// Handles: Registration, login, profiles

// Service 2: Post Service (Port 3002)
// Handles: CRUD operations on posts

// Service 3: Comment Service (Port 3003)
// Handles: Comment operations

// API Gateway (Port 3000) - Routes requests
const routes = {
  '/api/auth/*': 'http://localhost:3001',
  '/api/posts/*': 'http://localhost:3002',
  '/api/comments/*': 'http://localhost:3003'
};

// Inter-service communication
class PostService {
  async createPost(data) {
    // Verify user exists by calling User Service
    const user = await fetch('http://localhost:3001/api/users/' + data.userId);
    
    if (!user.ok) {
      throw new Error('User not found');
    }
    
    // Create post
    const post = new Post(data);
    return post.save();
  }
}

// Benefits:
// - Scale services independently
// - Different tech stacks per service
// - Teams own specific services

// Challenges:
// - Eventual consistency
// - Distributed tracing
// - Service discovery
// - Network latency`}
          language="javascript"
          title="Microservices Example"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          CQRS (Command Query Responsibility Segregation)
        </h3>

        <p>
          Separate read and write operations:
        </p>

        <CodeBlock
          code={`// WRITE MODEL (Commands)
class PostCommandService {
  // Write operations
  async createPost(data) {
    const post = new Post(data);
    await database.posts.save(post);
    
    // Publish event for consumers
    await eventBus.publish('post.created', { postId: post.id, ...data });
    
    return post;
  }
  
  async updatePost(id, data) {
    await database.posts.update(id, data);
    await eventBus.publish('post.updated', { postId: id, ...data });
  }
}

// READ MODEL (Queries)
class PostQueryService {
  // Read operations from optimized read-only replica
  async getPost(id) {
    return readOnlyDatabase.posts.findById(id);
  }
  
  async searchPosts(filters) {
    return elasticSearch.posts.search(filters);
  }
  
  async getFeedForUser(userId) {
    return readOnlyCache.feeds[userId];
  }
}

// Benefits:
// - Read and write can scale independently
// - Can use different databases (SQL for writes, NoSQL for reads)
// - Optimized queries for different use cases

// Usage
const command = new PostCommandService();
await command.createPost({ title: 'New Post', content: '...' });

const query = new PostQueryService();
const results = await query.searchPosts({ category: 'tech' });`}
          language="javascript"
          title="CQRS Pattern"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Common Backend Stack
        </h3>

        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Web Framework</strong> - Express, Django, Spring Boot, FastAPI</li>
          <li><strong>Database</strong> - PostgreSQL, MongoDB, MySQL, DynamoDB</li>
          <li><strong>Cache</strong> - Redis, Memcached</li>
          <li><strong>Message Queue</strong> - RabbitMQ, Kafka, AWS SQS</li>
          <li><strong>Search Engine</strong> - Elasticsearch, Solr</li>
          <li><strong>API Gateway</strong> - Kong, AWS API Gateway</li>
          <li><strong>Container</strong> - Docker</li>
          <li><strong>Orchestration</strong> - Kubernetes</li>
          <li><strong>Monitoring</strong> - Prometheus, ELK Stack</li>
          <li><strong>CI/CD</strong> - Jenkins, GitHub Actions, GitLab CI</li>
        </ul>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Typical Request Flow
        </h3>

        <CodeBlock
          code={`// 1. Client sends request
POST /api/posts { title: "Hello", content: "World" }

// 2. API Gateway receives and routes
// Logs request, applies rate limiting, enforces authentication

// 3. Reaches appropriate microservice
// Validates input, checks authentication

// 4. Service calls business logic
PostService.createPost(data)

// 5. Service queries database
database.posts.insert(postData)

// 6. Publishes event to message queue
eventBus.publish('post.created', postData)

// 7. Response returned to client
{ success: true, postId: '123', createdAt: '2024-01-15' }

// 8-10. Asynchronous operations
// - Search engine indexes post
// - Notifications sent to followers
// - Analytics recorded
// - Caches invalidated

This all happens in milliseconds!`}
          language="bash"
          title="Typical Request Flow"
        />
      </Section>
    </div>
  );
}
