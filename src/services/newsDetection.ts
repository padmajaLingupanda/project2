export interface AnalysisFactors {
  sensationalLanguage: number;
  sourceCredibility: number;
  emotionalTone: number;
  factualConsistency: number;
  grammarQuality: number;
}

export interface DetectionResult {
  isFake: boolean;
  confidenceScore: number;
  analysisFactors: AnalysisFactors;
  explanation: string;
}

const sensationalWords = [
  'shocking', 'unbelievable', 'miracle', 'secret', 'exposed', 'revealed',
  'you won\'t believe', 'doctors hate', 'shocking truth', 'mind-blowing',
  'breaking', 'urgent', 'alert', 'warning', 'explosive', 'bombshell'
];

const unreliableSourcePatterns = [
  'unknown', 'anonymous', 'sources say', 'rumor', 'allegedly',
  'unconfirmed', 'insider', 'leaked', 'exclusive scoop'
];

const emotionalWords = [
  'outrage', 'furious', 'devastating', 'terrifying', 'horrific',
  'disgusting', 'amazing', 'incredible', 'fantastic', 'perfect'
];

export function analyzeNews(title: string, content: string, source: string): DetectionResult {
  const fullText = `${title} ${content}`.toLowerCase();
  const wordCount = fullText.split(/\s+/).length;

  const sensationalScore = calculateSensationalLanguage(fullText, wordCount);
  const sourceScore = calculateSourceCredibility(source.toLowerCase());
  const emotionalScore = calculateEmotionalTone(fullText, wordCount);
  const factualScore = calculateFactualConsistency(content);
  const grammarScore = calculateGrammarQuality(title, content);

  const analysisFactors: AnalysisFactors = {
    sensationalLanguage: sensationalScore,
    sourceCredibility: sourceScore,
    emotionalTone: emotionalScore,
    factualConsistency: factualScore,
    grammarQuality: grammarScore
  };

  const fakeScore = (
    (100 - sensationalScore) * 0.25 +
    sourceScore * 0.25 +
    (100 - emotionalScore) * 0.20 +
    factualScore * 0.20 +
    grammarScore * 0.10
  );

  const confidenceScore = Math.round(fakeScore);
  const isFake = confidenceScore < 50;

  const explanation = generateExplanation(analysisFactors, isFake, confidenceScore);

  return {
    isFake,
    confidenceScore: isFake ? 100 - confidenceScore : confidenceScore,
    analysisFactors,
    explanation
  };
}

function calculateSensationalLanguage(text: string, wordCount: number): number {
  let matches = 0;
  sensationalWords.forEach(word => {
    const regex = new RegExp(word, 'gi');
    const found = text.match(regex);
    if (found) matches += found.length;
  });

  const percentage = (matches / wordCount) * 100;
  return Math.min(Math.round(percentage * 20), 100);
}

function calculateSourceCredibility(source: string): number {
  if (!source || source.trim() === '') return 30;

  const reputableSources = [
    'reuters', 'associated press', 'bbc', 'npr', 'pbs',
    'the guardian', 'the new york times', 'washington post',
    'wall street journal', 'bloomberg', 'financial times'
  ];

  const isReputable = reputableSources.some(s => source.includes(s));
  if (isReputable) return 90;

  const hasUnreliablePattern = unreliableSourcePatterns.some(p => source.includes(p));
  if (hasUnreliablePattern) return 20;

  const hasWebsiteFormat = source.includes('.com') || source.includes('.org') || source.includes('.net');
  return hasWebsiteFormat ? 60 : 40;
}

function calculateEmotionalTone(text: string, wordCount: number): number {
  let matches = 0;
  emotionalWords.forEach(word => {
    const regex = new RegExp(word, 'gi');
    const found = text.match(regex);
    if (found) matches += found.length;
  });

  const percentage = (matches / wordCount) * 100;
  return Math.min(Math.round(percentage * 15), 100);
}

function calculateFactualConsistency(content: string): number {
  const hasNumbers = /\d+/.test(content);
  const hasQuotes = /"[^"]+"/.test(content);
  const hasSpecificDates = /\b(january|february|march|april|may|june|july|august|september|october|november|december|\d{1,2}\/\d{1,2}\/\d{2,4})\b/i.test(content);

  let score = 40;
  if (hasNumbers) score += 20;
  if (hasQuotes) score += 20;
  if (hasSpecificDates) score += 20;

  return Math.min(score, 100);
}

function calculateGrammarQuality(title: string, content: string): number {
  let score = 100;

  const allCaps = title === title.toUpperCase() && title.length > 10;
  if (allCaps) score -= 30;

  const excessivePunctuation = /[!?]{2,}/.test(title) || /[!?]{2,}/.test(content);
  if (excessivePunctuation) score -= 20;

  const spellingIssues = /\b(teh|recieve|seperate|occured|definately|goverment)\b/i.test(content);
  if (spellingIssues) score -= 25;

  return Math.max(score, 0);
}

function generateExplanation(factors: AnalysisFactors, isFake: boolean, confidence: number): string {
  const issues: string[] = [];

  if (factors.sensationalLanguage > 60) {
    issues.push('High use of sensational language');
  }
  if (factors.sourceCredibility < 50) {
    issues.push('Low source credibility');
  }
  if (factors.emotionalTone > 60) {
    issues.push('Highly emotional tone');
  }
  if (factors.factualConsistency < 50) {
    issues.push('Lack of factual details');
  }
  if (factors.grammarQuality < 70) {
    issues.push('Poor grammar quality');
  }

  if (isFake) {
    const mainIssue = issues.length > 0 ? issues.join(', ') : 'Multiple indicators suggest questionable authenticity';
    return `This article shows signs of fake news. Key concerns: ${mainIssue}. Always verify with trusted sources.`;
  } else {
    return `This article appears credible based on: professional language, reliable source indicators, factual presentation, and proper grammar. Confidence: ${confidence}%`;
  }
}
