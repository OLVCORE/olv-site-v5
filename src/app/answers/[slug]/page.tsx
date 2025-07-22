import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MainLayout from '../../../components/layout/MainLayout';
import { FaqSchema } from '../../../components/SeoSchemas';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Disclaimer from '../../../components/Disclaimer';

interface AnswerFrontMatter {
  title: string;
  slug: string;
  description?: string;
  keywords?: string;
  mainQuestion?: string;
  faqs?: { q: string; a: string }[];
}

// Base dir containing all markdown subfolders
const BASE_CONTENT_DIR = path.join(process.cwd(), 'content');

// Recursively collect markdown file paths
function walkMd(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) files.push(...walkMd(full));
    else if (ent.isFile() && ent.name.endsWith('.md')) files.push(full);
  }
  return files;
}

// Build an in-memory index <slug, fullPath> to speed lookup during build
const mdIndex: Record<string, string> = (() => {
  const idx: Record<string, string> = {};
  walkMd(BASE_CONTENT_DIR).forEach((p) => {
    try {
      const raw = fs.readFileSync(p, 'utf8');
      const { data } = matter(raw);
      const fmSlug = (data.slug as string | undefined) || path.basename(p).replace(/\.md$/, '');
      idx[fmSlug] = p;
    } catch (_) {}
  });
  return idx;
})();

export async function generateStaticParams() {
  return Object.keys(mdIndex).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const result = getAnswer(params.slug);
  if (!result) {
    notFound();
  }
  const { data } = result;
  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    alternates: {
      canonical: `https://olvinternacional.com.br/answers/${data.slug}`,
    },
  };
}

function getAnswer(slug: string) {
  try {
    const fullPath = mdIndex[slug];
    if (!fullPath) return null;
    const raw = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(raw);
    const cleaned = content.replace(/^.*Placeholder.*$/gim, '').trim();
    return { data: data as AnswerFrontMatter, content: cleaned };
  } catch {
    return null;
  }
}

export default function AnswerPage({ params }: { params: { slug: string } }) {
  const result = getAnswer(params.slug);
  if (!result) return null;
  const { data, content } = result;
  return (
    <MainLayout className="page-answer">
      <div className="main-content container py-8">
        <h1 className="text-3xl font-bold mb-4 text-accent">{data.title}</h1>
        <article className="prose prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </article>
        <Disclaimer />
      </div>
      {data.mainQuestion && data.faqs ? (
        <FaqSchema mainQuestion={data.mainQuestion} faqs={data.faqs} />
      ) : null}
    </MainLayout>
  );
} 