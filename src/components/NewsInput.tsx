import { useState } from 'react';
import { Search } from 'lucide-react';

interface NewsInputProps {
  onAnalyze: (title: string, content: string, source: string) => void;
  isAnalyzing: boolean;
}

export function NewsInput({ onAnalyze, isAnalyzing }: NewsInputProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [source, setSource] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onAnalyze(title, content, source);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Article Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter the article title..."
          required
        />
      </div>

      <div>
        <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-2">
          Source (Optional)
        </label>
        <input
          type="text"
          id="source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., CNN, BBC, Unknown Blog..."
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
          Article Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Paste or type the article content here..."
          required
        />
      </div>

      <button
        type="submit"
        disabled={isAnalyzing || !title.trim() || !content.trim()}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <Search className="w-5 h-5" />
        {isAnalyzing ? 'Analyzing...' : 'Analyze Article'}
      </button>
    </form>
  );
}
