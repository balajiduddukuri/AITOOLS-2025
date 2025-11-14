
import React from 'react';
import { Tool } from '../types';
import { ExternalLinkIcon, LoadingSpinner } from './icons';

interface ToolTableProps {
  tools: Tool[];
}

export const ToolTable: React.FC<ToolTableProps> = ({ tools }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-700 shadow-lg">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-200 sm:pl-6"
            >
              Tool Name
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200"
            >
              Description
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200"
            >
              Link
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800 bg-gray-900">
          {tools.map((tool) => (
            <tr key={tool.name} className="hover:bg-gray-800/50 transition-colors duration-200">
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-6">
                {tool.name}
              </td>
              <td className="whitespace-normal px-3 py-4 text-sm text-gray-400 max-w-md">
                {tool.description ? (
                  tool.description
                ) : (
                  <div className="flex items-center space-x-2">
                    <LoadingSpinner className="w-4 h-4 text-blue-400" />
                    <span>Generating...</span>
                  </div>
                )}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">
                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-x-1.5 text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                >
                  Visit
                  <ExternalLinkIcon className="w-4 h-4" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
