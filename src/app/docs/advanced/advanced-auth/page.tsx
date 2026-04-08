import { Section, CodeBlock } from "@/components";

export const metadata = {
  title: "Advanced - Authentication & Security",
  description: "OAuth 2.0, JWT refresh tokens, API keys, and more",
};

export default function AdvancedAuthPage() {
  return (
    <div>
      <Section title="Advanced Authentication" id="advanced-auth">
        <p>
          Beyond basic JWT authentication. Learn production-grade security patterns.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          JWT Refresh Token Pattern
        </h3>

        <p>
          Using short-lived access tokens with long-lived refresh tokens:
        </p>

        <CodeBlock
          code={`// Login endpoint returns both tokens
POST /api/auth/login
{
  "accessToken": "eyJhbGc...",      // Expires in 15 minutes
  "refreshToken": "eyJhbGc..."     // Expires in 7 days
}

// Use accessToken for API requests
GET /api/posts
Authorization: Bearer eyJhbGc...

// When accessToken expires (401 response)
// Use refreshToken to get new accessToken
POST /api/auth/refresh
{
  "refreshToken": "eyJhbGc..."
}

// Response: New accessToken (refreshToken might rotate too)
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."   // Optional token rotation
}`}
          language="json"
          title="Refresh Token Flow"
        />

        <CodeBlock
          code={`class AuthService {
  // Generate tokens with different expiry
  static generateTokens(userId) {
    const accessToken = jwt.sign(
      { userId, type: 'access' },
      process.env.ACCESS_SECRET,
      { expiresIn: '15m' }  // Short-lived
    );

    const refreshToken = jwt.sign(
      { userId, type: 'refresh' },
      process.env.REFRESH_SECRET,
      { expiresIn: '7d' }   // Long-lived
    );

    return { accessToken, refreshToken };
  }

  // Verify and refresh
  static verifyRefreshToken(refreshToken) {
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET
      );
      
      // Check if token is blacklisted (logged out)
      if (this.isTokenBlacklisted(refreshToken)) {
        throw new Error('Token has been revoked');
      }
      
      // Generate new tokens
      return this.generateTokens(decoded.userId);
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  // Logout: blacklist token
  static logout(refreshToken) {
    this.blacklistedTokens.add(refreshToken);
    // In production: store in Redis with expiry
  }
}

// Client-side implementation
class APIClient {
  constructor(api) {
    this.api = api;
    this.accessToken = localStorage.getItem('accessToken');
  }

  async request(url, options = {}) {
    // Add token to request
    options.headers = {
      ...options.headers,
      'Authorization': \`Bearer \${this.accessToken}\`
    };

    let response = await fetch(url, options);

    // If 401, refresh token and retry
    if (response.status === 401) {
      const newTokens = await this.refreshTokens();
      if (newTokens) {
        this.accessToken = newTokens.accessToken;
        options.headers['Authorization'] = \`Bearer \${this.accessToken}\`;
        response = await fetch(url, options);
      }
    }

    return response;
  }

  async refreshTokens() {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });

    if (!response.ok) {
      // Refresh failed, redirect to login
      window.location.href = '/login';
      return null;
    }

    const { accessToken, refreshToken: newRefreshToken } = await response.json();
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
    return { accessToken, refreshToken: newRefreshToken };
  }
}`}
          language="javascript"
          title="Refresh Token Implementation"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          OAuth 2.0: Login with Google/GitHub
        </h3>

        <CodeBlock
          code={`// Step 1: Redirect user to provider
class AuthController {
  loginWithGoogle(req, res) {
    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authUrl.searchParams.append('client_id', process.env.GOOGLE_CLIENT_ID);
    authUrl.searchParams.append('redirect_uri', 'http://localhost:3000/auth/google/callback');
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('scope', 'openid email profile');

    res.redirect(authUrl.toString());
  }
}

// Step 2: Handle callback with auth code
app.get('/auth/google/callback', async (req, res) => {
  const authCode = req.query.code;

  // Step 3: Exchange code for tokens
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code: authCode,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: 'http://localhost:3000/auth/google/callback',
      grant_type: 'authorization_code'
    })
  });

  const { id_token, access_token } = await tokenResponse.json();

  // Step 4: Verify and get user info
  const userInfo = jwt.decode(id_token);

  // Step 5: Create or update user in our database
  let user = await User.findByEmail(userInfo.email);
  if (!user) {
    user = await User.create({
      email: userInfo.email,
      name: userInfo.name,
      googleId: userInfo.sub,
      picture: userInfo.picture
    });
  }

  // Step 6: Generate our own tokens
  const { accessToken, refreshToken } = AuthService.generateTokens(user.id);

  res.json({
    accessToken,
    refreshToken,
    user: { id: user.id, email: user.email, name: user.name }
  });
});`}
          language="javascript"
          title="OAuth 2.0 Flow"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          API Keys for Service-to-Service
        </h3>

        <CodeBlock
          code={`// API keys are for server-to-server or client applications
class APIKeyManager {
  // Generate key for client (e.g., mobile app)
  static generateKey(clientName, scopes = []) {
    const key = crypto.randomBytes(32).toString('hex');
    const hashedKey = crypto.createHash('sha256').update(key).digest('hex');

    database.apiKeys.insert({
      clientName,
      hashedKey,
      scopes,
      createdAt: new Date(),
      rateLimit: 1000, // requests per hour
      active: true
    });

    return key; // Return only once! Client must store it
  }

  // Verify key in middleware
  static verifyKey(key) {
    const hashedKey = crypto.createHash('sha256').update(key).digest('hex');
    const apiKey = database.apiKeys.findByHashedKey(hashedKey);

    if (!apiKey || !apiKey.active) {
      throw new Error('Invalid API key');
    }

    // Check rate limit
    const recentRequests = database.requests.count({
      apiKeyId: apiKey.id,
      createdAfter: Date.now() - 3600000
    });

    if (recentRequests >= apiKey.rateLimit) {
      throw new Error('Rate limit exceeded');
    }

    return apiKey;
  }
}

// Middleware
app.use('/api', (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (apiKey) {
    try {
      req.apiKey = APIKeyManager.verifyKey(apiKey);
      req.userId = null; // Service-to-service
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  } else {
    // Fall back to JWT auth
    const token = req.headers.authorization?.split(' ')[1];
    try {
      req.user = jwt.verify(token, process.env.ACCESS_SECRET);
    } catch (error) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }

  next();
});

// Usage
fetch('https://api.example.com/posts', {
  headers: {
    'X-API-Key': 'your-api-key-here'
  }
})`}
          language="javascript"
          title="API Key Authentication"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Two-Factor Authentication (2FA)
        </h3>

        <CodeBlock
          code={`class TwoFactorAuth {
  // Step 1: Generate TOTP secret
  static generateSecret(email) {
    const secret = speakeasy.generateSecret({
      name: \`MyApp (\${email})\`,
      length: 32
    });

    return {
      secret: secret.base32,
      qrCode: qrcode.toDataURL(secret.otpauth_url)
    };
  }

  // Step 2: Verify TOTP token
  static verifyToken(secret, token) {
    return speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: token,
      window: 2  // Allow 2-token window for clock skew
    });
  }

  // Step 3: Generate backup codes
  static generateBackupCodes(count = 10) {
    return Array(count)
      .fill()
      .map(() => crypto.randomBytes(4).toString('hex'));
  }
}

// Setup flow
app.post('/auth/2fa/setup', async (req, res) => {
  const user = req.user;
  const { secret, qrCode } = TwoFactorAuth.generateSecret(user.email);
  const backupCodes = TwoFactorAuth.generateBackupCodes();

  // Store pending (not confirmed yet)
  session.pending2FA = { secret, backupCodes };

  res.json({ qrCode, backupCodes });
});

// Verify and enable
app.post('/auth/2fa/verify', async (req, res) => {
  const { token } = req.body;
  const { secret } = session.pending2FA;

  if (!TwoFactorAuth.verifyToken(secret, token)) {
    return res.status(400).json({ error: 'Invalid token' });
  }

  // Save to user
  const user = req.user;
  user.twoFASecret = secret;
  user.backupCodes = session.pending2FA.backupCodes;
  user.twoFAEnabled = true;
  await user.save();

  delete session.pending2FA;
  res.json({ success: true });
});

// Login with 2FA
app.post('/auth/2fa/verify-login', async (req, res) => {
  const { token } = req.body;
  const user = session.pendingUser; // Set during initial password check

  if (!user.twoFAEnabled) {
    return res.status(400).json({ error: '2FA not enabled' });
  }

  // Allow backup codes OR TOTP
  if (user.backupCodes.includes(token)) {
    // Remove used backup code
    user.backupCodes = user.backupCodes.filter(code => code !== token);
    await user.save();
  } else if (!TwoFactorAuth.verifyToken(user.twoFASecret, token)) {
    return res.status(400).json({ error: 'Invalid token' });
  }

  const { accessToken, refreshToken } = AuthService.generateTokens(user.id);
  res.json({ accessToken, refreshToken });
});`}
          language="javascript"
          title="Two-Factor Authentication"
        />

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Security Best Practices
        </h3>

        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Never expose secrets</strong> - Store in environment variables, never in code</li>
          <li><strong>Always use HTTPS</strong> - Never send tokens over HTTP</li>
          <li><strong>Validate tokens</strong> - Check expiry, signature, and claims</li>
          <li><strong>Short token lifespans</strong> - Access tokens: 15-30 minutes</li>
          <li><strong>Refresh token rotation</strong> - Issue new token on each refresh</li>
          <li><strong>Token blacklisting on logout</strong> - Prevent reuse after logout</li>
          <li><strong>CORS configuration</strong> - Only allow trusted origins</li>
          <li><strong>Rate limiting on auth endpoints</strong> - Prevent brute force attacks</li>
          <li><strong>Salt passwords</strong> - Never store plain passwords</li>
          <li><strong>Audit logs</strong> - Log all authentication events</li>
        </ul>
      </Section>
    </div>
  );
}
