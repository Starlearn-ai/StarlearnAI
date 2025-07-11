// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useRef } from 'react';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { motion, useInView } from 'framer-motion';

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    frequency: '/month',
    features: [
      '1 AI-generated course',
      'Basic course editor',
      'Standard quiz generation',
      'Community support',
    ],
    buttonText: 'Get Started',
    buttonVariant: 'outline',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$9',
    frequency: '/month',
    features: [
      'Unlimited AI-generated courses',
      'Advanced course editor',
      'Priority quiz generation',
      'Premium support',
      'Certificate generation',
      'Early access to new features',
    ],
    buttonText: 'Start Free Trial',
    buttonVariant: 'default',
    highlight: true,
  },
  {
    name: 'Yearly',
    price: '$99',
    frequency: '/yearly',
    features: [
      'Unlimited AI-generated courses',
      'Advanced course editor',
      'Priority quiz generation',
      'Premium support',
      'Certificate generation',
      '1 Year access to new features',
    ],
    buttonText: 'Start Free Trial',
    buttonVariant: 'default',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    frequency: '',
    features: [
      'Everything in Pro',
      'Dedicated account manager',
      'Custom integrations',
      'On-premise deployment options',
      'Volume licensing',
      'Advanced analytics',
    ],
    buttonText: 'Contact Us',
    buttonVariant: 'outline',
  },
];

const Pricing = () => {
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
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section id="pricing" className="py-16 md:py-24 bg-background"> {/* Added id="pricing" */}
      <div className="container">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-indigo-500 text-gradient">
            Simple, Transparent Pricing
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card
                  className={`flex flex-col h-full border-border/50 ${plan.highlight ? 'border-2 border-primary shadow-lg scale-[1.02] hover:scale-105' : 'hover:shadow-md'} transition-all duration-300`}
                >
                  <CardHeader className="text-center pb-4">
                    <CardTitle className={`text-3xl font-bold ${plan.highlight ? 'text-primary' : ''}`}>
                      {plan.name}
                    </CardTitle>
                    <div className="text-5xl font-extrabold my-2">
                      {plan.price}
                      <span className="text-lg text-muted-foreground font-normal">{plan.frequency}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 px-6 py-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-muted-foreground">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button
                      className={`w-full ${plan.highlight ? 'bg-gradient-to-r from-primary to-indigo-500 hover:from-indigo-500 hover:to-primary text-white shadow-lg' : ''}`}
                      variant={plan.buttonVariant}
                      size="lg"
                    >
                      {plan.buttonText}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;