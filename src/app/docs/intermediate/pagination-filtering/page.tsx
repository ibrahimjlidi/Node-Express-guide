import { Section, CodeBlock } from "@/components";

export const metadata = {
  title: "Pagination & Filtering - Intermediate Guide",
  description: "Handle large data sets with pagination and filtering",
};

export default function PaginationFilteringPage() {
  return (
    <div>
      <Section title="Pagination & Filtering" id="pagination-filtering">
        <p>
          APIs return huge amounts of data. Pagination and filtering help you request exactly what you need.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Why Pagination?
        </h3>

        <p>
          Getting 1 million records is slow. Pagination returns data in smaller chunks called <strong>pages</strong>.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Page-Based Pagination
        </h3>

        <p>
          Most common approach: specify page number and items per page.
        </p>

        <CodeBlock
          code={`// Request page 2 with 20 items per page
GET /v1/posts?page=2&limit=20

// Response includes meta information
{
  "data": {
    "posts": [...],
    "pagination": {
      "currentPage": 2,
      "totalPages": 50,
      "totalItems": 1000,
      "itemsPerPage": 20,
      "hasNextPage": true,
      "hasPreviousPage": true
    }
  }
}`}
          language="json"
          title="Page-Based Pagination"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          JavaScript Implementation
        </h4>

        <CodeBlock
          code={`class PostAPI {
  constructor(apiUrl, token) {
    this.apiUrl = apiUrl;
    this.token = token;
  }

  async fetchPage(pageNumber, itemsPerPage = 20) {
    const url = new URL(\`\${this.apiUrl}/posts\`);
    url.searchParams.append('page', pageNumber);
    url.searchParams.append('limit', itemsPerPage);

    const response = await fetch(url, {
      headers: { 'Authorization': \`Bearer \${this.token}\` }
    });

    if (!response.ok) throw new Error('Failed to fetch');
    return response.json();
  }

  // Fetch all pages (careful with large datasets!)
  async fetchAll(itemsPerPage = 20) {
    let allPosts = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const { data } = await this.fetchPage(page, itemsPerPage);
      allPosts = [...allPosts, ...data.posts];
      hasMore = data.pagination.hasNextPage;
      page++;
    }

    return allPosts;
  }
}

const api = new PostAPI('https://api.example.com/v1', 'TOKEN');

// Get page 3
const page3 = await api.fetchPage(3, 25);
console.log('Posts on page 3:', page3.data.posts);
console.log('Total pages:', page3.data.pagination.totalPages);`}
          language="javascript"
          title="Pagination Class"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Cursor-Based Pagination
        </h3>

        <p>
          Advanced approach: use a cursor token instead of page numbers. Better for real-time data.
        </p>

        <CodeBlock
          code={`// Request with cursor
GET /v1/posts?cursor=eyJpZCI6IDEwMjN9&limit=20

// Response includes next cursor
{
  "data": {
    "posts": [...],
    "nextCursor": "eyJpZCI6IDEwNDN9",
    "hasMore": true
  }
}`}
          language="json"
          title="Cursor-Based Pagination"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Filtering Data
        </h3>

        <p>
          Filter results to get exactly what you need using query parameters.
        </p>

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          Common Filter Types
        </h4>

        <CodeBlock
          code={`// Exact match
GET /v1/posts?category=Technology

// Range filters
GET /v1/posts?minViews=100&maxViews=5000

// Date filters
GET /v1/posts?createdAfter=2024-01-01&createdBefore=2024-12-31

// Status filters
GET /v1/posts?status=published

// Multiple filters (AND logic)
GET /v1/posts?category=Technology&status=published&minViews=100

// Search text
GET /v1/posts?search=javascript

// Sorting
GET /v1/posts?sort=createdAt&order=desc`}
          language="bash"
          title="Filter Examples"
        />

        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          Building Complex Filters
        </h4>

        <CodeBlock
          code={`class FilterBuilder {
  constructor() {
    this.filters = {};
  }

  addFilter(key, value) {
    this.filters[key] = value;
    return this;
  }

  search(query) {
    return this.addFilter('search', query);
  }

  category(cat) {
    return this.addFilter('category', cat);
  }

  status(st) {
    return this.addFilter('status', st);
  }

  dateRange(start, end) {
    this.filters['createdAfter'] = start;
    this.filters['createdBefore'] = end;
    return this;
  }

  sort(field, order = 'asc') {
    this.filters['sort'] = field;
    this.filters['order'] = order;
    return this;
  }

  page(pageNum, limit = 20) {
    this.filters['page'] = pageNum;
    this.filters['limit'] = limit;
    return this;
  }

  build() {
    const params = new URLSearchParams(this.filters);
    return params.toString();
  }
}

// Usage
const filters = new FilterBuilder();
const query = filters
  .search('nodejs')
  .category('Technology')
  .status('published')
  .dateRange('2024-01-01', '2024-12-31')
  .sort('createdAt', 'desc')
  .page(1, 25)
  .build();

const url = \`https://api.example.com/v1/posts?\${query}\`;
console.log(url);
// Output: /v1/posts?search=nodejs&category=Technology&status=published&createdAfter=2024-01-01&createdBefore=2024-12-31&sort=createdAt&order=desc&page=1&limit=25`}
          language="javascript"
          title="Filter Builder Class"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Complete Example: Posts with Pagination & Filters
        </h3>

        <CodeBlock
          code={`async function searchPosts(filters) {
  const url = new URL('https://api.example.com/v1/posts');
  
  // Add all filters
  if (filters.search) url.searchParams.append('search', filters.search);
  if (filters.category) url.searchParams.append('category', filters.category);
  if (filters.status) url.searchParams.append('status', filters.status);
  if (filters.sort) {
    url.searchParams.append('sort', filters.sort);
    url.searchParams.append('order', filters.order || 'asc');
  }
  
  url.searchParams.append('page', filters.page || 1);
  url.searchParams.append('limit', filters.limit || 20);

  const response = await fetch(url, {
    headers: {
      'Authorization': 'Bearer YOUR_TOKEN'
    }
  });

  const { data } = await response.json();
  return {
    posts: data.posts,
    pagination: data.pagination
  };
}

// Usage
const results = await searchPosts({
  search: 'javascript',
  category: 'Technology',
  status: 'published',
  sort: 'createdAt',
  order: 'desc',
  page: 1,
  limit: 25
});

console.log(\`Found \${results.pagination.totalItems} posts\`);
console.log(\`Showing page \${results.pagination.currentPage} of \${results.pagination.totalPages}\`);
console.log(results.posts);`}
          language="javascript"
          title="Complete Search Function"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Best Practices
        </h3>

        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Always set a limit</strong> - Never request all data at once</li>
          <li><strong>Use cursor pagination</strong> - For real-time or large datasets</li>
          <li><strong>Cache filters</strong> - Store user's last search filters locally</li>
          <li><strong>Validate page numbers</strong> - Check if requested page exists before fetching</li>
          <li><strong>Handle edge cases</strong> - Empty results, single page, first/last page</li>
          <li><strong>Implement timeout</strong> - Don't wait forever for slow API responses</li>
          <li><strong>Use HTTPS with query params</strong> - Sensitive data should go in body</li>
        </ul>
      </Section>
    </div>
  );
}
