import { Section, CodeBlock } from "@/components";

export const metadata = {
  title: "Advanced - Scaling & Deployment",
  description: "Production deployment, monitoring, and scaling strategies",
};

export default function ScalingPage() {
  return (
    <div>
      <Section title="Scaling & Deployment" id="scaling">
        <p>
          Going from hobby project to production at scale requires careful planning.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Horizontal vs Vertical Scaling
        </h3>

        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Vertical Scaling:</strong> Add more CPU/RAM to single server (limited ceiling)</li>
          <li><strong>Horizontal Scaling:</strong> Add more servers (unlimited, but complex)</li>
        </ul>

        <CodeBlock
          code={`// VERTICAL SCALING (Bad for high-traffic APIs)
// Upgrade: 4GB RAM → 8GB RAM → 16GB RAM → 128GB RAM (too expensive!)

// HORIZONTAL SCALING (Good for APIs)
// Run multiple instances behind load balancer
Load Balancer
├── Server 1 (Port 3001)
├── Server 2 (Port 3002)
├── Server 3 (Port 3003)
└── Server 4 (Port 3004)

// Each server runs identical code
// Load balancer distributes traffic
// Single server fails? Others handle requests`}
          language="bash"
          title="Scaling Strategy"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Containerization with Docker
        </h3>

        <CodeBlock
          code={`# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]

---

# Build image
docker build -t my-api:1.0.0 .

# Run container
docker run -p 3000:3000 -e DB_URL=db_connection my-api:1.0.0

# Push to registry
docker tag my-api:1.0.0 registry.example.com/my-api:1.0.0
docker push registry.example.com/my-api:1.0.0`}
          language="docker"
          title="Docker Setup"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Kubernetes Orchestration
        </h3>

        <CodeBlock
          code={`# kubernetes/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment
spec:
  replicas: 3  # Run 3 instances
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
      - name: api
        image: registry.example.com/my-api:1.0.0
        ports:
        - containerPort: 3000
        env:
        - name: DB_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10

---
# kubernetes/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: api-service
spec:
  selector:
    app: api
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: LoadBalancer

---
# Deploy to Kubernetes
kubectl apply -f kubernetes/

# Scale to 10 instances
kubectl scale deployment api-deployment --replicas=10

# Auto-scale based on CPU
kubectl autoscale deployment api-deployment --min=3 --max=20 --cpu-percent=80`}
          language="yaml"
          title="Kubernetes Deployment"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Database Scaling
        </h3>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          Read Replicas
        </h4>

        <CodeBlock
          code={`// Primary database (writes)
Database Master (example.com:5432)

// Read-only replicas (reads)
Database Replica 1 (read1.example.com:5432)
Database Replica 2 (read2.example.com:5432)

// In your code:
const masterDb = new Database('example.com');
const replicaDb = new Database('read1.example.com');

// Writes go to master
app.post('/api/posts', async (req, res) => {
  const post = await masterDb.posts.create(req.body);
  res.json(post);
});

// Reads from replica
app.get('/api/posts', async (req, res) => {
  const posts = await replicaDb.posts.find();
  res.json(posts);
});

// Benefits:
// - Master handles writes (slow)
// - Replicas handle reads (fast, scales horizontally)
// - Can have many replicas`}
          language="javascript"
          title="Read Replicas"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          Database Sharding
        </h4>

        <CodeBlock
          code={`// Divide data across multiple databases by key
// Shard key: User ID

Shard 1 (Database 1): Users 1-1000000
Shard 2 (Database 2): Users 1000001-2000000
Shard 3 (Database 3): Users 2000001-3000000

class ShardedDatabase {
  getShardForUserId(userId) {
    // Consistent hashing
    return userId % 3; // Returns 0, 1, or 2
  }

  async getUserPosts(userId) {
    const shardId = this.getShardForUserId(userId);
    const db = this.shards[shardId];
    return db.query('SELECT * FROM posts WHERE userId = ?', [userId]);
  }
}

// Benefits:
// - Unlimited horizontal scaling
// - Each shard is smaller and faster

// Challenges:
// - Cross-shard queries become complex
// - Rebalancing is painful (resharding)`}
          language="javascript"
          title="Database Sharding"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Load Balancing
        </h3>

        <CodeBlock
          code={`# NGINX Load Balancer Configuration
upstream api_backend {
  least_conn;  # Route to server with fewest connections
  
  server 192.168.1.1:3000 weight=3;  # 3x traffic share
  server 192.168.1.2:3000 weight=1;
  server 192.168.1.3:3000 weight=1;
  
  # Remove server if unhealthy
  server 192.168.1.4:3000 down;
}

server {
  listen 80;
  server_name api.example.com;

  location / {
    proxy_pass http://api_backend;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    
    # Retry failed requests
    proxy_next_upstream error timeout invalid_header http_500 http_502;
  }
}

# Load balancing strategies
# - Round robin: 1,2,3,1,2,3 (simple)
# - Least connections: Route to server with fewest active connections (best)
# - IP hash: Route based on client IP (session persistence)
# - Geographic: Route to nearest data center`}
          language="nginx"
          title="Load Balancing"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Monitoring & Observability
        </h3>

        <CodeBlock
          code={`// Application Monitoring Setup
const prometheus = require('prom-client');
const winston = require('winston');

// Metrics to track
const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'status_code']
});

const databaseQueryDuration = new prometheus.Histogram({
  name: 'db_query_duration_ms',
  help: 'Duration of database queries in ms',
  labelNames: ['query_type']
});

// Request middleware
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    httpRequestDuration
      .labels(req.method, req.route?.path, res.statusCode)
      .observe(duration);
  });

  next();
});

// Logging
const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Alerts
if (metrics.errorRate > 0.05) {
  logger.error('High error rate detected!', { errorRate: 0.05 });
  // Send notification to on-call engineer
}

if (metrics.responseTime > 1000) {
  logger.warn('Slow API response', { avgResponseTime: 1000 });
}

// Health check
app.get('/health', (req, res) => {
  const health = {
    uptime: process.uptime(),
    database: checkDatabase(),
    cache: checkCache(),
    status: 'OK'
  };

  if (Object.values(health).some(v => v === 'DOWN')) {
    return res.status(503).json(health);
  }

  res.json(health);
});`}
          language="javascript"
          title="Monitoring Setup"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          CI/CD Pipeline
        </h3>

        <CodeBlock
          code={`# .github/workflows/deploy.yml
name: Deploy API

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - run: npm install
      - run: npm run test
      - run: npm run lint

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - run: docker build -t api:VERSION .
      
      - run: docker push registry.example.com/api:VERSION

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - run: kubectl set image deployment/api api=registry.example.com/api:VERSION
      
      - run: kubectl rollout status deployment/api-deployment
      
      # Smoke tests
      - run: curl https://api.example.com/health
      
      # Rollback if failed
      - if: failure()
        run: kubectl rollout undo deployment/api-deployment`}
          language="yaml"
          title="CI/CD Pipeline"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Deployment Strategies
        </h3>

        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Blue-Green:</strong> Run two identical environments, switch traffic instantly (zero downtime)</li>
          <li><strong>Canary:</strong> Roll out to small percentage of traffic first, monitor, then increase (lower risk)</li>
          <li><strong>Rolling:</strong> Gradually replace instances one by one (slower but safe)</li>
          <li><strong>Feature Flags:</strong> Deploy code but enable features gradually (control without re-deploy)</li>
        </ul>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Production Checklist
        </h3>

        <ul className="list-disc pl-6 space-y-2">
          <li>Use environment variables for configuration</li>
          <li>Enable HTTPS/TLS</li>
          <li>Set up automated backups</li>
          <li>Configure load balancing</li>
          <li>Implement health checks</li>
          <li>Set up monitoring and alerting</li>
          <li>Enable logging and log aggregation</li>
          <li>Configure auto-scaling</li>
          <li>Set up disaster recovery plan</li>
          <li>Run security scans</li>
          <li>Set up rate limiting</li>
          <li>Enable CORS correctly</li>
          <li>Set security headers</li>
          <li>Configure CDN for static assets</li>
          <li>Test failure scenarios</li>
          <li>Document runbooks for common issues</li>
          <li>Have on-call rotation</li>
        </ul>
      </Section>
    </div>
  );
}
