// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sparkles, Target, ArrowRight } from 'lucide-react';
import { appName, companyName } from '@/constants';
import SEO from '@/components/SEO';
import { motion, useInView } from 'framer-motion';

const About = () => {
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const storyRef = useRef(null);
  const joinUsRef = useRef(null);
  const supportedByRef = useRef(null); // New ref for Supported By section
  const ctaRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true, amount: 0.5 });
  const isMissionInView = useInView(missionRef, { once: true, amount: 0.3 });
  const isStoryInView = useInView(storyRef, { once: true, amount: 0.3 });
  const isJoinUsInView = useInView(joinUsRef, { once: true, amount: 0.3 });
  const isSupportedByInView = useInView(supportedByRef, { once: true, amount: 0.2 }); // Trigger earlier for logos
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.4 });

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const logoVariants = { // New variant for logos
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const quoteVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <SEO
        title={`About ${appName}`}
        description={`Learn more about ${appName}, our mission, story, and how we're transforming education with AI-powered courses.`}
        keywords="about us, mission, story, team, education technology, AI learning, online courses, personalized education"
      />

      {/* Hero Section */}
      <section ref={heroRef} className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24 relative overflow-hidden bg-gradient-to-br from-background to-muted/20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent z-0"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <motion.h1
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
              variants={itemVariants}
              className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl bg-gradient-to-r from-primary to-indigo-500 text-gradient leading-tight"
            >
              About {appName}
            </motion.h1>
            <motion.p
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
              variants={itemVariants}
              transition={{ delay: 0.2 }}
              className="mt-6 max-w-2xl mx-auto text-xl text-muted-foreground"
            >
              We are powering the future of learning with AI-generated courses and personalized education.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section ref={missionRef} className="px-4 py-16 sm:px-6 lg:px-8 bg-card shadow-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={isMissionInView ? "visible" : "hidden"}
            variants={sectionVariants}
            className="lg:grid lg:grid-cols-2 lg:gap-16 items-center"
          >
            <div>
              <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our Mission
              </motion.h2>
              <motion.p variants={itemVariants} transition={{ delay: 0.1 }} className="mt-4 text-lg text-muted-foreground">
                At {appName}, we harness artificial intelligence to make education better. We create courses that adapt to each person's unique learning style, providing an accessible, engaging, and empowering educational experience for learners across the globe.
              </motion.p>
              <motion.p variants={itemVariants} transition={{ delay: 0.2 }} className="mt-4 text-lg text-muted-foreground">
                We believe everyone deserves the opportunity to learn and grow. Our commitment is to support learners from all walks of life, helping them overcome barriers and realize their educational aspirations.
              </motion.p>
            </div>
            <motion.div
              variants={quoteVariants}
              className="mt-10 lg:mt-0 flex justify-center"
            >
              <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-xl max-w-md">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-indigo-600 opacity-90"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                  <Target className="h-12 w-12 mb-4" />
                  <p className="text-xl font-medium text-center">
                    "Pioneering the future of learning with an AI engine that crafts unique, personalized courses for every student."
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section ref={storyRef} className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={isStoryInView ? "visible" : "hidden"}
            variants={sectionVariants}
            className="relative"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-center mb-10 bg-gradient-to-r from-primary to-indigo-500 text-gradient">
              Our Story
            </motion.h2>
            <motion.p variants={itemVariants} transition={{ delay: 0.1 }} className="mt-4 text-lg text-muted-foreground text-center max-w-3xl mx-auto">
              At {companyName}, we see the future, and it's powered by education and AI. We built {appName} to put that future in your hands: a revolutionary SaaS platform that makes creating intelligent, effective courses seamless and fast.
            </motion.p>
            <motion.p variants={itemVariants} transition={{ delay: 0.2 }} className="mt-4 text-lg text-muted-foreground text-center max-w-3xl mx-auto">
              {appName} began with a single question: what if we could bridge the gap between education and technology? Driven by a passion for innovation, our team of experts dedicated years to answering that question. The result is {appName}—a testament to our journey. Our core purpose is to empower educators and professionals, using AI to remove the complexities of course development so you can focus on creating truly inspiring learning experiences.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Join Us Section */}
      <section ref={joinUsRef} className="px-4 py-16 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate={isJoinUsInView ? "visible" : "hidden"}
            variants={sectionVariants}
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl bg-gradient-to-r from-primary to-indigo-500 text-gradient">
              Join Us on the Learning Journey
            </motion.h2>
            <motion.p variants={itemVariants} transition={{ delay: 0.1 }} className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Embark on a journey of innovation and educational excellence with {appName}. Whether you're an educator, a professional, or an organization looking to elevate your learning programs, {companyName} is here to support you every step of the way.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Supported By Section (New) */}
      <section ref={supportedByRef} className="px-4 py-16 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate={isSupportedByInView ? "visible" : "hidden"}
            variants={sectionVariants}
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-center mb-10 bg-gradient-to-r from-primary to-indigo-500 text-gradient">
              Proudly Supported By
            </motion.h2>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              <motion.img
                variants={logoVariants}
                src="/founder-institute-logo.svg" // Path to Founder Institute logo in public folder
                alt="Founder Institute Logo"
                className="h-16 md:h-20 object-contain"
              />
              <motion.img
                variants={logoVariants}
                src="/google-for-startups-logo.svg" // Path to Google For Startups logo in public folder
                alt="Google for Startups Logo"
                className="h-16 md:h-20 object-contain"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-br from-primary to-indigo-600 text-primary-foreground">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate={isCtaInView ? "visible" : "hidden"}
            variants={sectionVariants}
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold sm:text-4xl">
              Ready to transform your learning experience?
            </motion.h2>
            <motion.p variants={itemVariants} transition={{ delay: 0.1 }} className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
              Join thousands of learners who have already unlocked their potential with {appName}'s AI-powered courses.
            </motion.p>
            <motion.div variants={itemVariants} transition={{ delay: 0.2 }} className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 shadow-lg transform hover:-translate-y-0.5 transition-all"
                asChild
              >
                <Link to="/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 shadow-lg transform hover:-translate-y-0.5 transition-all"
                asChild
              >
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;