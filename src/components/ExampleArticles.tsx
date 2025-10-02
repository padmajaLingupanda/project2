import { FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { exampleArticles, ExampleArticle } from '../data/exampleArticles';

interface ExampleArticlesProps {
  onSelectExample: (article: ExampleArticle) => void;
}

export function ExampleArticles({ onSelectExample }: ExampleArticlesProps) {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <FileText className="w-5 h-5" />
        Example Articles
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exampleArticles.map((article) => (
          <button
            key={article.id}
            onClick={() => onSelectExample(article)}
            className="text-left p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-2 mb-2">
              {article.category === 'fake' ? (
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <h4 className="font-medium text-gray-800 line-clamp-2 mb-1">
                  {article.title}
                </h4>
                <p className="text-xs text-gray-500">{article.source}</p>
              </div>
            </div>
            <span className={`inline-block text-xs px-2 py-1 rounded ${
              article.category === 'fake'
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
            }`}>
              Example: {article.category === 'fake' ? 'Fake News' : 'Real News'}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
