import { motion } from 'framer-motion';
import { ArrowRight, Youtube, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const youtubeVideos = [
  { id: 'UatjmgQE9hk', title: 'Latest Car Review' },
  { id: 'Ln3cH7kPDyI', title: 'Car Comparison' },
  { id: 'qczL7fs3FcY', title: 'Buying Guide' },
];

export function VideosSection() {
  const handleSubscribe = () => {
    window.open('https://www.youtube.com/@Ridezzone/featured', '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-16 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-[calc((100vw-1280px)/2+2rem)] lg:px-[calc((100vw-1280px)/2+2rem)] bg-secondary border-t border-white/[0.03]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title mb-0">Latest Videos</h2>
          <a href="https://www.youtube.com/@Ridezzone/videos" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </a>
        </div>

        {/* YouTube Video Embeds */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {youtubeVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-video rounded-xl overflow-hidden bg-[#121212] shadow-lg shadow-black/50"
            >
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </motion.div>
          ))}
        </div>

        {/* Channel Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#121212] rounded-xl p-6 border border-white/5 shadow-lg shadow-black/30"
        >
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#E11D27] flex items-center justify-center shadow-md">
                <Youtube className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-xl">Ridezzone</h3>
                <p className="text-muted-foreground">Car reviews, comparisons & buying guides.</p>
              </div>
            </div>
            <Button 
              onClick={handleSubscribe}
              className="bg-[#E11D27] hover:bg-[#E11D27]/90 text-white font-semibold px-8 py-3 shadow-md shadow-[#E11D27]/20"
            >
              Subscribe
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
