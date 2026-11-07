import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { fetchBlogPost, type BlogPost } from '../../lib/api';
import { Seo } from '../../components/Seo';
import { useContent } from '../../context/ContentContext';
import { postMetaDescription } from '../../lib/postMeta';

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { site } = useContent();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetchBlogPost(slug)
      .then(setPost)
      .catch(() => setError(true));
  }, [slug]);

  if (error) {
    return (
      <div className="min-h-screen pt-20 bg-[#0B0B0B] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Post not found.</p>
          <Link to="/blog" className="text-[#D4AF37] hover:underline">← Back to blog</Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-20 bg-[#0B0B0B] flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-[#0B0B0B]">
      <Seo
        title={post.seoTitle || `${post.title} | High5 Limo Blog`}
        description={postMetaDescription(post, site.seo?.defaultDescription)}
        path={`/blog/${post.slug}`}
      />
      <article className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <Link to="/blog" className="text-[#D4AF37] text-sm hover:underline mb-6 inline-block">← Back to blog</Link>
          <h1 className="text-4xl md:text-5xl text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{post.title}</h1>
          {post.publishedAt && (
            <p className="text-gray-500 mb-8">{new Date(post.publishedAt).toLocaleDateString()}</p>
          )}
          <div className="w-16 h-1 bg-[#D4AF37] mb-8" />
          <div className="text-gray-300 leading-relaxed whitespace-pre-wrap text-lg">{post.body}</div>
        </div>
      </article>
    </div>
  );
}
