// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useRef } from 'react';
import { BookOpen, Lightbulb, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { motion, useInView } from 'framer-motion';

const features = [
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: 'Instant Course Creation',
    description: 'Quickly generate comprehensive courses on any subject using advanced AI.',
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: 'Personalized Learning Paths',
    description: 'Tailor content to individual learning styles and knowledge levels.',
  },
  {
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
    title: 'Interactive Quizzes & Assessments',
    description: 'Reinforce learning with AI-generated quizzes and track progress effortlessly.',
  },
];

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 }); // Trigger when 30% of component is in view

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger animations for child elements
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section id="features" className="py-16 md:py-24 bg-gradient-to-br from-background to-muted/20"> {/* Added id="features" */}
      <div className="container">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-indigo-500 text-gradient">
            Key Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="text-center p-6 h-full flex flex-col items-center justify-center border-border/50 hover:shadow-lg transition-all duration-300 hover:border-primary/20">
                  <div className="mb-4">{feature.icon}</div>
                  <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 text-muted-foreground">
                    <p>{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;