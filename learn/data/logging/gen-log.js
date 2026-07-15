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

/* =================== TOPIC 1: Centralized Logging =================== */
addTopic('log-centralized', 'Centralized Logging', 'intermediate', 15,
  ['Centralized Logging aggregates logs from multiple servers, services, and applications into a single, searchable platform for unified visibility.',
   'Eliminates SSH\'ing into individual servers to tail log files — all logs are collected, parsed, and indexed in real-time from every source.',
   'Core components: log shippers (Filebeat, Fluentd), transport (Kafka, HTTP), processing (Logstash), storage (Elasticsearch, S3), and visualization (Kibana, Grafana).',
   'Best practices: structured log format (JSON), include correlation IDs for distributed tracing, set retention policies, implement access controls on log data.'
  ],
  'Centralized Logging is like having a security camera control room for your entire city. Instead of running to each building to check their individual tape (SSH into servers), all cameras stream to one room where you can search, filter, and spot problems anywhere instantly.',
  [
    d('ELK Stack (Elasticsearch, Logstash, Kibana)', 'The most popular open-source centralized logging stack. Elasticsearch: distributed search and analytics engine, stores and indexes log data. Logstash: server-side data processing pipeline, ingests from multiple sources, transforms, and sends to Elasticsearch. Kibana: visualization layer — dashboards, charts, log exploration.'),
    d('Log Shipper Architecture', 'Lightweight agents installed on each server: Filebeat (Elastic), Fluentd (CNCF), vector (Datadog). Shippers tail log files, add metadata (hostname, service name), and forward to a central broker (Kafka, Redis) or directly to storage. Benefits: low resource usage, buffering for network failures, encryption in transit.'),
    d('Log Retention and Tiered Storage', 'Hot tier: recent logs (7 days) on fast SSDs — Elasticsearch hot nodes. Warm tier: 30 days on standard HDDs. Cold tier: 90+ days on S3/Glacier — queryable but slower. Frozen tier: archive for compliance (years). Each tier trades query speed for cost. Data lifecycle management automates transitions.'),
    d('Distributed Tracing Correlation', 'Correlation ID (trace ID) is generated at the entry point (API gateway) and propagated through all downstream services via headers. Every log line includes this ID. Centralized logging allows searching for a single request across all services — critical for debugging microservices latency and failures.'),
    d('Observability Beyond Logs', 'Three pillars: logs (events), metrics (numbers), traces (request flow). Centralized logging is part of observability. Best practice: correlate logs with metrics (e.g., when error rate spikes, search logs for the failed requests). Tools: Datadog, Grafana Loki, New Relic, Honeycomb — all-in-one observability platforms.')
  ],
  'Centralized Logging is the foundation of observability in distributed systems. It replaces ad-hoc SSH debugging with a searchable, real-time view of all system events. The ELK stack is the most common self-hosted solution; Datadog and Grafana Cloud are popular SaaS alternatives. Always use structured logs (JSON) with correlation IDs for maximum value.',
  [
    q('What is centralized logging?', 'Aggregating logs from all servers and services into a single platform for unified search, analysis, and visualization.'),
    q('What is the ELK stack?', 'Elasticsearch (storage/search), Logstash (processing), Kibana (visualization) — the most popular open-source centralized logging stack.'),
    q('What is a log shipper?', 'A lightweight agent installed on servers that tails log files and forwards them to a centralized logging platform (Filebeat, Fluentd, Vector).'),
    q('What is a correlation ID?', 'A unique ID generated at the entry point and propagated through all services — allows tracing a single request across distributed systems.'),
    q('What are the three pillars of observability?', 'Logs (events), Metrics (numbers), Traces (request flow). Centralized logging covers the logs pillar.'),
    q('What is log retention?', 'How long logs are kept. Hot tier (fast SSDs, 7d), warm (HDDs, 30d), cold (S3, 90d+), frozen (archive, years).'),
    q('What is Logstash?', 'A server-side data processing pipeline that ingests, transforms, and sends log data to Elasticsearch or other outputs.'),
    q('What is Kibana?', 'The visualization layer for Elasticsearch — dashboards, log exploration, charts, and alerting.'),
    q('What is Filebeat?', 'A lightweight log shipper from Elastic that tails files and forwards logs to Logstash/Elasticsearch/Kafka.'),
    q('Why use structured logs?', 'Parsing is automatic and reliable. JSON logs can be queried by field, unlike unstructured text that requires regex parsing.')
  ],
  R(10,35,110,25,'#0070f3','','App Servers','Log sources') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','Log Shippers','Filebeat, Fluentd') +
  A(160,60,160,80) +
  R(10,70,110,25,'#ffc107','','Transport','Kafka, HTTP') +
  A(120,83,150,83) +
  R(160,70,110,25,'#dc3545','','Processing','Logstash') +
  A(160,95,160,110) +
  R(10,105,110,25,'#e83e8c','','Storage','Elasticsearch') +
  A(120,118,150,118) +
  R(160,105,110,25,'#6610f2','','Visualization','Kibana') +
  R(290,35,190,155,'#17a2b8','','Centralized Logging','Aggregate, search, and analyze logs from all sources in one platform.') +
  T(240,220,'Centralized Logging: Ship, process, store, and visualize logs from every service and server.',9,'#666','middle'),
  [
    e('Centralized Logging with Filebeat + Logstash + Elasticsearch', 'Shipping logs from a Node.js app.', codeBlock([
      '# filebeat.yml (installed on app server)',
      'filebeat.inputs:',
      '- type: filestream',
      '  paths: /var/log/myapp/*.json',
      '  json.keys_under_root: true',
      '',
      'output.logstash:',
      '  hosts: ["logstash:5044"]',
      '',
      '# logstash.conf (central processing)',
      'input { beats { port => 5044 } }',
      'filter {',
      '  json { source => "message" }',
      '  mutate { remove_field => ["message"] }',
      '}',
      'output {',
      '  elasticsearch {',
      '    hosts => ["elasticsearch:9200"]',
      '    index => "myapp-%{+YYYY.MM.dd}"',
      '  }',
      '}'
    ]), 'Filebeat ships JSON logs to Logstash for processing, then Elasticsearch for storage and indexing.'),
    e('Structured JSON Logging in Node.js', 'Pino logger with correlation ID.', codeBlock([
      'const pino = require(\'pino\');',
      'const { v4: uuidv4 } = require(\'uuid\');',
      '',
      'const logger = pino({',
      '  level: process.env.LOG_LEVEL || \'info\',',
      '  formatters: {',
      '    level(label) { return { level: label }; }',
      '  }',
      '});',
      '',
      '// Generate correlation ID per request',
      "app.use((req, res, next) => {",
      '  req.correlationId = uuidv4();',
      '  res.setHeader(\'X-Correlation-Id\', req.correlationId);',
      '  next();',
      '});',
      '',
      '// Use logger with correlation ID',
      "app.get('/api/orders', async (req, res) => {",
      '  logger.info({',
      '    correlationId: req.correlationId,',
      '    path: req.path,',
      '    method: req.method',
      '  }, \'Handling order request\');',
      '  // Or use pino-http for automatic req logging',
      '});'
    ]), 'Pino produces structured JSON logs. Correlation IDs link log entries across services.'),
    e('Docker Centralized Logging with Loki + Promtail + Grafana', 'Lightweight alternative to ELK.', codeBlock([
      '# promtail.yml (log shipper for Docker)',
      'scrape_configs:',
      '- job_name: docker',
      '  pipeline_stages:',
      '  - docker: {}',
      '  static_configs:',
      '  - targets: [localhost]',
      "    labels:",
      "      job: 'myapp'",
      "      __path__: /var/lib/docker/containers/**/*.log",
      '',
      '# Loki (storage) runs as a single binary or Docker',
      '# docker run --name=loki \\',
      '#   -v ./loki-config.yaml:/etc/loki/loki.yaml \\',
      '#   grafana/loki',
      '',
      '# Grafana datasource: http://loki:3100',
      '# Queries: {job="myapp"} |= "error"',
      '# Labels help filter quickly without indexing full text'
    ]), 'Grafana Loki is a cost-effective centralized logging system designed for Kubernetes and Docker.'),
    e('Searching Logs with Elasticsearch Query DSL', 'Finding specific events.', codeBlock([
      'GET /myapp-2024.06.15/_search',
      '{',
      '  "query": {',
      '    "bool": {',
      '      "must": [',
      '        { "match": { "level": "error" } },',
      '        { "match": { "service": "order-service" } },',
      '        { "range": {',
      '          "@timestamp": {',
      '            "gte": "now-1h",',
      '            "lte": "now"',
      '          }',
      '        }}',
      '      ]',
      '    }',
      '  },',
      '  "aggs": {',
      '    "errors_by_minute": {',
      '      "date_histogram": {',
      '        "field": "@timestamp",',
      '        "interval": "1m"',
      '      }',
      '    }',
      '  }',
      '}'
    ]), 'Elasticsearch query DSL enables powerful filtering, aggregation, and analysis of log data.'),
    e('Fluentd Configuration for Centralized Logging', 'Unified logging layer.', codeBlock([
      '# fluentd.conf',
      '<source>',
      '  @type tail',
      '  path /var/log/myapp/*.log',
      '  format json',
      '  tag myapp',
      '</source>',
      '',
      '<filter myapp.**>',
      '  @type record_transformer',
      '  <record>',
      '    hostname "#{Socket.gethostname}"',
      '    environment "#{ENV[\'NODE_ENV\']}"',
      '  </record>',
      '</filter>',
      '',
      '<match myapp.**>',
      '  @type elasticsearch',
      '  host elasticsearch',
      '  port 9200',
      '  logstash_format true',
      '  <buffer>',
      '    @type file',
      '    path /var/log/fluentd/buffer',
      '    retry_max_times 5',
      '  </buffer>',
      '</match>'
    ]), 'Fluentd provides a unified logging layer with buffering, filtering, and multiple output plugins.')
  ],
  [
    m('What problem does centralized logging solve?', ['SSD space management', 'Needing to SSH into servers to read logs', 'Network latency', 'Load balancing'], 1, 'Centralized logging eliminates the need to manually access each server to check logs.'),
    m('What does the E in ELK stack stand for?', ['Elasticsearch', 'Express', 'EC2', 'Ember'], 0, 'ELK = Elasticsearch, Logstash, Kibana.'),
    m('What is a log shipper?', ['A tool that visualizes logs', 'An agent that forwards logs from servers', 'A database for logs', 'A log parser'], 1, 'Log shippers like Filebeat and Fluentd are lightweight agents that forward logs.'),
    m('What is a correlation ID used for?', ['Counting errors', 'Tracing a request across distributed services', 'Billing', 'Load balancing'], 1, 'Correlation IDs link log entries from the same request across multiple services.'),
    m('What is the hot tier in log storage?', ['Nearline archive', 'Recent logs on fast storage', 'Compressed backup', 'S3 storage'], 1, 'Hot tier stores recent logs on fast SSDs for quick querying; older data moves to cheaper storage.'),
    m('What are the three pillars of observability?', ['Dev, Staging, Prod', 'Logs, Metrics, Traces', 'CPU, Memory, Disk', 'Build, Test, Deploy'], 1, 'Observability consists of logs (events), metrics (numbers), and traces (request flow).')
  ]
);

/* =================== TOPIC 2: Structured Logging =================== */
addTopic('log-structured', 'Structured Logging', 'intermediate', 15,
  ['Structured logging outputs log entries as structured data (JSON) instead of plain text, making them machine-parseable and queryable.',
   'Each log entry has named fields: timestamp, level, message, service, correlationId, duration, userId. No regex parsing needed to extract values.',
   'Benefits: automatic parsing by log platforms, rich filtering and aggregation, consistent schema across services, easy integration with alerting systems.',
   'Standard fields: @timestamp (ISO 8601), level (error/warn/info/debug), logger (class/module name), message (human-readable), and custom context fields.'
  ],
  'Structured logging is like filling out a standardized form instead of writing a paragraph. A form has named fields: "Date:", "Customer:", "Issue:". You can instantly search all forms for "Customer: Alice". Unstructured logging is like a diary entry: "Today Alice came in with a problem, it happened around 3 PM." Harder to search and analyze.',
  [
    d('JSON Log Format', '{"@timestamp": "2024-06-15T10:30:00Z", "level": "error", "logger": "UserService", "message": "Failed to create user", "userId": 42, "error": {"code": "DUPLICATE_EMAIL", "stack": "..."}}. Benefits: parsers can index each field, dashboards can aggregate by level, alerts can trigger on specific conditions.'),
    d('Log Levels in Structured Logging', 'trace: detailed debugging (development only). debug: diagnostic info for troubleshooting. info: normal application events (request started, user created). warn: unexpected but handled issues (rate limit exceeded). error: failures requiring attention (DB connection lost). fatal: unrecoverable errors (process exit).'),
    d('Contextual Logging (Child Loggers)', 'Create child loggers pre-populated with context: const childLogger = logger.child({ service: \'orders\', requestId: req.id }). Every log from this child automatically includes service and requestId fields. Eliminates repetitive manual field injection. Patterns: per-request child logger in middleware, per-service child logger at startup.'),
    d('Structured Logging in Microservices', 'Every service logs structured JSON to stdout. Log shippers (Filebeat, Fluentd) collect from all services. Centralized platform indexes by service name field. Search across all services: {service: "orders"} AND level: "error". Correlation IDs connect entries across services. Consistent schema across teams via shared logging library.'),
    d('Performance Considerations', 'Structured logging is slightly slower than plain text due to serialization overhead. Mitigations: async logging (worker thread), batching, sampling high-volume debug logs, choose fast JSON serializers (pino is faster than bunyan/winston). Pino claims ~5x faster than Winston due to minimal serialization overhead.')
  ],
  'Structured logging is essential for any production system. Use JSON format with a consistent schema. Include correlation IDs, service names, and relevant context. Pino is the fastest Node.js logger. Send all logs to stdout and use a log shipper — never write to files directly in containerized environments. Structured logs are the foundation of observability.',
  [
    q('What is structured logging?', 'Outputting log entries as structured data (JSON) with named fields instead of unstructured plain text.'),
    q('Why use structured logging?', 'Machine-parseable, queryable by field, consistent schema, no regex parsing, easier integration with log platforms.'),
    q('What is a child logger?', 'A logger pre-populated with context fields. Every log from the child automatically includes those fields.'),
    q('What are common structured log fields?', '@timestamp, level, message, logger (module/class), service, correlationId, userId, duration, error.'),
    q('What is the fastest Node.js logger?', 'Pino — ~5x faster than Winston due to minimal serialization overhead and async design.'),
    q('What log levels exist?', 'trace, debug, info, warn, error, fatal. Use info for normal events, error for failures, trace/debug for development.'),
    q('Should you log to files in Docker?', 'No. Log to stdout. Docker captures stdout/stderr. A log shipper collects from Docker\'s log driver.'),
    q('What is log level sampling?', 'Logging only a percentage of high-volume events (e.g., 1% of debug logs) to reduce volume while retaining signal.'),
    q('How do you add context to logs?', 'Use child loggers, pass context object to each log call, or use AsyncLocalStorage for automatic context propagation.'),
    q('What is the schema consistency problem?', 'Different services may log the same field with different names/types. Solve with a shared logging library/schema registry.')
  ],
  R(10,35,110,25,'#0070f3','','Plain Text','"User logged in"') +
  A(120,48,150,48) +
  R(160,35,130,25,'#dc3545','','Parsing Hell','regex, grep, cut') +
  A(120,78,150,78) +
  R(10,65,110,25,'#28a745','','JSON Format','{"level":"info","userId":42}') +
  A(120,48,150,48) +
  R(160,65,130,25,'#ffc107','','Auto-Parsed','Query by field') +
  R(10,95,110,25,'#e83e8c','','Child Logger','Pre-populated context') +
  R(10,125,110,25,'#6610f2','','Pino Logger','Fast serialization') +
  R(10,155,110,25,'#17a2b8','','Correlation ID','Trace across services') +
  R(300,35,180,155,'#17a2b8','','Structured Logging','JSON logs with named fields. Machine-parseable, queryable, consistent across services.') +
  T(240,220,'Structured Logging: JSON-formatted logs with named fields — no regex, instant querying, rich analysis.',9,'#666','middle'),
  [
    e('Pino Structured Logger (Node.js)', 'Fast JSON logging.', codeBlock([
      'const pino = require(\'pino\');',
      '',
      'const logger = pino({',
      '  level: process.env.LOG_LEVEL || \'info\',',
      '  timestamp: pino.stdTimeFunctions.isoTime,',
      '  formatters: {',
      '    bindings(bindings) {',
      '      return { pid: bindings.pid, host: bindings.hostname };',
      '    }',
      '  },',
      '  redact: {',
      "    paths: ['req.headers.authorization', 'req.body.password'],",
      "    censor: '[REDACTED]'",
      '  }',
      '});',
      '',
      'logger.info({ userId: 42, action: \'create_order\' }, \'Order created\');',
      '// {"level":30,"time":"2024-06-15T10:30:00Z",',
      '//  "pid":1234,"host":"server1",',
      '//  "userId":42,"action":"create_order",',
      '//  "msg":"Order created"}'
    ]), 'Pino outputs structured JSON with automatic timestamp, level, and custom context fields.'),
    e('Winston Structured Logger (Node.js)', 'Popular alternative with transports.', codeBlock([
      'const winston = require(\'winston\');',
      '',
      'const logger = winston.createLogger({',
      '  level: \'info\',',
      "  format: winston.format.combine(",
      '    winston.format.timestamp(),',
      '    winston.format.errors({ stack: true }),',
      '    winston.format.json()',
      '  ),',
      "  defaultMeta: { service: 'order-service' },",
      '  transports: [',
      '    new winston.transports.Console(),',
      '    new winston.transports.File({',
      "      filename: 'logs/error.log', level: 'error'",
      '    })',
      '  ]',
      '});',
      '',
      "logger.error('Database connection failed', {",
      '  dbHost: process.env.DB_HOST,',
      '  retryAttempt: 3',
      '});'
    ]), 'Winston provides flexible transports and formatting with structured JSON output.'),
    e('Child Logger with Request Context', 'Automatic context via middleware.', codeBlock([
      "// Middleware: create child logger per request",
      "app.use((req, res, next) => {",
      '  req.log = logger.child({',
      '    requestId: uuidv4(),',
      '    method: req.method,',
      '    url: req.url,',
      '    ip: req.ip',
      '  });',
      '  next();',
      '});',
      '',
      '// Route handler — no repetitive context injection',
      "app.get('/api/users/:id', async (req, res) => {",
      '  req.log.info({ userId: req.params.id }, \'Fetching user\');',
      '  try {',
      '    const user = await db.findUser(req.params.id);',
      '    req.log.info(\'User found\');',
      '    res.json(user);',
      '  } catch (err) {',
      '    req.log.error({ err }, \'Failed to fetch user\');',
      '    res.status(500).json({ error: \'Internal error\' });',
      '  }',
      '});'
    ]), 'Child loggers automatically include request context in every log entry without manual injection.'),
    e('Structured Error Logging with Stack Traces', 'Log full error details.', codeBlock([
      'const pino = require(\'pino\');',
      '',
      'const logger = pino({',
      '  serializers: {',
      '    err: pino.stdSerializers.err,',
      '    req: pino.stdSerializers.req,',
      '    res: pino.stdSerializers.res',
      '  }',
      '});',
      '',
      'try {',
      '  throw new Error(\'Database timeout\');',
      '} catch (err) {',
      '  // Automatically serializes: message, stack, type',
      '  logger.error({ err, query: \'SELECT * FROM orders\' },',
      '    \'Query failed\');',
      '  // {"level":50,"err":{"type":"Error",',
      '  //  "message":"Database timeout",',
      '  //  "stack":"Error: Database timeout\\n at ..."},',
      '  //  "query":"SELECT * FROM orders"}',
      '}'
    ]), 'Error serializers capture full stack traces and error details in structured format.'),
    e('AsyncLocalStorage for Automatic Context', 'No need to pass logger through every function.', codeBlock([
      'const { AsyncLocalStorage } = require(\'async_hooks\');',
      'const asyncStore = new AsyncLocalStorage();',
      '',
      'const baseLogger = require(\'pino\')();',
      '',
      "app.use((req, res, next) => {",
      '  const store = {',
      '    logger: baseLogger.child({',
      '      requestId: uuidv4(),',
      '      userId: req.user?.id',
      '    })',
      '  };',
      '  asyncStore.run(store, () => next());',
      '});',
      '',
      'function getLogger() {',
      '  return asyncStore.getStore()?.logger || baseLogger;',
      '}',
      '',
      '// In any service layer:',
      'async function createOrder(data) {',
      '  const log = getLogger();',
      '  log.info({ data }, \'Creating order\');',
      '  // No need to pass req.log through calls',
      '}'
    ]), 'AsyncLocalStorage propagates the logger context automatically without passing it through parameters.')
  ],
  [
    m('What format does structured logging use?', ['CSV', 'JSON', 'XML', 'YAML'], 1, 'Structured logging most commonly uses JSON format with named fields.'),
    m('Which Node.js logger is fastest?', ['Winston', 'Bunyan', 'Pino', 'Log4js'], 2, 'Pino is significantly faster due to minimal serialization overhead.'),
    m('What is a child logger?', ['A logger for children', 'A logger with pre-populated context fields', 'A separate log file', 'A logger that filters by level'], 1, 'Child loggers inherit parent configuration and add predefined context fields automatically.'),
    m('What should be included in every log?', ['@timestamp, level, message', 'IP address only', 'Server uptime', 'Memory usage'], 0, 'Every structured log should include timestamp, level, and a descriptive message plus relevant context.'),
    m('Why log to stdout in containers?', ['Better performance', 'Docker captures stdout; shippers collect from Docker', 'It is the default', 'Files are not allowed'], 1, 'Docker and Kubernetes capture stdout/stderr; using stdout is the container-native logging pattern.'),
    m('What log level indicates failure?', ['info', 'warn', 'error', 'debug'], 2, 'Error level indicates a failure that needs investigation. Fatal indicates unrecoverable errors.')
  ]
);

/* =================== TOPIC 3: Log Aggregation =================== */
addTopic('log-aggregation', 'Log Aggregation', 'intermediate', 15,
  ['Log aggregation is the process of collecting, processing, and storing logs from multiple sources into a centralized repository for analysis and alerting.',
   'Unlike simple centralized logging, aggregation adds enrichment, normalization, deduplication, and transformation pipelines to make raw logs useful.',
   'Key stages: collection (shippers), buffering (Kafka/Redis), transformation (Logstash/Fluentd), enrichment (add geoip, user context), storage (Elasticsearch/S3), and querying.',
   'Aggregation pipelines can parse unstructured logs into structured fields, redact sensitive data, filter noisy logs, and route different log types to different destinations.'
  ],
  'Log aggregation is like a postal sorting facility. Raw mail (logs) arrives from every mailbox in the city (servers). Workers sort by zip code (normalize), remove junk (filter), add tracking numbers (enrich), bundle for each route (buffer), and deliver to the right destination (storage). Without the sorting facility, each mailbox would be a chaotic pile.',
  [
    d('Collection and Buffering Layer', 'Shippers (Filebeat, Fluentbit) collect logs and send to a buffer (Kafka, Redis, or NATS). Buffers absorb traffic spikes, provide replay capability, and decouple producers from consumers. Kafka is preferred for high-volume production: partitioning by log source, replication for durability, retention for replay.'),
    d('Transformation Pipelines', 'Logstash or Fluentd process raw logs: parse unstructured text into JSON (grok patterns), normalize field names (host -> hostname), add metadata (geoip from IP), filter sensitive data (credit cards, passwords), drop noisy debug logs, route error logs to separate index. Pipeline stages: input -> filter -> output.'),
    d('Enrichment Strategies', 'GeoIP: add latitude/longitude/country from IP address. User context: add username, role from session/token. Service topology: add service version, deployment environment. Threat intelligence: cross-reference IPs with known threat feeds. Enrichment happens in the pipeline before storage.'),
    d('Aggregation Architecture Patterns', 'Push model: shippers push to central ingester (simpler, common). Pull model: central collector pulls from agents (better for firewalls). Agentless: servers send logs directly via syslog/HTTP (no agent install). Hybrid: agents for production, agentless for legacy systems. Choose based on security requirements and network topology.'),
    d('Alerting from Aggregated Logs', 'Define alert rules on aggregated data: error rate > X% in 5 minutes, no logs from a service for 10 minutes, specific error pattern detected. Tools: ElastAlert (Elasticsearch), Grafana alerts (Loki), Kibana alerting. Severity levels: critical (page on-call), warning (create ticket), info (log for trend analysis).')
  ],
  'Log aggregation transforms raw, noisy logs into actionable data. Design your pipeline carefully: buffering prevents data loss, transformation normalizes the schema, enrichment adds business context, and alerting turns logs into automated responses. Start simple with Filebeat + Elasticsearch, add Kafka at scale, and evolve into a full observability platform.',
  [
    q('What is log aggregation?', 'Collecting, processing, enriching, and storing logs from multiple sources into a centralized, queryable repository.'),
    q('What is the role of Kafka in log aggregation?', 'Acts as a durable buffer — decouples log producers from consumers, absorbs traffic spikes, enables replay.'),
    q('What is grok in Logstash?', 'A pattern-matching syntax to parse unstructured log lines into structured fields using regex-like patterns.'),
    q('What is log enrichment?', 'Adding contextual data (geoip, user info, environment) to log entries during pipeline processing.'),
    q('What is a log pipeline?', 'The end-to-end flow: collection -> buffering -> transformation -> enrichment -> storage -> querying.'),
    q('What is the difference between push and pull log collection?', 'Push: agents send logs to central server (simpler). Pull: central server fetches from agents (better firewall traversal).'),
    q('What is deduplication in log aggregation?', 'Removing duplicate log entries. Useful when the same event is logged by multiple sources or retries cause repeats.'),
    q('What is log normalization?', 'Converting logs from different sources into a consistent schema (same field names, types, and formats).'),
    q('What is ElastAlert?', 'An open-source alerting framework for Elasticsearch data — triggers alerts based on configurable rules.'),
    q('Why buffer logs before processing?', 'Buffers handle traffic spikes, prevent data loss if downstream is unavailable, and allow replay of failed processing.')
  ],
  R(10,35,100,25,'#0070f3','','Sources','Apps, servers') +
  A(110,48,140,48) +
  R(150,35,100,25,'#28a745','','Shippers','Filebeat, Fluentd') +
  A(150,60,150,80) +
  R(10,70,100,25,'#ffc107','','Buffer','Kafka, Redis') +
  A(110,83,140,83) +
  R(150,70,100,25,'#dc3545','','Transform','Parse, normalize') +
  A(150,95,150,110) +
  R(10,105,100,25,'#e83e8c','','Enrich','GeoIP, context') +
  A(110,118,140,118) +
  R(150,105,100,25,'#6610f2','','Store','Elasticsearch, S3') +
  R(270,35,210,155,'#17a2b8','','Log Aggregation','Ship -> Buffer -> Transform -> Enrich -> Store -> Alert. Raw logs become actionable data.') +
  T(240,220,'Log Aggregation: Pipeline that transforms raw, noisy logs into structured, actionable, enriched data.',9,'#666','middle'),
  [
    e('Logstash Grok Parsing (Apache Logs)', 'Parse unstructured logs into fields.', codeBlock([
      '# Input: 192.168.1.1 - - [15/Jun/2024:10:30:00 +0000] "GET /api/users 200" 1234 "Mozilla/5.0"',
      '',
      'filter {',
      '  grok {',
      '    match => { "message" => [',
      '      "%{IP:client_ip} - - \\[%{HTTPDATE:timestamp}\\]',
      '      \\"%{WORD:method} %{URIPATHPARAM:request}',
      '      %{NUMBER:status_code}\\" %{NUMBER:bytes}',
      '      \\"%{GREEDYDATA:user_agent}\\"',
      '    ] }',
      '  }',
      '  date {',
      '    match => ["timestamp", "dd/MMM/yyyy:HH:mm:ss Z"]',
      '    target => "@timestamp"',
      '  }',
      '  geoip { source => "client_ip" }',
      '  useragent { source => "user_agent" }',
      '  mutate { remove_field => ["message"] }',
      '}'
    ]), 'Grok pattern parses Apache logs into structured fields with geoip and user agent enrichment.'),
    e('Kafka as Log Buffer (Docker Compose)', 'Durable log transport.', codeBlock([
      'version: \'3\'',
      'services:',
      '  zookeeper:',
      '    image: confluentinc/cp-zookeeper:latest',
      '    environment:',
      '      ZOOKEEPER_CLIENT_PORT: 2181',
      '',
      '  kafka:',
      '    image: confluentinc/cp-kafka:latest',
      '    depends_on: [zookeeper]',
      '    environment:',
      '      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181',
      "      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092",
      '      KAFKA_TOPIC_LOG_RETENTION_MS: 604800000',
      '',
      '  logstash:',
      '    image: docker.elastic.co/logstash/logstash:8.12.0',
      '    environment:',
      "      LS_JAVA_OPTS: '-Xmx1g -Xms1g'",
      '    volumes:',
      '      - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf'
    ]), 'Kafka buffers logs between shippers and Logstash, providing durability and replay capability.'),
    e('Fluentd Aggregation Pipeline', 'Unified log processing.', codeBlock([
      '## Source: tail JSON logs',
      '<source>',
      '  @type tail',
      '  format json',
      '  path /var/log/app/*.log',
      '  tag app.log',
      '</source>',
      '',
      '## Filter: add environment and hostname',
      '<filter app.log>',
      '  @type record_transformer',
      '  <record>',
      '    env "#{ENV[\'NODE_ENV\'] || \'development\'}"',
      '    hostname ${hostname}',
      '  </record>',
      '</filter>',
      '',
      '## Filter: redact sensitive data',
      '<filter app.log>',
      '  @type grep',
      '  exclude1 message .*password.*',
      '</filter>',
      '',
      '## Output: route errors to separate index',
      '<match app.log>',
      '  @type elasticsearch',
      '  host elasticsearch:9200',
      '  include_tag_key true',
      '  <buffer>',
      '    @type file',
      '    path /var/log/fluentd-buffer',
      '  </buffer>',
      '</match>'
    ]), 'Fluentd pipeline: tail logs -> add metadata -> redact sensitive data -> buffer -> Elasticsearch.'),
    e('Log Aggregation with AWS CloudWatch + Lambda', 'Serverless log processing.', codeBlock([
      '# CloudWatch Logs subscription filter',
      '# Sends matching logs to Lambda for processing',
      '',
      'exports.handler = async (event) => {',
      '  const logs = event.awslogs.data;',
      '  const decoded = Buffer.from(logs, \'base64\');',
      '  const parsed = JSON.parse(decoded.toString());',
      '',
      '  for (const logEvent of parsed.logEvents) {',
      '    const entry = JSON.parse(logEvent.message);',
      '    ',
      '    // Enrich with additional context',
      '    entry.environment = process.env.ENV;',
      '    entry.processedAt = new Date().toISOString();',
      '',
      '    // Route to Elasticsearch or S3',
      '    if (entry.level === \'error\') {',
      '      await sendToElasticsearch(entry);',
      '      await sendToAlerting(entry);',
      '    } else {',
      '      await sendToS3(entry);',
      '    }',
      '  }',
      '};'
    ]), 'CloudWatch Logs subscription with Lambda enables serverless log aggregation and enrichment.'),
    e('Log Deduplication and Rate Limiting', 'Reduce noisy logs.', codeBlock([
      '// Logstash filter: deduplicate similar errors',
      'filter {',
      '  fingerprint {',
      '    source => ["message", "level", "file"]',
      '    target => "[@metadata][fingerprint]"',
      '    method => "SHA256"',
      '  }',
      '}',
      '',
      '// Rate limit: max 5 identical errors per minute',
      'filter {',
      '  throttle {',
      '    before_count => -1',
      '    after_count => 5',
      '    period => 60',
      '    max_age => 86400',
      '    key => "%{[@metadata][fingerprint]}"',
      '    add_tag => ["throttled"]',
      '  }',
      '}',
      '',
      '// Drop throttled events in output',
      'output {',
      '  if "throttled" not in [tags] {',
      '    elasticsearch { ... }',
      '  }',
      '}'
    ]), 'Deduplication and rate limiting prevent log floods from overwhelming storage and alerting systems.')
  ],
  [
    m('What does a log aggregation pipeline include?', ['Collection, buffer, transform, enrich, store', 'Only collection', 'Only storage', 'Only visualization'], 0, 'A full pipeline includes collection, buffering, transformation, enrichment, and storage.'),
    m('What is the role of Kafka in log aggregation?', ['Visualization', 'Durable buffering and decoupling', 'Log parsing', 'Alert generation'], 1, 'Kafka acts as a durable buffer that decouples log producers from consumers.'),
    m('What is grok used for?', ['Compressing logs', 'Parsing unstructured logs into fields', 'Encrypting logs', 'Routing logs'], 1, 'Grok is a pattern-matching system in Logstash for parsing unstructured log lines.'),
    m('What is log enrichment?', ['Deleting old logs', 'Adding context data to log entries', 'Compressing log files', 'Changing log format'], 1, 'Enrichment adds contextual data like geoip, user information, or environment metadata.'),
    m('What is the advantage of buffering logs?', ['Faster querying', 'Handles traffic spikes, prevents data loss', 'Smaller storage', 'Better visualization'], 1, 'Buffers absorb spikes, provide replay capability, and prevent data loss during downstream outages.'),
    m('What does log normalization do?', ['Normalizes file permissions', 'Converts logs to a consistent schema', 'Normalizes log file sizes', 'Normalizes server time'], 1, 'Normalization converts logs from different sources into a consistent field schema.')
  ]
);

/* =================== TOPIC 4: Log Rotation =================== */
addTopic('log-rotation', 'Log Rotation', 'beginner', 10,
  ['Log rotation is the process of archiving, compressing, or deleting old log files to prevent disk space exhaustion while preserving recent logs for debugging.',
   'Without rotation, a single log file grows indefinitely — filling the disk, crashing the application, and making log analysis impractical (gigabyte-sized files).',
   'Key parameters: max file size (100MB), max age (30 days), max files (10), compression (gzip), naming pattern (app.log -> app.2024-06-15.log.gz).',
   'Rotation strategies: size-based (rotate when file exceeds N MB), time-based (rotate daily/hourly), hybrid (rotate on first trigger).'
  ],
  'Log rotation is like having a self-cleaning notebook. When a page fills up, you tear it out, file it in a labeled folder (archive), and start a fresh page. When the filing cabinet fills up, you shred the oldest folders (delete). Without this, the notebook keeps growing until it bursts the binder and covers your desk in paper.',
  [
    d('Linux logrotate Tool (Standard)', 'The standard log rotation tool for Linux servers. Configuration files in /etc/logrotate.d/. Supports: size threshold, daily/weekly/monthly rotation, compression (gzip), post-rotation scripts (restart service, signal application), date-based naming, max number of rotated files. Cron job runs logrotate daily.'),
    d('Size-Based vs Time-Based Rotation', 'Size-based: rotate when file exceeds threshold (100MB). Good for high-volume apps with predictable log rates. Time-based: rotate every N hours/days. Predictable archive naming, easier to correlate with time periods. Hybrid: rotate on whichever triggers first. Recommended: size-based with max age as safety net.'),
    d('Compression and Archiving', 'Gzip rotated logs: reduces size by 80-90%. Trade-off: cannot search compressed logs without decompression. Strategies: compress after N days, keep last N uncompressed for quick debugging, archive to cold storage (S3/Glacier) after retention period. Use pigz (parallel gzip) for faster compression of large files.'),
    d('Application-Level Rotation (Log4j/Winston)', 'Some logging libraries support rotation internally (Log4j\'s RollingFileAppender, Winston\'s File transport with maxsize). Benefits: no external tool needed, application-controlled naming, programmatic configuration. Drawbacks: application crash during rotation can lose data. Recommended: use system-level logrotate for production, app-level as fallback.'),
    d('Docker/Kubernetes Log Rotation', 'Docker uses json-file logging driver by default — rotates via max-size and max-file flags. Kubernetes: kubelet handles log rotation (max 10 files, 10MB each by default). In Kubernetes, sidecar containers with log shippers (Fluentbit) provide more control. Best practice: containers log to stdout, let the runtime handle rotation.')
  ],
  'Log rotation is a simple but critical operational practice. Always configure rotation before deploying to production — a disk-full crash from unrotated logs is embarrassing and preventable. Use logrotate on Linux, configure Docker\'s max-size/max-file, and set retention policies. Compress old logs but keep recent ones uncompressed for quick grep access.',
  [
    q('What is log rotation?', 'Archiving, compressing, or deleting old log files to prevent disk space exhaustion while retaining recent logs for debugging.'),
    q('Why is log rotation important?', 'Without it, log files grow indefinitely — filling disks, crashing apps, and making analysis impractical.'),
    q('What is the Linux logrotate tool?', 'The standard log rotation utility for Linux — configured in /etc/logrotate.d/ with cron-based execution.'),
    q('What are common rotation triggers?', 'File size (100MB), time interval (daily), or hybrid (first trigger).'),
    q('What is gzip compression in log rotation?', 'Compresses rotated logs (80-90% size reduction). Recent logs kept uncompressed for quick searching.'),
    q('How does Docker handle log rotation?', 'Via json-file logging driver options: --log-opt max-size=10m --log-opt max-file=3.'),
    q('How does Kubernetes handle log rotation?', 'kubelet rotates logs automatically (default: 10 files, 10MB each). Use sidecar containers for more control.'),
    q('What is a post-rotation script?', 'A command run after rotation (logrotate: postrotate/endscript). Used to restart services or send SIGHUP.'),
    q('What is the dateext option in logrotate?', 'Adds date to rotated filenames instead of sequential numbers: app.log -> app-20240615.gz.'),
    q('How many rotated logs should you keep?', 'Depends on retention policy. Common: 30 daily logs (1 month) or 7 daily + 4 weekly (rolling month).')
  ],
  R(10,35,110,25,'#0070f3','','app.log','Active file') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','Size Exceeded','100MB threshold') +
  A(160,60,160,80) +
  R(10,70,110,25,'#ffc107','','Rotate','Rename + compress') +
  A(120,83,150,83) +
  R(160,70,110,25,'#dc3545','','app.1.log.gz','Archived') +
  R(10,105,110,25,'#e83e8c','','New app.log','Fresh file') +
  R(10,135,110,25,'#6610f2','','Delete Oldest','Retention limit') +
  R(290,35,190,155,'#17a2b8','','Log Rotation','Prevent disk-full crashes. Archive, compress, and purge old logs automatically.') +
  T(240,220,'Log Rotation: Automatically archive, compress, and delete old log files to manage disk space.',9,'#666','middle'),
  [
    e('Linux logrotate Configuration', 'Standard rotation setup.', codeBlock([
      '# /etc/logrotate.d/myapp',
      '/var/log/myapp/*.log {',
      '    daily',
      '    rotate 30',
      '    size 100M',
      '    compress',
      '    delaycompress',
      '    missingok',
      '    notifempty',
      '    dateext',
      '    postrotate',
      '        systemctl reload myapp 2>/dev/null || true',
      '    endscript',
      '}',
      '',
      '# Options explained:',
      '# daily: rotate every day',
      '# rotate 30: keep 30 rotated files',
      '# size 100M: also rotate if file > 100MB',
      '# compress: gzip rotated files',
      '# delaycompress: skip compressing the most recent',
      '#   rotated file (easier to debug)',
      '# missingok: no error if log file missing',
      '# dateext: use date in filename (app-20240615.gz)'
    ]), 'logrotate configuration for a typical application — hybrid size+time rotation with compression.'),
    e('Docker Container Log Rotation', 'Prevent Docker logs from filling disk.', codeBlock([
      '# Option 1: docker run flags',
      'docker run \\',
      '  --log-driver json-file \\',
      "  --log-opt max-size='10m' \\",
      "  --log-opt max-file='3' \\",
      '  myapp',
      '',
      '# Option 2: Docker Compose',
      'services:',
      '  myapp:',
      '    image: myapp',
      '    logging:',
      '      driver: json-file',
      '      options:',
      "        max-size: '10m'",
      "        max-file: '3'",
      '',
      '# Option 3: Global daemon.json',
      '# /etc/docker/daemon.json',
      '{ "log-driver": "json-file",',
      '  "log-opts": {',
      '    "max-size": "10m",',
      '    "max-file": "3"',
      '  }',
      '}'
    ]), 'Docker log rotation prevents containers from filling disk with log files.'),
    e('Winston File Rotation (Node.js)', 'Application-level rotation.', codeBlock([
      'const winston = require(\'winston\');',
      'require(\'winston-daily-rotate-file\');',
      '',
      'const transport = new winston.transports.DailyRotateFile({',
      "  filename: 'logs/application-%DATE%.log',",
      "  datePattern: 'YYYY-MM-DD',",
      '  maxSize: \'100m\',',
      "  maxFiles: '30d',",
      '  zippedArchive: true,',
      '  format: winston.format.combine(',
      '    winston.format.timestamp(),',
      '    winston.format.json()',
      '  )',
      '});',
      '',
      'transport.on(\'rotate\', (oldFilename, newFilename) => {',
      '  console.log(\'Log rotated:\', oldFilename, \'->\', newFilename);',
      '});',
      '',
      'const logger = winston.createLogger({',
      '  transports: [transport]',
      '});'
    ]), 'Winston daily rotation with size limit, 30-day retention, and automatic gzip compression.'),
    e('Manual Log Rotation Script (Bash)', 'Simple rotation for any app.', codeBlock([
      '#!/bin/bash',
      'LOG_FILE="/var/log/myapp/app.log"',
      'MAX_SIZE=104857600  # 100MB in bytes',
      'RETENTION_DAYS=30',
      '',
      '# Check file size',
      'if [ -f "$LOG_FILE" ] && [ $(stat -c%s "$LOG_FILE") -gt $MAX_SIZE ]; then',
      '  # Rotate: rename with timestamp',
      '  TIMESTAMP=$(date +%Y%m%d-%H%M%S)',
      '  mv "$LOG_FILE" "${LOG_FILE}.${TIMESTAMP}"',
      '',
      '  # Reopen log file (send SIGHUP if app supports it)',
      '  kill -HUP $(cat /var/run/myapp.pid) 2>/dev/null',
      '',
      '  # Compress old log',
      '  gzip "${LOG_FILE}.${TIMESTAMP}" &',
      '',
      '  # Delete logs older than retention period',
      '  find /var/log/myapp -name "*.gz" -mtime +$RETENTION_DAYS -delete',
      'fi'
    ]), 'Simple manual log rotation script that checks size, rotates, compresses, and purges old logs.'),
    e('Kubernetes Log Rotation Config', 'Pod-level log management.', codeBlock([
      '# Node-level kubelet config',
      '# /var/lib/kubelet/config.yaml',
      'containerLogMaxSize: "10Mi"',
      'containerLogMaxFiles: 5',
      '',
      '# Or use a sidecar with log rotation',
      'apiVersion: v1',
      'kind: Pod',
      'metadata:',
      '  name: myapp',
      'spec:',
      '  containers:',
      '  - name: app',
      '    image: myapp',
      '    volumeMounts:',
      '    - name: logs',
      '      mountPath: /var/log/app',
      '  - name: log-rotator',
      '    image: tutt/rotate:latest',
      '    volumeMounts:',
      '    - name: logs',
      '      mountPath: /var/log/app',
      '  volumes:',
      '  - name: logs',
      '    emptyDir: {}'
    ]), 'Kubernetes log rotation via kubelet config or sidecar container pattern.')
  ],
  [
    m('What problem does log rotation solve?', ['Log format consistency', 'Disk space exhaustion from unbounded log growth', 'Log encryption', 'Log query speed'], 1, 'Log rotation prevents log files from growing until they fill the disk and crash the application.'),
    m('What is the Linux tool for log rotation?', ['cron', 'logrotate', 'rsyslog', 'systemd'], 1, 'logrotate is the standard Linux utility for automated log rotation.'),
    m('What does the compress option in logrotate do?', ['Deletes old logs', 'Gzips rotated logs', 'Encrypts logs', 'Splits logs'], 1, 'compress applies gzip compression to rotated log files, reducing size by ~80-90%.'),
    m('How does Docker control log rotation?', ['Via Dockerfile', 'Via --log-opt max-size and max-file', 'Via docker-compose.yml only', 'Automatically'], 1, 'Docker log rotation is configured with max-size and max-file logging options.'),
    m('What is a post-rotation script?', ['Script to analyze logs', 'Script run after logrotate finishes', 'Script to delete logs', 'Script to create logs'], 1, 'Post-rotation scripts typically reload or restart the application to reopen log file handles.'),
    m('What is the default Kubernetes log rotation?', ['No rotation', '10 files, 10MB each (configurable)', 'Daily rotation', 'Size-based only'], 1, 'kubelet rotates logs by default with configurable max size and max file count.')
  ]
);

/* =================== TOPIC 5: Log Levels =================== */
addTopic('log-levels', 'Log Levels', 'beginner', 10,
  ['Log levels categorize log entries by severity, allowing developers to filter noise from critical issues and control verbosity in different environments.',
   'Standard hierarchy (most to least severe): fatal, error, warn, info, debug, trace. Each level includes all levels above it (info includes warn, error, fatal).',
   'Environment recommendations: production = info (capture errors + normal events), staging = debug, development = trace. Never leave debug/trace on in production at high volume.',
   'Log levels enable: alerting only on error/fatal, suppressing debug in production, gradually increasing verbosity for troubleshooting specific components.'
  ],
  'Log levels are like volume knobs on a radio. Fatal/Error is the emergency broadcast system — you stop everything to listen. Warn is the weather alert. Info is the regular news. Debug is the detailed sports commentary. Trace is the static between stations — useful to engineers, noise to everyone else. You turn the knob up (more verbose) when troubleshooting.',
  [
    d('Standard Log Levels (RFC 5424)', 'Syslog severity levels (0-7): Emergency (0) — system unusable. Alert (1) — immediate action required. Critical (2) — critical condition. Error (3) — error condition. Warning (4) — warning condition. Notice (5) — normal but significant. Informational (6) — general info. Debug (7) — debug-level messages. Most apps use error/warn/info/debug.'),
    d('Choosing the Right Level', 'Fatal: app cannot continue (cannot connect to DB on startup). Error: operation failed (payment declined, DB query failed). Warn: unexpected but handled (rate limit hit, retry succeeded, deprecated API used). Info: significant lifecycle events (server started, user registered, order placed). Debug: detailed diagnostic info (SQL queries, API response times). Trace: step-by-step execution flow (entering/exiting functions).'),
    d('Environment-Based Level Configuration', 'Production: info (or warn for high-volume apps). Covers error/warn/info. Filter debug/trace. Staging: debug for troubleshooting test failures. Development: trace for maximum verbosity. Configure via environment variable (LOG_LEVEL=info). Change log level at runtime for specific components without restart using dynamic configuration.'),
    d('Dynamic Log Level Changing', 'Change log level at runtime without restarting the process. Useful for: temporarily enabling debug on a production service to diagnose an issue. Implementation: shared configuration store (Redis, config server), HTTP endpoint to change level (/loglevel), signal handling (SIGUSR2). Log level reverts to default on restart.'),
    d('Per-Component Log Levels', 'Different log levels for different modules or packages. Example: set db module to debug, http module to warn, and everything else to info. Node.js: pino supports level per child logger. Winston: level per transport. Benefits: reduce noise from well-known components, increase detail on components being investigated.')
  ],
  'Log levels are your first line of defense against log noise. Set the right level for each message: error for actual failures, warn for surprises that are handled, info for significant events, debug for diagnostics. Configure levels per environment and consider per-component levels. Implement dynamic log level changes for production debugging without restarting services.',
  [
    q('What are log levels?', 'Severity categories for log entries: fatal, error, warn, info, debug, trace. Higher levels include all lower levels.'),
    q('What log level should production use?', 'Info (captures error/warn/info) or warn for high-volume apps. Never debug/trace in production.'),
    q('What is the difference between error and fatal?', 'Error: operation failed but app can continue. Fatal: app cannot continue (exits or crashes).'),
    q('What is the difference between debug and trace?', 'Debug: detailed diagnostic info (SQL queries, response times). Trace: step-by-step flow (function entry/exit).'),
    q('What is dynamic log level changing?', 'Changing log levels at runtime without restarting — enables debugging production issues on demand.'),
    q('What are per-component log levels?', 'Setting different log levels for different modules/services. E.g., debug for db module, warn for http module.'),
    q('What happens if you set log level to warn?', 'Only warn, error, and fatal messages are logged. Info, debug, trace are suppressed.'),
    q('Should you log passwords or credit cards?', 'Never log sensitive data regardless of level. Use redaction to mask sensitive fields.'),
    q('What is a structured log level field?', 'The level is a named field in JSON logs (level: "error"). Enables filtering, alerting, and aggregation by severity.'),
    q('What is ansi-colorized log output?', 'Logs with color-coded levels for terminal readability (red=error, yellow=warn, green=info, gray=debug).')
  ],
  R(10,35,110,25,'#ff4444','','FATAL','System down') +
  R(10,65,110,25,'#dc3545','','ERROR','Operation failed') +
  R(10,95,110,25,'#ffc107','','WARN','Handled issue') +
  R(10,125,110,25,'#28a745','','INFO','Normal event') +
  R(10,155,110,25,'#6c757d','','DEBUG','Diagnostics') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) + A(120,168,150,168) +
  R(160,35,230,155,'#17a2b8','','Log Levels','Severity hierarchy: FATAL > ERROR > WARN > INFO > DEBUG > TRACE. Filter noise, control verbosity.') +
  T(240,220,'Log Levels: Categorize logs by severity. Control verbosity per environment. Suppress noise, amplify signal.',9,'#666','middle'),
  [
    e('Setting Log Level in Pino (Node.js)', 'Environment-based level configuration.', codeBlock([
      'const pino = require(\'pino\');',
      '',
      'const logger = pino({',
      '  level: process.env.LOG_LEVEL || \'info\',',
      '  // In production: LOG_LEVEL=info',
      '  // In debugging: LOG_LEVEL=debug',
      '});',
      '',
      '// Usage — only logs if level >= configured level',
      'logger.fatal(\'Cannot connect to database\');   // always',
      'logger.error(\'Payment failed\', { orderId });   // error+',
      'logger.warn(\'Rate limit almost reached\');      // warn+',
      'logger.info(\'Server started on port 3000\');     // info+',
      'logger.debug(\'SQL query:\', query);              // debug+',
      'logger.trace(\'Entering function x\');            // trace+',
      '',
      '// Check if level is enabled',
      'if (logger.isLevelEnabled(\'debug\')) {',
      '  logger.debug({ expensiveData }, \'details\');',
      '}'
    ]), 'Pino log level configuration from environment variable with proper level hierarchy.'),
    e('Dynamic Log Level Endpoint (Express)', 'Change levels at runtime.', codeBlock([
      "// POST /admin/loglevel with { level: 'debug' }",
      "app.post('/admin/loglevel', isAdmin, (req, res) => {",
      '  const { level } = req.body;',
      "  const valid = ['fatal','error','warn','info',",
      "                 'debug','trace'];",
      '',
      "  if (!valid.includes(level)) {",
      '    return res.status(400).json({',
      '      error: `Invalid level. Valid: ${valid.join(\', \')}`',
      '    });',
      '  }',
      '',
      '  logger.level = level;',
      '  logger.warn({ level }, \'Log level changed dynamically\');',
      '  res.json({ message: `Log level changed to ${level}` });',
      '});',
      '',
      '// GET /admin/loglevel — view current level',
      "app.get('/admin/loglevel', isAdmin, (req, res) => {",
      '  res.json({ currentLevel: logger.level });',
      '});'
    ]), 'Dynamic log level endpoint enables production debugging without restarting the process.'),
    e('Per-Component Log Levels with Child Loggers', 'Different levels for different modules.', codeBlock([
      'const baseLogger = require(\'pino\')({',
      '  level: process.env.LOG_LEVEL || \'info\'',
      '});',
      '',
      '// Database module — more verbose',
      'const dbLogger = baseLogger.child({',
      '  module: \'db\'',
      '}, { level: process.env.DB_LOG_LEVEL || \'debug\' });',
      '',
      '// HTTP module — less verbose',
      'const httpLogger = baseLogger.child({',
      '  module: \'http\'',
      '}, { level: \'warn\' });',
      '',
      '// Usage',
      'dbLogger.debug(\'Executing query:\', query); // logged',
      'httpLogger.debug(\'Request headers:\', headers); // suppressed',
      'httpLogger.warn(\'Slow request:\', duration); // logged',
      '',
      '// Set environment:',
      '// LOG_LEVEL=info DB_LOG_LEVEL=debug'
    ]), 'Per-component log levels let you filter noise at the module level while keeping others quiet.'),
    e('Log Level Filtering in Production', 'Don\'t log sensitive debug data.', codeBlock([
      'function logUserEvent(event, user, details) {',
      '  const logData = {',
      '    event,',
      '    userId: user.id,',
      '    role: user.role,',
      '  };',
      '',
      '  // NEVER log passwords, credit cards, tokens',
      '  // Always use info for business events',
      '  logger.info(logData, \'User event: \' + event);',
      '',
      '  // Debug: add details (only in debug mode)',
      '  if (logger.isLevelEnabled(\'debug\')) {',
      '    logger.debug({ ...logData, details },',
      '      \'User event with details\');',
      '  }',
      '}',
      '',
      '// Redact sensitive fields automatically',
      'const logger = pino({',
      '  redact: [\'password\', \'token\', \'ssn\',',
      "           'creditCard', 'authorization'],",
      '});'
    ]), 'Use log level checks and pino redact to prevent sensitive data exposure in production logs.'),
    e('Structured Log Level Field with Winston', 'Level as searchable field.', codeBlock([
      'const winston = require(\'winston\');',
      '',
      'const logger = winston.createLogger({',
      '  levels: {',
      "    fatal: 0, error: 1, warn: 2, info: 3,",
      "    debug: 4, trace: 5",
      '  },',
      '  level: \'info\',',
      '  format: winston.format.combine(',
      '    winston.format.timestamp(),',
      '    winston.format.json()',
      '  ),',
      '  transports: [',
      '    new winston.transports.Console(),',
      '    new winston.transports.File({',
      "      filename: 'logs/errors.log', level: 'error'",
      '    })',
      '  ]',
      '});',
      '',
      '// JSON output includes level as field',
      'logger.warn(\'Disk space low\', { freeSpace: \'5GB\' });',
      '// {"level":"warn","msg":"Disk space low",',
      '//  "freeSpace":"5GB","timestamp":"..."}'
    ]), 'Log level becomes a searchable JSON field, enabling aggregation and filtering in log platforms.')
  ],
  [
    m('What is the most severe log level?', ['error', 'fatal', 'warn', 'info'], 1, 'Fatal is the most severe — the application cannot continue and will exit.'),
    m('What log level should production run at?', ['debug', 'trace', 'info', 'fatal'], 2, 'Production should run at info level — captures errors, warnings, and informational events.'),
    m('If log level is set to warn, which levels are logged?', ['warn only', 'warn, error, fatal', 'info, warn, error', 'all levels'], 1, 'Setting level to warn includes warn, error, and fatal (levels at or above severity).'),
    m('What is the difference between debug and trace?', ['Same thing', 'Debug is diagnostic, trace is step-by-step flow', 'Trace is for testing', 'Debug is for errors'], 1, 'Debug logs detailed diagnostics; trace logs execution flow step-by-step.'),
    m('What is dynamic log level changing?', ['Changing levels in code at compile time', 'Changing levels at runtime without restart', 'Automatic level adjustment', 'Level changes per environment'], 1, 'Dynamic level changing adjusts verbosity at runtime — no restart needed.'),
    m('What should be redacted from logs?', ['User IDs', 'Passwords and tokens', 'Error messages', 'Timestamps'], 1, 'Sensitive data like passwords, tokens, and PII must be redacted from logs.')
  ]
);

/* =================== TOPIC 6: Log Shipping =================== */
addTopic('log-shipping', 'Log Shipping', 'intermediate', 15,
  ['Log shipping is the process of reliably transferring log data from source servers to a centralized log management platform.',
   'Key requirements: reliability (no data loss during network failures), low latency (near real-time delivery), low resource usage (CPU/memory/network), encryption (TLS for in-transit security).',
   'Popular shippers: Filebeat (Elastic), Fluentbit/Fluentd (CNCF), Vector (Datadog), Logstash (heavy), rsyslog (syslog), Promtail (Loki).',
   'Shipping patterns: tail-based (follow log file), event-based (receive from application), sidecar (containerized environments), agentless (syslog/HTTP).'
  ],
  'Log shipping is like a fleet of delivery trucks for a warehouse. Each truck (shipper) is stationed at a factory (server). When logs pile up (truck loads), the driver drives to the central warehouse (log platform). If the highway is blocked (network failure), the truck waits and tries again. The trucks are small and efficient — they don\'t slow down the factory.',
  [
    d('Filebeat (Lightweight Shipper)', 'Elastic\'s Go-based log shipper. Low memory footprint (~20MB). Reads log files, adds metadata (hostname, kubernetes fields), sends to Elasticsearch or Logstash. Features: multiline handling (stack traces), file rotation awareness, backpressure handling, TLS support. Best for: shipping to ELK stack. Under 15MB binary size.'),
    d('Fluentd vs Fluentbit', 'Fluentd: Ruby/C, full-featured, ~60MB, extensive plugin ecosystem (500+), supports buffering. Fluentbit: C, ultra-lightweight (~450KB binary), designed for edge/IoT and containers. Fluentbit is the preferred choice for Kubernetes sidecars and resource-constrained environments. Fluentd for complex routing and transformation pipelines.'),
    d('Shipping Reliability Mechanisms', 'Buffering: store logs on disk temporarily if destination unreachable. Retry with exponential backoff. Acknowledgements: wait for destination to confirm receipt before discarding from buffer. Resilience: shipper should not crash or lose data if destination is down for hours. Guaranteed delivery: at-least-once semantics (may duplicate, never lose).'),
    d('TLS Encryption and Authentication', 'Logs may contain sensitive data — always encrypt in transit. Shipper connects to destination over TLS. Mutual TLS (mTLS): both sides authenticate with certificates. API key authentication: simpler alternative, suitable for SaaS log platforms (Datadog, Logz.io). Network segmentation: shippers in private subnet, log platform in DMZ.'),
    d('Kubernetes Log Shipping', 'DaemonSet: one Fluentbit pod per node, collects all pod logs from /var/log/containers. Sidecar: logging container alongside app container — good for apps that log to files instead of stdout. Multiple outputs: send to both Elasticsearch (operations) and S3 (archive). Metadata enrichment: add pod name, namespace, container name, Kubernetes labels.')
  ],
  'Log shipping is the critical first mile of your logging pipeline. Choose a lightweight shipper (Filebeat, Fluentbit) for production. Always buffer logs locally to prevent data loss during network outages. Enable TLS encryption. In Kubernetes, use a DaemonSet shipper for node-level collection. Test for data loss scenarios: kill the shipper, restart it, verify no logs are lost.',
  [
    q('What is log shipping?', 'Reliably transferring log data from source servers to a centralized log management platform.'),
    q('What is Filebeat?', 'A lightweight, Go-based log shipper from Elastic. Low memory, high performance, integrates with ELK.'),
    q('What is the difference between Fluentd and Fluentbit?', 'Fluentd: full-featured, plugin-rich, larger (~60MB). Fluentbit: ultra-lightweight (~450KB), ideal for edge/Kubernetes.'),
    q('How do shippers handle network failures?', 'Buffering: store logs on disk, retry with exponential backoff when the destination becomes available.'),
    q('What is a DaemonSet in Kubernetes logging?', 'A DaemonSet runs one log shipper pod per node, collecting logs from all pods on that node.'),
    q('Should logs be encrypted during shipping?', 'Yes. Always use TLS for log shipping — logs may contain sensitive data.'),
    q('What is a sidecar log shipper?', 'A logging container alongside the app container in the same pod — intercepts log files or stdout.'),
    q('What is Promtail?', 'The log shipper for Grafana Loki — designed for Kubernetes with service discovery and label metadata.'),
    q('What is the data loss guarantee of most shippers?', 'At-least-once delivery — logs may be duplicated but will not be lost (with buffering configured).'),
    q('What metadata do shippers add?', 'Hostname, service name, Kubernetes pod/namespace/container, Docker container ID, file path.')
  ],
  R(10,35,110,25,'#0070f3','','Source','Application logs') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','Shipper','Filebeat/Fluentbit') +
  A(160,60,160,80) +
  R(10,70,110,25,'#ffc107','','Buffer','Disk buffer') +
  A(120,83,150,83) +
  R(160,70,110,25,'#dc3545','','TLS Encrypt','Secure transport') +
  A(160,95,160,110) +
  R(10,105,110,25,'#e83e8c','','Network','Kafka/HTTP') +
  A(120,118,150,118) +
  R(160,105,110,25,'#6610f2','','Destination','Elasticsearch/Loki') +
  R(290,35,190,155,'#17a2b8','','Log Shipping','Reliable transfer: Buffer -> Encrypt -> Transport -> Deliver. No data loss. Real-time.') +
  T(240,220,'Log Shipping: Reliably transport logs from source to centralized platform with buffering and encryption.',9,'#666','middle'),
  [
    e('Filebeat Configuration (Elastic)', 'Lightweight log shipping to Elasticsearch.', codeBlock([
      '# filebeat.yml',
      'filebeat.inputs:',
      '- type: filestream',
      '  enabled: true',
      '  paths:',
      '    - /var/log/myapp/*.json',
      '    - /var/log/nginx/access.log',
      '  multiline:',
      '    type: pattern',
      '    pattern: \'^\\[\'',
      '    negate: true',
      '    match: after',
      '',
      'filebeat.config.modules:',
      '  path: ${path.config}/modules.d/*.yml',
      '  reload.enabled: true',
      '',
      'output.elasticsearch:',
      '  hosts: ["https://elasticsearch:9200"]',
      '  username: "filebeat_writer"',
      '  password: "${ES_PASSWORD}"',
      '  ssl.verification_mode: certificate',
      '',
      'logging.level: warn'
    ]), 'Filebeat configuration for shipping JSON and Nginx access logs to Elasticsearch with TLS.'),
    e('Fluentbit Configuration (Kubernetes DaemonSet)', 'Kubernetes-native log shipping.', codeBlock([
      '# fluentbit-config.yaml',
      'apiVersion: v1',
      'kind: ConfigMap',
      'metadata:',
      '  name: fluentbit-config',
      'data:',
      '  fluent-bit.conf: |',
      '    [SERVICE]',
      '        Flush 1',
      '        Log_Level info',
      '        Parsers_File parsers.conf',
      '',
      '    [INPUT]',
      '        Name tail',
      '        Path /var/log/containers/*.log',
      '        multiline.parser docker, cri',
      '        Tag kube.*',
      '        Mem_Buf_Limit 50MB',
      '        Skip_Long_Lines On',
      '',
      '    [FILTER]',
      '        Name kubernetes',
      '        Match kube.*',
      '        Merge_Log On',
      '        K8S-Logging.Parser On',
      '',
      '    [OUTPUT]',
      '        Name es',
      '        Match kube.*',
      '        Host elasticsearch',
      '        Port 9200',
      '        Logstash_Format On',
      '        Retry_Limit 6',
      '        tls On',
      '        tls.verify Off'
    ]), 'Fluentbit DaemonSet configuration for Kubernetes — collects all pod logs with metadata enrichment.'),
    e('Vector (Datadog) Log Shipping', 'Modern, high-performance shipper.', codeBlock([
      '# vector.toml',
      '[sources.myapp_logs]',
      'type = "file"',
      'include = ["/var/log/myapp/*.json"]',
      'read_from = "beginning"',
      '',
      '[transforms.parse_json]',
      'type = "json_parser"',
      'inputs = ["myapp_logs"]',
      'field = "message"',
      'drop_invalid = true',
      '',
      '[transforms.add_fields]',
      'type = "remap"',
      'inputs = ["parse_json"]',
      'source = \'\'\'',
      '  .environment = "production"',
      '  .service = "myapp"',
      '  .hostname = get_hostname!()',
      '\'\'\'',
      '',
      '[sinks.elasticsearch]',
      'type = "elasticsearch"',
      'inputs = ["add_fields"]',
      'endpoints = ["https://elasticsearch:9200"]',
      'auth.strategy = "basic"',
      'auth.user = "vector"',
      'auth.password = "${ES_PASS}"',
      'bulk.index = "myapp-%Y-%m-%d"',
      'buffer.max_events = 5000',
      'buffer.when_full = "block"'
    ]), 'Vector provides a unified pipeline for log collection, transformation, and shipping with buffering.'),
    e('Log Shipping with Buffer (Node.js + Bull Queue)', 'Application-level reliable shipping.', codeBlock([
      'const Queue = require(\'bull\');',
      'const logQueue = new Queue(\'log-shipping\', {',
      '  redis: { host: \'redis\' },',
      '  defaultJobOptions: {',
      '    attempts: 10,',
      '    backoff: { type: \'exponential\', delay: 2000 }',
      '  }',
      '});',
      '',
      '// Producer: add log to queue',
      'async function shipLog(entry) {',
      '  await logQueue.add(entry);',
      '}',
      '',
      '// Consumer: send to log platform',
      'logQueue.process(async (job) => {',
      '  const response = await fetch(',
      "    'https://logs.example.com/_bulk', {",
      '    method: \'POST\',',
      '    body: JSON.stringify(job.data),',
      '    headers: {',
      "      'Content-Type': 'application/json',",
      "      'Authorization': `Bearer ${LOG_TOKEN}`",
      '    }',
      '  });',
      '',
      '  if (!response.ok) {',
      '    throw new Error(\'Ship failed\'); // retry',
      '  }',
      '});'
    ]), 'Bull queue provides application-level log buffering with retries, backoff, and persistence.'),
    e('Promtail for Grafana Loki', 'Kubernetes log shipping to Loki.', codeBlock([
      '# promtail.yaml',
      'server:',
      '  http_listen_port: 3101',
      '',
      'positions:',
      '  filename: /var/log/positions.yaml',
      '',
      'clients:',
      '  - url: http://loki:3100/loki/api/v1/push',
      '',
      'scrape_configs:',
      '- job_name: kubernetes-pods',
      '  kubernetes_sd_configs:',
      '  - role: pod',
      '  pipeline_stages:',
      '  - docker: {}',
      '  - cri: {}',
      '  - regex:',
      '      expression: \'^(?P<namespace>\\S+)',
      '        (?P<pod_name>\\S+)',
      '        (?P<container_name>\\S+)',
      '        .*\'',
      '  - labels:',
      '      namespace:',
      '      pod_name:',
      '      container_name:'
    ]), 'Promtail auto-discovers Kubernetes pods and ships logs with label metadata to Grafana Loki.')
  ],
  [
    m('What is a log shipper?', ['A log database', 'An agent that reliably transfers logs to a central platform', 'A log visualizer', 'A log parser'], 1, 'A log shipper is an agent that collects and reliably transfers logs from source to destination.'),
    m('Which shipper is ultra-lightweight (~450KB)?', ['Filebeat', 'Fluentbit', 'Logstash', 'Vector'], 1, 'Fluentbit is written in C and designed for resource-constrained environments.'),
    m('How do shippers handle network failures?', ['Stop logging', 'Buffer logs and retry', 'Delete old logs', 'Switch to file storage'], 1, 'Shippers buffer logs to disk and retry with exponential backoff when the destination is down.'),
    m('What is a DaemonSet in Kubernetes logging?', ['A pod per deployment', 'A pod per node collecting all node logs', 'A sidecar per pod', 'A standalone service'], 1, 'DaemonSet runs one shipper per node to collect logs from all pods on that node.'),
    m('What protocol should log shipping use?', ['HTTP', 'TLS/HTTPS', 'FTP', 'SMTP'], 1, 'Log shipping should use TLS encryption to protect sensitive data in transit.'),
    m('What delivery guarantee do shippers provide?', ['Exactly-once', 'At-least-once', 'At-most-once', 'Best-effort'], 1, 'Most shippers provide at-least-once delivery — logs may duplicate but will not be lost.')
  ]
);

// ---- PAD TOPICS ----
var padTopics = require('../pad-topics');
padTopics(topics, topicList, addTopic);

// ---- GENERATE ----
var dataDir = __dirname;

var lines = [];
lines.push('var TOPICS_DATA = TOPICS_DATA || {};');
lines.push('TOPICS_DATA["logging"] = TOPICS_DATA["logging"] || {};');
for (var id in topics) {
  lines.push('TOPICS_DATA["logging"]["' + id + '"] = ' + JSON.stringify(topics[id]) + ';');
}
fs.writeFileSync(dataDir + '/topics-data.js', lines.join('\n'));

fs.writeFileSync(dataDir + '/topics.json', JSON.stringify({ topics: topicList }, null, 2));

console.log('Generated Logging topics: ' + Object.keys(topics).length);
