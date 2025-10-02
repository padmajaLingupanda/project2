import { useState } from 'react';
import { Newspaper } from 'lucide-react';
import { NewsInput } from './components/NewsInput';
import { DetectionResult } from './components/DetectionResult';
import { ExampleArticles } from './components/ExampleArticles';
import { analyzeNews, DetectionResult as DetectionResultType } from './services/newsDetection';
import { ExampleArticle } from './data/exampleArticles';

function App() {
  const [result, setResult] = useState<DetectionResultType | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async (title: string, content: string, source: string) => {
    setIsAnalyzing(true);
    setResult(null);

    setTimeout(() => {
      const analysisResult = analyzeNews(title, content, source);
      setResult(analysisResult);
      setIsAnalyzing(false);
    }, 800);
  };

  const handleSelectExample = (article: ExampleArticle) => {
    handleAnalyze(article.title, article.content, article.source);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Newspaper className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Fake News Detector
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Analyze news articles using advanced detection algorithms. Our system examines multiple
            factors including source credibility, language patterns, emotional tone, and factual consistency
            to help you identify potentially fake news.
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <NewsInput onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />

          {result && (
            <DetectionResult
              isFake={result.isFake}
              confidenceScore={result.confidenceScore}
              analysisFactors={result.analysisFactors}
              explanation={result.explanation}
            />
          )}
        </div>

        <ExampleArticles onSelectExample={handleSelectExample} />

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p className="mb-2">
            This tool uses heuristic analysis and should be used as a guide, not a definitive judgment.
          </p>
          <p>
            Always verify important information with multiple trusted sources.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
