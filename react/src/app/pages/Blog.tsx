import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { fetchBlogPosts, type BlogPostSummary } from '../../lib/api';
import { Seo } from '../../components/Seo';
import { PageHero } from '../../components/PageHero';
import { Card, CardContent } from '../components/ui/card';
import { ArrowRight } from 'lucide-react';

export function Blog() {
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts()
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-[#0B0B0B]">
      <Seo title="Blog | High5 Limo" description="Luxury travel tips, airport guides, and news from High5 Limo." path="/blog" />
      <PageHero title="High5" titleHighlight="Blog" subtitle="Travel tips, luxury insights, and company news." />

      <section className="py-16 pb-24">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          {loading && <p className="text-gray-400 text-center py-12">Loading posts...</p>}
          {!loading && posts.length === 0 && (
            <div className="text-center py-16 border border-[#D4AF37]/15 rounded-xl bg-[#1A1A1A]">
              <p className="text-gray-300 text-lg mb-2">No blog posts yet</p>
              <p className="text-gray-500 text-sm">Check back soon for travel tips and company updates.</p>
            </div>
          )}
          {posts.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="block group">
              <Card className="bg-[#1A1A1A] border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all">
                <CardContent className="p-6 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl text-white mb-2 group-hover:text-[#D4AF37] transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                      {post.title}
                    </h2>
                    {post.excerpt && <p className="text-gray-400 leading-relaxed">{post.excerpt}</p>}
                    {post.publishedAt && (
                      <p className="text-gray-500 text-sm mt-3">{new Date(post.publishedAt).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    )}
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#D4AF37] shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
