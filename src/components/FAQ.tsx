"use client"
import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and Apple Pay for secure transactions.'
  },
  {
    question: 'How does the shipping process work?',
    answer: 'Orders are processed within 1-2 business days and shipped via our trusted carriers.'
  },
  {
    question: 'What is your return policy?',
    answer: 'You can return any product within 30 days for a full refund or exchange.'
  },
  {
    question: 'How can I track my order?',
    answer: 'Once your order is shipped, you will receive a tracking number via email.'
  }
]

const FAQ: React.FC = () => (
  <section className="bg-gray-50 dark:bg-gray-800 py-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((item, idx) => (
          <AccordionItem key={idx} value={`item-${idx}`}>
            <AccordionTrigger className="text-lg">
              {item.question}
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-700 dark:text-gray-300">
                {item.answer}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
)

export default FAQ;
