import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MainLayout from '../../../components/layout/MainLayout';
import { getPostBySlug } from '@/lib/posts';
import { getPostsByCategory } from '@/lib/posts';
import Link from 'next/link';

interface Params { params: { slug: string } }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | Blog OLV Internacional`,
    description: post.excerpt ?? undefined,
    alternates: {
      canonical: `https://olvinternacional.com.br/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      images: post.cover_url ? [post.cover_url] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Params) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return (
      <MainLayout>
        <div className="container py-20 text-center">
          <h1 className="text-3xl font-bold">Postagem não encontrada</h1>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <article
        className="container max-w-3xl mx-auto rounded-xl shadow-lg px-2 md:px-10 py-6 mt-6 mb-10 border-2"
        style={{
          background: 'var(--olv-card-bg)',
          borderColor: '#FFD700',
        }}
      >
        <h1
          className="text-2xl md:text-4xl font-bold mb-4 text-center"
          style={{ color: '#FFD700', lineHeight: '1.15' }}
        >
          {post.title}
        </h1>
        <div
          className="text-sm mb-6 text-center"
          style={{ color: 'var(--olv-card-meta)' }}
        >
          {new Date(post.published_at).toLocaleDateString('pt-BR')} • {post.author}
        </div>
        {post.cover_url && (
          <div className="flex justify-center mb-8">
            <div
              className="overflow-hidden rounded-2xl shadow-md max-w-[420px] w-full aspect-[7/5] border"
              style={{ borderColor: '#FFD700', background: 'var(--olv-card-img-bg)' }}
            >
              <img
                src={post.cover_url}
                alt={post.title}
                className="object-cover w-full h-full"
                style={{ display: 'block' }}
              />
            </div>
          </div>
        )}
        <div
          className="prose max-w-none text-base md:text-lg leading-relaxed mx-auto"
          style={{ color: 'var(--olv-card-text)' }}
        >
          <ReactMarkdown rehypePlugins={[remarkGfm]}>{post.content_mdx}</ReactMarkdown>
        </div>
        {post.source_name && post.source_url && (
          <p className="mt-8 text-sm text-center" style={{ color: '#FFD700' }}>
            Fonte: <a href={post.source_url} target="_blank" rel="noopener noreferrer" className="underline hover:text-accent font-semibold" style={{ color: '#FFD700' }}>{post.source_name}</a>
          </p>
        )}
        <hr className="my-10" style={{ borderColor: '#FFD700' }} />
        <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--olv-card-heading)' }}>Artigos relacionados</h3>
        {/* @ts-ignore async ok */}
        <RelatedPosts category={post.category} slug={post.slug} />
      </article>
    </MainLayout>
  );
}

async function RelatedPosts({ category, slug }: { category: string | null; slug: string }) {
  if (!category) return null;
  const posts = await getPostsByCategory(category, 3, 1);
  const filtered = posts.filter((p) => p.slug !== slug);
  if (!filtered.length) return null;
  return (
    <ul className="space-y-2">
      {filtered.map((p) => (
        <li key={p.slug}>
          <Link href={`/blog/${p.slug}`} className="hover:text-accent underline" style={{ color: 'var(--olv-card-text)' }}>
            {p.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export const revalidate = 3600; // ISR: 1 hour 