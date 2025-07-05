
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { BookOpenCheck, Users, Award, Sparkles, Target, ArrowRight } from 'lucide-react';
import { appName, companyName } from '@/constants';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navigation will be inherited from parent layout */}

      {/* Hero Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent z-0"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              About {appName}
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-muted-foreground">
              Powering the future of learning with AI-generated courses and personalized education.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our Mission
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                At {appName}, uses artificial intelligence to make education better. We create courses that adapt to each person's unique learning style, providing an accessible, engaging, and empowering educational experience for learners across the globe.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                We believe everyone deserves the opportunity to learn and grow. Our commitment is to support learners from all walks of life, helping them overcome barriers and realize their educational aspirations.
              </p>
            </div>
            <div className="mt-10 lg:mt-0 flex justify-center">
              <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-indigo-600 opacity-90"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                  <Target className="h-12 w-12 mb-4" />
                  <p className="text-xl font-medium text-center">
                    "Pioneering the future of learning with an AI engine that crafts unique, personalized courses for every student."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-center mb-16">
            About Us
          </h2>
          <div className="relative">
            <p className="mt-4 text-lg text-muted-foreground">
              At {companyName}, We see the future, and it's powered by education and AI. We built StarlearnAI to put that future in your hands: a revolutionary SaaS platform that makes creating intelligent, effective courses seamless and fast.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              StarlearnAI began with a single question: what if we could bridge the gap between education and technology? Driven by a passion for innovation, our team of experts dedicated years to answering that question. The result is StarlearnAI—a testament to our journey. Our core purpose is to empower educators and professionals, using AI to remove the complexities of course development so you can focus on creating truly inspiring learning experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Join Us on the Learning Journey
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Embark on a journey of innovation and educational excellence with AiCourse. Whether you're an educator, a professional, or an organization looking to elevate your learning programs, {companyName} is here to support you every step of the way.
          </p>

        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to transform your learning experience?
          </h2>
          <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
            Join thousands of learners who have already unlocked their potential with {appName}'s AI-powered courses.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90"
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
              className="bg-white text-primary hover:bg-white/90"
              asChild
            >
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
