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
      <form onSubmit={handleLogin} style={{ padding: 32, maxWidth: 400, margin: '0 auto' }}>
        <h1>Painel de Ingestão (Admin)</h1>
        <input
          type="password"
          placeholder="Senha admin"
          value={pw}
          onChange={e => setPw(e.target.value)}
          style={{ padding: 8, width: '100%', marginBottom: 12 }}
        />
        <button type="submit" style={{ padding: 8, width: '100%' }}>Entrar</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    );
  }

  return (
    <div style={{ padding: 32, maxWidth: 1000, margin: '0 auto' }}>
      <h1>Status da Ingestão de Blog</h1>
      <h2>Status do Cron</h2>
      <pre>{JSON.stringify(status, null, 2)}</pre>
      <h2>Últimos Artigos Importados</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <strong>{post.title}</strong> — {post.category} — {post.published_at}
            </li>
          ))}
        </ul>
      )}
      <h2>Logs Recentes</h2>
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Buscar por título RSS"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={{ padding: 6, marginRight: 8 }}
        />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: 6, marginRight: 8 }}>
          <option value="">Todos status</option>
          <option value="sucesso">Sucesso</option>
          <option value="erro">Erro</option>
          <option value="fatal">Fatal</option>
          <option value="batch">Batch</option>
        </select>
        <button onClick={handleExport} style={{ padding: 6 }}>Exportar CSV</button>
      </div>
      <pre style={{ background: '#222', color: '#fff', padding: 16, borderRadius: 8, maxHeight: 400, overflow: 'auto' }}>
        {filteredLogs.length === 0 ? 'Sem logs.' : filteredLogs.map((log: any, i: number) =>
          `${log.created_at} [${log.status}] ${log.source || ''} | ${log.rss_title || ''} | ${log.parsing_status || ''} | ${log.parsing_error || ''} | ${log.exec_time_ms || ''}ms | ${log.message}`
        ).join('\n')}
      </pre>
    </div>
  );
} 