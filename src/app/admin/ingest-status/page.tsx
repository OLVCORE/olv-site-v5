"use client";

import React, { useEffect, useState } from 'react';


export default function IngestStatusPage() {
  const [status, setStatus] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pw, setPw] = useState('');
  const [auth, setAuth] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    if (!auth) return;
    fetch(`/api/cron/blog-ingest?status=1&pw=${pw}`)
      .then(res => res.json())
      .then(data => setStatus(data))
      .catch(() => setStatus({ error: 'Falha ao buscar status' }));

    fetch('/api/posts?limit=10')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));

    fetch(`/api/cron/blog-ingest?logs=1&pw=${pw}`)
      .then(res => res.json())
      .then(data => setLogs(data.logs || []))
      .catch(() => setLogs(['Falha ao buscar logs']));
  }, [auth, pw]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (pw === 'olvadmin') {
      setAuth(true);
      setError('');
    } else {
      setError('Senha incorreta');
    }
  }

  function handleExport() {
    const csv = [
      'created_at,source,rss_title,parsing_status,parsing_error,exec_time_ms,status,message',
      ...logs.map((log: any) =>
        [log.created_at, log.source, log.rss_title, log.parsing_status, log.parsing_error, log.exec_time_ms, log.status, log.message]
          .map((v) => (v ? String(v).replace(/"/g, '""') : ''))
          .map((v) => `"${v}"`).join(',')
      ),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'logs.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  const filteredLogs = logs.filter((log: any) =>
    (!filter || (log.rss_title && log.rss_title.toLowerCase().includes(filter.toLowerCase()))) &&
    (!statusFilter || log.status === statusFilter)
  );

  if (!auth) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-lg border border-gray-700">
            <h1 className="text-2xl font-bold mb-6 text-white">Painel de Ingestão (Admin)</h1>
            <input
              type="password"
              placeholder="Senha admin"
              value={pw}
              onChange={e => setPw(e.target.value)}
              className="w-full px-3 py-2 mb-4 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors">
              Entrar
            </button>
            {error && <p className="mt-4 text-red-400 text-sm">{error}</p>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Status da Ingestão de Blog</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Status do Cron</h2>
            <pre className="bg-gray-900 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(status, null, 2)}
            </pre>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Últimos Artigos Importados</h2>
            {loading ? (
              <p>Carregando...</p>
            ) : (
              <ul className="space-y-2">
                {posts.map((post) => (
                  <li key={post.slug} className="p-3 bg-gray-700 rounded">
                    <strong className="text-blue-400">{post.title}</strong>
                    <br />
                    <span className="text-sm text-gray-400">
                      {post.category} — {post.published_at}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-8 bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Logs de Ingestão</h2>
            <button
              onClick={handleExport}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md transition-colors"
            >
              Exportar CSV
            </button>
          </div>
          
          <div className="mb-4 flex gap-4">
            <input
              type="text"
              placeholder="Filtrar por título..."
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos os status</option>
              <option value="success">Sucesso</option>
              <option value="error">Erro</option>
            </select>
          </div>
          
          <div className="max-h-96 overflow-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-700">
                <tr>
                  <th className="p-2 text-left">Data</th>
                  <th className="p-2 text-left">Fonte</th>
                  <th className="p-2 text-left">Título</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Erro</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log: any, index: number) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="p-2">{log.created_at}</td>
                    <td className="p-2">{log.source}</td>
                    <td className="p-2">{log.rss_title}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        log.status === 'success' ? 'bg-green-600' : 'bg-red-600'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="p-2 text-red-400">{log.parsing_error || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 