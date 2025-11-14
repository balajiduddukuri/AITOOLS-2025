import React, { useState, useEffect, useCallback } from 'react';
import { Tool } from './types';
import { fetchToolDescription } from './services/geminiService';
import { ToolTable } from './components/ToolTable';
import { DownloadIcon } from './components/icons';

const initialToolsData: Omit<Tool, 'description'>[] = [
  { name: 'Whispr Flow', link: 'https://wispr.ai/flow' },
  { name: 'Gemini', link: 'https://gemini.google.com/' },
  { name: 'Emily', link: 'https://www.emily.ai/' },
  { name: 'Fireflies', link: 'https://fireflies.ai/' },
  { name: 'ChatGPT', link: 'https://chatgpt.com/' },
  { name: 'Claude', link: 'https://claude.ai/' },
  { name: 'Phot AI', link: 'https://phot.ai/' },
  { name: 'Supergrow', link: 'https://www.supergrow.ai/' },
  { name: 'Numerous AI', link: 'https://numerous.ai/' },
  { name: 'Genspark', link: 'https://www.genspark.com/' },
  { name: 'Suno', link: 'https://suno.com/' },
  { name: 'Notebook LM', link: 'https://notebooklm.google.com/' },
  { name: 'Social Sonic', link: 'https://writesonic.com/' },
  { name: 'Bolt', link: 'https://www.bolt.ai/' },
  { name: 'Vapi', link: 'https://vapi.ai/' },
  { name: 'Hey Gen', link: 'https://www.heygen.com/' },
  { name: 'Chronicle', link: 'https://chronicle.ai/' },
  { name: 'Kling', link: 'https://kling.kuaishou.com/' },
  { name: 'Krea', link: 'https://www.krea.ai/' },
  { name: 'Higgsfield', link: 'https://www.higgsfield.ai/' },
  { name: 'Humanic AI', link: 'https://www.humanic.ai/' },
  { name: 'Happenstance', link: 'https://www.google.com/search?q=Happenstance+AI' },
  { name: 'Lyzr AI', link: 'https://www.lyzr.ai/' },
  { name: 'Replit', link: 'https://replit.com/' },
  { name: 'Perplexity Comet', link: 'https://www.perplexity.ai/' },
];

const App: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>(
    initialToolsData.map(tool => ({ ...tool, description: '' }))
  );
  
  const areDescriptionsLoading = tools.some(tool => !tool.description);

  const fetchAllDescriptions = useCallback(async () => {
    for (const toolToUpdate of initialToolsData) {
        try {
          const description = await fetchToolDescription(toolToUpdate.name);
          setTools(currentTools =>
            currentTools.map(t =>
              t.name === toolToUpdate.name ? { ...t, description } : t
            )
          );
        } catch (error) {
          console.error(`Failed to fetch description for ${toolToUpdate.name}`, error);
          setTools(currentTools =>
            currentTools.map(t =>
              t.name === toolToUpdate.name ? { ...t, description: 'Error fetching description.' } : t
            )
          );
        }
    }
  }, []);
  
  useEffect(() => {
    fetchAllDescriptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDownloadCSV = () => {
    const escapeCSV = (field: string) => {
      return `"${field.replace(/"/g, '""')}"`;
    };

    const headers = ['Tool Name', 'Description', 'Link'];
    const csvContent = [
      headers.join(','),
      ...tools.map(tool => [
        escapeCSV(tool.name),
        escapeCSV(tool.description),
        escapeCSV(tool.link)
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'ai_tools_directory.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                AI Tool <span className="text-blue-400">Directory</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                A curated list of cutting-edge AI tools with descriptions generated on-the-fly by Gemini.
            </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-end mb-4">
                <button
                    onClick={handleDownloadCSV}
                    disabled={areDescriptionsLoading}
                    className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Download data as CSV"
                >
                    <DownloadIcon className="w-5 h-5 mr-2" />
                    Download CSV
                </button>
            </div>
            <ToolTable tools={tools} />
        </div>
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Powered by React, Tailwind CSS, and the Google Gemini API.</p>
      </footer>
    </div>
  );
};

export default App;