// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useEffect } from 'react';
import { motion } from 'framer-motion'; // Import motion

import SEO from '@/components/SEO';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import CTA from '@/components/CTA';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Scroll to top on component mount for a clean animation start
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-screen bg-background"
    >
      <SEO
        title="StarlearnAI - Generate Courses with AI"
        description="StarlearnAI allows you to generate comprehensive courses on any topic using advanced AI, making learning accessible and fun."
        keywords="AI courses, online learning, education technology, course generation, AI tutor, personalized learning"
      />
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </motion.div>
  );
};

export default Index;