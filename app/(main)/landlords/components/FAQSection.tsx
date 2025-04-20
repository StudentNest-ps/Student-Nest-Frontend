"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const faqs = [
    {
      question: "Integer morbi semper sodales sit facilisi habitant pulvinar sed venenatis?",
      answer:
        "Integer congue magna nulla sit vel. Quis facilisis lectus massa. Nunc mattis odio in vel sodales. Bibendum placerat ut varius suspendisse placerat ac semper risus. Sodales ornare porttitor eros consectetur porttitor in fugiat purus. Praesent amet, sodales nibh quis at sit. A ante porttitor praesent elementum magna placerat magna.",
    },
    {
      question: "Massa massa nulla rhoncus a quam consectetur sed purus, enim?",
      answer:
        "Nunc mattis odio in vel sodales. Bibendum placerat ut varius suspendisse placerat ac semper risus. Sodales ornare porttitor eros consectetur porttitor in fugiat purus. Praesent amet, sodales nibh quis at sit. A ante porttitor praesent elementum magna placerat magna.",
    },
    {
      question: "Dignissim congue rutrum pretium nunc sed nibh vitae tortor ut?",
      answer:
        "Bibendum placerat ut varius suspendisse placerat ac semper risus. Sodales ornare porttitor eros consectetur porttitor in fugiat purus. Praesent amet, sodales nibh quis at sit. A ante porttitor praesent elementum magna placerat magna.",
    },
    {
      question: "Vulputate imperdiet fusce vivamus nunc leo morbi scelerisque in?",
      answer:
        "Integer congue magna nulla sit vel. Quis facilisis lectus massa. Nunc mattis odio in vel sodales. Bibendum placerat ut varius suspendisse placerat ac semper risus. Sodales ornare porttitor eros consectetur porttitor in fugiat purus.",
    },
    {
      question: "Sit rhoncus rhoncus malesuada massa adipiscing arcu, semper ut in?",
      answer:
        "Quis facilisis lectus massa. Nunc mattis odio in vel sodales. Bibendum placerat ut varius suspendisse placerat ac semper risus. Sodales ornare porttitor eros consectetur porttitor in fugiat purus. Praesent amet, sodales nibh quis at sit.",
    },
    {
      question: "Vulputate nisl non neque iaculis lacus dui, habitant gravida?",
      answer:
        "Integer congue magna nulla sit vel. Quis facilisis lectus massa. Nunc mattis odio in vel sodales. Bibendum placerat ut varius suspendisse placerat ac semper risus. Sodales ornare porttitor eros consectetur porttitor in fugiat purus.",
    },
    {
      question: "Est felis a velit at vitae venenatis rhoncus?",
      answer:
        "Bibendum placerat ut varius suspendisse placerat ac semper risus. Sodales ornare porttitor eros consectetur porttitor in fugiat purus. Praesent amet, sodales nibh quis at sit. A ante porttitor praesent elementum magna placerat magna.",
    },
    {
      question: "Eget nam accumsan elementum accumsan imperdiet eu, cras?",
      answer:
        "Integer congue magna nulla sit vel. Quis facilisis lectus massa. Nunc mattis odio in vel sodales. Bibendum placerat ut varius suspendisse placerat ac semper risus. Sodales ornare porttitor eros consectetur porttitor in fugiat purus.",
    },
    {
      question: "Fermentum et semper aliquet justo, facilisis?",
      answer:
        "Nunc mattis odio in vel sodales. Bibendum placerat ut varius suspendisse placerat ac semper risus. Sodales ornare porttitor eros consectetur porttitor in fugiat purus. Praesent amet, sodales nibh quis at sit.",
    },
    {
      question: "A vulputate est diam tempus condimentum in?",
      answer:
        "Integer congue magna nulla sit vel. Quis facilisis lectus massa. Nunc mattis odio in vel sodales. Bibendum placerat ut varius suspendisse placerat ac semper risus. Sodales ornare porttitor eros consectetur porttitor in fugiat purus.",
    },
  ]

  return (
    <section ref={ref} className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Frequently Asked Questions</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border py-2 last:border-0">
                <AccordionTrigger className="text-left font-medium text-foreground text-lg hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-3xl mx-auto"
                    >
                        {faq.answer}
                    </motion.div>
                    </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
