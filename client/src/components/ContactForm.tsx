import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "4516992c-a2ea-402b-956a-bbdfa48f01fe",
          subject: `New Project Inquiry from ${formData.name}`,
          from_name: "Shaurya Spatial Labs Website",
          ...formData,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", company: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--light-gray)" }}
          >
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border bg-transparent focus:outline-none focus:ring-2 transition-all duration-300"
            style={{
              borderColor: "var(--cyber-cyan)",
              color: "var(--off-white)",
            }}
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--light-gray)" }}
          >
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border bg-transparent focus:outline-none focus:ring-2 transition-all duration-300"
            style={{
              borderColor: "var(--cyber-cyan)",
              color: "var(--off-white)",
            }}
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium mb-2"
          style={{ color: "var(--light-gray)" }}
        >
          Company/Organization
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border bg-transparent focus:outline-none focus:ring-2 transition-all duration-300"
          style={{
            borderColor: "var(--cyber-cyan)",
            color: "var(--off-white)",
          }}
          placeholder="Your company name"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium mb-2"
          style={{ color: "var(--light-gray)" }}
        >
          Project Details *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border bg-transparent focus:outline-none focus:ring-2 transition-all duration-300 resize-none"
          style={{
            borderColor: "var(--cyber-cyan)",
            color: "var(--off-white)",
          }}
          placeholder="Tell us about your geospatial project requirements..."
        />
      </div>

      <Button
        type="submit"
        disabled={status === "loading"}
        className="w-full px-8 py-4 font-semibold rounded-lg animate-glow touch-target flex items-center justify-center gap-2"
        style={{
          backgroundColor: status === "success" ? "#10b981" : "var(--cyber-cyan)",
          color: "var(--deep-navy)",
        }}
      >
        {status === "loading" && (
          <>
            <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" />
            Sending...
          </>
        )}
        {status === "success" && (
          <>
            <CheckCircle className="w-5 h-5" />
            Message Sent!
          </>
        )}
        {status === "error" && (
          <>
            <AlertCircle className="w-5 h-5" />
            Failed to Send - Try Again
          </>
        )}
        {status === "idle" && (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
};

export default ContactForm;
