const fs = require('fs');
const { svgW, R, A, T, Tw } = require('../svg-helpers');

function codeBlock(lines) { return lines.join('\n'); }
function q(question, answer) { return { question: question.replace(/'/g,"\\'"), answer: answer.replace(/'/g,"\\'") }; }
function m(question, options, answer, explanation) { return { question: question.replace(/'/g,"\\'"), options: options, answer: answer, explanation: explanation.replace(/'/g,"\\'") }; }
function e(title, useCase, code, description) { return { title: title.replace(/'/g,"\\'"), useCase: useCase.replace(/'/g,"\\'"), code: code, description: description.replace(/'/g,"\\'") }; }
function d(heading, text) { return { heading: heading.replace(/'/g,"\\'"), text: text.replace(/'/g,"\\'") }; }

var topics = {};
var topicList = [];

function addTopic(id, title, difficulty, estimatedMinutes, tldrItems, laymanDef, deepDiveArr, interviewAns, questionsArr, svgInner, codeExamplesArr, mcqArr) {
  var t = {
    id: id, title: title, difficulty: difficulty, estimatedMinutes: estimatedMinutes,
    tldr: tldrItems, laymanDefinition: laymanDef, deepDive: deepDiveArr,
    interviewAnswer: interviewAns, interviewQuestions: questionsArr,
    diagramSvg: svgW(500, 300, title, svgInner), codeExamples: codeExamplesArr, mcqQuestions: mcqArr
  };
  topics[id] = t;
  topicList.push({ id: id, title: title, difficulty: difficulty, estimatedMinutes: estimatedMinutes, file: id + '.json' });
}

/* =================== TOPIC 1: Monitoring Fundamentals =================== */
addTopic('mon-fundamentals', 'Monitoring Fundamentals', 'beginner', 15,
  ['Monitoring is the practice of collecting, analyzing, and acting on system data to ensure reliability, performance, and availability.',
   'Four golden signals: Latency (time to respond), Traffic (demand on system), Errors (failure rate), Saturation (how full the system is).',
   'USE method: Utilization (percentage busy), Saturation (queue length), Errors (failure count) — for every resource.',
   'RED method: Rate (requests per second), Errors (failed requests), Duration (response time distribution) — for services.',
   'Monitoring types: white-box (internal metrics from app code) and black-box (external behavior from user perspective).'
  ],
  'Monitoring is like the dashboard and warning lights in your car. The speedometer (latency) shows how fast you go, the fuel gauge (saturation) shows how much capacity remains, and the check engine light (alerting) tells you something is wrong before the car breaks down.',
  [
    d('The Four Golden Signals', 'Latency: time to service a request (distinguish success vs error latency). Traffic: how much demand is placed on the system (requests/sec, active users). Errors: rate of failed requests (explicit 5xx, implicit wrong content). Saturation: how "full" the service is (CPU, memory, queue depth). Most overload signals precede errors.'),
    d('USE Method (Resources)', 'For every resource (CPU, disk, network, memory): check Utilization (average time resource was busy), Saturation (degree to which resource has extra work queued), Errors (count of error events). CPU utilization >80% with high load average indicates saturation. Disk I/O wait time >20ms suggests disk saturation.'),
    d('RED Method (Services)', 'For every microservice: Rate (requests per second — throughput), Errors (failed requests as count or percentage), Duration (latency distributions — p50, p95, p99). Track these for every service endpoint. Dashboard shows service health at a glance. Combines with USE for full-stack observability.'),
    d('White-box vs Black-box Monitoring', 'White-box: metrics from inside the system — application metrics (request count, error rate, garbage collection), database query performance, cache hit rates. Black-box: external probes — synthetic transactions, external availability checks, certificate expiry monitoring. Use both: white-box for debugging, black-box for user experience.')
  ],
  'Monitoring fundamentals are the foundation of observability. Learn the four golden signals, USE method for resources, and RED method for services. Combine white-box and black-box approaches. Monitor everything, but alert on the important signals with proper thresholds. Start simple: CPU, memory, disk, request rate, error rate, and latency.',
  [
    q('What are the four golden signals of monitoring?', 'Latency, Traffic, Errors, Saturation — the four key metrics defined by Google SRE.'),
    q('What is the USE method?', 'For every resource: check Utilization (percent busy), Saturation (queue depth), Errors (failure count).'),
    q('What is the RED method?', 'For every service: Rate (requests/sec), Errors (failures), Duration (latency distributions).'),
    q('What is the difference between white-box and black-box monitoring?', 'White-box: internal metrics from app code (request count, GC). Black-box: external behavior (synthetic checks, availability probes).'),
    q('What is latency in monitoring?', 'The time it takes to service a request. Track success latency separately from error latency.'),
    q('What is saturation?', 'How "full" a resource is. CPU load average, memory usage, queue depth. Saturation often precedes errors.'),
    q('What is the difference between monitoring and observability?', 'Monitoring is collecting and alerting on known signals. Observability allows understanding unknown unknowns through exploratory data analysis.'),
    q('What is a Service Level Indicator (SLI)?', 'A quantified measure of a service attribute — request latency, error rate, throughput. The raw metric you measure.'),
    q('What is a Service Level Objective (SLO)?', 'The target value for an SLI over a time window — e.g., 99.9% of requests complete in <200ms over 30 days.'),
    q('What is a Service Level Agreement (SLA)?', 'A contractual commitment to meet SLOs, typically with consequences (credits, penalties) for violations.')
  ],
  R(10,35,110,25,'#0070f3','','Golden Signals','4 key metrics') +
  R(10,65,110,25,'#28a745','','USE Method','Resources') +
  R(10,95,110,25,'#ffc107','','RED Method','Services') +
  R(10,125,110,25,'#dc3545','','White-box','Internal metrics') +
  R(10,155,110,25,'#e83e8c','','Black-box','External probes') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) + A(120,168,150,168) +
  R(160,35,230,155,'#17a2b8','','Monitoring Fundamentals','Four golden signals, USE/RED methods, white/black-box, SLOs and SLAs.') +
  T(240,220,'Monitoring: Collect, analyze, and act on system data. Four golden signals: latency, traffic, errors, saturation.',9,'#666','middle'),
  [
    e('Exposing Prometheus Metrics (Node.js)', 'Instrumenting an HTTP server.', codeBlock([
      "const promClient = require('prom-client');",
      "const express = require('express');",
      "const httpRequestsTotal = new promClient.Counter({",
      "  name: 'http_requests_total',",
      "  help: 'Total number of HTTP requests',",
      "  labelNames: ['method', 'route', 'status']",
      '});',
      "const httpRequestDuration = new promClient.Histogram({",
      "  name: 'http_request_duration_seconds',",
      "  help: 'HTTP request latency in seconds',",
      "  labelNames: ['method', 'route'],",
      "  buckets: [0.01, 0.05, 0.1, 0.5, 1, 5]",
      '});',
      "app.use((req, res, next) => {",
      '  const end = httpRequestDuration.startTimer();',
      "  res.on('finish', () => {",
      '    httpRequestsTotal.inc({ method: req.method, route: req.route?.path || "unknown", status: res.statusCode });',
      '    end({ method: req.method, route: req.route?.path });',
      '  });',
      '  next();',
      '});',
      "app.get('/metrics', async (req, res) => {",
      "  res.set('Content-Type', promClient.register.contentType);",
      '  res.end(await promClient.register.metrics());',
      '});'
    ]), 'Core monitoring instrumentation: counter for request count, histogram for latency distribution.'),
    e('Synthetic Health Check (Black-box)', 'External availability monitoring.', codeBlock([
      "const https = require('https');",
      'async function healthCheck(url) {',
      '  const start = Date.now();',
      '  return new Promise((resolve) => {',
      '    const req = https.get(url, { timeout: 5000 }, (res) => {',
      '      const duration = Date.now() - start;',
      "      let data = '';",
      "      res.on('data', chunk => data += chunk);",
      "      res.on('end', () => {",
      '        resolve({ status: res.statusCode, duration, bodyLength: data.length, timestamp: new Date().toISOString() });',
      '      });',
      '    });',
      "    req.on('error', (err) => { resolve({ status: 0, duration: -1, error: err.message }); });",
      '    req.end();',
      '  });',
      '}',
      "setInterval(async () => {",
      "  const result = await healthCheck('https://myapp.com/health');",
      '  if (result.status !== 200) console.error("Health check failed:", result);',
      '}, 60000);'
    ]), 'Black-box monitoring from an external perspective — synthetic health checks.'),
    e('Prometheus Alert Rule (CPU)', 'Alerting on saturation.', codeBlock([
      "groups:",
      "  - name: node_alerts",
      "    rules:",
      "      - alert: HighCpuUsage",
      "        expr: 100 - (avg by(instance) (rate(node_cpu_seconds_total{mode='idle'}[5m])) * 100) > 80",
      "        for: 5m",
      "        labels:",
      "          severity: warning",
      "        annotations:",
      "          summary: 'CPU usage is above 80%'",
      "      - alert: CriticalCpuUsage",
      "        expr: 100 - (avg by(instance) (rate(node_cpu_seconds_total{mode='idle'}[5m])) * 100) > 95",
      "        for: 2m",
      "        labels:",
      "          severity: critical",
      "        annotations:",
      "          summary: 'CPU usage critically high'"
    ]), 'Alerting rules fire when CPU saturation exceeds thresholds for a duration.'),
    e('Service Level Indicator (SLI) Calculation', 'Monthly SLO tracking.', codeBlock([
      'async function calculateSLI() {',
      '  const result = await db.query(`',
      '    SELECT COUNT(*) as total_requests,',
      '      COUNT(*) FILTER (WHERE duration_ms < 500) as good_requests',
      '    FROM request_log',
      "    WHERE timestamp > NOW() - INTERVAL '30 days'",
      '  `);',
      '  const { total_requests, good_requests } = result.rows[0];',
      '  const sli = (good_requests / total_requests) * 100;',
      '  return { sli: Math.round(sli * 100) / 100, total: parseInt(total_requests), good: parseInt(good_requests), budget: 100 - sli, meets_slo: sli >= 99.9 };',
      '}'
    ]), 'Calculate SLI from raw request data and compare against SLO target.'),
    e('RED Method Dashboard Query', 'PromQL for RED dashboard.', codeBlock([
      '# Rate: sum(rate(http_requests_total[5m])) by (service)',
      '# Errors: sum(rate(http_requests_total{status=~"5.."}[5m])) by (service)',
      '# Duration: histogram_quantile(0.99, sum(rate(http_request_duration_seconds_bucket[5m])) by (le, service))',
      '# Error ratio: sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) * 100'
    ]), 'RED method queries for Prometheus — rate, errors, and duration for every service.')
  ],
  [
    m('What are the four golden signals?', ['CPU, Memory, Disk, Network', 'Latency, Traffic, Errors, Saturation', 'Rate, Errors, Duration, Utilization', 'Availability, Reliability, Performance, Security'], 1, 'The four golden signals from Google SRE: Latency, Traffic, Errors, Saturation.'),
    m('What does the USE method analyze?', ['Services', 'Resources', 'Applications', 'Networks'], 1, 'USE (Utilization, Saturation, Errors) analyzes resources like CPU, memory, and disk.'),
    m('What does the RED method analyze?', ['CPU, Memory, Disk', 'Rate, Errors, Duration', 'Latency, Traffic, Throughput', 'Availability, Reliability, Capacity'], 1, 'RED (Rate, Errors, Duration) analyzes service-level metrics.'),
    m('What is the difference between white-box and black-box monitoring?', ['Internal vs external metrics', 'Free vs paid tools', 'Cloud vs on-premise', 'Real-time vs batch'], 0, 'White-box uses internal app metrics; black-box uses external behavior probes.'),
    m('What is an SLO?', ['Service Level Objective — target for reliability', 'Service Level Agreement — legal contract', 'Service Level Indicator — measured metric', 'Service License Order — procurement'], 0, 'SLO is the target value for an SLI over a defined time window.'),
    m('What does saturation indicate?', ['How full a resource is', 'How fast a request completes', 'How many errors occurred', 'How much traffic is served'], 0, 'Saturation measures how "full" a resource is — often a leading indicator of problems.')
  ]
);

/* =================== TOPIC 2: Metrics =================== */
addTopic('mon-metrics', 'Metrics', 'beginner', 15,
  ['Metrics are numeric measurements collected over time about system behavior and performance — the foundation of observability.',
   'Types: counters (cumulative, only increase/reset), gauges (point-in-time values), histograms (observations bucketed by value), summaries (quantiles).',
   'Metrics are typically collected via pull (Prometheus scrapes endpoints) or push (StatsD, Graphite sends to aggregator) models.',
   'Key metric dimensions: name, labels/tags, timestamp, value. Label-based filtering enables flexible aggregation without exploding metric names.'
  ],
  'Metrics are like your car\'s instrument panel. The odometer (counter) shows cumulative miles, the fuel gauge (gauge) shows current fuel level, and the speedometer shows speed over time (histogram-like). They all give you numbers to make driving decisions.',
  [
    d('Counter Metrics', 'Monotonically increasing cumulative count. Resets only on restart. Use for: total requests, total errors, total bytes sent. Rate (requests/sec) is derived from counter using rate()/irate(). Never decrease — if you need up/down, use a gauge. Example: http_requests_total{method="GET", status="200"}.'),
    d('Gauge Metrics', 'Point-in-time value that can go up or down. Use for: CPU usage, memory usage, queue depth, temperature, concurrent connections, active users. Gauge is the current value — averaging over time may lose spikes. Use min/max over time to see extremes.'),
    d('Histogram and Summary Metrics', 'Histogram: samples are counted in configurable buckets. Enables calculating quantiles (p50, p95, p99) via histogram_quantile(). Summary: pre-calculated quantiles on the client side. Trade-off: histograms are server-side calculated (flexible) but require more storage. Summaries are client-side (fixed quantiles).'),
    d('Label-Based Dimensionality', 'Labels (tags) add dimensions to metrics. http_requests_total{method="POST", route="/api/order", status="201"}. Cardinality: unique combinations of label values. High cardinality (user_id, request_id) can overwhelm TSDB. Keep label cardinality bounded (<10000 unique values per metric).')
  ],
  'Metrics provide the numeric backbone of observability. Use counters for cumulative totals, gauges for point-in-time values, histograms for distributions. Design labels carefully to avoid high cardinality explosions. Prefer Prometheus pull model for better control. Apply the RED method for services and USE method for resources.',
  [
    q('What are the four metric types in Prometheus?', 'Counter (cumulative), Gauge (point value), Histogram (bucketed observations), Summary (pre-computed quantiles).'),
    q('What is the difference between a counter and a gauge?', 'Counter only increases (total requests). Gauge goes up and down (CPU usage). Use rate() on counters.'),
    q('What is metric cardinality?', 'The number of unique label value combinations. High cardinality (user_id, email) can crash the time series database.'),
    q('What is the difference between histogram and summary?', 'Histogram: server-side quantile calculation, configurable buckets. Summary: client-side pre-computed quantiles, fixed.'),
    q('What is the pull vs push model for metrics?', 'Pull: Prometheus scrapes targets at intervals. Push: StatsD agents push to a central aggregator. Pull is better for service discovery.'),
    q('What is rate() in PromQL?', 'Calculates per-second average rate of increase for a counter over a time range. rate(metric[5m]).'),
    q('What is irate() in PromQL?', 'Calculates instantaneous rate based on the last two data points — more sensitive to spikes than rate().'),
    q('What is a metric naming convention?', 'snake_case, namespaced: http_requests_total, node_cpu_seconds_total. Unit suffix: _total (counter), _seconds, _bytes.'),
    q('What is an exemplar in metrics?', 'A reference linking a metric event to a trace — enables "metrics to traces" workflow for debugging.'),
    q('What is histogram_quantile()?', 'PromQL function that calculates quantiles (p50, p95, p99) from histogram bucket counters.')
  ],
  R(10,35,110,25,'#0070f3','','Counter','Cumulative total') +
  R(10,65,110,25,'#28a745','','Gauge','Point-in-time') +
  R(10,95,110,25,'#ffc107','','Histogram','Distribution') +
  R(10,125,110,25,'#dc3545','','Summary','Quantiles') +
  R(10,155,110,25,'#e83e8c','','Labels','Dimensions') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) + A(120,168,150,168) +
  R(160,35,230,155,'#17a2b8','','Metrics','Numeric measurements: counters, gauges, histograms, summaries. Label-based dimensions.') +
  T(240,220,'Metrics: Numeric time-series data — counters, gauges, histograms, summaries with label dimensions.',9,'#666','middle'),
  [
    e('Prometheus Counter and Gauge', 'Instrumentation in Go (example pattern).', codeBlock([
      '# HELP http_requests_total Total HTTP requests',
      '# TYPE http_requests_total counter',
      'http_requests_total{method="GET",route="/api",status="200"} 1024',
      'http_requests_total{method="POST",route="/api",status="201"} 512',
      '',
      '# HELP node_memory_usage_bytes Memory usage',
      '# TYPE node_memory_usage_bytes gauge',
      'node_memory_usage_bytes{type="used"} 8589934592',
      'node_memory_usage_bytes{type="free"} 4294967296',
      '',
      '# HELP request_duration_seconds Request latency distribution',
      '# TYPE request_duration_seconds histogram',
      'request_duration_seconds_bucket{le="0.01"} 100',
      'request_duration_seconds_bucket{le="0.05"} 500',
      'request_duration_seconds_bucket{le="0.1"} 900',
      'request_duration_seconds_bucket{le="1"} 990',
      'request_duration_seconds_bucket{le="+Inf"} 1000',
      'request_duration_seconds_count 1000',
      'request_duration_seconds_sum 45.2'
    ]), 'Prometheus exposition format showing counter, gauge, and histogram metric types.'),
    e('StatsD Metrics (Node.js)', 'Push-based metrics with StatsD.', codeBlock([
      "const StatsD = require('hot-shots');",
      'const client = new StatsD({ host: "statsd-exporter", port: 8125, prefix: "myapp." });',
      "client.increment('http.requests.get', 1);",
      "client.gauge('memory.used', process.memoryUsage().heapUsed);",
      "client.timing('http.request.duration', Date.now() - start);",
      "client.set('active.users', userId);",
      "client.histogram('response.size', response.length);"
    ]), 'StatsD push-based metrics using hot-shots client.'),
    e('PromQL Queries for Analysis', 'Querying metrics.', codeBlock([
      '# Error ratio: sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) * 100',
      '# p99 latency: histogram_quantile(0.99, sum(rate(request_duration_seconds_bucket[5m])) by (le, service))',
      "# CPU: 100 - (avg by(instance) (rate(node_cpu_seconds_total{mode='idle'}[5m])) * 100)",
      '# Memory: (node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / node_memory_MemTotal_bytes * 100',
      '# Growth: sum(rate(http_requests_total[1h])) / sum(rate(http_requests_total[1h] offset 1w))'
    ]), 'Common PromQL patterns for metrics analysis.'),
    e('Structured Logging to Metrics', 'Convert logs to metrics with mtail.', codeBlock([
      'counter http_requests_total by "method", "path", "status"',
      '/^(?P<method>\\w+) (?P<path>\\S+) (?P<status>\\d+)/ {',
      '  http_requests_total[$method][$path][$status]++',
      '}',
      'gauge request_duration_milliseconds by "path"',
      '/^(?P<path>\\S+) duration=(?P<duration>\\d+)ms/ {',
      '  request_duration_milliseconds[$path] = $duration',
      '}'
    ]), 'Convert log patterns into metrics using mtail.')
  ],
  [
    m('What metric type only increases?', ['Gauge', 'Counter', 'Histogram', 'Summary'], 1, 'Counters are monotonically increasing cumulative totals that reset only on restart.'),
    m('What metric type can go up and down?', ['Counter', 'Histogram', 'Gauge', 'Summary'], 2, 'Gauges represent point-in-time values that can increase or decrease.'),
    m('What is metric cardinality?', ['Number of metric names', 'Unique label value combinations', 'Total data points', 'Storage size'], 1, 'Cardinality = unique combinations of label values. High cardinality causes TSDB problems.'),
    m('What function derives rate from a counter?', ['increase()', 'rate()', 'avg()', 'sum()'], 1, 'rate() calculates per-second average increase from a counter over a time range.'),
    m('What is the Prometheus metric type for latency distributions?', ['Counter', 'Gauge', 'Histogram', 'Summary'], 2, 'Histograms bucket observations to enable quantile calculation like p99 latency.'),
    m('What is an exemplar?', ['Sample metric value', 'Link from metric to trace', 'Alert threshold', 'Dashboard panel'], 1, 'Exemplars link metric events to specific traces for debugging workflows.')
  ]
);

/* =================== TOPIC 3: Logging =================== */
addTopic('mon-logging', 'Logging', 'beginner', 10,
  ['Logging records discrete events from applications and infrastructure — timestamped, structured messages for debugging and analysis.',
   'Modern logging is structured (JSON format) not unstructured (plain text). Structured logs are parseable, searchable, and queryable.',
   'Log levels: DEBUG (detailed debug info), INFO (normal operations), WARN (potential issues), ERROR (failures), FATAL (critical failures).',
   'Centralized logging aggregates logs from all sources into a single platform (Elasticsearch, Loki, Splunk) for search, correlation, and alerting.'
  ],
  'Logging is like a plane\'s black box flight recorder. Every event, button press, alarm, and system change is recorded with timestamps. When something goes wrong, investigators replay the log to understand exactly what happened second by second before and during the incident.',
  [
    d('Structured Logging (JSON)', '{"timestamp": "2024-01-15T10:30:00Z", "level": "ERROR", "service": "payment", "message": "Payment failed", "error": "insufficient_funds", "user_id": 42, "request_id": "abc123", "duration_ms": 150}. Machine-parseable, supports indexing, queryable by any field.'),
    d('Log Levels and When to Use Them', 'FATAL: service cannot continue, crash imminent. ERROR: operation failed, needs immediate attention. WARN: potential issue, unexpected but handled. INFO: normal events — request started, user created. DEBUG: detailed diagnostic info for development. Never use DEBUG in production.'),
    d('Centralized Logging Architecture', 'Agents (Filebeat, Fluentd) ship logs from each node. Buffer/message queue (Kafka, Redis) for reliability. Indexer/search (Elasticsearch, Loki) stores and indexes. Visualization (Kibana, Grafana) queries and displays. Alerting (ElastAlert, Grafana alerts) on log patterns.'),
    d('Log Correlation and Context', 'Correlation ID (trace ID, request ID) links logs across microservices. Pass via headers in distributed systems. Add context: user_id, order_id, tenant_id, service_name, version, environment. Every log line should be self-describing.')
  ],
  'Logging is essential for debugging and post-mortem analysis. Always use structured JSON logging. Add correlation IDs to trace requests across services. Use appropriate log levels. Centralize logs for search and correlation. Never log sensitive data (passwords, PII, credit cards).',
  [
    q('What is structured logging?', 'Logging in a machine-parseable format (JSON) where each field is queryable.'),
    q('What are the common log levels?', 'DEBUG, INFO, WARN, ERROR, FATAL. Use appropriately — DEBUG in dev, INFO/WARN/ERROR in production.'),
    q('What is a correlation ID?', 'A unique ID (trace/request ID) passed across microservices to link all logs for a single request.'),
    q('What is centralized logging?', 'Aggregating logs from all sources into a single platform for search, correlation, alerting, and analysis.'),
    q('What tools are used for centralized logging?', 'Elasticsearch (storage/search), Logstash/Fluentd (shipping), Kibana/Grafana (visualization), Loki (log aggregation).'),
    q('What should you never include in logs?', 'Passwords, credit card numbers, PII, secrets, API keys, tokens. Mask or omit sensitive data.'),
    q('What is log rotation?', 'Archiving and deleting old log files to manage disk space. Common: rotate daily or at N MB, keep 30 days.'),
    q('What is the difference between structured and unstructured logging?', 'Structured: JSON fields, queryable by tool. Unstructured: plain text, grep-friendly but hard to query at scale.'),
    q('What is a log shipper?', 'A lightweight agent (Filebeat, Fluent Bit, Vector) that reads log files and sends them to a central system.'),
    q('What is log retention?', 'How long logs are kept. Short-term (7-30 days) for debug logs. Long-term (1 year+) for audit/compliance logs.')
  ],
  R(10,35,110,25,'#0070f3','','App Logs','JSON structured') +
  R(10,65,110,25,'#28a745','','Log Shipper','Fluentd/Filebeat') +
  R(10,95,110,25,'#ffc107','','Buffer','Kafka/Redis') +
  R(10,125,110,25,'#dc3545','','Storage','Elasticsearch/Loki') +
  R(10,155,110,25,'#e83e8c','','Visualization','Kibana/Grafana') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) + A(120,168,150,168) +
  R(160,35,230,155,'#17a2b8','','Centralized Logging','App -> Shipper -> Buffer -> Storage -> Visualize. Structured JSON with correlation IDs.') +
  T(240,220,'Logging: Structured JSON events with correlation IDs. Centralize for search, alerting, and debugging.',9,'#666','middle'),
  [
    e('Structured JSON Logging (Pino)', 'Structured logging in Node.js.', codeBlock([
      "const pino = require('pino');",
      "const logger = pino({ level: process.env.LOG_LEVEL || 'info', redact: { paths: ['password', 'creditCard', 'ssn'], censor: '[REDACTED]' } });",
      "logger.info({ userId: 42, action: 'login' }, 'User logged in');",
      'logger.error({ err, orderId: 123 }, "Payment failed");'
    ]), 'Pino provides high-performance structured JSON logging with redaction support.'),
    e('Correlation ID Middleware', 'Trace requests across services.', codeBlock([
      "const { v4: uuidv4 } = require('uuid');",
      "app.use((req, res, next) => {",
      "  const correlationId = req.headers['x-correlation-id'] || uuidv4();",
      '  req.correlationId = correlationId;',
      "  res.setHeader('x-correlation-id', correlationId);",
      '  next();',
      '});'
    ]), 'Correlation ID middleware propagates a unique ID across requests for log correlation.'),
    e('Log Shipper Configuration (Fluentd)', 'Centralized log shipping.', codeBlock([
      '<source>',
      '  @type tail',
      '  path /var/log/myapp/*.log',
      '  tag myapp.log',
      '  <parse>',
      '    @type json',
      '  </parse>',
      '</source>',
      '<match myapp.log>',
      '  @type elasticsearch',
      '  host elasticsearch.example.com',
      '  port 9200',
      '  logstash_format true',
      '  logstash_prefix myapp-logs',
      '</match>'
    ]), 'Fluentd configuration to tail JSON logs and ship to Elasticsearch.'),
    e('Log-Based Alerting (ElastAlert)', 'Alert on log patterns.', codeBlock([
      "name: High Error Rate",
      "type: frequency",
      "index: myapp-logs-*",
      "num_events: 5",
      "timeframe:",
      "  minutes: 5",
      "filter:",
      "  - query:",
      "      query_string:",
      "        query: 'level:ERROR AND service:payment'",
      "alert:",
      '  - "slack"'
    ]), 'ElastAlert fires alerts when matching log patterns exceed thresholds.'),
    e('Winston Logger Setup (Node.js)', 'Multi-transport logging.', codeBlock([
      "const winston = require('winston');",
      "const logger = winston.createLogger({",
      "  level: 'info',",
      "  format: winston.format.json(),",
      "  defaultMeta: { service: 'payment-service' },",
      "  transports: [",
      "    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),",
      "    new winston.transports.File({ filename: 'logs/combined.log' })",
      "  ]",
      '});'
    ]), 'Winston provides multi-transport logging with JSON format.')
  ],
  [
    m('What format should modern logs use?', ['Plain text', 'JSON', 'XML', 'CSV'], 1, 'JSON structured logging is machine-parseable and queryable by log platforms.'),
    m('What log level indicates a failure?', ['INFO', 'WARN', 'ERROR', 'DEBUG'], 2, 'ERROR level indicates an operation failed and requires attention.'),
    m('What is a correlation ID?', ['User ID', 'Unique ID linking logs across services', 'Server IP', 'Error code'], 1, 'Correlation ID traces a single request across multiple microservices.'),
    m('What is log rotation?', ['Changing log format', 'Archiving old logs to save space', 'Encrypting log files', 'Sending logs to cloud'], 1, 'Log rotation archives/deletes old logs to prevent disk from filling up.'),
    m('Which tool ships logs to a central system?', ['Prometheus', 'Fluentd', 'Grafana', 'Jaeger'], 1, 'Fluentd (and Filebeat, Fluent Bit) are log shippers that forward logs to centralized storage.'),
    m('What should never appear in logs?', ['Error messages', 'Passwords and secrets', 'Timestamps', 'Service names'], 1, 'Sensitive data like passwords, credit card numbers, and PII must never be logged.')
  ]
);

/* =================== TOPIC 4: Tracing =================== */
addTopic('mon-tracing', 'Tracing', 'intermediate', 20,
  ['Tracing tracks the path of a single request across distributed services, showing timing and dependencies for each step.',
   'A trace is a tree of spans. Each span represents a unit of work with a start time, end time, and metadata (service name, operation, tags).',
   'OpenTracing and OpenTelemetry provide vendor-neutral APIs for generating and collecting traces across different languages and frameworks.',
   'Tracing answers: Where is time spent? Which service is failing? What is the dependency graph? What is the critical path?'
  ],
  'Tracing is like a package tracking system (UPS/FedEx) for your requests. When you order a package (make a request), you get a tracking number (trace ID). It shows every facility it passes through (services), how long it sat at each one (span duration), and which step failed (error span).',
  [
    d('Trace and Span Model', 'Trace: the complete path of a request through the system. Uniquely identified by trace_id. Span: a single unit of work within a trace. Has span_id, parent_span_id (for hierarchy), operation name, start/end timestamps, status, tags, and logs. Root span: the first span in a trace (no parent).'),
    d('Context Propagation', 'Trace context (trace_id, span_id) must be passed between services. In HTTP: via headers (traceparent, tracestate per W3C Trace Context). In messaging: via message metadata. Propagation happens automatically in instrumented frameworks. Must propagate across async boundaries (queues, events).'),
    d('Sampling Strategies', 'Head-based: decision made at the root span (e.g., sample 5% of requests). Consistent — either whole trace is sampled or none. Tail-based: store all spans, decide later which to keep. Common: sample 100% of errors + 5% of successful requests.'),
    d('Distributed Tracing Challenges', 'Performance overhead: instrumentation adds latency. Storage: high-cardinality trace data is expensive. Sampling: must balance completeness vs cost. Clock skew: spans from different machines need synchronized clocks. Privacy: trace data may contain sensitive request parameters.')
  ],
  'Tracing is the most powerful debugging tool for microservices. Start with automatic instrumentation (auto-instrumenting agents) and add manual spans for critical business logic. Sample based on error status. Use W3C Trace Context for propagation. Integrate traces with metrics (exemplars) and logs (trace_id in log lines) for full observability.',
  [
    q('What is distributed tracing?', 'Tracking a single request\'s path across multiple services, showing timing and dependencies.'),
    q('What is a span?', 'A unit of work within a trace — has operation name, timing, status, tags, and hierarchical parent.'),
    q('What is a trace?', 'A tree of spans representing the complete path of a request — identified by a trace_id.'),
    q('How is trace context propagated?', 'Via W3C Trace Context headers (traceparent, tracestate) in HTTP requests. Also via message metadata.'),
    q('What is sampling in tracing?', 'Collecting only a fraction of traces to manage storage cost while maintaining statistical significance.'),
    q('What is head-based vs tail-based sampling?', 'Head-based: decision at root (consistent — whole trace or nothing). Tail-based: store all, decide later.'),
    q('What is the W3C Trace Context standard?', 'A standard HTTP header format (traceparent, tracestate) for propagating trace context across services.'),
    q('What tools support tracing?', 'Jaeger (open source), Zipkin (open source), Datadog APM, New Relic, AWS X-Ray, Honeycomb.'),
    q('What is OpenTelemetry tracing?', 'A vendor-neutral API and SDK for generating, collecting, and exporting traces across languages.'),
    q('How do you correlate traces with logs?', 'Include trace_id and span_id in every structured log line. Log platforms can query by trace_id.')
  ],
  R(10,35,110,25,'#0070f3','','Request','HTTP / gRPC') +
  R(10,65,110,25,'#28a745','','Service A','Span 1: auth') +
  R(10,95,110,25,'#ffc107','','Service B','Span 2: payment') +
  R(10,125,110,25,'#dc3545','','Service C','Span 3: DB query') +
  R(10,155,110,25,'#e83e8c','','Trace ID','abc-123-xyz') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) + A(120,168,150,168) +
  R(160,35,230,155,'#17a2b8','','Distributed Tracing','Trace: tree of spans across services. Shows timing, errors, and dependency graph.') +
  T(240,220,'Tracing: Track requests across services — trace_id, spans, context propagation, sampling. Critical for microservices.',9,'#666','middle'),
  [
    e('OpenTelemetry Tracing (Node.js)', 'Manual span creation.', codeBlock([
      "const { trace, context, SpanStatusCode } = require('@opentelemetry/api');",
      "async function processOrder(orderId) {",
      "  const tracer = trace.getTracer('order-service');",
      "  return tracer.startActiveSpan('processOrder', async (span) => {",
      '    try {',
      "      span.setAttribute('order.id', orderId);",
      "      const validated = await tracer.startActiveSpan('validateOrder', async (childSpan) => {",
      '        const result = await validate(orderId);',
      '        childSpan.setStatus({ code: SpanStatusCode.OK });',
      '        childSpan.end();',
      '        return result;',
      '      });',
      '      span.setStatus({ code: SpanStatusCode.OK });',
      '      return validated;',
      '    } catch (error) {',
      '      span.setStatus({ code: SpanStatusCode.ERROR, message: error.message });',
      '      span.recordException(error);',
      '      throw error;',
      '    } finally { span.end(); }',
      '  });',
      '}'
    ]), 'Manual span creation with OpenTelemetry — parent-child relationships, attributes, error recording.'),
    e('Auto-Instrumentation (Express)', 'Zero-code tracing.', codeBlock([
      "const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');",
      "const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');",
      "const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');",
      "const { registerInstrumentations } = require('@opentelemetry/instrumentation');",
      'const provider = new NodeTracerProvider();',
      'provider.register();',
      'registerInstrumentations({',
      '  instrumentations: [',
      '    new ExpressInstrumentation(),',
      '    new HttpInstrumentation(),',
      '  ],',
      '});'
    ]), 'Auto-instrumentation adds tracing to Express and HTTP without modifying application code.'),
    e('Trace Context Propagation (HTTP Headers)', 'W3C Trace Context.', codeBlock([
      "const { context, trace } = require('@opentelemetry/api');",
      'async function callPaymentService(orderData) {',
      '  const headers = {};',
      "  const span = trace.getTracer('order-service').startSpan('callPaymentService');",
      '  trace.propagation.inject(context.active(), headers);',
      "  return fetch('http://payment/charge', { method: 'POST', headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify(orderData) });",
      '}'
    ]), 'W3C Trace Context propagation injects traceparent/tracestate headers for distributed tracing.'),
    e('Jaeger Query (Trace Search)', 'Querying traces by tag.', codeBlock([
      '# curl "http://jaeger:16686/api/traces?service=payment-service&limit=10"',
      '# curl "http://jaeger:16686/api/traces/abc123def456"'
    ]), 'Jaeger API for searching traces by service, tag, or trace ID.')
  ],
  [
    m('What is a trace?', ['A single metric value', 'The complete path of a request across services', 'A log message', 'A dashboard panel'], 1, 'A trace represents the complete path of a request through the distributed system.'),
    m('What is a span?', ['A single service instance', 'A unit of work within a trace', 'A metric counter', 'A log level'], 1, 'A span represents a single unit of work with timing and metadata.'),
    m('How is trace context propagated?', ['Via database queries', 'Via HTTP headers (traceparent)', 'Via configuration files', 'Via environment variables'], 1, 'W3C Trace Context standard uses traceparent and tracestate HTTP headers.'),
    m('What is sampling in tracing?', ['Storing all traces', 'Collecting only a subset of traces', 'Speeding up queries', 'Encrypting trace data'], 1, 'Sampling collects a fraction of traces to balance observability with storage costs.'),
    m('What is the W3C Trace Context?', ['A database schema', 'A standard for trace propagation headers', 'A logging format', 'A metric naming convention'], 1, 'W3C Trace Context defines standard HTTP headers for propagating trace context.'),
    m('What is head-based sampling?', ['Decision at root span', 'Decision after data collection', 'Random sampling with no rules', 'Sampling only errors'], 0, 'Head-based sampling decides at the root span, ensuring either the full trace or nothing is sampled.')
  ]
);

/* =================== TOPIC 5: Alerting =================== */
addTopic('mon-alerting', 'Alerting', 'intermediate', 15,
  ['Alerting automatically notifies on-call engineers when system metrics or events indicate a problem requiring human intervention.',
   'Good alerts are: actionable (something to fix), urgent (needs attention now), and specific (clear what is wrong). Noisy alerts cause alert fatigue.',
   'Alert lifecycle: firing (threshold breached) -> pending (not yet firing) -> resolved (back to normal) -> acknowledged/silenced.',
   'Alert routing: page (critical, wake someone), notify (high, check within hours), ticket (medium, fix when possible), log (low, track it).'
  ],
  'Alerting is like a smoke detector in your house. A good smoke detector only goes off when there is actual smoke or fire (actionable). A bad one goes off when you burn toast (noisy). You eventually stop responding to the bad one (alert fatigue), and then miss the real fire.',
  [
    d('Alerting Best Practices', 'Define clear thresholds with proper durations (for=5m prevents flapping). Use multiple severity levels (warning, critical). Include runbook URLs in alert annotations. Set up alert fatigue prevention (silencing, inhibition). Review alerts monthly — remove noisy ones.'),
    d('Alert Severity Levels', 'P0/Critical: service down, data loss — page on-call within 5 minutes. P1/High: degraded performance, feature broken — notify within 30 minutes. P2/Medium: non-critical issue — fix within business hours. P3/Low: cosmetic issue — add to backlog. P4/Info: informational — no action needed.'),
    d('Alert Routing and Escalation', 'Route alerts to the right team via labels (team=platform, service=payment). Escalation: if no response in N minutes, alert next tier. Schedule: follow-the-sun, primary+secondary on-call. Tools: PagerDuty, Opsgenie, Grafana OnCall.'),
    d('Common Alerting Mistakes', 'Noisy alerts: too many false positives. Static thresholds that don\'t adapt to traffic patterns. No runbook: alert says "CPU high" but no info on what to do. Paging for non-urgent issues. Duplicate alerts from multiple sources.')
  ],
  'Alert wisely. Every alert should be actionable, urgent, and include a runbook link. Use duration (for=5m) to avoid transient flapping. Route by team and severity. Review and prune alerts regularly — fewer, high-quality alerts beat many noisy ones. Implement escalation policies for incidents.',
  [
    q('What is alerting?', 'Automatically notifying on-call engineers when system metrics indicate a problem requiring intervention.'),
    q('What makes a good alert?', 'Actionable (fix something), Urgent (needs attention now), Specific (clear what is wrong), includes runbook.'),
    q('What is alert fatigue?', 'When too many false-positive alerts cause engineers to ignore or miss real problems.'),
    q('What is the for=5m parameter in Prometheus?', 'Duration an alert condition must persist before firing — prevents flapping from transient spikes.'),
    q('What is alert routing?', 'Directing alerts to the right team or on-call schedule based on labels (team, service, severity).'),
    q('What is alert escalation?', 'If the primary on-call does not acknowledge within N minutes, alert the next tier.'),
    q('What is a runbook?', 'Documentation describing the steps to diagnose and resolve a specific alert. Include in alert annotations.'),
    q('What is the difference between firing and pending alerts?', 'Pending: condition met but not yet for=duration. Firing: condition persists past duration — notification sent.'),
    q('What is P0 severity?', 'Critical — service down or data loss. Page on-call immediately, wake up if needed.'),
    q('What is alert silencing?', 'Temporarily suppressing alerts during known maintenance or deployments to reduce noise.')
  ],
  R(10,35,110,25,'#0070f3','','Metrics','CPU > 80%') +
  A(120,48,150,48) +
  R(160,35,110,25,'#28a745','','Alert Rule','for=5m') +
  A(160,60,160,80) +
  R(10,70,110,25,'#ffc107','','Firing','Notification sent') +
  R(10,100,110,25,'#dc3545','','Route','Team: Platform') +
  R(10,130,110,25,'#e83e8c','','Escalate','15 min no response') +
  R(10,160,110,25,'#6610f2','','Resolved','Back to normal') +
  R(290,35,190,155,'#17a2b8','','Alerting Pipeline','Metrics -> Alert Rule -> Firing -> Route -> Escalate. Include runbook in annotations.') +
  T(240,220,'Alerting: Actionable, urgent, specific notifications with runbooks. Avoid alert fatigue.',9,'#666','middle'),
  [
    e('Prometheus Alert Rule with Annotations', 'Best practice alert rule.', codeBlock([
      "groups:",
      "  - name: service_alerts",
      "    rules:",
      "      - alert: HighErrorRate",
      "        expr: sum(rate(http_requests_total{status=~\"5..\"}[5m])) / sum(rate(http_requests_total[5m])) > 0.05",
      "        for: 10m",
      "        labels:",
      "          severity: critical",
      "          team: platform",
      "        annotations:",
      "          runbook: 'https://runbook.example.com/high-error-rate'"
    ]), 'Well-structured alert rule with labels and annotations.'),
    e('Alertmanager Configuration', 'Routing and notification.', codeBlock([
      "route:",
      "  receiver: 'default'",
      "  group_wait: 30s",
      "  group_interval: 5m",
      "  repeat_interval: 4h",
      "  routes:",
      "    - match:",
      "        severity: critical",
      "      receiver: page-oncall",
      "receivers:",
      "  - name: page-oncall",
      "    pagerduty_configs:",
      "      - routing_key: '...'"
    ]), 'Alertmanager routes alerts by severity to PagerDuty.'),
    e('Grafana Alert (Unified Alerting)', 'Grafana alert rule.', codeBlock([
      'POST /api/v1/provisioning/alert-rules',
      '{"title":"High request latency","condition":"A",',
      '"data":[{"refId":"A","relativeTimeRange":{"from":300,"to":0},',
      '"datasourceUid":"prometheus",',
      '"model":{"expr":"histogram_quantile(0.99,sum(rate(request_duration_seconds_bucket[5m])) by (le)) > 1.0"}}],',
      '"noDataState":"Alerting","execErrState":"Alerting",',
      '"labels":{"severity":"warning"},',
      '"annotations":{"summary":"p99 latency > 1 second"}}'
    ]), 'Grafana unified alerting rule with Prometheus query, no-data handling, and labels.'),
    e('Runbook Template', 'Standard incident response document.', codeBlock([
      '# Runbook: High CPU Usage (P1)',
      '## Initial Checks',
      '1. Check dashboard: https://grafana/d/cpu-dashboard',
      '2. Identify instance: kubectl top pods -n production',
      '## Resolution',
      '- Scale up: kubectl scale deployment app --replicas=5',
      '- Rollback: kubectl rollout undo deployment app'
    ]), 'Runbook template provides standard diagnosis and resolution steps for common alerts.')
  ],
  [
    m('What makes a good alert?', ['Noisy and frequent', 'Actionable, urgent, specific', 'Pages everyone', 'Vague description'], 1, 'Good alerts are actionable, urgent, specific, and include a runbook.'),
    m('What does the for=5m parameter do?', ['Fires immediately', 'Waits 5 minutes before firing', 'Repeats every 5 minutes', 'Silences for 5 minutes'], 1, 'for=5m requires the condition to persist for 5 minutes before firing — prevents flapping.'),
    m('What is alert fatigue?', ['Tired engineers', 'Ignoring alerts due to too many false positives', 'Alerts that never fire', 'Too few alerts'], 1, 'Alert fatigue occurs when too many noisy alerts cause engineers to miss real problems.'),
    m('What is P0 severity?', ['Low priority', 'Critical — wake on-call', 'Informational', 'Medium impact'], 1, 'P0/Critical means service down or data loss — page on-call immediately.'),
    m('What is alert escalation?', ['Making alerts louder', 'Notifying next tier if no response', 'Deleting old alerts', 'Aggregating alerts'], 1, 'Escalation alerts the next on-call tier if the primary does not acknowledge within the timeout.'),
    m('What is a runbook?', ['Scheduling tool', 'Documentation for incident response', 'Monitoring tool', 'Alert configuration'], 1, 'A runbook documents the steps to diagnose and resolve a specific alert.')
  ]
);

/* =================== TOPIC 6: Dashboards =================== */
addTopic('mon-dashboards', 'Dashboards', 'beginner', 10,
  ['Dashboards provide visual representation of monitoring data — charts, graphs, and tables that show system health at a glance.',
   'Effective dashboards follow a hierarchy: overview (executive), service (team), and detail (debugging/troubleshooting) levels.',
   'Best practices: use meaningful time ranges, consistent color coding (red=bad, green=good), proper chart types for data, and logical layout.',
   'Tools: Grafana (most popular), Kibana (Elasticsearch), Datadog dashboards, CloudWatch dashboards, custom with D3.js/Chart.js.'
  ],
  'A dashboard is like the instrument panel in a cockpit. The pilot has a quick overview of altitude (latency), speed (throughput), fuel (capacity), and warning lights (alerts). They don\'t stare at one gauge — they scan all of them to understand the overall state of the flight.',
  [
    d('Dashboard Design Principles', 'Top-down: most important metrics at the top (executive view). Left to right: chronological flow of data. Use sparklines for historical context. Color consistently: red for errors/warnings, green for healthy, yellow for degraded. Limit charts per row (3-4 max). Include time range selector.'),
    d('Chart Type Selection', 'Time series (line graph): trends over time — latency, request rate, CPU. Bar chart: comparisons — requests by endpoint, errors by service. Heatmap: distributions — latency heatmap over time. Stat/singlestat: current value — current error count. Gauge: target vs actual — capacity percentage.'),
    d('Dashboard Hierarchy', 'Level 1 — Executive: uptime, overall error rate, p95 latency, business metrics (revenue, active users). Level 2 — Service: RED metrics for each service, dependency health. Level 3 — Debug: per-instance metrics, detailed latency distributions. Level 4 — Ad-hoc: temporary dashboards for incident investigation.'),
    d('Common Dashboard Mistakes', 'Too many metrics (cluttered). No logical grouping. Inconsistent time ranges. Chart types that mislead (pie charts for time series). Missing units. Auto-refresh too fast or too slow. No alert annotations. Too many colors. Not labeling axes.')
  ],
  'Design dashboards for specific audiences and use cases. Create a hierarchy: overview -> service -> debug. Choose the right chart type for your data. Keep it simple — the best dashboard answers questions at a glance. Use consistent layout and color conventions. Annotate deployments and incidents on time series.',
  [
    q('What is a monitoring dashboard?', 'A visual display of monitoring data showing system health through charts, graphs, and tables.'),
    q('What are the three levels of dashboard hierarchy?', 'Executive (overview), Service (team), Debug (troubleshooting).'),
    q('What is the best chart type for trends over time?', 'Time series / line chart — shows how metrics change over time.'),
    q('What is a good color convention for dashboards?', 'Green = healthy, yellow = degraded, red = critical/error. Consistent across all dashboards.'),
    q('What is a heatmap used for?', 'Showing distributions over time — commonly used for latency heatmaps (time vs bucket).'),
    q('What is a stat/singlestat panel?', 'Shows a single current value — current error count, active users, CPU percentage.'),
    q('What is the most popular open-source dashboard tool?', 'Grafana — supports Prometheus, Elasticsearch, Loki, InfluxDB, and many other data sources.'),
    q('What is a dashboard annotation?', 'A marker on a time series chart indicating an event — deployment, incident, config change.'),
    q('What is the recommended number of charts per dashboard row?', '3-4 charts per row. Too many makes the dashboard hard to read.'),
    q('What is ad-hoc dashboarding?', 'Creating temporary dashboards during incident investigation to explore specific metrics.')
  ],
  R(10,35,110,25,'#0070f3','','Executive','Uptime, SLAs') +
  R(10,65,110,25,'#28a745','','Service','RED metrics') +
  R(10,95,110,25,'#ffc107','','Debug','Per-instance') +
  R(10,125,110,25,'#dc3545','','Time Series','Line graphs') +
  R(10,155,110,25,'#e83e8c','','Heatmap','Distributions') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) + A(120,168,150,168) +
  R(160,35,230,155,'#17a2b8','','Dashboards','Hierarchy: Executive -> Service -> Debug. Time series, heatmaps, stats. Grafana, Kibana.') +
  T(240,220,'Dashboards: Visual monitoring data. Three-tier hierarchy. Choose right chart types. Keep it simple.',9,'#666','middle'),
  [
    e('Grafana Dashboard JSON (Simplified)', 'Dashboard definition.', codeBlock([
      '{"title":"Payment Service Overview","tags":["payment","production"],',
      '"panels":[{"title":"Request Rate","type":"timeseries",',
      '"gridPos":{"h":8,"w":8,"x":0,"y":0},',
      '"targets":[{"expr":"sum(rate(http_requests_total{service=\\"payment\\"}[5m]))",',
      '"legendFormat":"requests/s"}]}]}'
    ]), 'Grafana dashboard JSON defining a panel with request rate query.'),
    e('Kibana Dashboard (Elasticsearch)', 'Visualize log data.', codeBlock([
      'POST /api/saved_objects/visualization',
      '{"attributes":{"title":"Error Count by Service",',
      '"visState":"{\\"type\\":\\"histogram\\",',
      '\\"aggs\\":[{\\"id\\":\\"1\\",\\"type\\":\\"count\\"},',
      '{\\"id\\":\\"2\\",\\"type\\":\\"terms\\",',
      '\\"params\\":{\\"field\\":\\"service.keyword\\"}}]}"}}'
    ]), 'Kibana visualization API for creating histograms from Elasticsearch log data.'),
    e('Embedded Dashboard (iframe)', 'Share dashboards externally.', codeBlock([
      '<iframe src="https://grafana.example.com/d-solo/abc123/?orgId=1&refresh=30s&from=now-1h&to=now&panelId=2"',
      '  width="600" height="400" frameborder="0"></iframe>'
    ]), 'Embed Grafana dashboard panels in external applications via iframe.'),
    e('CLI Dashboard Tool (prom2graph)', 'Dashboards from the terminal.', codeBlock([
      '# prom2graph --host http://localhost:9090 --query \'rate(http_requests_total[5m])\' --duration 1h --width 80',
      '# Output: ▁▂▃▄▅▆▇█▇▆▅▄▃▂▁ 100 req/s'
    ]), 'Command-line dashboard tools for quick terminal-based monitoring.')
  ],
  [
    m('What are the three dashboard hierarchy levels?', ['Dev, Staging, Prod', 'Executive, Service, Debug', 'Frontend, Backend, Database', 'CPU, Memory, Disk'], 1, 'Dashboard hierarchy: Executive (overview), Service (team), Debug (troubleshooting).'),
    m('What chart type is best for trends over time?', ['Pie chart', 'Time series line chart', 'Bar chart', 'Table'], 1, 'Time series/line charts are best for showing metric trends over time.'),
    m('What is the most popular open-source dashboard tool?', ['Kibana', 'Grafana', 'Tableau', 'PowerBI'], 1, 'Grafana is the most popular open-source monitoring dashboard tool.'),
    m('What color convention is typical for dashboards?', ['Red=healthy, Green=bad', 'Green=healthy, Red=bad', 'Blue=warning, Yellow=healthy', 'Purple=error, Orange=info'], 1, 'Standard convention: Green=healthy, Red=error/critical, Yellow=warning.'),
    m('What is a dashboard annotation?', ['Note on chart for events', 'Chart title', 'Metric description', 'Data source name'], 0, 'Annotations mark events like deployments or incidents on time series charts.'),
    m('How many charts per dashboard row is recommended?', ['1-2', '3-4', '5-6', 'As many as fit'], 1, '3-4 charts per row is recommended for readability without clutter.')
  ]
);

/* =================== TOPIC 7: Prometheus =================== */
addTopic('mon-prometheus', 'Prometheus', 'intermediate', 25,
  ['Prometheus is an open-source systems monitoring and alerting toolkit originally built at SoundCloud, now a CNCF graduated project.',
   'Core features: multi-dimensional data model (time series identified by metric name + key/value labels), PromQL query language, pull-based scraping.',
   'Architecture: Prometheus server scrapes metrics from instrumented targets at configured intervals, stores locally, and evaluates alerting rules.',
   'Ecosystem: Alertmanager (alerting), Exporters (third-party metrics — node_exporter, blackbox_exporter), Grafana (visualization), client libraries.'
  ],
  'Prometheus is like a fitness tracker for your servers. It regularly checks your servers\' vitals (pulse = metrics), records them in a log (time series database), and lets you query trends ("show me CPU usage this week"). It can also alert you if your servers have a "heart attack" (CPU spike).',
  [
    d('Prometheus Data Model', 'Time series defined by: metric name (http_requests_total) + labels ({method="GET", status="200"}). Each series is a stream of (timestamp, value) pairs. Labels enable flexible aggregation without creating separate metrics. Naming: snake_case, _total suffix for counters, _seconds for durations, _bytes for sizes.'),
    d('PromQL (Prometheus Query Language)', 'Instant vector: current value for series. Range vector: values over time windows [5m]. Functions: rate() for counters, histogram_quantile() for distributions, avg()/sum()/min()/max() for aggregation. Binary operators: + - * / for arithmetic between vectors.'),
    d('Prometheus Architecture', 'Server: scrapes targets, stores TSDB, evaluates rules, serves API. Targets: instrumented services, exporters, pushgateway (for batch jobs). Service discovery: Kubernetes, Consul, EC2, file-based targets. Storage: local TSDB (2-hour blocks, compacted). Retention: configurable — 15 days typical.'),
    d('Prometheus Exporters', 'node_exporter: hardware/OS metrics (CPU, memory, disk, network). blackbox_exporter: HTTP/DNS/TCP/ICMP probes. process_exporter: process-level metrics. cadvisor (container metrics). kube-state-metrics: Kubernetes object state. postgres_exporter, redis_exporter, mysql_exporter: database metrics.'),
    d('Prometheus Best Practices', 'Use metric naming conventions. Keep cardinality low (<100k per server). Use recording rules for expensive queries. Set appropriate scrape intervals (15-30s default). Configure retention and sizing (8 bytes per sample, ~1GB/day per 100k series). Use service discovery rather than static targets.')
  ],
  'Prometheus is the de-facto standard for metrics monitoring in cloud-native environments. Start with node_exporter for infrastructure, client libraries for application metrics, and blackbox_exporter for external health. Master PromQL — it is the most valuable skill for using Prometheus effectively.',
  [
    q('What is Prometheus?', 'An open-source monitoring system with a multi-dimensional data model, PromQL, and pull-based scraping.'),
    q('What is the Prometheus data model?', 'Time series identified by metric name + key/value labels. Each series is (timestamp, value) pairs.'),
    q('What is PromQL?', 'Prometheus Query Language — a functional query language for selecting and aggregating time series data.'),
    q('What is the difference between pull and push in monitoring?', 'Prometheus pulls (scrapes) metrics from targets. Pushgateway exists for batch jobs that cannot be scraped.'),
    q('What is node_exporter?', 'A Prometheus exporter for hardware and OS metrics: CPU, memory, disk, network, load.'),
    q('What is the Pushgateway?', 'Allows batch/cron jobs to push metrics to Prometheus when they cannot be scraped (short-lived jobs).'),
    q('What is Alertmanager?', 'A separate component that handles alerting: deduplication, grouping, routing, silencing, and notification.'),
    q('What is recording rules?', 'Pre-computed PromQL expressions stored as new time series. Used for expensive or frequently queried expressions.'),
    q('What is remote write?', 'Prometheus can send data to long-term storage systems like Thanos, Cortex, or Mimir.'),
    q('What is cardinality in Prometheus?', 'The number of unique label combinations for a metric. High cardinality causes performance issues.')
  ],
  R(10,35,100,25,'#0070f3','','Prom Server','Scrape + store') +
  R(10,65,100,25,'#28a745','','Targets','Exporters') +
  R(10,95,100,25,'#ffc107','','TSDB','Local storage') +
  R(10,125,100,25,'#dc3545','','Alertmanager','Alerting') +
  R(10,155,100,25,'#e83e8c','','Grafana','Visualization') +
  A(110,48,130,48) + A(110,78,130,78) + A(110,108,130,108) + A(110,138,130,138) + A(110,168,130,168) +
  R(140,35,250,155,'#17a2b8','','Prometheus Architecture','Pull-based metrics. TSDB -> PromQL -> Alertmanager/Grafana. Exporters for infrastructure + apps.') +
  T(240,220,'Prometheus: Pull-based monitoring with PromQL, Alertmanager, and rich exporter ecosystem. CNCF graduated.',9,'#666','middle'),
  [
    e('Prometheus Configuration (prometheus.yml)', 'Scrape configuration.', codeBlock([
      'global:',
      '  scrape_interval: 15s',
      '  evaluation_interval: 15s',
      'alerting:',
      '  alertmanagers:',
      '    - static_configs:',
      '        - targets: ["alertmanager:9093"]',
      'scrape_configs:',
      '  - job_name: "node"',
      '    static_configs:',
      '      - targets: ["localhost:9100"]',
      '  - job_name: "myapp"',
      '    kubernetes_sd_configs:',
      '      - role: pod',
      '    relabel_configs:',
      '      - source_labels: [__meta_kubernetes_pod_label_app]',
      '        regex: myapp',
      '        action: keep'
    ]), 'Prometheus configuration with static targets and Kubernetes service discovery.'),
    e('node_exporter Installation', 'Infrastructure metrics.', codeBlock([
      '# wget https://github.com/prometheus/node_exporter/releases/download/v1.7.0/node_exporter-1.7.0.linux-amd64.tar.gz',
      '# tar xzf node_exporter-1.7.0.linux-amd64.tar.gz',
      '# sudo cp node_exporter /usr/local/bin/',
      '# systemctl start node_exporter',
      '# Port 9100, path /metrics'
    ]), 'Install node_exporter to collect infrastructure metrics.'),
    e('PromQL Queries (Real Examples)', 'Common PromQL patterns.', codeBlock([
      "# CPU: 100 - (avg by(instance) (rate(node_cpu_seconds_total{mode='idle'}[5m])) * 100)",
      '# Memory: (node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / node_memory_MemTotal_bytes * 100',
      '# Disk: 100 - (node_filesystem_avail_bytes{mountpoint="/"} / node_filesystem_size_bytes{mountpoint="/"} * 100)',
      '# Error rate: sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) * 100',
      '# p95: histogram_quantile(0.95, sum(rate(request_duration_seconds_bucket[5m])) by (le))'
    ]), 'Common PromQL queries for CPU, memory, disk, errors, and latency.'),
    e('Client Library Instrumentation (Python)', 'Application metrics.', codeBlock([
      'from prometheus_client import start_http_server, Counter, Histogram, Gauge',
      'REQUEST_COUNT = Counter("http_requests_total", "Total requests", ["method", "endpoint"])',
      'REQUEST_DURATION = Histogram("request_duration_seconds", "Latency", ["method"], buckets=[0.01, 0.05, 0.1, 0.5, 1])',
      'IN_FLIGHT = Gauge("in_flight_requests", "Current requests")',
      'start_http_server(8000)',
      'REQUEST_COUNT.labels(method="GET", endpoint="/api").inc()',
      'REQUEST_DURATION.labels(method="GET").observe(0.15)'
    ]), 'Prometheus Python client with Counter, Histogram, and Gauge metrics.')
  ],
  [
    m('What company originally built Prometheus?', ['Google', 'SoundCloud', 'Netflix', 'Uber'], 1, 'Prometheus was built at SoundCloud and later donated to CNCF.'),
    m('What is the Prometheus query language called?', ['SQL', 'PromQL', 'PQL', 'QueryL'], 1, 'PromQL (Prometheus Query Language) is used to query time series data.'),
    m('Does Prometheus use pull or push model?', ['Push only', 'Pull by default', 'Both equally', 'Neither'], 1, 'Prometheus primarily uses a pull model, scraping metrics from targets at configured intervals.'),
    m('What is node_exporter used for?', ['Application metrics', 'Infrastructure/host metrics', 'Database metrics', 'Kubernetes metrics'], 1, 'node_exporter collects hardware and OS metrics like CPU, memory, disk, network.'),
    m('What does Prometheus store time series in?', ['MySQL', 'Local TSDB', 'PostgreSQL', 'MongoDB'], 1, 'Prometheus stores time series data in its own local TSDB (Time Series Database).'),
    m('What handles alerting in the Prometheus ecosystem?', ['Grafana', 'Alertmanager', 'Node Exporter', 'Pushgateway'], 1, 'Alertmanager handles alert deduplication, grouping, routing, and notification.')
  ]
);

/* =================== TOPIC 8: Grafana =================== */
addTopic('mon-grafana', 'Grafana', 'intermediate', 20,
  ['Grafana is an open-source observability and data visualization platform that supports Prometheus, Elasticsearch, Loki, InfluxDB, and 50+ data sources.',
   'Core features: rich dashboarding with customizable panels, alerting (unified), explore mode for ad-hoc querying, annotations, and teams/organizations.',
   'Panel types: time series, bar chart, heatmap, gauge, stat, table, logs, pie chart, flame graph, and many community panels.',
   'Grafana uses a plugin system for data sources, panels, and apps — extensive ecosystem of community and enterprise plugins.'
  ],
  'Grafana is like a universal remote control for your monitoring. Instead of having separate screens for your TV (Prometheus), sound system (Elasticsearch), and streaming box (Loki), Grafana puts all their data on one unified dashboard. You can mix data from different sources on the same screen.',
  [
    d('Grafana Data Sources', 'Prometheus: time series metrics. Elasticsearch: log analytics. Loki: log aggregation. InfluxDB: time series. Graphite: legacy metrics. CloudWatch: AWS metrics. Azure Monitor: Azure metrics. Google Cloud Monitoring: GCP metrics. Tempo: tracing. Jaeger: tracing.'),
    d('Grafana Panels and Visualizations', 'Time series: most common — line, bar, area charts. Stat: single value with sparkline. Gauge: radial meter with threshold coloring. Table: tabular data with sorting. Heatmap: 2D distribution (time vs bucket). Logs: real-time log viewer. Flame graph: profiling visualization.'),
    d('Grafana Alerting (Unified)', 'Combines Prometheus-style and Grafana-native alerting. Create alert rules from any data source. Multiple evaluators: Grafana-managed, Prometheus-compatible. Alert routing to Slack, PagerDuty, Opsgenie, webhooks. Silences, mute timings, and alert grouping.'),
    d('Grafana Provisioning and Automation', 'Dashboards defined as JSON/YAML files in provisioning directory. Data sources configured via YAML. Alert rules provisioned via API. Teams and folders managed programmatically. Playlists: auto-rotating dashboards on big screens. Reporting: scheduled PDF reports.'),
    d('Grafana Enterprise Features', 'Role-Based Access Control (RBAC). Data source permissions. Report scheduling and delivery. White-labeling. Enterprise plugins (Oracle, SAP HANA, ServiceNow). 24/7 support. Usage insights and analytics.')
  ],
  'Grafana is the de-facto visualization layer for the Prometheus ecosystem. Create dashboards that combine metrics, logs, and traces in one view. Use explore mode for ad-hoc troubleshooting. Provision dashboards as code for version control. Set up alerting from any data source.',
  [
    q('What is Grafana?', 'An open-source observability and data visualization platform supporting 50+ data sources.'),
    q('What data sources does Grafana support?', 'Prometheus, Elasticsearch, Loki, InfluxDB, Graphite, CloudWatch, Azure Monitor, Tempo, Jaeger, and 50+ more via plugins.'),
    q('What is Grafana Explore?', 'An ad-hoc query interface for exploring data without creating a dashboard. Supports split view for comparing queries.'),
    q('What is Grafana unified alerting?', 'Grafana\'s alerting system that works across all data sources, with routing to Slack, PagerDuty, webhooks, etc.'),
    q('What is dashboard provisioning in Grafana?', 'Defining dashboards as JSON/YAML files that are automatically loaded into Grafana — enables version control.'),
    q('What panel type shows a single metric value?', 'Stat panel — shows a current value with optional sparkline for trend context.'),
    q('What is a Grafana annotation?', 'An event marker on a panel — used to mark deployments, incidents, or configuration changes on time series.'),
    q('What is Loki in the Grafana ecosystem?', 'Grafana\'s log aggregation system, designed to be cost-effective and tightly integrated with Grafana.'),
    q('What is Tempo in the Grafana ecosystem?', 'Grafana\'s distributed tracing backend, designed for high-scale and cost-effective trace storage.'),
    q('What is Grafana\'s plugin ecosystem?', 'A marketplace of community and enterprise plugins for data sources, panels, and apps extending Grafana functionality.')
  ],
  R(10,35,110,25,'#0070f3','','Data Sources','Prom, ES, Loki') +
  R(10,65,110,25,'#28a745','','Dashboards','Time series, logs') +
  R(10,95,110,25,'#ffc107','','Alerting','Unified alerts') +
  R(10,125,110,25,'#dc3545','','Explore','Ad-hoc query') +
  R(10,155,110,25,'#e83e8c','','Provisioning','Dashboards as code') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) + A(120,168,150,168) +
  R(160,35,230,155,'#17a2b8','','Grafana','Multi-source observability platform. Dashboards, alerting, explore, provisioning, plugins.') +
  T(240,220,'Grafana: Visualize metrics, logs, and traces from 50+ data sources. Unified alerting, ad-hoc explore, dashboards as code.',9,'#666','middle'),
  [
    e('Grafana Configuration (grafana.ini)', 'Key configuration settings.', codeBlock([
      '[server]',
      'http_port = 3000',
      'domain = grafana.example.com',
      '[security]',
      'admin_user = admin',
      'admin_password = ${GRAFANA_PASSWORD}',
      '[auth.github]',
      'enabled = true',
      'client_id = ${GITHUB_CLIENT_ID}',
      '[unified_alerting]',
      'enabled = true'
    ]), 'Grafana server configuration with GitHub OAuth and unified alerting.'),
    e('Provisioning Data Sources (YAML)', 'Automated data source setup.', codeBlock([
      'apiVersion: 1',
      'datasources:',
      '  - name: Prometheus',
      '    type: prometheus',
      '    url: http://prometheus:9090',
      '    isDefault: true',
      '  - name: Loki',
      '    type: loki',
      '    url: http://loki:3100',
      '  - name: Elasticsearch',
      '    type: elasticsearch',
      '    url: http://elasticsearch:9200'
    ]), 'Provision data sources in Grafana via YAML.'),
    e('Grafana API (Create Dashboard)', 'Programmatic dashboard management.', codeBlock([
      'curl -X POST "http://admin:password@grafana:3000/api/dashboards/db"',
      '  -H "Content-Type: application/json"',
      '  -d \'{"dashboard":{"title":"API Overview","timezone":"browser",',
      '"panels":[{"title":"Requests/s","type":"timeseries",',
      '"targets":[{"expr":"sum(rate(http_requests_total[5m]))"}]}],',
      '"time":{"from":"now-1h","to":"now"}},"overwrite":true}\''
    ]), 'Grafana REST API for creating dashboards programmatically.'),
    e('Alert Rule via Grafana API', 'Provision alerts programmatically.', codeBlock([
      'POST /api/v1/provisioning/alert-rules',
      '{"title":"Payment Error Rate","condition":"A",',
      '"data":[{"refId":"A","relativeTimeRange":{"from":300,"to":0},',
      '"datasourceUid":"prometheus",',
      '"model":{"expr":"sum(rate(http_requests_total{service=\\"payment\\",status=~\\"5..\\"}[5m])) / sum(rate(http_requests_total{service=\\"payment\\"}[5m])) > 0.1"}}],',
      '"labels":{"severity":"critical","team":"platform"},',
      '"annotations":{"summary":"Payment service error rate > 10%"}}'
    ]), 'Provision Grafana alert rules programmatically using the alerting provisioning API.')
  ],
  [
    m('What is Grafana?', ['A log shipper', 'An observability visualization platform', 'A metrics database', 'An alert manager'], 1, 'Grafana is a multi-source observability and data visualization platform.'),
    m('How many data sources does Grafana support?', ['10', '50+', '100+', '5'], 1, 'Grafana supports 50+ data sources through its plugin ecosystem.'),
    m('What is Grafana Explore?', ['Dashboard editor', 'Ad-hoc query interface', 'User management', 'Plugin manager'], 1, 'Explore is Grafana\'s ad-hoc query interface for data exploration without dashboards.'),
    m('What is Grafana provisioning?', ['User onboarding', 'Automated config via YAML/JSON', 'Server setup', 'Plugin installation'], 1, 'Provisioning automates data source and dashboard setup via YAML/JSON files.'),
    m('What Grafana component handles log aggregation?', ['Tempo', 'Loki', 'Prometheus', 'Elasticsearch'], 1, 'Loki is Grafana\'s log aggregation system, tightly integrated with Grafana.'),
    m('What Grafana component handles tracing?', ['Loki', 'Tempo', 'Prometheus', 'Graphite'], 1, 'Tempo is Grafana\'s distributed tracing backend.')
  ]
);
/* =================== TOPIC 9: Loki =================== */
addTopic('mon-loki', 'Loki', 'intermediate', 15,
  ['Loki is a horizontally-scalable, highly-available, multi-tenant log aggregation system inspired by Prometheus, by Grafana Labs.',
   'Key difference from Elasticsearch: Loki indexes only metadata (labels), not the full log content. This makes it cheaper and faster at ingestion.',
   'LogQL is Loki\'s query language, inspired by PromQL. Queries start with a log stream selector (label matching), then filter and process log lines.',
   'Loki integrates natively with Grafana and follows the same multi-tenancy model as Cortex (separate data per tenant).'
  ],
  'Loki is like a library card catalog instead of the full books. Elasticsearch reads every word of every book (full-text indexing) — expensive. Loki just records the book title, author, and shelf location (labels), then goes to get the book when you ask. Much cheaper storage, slightly slower search.',
  [
    d('Loki Architecture', 'Distributor: receives logs, validates, and distributes to ingesters. Ingester: builds compressed chunks in memory, flushes to object storage. Querier: reads chunks and runs LogQL queries. Query frontend: splits and caches queries for parallel execution. Object storage: S3, GCS, Azure Blob, or local filesystem for long-term chunk storage.'),
    d('LogQL (Loki Query Language)', 'Stream selector: {job="myapp", environment="prod"}. Line filter: |= "error" (contains), != "debug" (not contains), |~ "regex" (match). Parser: | logfmt (parse logfmt), | json (parse JSON). Label filter: | level = "error" (structured field). Aggregation: rate(), count_over_time().'),
    d('Loki vs Elasticsearch Comparison', 'Ingestion cost: Loki cheaper (no full-text index). Storage: Loki uses object storage (S3), ES uses local SSDs. Query speed: ES faster for complex full-text search — Loki faster for simple label-based queries. Scaling: Loki simpler to scale (no shard management). Retention: Loki cheaper for long retention.'),
    d('Loki Configuration', 'Distributor: replication factor, ring configuration. Ingester: chunk size (1-2MB), target chunk size, flush interval. Querier: max concurrent queries, query timeout. Storage: schema config (v11, v12), object store backend. Limits: ingestion rate, max line size, max stream per tenant.')
  ],
  'Loki is the most cost-effective log storage option for Prometheus+Grafana users. It trades full-text indexing for cheaper storage — fine if your primary use case is browsing recent logs and alerting on patterns. Use LogQL for querying. Configure chunk size and flush interval for your throughput.',
  [
    q('What is Loki?', 'A horizontally-scalable, multi-tenant log aggregation system from Grafana Labs, inspired by Prometheus.'),
    q('How does Loki differ from Elasticsearch?', 'Loki indexes only labels (metadata), not full text. Cheaper ingestion, different query model.'),
    q('What is LogQL?', 'Loki\'s query language, inspired by PromQL — uses stream selectors, line filters, and parsers.'),
    q('What are the main Loki components?', 'Distributor (ingest), Ingester (buffer+chunk), Querier (search), Query Frontend (cache+split).'),
    q('What storage does Loki use?', 'Object storage: S3, GCS, Azure Blob, or MinIO for long-term. Local filesystem for single-binary mode.'),
    q('What is a Loki stream?', 'A set of logs sharing the same label set (job, instance, container). Each stream has unique labels.'),
    q('What is a Loki chunk?', 'A compressed block of log data for a single stream, typically 1-2MB, stored in object storage.'),
    q('What parsers does LogQL support?', 'logfmt, json, regexp, pattern. Use these to extract structured fields from log lines.'),
    q('How does Loki handle multi-tenancy?', 'Via X-Scope-OrgID header — each tenant has isolated data. Same model as Cortex.'),
    q('What is the Grafana Loki query pattern?', 'Grafana Explore -> select Loki data source -> write LogQL query -> visualize as logs or metrics.')
  ],
  R(10,35,100,25,'#0070f3','','Logs','{app="myapp"}') +
  R(10,65,100,25,'#28a745','','Distributor','Validate + route') +
  R(10,95,100,25,'#ffc107','','Ingester','Chunk + store') +
  R(10,125,100,25,'#dc3545','','Object Store','S3 / GCS') +
  R(10,155,100,25,'#e83e8c','','Querier','LogQL search') +
  A(110,48,130,48) + A(110,78,130,78) + A(110,108,130,108) + A(110,138,130,138) + A(110,168,130,168) +
  R(140,35,250,155,'#17a2b8','','Loki Architecture','Logs -> Distributor -> Ingester (chunks) -> Object Storage -> Querier (LogQL). Label-indexed, cost-effective.') +
  T(240,220,'Loki: Prometheus-inspired log aggregation. Label indexing, LogQL, object storage, multi-tenant.',9,'#666','middle'),
  [
    e('Loki Configuration (loki.yaml)', 'Single-binary config.', codeBlock([
      'auth_enabled: false',
      'server:',
      '  http_listen_port: 3100',
      'common:',
      '  path_prefix: /tmp/loki',
      '  storage:',
      '    filesystem:',
      '      chunks_directory: /tmp/loki/chunks',
      '  replication_factor: 1',
      "schema_config:",
      '  configs:',
      '    - from: 2023-01-01',
      '      store: boltdb-shipper',
      '      object_store: filesystem',
      '      schema: v12',
      'limits_config:',
      '  max_line_size: 256k',
      '  ingestion_rate_mb: 10'
    ]), 'Loki single-binary configuration with filesystem storage, schema v12, and limits.'),
    e('LogQL Queries (Real Examples)', 'Common LogQL patterns.', codeBlock([
      "# All logs: {service='payment'}",
      "# Filter errors: {service='payment'} |= 'error'",
      "# JSON parse: {service='payment'} | json | level = 'error'",
      "# Rate: sum(rate({service='payment'} |= 'error' [5m]))",
      "# Logfmt parse: {service='payment'} | logfmt | duration > 2000"
    ]), 'LogQL queries from basic filtering to rate calculation.'),
    e('Promtail Configuration (Log Shipper)', 'Ship logs to Loki.', codeBlock([
      'clients:',
      '  - url: http://loki:3100/loki/api/v1/push',
      'scrape_configs:',
      '  - job_name: application',
      '    static_configs:',
      '      - targets: [localhost]',
      '        labels:',
      '          job: myapp',
      '          __path__: /var/log/myapp/*.log'
    ]), 'Promtail configuration shipping application logs to Loki.'),
    e('Structured Logging for LogQL', 'Write logs for easy LogQL parsing.', codeBlock([
      '# GOOD: {"level":"error","service":"payment","duration_ms":150,"trace_id":"abc123"}',
      '# GOOD: level=error service=payment msg="Payment failed" duration_ms=150',
      '# BAD: [2024-01-15] ERROR: Payment failed for order 123'
    ]), 'Structured logging (JSON/logfmt) enables powerful LogQL parsing.')
  ],
  [
    m('What does Loki index?', ['Full log content', 'Labels only (metadata)', 'Timestamps only', 'Everything'], 1, 'Loki indexes only labels (metadata), not full text.'),
    m('What is LogQL?', ['A SQL variant', 'Loki\'s query language', 'A log shipper', 'An alert format'], 1, 'LogQL is Loki\'s PromQL-inspired query language.'),
    m('What component ingests logs into Loki?', ['Querier', 'Distributor', 'Compactor', 'Query Frontend'], 1, 'The Distributor receives and validates incoming log data.'),
    m('What storage does Loki use for long-term chunks?', ['Local SSDs', 'Object storage (S3/GCS)', 'MySQL', 'Redis'], 1, 'Loki uses object storage (S3, GCS, Azure Blob) for long-term chunk storage.'),
    m('What is a Loki stream?', ['A single log line', 'A set of logs with the same labels', 'A query result', 'An alert rule'], 1, 'A stream is a set of logs sharing the same label set.'),
    m('What LogQL parser parses JSON logs?', ['logfmt', 'json', 'regexp', 'pattern'], 1, 'The | json parser extracts fields from JSON-formatted log lines.')
  ]
);

/* =================== TOPIC 10: Elasticsearch =================== */
addTopic('mon-elasticsearch', 'Elasticsearch', 'intermediate', 20,
  ['Elasticsearch is a distributed, RESTful search and analytics engine capable of solving a growing number of use cases — central to the ELK stack.',
   'Core concepts: index (like a database), document (JSON record), shard (horizontal partition), replica (high availability), inverted index (fast full-text search).',
   'Elasticsearch indexes all fields by default, enabling fast search and aggregation on any field. Built on Apache Lucene.',
   'Common use cases: centralized logging (ELK stack), full-text search, application performance monitoring, security analytics, and business analytics.'
  ],
  'Elasticsearch is like a massive, super-organized library where every book is immediately sorted, cross-referenced, and a librarian can instantly find any phrase or fact across all books. Unlike a normal library, this one copies popular sections (replicas) so many people can read simultaneously.',
  [
    d('Elasticsearch Architecture', 'Cluster: collection of nodes working together. Node: single server that stores data and participates in indexing/search. Index: collection of documents with similar characteristics. Shard: a Lucene index — the unit of scale. Primary shard: original data. Replica shard: copy for HA and search throughput.'),
    d('Inverted Index', 'Elasticsearch\'s secret sauce. Instead of storing documents and scanning them for terms, it stores a mapping of EVERY unique term to the list of documents containing it. {"elasticsearch": [doc1, doc3, doc5], "search": [doc1, doc2, doc4]}. Search for "elasticsearch search" — intersect lists -> doc1.'),
    d('Elasticsearch for Logging (ELK)', 'Logstash or Filebeat ships logs -> Elasticsearch indexes them -> Kibana visualizes. Index per day pattern: myapp-logs-2024.01.15. Mappings: define field types. ILM (Index Lifecycle Management): hot (SSD, indexing) -> warm (HDD, search) -> cold (frozen, rare queries) -> delete.'),
    d('Query DSL', 'Full JSON query language. Types: match (full-text), term (exact value), range (numeric/date), bool (compound — must, should, filter, must_not). Aggregations: terms (group by), date_histogram (time buckets), avg/sum/min/max, cardinality (unique count).'),
    d('Elasticsearch Operations', 'Cluster health: green (all shards allocated), yellow (replicas unallocated), red (shards missing). Monitoring: _cluster/health, _nodes/stats, _cat/indices. Scaling: add nodes, rebalance shards. Snapshots: backup to S3. ILM policies automate index management.')
  ],
  'Elasticsearch is the most powerful search and analytics engine available. Its inverted index makes full-text search near-instant at any scale. For logging, use daily indices with ILM policies. Understand the difference between query and filter context. Design mappings carefully.',
  [
    q('What is Elasticsearch?', 'A distributed, RESTful search and analytics engine built on Apache Lucene, central to the ELK stack.'),
    q('What is an inverted index?', 'A data structure mapping every unique term to documents containing it — enables instant full-text search.'),
    q('What is a shard?', 'A horizontal partition of an index. Each shard is a full Lucene index. Primary for data, replica for HA.'),
    q('What is the ELK stack?', 'Elasticsearch (storage/search), Logstash (data processing), Kibana (visualization). Often includes Filebeat.'),
    q('What is an Elasticsearch index?', 'A collection of JSON documents with similar characteristics — like a database in relational terms.'),
    q('What is ILM?', 'Index Lifecycle Management — automates index transitions: hot -> warm -> cold -> delete based on age/size.'),
    q('What is the difference between query and filter context?', 'Query: relevance scoring, slower. Filter: exact match, cached, faster. Use filter for structured data.'),
    q('What is the difference between text and keyword?', 'text: full-text, analyzed (tokenized, lowercased). keyword: exact value, not analyzed (for aggregations, sorting).'),
    q('What does cluster health green mean?', 'All primary and replica shards are allocated. Yellow: replicas not allocated. Red: shards missing.'),
    q('What is Logstash?', 'A data processing pipeline that ingests, transforms, and sends data to Elasticsearch (or other outputs).')
  ],
  R(10,35,110,25,'#0070f3','','Index','Collection of docs') +
  R(10,65,110,25,'#28a745','','Shard','Lucene partition') +
  R(10,95,110,25,'#ffc107','','Replica','HA + search perf') +
  R(10,125,110,25,'#dc3545','','Inverted Index','Term to docs map') +
  R(10,155,110,25,'#e83e8c','','ELK Stack','ES + Logstash + Kibana') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) + A(120,168,150,168) +
  R(160,35,230,155,'#17a2b8','','Elasticsearch','Distributed search + analytics engine. Indexes, shards, inverted index. RESTful JSON API. Central to ELK.') +
  T(240,220,'Elasticsearch: Distributed search and analytics. Inverted index for instant full-text search. ELK stack for logging.',9,'#666','middle'),
  [
    e('Elasticsearch Index Management', 'Create index with mapping.', codeBlock([
      'PUT /myapp-logs',
      '{"settings":{"number_of_shards":3,"number_of_replicas":1},',
      '"mappings":{"properties":{',
      '"@timestamp":{"type":"date"},',
      '"level":{"type":"keyword"},',
      '"message":{"type":"text"},',
      '"duration_ms":{"type":"integer"}}}',
      '}'
    ]), 'Create Elasticsearch index with explicit mapping defining field types.'),
    e('Elasticsearch Query Examples', 'Search and aggregation queries.', codeBlock([
      'GET /myapp-logs-2024.01.15/_search',
      '{"query":{"bool":{"filter":[',
      '{"term":{"level":"error"}},',
      '{"range":{"@timestamp":{"gte":"now-1h"}}}',
      ']}}}'
    ]), 'Elasticsearch query: filter context for exact matches and date ranges.'),
    e('Bulk Indexing Logs (Node.js)', 'Indexing log data into Elasticsearch.', codeBlock([
      "const { Client } = require('@elastic/elasticsearch');",
      'const client = new Client({ node: "http://elasticsearch:9200" });',
      'async function bulkIndexLogs(logs) {',
      '  const body = logs.flatMap(doc => [{ index: { _index: `logs-${new Date().toISOString().slice(0,10)}` }}, doc]);',
      '  return client.bulk({ refresh: "wait_for", body });',
      '}'
    ]), 'Bulk indexing logs into date-based Elasticsearch indices.'),
    e('ILM Policy for Log Indexes', 'Automate index lifecycle.', codeBlock([
      'PUT /_ilm/policy/logs_policy',
      '{"policy":{"phases":{',
      '"hot":{"min_age":"0ms","actions":{"rollover":{"max_size":"50GB","max_age":"1d"}}},',
      '"warm":{"min_age":"7d","actions":{"forcemerge":{"max_num_segments":1}}},',
      '"cold":{"min_age":"30d","actions":{"freeze":{}}},',
      '"delete":{"min_age":"90d","actions":{"delete":{}}}',
      '}}}'
    ]), 'ILM policy automates index lifecycle: hot -> warm -> cold -> delete.'),
    e('Filebeat Configuration', 'Ship logs to Elasticsearch.', codeBlock([
      'filebeat.inputs:',
      '  - type: log',
      '    paths:',
      '      - /var/log/myapp/*.log',
      '    json.keys_under_root: true',
      'output.elasticsearch:',
      '  hosts: ["http://elasticsearch:9200"]',
      '  index: "filebeat-%{+yyyy.MM.dd}"'
    ]), 'Filebeat configuration for shipping JSON logs to Elasticsearch.')
  ],
  [
    m('What is the core data structure in Elasticsearch for fast search?', ['B-tree', 'Inverted index', 'Hash table', 'Binary search'], 1, 'The inverted index maps every unique term to the documents containing it.'),
    m('What is a shard in Elasticsearch?', ['A search query', 'A horizontal partition of an index', 'A server node', 'A JSON document'], 1, 'A shard is a horizontal partition — each shard is a self-contained Lucene index.'),
    m('What does the ELK stack stand for?', ['Elasticsearch, Logstash, Kibana', 'Elastic, Logstash, Kafka', 'Elasticsearch, Logstash, Kafka', 'ELK, Linux, Kubernetes'], 0, 'ELK = Elasticsearch (storage), Logstash (processing), Kibana (visualization).'),
    m('What is ILM in Elasticsearch?', ['Index Lifecycle Management', 'Integrated Log Monitoring', 'Index Label Mapping', 'Internal Load Manager'], 0, 'ILM automates index transitions through hot -> warm -> cold -> delete phases.'),
    m('What is the difference between text and keyword field types?', ['text is not indexed', 'text is analyzed (full-text), keyword is exact', 'keyword is faster', 'No difference'], 1, 'text fields are analyzed for full-text search; keyword fields are exact values for aggregations.'),
    m('What does cluster health yellow mean?', ['All shards healthy', 'Replica shards not allocated', 'Primary shards missing', 'Cluster offline'], 1, 'Yellow means primary shards are allocated but replicas are not.')
  ]
);

/* =================== TOPIC 11: Kibana =================== */
addTopic('mon-kibana', 'Kibana', 'intermediate', 15,
  ['Kibana is a visualization and exploration platform for Elasticsearch — the "K" in the ELK stack.',
   'Core features: dashboards (multiple visualizations on one screen), Discover (ad-hoc log search), Canvas (custom pixel-perfect designs), Maps (geo-location), Lens (drag-and-drop visualization builder).',
   'Kibana uses the Elasticsearch Query DSL and KQL (Kibana Query Language) for searching and filtering data.',
   'Use cases: log analytics, application performance monitoring (APM), security analytics (SIEM), business analytics, and infrastructure monitoring.'
  ],
  'Kibana is like the windshield of a car connected to Elasticsearch — the engine. The engine (Elasticsearch) does all the heavy lifting (searching, indexing). The windshield (Kibana) lets you see where you are going through beautiful charts, graphs, and tables. Without Kibana, Elasticsearch data is just noise in a terminal.',
  [
    d('Kibana Discover', 'Ad-hoc log search and exploration. Search bar supports KQL (Kibana Query Language) and Lucene syntax. Filter by time range, field values. Inspect individual documents. Save searches for reuse in dashboards. Available fields panel shows field distribution. Histogram shows document count over time.'),
    d('Kibana Visualizations and Dashboards', 'Lens: drag-and-drop visualization builder — auto-suggests chart types. TSVB: time series visual builder for complex metrics. Vega: custom visualization grammar. Maps: geo-spatial data visualization. Canvas: pixel-perfect custom designs. Dashboards combine multiple visualizations with filters and annotations.'),
    d('Kibana Query Language (KQL)', 'Simpler than Lucene, designed for Kibana. Syntax: field:value (http.response.status_code:200). Logic: and, or, not (response.status_code:200 and response.status_code:304). Range: age >= 30. Wildcard: machine.name:web*. Existence: response.status_code:*.'),
    d('Kibana Observability Features', 'APM: traces, service maps, dependency graphs, latency distributions. Logs: streaming log viewer with rate visualization. Metrics: infrastructure monitoring with predefined dashboards. Uptime: synthetic monitoring for HTTP/TCP/ICMP checks. Security: SIEM dashboards, detection rules, cases management.'),
    d('Kibana Saved Objects and Sharing', 'Saved objects: dashboards, visualizations, searches, index patterns. Export/import via saved objects API. Dashboard sharing: direct link, embedded iframe, PDF/CSV export, scheduled reports. Dashboard-only mode for read-only users.')
  ],
  'Kibana is the visualization front-end for Elasticsearch. Learn KQL for efficient log searching. Use Discover for investigation, Dashboard for monitoring. Saved searches connect Discover to Dashboards. Lens simplifies chart creation. Use index patterns to map Elasticsearch indices.',
  [
    q('What is Kibana?', 'A visualization and exploration platform for Elasticsearch — the "K" in the ELK stack.'),
    q('What is Kibana Discover?', 'An ad-hoc log search interface for exploring Elasticsearch data without creating dashboards.'),
    q('What is KQL?', 'Kibana Query Language — a simplified query syntax for searching data in Kibana.'),
    q('What is Kibana Lens?', 'A drag-and-drop visualization builder that auto-suggests chart types based on your data.'),
    q('What is an index pattern in Kibana?', 'A mapping between Kibana and Elasticsearch indices — defines which indices to search and their time field.'),
    q('What is Kibana Canvas?', 'A pixel-perfect design tool for creating custom infographics and presentations from Elasticsearch data.'),
    q('What is Kibana Maps?', 'A geo-spatial visualization tool for plotting location data on maps with multiple layers.'),
    q('What is Kibana APM?', 'Application Performance Monitoring — traces, service maps, and latency distributions for instrumented services.'),
    q('How do you share a Kibana dashboard?', 'Direct link, embedded iframe, PDF/CSV export, or scheduled email reports.'),
    q('What is Kibana SIEM?', 'Security Information and Event Management — security analytics with detection rules and incident management.')
  ],
  R(10,35,110,25,'#0070f3','','Discover','Log search') +
  R(10,65,110,25,'#28a745','','Dashboards','Visualizations') +
  R(10,95,110,25,'#ffc107','','Lens','Drag-drop build') +
  R(10,125,110,25,'#dc3545','','Canvas','Custom designs') +
  R(10,155,110,25,'#e83e8c','','Maps','Geo-spatial') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) + A(120,168,150,168) +
  R(160,35,230,155,'#17a2b8','','Kibana','Elasticsearch visualization: Discover, Dashboards, Lens, Canvas, Maps, APM, SIEM. KQL query language.') +
  T(240,220,'Kibana: Elasticsearch visualization platform. Discover, dashboards, Lens, Canvas, Maps, APM, SIEM.',9,'#666','middle'),
  [
    e('KQL Queries (Kibana Query Language)', 'Searching logs in Discover.', codeBlock([
      '# Simple field query',
      'level: ERROR',
      '',
      '# Multiple conditions',
      'level: ERROR AND service: payment',
      '',
      '# Range query',
      'duration_ms > 1000',
      '',
      '# Wildcard',
      'message: "timeout*"',
      '',
      '# Existence',
      'trace_id: *',
      '',
      '# Negation',
      'NOT level: DEBUG'
    ]), 'KQL query examples for searching Elasticsearch data in Kibana Discover.'),
    e('Kibana Index Pattern Setup', 'Create index pattern via API.', codeBlock([
      'POST /api/saved_objects/index-pattern',
      '{"attributes":{',
      '"title":"myapp-logs-*",',
      '"timeFieldName":"@timestamp"',
      '}}'
    ]), 'Create a Kibana index pattern to map to Elasticsearch log indices.'),
    e('Kibana Dashboard API', 'Create dashboard programmatically.', codeBlock([
      'POST /api/saved_objects/dashboard',
      '{"attributes":{',
      '"title":"Payment Service Overview",',
      '"hits":0,"version":1,',
      '"panelsJSON":"[]"',
      '}}'
    ]), 'Kibana saved objects API for creating dashboards programmatically.'),
    e('Kibana Alerting (Elastic Rules)', 'Alert on Elasticsearch queries.', codeBlock([
      'POST /api/alerting/rule',
      '{"params":{',
      '"index":"myapp-logs-*",',
      '"timeField":"@timestamp",',
      '"thresholdComparator":">",',
      '"threshold":[10],',
      '"timeWindowSize":5,',
      '"timeWindowUnit":"m",',
      '"esQuery":"{\\"query\\":{\\"term\\":{\\"level\\":\\"error\\"}}}"',
      '},"rule_type_id":"metrics.alert.threshold",',
      '"actions":[{"group":"default","id":"slack-notifier"}]}'
    ]), 'Kibana alerting rule that triggers when error count exceeds threshold.')
  ],
  [
    m('What does the K in ELK stack stand for?', ['Kafka', 'Kibana', 'Kubernetes', 'Kinesis'], 1, 'K stands for Kibana, the visualization platform for Elasticsearch.'),
    m('What is Kibana Discover?', ['Dashboard builder', 'Ad-hoc search interface', 'Map visualization', 'Alert manager'], 1, 'Discover is Kibana\'s ad-hoc log search and exploration interface.'),
    m('What is KQL?', ['Kubernetes Query Language', 'Kibana Query Language', 'Kibana Quick Link', 'Key Query Language'], 1, 'KQL stands for Kibana Query Language — a simplified search syntax.'),
    m('What is Kibana Lens?', ['A camera tool', 'Drag-and-drop visualization builder', 'A data source', 'A calendar view'], 1, 'Lens is a drag-and-drop visualization builder that auto-suggests chart types.'),
    m('What is an index pattern?', ['A design pattern', 'Maps Kibana to Elasticsearch indices', 'A chart type', 'A query filter'], 1, 'An index pattern defines which Elasticsearch indices Kibana should search.'),
    m('What is Kibana Canvas for?', ['Log streaming', 'Pixel-perfect custom designs', 'Alert configuration', 'User management'], 1, 'Canvas creates pixel-perfect custom infographics and presentations from Elasticsearch data.')
  ]
);

/* =================== TOPIC 12: Fluentd =================== */
addTopic('mon-fluentd', 'Fluentd', 'intermediate', 15,
  ['Fluentd is an open-source data collector for unified logging layer, enabling you to collect, transform, and ship data to various destinations.',
   'Architecture: Input -> Filter -> Buffer -> Output. Plugins for every step enable processing any data format to any destination.',
   'Written in C/Ruby with a plugin-based architecture. Over 1000+ community plugins for inputs, filters, outputs, and parsers.',
   'Key concept: tag-based routing. Each event has a tag, and configuration routes events by tag patterns to specific outputs.'
  ],
  'Fluentd is like a postal sorting facility for log data. Logs arrive in all shapes and sizes (JSON, plain text, CSV) from various sources (files, HTTP, syslog). Fluentd sorts them by tag (like ZIP codes), optionally processes them (filtering out junk mail, adding postage), and delivers them to the right destination (Elasticsearch, S3, Kafka).',
  [
    d('Fluentd Architecture and Data Flow', 'Input plugins: tail (files), forward (network), http (HTTP POST), syslog, tcp/udp. Filter plugins: grep (filter by conditions), record_transformer (modify records), parser (parse unstructured data). Buffer plugins: file, memory. Output plugins: elasticsearch, s3, kafka, mongodb, forward (another Fluentd).'),
    d('Tag-Based Routing', 'Each event has a tag (e.g., myapp.access, myapp.error). Configuration uses <match> directives with glob patterns: <match myapp.*>, <match **>, <match myapp.access myapp.error>. Wildcards: * matches single segment, ** matches multiple segments. Events route to outputs based on tag matching.'),
    d('Fluentd HA and Reliability', 'Buffer: in-memory or file-based. Retry: configurable retry with exponential backoff. Primary/failover: configure secondary output for failover. Fluentd can act as a forwarder (agent) or aggregator. Use Fluentd as an aggregator to batch and buffer before sending to Elasticsearch.'),
    d('Fluentd vs Fluent Bit', 'Fluentd: full-featured, plugins for everything, written in C+Ruby, higher resource usage. Fluent Bit: lightweight, smaller footprint, written in C, fewer plugins, lower throughput. Common pattern: Fluent Bit on edge nodes (low resource), Fluentd as central aggregator (full processing).')
  ],
  'Fluentd is the most flexible log collector with the largest plugin ecosystem. Use its tag-based routing to send different data streams to different destinations. Configure buffering for reliability. Use filters to parse, transform, and enrich data before output. Fluentd is best as a central aggregator; Fluent Bit is better for edge collection.',
  [
    q('What is Fluentd?', 'An open-source data collector for unified logging layer — collect, transform, and ship data.'),
    q('What is Fluentd\'s architecture?', 'Input -> Filter -> Buffer -> Output. Each stage uses plugins for extensibility.'),
    q('What is tag-based routing?', 'Events have tags; configuration routes events by tag patterns to specific output destinations.'),
    q('What is Fluentd\'s buffer?', 'A reliability layer — events are buffered in memory or file before being sent to output.'),
    q('How many Fluentd plugins exist?', 'Over 1000+ community plugins for inputs, filters, outputs, parsers, and formatters.'),
    q('What is the difference between Fluentd and Fluent Bit?', 'Fluentd: full-featured, more plugins, higher resources. Fluent Bit: lightweight, fewer plugins, lower resources.'),
    q('What is the Fluentd <match> directive?', 'Routes events by tag pattern to a specific output plugin. Supports glob-style patterns.'),
    q('What is the Fluentd <filter> directive?', 'Processes events between input and output — parse, transform, enrich, or drop events.'),
    q('What is Fluentd record_transformer?', 'A filter plugin that modifies event records — add/rename/remove fields.'),
    q('How does Fluentd handle backpressure?', 'Buffering with configurable retry and exponential backoff. Primary/failover output for HA.')
  ],
  R(10,35,110,25,'#0070f3','','Input','File, HTTP, Syslog') +
  R(10,65,110,25,'#28a745','','Filter','Parse, transform') +
  R(10,95,110,25,'#ffc107','','Buffer','File, memory') +
  R(10,125,110,25,'#dc3545','','Output','ES, S3, Kafka') +
  R(10,155,110,25,'#e83e8c','','Tags','Routing by pattern') +
  A(120,48,150,48) + A(120,78,150,78) + A(120,108,150,108) + A(120,138,150,138) + A(120,168,150,168) +
  R(160,35,230,155,'#17a2b8','','Fluentd Pipeline','Input -> Filter -> Buffer -> Output. Tag-based routing. 1000+ plugins. Central aggregator for unified logging.') +
  T(240,220,'Fluentd: Data collector with tag-based routing. Input > Filter > Buffer > Output. 1000+ plugins.',9,'#666','middle'),
  [
    e('Fluentd Configuration (td-agent.conf)', 'Collect logs, output to Elasticsearch.', codeBlock([
      '<source>',
      '  @type tail',
      '  path /var/log/myapp/*.log',
      '  tag myapp.log',
      '  <parse>',
      '    @type json',
      '  </parse>',
      '</source>',
      '',
      '<match myapp.log>',
      '  @type elasticsearch',
      '  host elasticsearch.example.com',
      '  port 9200',
      '  logstash_format true',
      '  logstash_prefix myapp-logs',
      '  <buffer>',
      '    @type file',
      '    path /var/log/fluentd/buffer',
      '    flush_interval 5s',
      '  </buffer>',
      '</match>'
    ]), 'Fluentd config: tail JSON logs, send to Elasticsearch with file-based buffering.'),
    e('Fluentd Filter (Parse and Transform)', 'Process log records.', codeBlock([
      '<filter myapp.log>',
      '  @type record_transformer',
      '  <record>',
      '    hostname ${hostname}',
      '    environment production',
      '  </record>',
      '</filter>',
      '',
      '<filter myapp.log>',
      '  @type grep',
      '  <exclude>',
      '    key level',
      '    pattern ^DEBUG$',
      '  </exclude>',
      '</filter>'
    ]), 'Filters add fields (record_transformer) and exclude debug-level logs (grep).'),
    e('Fluentd Multi-Output Routing', 'Send different streams to different destinations.', codeBlock([
      '<source>',
      '  @type forward',
      '  port 24224',
      '</source>',
      '',
      '<match myapp.access>',
      '  @type s3',
      '  s3_bucket access-logs',
      '  path logs/',
      '  <buffer>',
      '    @type file',
      '    path /var/log/fluentd/s3',
      '  </buffer>',
      '</match>',
      '',
      '<match myapp.error>',
      '  @type elasticsearch',
      '  host elasticsearch.example.com',
      '  port 9200',
      '</match>'
    ]), 'Route access logs to S3 and error logs to Elasticsearch using tag-based routing.'),
    e('Fluentd Parser (Unstructured to Structured)', 'Parse Nginx access logs.', codeBlock([
      '<source>',
      '  @type tail',
      '  path /var/log/nginx/access.log',
      '  tag nginx.access',
      '  <parse>',
      '    @type regexp',
      '    expression /^(?<remote>[^ ]+) (?<host>[^ ]+) (?<user>[^ ]+) \\[(?<time>[^\\]]+)\\] "(?<method>\\S+)(?: +(?<path>[^ ]*) +\\S*)?" (?<code>[^ ]+) (?<size>[^ ]+)/',
      '    time_format %d/%b/%Y:%H:%M:%S %z',
      '  </parse>',
      '</source>'
    ]), 'Parse unstructured Nginx access logs into structured fields using regex parser.')
  ],
  [
    m('What is Fluentd?', ['A database', 'An open-source data collector', 'A visualization tool', 'A monitoring system'], 1, 'Fluentd is an open-source data collector for unified logging layer.'),
    m('What is Fluentd\'s architecture?', ['Store -> Query -> Display', 'Input -> Filter -> Buffer -> Output', 'Collect -> Analyze -> Act', 'Read -> Write -> Delete'], 1, 'Fluentd pipeline: Input -> Filter -> Buffer -> Output.'),
    m('What is tag-based routing?', ['Routing by geometry', 'Routing events by tag patterns to outputs', 'Tagging system logs', 'Network routing'], 1, 'Events have tags; configuration routes them by tag pattern matching to specific outputs.'),
    m('What is the difference between Fluentd and Fluent Bit?', ['Fluentd is paid, Fluent Bit is free', 'Fluentd: full-featured, Fluent Bit: lightweight', 'Fluentd is older, Fluent Bit is newer', 'No difference'], 1, 'Fluentd is full-featured with more plugins; Fluent Bit is lightweight with lower resource usage.'),
    m('What does the Fluentd buffer do?', ['Accelerates queries', 'Provides reliability through retry', 'Encrypts data', 'Visualizes metrics'], 1, 'The buffer provides reliability — events are buffered and retried with backoff if output fails.'),
    m('How many plugins does Fluentd have?', ['100', '1000+', '50', '500'], 1, 'Fluentd has over 1000 community plugins for various inputs, filters, outputs, and parsers.')
  ]
);

/* =================== TOPIC 13: Fluent Bit =================== */
addTopic('mon-fluent-bit', 'Fluent Bit', 'intermediate', 15,
  ['Fluent Bit is a lightweight, fast, and highly scalable log processor and forwarder — part of the Fluentd ecosystem, written in C.',
   'Key features: low memory footprint (~450KB), high throughput, built-in metrics, Kubernetes integration (DaemonSet), multi-platform.',
   'Common use: as a lightweight log agent on edge/container environments (Kubernetes, IoT, embedded Linux) shipping logs to Fluentd or directly to storage.',
   'Pipeline: Input -> Parser -> Filter -> Buffer -> Output. Similar to Fluentd but simpler and faster.'
  ],
  'Fluent Bit is like a bicycle messenger compared to Fluentd\'s delivery truck. The bike messenger (Fluent Bit) is lightweight, zips through traffic, uses minimal fuel (CPU/memory), and is perfect for the "last mile" (edge devices, containers). The truck (Fluentd) carries more, processes heavier loads, but needs more resources.',
  [
    d('Fluent Bit vs Fluentd Deep Dive', 'Fluent Bit: C language, ~450KB memory, 100+ plugins, ~10K events/sec/core. Fluentd: C+Ruby, ~60MB memory, 1000+ plugins, ~2K events/sec/core. Fluent Bit is 10x more efficient. Fluentd has richer plugin ecosystem. Common architecture: Fluent Bit at edge -> Fluentd aggregator -> storage.'),
    d('Fluent Bit Plugins', 'Input: tail (files), forward (network), http, syslog, kmsg (kernel), cpu/mem/disk/network (metrics), k8s (Kubernetes). Output: elasticsearch, kafka, s3, http, forward (Fluentd), influxdb, loki, prometheus, gcp, azure. Filter: grep, parser, kubernetes (enrich with pod metadata), modify, throttle, nest, rewrite_tag.'),
    d('Fluent Bit Kubernetes Integration', 'Deployed as DaemonSet: one pod per Kubernetes node. Automatically collects container logs. Enriches logs with Kubernetes metadata (pod name, namespace, labels, container name). Uses tail input with multiline parser for stack traces. Can collect application and system logs. Supports Prometheus metrics.'),
    d('Fluent Bit Configuration and Performance', 'Configuration syntax similar to Fluentd. Key settings: flush interval, buffer size, storage path for backpressure. Performance tuning: adjust flush interval (1-5s), use proper chunk size, enable storage for large buffers. Memory limit: mem_buf_limit prevents OOM. Multi-threading for CPU-bound parsing.')
  ],
  'Fluent Bit is the best choice for edge log collection — Kubernetes, containers, IoT, and embedded devices. Its tiny footprint makes it ideal where resources are limited. For complex processing and routing, use Fluentd as a central aggregator. Fluent Bit + Fluentd is the standard CNCF log collection stack.',
  [
    q('What is Fluent Bit?', 'A lightweight, high-performance log processor and forwarder from the Fluentd ecosystem, written in C.'),
    q('What is Fluent Bit\'s memory footprint?', 'Approximately 450KB — extremely lightweight compared to Fluentd\'s ~60MB.'),
    q('What is Fluent Bit\'s primary use case?', 'Edge log collection — Kubernetes DaemonSet, containers, IoT, embedded Linux.'),
    q('How does Fluent Bit compare to Fluentd?', 'Fluent Bit: lightweight, fast, C-based, ~100 plugins. Fluentd: full-featured, Ruby-based, 1000+ plugins.'),
    q('What is the recommended Fluent Bit + Fluentd architecture?', 'Fluent Bit on each node (edge) -> sends to Fluentd aggregator -> forwards to storage.'),
    q('What output plugins does Fluent Bit support?', 'Elasticsearch, Kafka, S3, HTTP, Fluentd (forward), InfluxDB, Loki, Prometheus, GCP, Azure.'),
    q('How is Fluent Bit deployed in Kubernetes?', 'As a DaemonSet — one pod per node, automatically collects container logs with K8s metadata.'),
    q('What filter does Fluent Bit use for Kubernetes?', 'The kubernetes filter enriches logs with pod name, namespace, labels, container name, and annotations.'),
    q('What is mem_buf_limit in Fluent Bit?', 'Memory buffer limit for each input — prevents out-of-memory by pausing input when limit is reached.'),
    q('Is Fluent Bit a CNCF project?', 'Yes, Fluent Bit is a CNCF graduated project alongside Fluentd as part of the Fluentd ecosystem.')
  ],
  R(10,35,100,25,'#0070f3','','Fluent Bit','Edge agent') +
  R(10,65,100,25,'#28a745','','K8s DaemonSet','Per-node logs') +
  R(10,95,100,25,'#ffc107','','Tail Input','Container logs') +
  R(10,125,100,25,'#dc3545','','K8s Filter','Add metadata') +
  R(10,155,100,25,'#e83e8c','','Output','ES / Kafka / Loki') +
  A(110,48,130,48) + A(110,78,130,78) + A(110,108,130,108) + A(110,138,130,138) + A(110,168,130,168) +
  R(140,35,250,155,'#17a2b8','','Fluent Bit Pipeline','Edge: tail logs -> K8s metadata -> output to storage. 450KB memory, 100+ plugins, CNCF graduated.') +
  T(240,220,'Fluent Bit: Lightweight log processor. 450KB footprint. Ideal for Kubernetes and edge log collection.',9,'#666','middle'),
  [
    e('Fluent Bit Configuration (fluent-bit.conf)', 'Ship logs to Elasticsearch.', codeBlock([
      '[SERVICE]',
      '    flush 1',
      '    log_level info',
      '',
      '[INPUT]',
      '    name tail',
      '    path /var/log/containers/*.log',
      '    multiline.parser docker, cri',
      '    tag kube.*',
      '    mem_buf_limit 50MB',
      '',
      '[FILTER]',
      '    name kubernetes',
      '    match kube.*',
      '    merge_log on',
      '    k8s_logging.parser on',
      '',
      '[OUTPUT]',
      '    name elasticsearch',
      '    match kube.*',
      '    host elasticsearch.example.com',
      '    port 9200',
      '    index fluentbit-${HOSTNAME}'
    ]), 'Fluent Bit configuration for Kubernetes: tail container logs, add K8s metadata, ship to Elasticsearch.'),
    e('Fluent Bit to Fluentd (Forward)', 'Edge to aggregator pipeline.', codeBlock([
      '# Fluent Bit (edge node): fluent-bit.conf',
      '[INPUT]',
      '    name tail',
      '    path /var/log/myapp/*.log',
      '    tag myapp.*',
      '',
      '[OUTPUT]',
      '    name forward',
      '    match *',
      '    host fluentd-aggregator.example.com',
      '    port 24224',
      '',
      '# Fluentd (aggregator): td-agent.conf',
      '<source>',
      '  @type forward',
      '  port 24224',
      '</source>',
      '',
      '<match myapp.*>',
      '  @type elasticsearch',
      '  host elasticsearch.example.com',
      '  port 9200',
      '</match>'
    ]), 'Fluent Bit sends to Fluentd aggregator via forward protocol for centralized processing.'),
    e('Fluent Bit Metrics Output', 'Monitor Fluent Bit itself via Prometheus.', codeBlock([
      '[INPUT]',
      '    name cpu',
      '    tag cpu_metrics',
      '',
      '[INPUT]',
      '    name mem',
      '    tag mem_metrics',
      '',
      '[OUTPUT]',
      '    name prometheus_exporter',
      '    match *_metrics',
      '    host 0.0.0.0',
      '    port 2021',
      '',
      '# Scrape with Prometheus:',
      '# - job_name: fluentbit',
      '#   static_configs:',
      '#     - targets: ["fluentbit:2021"]'
    ]), 'Fluent Bit exposes internal metrics via Prometheus exporter for self-monitoring.'),
    e('Fluent Bit Amazon S3 Output', 'Ship logs directly to S3.', codeBlock([
      '[INPUT]',
      '    name tail',
      '    path /var/log/myapp/*.log',
      '    tag myapp',
      '',
      '[OUTPUT]',
      '    name s3',
      '    match *',
      '    bucket myapp-logs',
      '    region us-east-1',
      '    total_file_size 50M',
      '    upload_timeout 10m',
      '    compression gzip',
      '    json_date_key timestamp',
      '    store_dir /tmp/fluentbit/s3'
    ]), 'Fluent Bit can directly ship logs to S3 with compression and automatic file rotation.')
  ],
  [
    m('What is Fluent Bit\'s approximate memory footprint?', ['450KB', '60MB', '10MB', '2GB'], 0, 'Fluent Bit has an extremely small memory footprint of approximately 450KB.'),
    m('How is Fluent Bit primarily deployed in Kubernetes?', ['Sidecar', 'DaemonSet', 'Deployment', 'StatefulSet'], 1, 'Fluent Bit is deployed as a DaemonSet — one pod per node collecting all container logs.'),
    m('What is the recommended architecture for Fluent Bit and Fluentd?', ['Fluentd at edge, Fluent Bit as aggregator', 'Fluent Bit at edge, Fluentd as aggregator', 'Both at edge', 'Both as aggregator'], 1, 'Fluent Bit at the edge (lightweight) sends to Fluentd aggregator (full processing).'),
    m('Which is more resource-efficient?', ['Fluentd', 'Fluent Bit', 'Both equal', 'Depends on plugins'], 1, 'Fluent Bit is significantly more resource-efficient (~450KB vs ~60MB).'),
    m('What Fluent Bit filter adds Kubernetes pod metadata?', ['grep', 'kubernetes', 'modify', 'parser'], 1, 'The kubernetes filter enriches log records with pod name, namespace, labels, and container name.'),
    m('What CNCF projects are Fluentd and Fluent Bit?', ['Incubating', 'Graduated', 'Sandbox', 'Retired'], 1, 'Both Fluentd and Fluent Bit are CNCF graduated projects.')
  ]
);

/* =================== TOPIC 14: Jaeger =================== */
addTopic('mon-jaeger', 'Jaeger', 'advanced', 20,
  ['Jaeger is a distributed tracing system open-sourced by Uber Technologies, now a CNCF graduated project.',
   'Architecture: jaeger-agent (sidecar), jaeger-collector (ingest), jaeger-query (API + UI), jaeger-ingester (Kafka pipeline).',
   'Supports multiple storage backends: Elasticsearch (production), Cassandra, and Badger (local).',
   'Key features: root-cause analysis, distributed transaction monitoring, latency optimization, service dependency analysis, performance optimization.'
  ],
  'Jaeger is like an air traffic control radar for microservices. Each flight (request) gets a transponder code (trace ID). Radar screens (Jaeger UI) show every plane\'s path through the airspace, which airports (services) they visited, how long they waited on each runway (span duration), and if any crashed (errors).',
  [
    d('Jaeger Architecture Components', 'Agent: daemon that receives spans from applications via UDP, batches, and sends to collector. Collector: validates, indexes, and stores spans. Can ingest from Kafka for high throughput. Query: serves API and UI for searching/visualizing traces. Ingester: optional component to read from Kafka and write to storage.'),
    d('Jaeger Storage Backends', 'Elasticsearch: production choice — scalable, supports full-text search, retention policies. Cassandra: alternative for high write throughput. Badger: embedded local storage — for development/small deployments. Kafka: intermediate buffer between agent/collector and storage for high-volume deployments.'),
    d('Jaeger Sampling Strategies', 'Probabilistic: sample X% of all traces (e.g., 0.1 = 10%). Rate-limiting: max traces per second (e.g., 10 traces/sec). Remote: collector controls sampling centrally, adaptive sampling. Const: always sample (debug). Always use sampling in production — storing 100% of traces is too expensive.'),
    d('Jaeger UI and Search', 'Service dropdown: select microservice. Operation: select specific operation (endpoint). Tags: filter by key=value (http.status_code=500). Lookback: time range. Min Duration / Max Duration: latency range. Limit: max results. Trace detail page: timeline view, span details, tags, logs, and span relationships.')
  ],
  'Jaeger is the defacto open-source tracing solution alongside Zipkin. Deploy with Elasticsearch backend for production. Use agents as sidecars in Kubernetes. Configure sampling wisely — 100% of errors + 5% of success is a good starting point. The UI provides powerful root-cause analysis. Integrated with OpenTelemetry for instrumentation.',
  [
    q('What is Jaeger?', 'A distributed tracing system open-sourced by Uber, CNCF graduated project.'),
    q('What are Jaeger\'s main components?', 'Agent (sidecar), Collector (ingest), Query (API + UI), Ingester (Kafka pipeline).'),
    q('What is Jaeger\'s recommended production storage?', 'Elasticsearch — scalable with full-text search and retention policies.'),
    q('What is adaptive sampling in Jaeger?', 'Collector controls sampling rates centrally, adjusting based on traffic patterns.'),
    q('How is Jaeger deployed in Kubernetes?', 'Jaeger agent as a sidecar or DaemonSet, collector as Deployment, query as Deployment.'),
    q('What is Jaeger\'s relationship with OpenTelemetry?', 'Jaeger accepts OpenTelemetry protocol natively — OTel SDKs can send traces directly to Jaeger.'),
    q('What is a Jaeger agent?', 'A daemon that receives spans via UDP, batches them, and sends to the collector.'),
    q('What is Jaeger\'s dependency graph?', 'A visual representation of service-to-service communication based on trace data.'),
    q('How do you filter traces in Jaeger UI?', 'By service, operation, tags (key=value), time range, and latency duration.'),
    q('What is the difference between Jaeger and Zipkin?', 'Both are tracing systems. Jaeger has more features (adaptive sampling, Kafka support). Zipkin is simpler, narrower scope.')
  ],
  R(10,35,100,25,'#0070f3','','App','Instrumented') +
  R(10,65,100,25,'#28a745','','Agent','UDP -> batch') +
  R(10,95,100,25,'#ffc107','','Collector','Validate + store') +
  R(10,125,100,25,'#dc3545','','Storage','Elasticsearch') +
  R(10,155,100,25,'#e83e8c','','Query UI','Trace search') +
  A(110,48,130,48) + A(110,78,130,78) + A(110,108,130,108) + A(110,138,130,138) + A(110,168,130,168) +
  R(140,35,250,155,'#17a2b8','','Jaeger Architecture','App -> Agent -> Collector -> Storage (ES) -> Query UI. Distributed tracing, adaptive sampling, dependency graphs.') +
  T(240,220,'Jaeger: Distributed tracing by Uber, CNCF graduated. Agent, Collector, Query, Elasticsearch backend.',9,'#666','middle'),
  [
    e('Jaeger All-in-One (Development)', 'Quick start with Jaeger.', codeBlock([
      '# Run Jaeger all-in-one (includes agent, collector, query, UI)',
      'docker run -d --name jaeger \\',
      '  -e COLLECTOR_ZIPKIN_HOST_PORT=:9411 \\',
      '  -p 5775:5775/udp -p 6831:6831/udp -p 6832:6832/udp \\',
      '  -p 5778:5778 -p 16686:16686 -p 14250:14250 \\',
      '  -p 14268:14268 -p 14269:14269 -p 9411:9411 \\',
      '  jaegertracing/all-in-one:latest',
      '',
      '# UI available at http://localhost:16686',
      '# Send traces to localhost:6831 (UDP) or localhost:14268 (HTTP)'
    ]), 'Jaeger all-in-one Docker image for local development and testing.'),
    e('OpenTelemetry to Jaeger (Node.js)', 'Send OTel traces to Jaeger.', codeBlock([
      "const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');",
      "const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc');",
      '',
      'const provider = new NodeTracerProvider();',
      'provider.addSpanProcessor(',
      '  new BatchSpanProcessor(',
      '    new OTLPTraceExporter({',
      "      url: 'http://jaeger-collector:4317'",
      '    })',
      '  )',
      ');',
      'provider.register();'
    ]), 'OpenTelemetry Node.js SDK exports traces to Jaeger collector via OTLP protocol.'),
    e('Jaeger Sampling Configuration', 'Configure sampling strategies.', codeBlock([
      '# File-based sampling strategy (sampling.json)',
      '{"default_strategy":',
      '  {"type":"probabilistic","param":0.1},',
      '"service_strategies":[',
      '  {"service":"payment","type":"probabilistic","param":0.5},',
      '  {"service":"health-check","type":"const","param":0}',
      ']}',
      '',
      '# Pass to collector:',
      '# --sampling.strategies-file=/etc/jaeger/sampling.json'
    ]), 'Jaeger sampling configuration: 10% default, 50% for payment, 0% for health checks.'),
    e('Jaeger Query API', 'Search traces programmatically.', codeBlock([
      '# Get trace by ID',
      'curl "http://jaeger-query:16686/api/traces/abc123def456"',
      '',
      '# Search traces by service',
      'curl "http://jaeger-query:16686/api/traces?service=payment&limit=10"',
      '',
      '# Search with tag filter',
      'curl "http://jaeger-query:16686/api/traces?service=payment&tags=%7B%22error%22%3A%22true%22%7D"',
      '',
      '# Get services list',
      'curl "http://jaeger-query:16686/api/services"',
      '',
      '# Get operations for a service',
      'curl "http://jaeger-query:16686/api/operations?service=payment"'
    ]), 'Jaeger query API for programmatic access to traces, services, and operations.')
  ],
  [
    m('Who originally created Jaeger?', ['Google', 'Uber', 'Netflix', 'Twitter'], 1, 'Jaeger was open-sourced by Uber Technologies.'),
    m('What is Jaeger\'s status in CNCF?', ['Sandbox', 'Incubating', 'Graduated', 'Retired'], 2, 'Jaeger is a CNCF graduated project.'),
    m('What is the recommended production storage for Jaeger?', ['MySQL', 'PostgreSQL', 'Elasticsearch', 'Redis'], 2, 'Elasticsearch is the recommended production storage backend for Jaeger.'),
    m('What is Jaeger agent used for?', ['Querying traces', 'Receiving spans via UDP and batching', 'Visualizing traces', 'Storing traces'], 1, 'The agent receives spans via UDP from applications, batches them, and sends to collector.'),
    m('What is adaptive sampling?', ['Sampling everything', 'Centrally controlled sampling rates', 'No sampling', 'Manual sampling'], 1, 'Adaptive sampling lets the collector control sampling rates centrally.'),
    m('What OpenTelemetry protocol does Jaeger use?', ['Zipkin', 'OTLP', 'OpenTracing', 'Wavefront'], 1, 'Jaeger natively accepts the OpenTelemetry Protocol (OTLP).')
  ]
);

/* =================== TOPIC 15: Zipkin =================== */
addTopic('mon-zipkin', 'Zipkin', 'advanced', 20,
  ['Zipkin is a distributed tracing system originally built at Twitter, designed to troubleshoot latency issues in microservice architectures.',
   'Architecture: Reporter (in-app), Transport (HTTP/Kafka), Collector (ingest), Storage (Cassandra/Elasticsearch/MySQL), API (query), UI (visualization).',
   'Zipkin uses the Zipkin data model: traces composed of spans with annotations (timestamps) and binary annotations (key-value metadata).',
   'Widely compatible: B3 propagation headers (Zipkin\'s trace context standard), supported by many libraries and frameworks natively.'
  ],
  'Zipkin is like the black box flight recorder for microservices originally designed by Twitter. When a request travels through multiple services, Zipkin captures every hop with timestamps. Imagine shipping a package across the country — Zipkin tells you it spent 2 hours at the Chicago sorting facility and 30 minutes at the Denver one.',
  [
    d('Zipkin Data Model', 'Trace: a tree of spans representing a single request. Span: a unit of work with span ID, parent span ID, trace ID, operation name, timestamps, annotations. Annotation: a timestamped event (cs = client send, cr = client receive, ss = server send, sr = server receive). Binary annotation: key-value metadata (HTTP method, status code, path).'),
    d('B3 Propagation', 'Zipkin\'s trace context propagation format. Headers: x-b3-traceid (trace ID), x-b3-spanid (span ID), x-b3-parentspanid (parent span), x-b3-sampled (sampling decision), x-b3-flags (debug flag). Single header alternative: b3: {trace_id}-{span_id}-{sampled}. Widely adopted beyond Zipkin — many frameworks support B3 natively.'),
    d('Zipkin Storage Options', 'Cassandra: best for high-throughput write workloads (Twitter\'s original choice). Elasticsearch: best for log+trace correlation, full-text search. MySQL: simple, good for development and low-volume. In-memory: development only. Scribe: legacy Facebook log transport. Kafka: intermediate transport for high-availability decoupling.'),
    d('Zipkin vs Jaeger Comparison', 'Zipkin: simpler data model, B3 propagation, narrower scope (pure tracing). Jaeger: richer features (adaptive sampling, Kafka pipeline, service graph), OpenTelemetry support, larger ecosystem. Both are CNCF projects. Zipkin has wider library support for B3 propagation. Jaeger has more active development.')
  ],
  'Zipkin pioneered distributed tracing in production at Twitter. Its B3 propagation format is widely adopted. For simple tracing needs with broad library compatibility, Zipkin excels. For advanced features (adaptive sampling, Kafka pipeline, service graphs), Jaeger offers more. Both integrate with OpenTelemetry.',
  [
    q('What is Zipkin?', 'A distributed tracing system originally built at Twitter for troubleshooting latency issues.'),
    q('What is the Zipkin data model?', 'Traces composed of spans with annotations (timestamps) and binary annotations (key-value metadata).'),
    q('What is B3 propagation?', 'Zipkin\'s trace context format using x-b3-* HTTP headers (traceid, spanid, parentspanid, sampled, flags).'),
    q('What are Zipkin annotations?', 'Timestamped events: cs (client send), cr (client receive), ss (server send), sr (server receive).'),
    q('What storage backends does Zipkin support?', 'Cassandra (high throughput), Elasticsearch (full-text search), MySQL (development), in-memory.'),
    q('What is the difference between Zipkin and Jaeger?', 'Zipkin: simpler, B3 propagation, narrower scope. Jaeger: richer features, adaptive sampling, larger ecosystem.'),
    q('How does Zipkin propagate trace context?', 'Via B3 HTTP headers: x-b3-traceid, x-b3-spanid, x-b3-parentspanid, x-b3-sampled.'),
    q('What is Zipkin\'s status in CNCF?', 'Zipkin is a CNCF graduated project.'),
    q('What is the Zipkin UI?', 'A web interface for searching and visualizing traces with timeline view and dependency graphs.'),
    q('How do you instrument Zipkin?', 'Using Brave (Java), Zipkin libraries for Go/Python/Node.js, or OpenTelemetry with Zipkin exporter.')
  ],
  R(10,35,100,25,'#0070f3','','App','Brave SDK') +
  R(10,65,100,25,'#28a745','','Reporter','In-app spans') +
  R(10,95,100,25,'#ffc107','','Transport','HTTP / Kafka') +
  R(10,125,100,25,'#dc3545','','Collector','Ingest + store') +
  R(10,155,100,25,'#e83e8c','','Storage','Cassandra / ES') +
  A(110,48,130,48) + A(110,78,130,78) + A(110,108,130,108) + A(110,138,130,138) + A(110,168,130,168) +
  R(140,35,250,155,'#17a2b8','','Zipkin Architecture','App -> Reporter -> Transport -> Collector -> Storage -> API -> UI. B3 propagation headers. CNCF graduated.') +
  T(240,220,'Zipkin: Distributed tracing by Twitter. B3 propagation, annotations, Cassandra/ES storage. CNCF graduated.',9,'#666','middle'),
  [
    e('Zipkin Quick Start (Docker)', 'Run Zipkin with Elasticsearch.', codeBlock([
      '# Zipkin with Elasticsearch backend',
      'docker run -d --name zipkin \\',
      '  -e STORAGE_TYPE=elasticsearch \\',
      '  -e ES_HOSTS=http://elasticsearch:9200 \\',
      '  -p 9411:9411 \\',
      '  openzipkin/zipkin:latest',
      '',
      '# UI: http://localhost:9411/zipkin',
      '# API: http://localhost:9411/api/v2/',
      '# Accepts spans at /api/v2/spans'
    ]), 'Run Zipkin with Elasticsearch storage backend via Docker.'),
    e('B3 Propagation Headers', 'Trace context in HTTP headers.', codeBlock([
      '# B3 Single Header format',
      'b3: 4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-1',
      '',
      '# B3 Multi-Header format',
      'x-b3-traceid: 4bf92f3577b34da6a3ce929d0e0e4736',
      'x-b3-spanid: 00f067aa0ba902b7',
      'x-b3-parentspanid: 0e7f8f1b6b9a2d3c',
      'x-b3-sampled: 1',
      '',
      '# In HTTP request:',
      'GET /api/orders HTTP/1.1',
      'Host: payment-service',
      'x-b3-traceid: 4bf92f3577b34da6a3ce929d0e0e4736',
      'x-b3-spanid: 00f067aa0ba902b7',
      'x-b3-sampled: 1'
    ]), 'B3 propagation headers in single and multi-header formats for trace context propagation.'),
    e('Zipkin API (Send Spans)', 'Post spans to Zipkin collector.', codeBlock([
      'POST /api/v2/spans',
      'Content-Type: application/json',
      '',
      '[{',
      '  "id": "00f067aa0ba902b7",',
      '  "traceId": "4bf92f3577b34da6a3ce929d0e0e4736",',
      '  "parentId": "0e7f8f1b6b9a2d3c",',
      '  "name": "get /api/orders",',
      '  "timestamp": 1705314600000000,',
      '  "duration": 150000,',
      '  "localEndpoint": {',
      '    "serviceName": "order-service"',
      '  },',
      '  "tags": {',
      '    "http.method": "GET",',
      '    "http.path": "/api/orders",',
      '    "http.status_code": "200"',
      '  }',
      '}]'
    ]), 'Zipkin API v2 span format for sending trace data to the collector.'),
    e('Brave (Java Zipkin Client)', 'Instrument Java applications.', codeBlock([
      '// Brave is the Java instrumentation library for Zipkin',
      'import brave.Tracing;',
      'import brave.Span;',
      '',
      'Tracing tracing = Tracing.newBuilder()',
      '  .localServiceName("order-service")',
      '  .spanReporter(AsyncReporter.create(URLConnectionSender.create("http://zipkin:9411/api/v2/spans")))',
      '  .build();',
      '',
      'Span span = tracing.tracer().newTrace()',
      '  .name("process-order")',
      '  .tag("order.id", "12345")',
      '  .start();',
      '',
      'try {',
      '  // business logic',
      '  span.tag("result", "success");',
      '} catch (Exception e) {',
      '  span.tag("error", e.getMessage());',
      '  span.error(e);',
      '} finally {',
      '  span.finish();',
      '}'
    ]), 'Brave Java client for Zipkin — create spans, add tags, record errors, and send to Zipkin.')
  ],
  [
    m('What company originally created Zipkin?', ['Google', 'Twitter', 'Uber', 'Facebook'], 1, 'Zipkin was originally built at Twitter for distributed tracing.'),
    m('What is B3 in Zipkin context?', ['A storage format', 'Zipkin\'s trace propagation headers', 'A data model', 'A UI theme'], 1, 'B3 is Zipkin\'s trace context propagation format using x-b3-* HTTP headers.'),
    m('What are Zipkin annotations?', ['Code comments', 'Timestamped events (cs, cr, ss, sr)', 'Field tags', 'Span IDs'], 1, 'Annotations are standard timestamped events marking client/server send/receive.'),
    m('What is Zipkin\'s CNCF status?', ['Incubating', 'Graduated', 'Sandbox', 'Not a CNCF project'], 1, 'Zipkin is a CNCF graduated project.'),
    m('What is the recommended Zipkin storage for high-throughput production?', ['MySQL', 'Cassandra', 'PostgreSQL', 'SQLite'], 1, 'Cassandra is the original high-throughput storage for Zipkin at Twitter scale.'),
    m('What Java library is used for Zipkin instrumentation?', ['Brave', 'Jaeger', 'OpenTracing', 'OpenTelemetry'], 0, 'Brave is the standard Java instrumentation library for Zipkin.')
  ]
);

/* =================== TOPIC 16: OpenTelemetry =================== */
addTopic('mon-opentelemetry', 'OpenTelemetry', 'advanced', 25,
  ['OpenTelemetry (OTel) is a vendor-neutral, CNCF graduated observability framework for generating, collecting, and exporting telemetry data (traces, metrics, logs).',
   'Result of merging OpenTracing and OpenCensus in 2019. Provides a single set of APIs, SDKs, and collectors for instrumenting applications.',
   'Components: API (interfaces), SDK (implementation), Collector (receives/processes/exports telemetry), Instrumentation libraries (auto-instrumentation for frameworks).',
   'Exporters send data to any backend: Jaeger, Zipkin, Prometheus, Grafana, Datadog, New Relic, AWS X-Ray, Azure Monitor, GCP, and more.'
  ],
  'OpenTelemetry is like a universal adapter for observability. Imagine every country (observability tool) has a different power outlet shape (data format). OpenTelemetry is a universal power strip — you plug your appliance (app) into it, and it has adapters for every country. If you switch countries (backend tools), you just change the adapter, not the appliance.',
  [
    d('OpenTelemetry Architecture', 'API: language-specific interfaces for creating traces, metrics, and logs (no dependencies). SDK: implementation of the API with processing pipelines, sampling, and batching. Collector: vendor-agnostic server that receives, processes, and exports telemetry data. Instrumentation: libraries that automatically generate telemetry from popular frameworks (Express, gRPC, HTTP, Redis, MySQL).'),
    d('OpenTelemetry Signals', 'Traces: distributed tracing with spans, context propagation (W3C Trace Context). Metrics: counters, gauges, histograms, with exemplar support. Logs: structured log records with trace context correlation. Future: baggage (context propagation for arbitrary key-value pairs). All three signals can be correlated via trace_id and span_id.'),
    d('OTLP (OpenTelemetry Protocol)', 'Standard protocol for transmitting telemetry data between clients and collector. Supports gRPC and HTTP/protobuf. Specification defines data model, wire format, and communication protocol. Collector can receive OTLP and export to any backend. Enables vendor-neutral instrumentation — write once, export anywhere.'),
    d('OpenTelemetry Collector', 'Receiver: accepts data via OTLP, Jaeger, Zipkin, Prometheus, Kafka. Processor: batch, filter, transform, sample, add metadata, redact sensitive data. Exporter: sends to Jaeger, Zipkin, Prometheus, Elasticsearch, Loki, Datadog, New Relic, AWS X-Ray, GCP, Azure. Pipeline: Receiver -> Processor -> Exporter. Can be deployed as agent (per-node) or gateway (central).'),
    d('Semantic Conventions', 'Standardized attribute names for common concepts across languages and signals. HTTP: http.method, http.url, http.status_code. Database: db.system, db.name, db.statement. Messaging: messaging.system, messaging.destination. RPC: rpc.system, rpc.service. General: service.name, deployment.environment, cloud.provider. Using conventions ensures consistent data across the organization.')
  ],
  'OpenTelemetry is the future of observability instrumentation. Instrument once with OTel, export to any backend. Use auto-instrumentation to get started quickly, add manual spans for critical business logic. Deploy the Collector for vendor-neutral data routing. Follow semantic conventions for consistent data. OTel eliminates vendor lock-in for observability.',
  [
    q('What is OpenTelemetry?', 'A vendor-neutral, CNCF graduated observability framework for generating, collecting, and exporting telemetry data.'),
    q('What signals does OpenTelemetry support?', 'Traces (distributed tracing), Metrics (counters, gauges, histograms), Logs (structured log records).'),
    q('What is OTLP?', 'OpenTelemetry Protocol — a standard protocol for transmitting telemetry data between clients and collector.'),
    q('What is the OpenTelemetry Collector?', 'A vendor-agnostic server that receives, processes, and exports telemetry data to any backend.'),
    q('What are semantic conventions?', 'Standardized attribute names (http.method, db.system) for consistency across languages and signals.'),
    q('What is auto-instrumentation?', 'Libraries that automatically generate telemetry from popular frameworks without code changes.'),
    q('What is the relationship between OTel and Jaeger/Zipkin?', 'OTel instruments and exports; Jaeger/Zipkin store and visualize. OTel can export to both.'),
    q('What is the OpenTelemetry API vs SDK?', 'API: interfaces for creating telemetry (no dependencies). SDK: implementation with processors, samplers, exporters.'),
    q('How do you correlate traces and logs in OTel?', 'Logs include trace_id and span_id fields. OTel logging SDKs automatically inject trace context.'),
    q('What companies support OpenTelemetry?', 'Most major observability vendors: Datadog, New Relic, AWS, Azure, GCP, Grafana, Splunk, Elastic, Honeycomb.')
  ],
  R(10,35,105,25,'#0070f3','','API','Interfaces') +
  R(115,35,105,25,'#28a745','','SDK','Implementation') +
  R(220,35,105,25,'#ffc107','','Collector','Agnostic router') +
  R(10,65,105,25,'#dc3545','','Traces','Distributed') +
  R(115,65,105,25,'#e83e8c','','Metrics','Counters/gauges') +
  R(220,65,105,25,'#6610f2','','Logs','Structured') +
  R(10,95,315,25,'#17a2b8','','OTLP Protocol','Vendor-neutral: OTLP -> Collector -> Any backend') +
  R(10,130,315,30,'#17a2b8','','OpenTelemetry Ecosystem','Single instrumentation. Export anywhere. Auto-instrumentation, semantic conventions, Collector. CNCF graduated.') +
  T(240,200,'OpenTelemetry: Vendor-neutral observability. One instrumentation for traces, metrics, and logs. CNCF graduated.',9,'#666','middle'),
  [
    e('OpenTelemetry Auto-Instrumentation (Node.js)', 'Zero-code tracing.', codeBlock([
      '# Start your app with auto-instrumentation',
      '# node --require @opentelemetry/auto-instrumentations-node/register app.js',
      '',
      '# Or programmatically:',
      "const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');",
      "const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');",
      "const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');",
      "const { BatchSpanProcessor } = require('@opentelemetry/sdk-trace-base');",
      '',
      'const provider = new NodeTracerProvider();',
      'provider.addSpanProcessor(new BatchSpanProcessor(',
      "  new OTLPTraceExporter({ url: 'http://otel-collector:4318/v1/traces' })",
      '));',
      'provider.register();',
      'provider.registerInstrumentations({',
      '  instrumentations: [getNodeAutoInstrumentations()],',
      '});'
    ]), 'OpenTelemetry auto-instrumentation adds tracing to Express, HTTP, gRPC, Redis, and more without code changes.'),
    e('OpenTelemetry Collector Configuration', 'Receive OTLP and export to multiple backends.', codeBlock([
      'receivers:',
      '  otlp:',
      '    protocols:',
      '      grpc:',
      '        endpoint: 0.0.0.0:4317',
      '      http:',
      '        endpoint: 0.0.0.0:4318',
      '',
      'processors:',
      '  batch:',
      '    timeout: 1s',
      '    send_batch_size: 1024',
      '',
      'exporters:',
      '  jaeger:',
      '    endpoint: jaeger:14250',
      '  prometheus:',
      '    endpoint: 0.0.0.0:8889',
      '  otlp:',
      '    endpoint: another-collector:4317',
      '',
      'service:',
      '  pipelines:',
      '    traces:',
      '      receivers: [otlp]',
      '      processors: [batch]',
      '      exporters: [jaeger, otlp]',
      '    metrics:',
      '      receivers: [otlp]',
      '      processors: [batch]',
      '      exporters: [prometheus]'
    ]), 'OTel Collector config: receive OTLP traces+metrics, batch, export to Jaeger + Prometheus + another collector.'),
    e('OpenTelemetry Metrics (Python)', 'Create and export metrics.', codeBlock([
      'from opentelemetry import metrics',
      'from opentelemetry.exporter.otlp.proto.grpc.metric_exporter import OTLPMetricExporter',
      'from opentelemetry.sdk.metrics import MeterProvider',
      'from opentelemetry.sdk.metrics.export import PeriodicExportingMetricReader',
      '',
      'exporter = OTLPMetricExporter(endpoint="http://otel-collector:4317", insecure=True)',
      'reader = PeriodicExportingMetricReader(exporter, export_interval_millis=5000)',
      'provider = MeterProvider(metric_readers=[reader])',
      'metrics.set_meter_provider(provider)',
      '',
      'meter = metrics.get_meter("myapp", "1.0.0")',
      '',
      '# Counter',
      'request_counter = meter.create_counter("http.requests", description="Total requests")',
      'request_counter.add(1, {"method": "GET", "status": "200"})',
      '',
      '# Histogram',
      'latency = meter.create_histogram("http.latency", unit="ms", description="Request latency")',
      'latency.record(150, {"method": "GET"})',
      '',
      '# Gauge (ObservableGauge)',
      'cpu_usage = meter.create_observable_gauge("cpu.usage", callbacks=[get_cpu_usage])'
    ]), 'OpenTelemetry Python SDK creating counter, histogram, and gauge metrics exported via OTLP.'),
    e('OpenTelemetry Trace Context in Logs', 'Correlate logs with traces.', codeBlock([
      '// Automatically include trace context in logs',
      '// With OpenTelemetry logging SDK',
      '',
      "const { trace } = require('@opentelemetry/api');",
      '',
      '// Log with OTel logger (auto-includes trace context)',
      'logger.warn("Payment processing delayed", {',
      '  orderId: 12345,',
      '  delay_ms: 1500,',
      '  // trace_id and span_id automatically injected',
      '});',
      '',
      '// JSON log output:',
      '{',
      '  "level": "warn",',
      '  "message": "Payment processing delayed",',
      '  "orderId": 12345,',
      '  "delay_ms": 1500,',
      '  "trace_id": "4bf92f3577b34da6a3ce929d0e0e4736",',
      '  "span_id": "00f067aa0ba902b7"',
      '}',
      '',
      '// In Kibana/Elasticsearch:',
      '// Search by trace_id to see all logs for a request'
    ]), 'OpenTelemetry automatically injects trace_id and span_id into log records for full correlation.'),
    e('Semantic Conventions Example', 'Standard attribute naming.', codeBlock([
      '# HTTP semantic conventions',
      'http.method: GET',
      'http.url: https://api.example.com/orders',
      'http.status_code: 200',
      'http.request_content_length: 1024',
      '',
      '# Database semantic conventions',
      'db.system: postgresql',
      'db.name: orders_db',
      'db.statement: SELECT * FROM orders WHERE id = ?',
      '',
      '# Messaging semantic conventions',
      'messaging.system: kafka',
      'messaging.destination: orders-topic',
      'messaging.message_id: abc-123',
      '',
      '# General resource conventions',
      'service.name: payment-service',
      'service.version: 1.2.3',
      'deployment.environment: production',
      'cloud.provider: aws',
      'cloud.region: us-east-1'
    ]), 'OpenTelemetry semantic conventions standardize attribute names across all languages and signals.')
  ],
  [
    m('What is OpenTelemetry?', ['A specific tracing tool', 'A vendor-neutral observability framework', 'A metrics database', 'A log shipper'], 1, 'OpenTelemetry is a vendor-neutral, CNCF graduated observability framework.'),
    m('What are the three OTel signals?', ['CPU, Memory, Disk', 'Traces, Metrics, Logs', 'Errors, Warnings, Info', 'JSON, XML, CSV'], 1, 'OpenTelemetry supports Traces, Metrics, and Logs as its three signals.'),
    m('What is OTLP?', ['OpenTelemetry Protocol', 'Open Tracing Library Protocol', 'Observability Tool Link Protocol', 'Open Telemetry Log Processor'], 0, 'OTLP is the OpenTelemetry Protocol for transmitting telemetry data.'),
    m('What is the OpenTelemetry Collector?', ['A storage backend', 'A vendor-agnostic telemetry processor/exporter', 'A visualization tool', 'An alert manager'], 1, 'The Collector receives, processes, and exports telemetry data to any backend.'),
    m('What are semantic conventions?', ['Community rules', 'Standardized attribute names for consistency', 'Company policies', 'Legal agreements'], 1, 'Semantic conventions standardize attribute names like http.method, db.system across all signals.'),
    m('What does auto-instrumentation mean?', ['Manual code changes', 'Automatic telemetry generation from frameworks', 'Automatic deployment', 'Self-hosted instrumentation'], 1, 'Auto-instrumentation libraries automatically generate telemetry from popular frameworks without code changes.')
  ]
);

// ---- GENERATE ----
var dataDir = __dirname;

var lines = [];
lines.push('var TOPICS_DATA = TOPICS_DATA || {};');
lines.push('TOPICS_DATA["monitoring"] = TOPICS_DATA["monitoring"] || {};');
for (var id in topics) {
  lines.push('TOPICS_DATA["monitoring"]["' + id + '"] = ' + JSON.stringify(topics[id]) + ';');
}
fs.writeFileSync(dataDir + '/topics-data.js', lines.join('\n'));

fs.writeFileSync(dataDir + '/topics.json', JSON.stringify({ topics: topicList }, null, 2));

console.log('Generated Monitoring topics: ' + Object.keys(topics).length);

