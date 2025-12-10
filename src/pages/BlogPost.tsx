import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

// Sample blog posts - in production, this would come from a CMS or API
const blogPosts: Record<string, {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  cta?: {
    title: string;
    description: string;
  };
}> = {
  'how-overflow-drafting-helps-civil-firms-meet-deadlines': {
    id: 1,
    slug: 'how-overflow-drafting-helps-civil-firms-meet-deadlines',
    title: 'How Overflow Drafting Helps Civil Engineering Firms Meet Tight Deadlines',
    excerpt: 'Discover how overflow drafting support helps civil engineering firms stay ahead of deadlines, reduce backlog, and maintain production quality during peak workload cycles.',
    content: `
      <p>Civil engineering firms live in a world of fluctuating workloads. Some weeks are steady—others bring a flood of submittals, redlines, ADA compliance packages, and last-minute contractor changes. With hiring cycles taking 4–8 weeks and budgets tightening, firms need a flexible way to scale drafting production without expanding headcount.</p>
      
      <p>That's where overflow drafting support comes in.</p>
      
      <p>Overflow drafting gives engineering teams immediate access to trained CAD specialists who can absorb production tasks—allowing in-house engineers to focus on design, QA, and client coordination.</p>
      
      <h2>What Is Overflow Drafting Support?</h2>
      
      <p>Overflow drafting is a flexible model where civil engineering firms offload drafting tasks to an external team that works under their standards, templates, and workflow.</p>
      
      <p>Typical tasks include:</p>
      
      <ul>
        <li>Redline drafting updates</li>
        <li>ADA curb ramp sheet production</li>
        <li>Traffic control plans</li>
        <li>SWPPP/WPC drafting</li>
        <li>Utility adjustments</li>
        <li>Existing condition plans</li>
        <li>Signage & striping layouts</li>
        <li>Plan set cleanup & formatting</li>
      </ul>
      
      <p>The goal: clear backlog faster, maintain quality, and meet deadlines without hiring.</p>
      
      <h2>Why Firms Use Overflow Drafting During Peak Cycles</h2>
      
      <h3>1. Drafting Backlogs Slow Project Delivery</h3>
      
      <p>When redlines pile up, engineers spend time on corrections instead of design and coordination. Overflow drafting removes that bottleneck so projects keep moving.</p>
      
      <h3>2. Hiring is Slow—Workload Isn't</h3>
      
      <p>Civil drafting roles take weeks or months to fill. By the time someone is onboarded, the peak workload may already be over.</p>
      
      <p>Overflow drafting provides:</p>
      
      <ul>
        <li>Instant capacity</li>
        <li>No long-term commitment</li>
        <li>Predictable cost</li>
      </ul>
      
      <h3>3. Multi-State Standards Require Precision</h3>
      
      <p>Projects pass through ADA, MUTCD, and state DOT requirements. Experienced drafting partners ensure sheet sets meet the correct jurisdiction's standards—even for firms working across California, Washington, and Colorado.</p>
      
      <h3>4. Redlines Require Speed</h3>
      
      <p>Redline cycles often become urgent during reviews, construction, and permitting.</p>
      
      <p>Overflow drafting delivers:</p>
      
      <ul>
        <li>24–48 hour redline updates</li>
        <li>Uninterrupted progress</li>
        <li>Fewer review delays</li>
      </ul>
      
      <h2>Tasks Best Suited to Overflow Drafting Support</h2>
      
      <h3>ADA Curb Ramps</h3>
      
      <p>Curb ramps require detailed geometry, grading, and ADA/PROWAG compliance—typically 4–8 sheet packs.</p>
      
      <h3>Traffic Control Plans</h3>
      
      <p>Contractors and agencies often need revisions within 48–72 hours.</p>
      
      <h3>SWPPP Drafting</h3>
      
      <p>BMPs, erosion control sheets, and WPC notes benefit from drafting specialists.</p>
      
      <h3>Plan Set Cleanup</h3>
      
      <p>Formatting, renumbering, naming conventions, and layout corrections are perfect overflow tasks.</p>
      
      <h2>How Overflow Drafting Improves Your Project Delivery</h2>
      
      <ul>
        <li>✔ Faster Submittals</li>
        <li>✔ Higher drafting accuracy</li>
        <li>✔ Fewer agency review cycles</li>
        <li>✔ More billable engineering time</li>
        <li>✔ Flexible capacity on demand</li>
      </ul>
      
      <h2>Conclusion</h2>
      
      <p>Overflow drafting is no longer a luxury—it's a reliable production strategy that helps civil engineering teams meet today's accelerating project timelines. Firms that adopt flexible drafting models deliver faster, reduce rework, and scale confidently during peak workload cycles.</p>
    `,
    author: 'PavePath Team',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Drafting Tips',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop&q=80',
    cta: {
      title: 'Looking for flexible drafting support?',
      description: 'Try PavePath\'s free pilot task and experience 24–48 hour drafting turnaround.',
    },
  },
  'ada-curb-ramp-drafting-best-practices': {
    id: 2,
    slug: 'ada-curb-ramp-drafting-best-practices',
    title: 'ADA Curb Ramp Drafting: Best Practices for Compliance and Accuracy',
    excerpt: 'Learn best practices for ADA-compliant curb ramp drafting, including slope geometry, sheet standards, PROWAG rules, and drafting techniques for accurate ramp plan sets.',
    content: `
      <p>ADA curb ramp projects are among the most detail-sensitive tasks in transportation design. A single incorrect slope, landing, or offset can cause failed inspections or costly field revisions.</p>
      
      <p>Accurate drafting plays a critical role in ensuring ADA and PROWAG compliance before the contractor ever breaks ground.</p>
      
      <p>This guide outlines best practices for producing accurate, compliant curb ramp drawings.</p>
      
      <h2>ADA Curb Ramp Drafting Starts With Clear Base Conditions</h2>
      
      <p>Before drafting begins, gather:</p>
      
      <ul>
        <li>Spot elevations</li>
        <li>Flowline elevations</li>
        <li>Existing ramp geometry</li>
        <li>Adjacent pedestrian paths</li>
        <li>Cross slopes</li>
        <li>Surrounding utilities and obstructions</li>
      </ul>
      
      <p>Clean existing condition data reduces redesigns later.</p>
      
      <h2>Key ADA / PROWAG Requirements to Capture in Drafting</h2>
      
      <h3>1. Running Slope (8.3% max)</h3>
      
      <p>Indicate slopes clearly on plan and profile views.</p>
      
      <h3>2. Cross Slope (2.0% max)</h3>
      
      <p>Show cross slopes across ramps, landings, and sidewalks.</p>
      
      <h3>3. Detectable Warning Surfaces</h3>
      
      <p>Draw the correct:</p>
      
      <ul>
        <li>Width</li>
        <li>Placement</li>
        <li>Alignment</li>
      </ul>
      
      <h3>4. Landings</h3>
      
      <p>Landings must be:</p>
      
      <ul>
        <li>Level within 2%</li>
        <li>Minimum required dimensions</li>
        <li>Clearly dimensioned</li>
      </ul>
      
      <h3>5. Turning Space</h3>
      
      <p>Indicate accessible turning space where required.</p>
      
      <h2>Drafting Techniques for Clear ADA Ramp Sheets</h2>
      
      <h3>Use Consistent Layers and Colors</h3>
      
      <p>Transition from design lines to drafting layers for clarity.</p>
      
      <h3>Dimension Everything the Inspector Needs</h3>
      
      <ul>
        <li>Slopes</li>
        <li>Widths</li>
        <li>Radii</li>
        <li>Transitions</li>
        <li>Grades</li>
        <li>Edge of pavement</li>
      </ul>
      
      <h3>Include Profiles When Required</h3>
      
      <p>Profiles help identify slope transitions early.</p>
      
      <h3>Add Callouts for Construction Notes</h3>
      
      <p>Include ADA-related notes to avoid field misinterpretation.</p>
      
      <h2>Common Mistakes to Avoid</h2>
      
      <ul>
        <li>Using assumed slopes instead of calculated slopes</li>
        <li>Missing landing dimensions</li>
        <li>Incorrect detectable warning orientation</li>
        <li>Overlapping text or incomplete callouts</li>
        <li>Missing flowline grades</li>
      </ul>
      
      <h2>Conclusion</h2>
      
      <p>High-quality ADA curb ramp drafting reduces review comments, avoids construction issues, and ensures faster approvals. When sheet packs are consistent, compliant, and clearly drafted, projects move forward with confidence.</p>
    `,
    author: 'PavePath Team',
    date: '2024-01-10',
    readTime: '7 min read',
    category: 'Compliance',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80',
    cta: {
      title: 'Need 4–8 sheet ADA ramp packs drafted in under a week?',
      description: 'PavePath delivers fast, compliant curb ramp drafting for agencies, consultants, and contractors.',
    },
  },
  'how-to-prepare-permit-ready-traffic-control-plan-set': {
    id: 3,
    slug: 'how-to-prepare-permit-ready-traffic-control-plan-set',
    title: 'How to Prepare a Permit-Ready Traffic Control Plan Set',
    excerpt: 'Learn the essential steps and drafting standards needed to prepare a MUTCD-compliant traffic control plan (TCP) ready for agency permitting.',
    content: `
      <p>Traffic Control Plans (TCPs) are essential for construction safety, pedestrian flow, and vehicle guidance. Preparing a permit-ready TCP requires precision, MUTCD familiarity, and drafting clarity.</p>
      
      <p>Here's how to prepare TCPs that pass agency review on the first try.</p>
      
      <h2>Step 1 — Start With Clean Base Files</h2>
      
      <p>Use:</p>
      
      <ul>
        <li>Latest aerials</li>
        <li>Survey references</li>
        <li>Signal/utility base maps</li>
        <li>Street centerlines</li>
      </ul>
      
      <p>Clean base layers make the TCP clear and easy to interpret.</p>
      
      <h2>Step 2 — Apply MUTCD-Compliant Signs & Markings</h2>
      
      <p>Include:</p>
      
      <ul>
        <li>Standard sign codes</li>
        <li>Arrow types</li>
        <li>Tapers</li>
        <li>Cones and barricade symbols</li>
        <li>Detour signage</li>
        <li>Pedestrian channelization</li>
      </ul>
      
      <p>Drafting accuracy is key: incorrect symbol selection results in review delays.</p>
      
      <h2>Step 3 — Show All Phases Clearly</h2>
      
      <p>Most agencies require:</p>
      
      <ul>
        <li>Phase 1 (initial closure)</li>
        <li>Phase 2 (shift or detour)</li>
        <li>Phase 3 (final reopening)</li>
      </ul>
      
      <p>Use separate sheets for clarity.</p>
      
      <h2>Step 4 — Include Key Drafting Elements</h2>
      
      <ul>
        <li>North arrow</li>
        <li>Scale</li>
        <li>Title block</li>
        <li>Legend</li>
        <li>General notes</li>
        <li>Typical sections (if required)</li>
      </ul>
      
      <h2>Step 5 — Avoid Common TCP Errors</h2>
      
      <ul>
        <li>Missing tapers</li>
        <li>Wrong sign spacing</li>
        <li>Unclear pedestrian routes</li>
        <li>Overlapping symbols</li>
        <li>No detour justification notes</li>
        <li>Incorrect lane control symbols</li>
      </ul>
      
      <h2>Conclusion</h2>
      
      <p>A clean, MUTCD-compliant TCP helps contractors mobilize faster and reduces agency review cycles. Good drafting is the difference between smooth approval and repeated re-submittals.</p>
    `,
    author: 'PavePath Team',
    date: '2024-01-05',
    readTime: '6 min read',
    category: 'Traffic Engineering',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&q=80',
    cta: {
      title: 'Need TCP sheets drafted quickly?',
      description: 'PavePath delivers permit-ready TCPs with 48–72 hour turnaround.',
    },
  },
  'why-small-civil-firms-are-turning-to-drafting-pods': {
    id: 4,
    slug: 'why-small-civil-firms-are-turning-to-drafting-pods',
    title: 'Why Small Civil Engineering Firms Are Turning to Drafting Pods',
    excerpt: 'Discover why small and mid-size civil engineering firms are adopting drafting Pods to expand capacity, improve quality, and deliver projects faster.',
    content: `
      <p>Small civil firms often face the biggest production challenges: limited staff, unpredictable workloads, and complex plan sets. Drafting Pods are becoming a popular way to extend capacity without hiring new employees.</p>
      
      <h2>What Are Drafting Pods?</h2>
      
      <p>Drafting Pods are small, dedicated drafting teams that work under a firm's standards and produce consistent, high-quality drawings every week.</p>
      
      <p>A Pod typically includes:</p>
      
      <ul>
        <li>Drafting team lead</li>
        <li>CAD specialist(s)</li>
        <li>QA/QC reviewer</li>
      </ul>
      
      <h2>Why Firms Choose Pods</h2>
      
      <h3>1. Predictable Weekly Output</h3>
      
      <p>Pods deliver consistent sheet production regardless of workload fluctuations.</p>
      
      <h3>2. Familiarity With Your Standards</h3>
      
      <p>Over time, Pods internalize your:</p>
      
      <ul>
        <li>Layers</li>
        <li>Styles</li>
        <li>Title blocks</li>
        <li>Annotation standards</li>
      </ul>
      
      <h3>3. No Hiring Required</h3>
      
      <p>Pods act as a virtual extension of your drafting department.</p>
      
      <h3>4. Faster Project Delivery</h3>
      
      <p>Clear division of work → fewer bottlenecks → more efficient delivery.</p>
      
      <h2>Tasks Drafting Pods Handle Well</h2>
      
      <ul>
        <li>Redline updates</li>
        <li>ADA curb ramp drafting</li>
        <li>TCP phasing and revisions</li>
        <li>SWPPP sheets</li>
        <li>Utility coordination</li>
        <li>Plan set cleanup</li>
        <li>Sheet indexing & organization</li>
      </ul>
      
      <h2>Conclusion</h2>
      
      <p>Drafting Pods offer reliability, speed, and flexibility — a powerful combination for small and mid-size engineering firms looking to scale without overhead.</p>
    `,
    author: 'PavePath Team',
    date: '2024-01-01',
    readTime: '8 min read',
    category: 'Drafting Tips',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80',
    cta: {
      title: 'Ready to explore drafting Pods for your firm?',
      description: 'Schedule a walkthrough to see how PavePath Pods integrate with your workflow.',
    },
  },
  'fastest-way-to-reduce-drafting-backlogs': {
    id: 5,
    slug: 'fastest-way-to-reduce-drafting-backlogs',
    title: 'The Fastest Way to Reduce Drafting Backlogs in Civil Engineering',
    excerpt: 'Explore practical strategies civil engineering firms can use to reduce drafting backlogs and accelerate project delivery.',
    content: `
      <p>Drafting backlogs are a major source of stress for civil engineering teams. Whether caused by redlines, agency comments, or construction-driven changes, backlogs can stall progress and delay critical deadlines.</p>
      
      <p>Here's how to eliminate them quickly.</p>
      
      <h2>Strategy 1 — Prioritize Redlines by Complexity</h2>
      
      <p>Start with:</p>
      
      <ul>
        <li>Quick corrections</li>
        <li>Text fixes</li>
        <li>Minor layout changes</li>
      </ul>
      
      <p>Small wins move projects forward immediately.</p>
      
      <h2>Strategy 2 — Standardize Your Drafting Templates</h2>
      
      <p>Clean templates reduce repetitive work and prevent drafting errors.</p>
      
      <p>Include:</p>
      
      <ul>
        <li>Title blocks</li>
        <li>Layers</li>
        <li>Linetypes</li>
        <li>Annotation styles</li>
        <li>Legends</li>
      </ul>
      
      <h2>Strategy 3 — Offload Production Tasks</h2>
      
      <p>Drafting backlogs often include:</p>
      
      <ul>
        <li>ADA sheets</li>
        <li>TCP updates</li>
        <li>SWPPP drafting</li>
        <li>Utility relocations</li>
        <li>Signage/striping sheets</li>
      </ul>
      
      <p>These tasks are ideal to outsource to a drafting support partner.</p>
      
      <h2>Strategy 4 — Use a Dedicated CAD Support Team</h2>
      
      <p>Dedicated drafting seats or Pods help maintain a steady production rhythm and prevent future backlogs.</p>
      
      <h2>Strategy 5 — Implement a Smooth QA/QC Process</h2>
      
      <p>Bluebeam reviews catch issues before they multiply.</p>
      
      <p>Key checks:</p>
      
      <ul>
        <li>Layer correctness</li>
        <li>Missing dimensions</li>
        <li>Text overlaps</li>
        <li>Incorrect slopes</li>
        <li>Wrong symbols</li>
      </ul>
      
      <h2>Conclusion</h2>
      
      <p>Drafting backlogs don't disappear on their own—firms eliminate them through structured workflows, templates, and flexible drafting support. With the right systems in place, even the busiest teams can regain control of their schedule.</p>
    `,
    author: 'PavePath Team',
    date: '2023-12-28',
    readTime: '6 min read',
    category: 'Drafting Tips',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop&q=80',
    cta: {
      title: 'Overloaded with drafting tasks?',
      description: 'Try PavePath\'s free pilot redline update and see how quickly your backlog can shrink.',
    },
  },
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const post = slug ? blogPosts[slug] : null;

  const scrollToContact = () => {
    // Check if we're on home page
    const isOnHomePage = location.pathname === '/';
    
    if (!isOnHomePage) {
      // Navigate to home page first, then scroll to contact section
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector('#contact');
        if (element) {
          const yOffset = -80; // Offset for fixed navbar
          const rect = element.getBoundingClientRect();
          const absoluteElementTop = rect.top + window.pageYOffset;
          const offsetPosition = absoluteElementTop + yOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 300);
    } else {
      // Already on home page, just scroll
      const element = document.querySelector('#contact');
      if (element) {
        const yOffset = -80; // Offset for fixed navbar
        const rect = element.getBoundingClientRect();
        const absoluteElementTop = rect.top + window.pageYOffset;
        const offsetPosition = absoluteElementTop + yOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
            <Link to="/blog" className="text-primary hover:underline">
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />
          <div className="section-container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Back Link */}
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Blog</span>
              </Link>

              {/* Category Badge */}
              <div className="mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                {post.title}
              </h1>

              {/* Meta Info */}
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

              {/* Featured Image */}
              <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden mb-12">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12 lg:py-16 relative">
          <div className="section-container relative z-10">
            <div className="max-w-4xl mx-auto">
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="prose prose-lg dark:prose-invert max-w-none
                  prose-headings:font-display prose-headings:text-foreground
                  prose-p:text-muted-foreground prose-p:leading-relaxed
                  prose-strong:text-foreground
                  prose-ul:text-muted-foreground prose-li:text-muted-foreground
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 relative bg-gradient-to-b from-background via-muted/20 to-background">
          <div className="section-container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
                {post.cta?.title || 'Looking for flexible drafting support?'}
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                {post.cta?.description || 'Try PavePath\'s free pilot task and experience 24–48 hour drafting turnaround.'}
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

