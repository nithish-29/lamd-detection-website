import React, { useEffect, useRef } from 'react';
import { LogEntry } from '../types';

interface LogConsoleProps {
  logs: LogEntry[];
}

export const LogConsole: React.FC<LogConsoleProps> = ({ logs }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-inner overflow-hidden flex flex-col h-48 mt-6">
      <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex justify-between items-center">
        <h3 className="font-mono text-xs font-bold text-green-500 tracking-wider">SYSTEM_LOG_OUTPUT // TERMINAL_01</h3>
        <div className="flex space-x-1">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 font-mono text-xs custom-scrollbar">
        {logs.length === 0 && <span className="text-gray-600 italic">No activity recorded...</span>}
        {logs.map((log) => (
          <div key={log.id} className="mb-1 break-words">
            <span className="text-gray-500 mr-2">[{log.timestamp}]</span>
            {log.type === 'INFO' && <span className="text-green-400 font-bold mr-2">[INFO]</span>}
            {log.type === 'ALERT' && <span className="text-yellow-400 font-bold mr-2">[ALERT]</span>}
            {log.type === 'ERROR' && <span className="text-red-500 font-bold mr-2">[ERROR]</span>}
            <span className={log.type === 'ERROR' ? 'text-red-300' : 'text-gray-300'}>
              {log.message}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};