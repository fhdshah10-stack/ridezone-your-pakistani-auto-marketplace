import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { blogs } from '@/data/mockData';
import { Link } from 'react-router-dom';

export function BlogsSection() {
  return (
    <section className="py-12 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-[calc((100vw-1280px)/2+2rem)] lg:px-[calc((100vw-1280px)/2+2rem)] bg-background border-t border-white/[0.03]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title mb-0">Latest Blogs</h2>
          <Link to="/blogs">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300 cursor-pointer group"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h4 className="font-medium text-foreground text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                  {blog.title}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {blog.excerpt}
                </p>
                <p className="text-xs text-muted-foreground/70">{blog.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
