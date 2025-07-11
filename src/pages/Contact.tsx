// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion, // Import Accordion components
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, MessageSquare, Send, Check } from 'lucide-react';
import SEO from '@/components/SEO';
import { appName, serverURL } from '@/constants';
import axios from 'axios';
import { motion, useInView } from 'framer-motion'; // Import motion and useInView

const faqs = [
  {
    question: 'What is StarlearnAI?',
    answer: 'StarlearnAI is an innovative education technology company that provides personalized, AI-powered courses on a wide range of topics.',
  },
  {
    question: "Who can benefit from StarlearnAI's courses?",
    answer: 'StarlearnAI is designed for a broad audience, including: Individuals looking to upskill or reskill for new career opportunities. Professionals seeking to enhance their current skill set and stay competitive. Businesses looking to train their employees and improve team capabilities. Anyone eager to learn new topics and gain practical, in-demand skills.',
  },
  {
    question: 'How do I generate a new course?',
    answer: 'After logging in, navigate to the "Generate Course" section in your dashboard. Enter your course topic and preferences, then click "Generate" to create your customized course.',
  },
  {
    question: 'Can I download my certificates?',
    answer: 'Yes, once you\'ve completed a course, you can download your certificate from the course completion page or from your account\'s "Certificates" section.',
  },
];

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const formRef = useRef(null);
  const faqRef = useRef(null);

  const isFormInView = useInView(formRef, { once: true, amount: 0.2 });
  const isFaqInView = useInView(faqRef, { once: true, amount: 0.2 });

  const containerVariants = {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const postURL = serverURL + '/api/contact';
    try {
      const response = await axios.post(postURL, { name: name, subject: subject, email, phone: '', msg: message });
      if (response.data.success) {
        toast({
          title: "Message sent",
          description: response.data.message,
        });
        setIsSubmitted(true);
        setName(''); // Clear form fields
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        toast({
          title: "Failed",
          description: response.data.message,
        });
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      toast({
        title: "Error",
        description: "There was an issue sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Us"
        description="Have questions, feedback, or need support? Contact the team for assistance."
        keywords="contact, support, help, feedback, customer service, questions"
      />
      <div className="min-h-screen bg-background py-12 md:py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-indigo-500 text-gradient">Contact Us</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              We'd love to hear from you. Contact us with your questions, feedback, or support needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              ref={formRef}
              initial="hidden"
              animate={isFormInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6 flex items-center">
                <MessageSquare className="h-6 w-6 mr-2 text-primary" />
                Get in Touch
              </motion.h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="shadow-lg border-border/50">
                    <CardContent className="pt-6 text-center">
                      <div className="mb-4 mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center animate-bounce-in">
                        <Check className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-medium mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground mb-6">
                        Thank you for reaching out. We've received your message and will respond as soon as possible.
                      </p>
                      <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="focus-visible:ring-primary focus-visible:ring-offset-background"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="focus-visible:ring-primary focus-visible:ring-offset-background"
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select onValueChange={setSubject} required>
                      <SelectTrigger id="subject" className="focus-visible:ring-primary focus-visible:ring-offset-background">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Enquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing Questions</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                        <SelectItem value="Collaborations">Collaborations</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea
                      id="message"
                      placeholder="How can we help you?"
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="focus-visible:ring-primary focus-visible:ring-offset-background"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-primary to-indigo-500 hover:from-indigo-500 hover:to-primary shadow-lg transition-all transform hover:-translate-y-0.5">
                      {isLoading ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              )}
            </motion.div>

            <motion.div
              ref={faqRef}
              initial="hidden"
              animate={isFaqInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6">Frequently Asked Questions</motion.h2>

              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <AccordionItem value={`item-${index}`} className="border-b border-border/50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                      <AccordionTrigger className="font-semibold text-left p-4 hover:bg-muted/30 transition-colors">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="p-4 text-muted-foreground bg-muted/10">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;