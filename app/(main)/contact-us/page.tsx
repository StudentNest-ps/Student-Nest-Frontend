'use client';

import type React from 'react';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const glowVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Intersection observer hooks
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [contactRef, contactInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [formRef, formInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [faqRef, faqInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: '',
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? 'visible' : 'hidden'}
        variants={fadeIn}
        className="py-16 md:py-24 bg-gradient-to-br from-background via-accent/30 to-background relative overflow-hidden"
      >
        {/* Glowing background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              variants={glowVariants}
              className="inline-block p-3 bg-primary/10 rounded-2xl mb-6 shadow-lg shadow-primary/20"
            >
              <MessageCircle className="w-8 h-8 text-primary" />
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold text-foreground mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent"
            >
              Get in Touch
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Have questions about our properties or services? We&apos;re here
              to help you find your perfect rental home.
            </motion.p>

            <motion.div
              variants={staggerContainer}
              className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
            >
              <motion.div
                variants={fadeInUp}
                className="flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>24/7 Support</span>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Quick Response</span>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Expert Guidance</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contact Methods */}
      <motion.section
        ref={contactRef}
        initial="hidden"
        animate={contactInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="py-16 bg-background"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div variants={fadeInUp}>
              <Card className="h-full bg-gradient-to-br from-background to-accent/30 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors shadow-lg shadow-primary/20">
                    <Phone className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground mb-4">
                    Call Us
                  </CardTitle>
                  <p className="text-muted-foreground mb-4">
                    Speak directly with our team for immediate assistance
                  </p>
                  <div className="space-y-2">
                    <p className="font-medium text-foreground">
                      +44 (0) 123 456 7890
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Mon-Fri: 9AM-6PM
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full bg-gradient-to-br from-background to-accent/30 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors shadow-lg shadow-primary/20">
                    <Mail className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground mb-4">
                    Email Us
                  </CardTitle>
                  <p className="text-muted-foreground mb-4">
                    Send us a detailed message and we&apos;ll get back to you
                  </p>
                  <div className="space-y-2">
                    <p className="font-medium text-foreground">
                      hello@rentease.com
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Response within 24 hours
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full bg-gradient-to-br from-background to-accent/30 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors shadow-lg shadow-primary/20">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground mb-4">
                    Visit Us
                  </CardTitle>
                  <p className="text-muted-foreground mb-4">
                    Come to our office for a face-to-face consultation
                  </p>
                  <div className="space-y-2">
                    <p className="font-medium text-foreground">
                      123 Property Street
                    </p>
                    <p className="text-sm text-muted-foreground">
                      London, UK W1 1AA
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contact Form & Info */}
      <motion.section
        ref={formRef}
        initial="hidden"
        animate={formInView ? 'visible' : 'hidden'}
        variants={fadeIn}
        className="py-16 bg-accent/20"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div variants={fadeInUp}>
              <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-sm">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl font-bold text-foreground">
                    Send us a Message
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Fill out the form below and we&apos;ll get back to you as
                    soon as possible.
                  </p>
                </CardHeader>
                <CardContent>
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Full Name *
                          </label>
                          <Input
                            value={formData.name}
                            onChange={(e) =>
                              handleInputChange('name', e.target.value)
                            }
                            placeholder="John Doe"
                            required
                            className="border-border focus:border-primary focus:ring-primary/20"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Email Address *
                          </label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange('email', e.target.value)
                            }
                            placeholder="john@example.com"
                            required
                            className="border-border focus:border-primary focus:ring-primary/20"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Phone Number
                          </label>
                          <Input
                            value={formData.phone}
                            onChange={(e) =>
                              handleInputChange('phone', e.target.value)
                            }
                            placeholder="+44 123 456 7890"
                            className="border-border focus:border-primary focus:ring-primary/20"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Inquiry Type
                          </label>
                          <Select
                            value={formData.inquiryType}
                            onValueChange={(value) =>
                              handleInputChange('inquiryType', value)
                            }
                          >
                            <SelectTrigger className="border-border focus:border-primary focus:ring-primary/20">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="rental">
                                Property Rental
                              </SelectItem>
                              <SelectItem value="landlord">
                                Become a Landlord
                              </SelectItem>
                              <SelectItem value="support">
                                Customer Support
                              </SelectItem>
                              <SelectItem value="partnership">
                                Partnership
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Subject *
                        </label>
                        <Input
                          value={formData.subject}
                          onChange={(e) =>
                            handleInputChange('subject', e.target.value)
                          }
                          placeholder="How can we help you?"
                          required
                          className="border-border focus:border-primary focus:ring-primary/20"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Message *
                        </label>
                        <Textarea
                          value={formData.message}
                          onChange={(e) =>
                            handleInputChange('message', e.target.value)
                          }
                          placeholder="Tell us more about your inquiry..."
                          rows={5}
                          required
                          className="border-border focus:border-primary focus:ring-primary/20 resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="cursor-pointer w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all duration-300"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                            Sending...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Send className="w-4 h-4" />
                            Send Message
                          </div>
                        )}
                      </Button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-muted-foreground">
                        Thank you for contacting us. We&apos;ll get back to you
                        within 24 hours.
                      </p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={fadeInUp} className="space-y-8">
              <Card className="shadow-lg border-0 bg-background/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-6">
                    Office Hours
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">
                          Monday - Friday
                        </p>
                        <p className="text-sm text-muted-foreground">
                          9:00 AM - 6:00 PM
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Saturday</p>
                        <p className="text-sm text-muted-foreground">
                          10:00 AM - 4:00 PM
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Sunday</p>
                        <p className="text-sm text-muted-foreground">Closed</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-background/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-6">
                    Why Choose RentEase?
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <Users className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          Expert Team
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Our experienced professionals are here to guide you
                          through every step.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <Star className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          5-Star Service
                        </p>
                        <p className="text-sm text-muted-foreground">
                          We&apos;re committed to providing exceptional customer
                          service.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          Trusted Platform
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Thousands of satisfied customers trust us with their
                          rental needs.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        ref={faqRef}
        initial="hidden"
        animate={faqInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="py-16 bg-background"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find quick answers to common questions about our services and
              platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                question: 'How quickly can I move into a property?',
                answer:
                  'Most of our properties are move-in ready. Once your application is approved, you can typically move in within 24-48 hours.',
              },
              {
                question: "What's included in the rental price?",
                answer:
                  'All our properties come fully furnished with utilities, high-speed Wi-Fi, and 24/7 support included in the rental price.',
              },
              {
                question: 'Can I extend my rental period?',
                answer:
                  'Yes, you can extend your rental period subject to availability. We offer flexible terms to accommodate your needs.',
              },
              {
                question: 'What if I need to cancel my booking?',
                answer:
                  'We offer flexible cancellation policies. Please refer to your rental agreement or contact our support team for specific terms.',
              },
            ].map((faq, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full shadow-md hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-background to-accent/20">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeInUp} className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Still have questions? We&apos;re here to help!
            </p>
            <Button
              variant="outline"
              className="cursor-pointer text-primary border-primary hover:bg-accent"
            >
              View All FAQs
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
