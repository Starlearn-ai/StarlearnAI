// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useRef } from 'react';
import { Sparkles, BookOpen, CheckCircle2 } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    icon: <Sparkles className="h-6 w-6 text-white" />,
    title: 'Generate',
    description: 'Input your desired topic, and our AI will craft a comprehensive course outline and content.',
  },
  {
    icon: <BookOpen className="h-6 w-6 text-white" />,
    title: 'Learn',
    description: 'Engage with interactive lessons, multimedia content, and practical examples.',
  },
  {
    icon: <CheckCircle2 className="h-6 w-6 text-white" />,
    title: 'Assess',
    description: 'Test your knowledge with AI-generated quizzes and track your mastery.',
  },
];

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-background"> {/* Added id="how-it-works" */}
      <div className="container">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-indigo-500 text-gradient">
            How It Works
          </motion.h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10">
            {steps.map((step, index) => (
              <motion.div key={index} variants={itemVariants} className="flex flex-col items-center text-center max-w-xs">
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center relative z-10 shadow-lg">
                    {step.icon}
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-indigo-500 blur-xl opacity-30 animate-pulse-slow"></div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;