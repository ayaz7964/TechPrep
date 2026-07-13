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

/* =================== TOPIC 1: DOCUMENTS =================== */
addTopic('mongodb-documents', 'Documents', 'beginner', 15,
  ['A MongoDB document is a JSON-like data structure (BSON) composed of field-value pairs, analogous to a row in relational databases.',
   'Documents are stored in collections and can have varying fields (schema-less), supporting nested objects, arrays, and a wide range of data types.',
   'Each document has a unique _id field (ObjectId by default) that serves as the primary key within a collection.',
   'Documents can contain embedded documents (sub-documents) and arrays, enabling rich data modeling without joins.'
  ],
  'A MongoDB document is like a passport: it contains various fields (name, photo, stamps) that can be different for each person, and some fields can have sub-information (like visa pages with multiple stamps).',
  [
    d('Document Structure', 'Documents are BSON objects structured as key-value pairs. Keys are strings, values can be various types: String, Number, Boolean, Date, ObjectId, Array, Embedded Document, Null, Binary, Regex, Code, etc. Maximum document size is 16MB (BSON limit).'),
    d('The _id Field', 'Every document requires a unique _id field as the primary key. By default, MongoDB generates an ObjectId (12-byte value: timestamp + machine + process + counter). You can provide custom _id values (UUIDs, integers, strings). The _id is immutable and indexed automatically.'),
    d('Dynamic Schema', 'Documents in the same collection can have different fields. One document may have 10 fields while another has 15. This flexibility (schema-less design) enables rapid iteration and polymorphic data. Use schema validation for data consistency when needed.'),
    d('BSON Data Types', 'MongoDB stores data as BSON (Binary JSON), extending JSON with additional types: ObjectId (12-byte unique identifier), Date (millisecond precision), BinData, Regex, Code (JavaScript), Timestamp. BSON enables efficient encoding/decoding and rich query operations.'),
    d('Document Size and Structure', 'Max 16MB per document. For large data, use GridFS (splits files into chunks stored as separate documents). Nested documents count toward the 16MB limit. Use references for large or frequently accessed sub-documents.')
  ],
  'MongoDB documents are the fundamental unit of data. Their flexible schema, rich data types, and embedded document support make MongoDB adaptable to diverse application needs.',
  [
    q('What is a MongoDB document?', 'A document is a JSON-like data structure (BSON format) composed of field-value pairs. It is the basic unit of data in MongoDB, analogous to a row in relational databases.'),
    q('What is the _id field?', 'The _id field is the primary key for a MongoDB document. It is automatically indexed and must be unique within a collection. Default _id values are ObjectIds (12-byte).'),
    q('What is the maximum document size?', '16MB. For data exceeding 16MB, use GridFS which splits files into chunks and stores them across multiple documents.'),
    q('What is BSON?', 'BSON (Binary JSON) is the binary serialization format MongoDB uses to store documents. It extends JSON with additional types.'),
    q('What is an embedded document?', 'An embedded document is a document nested inside another document as a field value. MongoDB supports up to 100 levels of nesting.'),
    q('What data types does MongoDB support?', 'String, Number (int, long, double, decimal), Boolean, Date, ObjectId, Array, Embedded Document, Null, Binary Data, Regular Expression, JavaScript Code, Timestamp, Min/Max keys.'),
    q('How is a document different from a JSON object?', 'MongoDB documents are stored as BSON which supports more types than JSON (ObjectId, Date, Binary). BSON documents are binary-encoded for efficient parsing.'),
    q('What is document atomicity?', 'Write operations are atomic at the document level. If you update multiple fields in a single document, either all changes apply or none.'),
    q('How do you reference another document?', 'Store the referenced document\'s _id as a field value. Use $lookup aggregation stage for joins similar to SQL JOIN.'),
    q('Can a document have no _id?', 'No. Every MongoDB document must have an _id field. If not provided, MongoDB generates an ObjectId automatically.')
  ],
  R(10,40,140,35,'#47A248','','Document','{ field: value }') +
  R(10,85,140,35,'#0070f3','','_id: ObjectId','Primary Key') +
  R(10,130,140,35,'#28a745','','Embedded Doc','Nested') +
  R(10,175,140,35,'#ffc107','','Array Fields','[...]') +
  A(150,58,180,58) + A(150,103,180,103) + A(150,148,180,148) + A(150,193,180,193) +
  R(190,40,160,175,'#e83e8c','','BSON Document','16MB / Flexible schema / Rich types') +
  T(240,230,'Documents: BSON objects with flexible schema, ObjectId, embedded docs.',9,'#666','middle'),
  [
    e('Basic Document Structure', 'Simple user document.', codeBlock([
      '{ _id: ObjectId("..."), name: "Alice", email: "alice@example.com", age: 30, isActive: true }'
    ]), 'Simple document with _id, string, number, and boolean fields.'),
    e('Document with Embedded Doc', 'Address nested in user.', codeBlock([
      '{ _id: ObjectId("..."), name: "Bob", address: { street: "123 Main St", city: "NYC", zip: "10001" } }'
    ]), 'Address is an embedded sub-document within the user document.'),
    e('Document with Array', 'Tags and scores.', codeBlock([
      '{ _id: ObjectId("..."), name: "Charlie", tags: ["developer", "nodejs"], scores: [85, 92, 78] }'
    ]), 'Arrays store multiple values. MongoDB supports array queries with $in, $all, $size.'),
    e('Custom _id Value', 'Using UUID as _id.', codeBlock([
      '{ _id: UUID("3b241101-e2bb-4255-8caf-4136c566a962"), name: "Doc with UUID", createdAt: new Date() }'
    ]), 'Custom _id using UUID instead of default ObjectId. Must be unique.'),
    e('Nested Arrays and Documents', 'Order with items.', codeBlock([
      '{ _id: ObjectId("..."), order: { items: [{ product: "Widget", qty: 2, price: 9.99 }], total: 44.97 } }'
    ]), 'Arrays can contain embedded documents. Supports queries on nested fields using dot notation.')
  ],
  [
    m('What is the basic unit of data in MongoDB?', ['Collection', 'Document', 'Field', 'Object'], 1, 'Document is the basic unit of data.'),
    m('What is the default _id type?', ['UUID', 'String', 'ObjectId', 'Integer'], 2, 'Default _id is an ObjectId.'),
    m('What is the maximum document size?', ['4MB', '8MB', '16MB', '64MB'], 2, 'Maximum document size is 16MB.'),
    m('How does MongoDB store documents?', ['JSON', 'XML', 'BSON', 'CSV'], 2, 'Documents are stored in BSON format.'),
    m('Are write operations atomic at the document level?', ['Yes', 'No', 'Only for inserts', 'Only for updates'], 0, 'Write operations are atomic at the single document level.'),
    m('What is an ObjectId composed of?', ['Random bytes', 'Timestamp + machine + process + counter', 'UUID v4', 'Hash of fields'], 1, 'ObjectId: 4 timestamp, 5 machine/process, 3 counter.')
  ]
);

/* =================== TOPIC 2: COLLECTIONS =================== */
addTopic('mongodb-collections', 'Collections', 'beginner', 15,
  ['Collections are groupings of MongoDB documents, analogous to tables in relational databases but without a fixed schema.',
   'Collections are created implicitly when the first document is inserted, or explicitly using db.createCollection() with options.',
   'Unlike SQL tables, collections do not enforce a schema; documents within a collection can have different fields and structures.',
   'Collections support options: capped (fixed-size, FIFO), collation (language-specific sorting), validation, and TTL indexes.'
  ],
  'A collection is like a folder on your computer. You can put different types of files (documents) in the same folder, each with different content and structure.',
  [
    d('Implicit vs Explicit Creation', 'Collections are created automatically when you insert a document into a non-existent collection. For custom options, use db.createCollection(\'name\', { options }). Options must be set at creation time. Dropping and recreating is the only way to change options.'),
    d('Capped Collections', 'Fixed-size collections that maintain insertion order and automatically remove oldest documents when size limit is reached. Useful for logging, cache data, and real-time analytics. Operations on capped collections are generally faster. Cannot be sharded.'),
    d('Collection Options', 'capped (boolean + size + max documents), collation (locale, strength for sorting), validation (validator expression, validationLevel, validationAction), viewOn (create as view), pipeline (aggregation for views). Options are set at creation and cannot be modified.'),
    d('Schema Validation', 'MongoDB 3.2+ supports schema validation using JSON Schema or query operators. Options: validator (validation rules), validationLevel (strict, moderate, off), validationAction (error, warn). Apply validation to enforce data quality while maintaining schema flexibility.'),
    d('Collections vs SQL Tables', 'Collections do not require schema definition. Documents can have different fields. No foreign key constraints. No JOIN support natively (use $lookup). Collections are more flexible but require application-level integrity.')
  ],
  'Collections are containers for MongoDB documents. While they offer schema flexibility, adding schema validation provides structure when needed.',
  [
    q('What is a MongoDB collection?', 'A collection is a group of MongoDB documents, similar to a table in relational databases. Collections do not enforce a schema.'),
    q('How are collections created?', 'Implicitly on first insert, or explicitly using db.createCollection(\'name\', { options }). Explicit creation is needed for capped collections and validation rules.'),
    q('What is a capped collection?', 'A fixed-size collection that maintains insertion order. When full, oldest documents are automatically removed. Ideal for logs and cache.'),
    q('What is schema validation?', 'Defining rules for document structure using JSON Schema or query operators. Set at collection creation using $jsonSchema.'),
    q('What is the difference between a collection and a SQL table?', 'Collections have no fixed schema, no foreign keys, no native JOINs, and support nested/array data natively.'),
    q('Can you change collection options after creation?', 'Most options cannot be modified after creation. Drop and recreate to change. Validation rules can be modified with collMod.'),
    q('What is collation?', 'Language-specific rules for string comparison. Options include locale, strength (accent/case sensitivity). Set at collection or operation level.'),
    q('How do you list all collections?', 'Use db.getCollectionNames() or show collections in the shell. For Node.js: db.listCollections().toArray().'),
    q('What is a TTL index?', 'An index on a Date field that automatically removes documents after a specified number of seconds. Useful for session data.'),
    q('How do you rename a collection?', 'Use db.collection.renameCollection(\'newName\'). Cannot rename across databases.')
  ],
  R(10,40,140,35,'#47A248','','Collection','Documents Group') +
  R(10,85,140,35,'#0070f3','','Implicit','Auto-created') +
  R(10,130,140,35,'#28a745','','Explicit','db.createCollection()') +
  R(10,175,140,35,'#ffc107','','Options','Capped/Validation') +
  A(150,58,180,58) + A(150,103,180,103) + A(150,148,180,148) + A(150,193,180,193) +
  R(190,40,200,175,'#e83e8c','','Collection Features','Schema-less / Capped / Validation / TTL / Collation') +
  T(240,230,'Collections: Group documents, create implicitly/with options, schema validation.',9,'#666','middle'),
  [
    e('Implicit Creation', 'Insert into non-existent collection.', codeBlock([
      'db.users.insertOne({ name: "Alice" }); // Creates "users" collection'
    ]), 'Collection created automatically on first insert.'),
    e('Explicit Capped Collection', '1MB max, 5000 docs max.', codeBlock([
      'db.createCollection("logs", { capped: true, size: 1048576, max: 5000 });'
    ]), 'Creates capped collection limited to 1MB and 5000 documents.'),
    e('Schema Validation', 'Enforcing structure with $jsonSchema.', codeBlock([
      'db.createCollection("users", { validator: { $jsonSchema: { bsonType: "object", required: ["name", "email"], properties: { name: { bsonType: "string" }, email: { bsonType: "string" } } } } });'
    ]), 'Enforces required fields using JSON Schema validation.'),
    e('TTL Index', 'Auto-expire after 24 hours.', codeBlock([
      'db.session.createIndex({ createdAt: 1 }, { expireAfterSeconds: 86400 });'
    ]), 'Documents auto-removed 24 hours after createdAt.'),
    e('Collation', 'Case-insensitive sorting.', codeBlock([
      'db.createCollection("articles", { collation: { locale: "en", strength: 2 } });'
    ]), 'Collation enables case-insensitive string comparison.')
  ],
  [
    m('How are collections created by default?', ['Explicitly by user', 'Implicitly on first insert', 'Only via createCollection', 'On database creation'], 1, 'Collections are created implicitly on first insert.'),
    m('What is a capped collection?', ['Unlimited size', 'Fixed-size, auto-removes oldest', 'Encrypted', 'Temporary'], 1, 'Capped collections auto-remove oldest documents when full.'),
    m('What does schema validation do?', ['Creates indexes', 'Validates document structure', 'Speeds up queries', 'Replicates data'], 1, 'Schema validation enforces document structure rules.'),
    m('When is explicit creation required?', ['Always', 'For capped/validation', 'For simple collections', 'Never'], 1, 'Explicit creation needed for capped, validation, collation.'),
    m('What does collation define?', ['Document relationships', 'Sorting rules', 'Index types', 'Replication'], 1, 'Collation defines language-specific sorting rules.'),
    m('Which is NOT a collection type?', ['Capped', 'Regular', 'Sharded', 'Encrypted'], 3, 'Encrypted is not a collection type. Sharded collections exist.')
  ]
);

/* =================== TOPIC 3: BSON =================== */
addTopic('mongodb-bson', 'BSON', 'intermediate', 20,
  ['BSON (Binary JSON) is the binary serialization format MongoDB uses to store documents and communicate between clients and servers.',
   'BSON extends JSON with additional data types: ObjectId, Date, Int32, Int64, Double, Decimal128, Binary, Regex, JavaScript Code, Timestamp.',
   'BSON is designed for fast traversal, efficient encoding/decoding, and supports rich querying with type-specific operators.',
   'The Node.js BSON library provides serialization/deserialization for MongoDB drivers and can be used independently.'
  ],
  'BSON is like a special postal code for MongoDB. It converts readable data into a compact binary format that MongoDB can process very quickly, while supporting special types like dates and IDs that regular JSON cannot.',
  [
    d('BSON vs JSON', 'BSON is binary, JSON is text. BSON supports more types (ObjectId, Date, Binary). BSON encodes/decodes faster. BSON is slightly larger than JSON for simple data due to type metadata. BSON supports null bytes for efficient field skipping.'),
    d('BSON Data Types', 'String (UTF-8), Double (64-bit), Int32, Int64, Decimal128, Boolean, Date (ms since epoch), ObjectId (12 bytes), Binary, Regex, JavaScript, Timestamp, Null, Min/Max keys, Array, Embedded Document.'),
    d('ObjectId Structure', '12 bytes: 4-byte timestamp (seconds since Unix epoch), 5-byte random value (machine + process), 3-byte incrementing counter. ObjectIds are generated client-side, enabling distributed ID generation without coordination.'),
    d('Decimal128 for Financial Data', '128-bit decimal floating-point representation. Provides exact precision for financial calculations. Avoids floating-point rounding errors (0.1 + 0.2 !== 0.3). Use for monetary values and tax calculations.'),
    d('BSON Binary Subtypes', 'Generic (0), Function (1), Binary Old (2), UUID Old (3), UUID (4), MD5 (5), Encrypted (6), Column (7), Sensitive (8). Use UUID subtype 4 for standard UUID representation.')
  ],
  'BSON is the foundation of MongoDB\'s performance and flexibility. Understanding BSON types is essential for efficient schema design and correct data handling.',
  [
    q('What is BSON?', 'Binary JSON, the binary serialization format MongoDB uses. Extends JSON with additional types like ObjectId, Date, Decimal128.'),
    q('How is BSON different from JSON?', 'BSON is binary (faster parse), supports more types, includes field length prefixes for fast traversal, and is slightly larger due to type metadata.'),
    q('What is an ObjectId?', 'A 12-byte BSON type used as default _id. Composed of timestamp (4 bytes) + random (5 bytes) + counter (3 bytes). Generated client-side.'),
    q('When should you use Decimal128?', 'For monetary values and financial calculations requiring exact decimal precision. Avoids floating-point rounding errors.'),
    q('What is the BSON size limit?', '16MB for documents. BSON objects have a 32-bit size field, limiting to ~4GB theoretically.'),
    q('What BSON type for UUIDs?', 'UUID subtype 4 is the standard BSON binary subtype for UUIDs.'),
    q('How does BSON handle dates?', 'BSON Date is a 64-bit integer representing milliseconds since Unix epoch. Stored in UTC.'),
    q('What are MinKey and MaxKey?', 'Special BSON types that compare less than or greater than all other values. Used in sharding range boundaries.'),
    q('How to serialize BSON in Node.js?', 'Use the mongodb driver BSON library: const { serialize, deserialize } = require(\'bson\');'),
    q('What is the Timestamp BSON type?', 'A 64-bit value used internally by MongoDB for replication oplog entries. Not recommended for application use.')
  ],
  R(10,40,140,35,'#47A248','','JSON Text','{"name":"Bob"}') +
  A(150,58,180,58) +
  R(190,40,140,35,'#0070f3','','BSON Binary','Binary Encode') +
  A(330,58,360,58) +
  R(370,40,100,35,'#ffc107','','Types','+ObjectId +Date') +
  R(230,105,140,35,'#28a745','','Faster Parsing','Traversable') +
  T(240,170,'BSON: Binary JSON with extended types, fast parsing, compact storage.',9,'#666','middle'),
  [
    e('Creating ObjectId', 'Generate and use ObjectId.', codeBlock([
      'const { ObjectId } = require(\'mongodb\');',
      'const id = new ObjectId();',
      'console.log(id.getTimestamp()); // Creation date'
    ]), 'ObjectIds are generated client-side with embedded timestamp.'),
    e('Using Decimal128', 'Precise monetary value.', codeBlock([
      'const { Decimal128 } = require(\'mongodb\');',
      'const price = Decimal128.fromString("19.99");',
      'db.products.insertOne({ name: "Widget", price });'
    ]), 'Decimal128 provides exact precision for financial data.'),
    e('BSON Date', 'Working with dates.', codeBlock([
      'db.events.insertOne({ event: "Conference", date: new Date("2025-01-15T10:30:00Z"), timestamp: new Date() });'
    ]), 'Dates stored as 64-bit integer (ms since epoch).'),
    e('UUID Binary', 'Storing UUID as subtype 4.', codeBlock([
      'const { UUID } = require(\'mongodb\');',
      'const uuid = UUID.createFromHexString("3b241101-e2bb-4255-8caf-4136c566a962");',
      'db.docs.insertOne({ _id: uuid, data: "Content" });'
    ]), 'UUID subtype provides standard UUID storage.'),
    e('Manual BSON Serialization', 'Convert JS to BSON buffer.', codeBlock([
      'const BSON = require(\'bson\');',
      'const doc = { name: "Alice", age: 30 };',
      'const buf = BSON.serialize(doc);',
      'const restored = BSON.deserialize(buf);'
    ]), 'Serialize JS object to BSON binary and back.')
  ],
  [
    m('What does BSON stand for?', ['Binary SQL Object Notation', 'Binary JSON', 'Basic Structured Object Notation', 'Big Serialized Object Notation'], 1, 'BSON stands for Binary JSON.'),
    m('How many bytes is an ObjectId?', ['4', '8', '12', '16'], 2, 'ObjectId is 12 bytes.'),
    m('Which BSON type provides exact decimal precision?', ['Double', 'Int64', 'Decimal128', 'NumberDecimal'], 2, 'Decimal128 provides 128-bit decimal precision.'),
    m('What is the document size limit?', ['4MB', '8MB', '16MB', '32MB'], 2, 'MongoDB enforces 16MB document limit.'),
    m('How does BSON Date store values?', ['String', 'Milliseconds since epoch', 'Seconds since epoch', 'ObjectId'], 1, 'BSON Date stores ms since Unix epoch.'),
    m('Which types compare as less/greater than all others?', ['Null/Undefined', 'MinKey/MaxKey', 'Boolean/Number', 'String/Object'], 1, 'MinKey/MaxKey compare as less/greater than all types.')
  ]
);

/* =================== TOPIC 4: CRUD OPERATIONS =================== */
addTopic('mongodb-crud', 'CRUD Operations', 'beginner', 20,
  ['CRUD (Create, Read, Update, Delete) operations are the four basic functions for interacting with MongoDB documents.',
   'Create: insertOne(), insertMany(). Read: find(), findOne(). Update: updateOne(), updateMany(), replaceOne(). Delete: deleteOne(), deleteMany().',
   'All write operations can specify options like writeConcern, ordered (for bulk inserts), and bypassDocumentValidation.',
   'CRUD operations in MongoDB are atomic at the document level and support various query operators for precise targeting.'
  ],
  'CRUD operations are like the basic tools for managing a library: add new books (Create), look up books (Read), update information (Update), and remove books (Delete).',
  [
    d('Create Operations', 'insertOne(doc) inserts a single document. insertMany(docs) inserts multiple documents. Options: writeConcern, ordered, bypassDocumentValidation. Returns InsertOneResult with acknowledged and insertedId. For upserts, use updateOne with upsert: true.'),
    d('Read Operations', 'findOne(filter) returns first matching document. find(filter) returns a cursor for iteration. Supports projection (field selection), sort, skip, limit, and collation. Indexes significantly improve read performance.'),
    d('Update Operations', 'updateOne(filter, update) updates first match. updateMany(filter, update) updates all matches. replaceOne(filter, replacement) replaces entire document. Update operators: $set, $unset, $inc, $push, $pull, $addToSet.'),
    d('Delete Operations', 'deleteOne(filter) deletes first match. deleteMany(filter) deletes all matches. Returns DeleteResult with acknowledged and deletedCount. Use cautiously: deleteMany({}) removes all documents.'),
    d('Write Concerns', 'Controls acknowledgment: w: 1 (primary), w: \'majority\' (majority of replicas), w: 0 (fire-and-forget). j: true (journal). Higher durability = slower performance.')
  ],
  'MongoDB CRUD operations provide a complete set of data manipulation tools. Understanding options, operators, and performance implications is essential.',
  [
    q('What CRUD operations does MongoDB support?', 'Create: insertOne, insertMany. Read: find, findOne. Update: updateOne, updateMany, replaceOne. Delete: deleteOne, deleteMany.'),
    q('What is the difference between insertOne and insertMany?', 'insertOne inserts a single document. insertMany inserts multiple in a batch with ordered/unordered options.'),
    q('What update operators are available?', '$set, $unset, $inc, $min/$max, $push, $pull, $addToSet, $rename, $mul.'),
    q('What is the difference between updateOne and replaceOne?', 'updateOne modifies specific fields using operators. replaceOne replaces the entire document except _id.'),
    q('How do you perform bulk operations?', 'Use bulkWrite() for mixed operations: [{ insertOne: ... }, { updateOne: ... }, { deleteOne: ... }].'),
    q('What is writeConcern?', 'Specifies acknowledgment level: w: 0 (no ack), w: 1 (primary), w: \'majority\' (most replicas).'),
    q('What does find() return?', 'A cursor, not documents. Use .toArray(), .forEach(), .next() to access. Cursor methods: sort(), skip(), limit(), project().'),
    q('How do you check write success?', 'Check result.acknowledged, result.matchedCount, result.modifiedCount, result.upsertedCount.'),
    q('What happens with upsert: true?', 'If no document matches, MongoDB creates one by combining filter and update operators.'),
    q('How do you find documents by field value?', 'Use filter: db.collection.find({ field: value }). Supports $eq, $ne, $gt, $gte, $lt, $lte, $in, $exists.')
  ],
  R(10,40,100,35,'#47A248','','Create','insertOne/Many') +
  R(10,90,100,35,'#0070f3','','Read','find/findOne') +
  R(10,140,100,35,'#28a745','','Update','updateOne/Many') +
  R(10,190,100,35,'#ffc107','','Delete','deleteOne/Many') +
  A(110,58,140,58) + A(110,108,140,108) + A(110,158,140,158) + A(110,208,140,208) +
  R(150,40,200,190,'#e83e8c','','CRUD','insert / find / update / delete') +
  T(240,250,'CRUD: Create, Read, Update, Delete with document-level atomicity.',9,'#666','middle'),
  [
    e('Insert Document', 'Create new user.', codeBlock([
      'const result = await db.collection(\'users\').insertOne({ name: "Alice", email: "alice@example.com" });',
      'console.log(result.insertedId);'
    ]), 'Inserts a document and returns the generated _id.'),
    e('Find with Projection', 'Select specific fields.', codeBlock([
      'const user = await db.collection(\'users\').findOne({ email: "alice@example.com" }, { projection: { name: 1, email: 1, _id: 0 } });'
    ]), 'Finds by email, returns only name and email.'),
    e('Update with $inc', 'Atomic counter.', codeBlock([
      'await db.collection(\'products\').updateOne({ sku: "WIDGET-123" }, { $inc: { stock: -1, soldCount: 1 } });'
    ]), 'Atomically decrements stock and increments soldCount.'),
    e('Array Update Operators', 'Push and pull.', codeBlock([
      'await db.collection(\'users\').updateOne({ _id: userId }, { $push: { tags: "new" }, $pull: { oldTags: "remove" } });'
    ]), 'Adds and removes elements from array fields.'),
    e('Delete Old Records', 'Cleanup expired sessions.', codeBlock([
      'await db.collection(\'sessions\').deleteMany({ lastAccess: { $lt: new Date(Date.now() - 30*24*60*60*1000) } });'
    ]), 'Deletes sessions not accessed in 30 days.')
  ],
  [
    m('Which operation inserts multiple documents?', ['insertOne', 'insertMany', 'bulkInsert', 'insertMultiple'], 1, 'insertMany inserts multiple documents.'),
    m('What does find() return?', ['Array', 'Document', 'Cursor', 'Boolean'], 2, 'find() returns a cursor.'),
    m('Which operator increments a numeric field?', ['$add', '$inc', '$mul', '$set'], 1, '$inc atomically increments a field.'),
    m('What option creates a document if no match?', ['createIfMissing', 'upsert: true', 'insertNew', 'autoCreate'], 1, 'upsert: true creates a document if none matches.'),
    m('What does $push do?', ['Remove from array', 'Add to array', 'Delete array', 'Count array'], 1, '$push adds element to array.'),
    m('What write concern gives highest durability?', ['w: 0', 'w: 1', 'w: \'majority\'', 'w: 2'], 2, 'w: \'majority\' provides highest durability.')
  ]
);

/* =================== TOPIC 5: find() =================== */
addTopic('mongodb-find', 'find()', 'beginner', 20,
  ['find() is a MongoDB read operation that retrieves documents from a collection matching a filter condition, returning a cursor.',
   'The filter parameter accepts query operators ($eq, $gt, $lt, $in, $regex, $exists, etc.) for precise document matching.',
   'find() supports chaining cursor methods: .sort(), .skip(), .limit(), .project() for pagination and field selection.',
   'For large result sets, use cursor iteration (.forEach, .next) instead of .toArray() to avoid memory issues.'
  ],
  'find() is like searching through a filing cabinet with a specific criteria. You tell it what you\'re looking for (filter), how to organize results (sort), and how many to see at once (limit).',
  [
    d('Filter Conditions', 'The filter parameter specifies which documents to match. Empty filter {} returns all documents. Use query operators: $eq (equal), $ne (not equal), $gt (greater than), $gte, $lt, $lte, $in (in array), $nin (not in array), $exists (field exists), $regex (pattern match), $and/$or/$nor for logical combinations.'),
    d('Cursor Methods', 'find() returns a cursor, not documents directly. Chainable methods: .sort({ field: 1|-1 }) for ascending/descending, .skip(n) to skip n documents, .limit(n) to limit results, .project({ field: 1|0 }) for field inclusion/exclusion. Cursor methods can be chained: find().sort().skip().limit().project().'),
    d('Cursor Iteration', 'Access documents via: .toArray() returns all results as an array (use for small sets), .forEach() processes each document with a callback, .next() returns next document one at a time, .hasNext() checks for remaining documents. for-await-of loops work with cursors in async contexts.'),
    d('Query Operators', 'Comparison: $eq, $ne, $gt, $gte, $lt, $lte, $in, $nin. Logical: $and, $or, $nor, $not. Element: $exists, $type. Array: $all, $elemMatch, $size. Evaluation: $regex, $expr, $mod. Geospatial: $geoWithin, $near. Bitwise: $bitsAllClear, $bitsAllSet.'),
    d('Performance Considerations', 'Create indexes on fields used in filters for better performance. Avoid $regex without anchor (slower than prefix match). Use projection to return only needed fields. Use limit() to cap result size. Monitor with explain() to check query execution plans.')
  ],
  'find() is the primary read operation in MongoDB. Mastering filter conditions, cursor methods, and performance optimization with indexes is essential for building efficient database queries.',
  [
    q('What does find() return?', 'A cursor. The cursor lazily fetches documents as needed. Use .toArray(), .forEach(), .next(), or for-await-of to access the actual documents.'),
    q('How do you filter documents with find()?', 'Pass a filter object: db.collection.find({ field: value }). Use query operators like $gt, $lt, $in, $regex for complex conditions.'),
    q('What cursor methods are available?', '.sort(), .skip(), .limit(), .project(), .count(), .explain(). These can be chained: find().sort({name:1}).skip(10).limit(5).'),
    q('How do you paginate with find()?', 'Use .skip(n).limit(m) combination. For efficient pagination on large datasets, use range-based pagination with _id or indexed field instead of skip.'),
    q('What is projection?', 'Selecting specific fields to return. Include fields: .project({ name: 1, email: 1 }). Exclude fields: .project({ password: 0 }). _id is included by default unless excluded.'),
    q('How does $regex work?', 'Pattern matching on string fields: find({ name: { $regex: /^A/i } }). Use anchors for performance. Case-insensitive with the i flag.'),
    q('What is the difference between find and findOne?', 'find() returns a cursor for multiple documents. findOne() returns a single document (or null) and internally calls find with limit 1.'),
    q('How do you check if any documents match?', 'Use .hasNext() on the cursor, or .count() (deprecated, use countDocuments instead). Or check if .toArray().length > 0.'),
    q('How do you use $or in find()?', 'find({ $or: [{ field1: value1 }, { field2: value2 }] }). Matches documents satisfying at least one condition. Index performance may be poor on $or queries.'),
    q('How do you explain query execution?', 'Use .explain(\'executionStats\') on the cursor: find({...}).explain(\'executionStats\'). Returns query plan, index usage, examined vs returned documents.')
  ],
  R(10,40,130,35,'#47A248','','find(filter)','Query Conditions') +
  A(140,58,170,58) +
  R(180,40,130,35,'#0070f3','','Cursor','Lazy Fetch') +
  A(310,58,340,58) + A(180,75,180,93) +
  R(180,95,130,35,'#28a745','','.sort() / .skip()','.limit() / .project()') +
  A(180,130,180,148) +
  R(180,150,130,25,'#ffc107','','Iteration','toArray/forEach') +
  T(240,210,'find(): Filter documents, chain cursor methods, iterate results.',9,'#666','middle'),
  [
    e('Basic find()', 'Find all active users.', codeBlock([
      'const cursor = db.collection(\'users\').find({ isActive: true });',
      'const users = await cursor.toArray();'
    ]), 'Finds all active users and converts cursor to array.'),
    e('Chained Cursor Methods', 'Pagination and projection.', codeBlock([
      'const results = await db.collection(\'products\').find({ price: { $gt: 10 } })',
      '  .sort({ price: 1 })',
      '  .skip(20)',
      '  .limit(10)',
      '  .project({ name: 1, price: 1 })',
      '  .toArray();'
    ]), 'Chains filter, sort, skip, limit, and projection.'),
    e('Using $in Operator', 'Match any of multiple values.', codeBlock([
      'await db.collection(\'orders\').find({ status: { $in: ["pending", "processing"] } }).toArray();'
    ]), 'Finds orders with status either pending or processing.'),
    e('Regex Search', 'Case-insensitive pattern match.', codeBlock([
      'await db.collection(\'articles\').find({ title: { $regex: /mongodb/i } }).toArray();'
    ]), 'Searches for articles containing "mongodb" case-insensitively.'),
    e('Cursor ForEach', 'Process each document.', codeBlock([
      'const cursor = db.collection(\'users\').find({ isActive: true });',
      'await cursor.forEach(user => { console.log(user.name); });'
    ]), 'Iterates through cursor with forEach callback.')
  ],
  [
    m('What does find() return?', ['Array', 'Document', 'Cursor', 'Boolean'], 2, 'find() returns a cursor.'),
    m('Which method limits result count?', ['.skip()', '.limit()', '.max()', '.count()'], 1, '.limit(n) caps the number of results.'),
    m('How do you select specific fields?', ['.filter()', '.project()', '.select()', '.fields()'], 1, '.project() specifies field inclusion/exclusion.'),
    m('What does $gt mean?', ['Greater than', 'Get type', 'Group together', 'Greater or equal'], 0, '$gt means greater than.'),
    m('Which operator matches patterns?', ['$text', '$regex', '$search', '$match'], 1, '$regex supports pattern matching on strings.'),
    m('How to convert cursor to array?', ['.toArray()', '.asArray()', '.collect()', '.list()'], 0, '.toArray() converts cursor to array.')
  ]
);

/* =================== TOPIC 6: findOne() =================== */
addTopic('mongodb-findone', 'findOne()', 'beginner', 15,
  ['findOne() returns the first document matching a filter, or null if no match is found.',
   'It is a convenience method that internally calls find(filter).limit(1) and returns the first document or null.',
   'Useful for single-document lookups by _id, unique fields (email, username), or when expecting at most one result.',
   'Unlike find(), findOne() returns a document directly, not a cursor, and supports projection and sort options.'
  ],
  'findOne() is like looking up a single person in a directory by their exact name. You get that person\'s details or a "not found" message.',
  [
    d('Return Value', 'Returns the matched document as an object or null if not found. No cursor iteration needed. The document includes all fields unless projection is specified.'),
    d('Options Parameter', 'Second parameter accepts options: projection (field selection), sort (order for first match), collation (language rules), hint (index hint), maxTimeMS (timeout), readConcern, comment.'),
    d('Typical Use Cases', 'User lookup by _id or email: findOne({ _id: userId }). Session validation: findOne({ sessionToken }). Configuration retrieval: findOne({ key: \'config\' }). Existence check.'),
    d('Performance', 'Fast for single document lookups, especially with a unique index on the filter field. Automatically limits to 1 document. Use with projection to minimize data transfer.'),
    d('Error Handling', 'Returns null when no document matches. Always check for null before accessing document properties. Throws on invalid ObjectId strings or network errors.')
  ],
  'findOne() is the go-to method for retrieving a single document. Its simplicity and direct return value make it perfect for lookups by unique identifiers.',
  [
    q('What does findOne() return?', 'The first matching document as an object, or null if no document matches the filter.'),
    q('How is findOne() implemented internally?', 'It is equivalent to find(filter).limit(1) with the cursor immediately returning the first document or null.'),
    q('When should you use findOne vs find?', 'Use findOne when expecting at most one result (by _id, email). Use find when expecting multiple results (all active users).'),
    q('What options does findOne accept?', 'projection, sort, collation, hint, maxTimeMS, readConcern, comment.'),
    q('Does findOne work with compound filters?', 'Yes, pass any valid filter object: findOne({ status: "active", role: "admin" }).'),
    q('What happens if no document matches?', 'Returns null. Always check for null: if (!doc) { /* not found */ }.'),
    q('Can you sort with findOne?', 'Yes. The sort option determines which document is returned when multiple match: findOne(filter, { sort: { createdAt: -1 } }).'),
    q('How do you exclude fields?', 'Use projection with 0: findOne({ _id: id }, { projection: { password: 0, token: 0 } }).'),
    q('Is findOne() atomic?', 'No, it is a read operation. For atomic read-and-modify, use findOneAndUpdate() or findOneAndDelete().'),
    q('What is findOneAndUpdate?', 'A method that finds a document, updates it atomically, and returns the original or updated document based on options.')
  ],
  R(10,40,140,35,'#47A248','','findOne(filter)','Query') +
  A(150,58,180,58) +
  R(190,40,130,35,'#0070f3','','Match?','Check exists') +
  A(320,58,350,58) +
  R(10,90,100,35,'#28a745','','Yes -> Doc','Return Object') +
  R(120,90,100,35,'#ffc107','','No -> null','Return null') +
  T(240,160,'findOne(): Returns document or null. Simple, direct single-document lookup.',9,'#666','middle'),
  [
    e('Lookup by ID', 'Find user by _id.', codeBlock([
      'const user = await db.collection(\'users\').findOne({ _id: new ObjectId(userId) });',
      'if (!user) return res.status(404).json({ error: \'User not found\' });'
    ]), 'Looks up user by ObjectId, handles not found case.'),
    e('With Projection', 'Exclude sensitive fields.', codeBlock([
      'const user = await db.collection(\'users\').findOne(',
      '  { email: "alice@example.com" },',
      '  { projection: { password: 0, token: 0 } }',
      ');'
    ]), 'Returns user without password and token fields.'),
    e('Find Latest Document', 'Using sort option.', codeBlock([
      'const latest = await db.collection(\'orders\').findOne(',
      '  { status: "completed" },',
      '  { sort: { completedAt: -1 } }',
      ');'
    ]), 'Returns the most recently completed order.'),
    e('Existence Check', 'Verify if document exists.', codeBlock([
      'const exists = await db.collection(\'products\').findOne({ sku: "WIDGET-001" }, { projection: { _id: 1 } });',
      'if (exists) { /* product exists */ }'
    ]), 'Efficient existence check with minimal projection.'),
    e('findOneAndUpdate', 'Atomic read-modify-write.', codeBlock([
      'const doc = await db.collection(\'counters\').findOneAndUpdate(',
      '  { _id: "orderNumber" },',
      '  { $inc: { seq: 1 } },',
      '  { returnDocument: \'after\' }',
      ');',
      'console.log(doc.seq); // Incremented value'
    ]), 'Atomically increments a counter and returns the new value.')
  ],
  [
    m('What does findOne() return when no match?', ['{}', 'undefined', 'null', 'false'], 2, 'Returns null when no document matches.'),
    m('How does findOne() differ from find()?', ['Returns cursor', 'Returns document or null', 'Returns array', 'Returns boolean'], 1, 'findOne() returns document or null, find() returns cursor.'),
    m('Which option controls field selection?', ['sort', 'projection', 'collation', 'hint'], 1, 'projection controls which fields are returned.'),
    m('What method provides atomic read-and-modify?', ['findOne', 'findOneAndUpdate', 'findAndModify', 'updateOne'], 1, 'findOneAndUpdate provides atomic read-and-modify.'),
    m('How do you exclude a field?', ['field: 0', 'field: -1', 'field: false', 'exclude: true'], 0, 'Set field to 0 in projection to exclude.'),
    m('Can findOne accept sort?', ['Yes', 'No', 'Only with index', 'Only for ObjectId'], 0, 'Yes, sort determines which doc returns when multiple match.')
  ]
);

/* =================== TOPIC 7: insertOne() =================== */
addTopic('mongodb-insertone', 'insertOne()', 'beginner', 15,
  ['insertOne() inserts a single document into a collection and returns an InsertOneResult object.',
   'If the document does not include an _id field, MongoDB auto-generates an ObjectId.',
   'The result contains acknowledged (boolean) and insertedId (the _id value of the inserted document).',
   'Options include writeConcern, bypassDocumentValidation, and comment.'
  ],
  'insertOne() is like adding a single new file to a filing cabinet. You provide the document content, and MongoDB files it away, automatically generating a unique ID if you didn\'t provide one.',
  [
    d('InsertOneResult', 'Returned object: { acknowledged: true, insertedId: ObjectId("...") }. acknowledged indicates the write concern was satisfied. insertedId is the _id of the inserted document (generated or provided).'),
    d('Auto-generated _id', 'If the document has no _id field, MongoDB generates an ObjectId. The ObjectId is created client-side by the driver, enabling immediate use of the _id without a round-trip to the server.'),
    d('Options', 'writeConcern: { w: 1, j: true } for acknowledgment. bypassDocumentValidation: true to skip schema validation. comment: string for profiling. All optional.'),
    d('Error Handling', 'Throws on duplicate _id (E11000), validation failure, or network errors. Use try/catch. Check error.code for specific error types (11000 for duplicate key).'),
    d('Performance', 'insertOne is optimized for single document inserts. For bulk inserts, use insertMany or bulkWrite for better performance. Each insertOne is a separate operation.')
  ],
  'insertOne() is the most basic create operation in MongoDB. It is simple, reliable, and the foundation for understanding how MongoDB handles document creation.',
  [
    q('What does insertOne() return?', 'InsertOneResult with acknowledged (boolean) and insertedId (the _id of the inserted document).'),
    q('What happens if no _id is provided?', 'MongoDB auto-generates an ObjectId as the _id. The ObjectId contains a timestamp, machine ID, process ID, and counter.'),
    q('What options does insertOne accept?', 'writeConcern (ack level), bypassDocumentValidation (skip validation), comment (profiling label).'),
    q('What error occurs on duplicate _id?', 'MongoError with code 11000 (E11000 duplicate key error). The _id field has a unique index by default.'),
    q('Can you insert a document without a collection existing?', 'Yes. The collection is created implicitly if it does not exist.'),
    q('Is insertOne atomic?', 'Yes, write operations are atomic at the document level. The entire document is either inserted or not.'),
    q('How do you get the inserted _id?', 'From result.insertedId. This is available immediately even if the _id was auto-generated client-side.'),
    q('What is the document size limit?', '16MB. insertOne throws if the document exceeds this limit.'),
    q('Can insertOne validate the document?', 'Yes, if schema validation is defined on the collection. Set bypassDocumentValidation: true to skip.'),
    q('How do you insert with a custom _id?', 'Include _id in the document: insertOne({ _id: "my-custom-id", name: "Alice" }). Must be unique.')
  ],
  R(10,40,140,35,'#47A248','','Document Input','{ name: "Alice" }') +
  A(150,58,180,58) +
  R(190,40,140,35,'#0070f3','','insertOne()','Driver') +
  A(330,58,370,58) +
  R(380,40,100,35,'#28a745','','Database','Stored') +
  A(190,75,190,95) +
  R(190,95,140,35,'#ffc107','','Result','{ acknowledged, insertedId }') +
  T(240,170,'insertOne(): Insert a single document, auto-generate _id, return result.',9,'#666','middle'),
  [
    e('Basic Insert', 'Create a new user.', codeBlock([
      'const result = await db.collection(\'users\').insertOne({',
      '  name: "Alice",',
      '  email: "alice@example.com",',
      '  createdAt: new Date()',
      '});'
    ]), 'Inserts a user document with auto-generated _id.'),
    e('Insert with Custom _id', 'Providing a specific _id.', codeBlock([
      'const result = await db.collection(\'products\').insertOne({',
      '  _id: "SKU-WIDGET-001",',
      '  name: "Widget",',
      '  price: 9.99',
      '});'
    ]), 'Uses a custom string _id instead of ObjectId.'),
    e('Error Handling', 'Duplicate key handling.', codeBlock([
      'try {',
      '  await db.collection(\'users\').insertOne({ _id: userId, name: "Alice" });',
      '} catch (err) {',
      '  if (err.code === 11000) console.log(\'Duplicate _id\');',
      '}'
    ]), 'Catches duplicate key error (code 11000).'),
    e('With Write Concern', 'Acknowledge from majority.', codeBlock([
      'await db.collection(\'logs\').insertOne(',
      '  { event: "login", userId: "abc" },',
      '  { writeConcern: { w: "majority", j: true } }',
      ');'
    ]), 'Waits for acknowledgment from majority of replica set.'),
    e('Bypass Validation', 'Skip schema validation.', codeBlock([
      'await db.collection(\'users\').insertOne(',
      '  { name: "Bob", extraField: "ignored by validator" },',
      '  { bypassDocumentValidation: true }',
      ');'
    ]), 'Inserts document even if it fails schema validation rules.')
  ],
  [
    m('What does insertOne() return?', ['Boolean', 'InsertOneResult', 'Inserted document', 'ObjectId'], 1, 'Returns InsertOneResult with acknowledged and insertedId.'),
    m('What error code is a duplicate key?', ['11000', '12000', '13000', '14000'], 0, 'Duplicate key error has code 11000.'),
    m('What is insertedId?', ['The _id of inserted doc', 'Auto-increment number', 'Timestamp', 'Collection ID'], 0, 'insertedId is the _id of the inserted document.'),
    m('Does insertOne create a collection automatically?', ['Yes', 'No', 'Only with options', 'Depends on config'], 0, 'Collection is created implicitly if it doesn\'t exist.'),
    m('Which option skips validation?', ['skipValidation', 'bypassDocumentValidation', 'noValidation', 'validation: false'], 1, 'bypassDocumentValidation skips schema validation.'),
    m('Can you insert a document > 16MB?', ['Yes', 'No', 'Only with GridFS', 'Only in sharded clusters'], 1, 'Document size is limited to 16MB. Use GridFS for larger data.')
  ]
);

/* =================== TOPIC 8: updateOne() =================== */
addTopic('mongodb-updateone', 'updateOne()', 'beginner', 15,
  ['updateOne() updates the first document that matches the filter using update operators ($set, $unset, $inc, etc.).',
   'Returns UpdateResult with matchedCount, modifiedCount, upsertedCount, and upsertedId.',
   'Use upsert: true option to create a document if no match is found, combining filter fields and update operators.',
   'For replacing the entire document (except _id), use replaceOne() instead of updateOne().'
  ],
  'updateOne() is like editing a single form in a filing system. You specify which form to find (filter), what changes to make (update), and optionally create one if it doesn\'t exist (upsert).',
  [
    d('Update Operators', '$set: Set field values. $unset: Remove fields. $inc: Increment number. $min/$max: Conditional update. $mul: Multiply. $rename: Rename field. $push/$pull/$addToSet: Array operations. $each/$position/$slice: Array modifiers.'),
    d('UpdateResult Properties', 'matchedCount: number of documents matching filter (0 or 1). modifiedCount: number of documents actually modified (0 or 1). upsertedCount: 1 if upsert created a new doc. upsertedId: _id of created document (if upsert). acknowledged: true if write concern satisfied.'),
    d('Upsert Behavior', 'With upsert: true, if no document matches, MongoDB creates one by combining filter fields and $set operators. The _id is auto-generated. The upsertedId field contains the new _id.'),
    d('Field Update vs Replace', 'updateOne() modifies specific fields using $ operators. replaceOne() replaces the entire document content. Use updateOne for partial updates, replaceOne when changing most fields. _id cannot be changed in either.'),
    d('Array Update Operators', '$push: Add to end of array. $pop: Remove first or last. $pull: Remove matching elements. $pullAll: Remove all matching values. $addToSet: Add if not exists. $each: Add multiple values. $position: Insert at position. $slice: Limit array size.')
  ],
  'updateOne() is the standard method for partial document updates. Understanding update operators and upsert behavior is critical for correct application behavior.',
  [
    q('What does updateOne() do?', 'Updates the first document matching the filter using specified update operators. Returns an UpdateResult.'),
    q('What is the difference between matchedCount and modifiedCount?', 'matchedCount is documents matching the filter. modifiedCount is those actually changed. If the document already matches the update, modifiedCount may be 0.'),
    q('What is upsert?', 'If no document matches and upsert: true, MongoDB creates a new document combining filter fields and $set values.'),
    q('What update operators set and remove fields?', '$set sets field values. $unset removes fields. $inc increments numbers. $rename renames fields.'),
    q('How do you update an array field?', 'Use $push (add), $pull (remove matching), $addToSet (add if not exists), $pop (remove first/last).'),
    q('Can updateOne update multiple documents?', 'No, updateOne only updates the first matching document. Use updateMany for multiple documents.'),
    q('How do you replace an entire document?', 'Use replaceOne(filter, replacementDoc). The replacement doc replaces all fields except _id.'),
    q('What happens if the update does not change anything?', 'modifiedCount is 0. matchedCount is still 1 if a match was found.'),
    q('Can you use aggregation pipeline in update?', 'Yes, MongoDB 4.2+ supports aggregation pipelines in update: updateOne(filter, [{ $set: { total: { $sum: ["$price", "$tax"] } } }]).'),
    q('Is updateOne atomic?', 'Yes, write operations are atomic at the document level. All changes in a single updateOne are applied atomically.')
  ],
  R(10,40,140,35,'#47A248','','updateOne(filter)','Find Document') +
  A(150,58,180,58) +
  R(190,40,140,35,'#0070f3','','$set, $inc, $push','Apply Operators') +
  A(190,75,190,93) +
  R(190,95,140,35,'#28a745','','UpdateResult','matched/modifiedCount') +
  R(10,140,100,35,'#ffc107','','Upsert','Create if missing') +
  T(240,200,'updateOne(): Update first matching document with operators.',9,'#666','middle'),
  [
    e('Basic $set and $inc', 'Update user fields.', codeBlock([
      'await db.collection(\'users\').updateOne(',
      '  { _id: userId },',
      '  { $set: { name: "Alice Updated" }, $inc: { version: 1 } }',
      ');'
    ]), 'Sets name and increments version in one operation.'),
    e('Upsert Example', 'Create if not exists.', codeBlock([
      'const result = await db.collection(\'counters\').updateOne(',
      '  { _id: "views" },',
      '  { $inc: { count: 1 } },',
      '  { upsert: true }',
      ');',
      'console.log(result.upsertedId); // First time only'
    ]), 'Creates counter doc if missing, increments count.'),
    e('Array $push with $each', 'Add multiple tags.', codeBlock([
      'await db.collection(\'articles\').updateOne(',
      '  { _id: articleId },',
      '  { $push: { tags: { $each: ["mongodb", "database", "nosql"] } } }',
      ');'
    ]), 'Adds multiple tags to the tags array.'),
    e('Using $pull', 'Remove from array.', codeBlock([
      'await db.collection(\'users\').updateOne(',
      '  { _id: userId },',
      '  { $pull: { notifications: { type: "old-alert" } } }',
      ');'
    ]), 'Removes notifications matching the condition.'),
    e('Pipeline Update', 'Complex calculation.', codeBlock([
      'await db.collection(\'orders\').updateOne(',
      '  { _id: orderId },',
      '  [{ $set: { totalPrice: { $multiply: ["$quantity", "$unitPrice"] } } }]',
      ');'
    ]), 'Uses aggregation pipeline (MongoDB 4.2+) to calculate totalPrice.')
  ],
  [
    m('Which operator sets field values?', ['$set', '$add', '$put', '$assign'], 0, '$set sets field values.'),
    m('What is upsert?', ['Always insert', 'Update or insert if no match', 'Update only', 'Delete and insert'], 1, 'Upsert creates a document if no match found.'),
    m('What does modifiedCount represent?', ['Docs matching filter', 'Docs actually changed', 'Docs inserted', 'Docs deleted'], 1, 'modifiedCount is documents actually modified.'),
    m('Which operator removes a field?', ['$delete', '$unset', '$remove', '$clear'], 1, '$unset removes fields from a document.'),
    m('Does updateOne update multiple docs?', ['Yes', 'No, only first match', 'Depends on options', 'Only with multi:true'], 1, 'updateOne updates only the first matching document.'),
    m('What operator adds to array if not exists?', ['$push', '$addToSet', '$set', '$append'], 1, '$addToSet adds to array only if value is not already present.')
  ]
);

/* =================== TOPIC 9: deleteOne() =================== */
addTopic('mongodb-deleteone', 'deleteOne()', 'beginner', 15,
  ['deleteOne() deletes the first document that matches a filter condition.',
   'Returns DeleteResult with acknowledged (boolean) and deletedCount (0 or 1).',
   'For deleting multiple documents, use deleteMany(). To remove all documents, drop the collection for better performance.',
   'Use with caution: deleteOne is irreversible. Always verify the filter query in a findOne first during development.'
  ],
  'deleteOne() is like removing a single file from a filing cabinet. You specify which file to remove, and it\'s gone permanently — no recycle bin.',
  [
    d('DeleteResult', 'Returned object: { acknowledged: true, deletedCount: 1 }. acknowledged indicates write concern satisfied. deletedCount is the number of documents deleted (0 if no match, 1 if deleted).'),
    d('Filter Requirements', 'Must specify a filter. deleteOne({}) deletes the first document in the collection (not recommended). Always use a specific filter targeting a unique field. Test with findOne(filter) first to verify you\'re deleting the right document.'),
    d('Error Handling', 'Throws on invalid ObjectId format, network errors, or transaction conflicts. Always use try/catch. Check for deletedCount === 0 to handle no-match gracefully.'),
    d('Performance', 'deleteOne by _id with index is very fast. Without an index, MongoDB must scan documents to find the match. For bulk deletion, use deleteMany. To clear all documents, drop the collection instead of deleteMany({}).'),
    d('Permanent Deletion', 'Deletions are permanent. MongoDB does not have a recycle bin or soft-delete by default. Implement soft-delete with a boolean field (isDeleted: true) and TTL index for auto-cleanup if needed.')
  ],
  'deleteOne() is the standard method for single-document deletion. Always verify your filter to avoid accidental data loss.',
  [
    q('What does deleteOne() return?', 'DeleteResult with acknowledged (boolean) and deletedCount (0 or 1).'),
    q('What happens if no document matches?', 'deletedCount is 0. No error is thrown. Check deletedCount to determine if deletion occurred.'),
    q('What is the difference between deleteOne and deleteMany?', 'deleteOne deletes only the first matching document. deleteMany deletes all documents matching the filter.'),
    q('Is deletion reversible?', 'No. MongoDB does not have a native undo or recycle bin. Consider soft-delete for recoverable deletions.'),
    q('How do you delete a document by _id?', 'deleteOne({ _id: ObjectId("...") }). Ensure the ObjectId is valid, otherwise an error is thrown.'),
    q('What happens if you call deleteOne({})?', 'Deletes the first document in the collection based on natural order (usually insertion order). Dangerous in production.'),
    q('How do you implement soft delete?', 'Add isDeleted: boolean field. Set isDeleted: true instead of deleting. Add TTL index on deletedAt field for auto-cleanup after retention period.'),
    q('Is deleteOne atomic?', 'Yes. The delete operation is atomic at the document level. Other operations cannot see a partially deleted document.'),
    q('What indexes help deleteOne performance?', 'An index on the filter field(s) enables efficient document lookup before deletion. Without an index, MongoDB scans the collection.'),
    q('Can deleteOne be used in transactions?', 'Yes. deleteOne works within multi-document transactions (MongoDB 4.0+ replica sets). Supports commit/rollback.')
  ],
  R(10,40,130,35,'#47A248','','deleteOne(filter)','Find Document') +
  A(140,58,170,58) +
  R(180,40,130,35,'#0070f3','','Match Found?','Check exists') +
  A(310,58,340,58) +
  R(350,40,100,35,'#28a745','','Deleted!','deletedCount: 1') +
  A(180,75,180,103) +
  R(180,105,130,25,'#ffc107','','No Match','deletedCount: 0') +
  T(240,170,'deleteOne(): Delete first matching document. Returns deletedCount.',9,'#666','middle'),
  [
    e('Delete by ID', 'Remove a user.', codeBlock([
      'const result = await db.collection(\'users\').deleteOne({ _id: new ObjectId(userId) });',
      'if (result.deletedCount === 0) console.log(\'User not found\');'
    ]), 'Deletes user by _id with not-found handling.'),
    e('Delete with Filter', 'Remove specific document.', codeBlock([
      'await db.collection(\'sessions\').deleteOne({ sessionToken: "abc123", userId: userId });'
    ]), 'Deletes first session matching both token and userId.'),
    e('Cascading Delete', 'Delete user and related data.', codeBlock([
      'await db.collection(\'users\').deleteOne({ _id: userId });',
      'await db.collection(\'posts\').deleteMany({ authorId: userId });'
    ]), 'Deletes user and all their posts. Application-level cascading.'),
    e('Soft Delete Pattern', 'Mark as deleted instead.', codeBlock([
      'await db.collection(\'users\').updateOne(',
      '  { _id: userId },',
      '  { $set: { isDeleted: true, deletedAt: new Date() } }',
      ');',
      '// Queries filter: { isDeleted: { $ne: true } }'
    ]), 'Soft delete by setting a flag. Data remains recoverable.'),
    e('With Write Concern', 'Delete with majority ack.', codeBlock([
      'await db.collection(\'logs\').deleteOne(',
      '  { _id: logId },',
      '  { writeConcern: { w: "majority" } }',
      ');'
    ]), 'Deletion acknowledged by majority of replica set members.')
  ],
  [
    m('What does deleteOne() return?', ['Boolean', 'DeleteResult', 'Deleted document', 'ObjectId'], 1, 'Returns DeleteResult with acknowledged and deletedCount.'),
    m('What value is deletedCount when no match?', ['-1', '0', '1', 'undefined'], 1, 'deletedCount is 0 when no document matches.'),
    m('Which method deletes ALL matching documents?', ['deleteOne', 'deleteMany', 'removeAll', 'clear'], 1, 'deleteMany deletes all documents matching the filter.'),
    m('Is deleteOne reversible?', ['Yes, with undo', 'No, permanent', 'Yes, within 24h', 'Depends on config'], 1, 'Deletions are permanent in MongoDB.'),
    m('What is soft delete?', ['Permanent deletion', 'Mark as deleted, keep data', 'Encrypted delete', 'Logging deletion'], 1, 'Soft delete sets a flag instead of removing data.'),
    m('Which ID format throws an error?', ['Valid ObjectId', 'Invalid ObjectId string', 'UUID', 'Integer'], 1, 'Invalid ObjectId string throws an error in deleteOne.')
  ]
);

/* =================== TOPIC 10: Aggregation Pipeline =================== */
addTopic('mongodb-aggregation-pipeline', 'Aggregation Pipeline', 'advanced', 35,
  ['The aggregation pipeline is a framework for data processing and transformation, passing documents through a sequence of stages.',
  'Each stage transforms the documents as they pass through: $match (filter), $group (group by), $project (reshape), $sort (order), $limit/$skip (paginate).',
  'Stages can be combined in any order, forming a pipeline where the output of one stage becomes the input to the next.',
  'Aggregation supports complex operations: $lookup (joins), $unwind (deconstruct arrays), $bucket (histograms), $facet (multi-faceted search).'
  ],
  'The aggregation pipeline is like an assembly line in a factory. Raw materials (documents) go through different stations (stages), each performing a specific transformation until the final product (result) comes out at the end.',
  [
    d('Pipeline Stages', 'Common stages: $match (filter documents), $group (group by key with accumulators), $project (reshape fields), $sort (order), $skip/$limit (paginate), $lookup (join collections), $unwind (deconstruct arrays), $bucket (categorize), $facet (multi-pipeline), $addFields (add computed fields), $count (count documents).'),
    d('Accumulators in $group', '$sum (total), $avg (average), $min (minimum), $max (maximum), $first (first doc), $last (last doc), $push (collect to array), $addToSet (unique values), $stdDevPop (population std dev), $stdDevSamp (sample std dev).'),
    d('Pipeline Optimization', 'Place $match and $limit early in the pipeline to reduce documents flowing through. Use indexes on $match filter fields. $sort before $limit enables top-N optimization. Avoid $lookup on unindexed foreign fields.'),
    d('Aggregation vs find()', 'Aggregation is more powerful but more complex. find() for simple queries with optional sorting/pagination. Aggregation for grouping, transformations, joins, computed fields, and multi-stage processing.'),
    d('Memory and Performance', 'Stages have a 100MB memory limit by default. Use allowDiskUse: true for larger datasets. $group and $sort are memory-intensive. Indexes can help $match and $sort stages significantly.')
  ],
  'The aggregation pipeline is MongoDB\'s most powerful data processing tool. Mastering pipeline stages, operators, and optimization techniques is essential for advanced MongoDB work.',
  [
    q('What is the aggregation pipeline?', 'A framework for data aggregation where documents pass through a sequence of stages, each transforming the data. Like Unix pipes for MongoDB documents.'),
    q('What are common pipeline stages?', '$match (filter), $group (group), $project (reshape), $sort (order), $limit/$skip (paginate), $lookup (join), $unwind (deconstruct arrays), $addFields (compute fields).'),
    q('How do you optimize an aggregation pipeline?', 'Place $match and $limit early. Use indexes on $match fields. $sort before $limit for top-N. Use allowDiskUse for large datasets.'),
    q('What is the $lookup stage?', 'Performs a left outer join with another collection. Matches documents from the source collection with documents from the foreign collection.'),
    q('What accumulators work with $group?', '$sum, $avg, $min, $max, $first, $last, $push, $addToSet, $stdDevPop, $stdDevSamp.'),
    q('How is aggregation different from find()?', 'Aggregation supports grouping, transformations, joins, computed fields. find() is for simple queries with basic filtering/pagination.'),
    q('What is the memory limit for aggregation?', '100MB per stage by default. Use allowDiskUse: true to exceed this limit by writing temporary files to disk.'),
    q('What is $unwind used for?', 'Deconstructs an array field, outputting one document per array element. Useful for grouping or filtering on array elements.'),
    q('What is $facet?', 'Allows multiple aggregation pipelines to run on the same set of input documents, producing multiple result sets. Like a multi-faceted search.'),
    q('Can you use aggregation for updates?', 'Yes, MongoDB 4.2+ supports aggregation pipelines in update operations: updateMany(filter, [{ $set: { field: expression } }]).')
  ],
  R(10,40,120,30,'#47A248','','$match','Filter') +
  A(130,55,150,55) +
  R(160,40,120,30,'#0070f3','','$group','Group') +
  A(280,55,300,55) +
  R(310,40,120,30,'#28a745','','$project','Reshape') +
  A(310,70,310,90) +
  R(160,90,120,30,'#ffc107','','$sort','Order') +
  A(160,105,180,105) + A(180,105,210,125) +
  R(220,120,100,30,'#e83e8c','','$lookup','Join') +
  T(240,180,'Aggregation Pipeline: Sequence of stages transforming documents.',9,'#666','middle'),
  [
    e('Basic Aggregation', 'Group by status, count orders.', codeBlock([
      'const result = await db.collection(\'orders\').aggregate([',
      '  { $group: { _id: "$status", count: { $sum: 1 }, totalAmount: { $sum: "$amount" } } }',
      ']).toArray();'
    ]), 'Groups orders by status, counts and sums per group.'),
    e('Match + Group + Sort', 'Filter, group, order.', codeBlock([
      'const result = await db.collection(\'sales\').aggregate([',
      '  { $match: { date: { $gte: startDate, $lte: endDate } } },',
      '  { $group: { _id: "$productId", totalSales: { $sum: "$amount" } } },',
      '  { $sort: { totalSales: -1 } },',
      '  { $limit: 10 }',
      ']).toArray();'
    ]), 'Top 10 products by sales in a date range.'),
    e('$lookup Join', 'Join orders with users.', codeBlock([
      'const result = await db.collection(\'orders\').aggregate([',
      '  { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "user" } },',
      '  { $unwind: "$user" }',
      ']).toArray();'
    ]), 'Left joins orders with users collection, unwinds the array.'),
    e('$addFields + $project', 'Add computed field.', codeBlock([
      'const result = await db.collection(\'orders\').aggregate([',
      '  { $addFields: { total: { $multiply: ["$quantity", "$price"] } } },',
      '  { $project: { item: 1, total: 1, _id: 0 } }',
      ']).toArray();'
    ]), 'Adds computed total field and projects specific fields.'),
    e('$facet for Multi-Analysis', 'Multiple aggregations.', codeBlock([
      'const result = await db.collection(\'products\').aggregate([',
      '  { $facet: {',
      '    byCategory: [{ $group: { _id: "$category", count: { $sum: 1 } } }],',
      '    stats: [{ $group: { _id: null, avgPrice: { $avg: "$price" }, maxPrice: { $max: "$price" } } }]',
      '  }}',
      ']).toArray();'
    ]), 'Runs two separate pipelines: category counts and price stats.')
  ],
  [
    m('What is the aggregation pipeline?', ['A query language', 'A sequence of data processing stages', 'An indexing method', 'A backup tool'], 1, 'Aggregation pipeline is a sequence of stages processing documents.'),
    m('Which stage filters documents?', ['$group', '$match', '$project', '$sort'], 1, '$match filters documents early in the pipeline.'),
    m('Which accumulator sums values?', ['$total', '$sum', '$add', '$count'], 1, '$sum calculates the sum of numeric values.'),
    m('What does $lookup do?', ['Groups documents', 'Joins collections', 'Filters arrays', 'Sorts results'], 1, '$lookup performs left outer join with another collection.'),
    m('What is the default memory limit per stage?', ['50MB', '100MB', '200MB', '500MB'], 1, 'Default memory limit is 100MB per stage.'),
    m('What does $unwind do?', ['Merges documents', 'Deconstructs arrays into multiple docs', 'Removes duplicates', 'Adds indexes'], 1, '$unwind deconstructs an array, outputting one doc per element.')
  ]
);

/* =================== TOPIC 11: $match =================== */
addTopic('mongodb-aggregation-match', '$match', 'intermediate', 15,
  ['$match filters documents in the aggregation pipeline, similar to find() queries, passing only matching documents to the next stage.',
   'Place $match as early as possible to reduce the number of documents flowing through subsequent stages, improving pipeline performance.',
   '$match supports the same query operators as find(): $eq, $gt, $lt, $in, $regex, $exists, $and, $or, $nor.',
   '$match can use indexes if placed early in the pipeline, just like find() queries.'
  ],
  '$match is like a security checkpoint at the entrance of a building. It lets only the right people (matching documents) through, so everyone downstream has less work to do.',
  [
    d('Early Filtering', 'Always place $match as the first stage when possible to minimize documents processed by later stages. MongoDB can use indexes for $match stages at the start of the pipeline, dramatically improving performance.'),
    d('Supported Operators', 'All query operators work in $match: $eq, $ne, $gt, $gte, $lt, $lte, $in, $nin, $and, $or, $nor, $not, $exists, $type, $regex, $expr, $mod, $geoWithin, $nearSphere, $all, $elemMatch, $size, $bitsAllClear, $bitsAllSet.'),
    d('Index Usage', '$match can use indexes when it is the first stage. MongoDB optimizes the pipeline by moving $match stages earlier when possible. Use explain() to verify index usage. Index intersection can also benefit $match.'),
    d('Text Search in $match', 'Use $match with $text operator for full-text search in aggregation: { $match: { $text: { $search: "mongodb" } } }. Requires a text index on the searched fields.'),
    d('$match vs $project Filtering', '$match removes entire documents (row filter). $project with conditional expressions can include/exclude fields but does not remove documents. Use $match for document pruning, $project for field pruning.')
  ],
  '$match is the primary filtering stage in aggregation. Early placement and index support make it critical for pipeline performance.',
  [
    q('What does $match do?', 'Filters documents in the aggregation pipeline, passing only those matching the condition to the next stage. Similar to find() filter.'),
    q('Where should $match be placed?', 'As early as possible, preferably as the first stage, to reduce documents flowing through the pipeline and leverage indexes.'),
    q('What query operators work in $match?', 'All standard query operators: $eq, $ne, $gt, $lt, $in, $regex, $exists, $and, $or, $nor, $expr, $elemMatch, etc.'),
    q('Can $match use indexes?', 'Yes, when $match is the first stage in the pipeline. MongoDB can optimize some pipelines by moving $match earlier.'),
    q('What is the difference between $match and $project?', '$match removes documents (row filter). $project reshapes fields (column filter). $match reduces document count, $project reduces field count.'),
    q('How do you use $text in $match?', '{$match: {$text: {$search: "keywords"}}}. Requires a text index on the collection fields being searched.'),
    q('Can $match use $expr for field comparison?', 'Yes. {$match: {$expr: {$gt: ["$field1", "$field2"]}}} compares fields within the same document.'),
    q('Does $match order matter?', 'Yes. Place the most selective filters first to reduce the result set early. Multiple $match stages can be combined into one.'),
    q('How do you explain $match performance?', 'Use .explain(\'executionStats\') on the aggregation cursor. Check index usage, docs examined vs docs returned.'),
    q('Can you use $or in $match?', 'Yes. {$match: {$or: [{field1: value1}, {field2: value2}]}}. Be aware that $or may have different index behavior than $and.')
  ],
  R(10,40,140,35,'#47A248','','$match Filter','{ status: "active" }') +
  A(150,58,180,58) +
  R(190,40,140,35,'#0070f3','','Index Scan','Fast Filter') +
  A(330,58,360,58) +
  R(370,40,110,35,'#28a745','','Next Stage','Reduced Docs') +
  A(190,75,190,103) +
  R(190,105,140,30,'#ffc107','','No Match Excluded','Removed') +
  T(240,180,'$match: Filter documents early, use indexes, reduce pipeline data.',9,'#666','middle'),
  [
    e('Basic $match', 'Filter active users.', codeBlock([
      'await db.collection(\'users\').aggregate([',
      '  { $match: { isActive: true } },',
      '  { $count: "activeUsers" }',
      ']).toArray();'
    ]), 'Filters active users and counts them.'),
    e('$match with Date Range', 'Sales in period.', codeBlock([
      'await db.collection(\'orders\').aggregate([',
      '  { $match: { createdAt: { $gte: startDate, $lt: endDate } } },',
      '  { $group: { _id: null, total: { $sum: "$amount" } } }',
      ']).toArray();'
    ]), 'Filters orders in a date range before grouping.'),
    e('$match with $or', 'Multiple conditions.', codeBlock([
      'await db.collection(\'products\').aggregate([',
      '  { $match: { $or: [{ price: { $lt: 10 } }, { category: "sale" }] } }',
      ']).toArray();'
    ]), 'Filters products that are cheap OR on sale.'),
    e('$match with $expr', 'Field comparison.', codeBlock([
      'await db.collection(\'orders\').aggregate([',
      '  { $match: { $expr: { $gt: ["$total", "$maxAllowed"] } } }',
      ']).toArray();'
    ]), 'Finds orders where total exceeds maxAllowed field.'),
    e('$match with Regex', 'Pattern filter.', codeBlock([
      'await db.collection(\'articles\').aggregate([',
      '  { $match: { title: { $regex: /^How to/i } } },',
      '  { $project: { title: 1, url: 1 } }',
      ']).toArray();'
    ]), 'Finds articles whose title starts with "How to".')
  ],
  [
    m('What does $match do?', ['Groups documents', 'Filters documents', 'Sorts documents', 'Projects fields'], 1, '$match filters documents in the pipeline.'),
    m('Where should $match ideally be placed?', ['Last stage', 'First or early', 'After $group', 'Before $project only'], 1, '$match should be early to reduce pipeline data.'),
    m('Can $match use indexes?', ['No', 'Yes, when first stage', 'Only after $sort', 'Only with $lookup'], 1, '$match uses indexes when it is the first pipeline stage.'),
    m('Which operator compares fields within a document?', ['$eq', '$expr', '$compare', '$fields'], 1, '$expr enables field-to-field comparisons.'),
    m('What is the difference between $match and $project?', ['$match removes docs, $project reshapes fields', 'Same operation', '$project removes docs', '$match reshapes fields'], 0, '$match filters documents, $project reshapes fields.'),
    m('Does $match support $text?', ['Yes', 'No', 'Only in find()', 'Only with $search stage'], 0, '$match supports $text with a text index.')
  ]
);

/* =================== TOPIC 12: $group =================== */
addTopic('mongodb-aggregation-group', '$group', 'intermediate', 20,
  ['$group groups documents by a specified key expression and computes aggregate values using accumulator operators.',
   'The _id field in $group specifies the grouping key; use null to aggregate all documents into a single group.',
   'Accumulators: $sum, $avg, $min, $max, $first, $last, $push, $addToSet, $stdDevPop, $stdDevSamp.',
   '$group is often preceded by $match to filter input documents and followed by $sort to order results.'
  ],
  '$group is like sorting LEGO bricks by color and then counting how many you have of each color.',
  [
    d('Grouping Key (_id)', 'The _id field defines how documents are grouped. Use a field path: { _id: "$category" }. Use null for all docs: { _id: null }. Use compound key: { _id: { cat: "$category", status: "$status" } }. Use expressions: { _id: { $month: "$date" } }.'),
    d('Accumulator Operators', '$sum: total (1 for count). $avg: average. $min/$max: min/max value. $first/$last: first/last doc value (requires sort). $push: array of all values. $addToSet: unique values array. $stdDevPop/$stdDevSamp: standard deviation.'),
    d('Document Order in $group', '$group does not guarantee document order. Use $sort after $group for ordering. $first and $last accumulators require preceding $sort to be meaningful.'),
    d('Memory', '$group is memory-intensive. All grouped data must fit within the 100MB memory limit (use allowDiskUse: true for larger datasets). Group by fields with low cardinality for better performance.'),
    d('Post-Group Operations', 'Common stages after $group: $sort to order groups, $limit to cap results, $project to reshape, $match to filter groups (use $match after $group, not $group\'s _id for filtering).')
  ],
  '$group is the core aggregating stage. Understanding grouping keys and accumulators unlocks powerful data summarization capabilities.',
  [
    q('What does $group do?', 'Groups documents by a key expression and computes aggregate values using accumulators like $sum, $avg, $min, $max.'),
    q('How do you group all documents together?', 'Set _id: null in $group. This places all documents into a single group for overall aggregates.'),
    q('What accumulators does $group support?', '$sum, $avg, $min, $max, $first, $last, $push, $addToSet, $stdDevPop, $stdDevSamp.'),
    q('How do you create a compound group key?', 'Use an object: { _id: { category: "$cat", status: "$status" } }. The result _id becomes the compound object.'),
    q('What is the memory limit for $group?', '100MB by default. Use allowDiskUse: true for larger than 100MB datasets.'),
    q('How do $first and $last work?', 'They return the value from the first/last document in each group. Requires preceding $sort to be meaningful.'),
    q('What does $push do?', 'Creates an array of all values of a field across documents in the group. Can create large output arrays.'),
    q('What does $addToSet do?', 'Creates an array of unique values of a field across documents in the group. Removes duplicates.'),
    q('Can you group on computed values?', 'Yes. Use expressions: { _id: { $month: "$date" } } groups by month. { _id: { $toUpper: "$name" } } groups by uppercase name.'),
    q('Can you have multiple $group stages?', 'Yes. Multiple $group stages allow hierarchical aggregation: group by category, then group results by some other key.')
  ],
  R(10,40,140,30,'#47A248','','Input Docs','Raw Documents') +
  A(150,55,180,55) +
  R(190,40,140,35,'#0070f3','','$group','_id: "$category"') +
  A(190,75,190,95) +
  R(190,95,140,30,'#28a745','','Accumulators','$sum, $avg, $push') +
  A(330,78,360,78) +
  R(370,65,110,30,'#ffc107','','Result','Grouped Docs') +
  T(240,160,'$group: Group by key, compute aggregates with accumulators.',9,'#666','middle'),
  [
    e('Count by Field', 'Orders by status.', codeBlock([
      'await db.collection(\'orders\').aggregate([',
      '  { $group: { _id: "$status", count: { $sum: 1 }, totalAmount: { $sum: "$amount" } } }',
      ']).toArray();'
    ]), 'Groups orders by status, counts and sums per group.'),
    e('Overall Aggregate', 'Using _id: null.', codeBlock([
      'await db.collection(\'products\').aggregate([',
      '  { $group: { _id: null, avgPrice: { $avg: "$price" }, maxPrice: { $max: "$price" }, count: { $sum: 1 } } }',
      ']).toArray();'
    ]), 'Computes avg price, max price, and total count across all products.'),
    e('Compound Group Key', 'Multiple grouping fields.', codeBlock([
      'await db.collection(\'sales\').aggregate([',
      '  { $group: { _id: { year: { $year: "$date" }, month: { $month: "$date" } }, total: { $sum: "$amount" } } }',
      ']).toArray();'
    ]), 'Groups sales by year and month, summing amounts.'),
    e('Push to Array', 'Collect values.', codeBlock([
      'await db.collection(\'orders\').aggregate([',
      '  { $group: { _id: "$customerId", items: { $push: "$item" }, totalSpent: { $sum: "$amount" } } }',
      ']).toArray();'
    ]), 'Groups by customer, collects item names into array.'),
    e('First and Last', 'Earliest and latest.', codeBlock([
      'await db.collection(\'sensor\').aggregate([',
      '  { $sort: { timestamp: 1 } },',
      '  { $group: { _id: "$sensorId", firstReading: { $first: "$value" }, lastReading: { $last: "$value" } } }',
      ']).toArray();'
    ]), 'Gets first and last sensor readings per sensor (requires sort).')
  ],
  [
    m('What does _id: null in $group do?', ['Error', 'Groups all docs into one group', 'Creates null key', 'Skips grouping'], 1, '_id: null groups all documents into one.'),
    m('Which accumulator creates an array of values?', ['$sum', '$push', '$avg', '$min'], 1, '$push collects values into an array.'),
    m('What is the default memory limit for $group?', ['50MB', '100MB', '200MB', 'Unlimited'], 1, 'Default memory limit is 100MB.'),
    m('How do you get unique values in $group?', ['$push', '$addToSet', '$unique', '$distinct'], 1, '$addToSet creates unique values array.'),
    m('What must precede $group for meaningful $first?', ['$match', '$sort', '$limit', '$project'], 1, '$sort before $group gives meaningful $first.'),
    m('Can you group on computed expressions?', ['No', 'Yes, any expression', 'Only dates', 'Only strings'], 1, 'Group on any expression: { $month: "$date" }.')
  ]
);

/* =================== TOPIC 13: $project =================== */
addTopic('mongodb-aggregation-project', '$project', 'intermediate', 15,
  ['$project reshapes documents by including, excluding, adding, or renaming fields, passing only specified fields to the next stage.',
   'Include fields with 1 (true), exclude with 0 (false). _id is included by default; set _id: 0 to exclude.',
   '$project can add computed fields using expressions: { total: { $multiply: ["$price", "$quantity"] } }.',
   'Use $addFields instead of $project when you want to keep all existing fields and add computed ones.'
  ],
  '$project is like a custom photo frame. You decide exactly which parts of the picture to show and what labels to add.',
  [
    d('Field Inclusion/Exclusion', 'Set field to 1 (include) or 0 (exclude). Mixing 1s and 0s is allowed except for _id. Inclusion mode: { field1: 1, field2: 1 } excludes all non-specified fields. Exclusion mode: { field1: 0 } includes all other fields.'),
    d('Computed Fields', 'Add new fields with expressions: { fullName: { $concat: ["$firstName", " ", "$lastName"] } }, { totalPrice: { $multiply: ["$price", 1.08] } }.'),
    d('Expression Operators', 'Arithmetic: $add, $subtract, $multiply, $divide, $mod. String: $concat, $substr, $toUpper, $toLower. Date: $year, $month, $dayOfMonth, $dateToString. Conditional: $cond, $ifNull, $switch.'),
    d('$project vs $addFields', '$project reshapes and can remove fields. $addFields only adds/overwrites fields while preserving all existing fields. Use $addFields when you want to keep the original document structure.'),
    d('Field Paths and Nested Fields', 'Use dot notation: "$address.city". Include nested fields: { "address.city": 1 }. Use sub-object expressions: { address: { city: "$address.city" } }.')
  ],
  '$project controls the shape of documents flowing through the pipeline. Essential for data transformation and reducing document size.',
  [
    q('What does $project do?', 'Reshapes documents by including, excluding, adding, or renaming fields. Passes only specified fields to the next stage.'),
    q('How do you exclude a field?', 'Set field to 0: { password: 0 }. All other fields are included by default.'),
    q('How do you include only specific fields?', 'Set desired fields to 1: { name: 1, email: 1 }. Non-specified fields are excluded. _id included by default.'),
    q('What is the difference between $project and $addFields?', '$project can remove fields. $addFields only adds/overwrites fields while preserving existing ones.'),
    q('How do you add a computed field?', 'Use expression operators: { total: { $multiply: ["$price", "$qty"] } }.'),
    q('Can you rename a field with $project?', 'Yes: { newName: "$oldName" }. Exclude _id: { _id: 0, newName: "$oldName" }.'),
    q('What are common string expressions?', '$concat (concatenate), $toUpper/$toLower (case), $substr (substring), $trim (whitespace).'),
    q('What are common date expressions?', '$year, $month, $dayOfMonth, $dayOfWeek, $hour, $minute, $second, $dateToString.'),
    q('What is $cond in $project?', 'Conditional: { $cond: { if: { $gte: ["$price", 100] }, then: "expensive", else: "cheap" } }.'),
    q('Can $project be used multiple times?', 'Yes. Multiple $project stages can incrementally reshape data.')
  ],
  R(10,40,140,35,'#47A248','','Input Doc','{ name, age, pwd }') +
  A(150,58,180,58) +
  R(190,40,140,35,'#0070f3','','$project','{ name: 1, _id: 0 }') +
  A(330,58,360,58) +
  R(370,40,110,35,'#28a745','','Output','{ name }') +
  R(190,95,140,30,'#ffc107','','Computed','total: { $multiply: [...] }') +
  T(240,170,'$project: Include/exclude fields, add computed fields, rename.',9,'#666','middle'),
  [
    e('Field Inclusion', 'Select specific fields.', codeBlock([
      'await db.collection(\'users\').aggregate([{ $project: { name: 1, email: 1, _id: 0 } }]).toArray();'
    ]), 'Returns only name and email, excluding _id.'),
    e('Field Exclusion', 'Remove sensitive data.', codeBlock([
      'await db.collection(\'users\').aggregate([{ $project: { password: 0, token: 0 } }]).toArray();'
    ]), 'Returns all fields except password and token.'),
    e('Computed Field', 'Full name from parts.', codeBlock([
      'await db.collection(\'users\').aggregate([{ $project: { fullName: { $concat: ["$firstName", " ", "$lastName"] }, email: 1 } }]).toArray();'
    ]), 'Creates computed fullName by concatenating first and last name.'),
    e('Conditional Value', 'Price category.', codeBlock([
      'await db.collection(\'products\').aggregate([{ $project: { name: 1, price: 1, category: { $cond: { if: { $gte: ["$price", 100] }, then: "Premium", else: "Standard" } } } }]).toArray();'
    ]), 'Adds computed category based on price threshold.'),
    e('Date Transformation', 'Extract date parts.', codeBlock([
      'await db.collection(\'orders\').aggregate([{ $project: { orderId: 1, year: { $year: "$date" }, month: { $month: "$date" } } }]).toArray();'
    ]), 'Extracts year and month components from date field.')
  ],
  [
    m('What does $project do?', ['Groups documents', 'Reshapes fields', 'Filters documents', 'Sorts results'], 1, '$project reshapes fields.'),
    m('How do you include only name and email?', ['{ name: 1, email: 1, _id: 0 }', '{ fields: ["name","email"] }', '{ name: 1, email: 1 }', 'Both A and C work'], 0, 'Set fields to 1, exclude _id.'),
    m('Which expression concatenates strings?', ['$add', '$concat', '$merge', '$join'], 1, '$concat concatenates string values.'),
    m('What does $cond do?', ['Conditional logic', 'Condenses arrays', 'Counts documents', 'Converts types'], 0, '$cond provides if-then-else conditional logic.'),
    m('How do you rename a field?', ['{ newName: "$oldName" }', '{ rename: ["old","new"] }', '{ $rename: { old: "new" } }', '{ old: "$newName" }'], 0, 'Set new field path to old field value.'),
    m('What is $project vs $addFields?', ['$project removes fields', '$addFields removes fields', 'Same operation', '$project is faster'], 0, '$project can remove fields, $addFields only adds.')
  ]
);

/* =================== TOPIC 14: $lookup =================== */
addTopic('mongodb-aggregation-lookup', '$lookup', 'advanced', 30,
  ['$lookup performs a left outer join between the current collection and another collection in the same database.',
   'It adds a new array field to each document containing matching documents from the foreign collection.',
   'Basic syntax: { $lookup: { from: "foreignCollection", localField: "key", foreignField: "_id", as: "results" } }.',
   'MongoDB 3.6+ supports pipeline and let variables for correlated subqueries.'
  ],
  '$lookup is like having two phone books and looking up matching entries between them. You take entries from one book, find corresponding entries in the other, and combine the information.',
  [
    d('Basic $lookup', 'Four required fields: from (target collection), localField (field in current docs), foreignField (field in target docs), as (output array field name). Result is an array of matching documents added to each source document.'),
    d('Pipeline $lookup', 'MongoDB 3.6+ supports pipeline syntax: { $lookup: { from: "orders", let: { userId: "$_id" }, pipeline: [{ $match: { $expr: { $eq: ["$userId", "$$userId"] } } }, { $limit: 5 }], as: "recentOrders" } }. Enables subqueries with filtering, sorting, limiting.'),
    d('Unwinding $lookup Results', 'After $lookup, joined docs are in an array. Use $unwind immediately after: { $unwind: "$results" }. For left outer behavior, use $unwind with preserveNullAndEmptyArrays: true.'),
    d('Indexing for $lookup', 'Create indexes on foreignField in the foreign collection. Without indexes, $lookup performs a collection scan. Compound indexes also help.'),
    d('Performance Considerations', '$lookup can be slow on large collections without indexes. Consider denormalization (embedding) for frequently accessed related data.')
  ],
  '$lookup enables relational-style joins in MongoDB. While powerful, use judiciously — embedding is often more performant.',
  [
    q('What does $lookup do?', 'Left outer join with another collection. Adds array of matching foreign documents to each source document.'),
    q('What are required fields?', 'from (foreign collection), localField (source field), foreignField (target field), as (output array field).'),
    q('How do you flatten results?', 'Use $unwind after $lookup. Use preserveNullAndEmptyArrays: true for left join behavior.'),
    q('What is pipeline $lookup?', 'Extended syntax allowing subqueries with pipeline and let variables for correlated subqueries.'),
    q('How to optimize $lookup?', 'Create indexes on foreignField. Use pipeline $lookup with $match to reduce joined data.'),
    q('What happens if no match?', 'Output array is empty []. Use $unwind with preserveNullAndEmptyArrays: true to keep source docs.'),
    q('Can $lookup join more than 2 collections?', 'Chain multiple $lookup stages. Each joins one additional collection.'),
    q('What is the difference between $lookup and embedding?', '$lookup joins at query time (flexible). Embedding stores data in the source doc (faster reads).'),
    q('Can $lookup use indexes?', 'Yes, indexes on foreignField in foreign collection significantly improve performance.'),
    q('What does the "as" field specify?', 'The output array field name added to each source document containing matching documents.')
  ],
  R(10,40,140,35,'#47A248','','Orders','{ userId: 1, item: "A" }') +
  A(150,58,180,58) +
  R(190,40,140,35,'#0070f3','','$lookup','from: "users"') +
  A(330,58,370,58) +
  R(380,40,100,35,'#28a745','','Users','{ _id: 1, name: "A" }') +
  A(190,75,190,103) +
  R(190,105,140,35,'#ffc107','','Result Array','{ ..., user: [{...}] }') +
  T(240,180,'$lookup: Left outer join with another collection.',9,'#666','middle'),
  [
    e('Basic $lookup', 'Join orders with users.', codeBlock([
      'await db.collection(\'orders\').aggregate([',
      '  { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "user" } },',
      '  { $unwind: "$user" }',
      ']).toArray();'
    ]), 'Joins orders with users on userId, flattens.'),
    e('Pipeline $lookup', 'With let and pipeline.', codeBlock([
      'await db.collection(\'users\').aggregate([',
      '  { $lookup: { from: "orders", let: { uid: "$_id" }, pipeline: [',
      '    { $match: { $expr: { $eq: ["$userId", "$$uid"] } } },',
      '    { $sort: { createdAt: -1 } },',
      '    { $limit: 3 }',
      '  ], as: "recentOrders" } }',
      ']).toArray();'
    ]), 'Finds each user\'s 3 most recent orders.'),
    e('Left Outer Join', 'Keep users with no orders.', codeBlock([
      'await db.collection(\'users\').aggregate([',
      '  { $lookup: { from: "orders", localField: "_id", foreignField: "userId", as: "orders" } },',
      '  { $unwind: { path: "$orders", preserveNullAndEmptyArrays: true } }',
      ']).toArray();'
    ]), 'Keeps users even without orders.'),
    e('Multiple $lookup', 'Join users, orders, reviews.', codeBlock([
      'await db.collection(\'users\').aggregate([',
      '  { $lookup: { from: "orders", localField: "_id", foreignField: "userId", as: "orders" } },',
      '  { $lookup: { from: "reviews", localField: "_id", foreignField: "userId", as: "reviews" } }',
      ']).toArray();'
    ]), 'Joins users with both orders and reviews.'),
    e('Post-Join Filter', 'Filter after $lookup.', codeBlock([
      'await db.collection(\'orders\').aggregate([',
      '  { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "user" } },',
      '  { $unwind: "$user" },',
      '  { $match: { "user.isActive": true } }',
      ']).toArray();'
    ]), 'Joins then filters to only active users.')
  ],
  [
    m('What does $lookup do?', ['Groups docs', 'Joins collections', 'Filters arrays', 'Sorts results'], 1, '$lookup joins two collections.'),
    m('What does the "as" field specify?', ['Source field', 'Output array field', 'Foreign collection', 'Join type'], 1, '"as" names the output array field.'),
    m('Which stage flattens $lookup arrays?', ['$match', '$unwind', '$group', '$project'], 1, '$unwind deconstructs the result array.'),
    m('What option keeps docs with no match?', ['preserveNullAndEmptyArrays: true', 'keepEmpty: true', 'nullAsEmpty: true', 'allowEmpty: true'], 0, 'preserveNullAndEmptyArrays keeps unmatched docs.'),
    m('How to optimize $lookup performance?', ['Indexes on foreignField', 'Use allowDiskUse', 'Limit input docs', 'All of the above'], 3, 'Indexes, allowDiskUse, and limiting input all help.'),
    m('What is the result type of $lookup?', ['Document', 'Array', 'Cursor', 'Boolean'], 1, 'Result is an array of matching documents.')
  ]
);

/* =================== TOPIC 15: $sort =================== */
addTopic('mongodb-aggregation-sort', '$sort', 'beginner', 15,
  ['$sort orders documents by specified fields ascending (1) or descending (-1).',
   'Multi-field sort: { $sort: { category: 1, price: -1 } } sorts by category ascending, then price descending.',
   '$sort can use indexes when placed early. Without indexes, $sort is in-memory with 100MB limit.',
   '$sort before $limit enables top-N optimization tracking only top N documents.'
  ],
  '$sort is like arranging a deck of cards in a specific order — by suit first, then by rank within each suit.',
  [
    d('Sort Specification', '{ field: 1 } ascending, { field: -1 } descending. Multiple fields: { field1: 1, field2: -1 }. Tiebreakers with subsequent fields.'),
    d('Index Usage', '$sort uses indexes when first stage or follows $match with index. Compound indexes must match sort order.'),
    d('Top-N Optimization', '$sort immediately followed by $limit only tracks top N documents. Dramatically reduces memory usage.'),
    d('Memory Limit', '100MB default. Use allowDiskUse: true for larger datasets. Without it, sort fails if exceeding 100MB.'),
    d('Natural Order', 'Natural order is insertion order. $sort is always required for guaranteed ordering.')
  ],
  '$sort is essential for ordered results. Combined with $limit, enables efficient top-N and pagination.',
  [
    q('What does $sort do?', 'Orders documents by specified fields. 1 ascending, -1 descending.'),
    q('How to sort by multiple fields?', '{ $sort: { category: 1, price: -1 } }.'),
    q('Can $sort use indexes?', 'Yes, when placed early. Index order must match sort order.'),
    q('What is top-N optimization?', '$sort + $limit: only sorts top N documents, saving memory.'),
    q('What is the memory limit for $sort?', '100MB by default. Use allowDiskUse: true for larger.'),
    q('Do I always need $sort?', 'Yes for guaranteed order. Without it, order is undefined.'),
    q('How does $sort handle ties?', 'Equal values use subsequent sort fields. Ties without tiebreakers = undefined.'),
    q('Can you sort on computed fields?', 'Yes. Compute with $addFields/$project first, then $sort.'),
    q('What happens if $sort exceeds 100MB?', 'Error unless allowDiskUse: true.'),
    q('How does $sort differ from cursor sort?', '$sort is pipeline stage. find().sort() is cursor method. Similar syntax.')
  ],
  R(10,40,140,35,'#47A248','','Input Docs','[{price:5}, {price:1}]') +
  A(150,58,180,58) +
  R(190,40,140,35,'#0070f3','','$sort','{price: 1}') +
  A(330,58,370,58) +
  R(380,40,100,35,'#28a745','','Sorted','[{price:1}, {price:5}]') +
  T(240,120,'$sort: Order documents ascending (1) or descending (-1).',9,'#666','middle'),
  [
    e('Single Field Sort', 'Sort by price ascending.', codeBlock([
      'await db.collection(\'products\').aggregate([{ $sort: { price: 1 } }]).toArray();'
    ]), 'Sorts products by price ascending.'),
    e('Multi-Field Sort', 'Category then price.', codeBlock([
      'await db.collection(\'products\').aggregate([{ $sort: { category: 1, price: -1 } }]).toArray();'
    ]), 'Sorts by category ascending, price descending within category.'),
    e('Top-N with $limit', 'Top 5 most expensive.', codeBlock([
      'await db.collection(\'products\').aggregate([{ $sort: { price: -1 } }, { $limit: 5 }]).toArray();'
    ]), 'Top 5 with top-N optimization.'),
    e('Sort After $group', 'Order aggregated results.', codeBlock([
      'await db.collection(\'orders\').aggregate([',
      '  { $group: { _id: "$productId", totalSales: { $sum: "$amount" } } },',
      '  { $sort: { totalSales: -1 } }',
      ']).toArray();'
    ]), 'Groups by product, sorts by total sales descending.'),
    e('Sort with allowDiskUse', 'Large dataset.', codeBlock([
      'await db.collection(\'events\').aggregate([{ $sort: { timestamp: -1 } }], { allowDiskUse: true }).toArray();'
    ]), 'Sorts using disk if memory limit exceeded.')
  ],
  [
    m('What value indicates ascending?', ['0', '1', '-1', 'true'], 1, '1 ascending, -1 descending.'),
    m('Default memory limit for $sort?', ['50MB', '100MB', '200MB', '500MB'], 1, '100MB default memory limit.'),
    m('What does $sort + $limit enable?', ['Parallel sort', 'Top-N optimization', 'Index-only sort', 'Disk sort'], 1, 'Top-N tracks N documents.'),
    m('How to allow disk-based sort?', ['useDisk', 'allowDiskUse: true', 'maxMemory: false', 'memoryLimit: 0'], 1, 'allowDiskUse: true enables disk sort.'),
    m('Can $sort use indexes?', ['No', 'Yes, early in pipeline', 'Only after $limit', 'Only with $match'], 1, '$sort uses indexes when early.'),
    m('What stage order must match for index sort?', ['Sort direction must match index', 'Any direction works', 'Only ascending', 'Only descending'], 0, 'Sort direction must match index direction.')
  ]
);

/* =================== TOPIC 16: $skip =================== */
addTopic('mongodb-aggregation-skip', '$skip', 'beginner', 10,
  ['$skip skips N documents before passing remaining documents to the next stage.',
   'Commonly used with $sort and $limit for pagination: $sort, $skip, $limit.',
   'Inefficient for large offsets because MongoDB iterates through skipped documents.',
   'Use range-based pagination with indexed fields for large datasets.'
  ],
  '$skip is like flipping past a certain number of pages before you start reading.',
  [
    d('Syntax', '{ $skip: <positive integer> }. Skips N documents from the beginning of the sorted/filtered set. Order from previous stage determines what is skipped.'),
    d('Pagination Pattern', '$sort → $skip (page * pageSize) → $limit (pageSize). Page 1: skip 0, limit 10. Page 2: skip 10, limit 10.'),
    d('Performance Issues', '$skip iterates over all skipped documents. Page 1000 still processes 10,000 docs. Use range-based pagination for large offsets.'),
    d('Range-Based Pagination', 'Use { $match: { _id: { $gt: lastSeenId } } } with { $limit: 10 }. Uses index, no skipped document processing.'),
    d('$skip vs $limit Order', '$skip before $limit skips then limits. $limit before $skip limits then skips. Standard: $sort → $skip → $limit.')
  ],
  '$skip is simple but has performance implications for large offsets. Prefer range-based pagination.',
  [
    q('What does $skip do?', 'Skips N documents from beginning of input, passes rest to next stage.'),
    q('How is $skip used for pagination?', '$sort → $skip (page * size) → $limit (size).'),
    q('Performance concern with large $skip?', 'Must iterate over skipped documents. Range-based pagination avoids this.'),
    q('What is range-based pagination?', '$match with $gt on indexed field instead of $skip. Only processes after last seen ID.'),
    q('What syntax?', '{ $skip: <positive integer> }. Must be >= 0.'),
    q('Does $skip guarantee order?', 'No. Requires $sort before for predictable results.'),
    q('Can $skip be used multiple times?', 'Yes, but inefficient. Compounds the performance issue.'),
    q('$skip vs $limit?', '$skip removes from start. $limit keeps from start. Complementary for pagination.'),
    q('Does $skip use indexes?', 'No. Preceding $match/$sort can use indexes, but $skip still iterates.'),
    q('Recommended pagination for large datasets?', 'Range-based: { $match: { createdAt: { $gt: lastTs } } }, { $sort: { createdAt: 1 } }, { $limit: size }.')
  ],
  R(10,40,140,35,'#47A248','','Input Docs','[d1,d2,d3,d4,d5]') +
  A(150,58,180,58) +
  R(190,40,140,35,'#0070f3','','$skip: 2','Skips d1, d2') +
  A(330,58,370,58) +
  R(380,40,100,35,'#28a745','','Output','[d3,d4,d5]') +
  T(240,120,'$skip: Skip N documents, pass rest to next stage.',9,'#666','middle'),
  [
    e('Basic Pagination', 'Page 2 of products.', codeBlock([
      'await db.collection(\'products\').aggregate([{ $sort: { name: 1 } }, { $skip: 10 }, { $limit: 10 }]).toArray();'
    ]), 'Page 2 of products sorted by name.'),
    e('Range-Based Pagination', 'Efficient with index.', codeBlock([
      'await db.collection(\'products\').aggregate([{ $match: { _id: { $gt: lastSeenId } } }, { $sort: { _id: 1 } }, { $limit: 10 }]).toArray();'
    ]), 'Efficient pagination using indexed _id.'),
    e('$skip in Nested Context', 'After $unwind.', codeBlock([
      'await db.collection(\'users\').aggregate([',
      '  { $unwind: "$orders" },',
      '  { $sort: { "orders.date": -1 } },',
      '  { $skip: 5 }, { $limit: 5 }',
      ']).toArray();'
    ]), 'Pagination on unwound orders.'),
    e('$skip with $facet', 'Multiple pages at once.', codeBlock([
      'await db.collection(\'products\').aggregate([{ $facet: { page1: [{ $sort: { name: 1 } }, { $limit: 10 }], page2: [{ $sort: { name: 1 } }, { $skip: 10 }, { $limit: 10 }] }}]).toArray();'
    ]), 'Returns both page 1 and page 2 in one aggregation.'),
    e('Invalid Negative Skip', 'Causes error.', codeBlock([
      '{ $skip: 0 } // Valid, skips nothing'
    ]), '$skip requires non-negative integer.')
  ],
  [
    m('What does $skip do?', ['Limits results', 'Skips N documents', 'Sorts documents', 'Groups documents'], 1, '$skip removes N from beginning.'),
    m('Performance issue with $skip?', ['Always fast', 'Iterates over skipped docs', 'No memory use', 'Cannot use indexes'], 1, '$skip still processes skipped documents.'),
    m('Correct pagination order?', ['$limit, $skip, $sort', '$sort, $skip, $limit', '$skip, $sort, $limit', '$sort, $limit, $skip'], 1, 'Correct order: $sort → $skip → $limit.'),
    m('Better than $skip for large offsets?', ['$limit', 'Range-based $gt', 'More $skip stages', 'Natural order'], 1, 'Range-based pagination with $gt.'),
    m('What value does $skip accept?', ['Any integer', 'Non-negative integer', 'Boolean', 'String'], 1, 'Non-negative integer.'),
    m('Can $skip guarantee order?', ['Yes', 'No, needs $sort before', 'Only with $limit', 'Only after $match'], 1, 'Requires $sort before for order.')
  ]
);

/* =================== TOPIC 17: $limit =================== */
addTopic('mongodb-aggregation-limit', '$limit', 'beginner', 10,
  ['$limit passes only the first N documents to the next stage.',
   'Used with $sort for top-N queries and with $skip for pagination.',
   '$sort + $limit enables top-N optimization for efficient memory usage.',
   'Also useful for sampling during development.'
  ],
  '$limit is like saying "I only want the first 10 items." It cuts off anything beyond.',
  [
    d('Syntax', '{ $limit: <positive integer> }. N >= 1. Multiple $limit stages: smallest limit wins.'),
    d('Top-N Optimization', '$sort + $limit: only tracks top N during sort. Significant performance win for large collections.'),
    d('Early vs Late Placement', 'Place early to reduce data flow. But not before stages needing all data (like $group).'),
    d('$limit with $sample', '{ $sample: { size: 100 } } randomly selects ~100 docs. More efficient than sort + limit for random sampling.'),
    d('Use Cases', 'Top-N queries, pagination (with $skip), development sampling, preventing excessive output.')
  ],
  '$limit caps documents flowing through the pipeline. Simple but powerful when placed early.',
  [
    q('What does $limit do?', 'Passes only first N documents to next stage.'),
    q('What is top-N optimization?', '$sort + $limit: only sorts top N docs. Saves memory and time.'),
    q('Where to place $limit?', 'Early to reduce data flow. Not before stages needing all data like $group.'),
    q('What syntax?', '{ $limit: <positive integer> }. Must be >= 1.'),
    q('How does $limit affect $group?', 'Only limited documents are grouped. May produce incorrect aggregates.'),
    q('Can multiple $limit be used?', 'Yes, smallest limit wins. Redundant.'),
    q('$limit vs $sample?', '$limit returns sequential first N. $sample randomly selects.'),
    q('How in pagination?', 'After $skip: $sort → $skip → $limit.'),
    q('Is there a maximum?', 'No hard limit, but large limits may cause memory issues.'),
    q('How does $limit affect $sort?', '$limit after $sort enables top-N optimization.')
  ],
  R(10,40,140,35,'#47A248','','Input Docs','[d1,d2,d3,d4,d5]') +
  A(150,58,180,58) +
  R(190,40,140,35,'#0070f3','','$limit: 3','Keeps d1,d2,d3') +
  A(330,58,370,58) +
  R(380,40,100,35,'#28a745','','Output','[d1,d2,d3]') +
  T(240,120,'$limit: Pass only first N documents.',9,'#666','middle'),
  [
    e('Top-5 Query', 'Top 5 best sellers.', codeBlock([
      'await db.collection(\'products\').aggregate([{ $sort: { soldCount: -1 } }, { $limit: 5 }]).toArray();'
    ]), 'Top 5 with top-N optimization.'),
    e('Pagination', 'Page 2, 10 per page.', codeBlock([
      'await db.collection(\'articles\').aggregate([{ $sort: { publishedAt: -1 } }, { $skip: 10 }, { $limit: 10 }]).toArray();'
    ]), 'Page 2 of articles.'),
    e('Development Sampling', 'Test on small data.', codeBlock([
      'await db.collection(\'users\').aggregate([{ $limit: 100 }, { $group: { _id: "$country", count: { $sum: 1 } } }]).toArray();'
    ]), 'Tests grouping on first 100 users.'),
    e('Early Limit After $match', 'Efficient pipeline.', codeBlock([
      'await db.collection(\'orders\').aggregate([{ $match: { status: "completed" } }, { $limit: 50 }, { $group: { _id: "$productId", total: { $sum: "$amount" } } }]).toArray();'
    ]), 'Limits to 50 completed orders before grouping.'),
    e('$limit in $facet', 'Multiple limits.', codeBlock([
      'await db.collection(\'products\').aggregate([{ $facet: { top3: [{ $sort: { price: -1 } }, { $limit: 3 }], cheapest: [{ $sort: { price: 1 } }, { $limit: 3 }] }}]).toArray();'
    ]), 'Returns top 3 expensive and cheapest.')
  ],
  [
    m('What does $limit do?', ['Limits fields', 'Limits to first N docs', 'Limits collection size', 'Limits query time'], 1, 'Passes only first N documents.'),
    m('$sort + $limit optimization?', ['Index scan', 'Top-N optimization', 'Parallel execution', 'Disk sort'], 1, 'Only sorts top N.'),
    m('What value does $limit accept?', ['Any number', 'Positive integer', 'Boolean', 'String'], 1, 'Positive integer.'),
    m('Where to place $limit?', ['Last stage', 'Early as possible', 'After $group only', 'Before $sort'], 1, 'Early as possible.'),
    m('What if $limit before $group?', ['All docs grouped', 'Only limited docs grouped', 'Error', '$group skipped'], 1, 'Only limited docs grouped.'),
    m('$limit vs $sample?', ['Same', '$limit sequential, $sample random', '$limit random', '$sample sequential'], 1, '$limit returns first N, $sample random.')
  ]
);

/* =================== TOPIC 18: Indexing =================== */
addTopic('mongodb-indexing', 'Indexing', 'intermediate', 30,
  ['Indexes store a small portion of collection data for fast query access.',
   'Without indexes, MongoDB scans every document (collection scan).',
   'Indexes support equality, range, sorting, and can be compound.',
   'Right indexes are the single most impactful MongoDB performance optimization.'
  ],
  'An index is like a book\'s table of contents. Instead of reading every page, you look up the topic and go directly to the page.',
  [
    d('How Indexes Work', 'B-tree data structures storing references to documents sorted by indexed field(s). Supports range queries, equality matches, sorted access. Writes must update indexes, adding overhead.'),
    d('Single Field Index', 'createIndex({ field: 1 }). Supports queries on that field. Can use partial, sparse, unique options.'),
    d('Index Options', 'Unique: prevents duplicates. Sparse: only indexes docs with the field. TTL: auto-deletes after time. Partial: indexes only matching docs.'),
    d('Index Usage Analysis', 'Use .explain(\'executionStats\'). Look for IXSCAN vs COLLSCAN. Check totalDocsExamined vs nReturned.'),
    d('Index Maintenance', 'getIndexes() to list, dropIndex() to remove, reIndex() to rebuild. Unused indexes waste memory and slow writes.')
  ],
  'Indexing is the most critical MongoDB performance feature. Understanding index types and analysis separates novices from experts.',
  [
    q('What is an index?', 'Data structure for fast query access. Avoids scanning every document.'),
    q('How does single field index work?', 'createIndex({ field: 1 }). Supports equality, range, sort on that field.'),
    q('IXSCAN vs COLLSCAN?', 'IXSCAN uses index (fast). COLLSCAN scans all documents (slow).'),
    q('Downsides of indexes?', 'Write overhead, memory usage, creation time on large collections.'),
    q('How to check index usage?', '.explain(\'executionStats\'). Look for IXSCAN stage.'),
    q('What is unique index?', 'Prevents duplicate values. { unique: true }.'),
    q('What is sparse index?', 'Only indexes docs containing the field. { sparse: true }.'),
    q('What is TTL index?', 'Auto-deletes after specified time. { expireAfterSeconds: N }.'),
    q('How to list indexes?', 'db.collection.getIndexes().'),
    q('How to drop an index?', 'db.collection.dropIndex(\'name\') or dropIndex({ field: 1 }).')
  ],
  R(10,40,140,35,'#47A248','','Query','find({email: "a@b"})') +
  A(150,58,180,58) +
  R(190,40,140,35,'#0070f3','','Index Scan','IXSCAN - Fast') +
  A(330,58,370,58) +
  R(380,40,100,35,'#28a745','','Result','1 Document') +
  A(180,75,180,103) +
  R(180,105,140,30,'#ffc107','','No Index','COLLSCAN - Slow') +
  T(240,180,'Indexing: B-tree indexes for fast queries. Avoid collection scans.',9,'#666','middle'),
  [
    e('Single Field Index', 'Unique email index.', codeBlock([
      'db.collection(\'users\').createIndex({ email: 1 }, { unique: true });',
      '// find({ email: "alice@example.com" }) uses index'
    ]), 'Creates unique ascending index on email.'),
    e('Compound Index', 'Multiple fields.', codeBlock([
      'db.collection(\'orders\').createIndex({ userId: 1, createdAt: -1 });',
      '// find({ userId: x }).sort({ createdAt: -1 })'
    ]), 'Index on userId ascending, createdAt descending.'),
    e('TTL Index', 'Auto-expire after 24h.', codeBlock([
      'db.collection(\'sessions\').createIndex({ lastAccess: 1 }, { expireAfterSeconds: 86400 });'
    ]), 'Auto-removes sessions 24h after lastAccess.'),
    e('Partial Index', 'Only active users.', codeBlock([
      'db.collection(\'users\').createIndex({ email: 1 }, { partialFilterExpression: { isActive: true } });'
    ]), 'Smaller index for active users only.'),
    e('Explain Query', 'Check index usage.', codeBlock([
      'const exp = await db.collection(\'users\').find({ email: "a@b.com" }).explain(\'executionStats\');',
      'console.log(exp.executionStats.totalDocsExamined); // 0 if indexed'
    ]), 'Verify totalDocsExamined = 0 when using index.')
  ],
  [
    m('What does an index do?', ['Encrypts data', 'Speeds queries', 'Compresses data', 'Backs up data'], 1, 'Indexes speed up queries.'),
    m('What is COLLSCAN?', ['Using an index', 'Scanning all docs', 'Scanning indexes', 'Partial scan'], 1, 'Collection scan reads every document.'),
    m('Which option prevents duplicates?', ['unique: true', 'sparse: true', 'duplicate: false', 'distinct: true'], 0, 'unique: true prevents duplicates.'),
    m('What does .explain() show?', ['Query results', 'Query execution plan', 'Index size', 'Collection stats'], 1, 'Shows query execution plan.'),
    m('Downside of many indexes?', ['Slow reads', 'Slow writes + memory', 'Data loss', 'None'], 1, 'Indexes slow writes and use memory.'),
    m('What index auto-deletes?', ['TTL index', 'Sparse index', 'Unique index', 'Text index'], 0, 'TTL index auto-deletes after time.')
  ]
);

/* =================== TOPIC 19: Compound Index =================== */
addTopic('mongodb-compound-index', 'Compound Index', 'intermediate', 25,
  ['A compound index indexes multiple fields. Field order determines which queries it supports.',
   'Supports queries on any prefix (ESR rule: Equality, Sort, Range).',
   'Covered queries when all needed fields are in the index.',
   'Use for multi-field queries and sorting without index intersection.'
  ],
  'A compound index is like a phone book sorted by last name then first name. You can look up by last name (prefix) but not by first name alone.',
  [
    d('ESR Rule', 'Equality fields first, Sort fields second, Range fields third. Maximizes index usage for common query patterns.'),
    d('Prefix Principle', 'Index on {a,b,c} supports {a}, {a,b}, {a,b,c}. Does NOT support {b} or {c} alone.'),
    d('Covered Queries', 'All query fields in the index. MongoDB reads only the index, no document access. Use projection.'),
    d('Sort Support', 'Index supports sort if order matches index direction. { a: 1, b: -1 } supports sort({ a: 1, b: -1 }).'),
    d('Index Cardinality', 'High-cardinality fields first for better selectivity. email before status.')
  ],
  'Compound indexes are the most powerful index type. Mastering ESR and prefix principle is essential.',
  [
    q('What is a compound index?', 'Index on multiple fields. Field order determines query support.'),
    q('What is ESR rule?', 'Equality first, Sort second, Range third. Optimal field ordering.'),
    q('What is prefix principle?', 'Index supports queries on leading prefixes. {a,b,c} supports {a}, {a,b}, not {b}.'),
    q('What is a covered query?', 'All queried fields in the index. No document access needed.'),
    q('How do compound indexes support sort?', 'Sort order matching index order returns sorted results without in-memory sort.'),
    q('Which field first?', 'High-cardinality equality field for maximum selectivity.'),
    q('Can fields have different sort directions?', 'Yes: { a: 1, b: -1 }. Sort must match exact direction.'),
    q('How to choose compound index fields?', 'Analyze query patterns. Index for frequent queries.'),
    q('Max fields?', '32. Keep to 2-5 for maintainability.'),
    q('How does field order affect range?', 'Range fields after equality and sort. Early range prevents efficient use of subsequent fields.')
  ],
  R(10,40,140,35,'#47A248','','Compound Index','{ status: 1, date: -1 }') +
  A(150,58,180,58) +
  R(190,40,140,35,'#0070f3','','Query Prefix','status=active') +
  A(330,58,370,58) +
  R(380,40,100,35,'#28a745','','Uses Index','ESR Rule') +
  A(190,75,190,103) +
  R(190,105,140,30,'#ffc107','','Result Sorted','By date desc') +
  T(240,180,'Compound Index: Multiple fields, prefix matching, ESR rule.',9,'#666','middle'),
  [
    e('ESR Index', 'Equality, Sort, Range.', codeBlock([
      'db.collection(\'orders\').createIndex({ status: 1, createdAt: -1, amount: 1 });'
    ]), 'ESR: status (eq), createdAt (sort desc), amount (range).'),
    e('Covered Query', 'All fields in index.', codeBlock([
      'db.collection(\'users\').createIndex({ email: 1, name: 1 });',
      'db.users.find({ email: "a@b.com" }, { name: 1, email: 1, _id: 0 });'
    ]), 'Covered: reads only from index, no document access.'),
    e('Prefix Principle', 'Which queries use index?', codeBlock([
      '// Index: { a: 1, b: 1, c: 1 }',
      '// Uses: find({a:1}), find({a:1,b:2}), find({a:1,b:2,c:3})',
      '// NOT: find({b:2}), find({c:3})'
    ]), 'Only leading prefix queries use the index.'),
    e('Sort Support', 'Matches index direction.', codeBlock([
      'db.collection(\'products\').createIndex({ category: 1, price: -1 });',
      '// Uses index: find({ category: "electronics" }).sort({ price: -1 })'
    ]), 'Compound index supports filter + sort.'),
    e('High Cardinality First', 'Better selectivity.', codeBlock([
      '// Good: email high cardinality',
      'db.collection.createIndex({ email: 1, status: 1 });'
    ]), 'High cardinality first for better selectivity.')
  ],
  [
    m('What is a compound index?', ['One field', 'Multiple fields', 'Cross-collection', 'Array index'], 1, 'Compound index on multiple fields.'),
    m('ESR stands for?', ['Equality, Sort, Range', 'Exact, Sort, Rough', 'Equal, Skip, Reduce', 'Execute, Scan, Return'], 0, 'Equality first, Sort second, Range third.'),
    m('Prefix principle?', ['Any field first', 'Supports leading prefixes', 'All must match', 'Only first works'], 1, 'Supports queries on leading prefixes.'),
    m('When is a query covered?', ['All fields in index', 'Uses index scan', 'No sort needed', 'Single field'], 0, 'All query fields in index, no doc access.'),
    m('Max fields in compound index?', ['16', '32', '64', 'No limit'], 1, 'Maximum 32 fields.'),
    m('Optimal first field?', ['Low cardinality', 'High cardinality', 'First in query', 'String field'], 1, 'High cardinality first for better selectivity.')
  ]
);

/* =================== TOPIC 20: Text Index =================== */
addTopic('mongodb-text-index', 'Text Index', 'intermediate', 25,
  ['Text indexes support full-text search on string content with stemming and relevance scoring.',
   'Can cover multiple fields with different weights. Uses $text operator.',
   'Supports word/phrase search, exclusion, and relevance sorting via textScore $meta.',
   'One text index per collection, covering multiple fields.'
  ],
  'A text index is like a search engine for your collection. It breaks text into words, handles word forms (running/ran), and ranks results by relevance.',
  [
    d('Creating Text Indexes', 'Single: createIndex({ content: "text" }). Multi-field with weights: createIndex({ title: "text", body: "text" }, { weights: { title: 10, body: 5 } }).'),
    d('$text Operator', '{ $text: { $search: "keywords" } } for words. $search: "\"exact phrase\"" for phrases. Minus prefix excludes. Multiple words = OR.'),
    d('Relevance Scoring', 'Text score via $meta: { score: { $meta: "textScore" } }. Sort by textScore for relevance ranking.'),
    d('Language Support', 'Multiple languages with stemming and stop words. Default: english. Set default_language: "none" for no stemming.'),
    d('Limitations', 'One text index per collection. No CJK without plugins. Not for large-scale search (use Elasticsearch).')
  ],
  'Text indexes bring basic search to MongoDB. Not as powerful as dedicated search engines but handles common scenarios well.',
  [
    q('What is a text index?', 'Full-text search index on string fields. Word/phrase matching with stemming and relevance.'),
    q('How to create?', 'createIndex({ field: "text" }). Multi-field with weights: createIndex({ title: "text", body: "text" }, { weights: { title: 10 } }).'),
    q('How to search?', 'find({ $text: { $search: "keywords" } }). Phrase: "\"exact phrase\"". Exclude with -.'),
    q('How to sort by relevance?', 'Project { score: { $meta: "textScore" } }, sort by it.'),
    q('How many text indexes?', 'At most one per collection. Can cover multiple fields.'),
    q('What languages?', 'Multiple with stemming and stop words. Default english.'),
    q('What are weights?', 'Field importance. title: 10 means 10x more important than default (1).'),
    q('How does stemming work?', 'Words reduced to root form. "running", "ran", "runs" all match "run".'),
    q('What are stop words?', 'Common words (the, a, is) ignored in text search.'),
    q('When to use dedicated search?', 'Production search at scale, faceted search, autocomplete, CJK support. Use Elasticsearch or Atlas Search.')
  ],
  R(10,40,140,30,'#47A248','','Text Index','{ title: "text" }') +
  A(150,55,180,55) +
  R(190,40,140,35,'#0070f3','','Tokenization','Split words') +
  A(190,75,190,95) +
  R(190,95,140,35,'#28a745','','Stemming','run/running') +
  A(330,78,370,78) +
  R(380,65,100,30,'#ffc107','','$search','Find matches') +
  T(240,170,'Text Index: Full-text search with stemming, weights, scoring.',9,'#666','middle'),
  [
    e('Create Text Index', 'Multi-field with weights.', codeBlock([
      'db.collection(\'articles\').createIndex({ title: "text", body: "text" }, { weights: { title: 10, body: 3 } });'
    ]), 'Text index with higher weight on title.'),
    e('Basic Search', 'Find articles about MongoDB.', codeBlock([
      'await db.collection(\'articles\').find({ $text: { $search: "mongodb aggregation" } }).toArray();'
    ]), 'Finds articles with mongodb OR aggregation.'),
    e('Phrase Search', 'Exact phrase.', codeBlock([
      'await db.collection(\'articles\').find({ $text: { $search: "\"data modeling\" mongodb" } }).toArray();'
    ]), 'Articles with "data modeling" AND mongodb.'),
    e('Sort by Relevance', 'Best matches first.', codeBlock([
      'await db.collection(\'articles\').find({ $text: { $search: "performance" } }, { score: { $meta: "textScore" } }).sort({ score: { $meta: "textScore" } }).toArray();'
    ]), 'Sorted by relevance score, highest first.'),
    e('Exclude Words', 'Search without term.', codeBlock([
      'await db.collection(\'articles\').find({ $text: { $search: "mongodb -aggregation" } }).toArray();'
    ]), 'Articles with mongodb but not aggregation.')
  ],
  [
    m('What does a text index enable?', ['String compare', 'Full-text search', 'Field validation', 'Encryption'], 1, 'Full-text search with stemming.'),
    m('How many text indexes per collection?', ['Unlimited', 'One', 'Two', 'Depends'], 1, 'At most one text index per collection.'),
    m('$text operator for?', ['Search', 'Text replacement', 'Text validation', 'Encryption'], 0, '$text performs text searches.'),
    m('Which field gives relevance?', ['textScore', 'relevance', 'score', 'rank'], 0, 'textScore via $meta.'),
    m('Weight 10 means?', ['Ignored', '10x more important', 'Excluded', 'Limited to 10'], 1, '10x more important than default.'),
    m('What are stop words?', ['Common ignored words', 'Search limits', 'Index terminations', 'Weight multipliers'], 0, 'Common words (the, a, is) ignored.')
  ]
);

/* =================== TOPIC 21: MongoDB Atlas =================== */
addTopic('mongodb-atlas', 'MongoDB Atlas', 'beginner', 20,
  ['MongoDB Atlas is a fully managed cloud database service for MongoDB, available on AWS, Azure, and GCP.',
   'Features include automated backups, monitoring, scaling, security (encryption at rest, network isolation), and global cluster deployment.',
   'Atlas Free Tier (M0) provides 512MB storage for learning and prototyping. Paid tiers offer sharded clusters, serverless, and dedicated instances.',
   'Atlas Data Services include Atlas Search (Lucene-based), Atlas Data Lake (query across cloud storage), and Atlas Charts (visualization).'
  ],
  'MongoDB Atlas is like having a team of expert database administrators working for you 24/7. They handle backups, updates, scaling, and security so you can focus on building your application.',
  [
    d('Deployment Options', 'Shared clusters (M0 free, M2, M5) for low-cost development. Dedicated clusters for production with configurable RAM, storage, and vCPU. Serverless instances auto-scale based on demand. Multi-cloud and multi-region for high availability.'),
    d('Security Features', 'Network isolation via VPC peering and IP whitelisting. Encryption at rest with cloud provider KMS. Encryption in transit with TLS. Database auditing. Private endpoints for direct cloud network connections.'),
    d('Automated Backups', 'Continuous backups with point-in-time recovery (PITR) to a specific second within the last 24 hours. Snapshot backups for longer retention. Restore to any cluster. Backup data is compressed and encrypted.'),
    d('Performance Monitoring', 'Atlas provides real-time performance metrics: operations/second, latency, connections, memory/CPU/disk usage. The Performance Advisor suggests index improvements based on query patterns. Query Profiler shows slow queries with execution stats.'),
    d('Global Clusters', 'Distribute data across geographic regions for low-latency reads and writes. Zone-aware sharding aligns data with regional compliance requirements. Cross-region replication for disaster recovery. Global writes with multi-region sharding.')
  ],
  'MongoDB Atlas simplifies database management significantly. The free tier is excellent for learning, while production features like automated backups, performance advisor, and global clusters make it suitable for enterprise applications.',
  [
    q('What is MongoDB Atlas?', 'A fully managed cloud database service for MongoDB. Handles deployments, backups, scaling, monitoring, and security automatically.'),
    q('What cloud providers does Atlas support?', 'AWS, Azure, and GCP. You can choose your provider and region, or use multi-cloud configurations.'),
    q('What is the Atlas Free Tier?', 'M0 cluster with 512MB storage, shared RAM, and limited IOPS. Suitable for learning, prototyping, and low-traffic applications.'),
    q('What is Atlas Search?', 'Full-text search powered by Apache Lucene. Supports faceted search, autocomplete, synonyms, and custom scoring. Indexes are built and managed within Atlas.'),
    q('How does Atlas handle backups?', 'Continuous backups with point-in-time recovery (PITR) for dedicated clusters. Snapshot backups with configurable retention. Automated, encrypted, and compressed.'),
    q('What is the Performance Advisor?', 'An Atlas feature that analyzes query patterns and suggests index improvements to optimize database performance.'),
    q('What is a global cluster?', 'An Atlas cluster deployed across multiple geographic regions for low-latency global access and disaster recovery.'),
    q('How does Atlas ensure security?', 'IP whitelisting, VPC peering, encryption at rest and in transit, database auditing, private endpoints, and role-based access control.'),
    q('What are Atlas serverless instances?', 'On-demand auto-scaling instances that charge based on usage. No capacity planning needed. Ideal for variable or unpredictable workloads.'),
    q('What is Atlas Data Lake?', 'A service that enables querying data stored in cloud object storage (S3, Azure Blob) using the MongoDB query language and aggregation pipeline.')
  ],
  R(10,40,120,30,'#47A248','','Your App','Application') +
  A(130,55,160,55) +
  R(170,35,130,35,'#0070f3','','Atlas API','Managed API') +
  A(300,53,330,53) +
  R(340,35,140,35,'#28a745','','Cloud Provider','AWS/Azure/GCP') +
  R(170,80,130,25,'#ffc107','','Backups','Automated') +
  R(170,115,130,25,'#e83e8c','','Monitoring','Real-time') +
  R(170,150,130,25,'#6610f2','','Security','Encryption') +
  T(240,195,'MongoDB Atlas: Fully managed cloud MongoDB with backups, monitoring, security.',9,'#666','middle'),
  [
    e('Connect to Atlas', 'Connection string format.', codeBlock([
      'const { MongoClient } = require(\'mongodb\');',
      'const uri = "mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/myDB?retryWrites=true&w=majority";',
      'const client = new MongoClient(uri);',
      'await client.connect();'
    ]), 'Connection URI format for Atlas with srv protocol and TLS.'),
    e('Create Atlas Index', 'Using Atlas Search.', codeBlock([
      '// In Atlas UI or via API:',
      '// Create search index on "articles" collection',
      '{',
      '  "mappings": {',
      '    "dynamic": true',
      '  }',
      '}'
    ]), 'Creates an Atlas Search index with dynamic field mapping.'),
    e('Atlas Search Query', 'Using $search stage.', codeBlock([
      'await db.collection(\'articles\').aggregate([',
      '  { $search: {',
      '    text: { query: "mongodb", path: "title" }',
      '  }},',
      '  { $limit: 10 }',
      ']).toArray();'
    ]), 'Atlas Search $search aggregation stage for full-text search.'),
    e('PITR Restore', 'Point-in-time recovery.', codeBlock([
      '// Atlas UI > Clusters > Restore',
      '// Select timestamp to restore to',
      '// Choose: restore to same cluster or new cluster',
      '// Atlas replays oplog to reach exact point in time'
    ]), 'Atlas PITR restores data to any second within the backup window.'),
    e('Atlas Trigger', 'React to database changes.', codeBlock([
      '// Atlas UI > Triggers > Add Trigger',
      '// Select collection, operation type (insert, update, delete)',
      '// Link to Atlas Function (serverless JS)',
      'exports = function(changeEvent) {',
      '  console.log(changeEvent.fullDocument);',
      '};'
    ]), 'Atlas Triggers automatically run serverless functions on database events.')
  ],
  [
    m('What is MongoDB Atlas?', ['A MongoDB GUI', 'A managed cloud DB service', 'An ORM tool', 'A testing framework'], 1, 'Atlas is a managed cloud database service.'),
    m('What cloud providers does Atlas support?', ['AWS only', 'AWS, Azure, GCP', 'Azure only', 'GCP only'], 1, 'Atlas supports AWS, Azure, and GCP.'),
    m('What is Atlas Free Tier storage?', ['128MB', '512MB', '1GB', '5GB'], 1, 'M0 Free Tier provides 512MB storage.'),
    m('What search engine powers Atlas Search?', ['Elasticsearch', 'Apache Lucene', 'Solr', 'Algolia'], 1, 'Atlas Search is powered by Apache Lucene.'),
    m('What suggests index improvements?', ['Query Profiler', 'Performance Advisor', 'Index Analyzer', 'Explain Plan'], 1, 'Atlas Performance Advisor suggests index improvements.'),
    m('What does PITR stand for?', ['Point-in-Time Recovery', 'Primary Index Table Rebuild', 'Performance Integration Test Report', 'Process Instruction Trace Route'], 0, 'PITR is Point-in-Time Recovery for precise data restoration.')
  ]
);

/* =================== TOPIC 22: Transactions =================== */
addTopic('mongodb-transactions', 'Transactions', 'advanced', 30,
  ['Transactions allow multiple read and write operations to be executed atomically across multiple documents and collections.',
   'Multi-document transactions are available in replica sets (MongoDB 4.0+) and sharded clusters (MongoDB 4.2+).',
   'Transactions follow similar semantics to relational database transactions: ACID (Atomicity, Consistency, Isolation, Durability).',
   'Use transactions for financial operations, inventory management, and any multi-step operations requiring atomicity.'
  ],
  'A transaction is like a bank transfer. Either all steps happen (money leaves account A AND arrives in account B), or none of them happen. You never want half a transfer.',
  [
    d('ACID Properties', 'Atomicity: all operations commit or none. Consistency: data remains valid. Isolation: concurrent transactions don\'t interfere (snapshot isolation). Durability: committed changes persist. MongoDB provides document-level atomicity by default; transactions extend this to multi-document operations.'),
    d('Transaction API', 'Session-based: const session = client.startSession(); session.startTransaction(); ... operations use session parameter ... session.commitTransaction() or session.abortTransaction(). Always wrap in try/catch/finally with session.endSession().'),
    d('Transaction Limitations', 'Max 1000 write operations per transaction. Max 60 seconds idle time. Max 15 minutes total duration. Operations must target existing collections. Index creation not allowed. Not all DDL operations permitted.'),
    d('Retry Logic', 'Transactions may fail with transient errors (WriteConflict, LockTimeout). Implement retry logic: catch TransientTransactionError and retry the entire transaction. Exponential backoff recommended. MongoClient has auto-retry for certain errors.'),
    d('When to Use Transactions', 'Financial transfers (debit + credit must both succeed). Order fulfillment (reserve stock + create order). Multi-collection updates that must be atomic. Inventory management. Avoid transactions for single-document operations (already atomic).')
  ],
  'Transactions bring ACID guarantees to multi-document operations in MongoDB. Use them when you need atomicity across documents, but rely on document-level atomicity for simpler cases.',
  [
    q('What is a MongoDB transaction?', 'A set of operations executed atomically across multiple documents and collections. All succeed or all fail (rollback).'),
    q('What ACID properties do transactions provide?', 'Atomicity (all-or-nothing), Consistency (valid state), Isolation (snapshot isolation), Durability (committed changes persist).'),
    q('When were transactions introduced?', 'Multi-document transactions: MongoDB 4.0 (replica sets), MongoDB 4.2 (sharded clusters).'),
    q('How do you start a transaction?', 'Create a session, call startTransaction(), perform operations with session parameter, then commitTransaction() or abortTransaction().'),
    q('What is the max operations per transaction?', '1000 write operations. Read operations are not counted toward this limit.'),
    q('What are transient transaction errors?', 'Temporary errors like WriteConflict or LockTimeout. Retry the entire transaction with exponential backoff.'),
    q('When should you NOT use transactions?', 'Single-document operations (already atomic). Batch operations where partial success is acceptable. Long-running transactions (max 60s idle).'),
    q('What is the idle timeout?', '60 seconds. If a transaction is idle for 60 seconds, it is automatically aborted.'),
    q('How does isolation work?', 'Snapshot isolation: reads within a transaction see a consistent snapshot of data as of the transaction start time.'),
    q('Can transactions create collections?', 'No. Target collections must exist before the transaction starts. Create collections outside transactions.')
  ],
  R(10,40,140,30,'#47A248','','Session Start','startSession()') +
  A(150,55,180,55) +
  R(190,40,140,30,'#0070f3','','Begin','startTransaction()') +
  A(190,70,190,90) +
  R(190,95,140,30,'#28a745','','Operations','Reads + Writes') +
  A(330,78,370,78) +
  R(380,65,100,50,'#ffc107','','Commit/Abort','commitTransaction() / abortTransaction()') +
  T(240,175,'Transactions: ACID guarantees for multi-document operations.',9,'#666','middle'),
  [
    e('Basic Transaction', 'Transfer money between accounts.', codeBlock([
      'const session = client.startSession();',
      'try {',
      '  session.startTransaction();',
      '  await db.collection(\'accounts\').updateOne({ _id: fromId }, { $inc: { balance: -100 } }, { session });',
      '  await db.collection(\'accounts\').updateOne({ _id: toId }, { $inc: { balance: 100 } }, { session });',
      '  await session.commitTransaction();',
      '} catch (err) {',
      '  await session.abortTransaction();',
      '  console.log(\'Transaction aborted:\', err);',
      '} finally {',
      '  await session.endSession();',
      '}'
    ]), 'Atomic fund transfer: both accounts updated or neither.'),
    e('Transaction with Retry', 'Handle transient errors.', codeBlock([
      'async function runWithRetry(fn) {',
      '  for (let attempt = 0; attempt < 3; attempt++) {',
      '    try { return await fn(); }',
      '    catch (err) { if (err.errorLabels?.includes(\'TransientTransactionError\')) continue; throw err; }',
      '  }',
      '}',
      'await runWithRetry(() => transferFunds(fromId, toId, 100));'
    ]), 'Retries transaction on transient errors up to 3 times.'),
    e('Snapshot Read', 'Consistent reads in transaction.', codeBlock([
      'const session = client.startSession();',
      'session.startTransaction({ readConcern: { level: "snapshot" }, writeConcern: { w: "majority" } });',
      'const balance = await db.collection(\'accounts\').findOne({ _id: accountId }, { session });',
      'console.log(\'Balance at transaction start:\', balance);',
      'await session.commitTransaction();'
    ]), 'Snapshot read provides consistent view from transaction start.'),
    e('Abort on Error', 'Rollback on validation failure.', codeBlock([
      'const session = client.startSession();',
      'session.startTransaction();',
      'try {',
      '  await db.collection(\'orders\').insertOne(order, { session });',
      '  await db.collection(\'inventory\').updateOne({ sku }, { $inc: { stock: -1 } }, { session });',
      '  if (newStock < 0) throw new Error(\'Insufficient stock\');',
      '  await session.commitTransaction();',
      '} catch (err) {',
      '  await session.abortTransaction();',
      '}'
    ]), 'Aborts transaction if business rule (stock check) fails.'),
    e('Transactional Output', 'Multiple outputs atomic.', codeBlock([
      'const session = client.startSession();',
      'session.startTransaction();',
      'const { insertedId: orderId } = await db.collection(\'orders\').insertOne(orderData, { session });',
      'await db.collection(\'audit\').insertOne({ action: "order_created", orderId }, { session });',
      'await db.collection(\'metrics\').updateOne({ date }, { $inc: { orderCount: 1 } }, { upsert: true, session });',
      'await session.commitTransaction();'
    ]), 'Creates order, audit entry, and updates metrics atomically.')
  ],
  [
    m('When were transactions added?', ['MongoDB 3.6', 'MongoDB 4.0', 'MongoDB 4.4', 'MongoDB 5.0'], 1, 'Multi-document transactions in MongoDB 4.0 (replica sets).'),
    m('Max operations per transaction?', ['500', '1000', '5000', '10000'], 1, 'Max 1000 write operations per transaction.'),
    m('What happens after 60s idle?', ['Paused', 'Auto-aborted', 'Continued', 'Warned'], 1, 'Transaction auto-aborted after 60 seconds idle.'),
    m('What isolation level is used?', ['Read uncommitted', 'Snapshot', 'Serializable', 'Read committed'], 1, 'Snapshot isolation for consistent reads.'),
    m('Can transactions create collections?', ['Yes', 'No', 'Only with admin', 'Only in sharded'], 1, 'Target collections must pre-exist.'),
    m('What error label triggers retry?', ['NetworkError', 'TransientTransactionError', 'DuplicateKey', 'Timeout'], 1, 'TransientTransactionError indicates retryable error.')
  ]
);

/* =================== TOPIC 23: Schema Design =================== */
addTopic('mongodb-schema-design', 'Schema Design', 'advanced', 35,
  ['Schema design in MongoDB is about structuring documents to match your application\'s query and update patterns.',
   'Unlike relational databases, MongoDB schema design focuses on embedding vs referencing, denormalization, and access patterns.',
   'Good schema design minimizes the number of queries, reduces data duplication appropriately, and aligns with how your application uses data.',
   'The key question is: how does your application query and update data? Design your schema around those access patterns.'
  ],
  'Schema design in MongoDB is like organizing a workshop. Instead of having separate drawers for every screw and bolt (relational normalization), you might put commonly used tools together in a single toolbox (embedding) for efficiency.',
  [
    d('Access Pattern First', 'Identify how your app queries, updates, and deletes data. What fields are queried together? What is the read-to-write ratio? What are the performance requirements? Design the schema to support the most frequent and important operations.'),
    d('Embedding vs Referencing', 'Embedding: store related data in the same document. Best for one-to-one, one-to-few, and tightly-coupled data accessed together. Referencing: store _id references to related documents. Best for many-to-many, large sub-documents, and loosely-coupled data.'),
    d('Denormalization', 'Duplicating data across documents for read performance. Common strategies: store summary counts (commentCount in post), store computed values (totalPrice in order), store frequently accessed fields (username in comment). Trade-off: write complexity for read performance.'),
    d('Document Growth', 'Consider how documents grow over time. Arrays that grow unboundedly (comments, reviews) should be referenced, not embedded, to avoid the 16MB limit and document relocation overhead. Use bucketing for time-series data.'),
    d('Schema Validation', 'Use $jsonSchema validator at collection creation to enforce structure. Apply validation at the application layer for complex rules. MongoDB is schema-flexible but validation helps catch data quality issues early.')
  ],
  'MongoDB schema design is driven by access patterns. Understanding when to embed vs reference, how to denormalize effectively, and how documents grow over time is the key to performant MongoDB applications.',
  [
    q('How is MongoDB schema design different from relational?', 'MongoDB focuses on access patterns first, not data normalization. Embedding, denormalization, and pre-joining are common. No joins by default.'),
    q('When should you embed documents?', 'For one-to-one, one-to-few relationships, tightly-coupled data always accessed together, and when the embedded data does not grow unboundedly.'),
    q('When should you reference documents?', 'For many-to-many, large sub-documents, data that grows unboundedly (arrays), loosely-coupled data, and when you need independent querying.'),
    q('What is denormalization?', 'Storing redundant data across documents to improve read performance. Example: storing username in comments to avoid a lookup.'),
    q('What is the document growth problem?', 'Unbounded arrays (like comments in a blog post) cause documents to grow continuously. This can lead to document relocation and the 16MB limit.'),
    q('What is bucketing?', 'A pattern for time-series data where documents are grouped by time intervals (hour/day). Each bucket holds multiple data points, reducing document count and index size.'),
    q('How do you handle one-to-many relationships?', 'Embed for one-to-few (addresses), reference for one-to-many (posts by user), and reference with parent pointer for many-to-one (product in category).'),
    q('What is the 16MB document limit?', 'MongoDB documents cannot exceed 16MB. Design schemas to stay well under this limit. Use referencing for large or growing data.'),
    q('What is schema validation?', 'Rules defined with $jsonSchema to enforce document structure. Can require fields, validate types, and set constraints. Applied at collection level.'),
    q('What are common schema design mistakes?', 'Over-embedding (unbounded growth), over-referencing (too many queries), ignoring access patterns, no schema validation, designing like SQL (normalization at all costs).')
  ],
  R(10,40,140,30,'#47A248','','Access Patterns','How data is used') +
  A(150,55,180,55) +
  R(190,40,140,35,'#0070f3','','Embed vs Ref','Decision') +
  A(330,58,360,58) +
  R(370,40,110,30,'#28a745','','Schema','Document Structure') +
  A(190,75,190,95) +
  R(190,95,140,30,'#ffc107','','Denormalize','Read Performance') +
  A(190,125,190,145) +
  R(190,145,140,30,'#e83e8c','','Validate','$jsonSchema') +
  T(240,210,'Schema Design: Access patterns drive embedding, referencing, and denormalization decisions.',9,'#666','middle'),
  [
    e('Embedded Schema (One-to-Few)', 'User with addresses.', codeBlock([
      '{',
      '  _id: ObjectId("..."),',
      '  name: "Alice",',
      '  addresses: [',
      '    { type: "home", street: "123 Main St", city: "NYC" },',
      '    { type: "work", street: "456 Broad St", city: "NYC" }',
      '  ]',
      '}'
    ]), 'Embedded addresses (few, always accessed with user).'),
    e('Referenced Schema (One-to-Many)', 'User with posts.', codeBlock([
      '// User document',
      '{ _id: ObjectId("user1"), name: "Alice" }',
      '',
      '// Post document (references user)',
      '{ _id: ObjectId("post1"), userId: ObjectId("user1"), title: "My Post", content: "..." }'
    ]), 'Posts reference user via userId. Independent queries on posts.'),
    e('Denormalization Example', 'Comment with username.', codeBlock([
      '{',
      '  _id: ObjectId("..."),',
      '  postId: ObjectId("post1"),',
      '  text: "Great article!",',
      '  userId: ObjectId("user1"),',
      '  username: "alice" // Denormalized for fast display',
      '}'
    ]), 'Stores username in comment to avoid joining on display.'),
    e('Bucketing Pattern', 'Time-series data.', codeBlock([
      '{',
      '  sensorId: "sensor-1",',
      '  date: ISODate("2025-01-15"),',
      '  hour: 14,',
      '  readings: [',
      '    { ts: ISODate("2025-01-15T14:00:00Z"), temp: 22.5 },',
      '    { ts: ISODate("2025-01-15T14:05:00Z"), temp: 22.7 }',
      '  ]',
      '}'
    ]), 'Buckets readings by hour. Prevents unbounded document growth.'),
    e('Schema Validation', 'Enforce structure.', codeBlock([
      'db.createCollection("users", {',
      '  validator: {',
      '    $jsonSchema: {',
      '      bsonType: "object",',
      '      required: ["name", "email"],',
      '      properties: {',
      '        name: { bsonType: "string" },',
      '        email: { bsonType: "string", pattern: "^.+@.+$" },',
      '        age: { bsonType: "int", minimum: 0 }',
      '      }',
      '    }',
      '  }',
      '});'
    ]), 'Enforces required fields and types with $jsonSchema.')
  ],
  [
    m('What drives MongoDB schema design?', ['Normalization rules', 'Access patterns', 'Storage efficiency', 'Index limits'], 1, 'Access patterns drive MongoDB schema design.'),
    m('When should you embed?', ['Large data', 'One-to-few, tightly coupled', 'Many-to-many', 'Unbounded arrays'], 1, 'Embed for one-to-few, tightly coupled data.'),
    m('What is denormalization?', ['Removing duplicates', 'Storing redundant data for read perf', 'Normalizing data', 'Encrypting fields'], 1, 'Denormalization stores redundant data for faster reads.'),
    m('What is the document growth problem?', ['Document size decreases', 'Unbounded arrays grow past 16MB', 'Indexes grow too fast', 'Query speed increases'], 1, 'Unbounded arrays cause document growth toward 16MB limit.'),
    m('What is the bucketing pattern?', ['Group by categories', 'Group time-series into time intervals', 'Group by users', 'Group by status'], 1, 'Bucketing groups time-series data into time intervals.'),
    m('What schema design mistake is common?', ['Over-embedding', 'Too many indexes', 'Using ObjectId', 'Using arrays'], 0, 'Over-embedding and ignoring access patterns are common mistakes.')
  ]
);

/* =================== TOPIC 24: Embedding vs Referencing =================== */
addTopic('mongodb-embedding-vs-referencing', 'Embedding vs Referencing', 'intermediate', 25,
  ['Embedding stores related data directly within a document. Referencing stores the _id of related documents for lookup via $lookup or application code.',
   'Embedding: better read performance (single query), data locality, atomic updates. Referencing: better for large data, unbounded growth, independent updates.',
   'Choose embedding for one-to-few and tightly-coupled data. Choose referencing for one-to-many, many-to-many, and loosely-coupled data.',
   'The decision impacts query patterns, write performance, data consistency, and application complexity.'
  ],
  'Embedding is like keeping your passport and visa together in a single document wallet — everything you need is in one place. Referencing is like keeping files in different folders with cross-reference notes.',
  [
    d('Embedding Advantages', 'Single query retrieves all related data. No joins needed. Atomic updates on all embedded data. Better read performance for co-located data. No additional round trips. Simpler application logic for tightly-coupled data.'),
    d('Embedding Disadvantages', 'Document size limit (16MB). Unbounded arrays cause growth. Cannot query embedded data independently. Duplicate data causes inconsistency risk. Writes to embedded arrays regenerate the entire document.'),
    d('Referencing Advantages', 'No document size pressure. Independent queries and updates. Efficient for large sub-documents. Better for many-to-many relationships. Data stored once (no duplication).'),
    d('Referencing Disadvantages', 'Multiple queries needed (or $lookup). Eventual consistency across collections. More complex application code. Additional indexes needed on foreign keys. Read performance depends on lookup efficiency.'),
    d('Decision Framework', 'One-to-one: embed (if small) or reference (if large). One-to-few: embed (addresses, tags). One-to-many: reference (posts, comments). Many-to-many: reference. Always-growing arrays: reference (comments, reviews). Frequently read together: embed. Independently queried: reference.')
  ],
  'The embedding vs referencing decision is the most important schema design choice in MongoDB. It determines read/write performance, data consistency, and application complexity.',
  [
    q('What is embedding?', 'Storing related data directly within a document as a nested sub-document or array.'),
    q('What is referencing?', 'Storing the _id of related documents. Related data is retrieved via $lookup or application-level queries.'),
    q('When should you embed?', 'One-to-few relationships, data always accessed together, small sub-documents, tightly-coupled data that changes together.'),
    q('When should you reference?', 'Unbounded arrays, large sub-documents, many-to-many, data independently queried, loosely-coupled data.'),
    q('What is the 16MB limit concern?', 'Embedded arrays can grow beyond 16MB. Reference instead for large or growing data sets.'),
    q('How does embedding affect write performance?', 'Updates to embedded data rewrite the entire document. For arrays with many elements, this is less efficient than referencing.'),
    q('How does referencing affect read performance?', 'Requires additional queries or $lookup. Can use indexes but still slower than a single document read.'),
    q('What is the consistency trade-off?', 'Embedding: atomic updates on all embedded data. Referencing: eventual consistency across collections (unless using transactions).'),
    q('How do you handle one-to-one relationships?', 'Embed if the sub-document is small and always accessed. Reference if the sub-document is large or independently managed.'),
    q('How do you handle one-to-many with referencing?', 'Store the child\'s _id in the parent (postIds array) or store the parent\'s _id in the child (userId field). The latter is more scalable for large sets.')
  ],
  R(10,40,140,30,'#47A248','','Embedding','Nested in document') +
  A(150,55,170,55) +
  R(180,35,140,35,'#28a745','','Advantages','Fast reads, atomic') +
  A(180,70,180,90) +
  R(180,95,140,30,'#ffc107','','Disadvantages','16MB limit, growth') +
  A(150,120,170,120) +
  R(10,130,140,30,'#0070f3','','Referencing','By _id') +
  A(150,145,170,145) +
  R(180,130,140,35,'#28a745','','Advantages','No size limit, flexible') +
  A(180,165,180,185) +
  R(180,190,140,25,'#ffc107','','Disadvantages','Slower reads, complex') +
  T(240,230,'Embedding vs Referencing: Trade-off between read performance and flexibility.',9,'#666','middle'),
  [
    e('Embedding Example', 'Orders with line items.', codeBlock([
      '{',
      '  _id: ObjectId("order1"),',
      '  customerName: "Alice",',
      '  items: [',
      '    { product: "Widget", qty: 2, price: 9.99 },',
      '    { product: "Gadget", qty: 1, price: 24.99 }',
      '  ],',
      '  total: 44.97',
      '}'
    ]), 'Line items embedded within order (one-to-few, always read together).'),
    e('Referencing Example', 'Posts and comments.', codeBlock([
      '// Post document',
      '{ _id: ObjectId("post1"), title: "My Post", content: "..." }',
      '// Comment documents (reference post)',
      '{ _id: ObjectId("c1"), postId: ObjectId("post1"), text: "Great!", userId: ObjectId("u1") }'
    ]), 'Comments reference the post. Comments grow unboundedly — reference is correct.'),
    e('Hybrid: Summary Field', 'Comment count in post.', codeBlock([
      '// Post document with denormalized count',
      '{ _id: ObjectId("post1"), title: "My Post", commentCount: 5 }',
      '// Update count when comment added',
      'await db.posts.updateOne({ _id: postId }, { $inc: { commentCount: 1 } });'
    ]), 'Stores comment count in post (denormalized). Actual comments are referenced.'),
    e('One-to-Many with Parent Pointer', 'Orders reference user.', codeBlock([
      '// Order stores userId (parent pointer)',
      '{ _id: ObjectId("o1"), userId: ObjectId("u1"), total: 44.97 }',
      '// Query user\'s orders:',
      'db.orders.find({ userId: userId }).sort({ createdAt: -1 })'
    ]), 'Order stores userId. Scalable for large order sets per user.'),
    e('Many-to-Many with References', 'Students and courses.', codeBlock([
      '// Student stores enrolled course IDs',
      '{ _id: ObjectId("s1"), name: "Alice", courseIds: [ObjectId("c1"), ObjectId("c2")] }',
      '// Course stores enrolled student IDs',
      '{ _id: ObjectId("c1"), name: "MongoDB", studentIds: [ObjectId("s1")] }',
      '// Query via $lookup or application code'
    ]), 'Many-to-many: both sides store references to the other.')
  ],
  [
    m('What is embedding?', ['Storing _id references', 'Storing data in same document', 'Indexing fields', 'Sharding data'], 1, 'Embedding stores related data within a document.'),
    m('When is referencing preferred?', ['Tightly-coupled data', 'Unbounded arrays', 'Few sub-documents', 'Atomic updates needed'], 1, 'Reference for unbounded arrays and large sub-documents.'),
    m('What is a disadvantage of embedding?', ['No atomic updates', '16MB document limit', 'No indexes', 'Slow writes'], 1, 'Embedding has the 16MB document size constraint.'),
    m('What is a disadvantage of referencing?', ['16MB limit', 'Multiple queries needed', 'No atomic writes', 'Slow indexing'], 1, 'Referencing requires additional queries for related data.'),
    m('How do you handle one-to-few?', ['Always reference', 'Embed (addresses, tags)', 'Shard', 'Index separately'], 1, 'Embed for one-to-few relationships.'),
    m('What is a parent pointer?', ['Embedding parent data', 'Child stores parent _id', 'Parent stores all child _ids', 'Storing both ways'], 1, 'Parent pointer: child document stores the parent\'s _id.')
  ]
);

/* =================== TOPIC 25: Mongoose =================== */
addTopic('mongodb-mongoose', 'Mongoose', 'intermediate', 30,
  ['Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js, providing schema-based solutions with built-in type casting, validation, and query building.',
   'It provides a higher-level abstraction over the MongoDB Node.js driver with schemas, models, middleware (pre/post hooks), and virtuals.',
   'Mongoose schema defines the structure, types, defaults, and validation for documents. Models are constructors compiled from schemas.',
   'Popular features: population (reference resolution), middleware (hooks for business logic), plugins (reusable functionality), and discriminators (schema inheritance).'
  ],
  'Mongoose is like having a quality control inspector for your MongoDB data. It checks that documents match the expected structure, validates fields, and provides helpful tools for common operations.',
  [
    d('Schema and Model', 'Schema defines document structure: new Schema({ name: String, age: { type: Number, min: 0 } }). Model compiles schema: mongoose.model(\'User\', userSchema). Models provide CRUD methods (find, create, updateOne, deleteOne).'),
    d('Schema Types and Options', 'Types: String, Number, Date, Boolean, Buffer, ObjectId, Array, Map, Schema.Types.Mixed, Schema.Types.Decimal128. Options: required, default, unique, enum, min/max, validate, get/set, select (hidden). Type casting is automatic.'),
    d('Validation', 'Built-in validators: required, enum, min/max, minlength/maxlength, match (regex). Custom validators via validate function. Async validators for DB lookups. ValidationMiddleware (pre(\'validate\')). Errors are ValidationError objects with per-field errors.'),
    d('Middleware (Hooks)', 'Pre/post hooks for: save, validate, remove, updateOne, deleteOne, find, findOne, insertMany. Pre-hooks for transformations. Post-hooks for side effects (logging, cascading). Hooks can be async.'),
    d('Population', 'Reference resolution: instead of $lookup, use .populate(\'fieldName\'). Automatically replaces _id references with the actual documents. Supports nested population (populate within populated docs). Select, match, and options for filtered population.')
  ],
  'Mongoose is the most popular MongoDB ODM for Node.js. Its schema validation, middleware, and population features significantly reduce boilerplate code and improve data quality.',
  [
    q('What is Mongoose?', 'An ODM library for MongoDB and Node.js. Provides schema-based solutions with validation, middleware, type casting, and query building.'),
    q('How is Mongoose different from the MongoDB driver?', 'Mongoose adds schema validation, middleware hooks, population (reference resolution), virtuals, plugins, and a more declarative API over the raw driver.'),
    q('What is a Mongoose schema?', 'Defines the structure, types, validation rules, defaults, and options for documents. Acts as a blueprint for documents in a collection.'),
    q('What is a Mongoose model?', 'A constructor compiled from a schema that represents a collection. Provides CRUD methods: find, create, findByIdAndUpdate, deleteOne, etc.'),
    q('What are Mongoose middleware hooks?', 'Pre/post functions that execute at certain points in a document\'s lifecycle: save, validate, remove, updateOne, find, deleteOne.'),
    q('What is population?', 'Mongoose\'s reference resolution system. Using .populate(\'field\') replaces ObjectId references with the actual documents from the referenced collection.'),
    q('What schema types does Mongoose support?', 'String, Number, Date, Boolean, Buffer, ObjectId, Array, Map, Mixed, Decimal128, and custom types.'),
    q('What are Mongoose virtuals?', 'Document properties that are not stored in MongoDB. Computed from existing fields. Example: fullName combining firstName and lastName.'),
    q('What are Mongoose plugins?', 'Reusable pieces of functionality. Plugins add schema options, methods, virtuals, and middleware. Example: mongoose-paginate for pagination.'),
    q('Can Mongoose work without a schema?', 'Yes, using Schema.Types.Mixed or strict: false. But the benefits of Mongoose (validation, type casting) are reduced without schemas.')
  ],
  R(10,40,120,30,'#47A248','','Schema','Define structure') +
  A(130,55,160,55) +
  R(170,35,130,35,'#0070f3','','Model','Compile schema') +
  A(300,53,340,53) +
  R(350,35,130,35,'#28a745','','CRUD','find, create, etc.') +
  R(170,80,130,30,'#ffc107','','Middleware','pre/post hooks') +
  R(170,120,130,30,'#e83e8c','','Population','Ref resolution') +
  R(170,160,130,30,'#6610f2','','Plugins','Reusable logic') +
  T(240,210,'Mongoose: Schema-based ODM with validation, hooks, population, and plugins.',9,'#666','middle'),
  [
    e('Define Schema and Model', 'User schema example.', codeBlock([
      'const mongoose = require(\'mongoose\');',
      'const userSchema = new mongoose.Schema({',
      '  name: { type: String, required: true, trim: true },',
      '  email: { type: String, required: true, unique: true, lowercase: true },',
      '  age: { type: Number, min: 0, max: 150 },',
      '  role: { type: String, enum: ["user", "admin"], default: "user" }',
      '}, { timestamps: true });',
      'const User = mongoose.model(\'User\', userSchema);'
    ]), 'Defines User schema with validation, timestamps, and creates model.'),
    e('Using the Model', 'CRUD operations.', codeBlock([
      '// Create',
      'const user = await User.create({ name: "Alice", email: "alice@example.com" });',
      '// Read',
      'const user = await User.findOne({ email: "alice@example.com" }).select(\'-__v\');',
      '// Update',
      'await User.updateOne({ _id: userId }, { $set: { age: 31 } });',
      '// Delete',
      'await User.deleteOne({ _id: userId });'
    ]), 'CRUD operations using Mongoose model methods.'),
    e('Middleware Hook', 'Hash password before save.', codeBlock([
      'userSchema.pre(\'save\', async function(next) {',
      '  if (!this.isModified(\'password\')) return next();',
      '  this.password = await bcrypt.hash(this.password, 10);',
      '  next();',
      '});',
      'const user = await User.create({ password: "plaintext" });',
      '// password is automatically hashed'
    ]), 'Pre-save hook hashes password automatically on modification.'),
    e('Population', 'Resolving references.', codeBlock([
      'const postSchema = new mongoose.Schema({',
      '  title: String,',
      '  author: { type: mongoose.Schema.Types.ObjectId, ref: \'User\' }',
      '});',
      'const Post = mongoose.model(\'Post\', postSchema);',
      'const post = await Post.findById(postId).populate(\'author\', \'name email\');',
      'console.log(post.author.name); // Resolved User document'
    ]), 'Population replaces author ObjectId with actual User document.'),
    e('Validation with Custom Validator', 'Custom validation logic.', codeBlock([
      'const productSchema = new mongoose.Schema({',
      '  name: String,',
      '  price: { type: Number, required: true },',
      '  category: { type: String, validate: {',
      '    validator: async function(v) {',
      '      const count = await mongoose.model(\'Category\').countDocuments({ name: v });',
      '      return count > 0;',
      '    },',
      '    message: \'Category "{VALUE}" does not exist\'',
      '  }}',
      '});'
    ]), 'Async custom validator checks category existence in DB.')
  ],
  [
    m('What is Mongoose?', ['A MongoDB driver', 'An ODM for MongoDB and Node.js', 'A database management tool', 'A query language'], 1, 'Mongoose is an ODM library.'),
    m('What does a Mongoose schema define?', ['Database connection', 'Document structure and validation', 'Server configuration', 'Index management'], 1, 'Schema defines document structure, types, and validation.'),
    m('What does .populate() do?', ['Creates documents', 'Resolves references to actual documents', 'Deletes documents', 'Indexes fields'], 1, 'Population resolves _id references to full documents.'),
    m('What are Mongoose virtuals?', ['Encrypted fields', 'Computed properties not stored in DB', 'Indexed fields', 'Validation rules'], 1, 'Virtuals are computed properties not persisted to MongoDB.'),
    m('What hook runs before saving?', ['post(\'save\')', 'pre(\'save\')', 'on(\'save\')', 'after(\'save\')'], 1, 'pre(\'save\') runs before document is saved.'),
    m('What option enables automatic createdAt/updatedAt?', ['timestamps: true', 'autoDates: true', 'audit: true', 'timeStamps: true'], 0, 'timestamps: true adds createdAt and updatedAt fields.')
  ]
);

// ---- GENERATE ----
var dataDir = __dirname;

// Write topics-data.js (embedded TOPICS_DATA)
var lines = [];
lines.push('var TOPICS_DATA = TOPICS_DATA || {};');
lines.push('TOPICS_DATA["mongodb"] = TOPICS_DATA["mongodb"] || {};');
for (var id in topics) {
  lines.push('TOPICS_DATA["mongodb"]["' + id + '"] = ' + JSON.stringify(topics[id]) + ';');
}
fs.writeFileSync(dataDir + '/topics-data.js', lines.join('\n'));

// Write topics.json (metadata index)
fs.writeFileSync(dataDir + '/topics.json', JSON.stringify({ topics: topicList }, null, 2));

console.log('Generated MongoDB topics: ' + Object.keys(topics).length);
