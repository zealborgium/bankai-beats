import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

const Contact = () => (
  <div className="min-h-screen text-foreground overflow-x-hidden">
    <Navbar />
    <PageHero
      title="Contact"
      highlight="Us"
      subtitle="Have a question, a partnership idea, or just want to say hi? We'd love to hear from you."
    />
    <ContactForm page="Contact" />
    <Footer />
  </div>
);

export default Contact;
