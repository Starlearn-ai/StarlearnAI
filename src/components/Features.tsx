
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Zap, Book, Layers, BarChart, PenLine, RotateCw } from 'lucide-react';

const features = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Generative AI",
    description: "From your text to a full course with GenAI."
  },
  {
    icon: <Book className="h-6 w-6" />,
    title: "Your Learning Preferences",
    description: "Choose between Image + Theory or Video + Theory formats for a personalized learning journey."
  },
  {
    icon: <PenLine className="h-6 w-6" />,
    title: "Test Knowledge",
    description: "Boost Retention and Test your understanding with Smart AI Quizzes and Assessments. "
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Learn in Your Language",
    description: "AI-generated images, videos, and courses in 23+ languages."
  },
  {
    icon: <RotateCw className="h-6 w-6" />,
    title: "Ask the AI Tutor",
    description: "Ask our AI Tutor questions as you learn."
  },
  {
    icon: <BarChart className="h-6 w-6" />,
    title: "Share & Export Course Data",
    description: "Learn offline. Download your course in the format you need."
  }
];

const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up');
          entry.target.classList.remove('opacity-0');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    const elements = featuresRef.current?.querySelectorAll('.feature-item');
    elements?.forEach((el, index) => {
      // Add staggered delay
      el.classList.add(`delay-[${index * 100}ms]`);
      observer.observe(el);
    });
    
    return () => {
      elements?.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section id="features" className="py-20 md:py-32 px-6 md:px-10 bg-secondary/50 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
            Features
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">
            Everything You Need to Create <br className="hidden md:block" />
            <span className="text-primary">Quality Course Contents</span>
          </h2>
        </div>
        
        <div ref={featuresRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-item opacity-0 bg-card shadow-sm hover:shadow-md transition-all duration-300 rounded-xl p-8 border border-border/50"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 text-primary">
                {feature.icon}
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
