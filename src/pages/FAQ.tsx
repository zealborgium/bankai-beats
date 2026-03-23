import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const faqs = [
  {
    category: "General",
    items: [
      { question: "What is BANKAI BEATS?", answer: "BANKAI BEATS is India's first large-scale anime and K-pop music festival. A 12-hour, multi-zone live experience built entirely around Asian pop culture. Live performances, cosplay championships, K-pop dance battles, food, merch, and more. All under one sky." },
      { question: "When and where is BANKAI BEATS happening?", answer: "Date and venue will be released soon. Follow our Instagram at @bankaibeats.in to be the first to know." },
      { question: "Who organises BANKAI BEATS?", answer: "BANKAI BEATS is organised by Dellusion Entertainment, a live experience company born inside the anime and K-pop fandom." },
      { question: "Is this a one-time event or will it happen every year?", answer: "BANKAI BEATS is built to grow. The 2026 Delhi edition is the pilot. Future editions are planned across multiple cities in India with bigger lineups, more zones, and a larger community every year." },
      { question: "What age group is this festival for?", answer: "BANKAI BEATS is open to all age groups. The festival is primarily designed for the 16 to 30 age group but welcomes anyone who loves the culture. Those below the age of 16 need to be accompanied by a guardian and both need to purchase a pass. Please note the Live Bar is strictly for guests of legal drinking age." },
    ],
  },
  {
    category: "Sponsors & Partners",
    items: [
      { question: "How can my brand partner with BANKAI BEATS?", answer: "We offer a range of partnership opportunities including title sponsorship, co-powered by packages, associate sponsorships, and stall bookings. Reach out to us at contact@dellusion.in to start the conversation." },
      { question: "What sponsorship tiers are available?", answer: "We offer multiple tiers designed for different budgets and objectives. From title sponsorship to associate packages and brand activation zones, there is an option for every kind of brand. Get in touch with us at contact@dellusion.in for our full partnerships deck." },
      { question: "What kind of audience will my brand be reaching?", answer: "BANKAI BEATS attracts India's most passionate Gen Z audience. Anime fans, K-pop stans, cosplayers, gamers, and culture enthusiasts aged 16 to 30. An engaged, highly active community with strong purchasing intent and deep brand loyalty when approached authentically." },
      { question: "Can we set up a brand activation zone at the festival?", answer: "Yes. Dedicated brand activation zones are available for sponsors looking to create immersive on-ground experiences for attendees. Details are covered in our partnerships deck." },
      { question: "How do we get in touch with the partnerships team?", answer: "Reach out to us directly at contact@dellusion.in or DM us on Instagram at @bankaibeats.in. We will get back to you within 48 hours." },
    ],
  },
  {
    category: "Attendees",
    items: [
      { question: "How do I buy tickets?", answer: "Tickets will be available on our official website and authorised ticketing platforms. Follow our Instagram at @bankaibeats.in for announcements on when tickets go live." },
      { question: "What are the different ticket categories and prices?", answer: "Ticket categories and pricing will be announced closer to the event. Follow our official channels to be the first to know when tickets drop." },
      { question: "Can I come in cosplay?", answer: "Absolutely. Cosplay is not just welcome at BANKAI BEATS, it is celebrated. All genres and fandoms are welcome. Please ensure costumes do not include real weapons or items that may pose a safety risk." },
      { question: "What is the refund and cancellation policy?", answer: "Tickets are non-refundable. In the unlikely event of a cancellation or postponement by the organiser, attendees will be notified directly with available options." },
      { question: "Is the venue accessible for differently abled guests?", answer: "Yes. BANKAI BEATS is committed to being an inclusive festival. Accessibility ramps and dedicated viewing platforms for differently abled guests will be available across the venue." },
    ],
  },
  {
    category: "Experience",
    items: [
      { question: "What zones are available at the festival?", answer: "BANKAI BEATS features 8 immersive zones including the Live Music Stage, Cosplay Championship and K-pop Dance Battle, Entertainment Arena, Live Experience Zone, Food Court, Fan Meetup Zone, Merch Marketplace, and Live Bar." },
      { question: "Who are the headliners performing at BANKAI BEATS?", answer: "Headliner announcements are coming soon. Follow our Instagram at @bankaibeats.in to be the first to know when the lineup drops." },
      { question: "How do I register for the cosplay championship?", answer: "Cosplay championship registrations will open closer to the event. Details on categories, rules, and the registration process will be announced on our official website and social media channels." },
      { question: "How do I register for the K-pop dance battle?", answer: "K-pop dance battle registrations will open closer to the event. Details on format, rules, and how to register your crew will be announced on our official channels." },
      { question: "How do I get a Fan Meetup pass?", answer: "Fan Meetup passes are available at an additional cost on top of the general festival ticket. Details on availability, pricing, and which artists are included will be announced closer to the event. Spots are limited." },
    ],
  },
];

const FAQItem = ({ faq, isOpen, toggle }: { faq: { question: string; answer: string }; isOpen: boolean; toggle: () => void }) => (
  <div style={{ borderBottom: '2px solid hsl(var(--border))' }}>
    <button onClick={toggle} className="w-full flex items-center justify-between py-6 text-left group">
      <h3 className="font-display font-bold text-base pr-4 text-foreground transition-colors">{faq.question}</h3>
      <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
    </button>
    <motion.div initial={false} animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
      <p className="text-muted-foreground pb-6 leading-relaxed">{faq.answer}</p>
    </motion.div>
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<string | null>("0-0");

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden">
      <Navbar />

      <section className="pt-28 pb-12">
        <div className="section-container">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 font-mono uppercase tracking-wider">
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </motion.div>
          <div className="card-warm">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="section-title !text-4xl md:!text-5xl lg:!text-6xl"
            >
              Frequently Asked <span className="text-secondary glow-text-purple">Questions</span>
            </motion.h1>
          </div>
        </div>
      </section>

      <section className="pb-10 md:pb-14">
        <div className="section-container">
          <div className="card-warm">
            <div className="space-y-6">
              {faqs.map((category, ci) => (
                <div key={category.category} className="card-inner">
                  <h2 className="section-label mb-4 text-primary">{category.category}</h2>
                  <div>
                    {category.items.map((faq, fi) => {
                      const key = `${ci}-${fi}`;
                      return (
                        <FAQItem
                          key={key}
                          faq={faq}
                          isOpen={openIndex === key}
                          toggle={() => setOpenIndex(openIndex === key ? null : key)}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactForm page="FAQ" />
      <Footer />
    </div>
  );
};

export default FAQ;
