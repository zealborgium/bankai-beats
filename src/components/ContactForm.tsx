import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { CheckCircle, X } from "lucide-react";
import PhoneInput from "@/components/PhoneInput";

const CONTACT_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz_33D4K8X8Q0jfYnCtmRndqf6-zm4wwn0JNjygoW031batBGg6Gg7ywJGqaRETPmb8-g/exec";
const PARTNERS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyJhd5l9OUn8G0Ou-M61XIY7Ot7-o26O2e4hKDxXz3ezImp6z4e8_Qb8M5fCX8gj0Ud/exec";

const interestOptions = [
  "Investor",
  "Brand Sponsor",
  "Exhibitor / Vendor",
  "Media Partner",
  "Artist / Performer",
  "Fan / Attendee",
  "Other",
];

interface ContactFormProps {
  page?: string;
  excludeOptions?: string[];
  heading?: React.ReactNode;
  usePartnersSheet?: boolean;
}

const ContactForm = ({ page = "Homepage", excludeOptions = [], heading, usePartnersSheet = false }: ContactFormProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [dialCode, setDialCode] = useState("+91");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    interest: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const digits = value.replace(/\D/g, "").slice(0, 10);
      setFormData({ ...formData, phone: digits });
      return;
    }
    if (name === "name") {
      const cleaned = value.replace(/[^a-zA-Z0-9 ]/g, "").slice(0, 30);
      setFormData({ ...formData, name: cleaned });
      return;
    }
    if (name === "company") {
      const cleaned = value.replace(/[^a-zA-Z0-9 ]/g, "").slice(0, 30);
      setFormData({ ...formData, company: cleaned });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch(usePartnersSheet ? PARTNERS_SCRIPT_URL : CONTACT_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: dialCode + formData.phone,
          page,
        }),
      });

      setShowSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        interest: "",
        message: "",
      });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full bg-muted border-2 border-border rounded-full px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-all font-body";

  return (
    <section id="interest-form" className="py-6 md:py-8" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="card-warm"
        >
          <div className="text-center mb-8">
            <span className="section-label">Get Involved</span>
            <h2 className="section-title">
              {heading ?? <><span className="text-neon-purple glow-text-purple">Contact</span> Us</>}
            </h2>
            <p className="text-muted-foreground text-base">
              Leave your details and we'll get in touch to explore
              collaboration.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-mono uppercase tracking-wider text-foreground mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-mono uppercase tracking-wider text-foreground mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => {
                    const valid = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(formData.email);
                    setEmailError(formData.email && !valid ? "Please enter a valid email address" : "");
                  }}
                  className={`${inputClasses} ${emailError ? "border-red-500" : ""}`}
                  placeholder="your@gmail.com"
                />
                {emailError && <p className="text-red-500 text-xs mt-1 pl-4">{emailError}</p>}
              </div>
              <div>
                <label className="block text-sm font-mono uppercase tracking-wider text-foreground mb-2">
                  Phone *
                </label>
                <PhoneInput
                  value={formData.phone}
                  onChange={(val, dial) => { setFormData(f => ({ ...f, phone: val })); setDialCode(dial); }}
                  required
                  inputClasses={inputClasses}
                />
              </div>
              <div>
                <label className="block text-sm font-mono uppercase tracking-wider text-foreground mb-2">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="Company name"
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-mono uppercase tracking-wider text-foreground mb-2">
                I am interested as... *
              </label>
              <select
                name="interest"
                required
                value={formData.interest}
                onChange={handleChange}
                className={inputClasses}
              >
                <option value="">Select your interest</option>
                {interestOptions.filter(opt => !excludeOptions.includes(opt)).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-mono uppercase tracking-wider text-foreground mb-2">
                Message
              </label>
              <textarea
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                className={`${inputClasses} resize-none`}
                placeholder="Tell us about your interest..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Interest"}
            </button>
          </form>
        </motion.div>

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
              onClick={() => setShowSuccess(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="card-warm max-w-md w-full text-center relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowSuccess(false)}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={20} />
                </button>
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 flex items-center justify-center bg-primary/10 border-2 border-primary rounded-full">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-display font-bold text-xl mb-3">
                  Request <span className="text-primary glow-text-red">Received!</span>
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  Thank you for showing interest in <span className="text-foreground font-semibold">BANKAI BEATS</span>.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Our team will review your details and get back to you shortly. We're excited to connect!
                </p>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="btn-primary w-full"
                >
                  Got It
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ContactForm;



