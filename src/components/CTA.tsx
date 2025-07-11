// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useRef } from 'react';
import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { appName } from '@/constants';
import { motion, useInView } from 'framer-motion';

const CTA = () => {
  const ref = useRef(null); // Create the ref
  // Trigger when 10% of component is in view, making it more responsive on short screens
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section ref={ref} className="py-16 md:py-24 bg-gradient-to-br from-primary to-indigo-600 text-primary-foreground">
      <div className="container text-center">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={variants}
          // The ref is correctly applied to the section, so no need to apply it here again
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            Join thousands of users transforming their education with {appName}. Start generating your personalized courses today!
          </p>
          <Button size="lg" className="shadow-lg bg-white text-primary hover:bg-white/90 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" asChild>
            <Link to="/dashboard/generate-course">
              <Sparkles className="mr-2 h-5 w-5" />
              Generate My First Course
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;