import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BlogPost as BlogPostType, fetchPosts } from '@/utils/posts';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetchPosts()
      .then((posts) => {
        if (!isMounted) return;
        const match = posts.find((p) => p.slug === slug);
        if (!match) setError('Post not found');
        setPost(match ?? null);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error(err);
        setError('Unable to load this post right now.');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const scrollToContact = () => {
    const isOnHomePage = location.pathname === '/';

    if (!isOnHomePage) {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector('#contact');
        if (element) {
          const yOffset = -80;
          const rect = element.getBoundingClientRect();
          const absoluteElementTop = rect.top + window.pageYOffset;
          const offsetPosition = absoluteElementTop + yOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 300);
    } else {
      const element = document.querySelector('#contact');
      if (element) {
        const yOffset = -80;
        const rect = element.getBoundingClientRect();
        const absoluteElementTop = rect.top + window.pageYOffset;
        const offsetPosition = absoluteElementTop + yOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="flex items-center justify-center min-h-[60vh]">
          <p className="text-muted-foreground text-lg">Loading post...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post || error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">
              {error || "The blog post you're looking for doesn't exist."}
            </p>
            <Link to="/blog" className="text-primary hover:underline">
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />
          <div className="section-container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Blog</span>
              </Link>

              <div className="mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
                <div>
                  <span>By {post.author}</span>
                </div>
                <button className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>

              <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden mb-12">
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 lg:py-16 relative">
          <div className="section-container relative z-10">
            <div className="max-w-4xl mx-auto">
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="prose prose-lg dark:prose-invert max-w-none prose-content
                  prose-headings:font-display prose-headings:text-foreground
                  prose-p:text-muted-foreground prose-p:leading-relaxed
                  prose-strong:text-foreground
                  prose-ul:text-muted-foreground prose-li:text-muted-foreground
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 relative bg-gradient-to-b from-background via-muted/20 to-background">
          <div className="section-container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
                Looking for flexible drafting support?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Try PavePath's free pilot task and experience 24-48 hour drafting turnaround.
              </p>
              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                <span>Get Started</span>
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
