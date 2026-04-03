import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbw5Xf5DJDWNpXLwYPPcYY-EKigbV_b6G72V92r__tLNwKvTN4k8N_vl9UUSz4J4y0uLMw/exec";

interface PartnerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  partnerType: string;
}

const PartnerDialog = ({ open, onOpenChange, partnerType }: PartnerDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const digits = value.replace(/\D/g, "").slice(0, 10);
      setFormData({ ...formData, phone: digits });
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
        body: JSON.stringify({
          ...formData,
          interest: partnerType,
          page: "Partners",
        }),
      });

      toast.success("Thank you! We'll be in touch soon.");
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
      onOpenChange(false);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full bg-muted border-2 border-border rounded-full px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-all font-body";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl sm:max-w-lg border-0" style={{ background: 'hsla(0, 0%, 100%, 0.04)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid hsla(0, 0%, 100%, 0.1)', boxShadow: '0 4px 24px hsla(280, 80%, 55%, 0.08)' }}>
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            Partner as{" "}
            <span className="text-primary glow-text-red">{partnerType}</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-foreground mb-1.5">
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
              <label className="block text-xs font-mono uppercase tracking-wider text-foreground mb-1.5">
                Email *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={inputClasses}
                placeholder="your@gmail.com"
                pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
                title="Please enter a valid email address (e.g. name@gmail.com)"
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-foreground mb-1.5">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={inputClasses}
                placeholder="9876543210"
                maxLength={10}
                pattern="\d{10}"
                title="Please enter a 10-digit phone number"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-foreground mb-1.5">
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
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-foreground mb-1.5">
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
      </DialogContent>
    </Dialog>
  );
};

export default PartnerDialog;



