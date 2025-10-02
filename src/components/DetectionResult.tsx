import { Shield, AlertTriangle } from 'lucide-react';
import { AnalysisFactors } from '../services/newsDetection';

interface DetectionResultProps {
  isFake: boolean;
  confidenceScore: number;
  analysisFactors: AnalysisFactors;
  explanation: string;
}

export function DetectionResult({ isFake, confidenceScore, analysisFactors, explanation }: DetectionResultProps) {
  return (
    <div className="mt-8 space-y-6">
      <div className={`p-6 rounded-lg border-2 ${
        isFake
          ? 'bg-red-50 border-red-300'
          : 'bg-green-50 border-green-300'
      }`}>
        <div className="flex items-center gap-3 mb-4">
          {isFake ? (
            <AlertTriangle className="w-8 h-8 text-red-600" />
          ) : (
            <Shield className="w-8 h-8 text-green-600" />
          )}
          <div>
            <h2 className={`text-2xl font-bold ${
              isFake ? 'text-red-700' : 'text-green-700'
            }`}>
              {isFake ? 'Likely Fake News' : 'Appears Credible'}
            </h2>
            <p className={`text-sm ${
              isFake ? 'text-red-600' : 'text-green-600'
            }`}>
              Confidence: {confidenceScore}%
            </p>
          </div>
        </div>
        <p className={`${isFake ? 'text-red-800' : 'text-green-800'}`}>
          {explanation}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Analysis Breakdown</h3>
        <div className="space-y-4">
          <AnalysisFactor
            label="Source Credibility"
            score={analysisFactors.sourceCredibility}
            description="Reliability and reputation of the source"
          />
          <AnalysisFactor
            label="Factual Consistency"
            score={analysisFactors.factualConsistency}
            description="Presence of specific facts, dates, and verifiable details"
          />
          <AnalysisFactor
            label="Sensational Language"
            score={100 - analysisFactors.sensationalLanguage}
            description="Absence of clickbait and exaggerated claims"
            inverted
          />
          <AnalysisFactor
            label="Emotional Tone"
            score={100 - analysisFactors.emotionalTone}
            description="Neutral vs. emotionally manipulative language"
            inverted
          />
          <AnalysisFactor
            label="Grammar Quality"
            score={analysisFactors.grammarQuality}
            description="Professional writing standards and formatting"
          />
        </div>
      </div>
    </div>
  );
}

interface AnalysisFactorProps {
  label: string;
  score: number;
  description: string;
  inverted?: boolean;
}

function AnalysisFactor({ label, score, description }: AnalysisFactorProps) {
  const getColor = (score: number) => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-medium text-gray-700">{score}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
        <div
          className={`h-2.5 rounded-full transition-all duration-500 ${getColor(score)}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
}
