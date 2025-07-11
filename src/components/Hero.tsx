// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { appName } from '@/constants';
import { motion } from 'framer-motion'; // Import motion

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-32 bg-gradient-to-br from-background to-muted/20">
      <div className="container relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-primary to-indigo-500 text-gradient leading-tight"
        >
          Generate Engaging Courses <br className="hidden md:inline" />
          with AI in Minutes.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
        >
          {appName} leverages cutting-edge AI to transform any topic into a structured, interactive course, saving you countless hours.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button size="lg" className="shadow-lg bg-gradient-to-r from-primary to-indigo-500 hover:from-indigo-500 hover:to-primary hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" asChild>
            <Link to="/dashboard/generate-course">
              <Sparkles className="mr-2 h-5 w-5" />
              Generate Your First Course
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;