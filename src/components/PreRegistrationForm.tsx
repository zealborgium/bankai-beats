import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import PhoneInput from "@/components/PhoneInput";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwLo6emgCM9vhgdrg40Tc6XnRWWy4Qeg9Kpr84d0i2pXzBE6dCkyZSPpePgaqzwRcy_/exec";

interface PreRegistrationFormProps {
  open: boolean;
  onClose: () => void;
}

const PreRegistrationForm = ({ open, onClose }: PreRegistrationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [dialCode, setDialCode] = useState("+91");
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    "Contact/WhatsApp": "",
    Age: "",
    Gender: "",
    City: "",
    Fandom: "",
  });

  const inputClasses =
    "w-full bg-muted border-2 border-border rounded-full px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-all font-body";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "Contact/WhatsApp") {
      const digits = value.replace(/\D/g, "").slice(0, 10);
      setFormData({ ...formData, [name]: digits });
      return;
    }
    if (name === "Name") {
      const cleaned = value.replace(/[^a-zA-Z0-9 ]/g, "").slice(0, 30);
      setFormData({ ...formData, [name]: cleaned });
      return;
    }
    if (name === "Age") {
      const digits = value.replace(/\D/g, "").slice(0, 3);
      setFormData({ ...formData, [name]: digits });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, "Contact/WhatsApp": dialCode + formData["Contact/WhatsApp"], page: "Pre-Registration" }),
      });
      setShowSuccess(true);
      setFormData({ Name: "", Email: "", "Contact/WhatsApp": "", Age: "", Gender: "", City: "", Fandom: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setShowSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="card-warm w-full max-w-lg mx-2 my-4 relative overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={20} />
            </button>

            {!showSuccess ? (
              <>
                <div className="text-center mb-6">
                  <span className="section-label">Early Access</span>
                  <h2 className="section-title !text-3xl">
                    Pre-Registration <span className="text-primary glow-text-red">Form</span>
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-mono uppercase tracking-wider text-foreground mb-2">Name *</label>
                      <input type="text" name="Name" required value={formData.Name} onChange={handleChange} className={inputClasses} placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-sm font-mono uppercase tracking-wider text-foreground mb-2">Email *</label>
                      <input type="email" name="Email" required value={formData.Email} onChange={handleChange}
                        onBlur={() => {
                          const valid = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(formData.Email);
                          setEmailError(formData.Email && !valid ? "Please enter a valid email address" : "");
                        }}
                        className={`${inputClasses} ${emailError ? "border-red-500" : ""}`}
                        placeholder="your@email.com" />
                      {emailError && <p className="text-red-500 text-xs mt-1 pl-4">{emailError}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-mono uppercase tracking-wider text-foreground mb-2">Contact / WhatsApp *</label>
                      <PhoneInput
                        value={formData["Contact/WhatsApp"]}
                        onChange={(val, dial) => { setFormData(f => ({ ...f, "Contact/WhatsApp": val })); setDialCode(dial); }}
                        required
                        inputClasses={inputClasses}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-mono uppercase tracking-wider text-foreground mb-2">Age *</label>
                      <input type="text" name="Age" required value={formData.Age} onChange={handleChange}
                        onBlur={() => {
                          const age = parseInt(formData.Age);
                          setAgeError(formData.Age && (isNaN(age) || age < 1 || age > 99) ? "Age must be between 1 and 99" : "");
                        }}
                        className={`${inputClasses} ${ageError ? "border-red-500" : ""}`} placeholder="e.g. 21" />
                      {ageError && <p className="text-red-500 text-xs mt-1 pl-4">{ageError}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-mono uppercase tracking-wider text-foreground mb-2">Gender *</label>
                      <select name="Gender" required value={formData.Gender} onChange={handleChange} className={inputClasses}>
                        <option value="">Select gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Non-Binary</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-mono uppercase tracking-wider text-foreground mb-2">City *</label>
                      <input type="text" name="City" required value={formData.City} onChange={handleChange} className={inputClasses} placeholder="Your city" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-mono uppercase tracking-wider text-foreground mb-2">Fandom *</label>
                    <select name="Fandom" required value={formData.Fandom} onChange={handleChange} className={inputClasses}>
                      <option value="">Select your fandom</option>
                      <option>Anime</option>
                      <option>K-Pop</option>
                      <option>Anime & K-Pop</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Pre-Register Now"}
                  </button>

                  <div className="pt-2 space-y-1 text-xs text-muted-foreground font-mono">
                    <p>✦ Early access to passes before they go live for the general audience</p>
                    <p>✦ Exclusive 10% discount coupon delivered to your email & WhatsApp</p>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 flex items-center justify-center bg-primary/10 border-2 border-primary rounded-full">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-display font-bold text-xl mb-3">
                  You're <span className="text-primary glow-text-red">Registered!</span>
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  Welcome to the early access list for <span className="text-foreground font-semibold">BANKAI BEATS</span>.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Your 10% discount coupon will be sent to your email and WhatsApp. Stay tuned!
                </p>
                <button onClick={handleClose} className="btn-primary w-full">Got It</button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreRegistrationForm;



