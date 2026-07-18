// Helper to build a full topic object with all fields padTopics expects
function topic(id, title, diff, mins, interviewAnswer, tldr, deepDive, interviewQs, mcqs, codeExamples) {
  return {
    id: id,
    title: title,
    difficulty: diff,
    estimatedMinutes: mins,
    file: id + '.json',
    interviewAnswer: interviewAnswer || '',
    tldr: tldr || [],
    deepDive: deepDive || [],
    interviewQuestions: interviewQs || [],
    mcqQuestions: mcqs || [],
    codeExamples: codeExamples || []
  };
}

module.exports = { topic };
