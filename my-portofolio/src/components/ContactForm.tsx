"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      const subject = encodeURIComponent(
        `Portfolio Contact: ${formData.subject}`
      );
      const body = encodeURIComponent(
        `Name: ${formData.name}\n` +
          `Email: ${formData.email}\n` +
          `Subject: ${formData.subject}\n\n` +
          `Message:\n${formData.message}\n\n` +
          `---\nSent from Can Saragih Portfolio Website`
      );

      const mailtoLink = `mailto:canwhardana@gmail.com?subject=${subject}&body=${body}`;
      window.open(mailtoLink, "_blank");

      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-black mb-2">Message Sent!</h3>
        <p className="text-gray-600 mb-6">
          Your email client should open shortly. Thank you for reaching out!
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="bg-black text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-gray-800"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-0 py-3 bg-transparent border-0 border-b-2 text-black placeholder-gray-500 focus:outline-none focus:ring-0 transition-all duration-300 ${
              errors.name
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-black"
            }`}
            placeholder="Your name"
          />
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.name}
            </motion.p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-0 py-3 bg-transparent border-0 border-b-2 text-black placeholder-gray-500 focus:outline-none focus:ring-0 transition-all duration-300 ${
              errors.email
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-black"
            }`}
            placeholder="Your email"
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.email}
            </motion.p>
          )}
        </div>

        {/* Subject Field */}
        <div>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className={`w-full px-0 py-3 bg-transparent border-0 border-b-2 text-black placeholder-gray-500 focus:outline-none focus:ring-0 transition-all duration-300 ${
              errors.subject
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-black"
            }`}
            placeholder="Subject"
          />
          {errors.subject && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.subject}
            </motion.p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleInputChange}
            className={`w-full px-0 py-3 bg-transparent border-0 border-b-2 text-black placeholder-gray-500 focus:outline-none focus:ring-0 transition-all duration-300 resize-none ${
              errors.message
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-black"
            }`}
            placeholder="Your Message"
          />
          {errors.message && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.message}
            </motion.p>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          className="bg-black text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Sending...
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Send
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
