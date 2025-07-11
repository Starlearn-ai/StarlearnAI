// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useRef } from 'react';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'; // Still needed for avatar placeholder, though actual avatars removed
import { motion, useInView } from 'framer-motion';
import { appName } from '@/constants'; // Import appName

const testimonials = [
  {
    quote: `${appName} saved me at least 40 hours of work on my last course. What used to take weeks now takes minutes, and the quality is even better.`,
    author: "Sarah Johnson",
    title: "Online Course Creator",
    stars: 5
  },
  {
    quote: `As a university professor, I was skeptical about AI-generated content. But ${appName} perfectly structured my research into a comprehensive course for my students.`,
    author: "Prof. David Chen",
    title: "Computer Science Department",
    stars: 5
  },
  {
    quote: `Our training team uses ${appName} to create onboarding content for new employees. We've reduced development time by 80% while improving engagement metrics.`,
    author: "Michael Rodriguez",
    title: "Head of L&D, TechCorp",
    stars: 5
  },
  {
    quote: "The quiz generation feature alone is worth the subscription. It creates thoughtful assessments that actually test comprehension, not just memorization.",
    author: "Emma Wilson",
    title: "Educational Consultant",
    stars: 4
  }
];

// Helper to render stars
const renderStars = (count: number) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <svg
        key={i}
        className={`h-5 w-5 ${i < count ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.539 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.565-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
      </svg>
    );
  }
  return <div className="flex justify-center mb-2">{stars}</div>;
};

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -100 }, // Start 100px to the left
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }, // Slide to its natural position
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-background to-muted/20">
      <div className="container">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-indigo-500 text-gradient">
            What Our Users Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-6 h-full flex flex-col justify-between border-border/50 hover:shadow-lg transition-all duration-300 hover:border-primary/20">
                  <CardContent className="p-0 mb-4 text-center">
                    <p className="text-lg italic text-foreground/90">"{testimonial.quote}"</p>
                  </CardContent>
                  <div className="flex flex-col items-center justify-center text-center">
                    {renderStars(testimonial.stars)}
                    {/* Placeholder avatar if needed, or remove Avatar components if not using */}
                    {/* <Avatar className="h-16 w-16 mb-3 border-2 border-primary/50">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                      <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                    </Avatar> */}
                    <div className="font-semibold text-lg">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;