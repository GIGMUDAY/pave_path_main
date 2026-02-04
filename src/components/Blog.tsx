import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogPost, fetchPosts } from '@/utils/posts';

export const Blog = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetchPosts()
      .then((data) => {
        if (!isMounted) return;
        setPosts(data.slice(0, 3));
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error(err);
        setError('Unable to load posts right now.');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <section id="blog" className="section-spacing bg-background relative" ref={ref}>
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Blog</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-foreground">
            Insights & Best Practices
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stay updated with the latest drafting tips, industry insights, and best practices for civil engineering projects
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto mb-8">
          {loading && (
            <p className="text-muted-foreground text-center col-span-full">Loading posts...</p>
          )}
          {error && !loading && (
            <p className="text-sm text-red-500 text-center col-span-full">{error}</p>
          )}
          {!loading && !error && posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link to={`/blog/${post.slug}`} className="block h-full">
                <div className="bg-card border border-border dark:border-border/70 rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center text-sm text-muted-foreground">
                        No image
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="text-xs font-semibold uppercase tracking-wider text-secondary-foreground bg-secondary px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-display text-xl lg:text-2xl font-semibold text-foreground mb-3 group-hover:text-secondary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm lg:text-base leading-relaxed mb-4 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors group/link">
                      <span>Read article</span>
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
          {!loading && !error && posts.length === 0 && (
            <p className="text-muted-foreground text-center col-span-full">No posts published yet.</p>
          )}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[6px] bg-primary text-primary-foreground font-semibold hover:bg-secondary transition-colors group"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

