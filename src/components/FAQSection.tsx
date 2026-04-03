import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is BANKAI BEATS?",
    answer:
      "BANKAI BEATS is India's first large-scale Asian pop culture music festival. It brings together international K-pop & J-pop artists, cosplay competitions, gaming zones, merch, authentic Asian food, and an incredible community — all in one festival.",
  },
  {
    question: "When and where is it?",
    answer:
      "Date and venue will be announced soon — stay tuned! Future editions are planned for multiple cities across India.",
  },
  {
    question: "How can I partner or sponsor?",
    answer:
      "We welcome investors, brand sponsors, exhibitors, media partners, community partners, artists, and gaming/tech partners. Fill out the interest form on this page and our team will get in touch.",
  },
  {
    question: "Is food included?",
    answer:
      "The festival will feature 25+ curated F&B stalls with authentic Japanese, Korean, and pan-Asian cuisine. Food is available for purchase at the venue with a wide variety of options.",
  },
  {
    question: "What should I expect?",
    answer:
      "9 hours of curated entertainment including international K-pop & J-pop headliners, cosplay championships, esports tournaments, 40+ merch stalls, cultural experience zones like kimono & hanbok trials, karaoke rooms, and so much more.",
  },
];

const FAQItem = ({
  faq,
  isOpen,
  toggle,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  toggle: () => void;
}) => (
  <div style={{ borderBottom: '2px solid hsl(var(--border))' }}>
    <button
      onClick={toggle}
      className="w-full flex items-center justify-between py-6 text-left group"
    >
      <h3 className="font-display font-bold text-base pr-4 text-foreground group-hover:text-primary transition-colors">
        {faq.question}
      </h3>
      <ChevronDown
        className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>
    <motion.div
      initial={false}
      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <p className="text-muted-foreground pb-6 leading-relaxed">{faq.answer}</p>
    </motion.div>
  </div>
);

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-14 md:py-20" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="card-warm"
        >
          <h2 className="section-title">
            Frequently Asked{" "}
            <span className="text-primary glow-text-red">Questions</span>
          </h2>
          <div>
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                toggle={() =>
                  setOpenIndex(openIndex === i ? null : i)
                }
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;



