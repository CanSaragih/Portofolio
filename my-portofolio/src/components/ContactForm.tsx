"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

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
  const [focusedField, setFocusedField] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField("");
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getBorderColor = (fieldName: string): string => {
    if (errors[fieldName as keyof FormErrors]) {
      return "border-red-600";
    }
    if (focusedField === fieldName) {
      return "border-black";
    }
    return "border-gray-300";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    const emailParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_name: "Can Saragih",
    };

    try {
      await toast.promise(
        emailjs.send(
          process.env.NEXT_PUBLIC_SERVICE_ID!,
          process.env.NEXT_PUBLIC_TEMPLATE_ID!,
          emailParams,
          process.env.NEXT_PUBLIC_PUBLIC_KEY!
        ),
        {
          loading: "Sending message...",
          success: () => (
            <span>
              Message sent successfully, <strong>{formData.name}</strong>!
            </span>
          ),
          error: "Failed to send message. Please try again.",
        }
      );

      // Reset form setelah sukses
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setErrors({});
    } catch (error) {
      console.error("EmailJS Error:", error);
      // error toast sudah ditangani oleh toast.promise
    } finally {
      setIsLoading(false);
    }
  };

  const copyEmailToClipboard = async () => {
    const email = "canwhardana@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
      toast.success("Email copied to clipboard!");
    } catch (error) {
      console.log(error);

      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      toast.success("Email copied to clipboard!");
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  return (
    <>
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="w-full max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <motion.div variants={fadeInUp} transition={{ delay: 0.1 }}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => handleFocus("name")}
              onBlur={handleBlur}
              disabled={isLoading}
              className={`w-full px-0 py-3 border-0 border-b-2 ${getBorderColor(
                "name"
              )} bg-transparent text-black placeholder-gray-500 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
              placeholder="Your name"
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-sm mt-1"
              >
                {errors.name}
              </motion.p>
            )}
          </motion.div>

          {/* Email Input */}
          <motion.div variants={fadeInUp} transition={{ delay: 0.2 }}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => handleFocus("email")}
              onBlur={handleBlur}
              disabled={isLoading}
              className={`w-full px-0 py-3 border-0 border-b-2 ${getBorderColor(
                "email"
              )} bg-transparent text-black placeholder-gray-500 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
              placeholder="Your email"
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-sm mt-1"
              >
                {errors.email}
              </motion.p>
            )}
          </motion.div>

          {/* Subject Input */}
          <motion.div variants={fadeInUp} transition={{ delay: 0.3 }}>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              onFocus={() => handleFocus("subject")}
              onBlur={handleBlur}
              disabled={isLoading}
              className={`w-full px-0 py-3 border-0 border-b-2 ${getBorderColor(
                "subject"
              )} bg-transparent text-black placeholder-gray-500 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
              placeholder="Subject"
            />
            {errors.subject && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-sm mt-1"
              >
                {errors.subject}
              </motion.p>
            )}
          </motion.div>

          {/* Message Textarea */}
          <motion.div variants={fadeInUp} transition={{ delay: 0.4 }}>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => handleFocus("message")}
              onBlur={handleBlur}
              disabled={isLoading}
              rows={5}
              className={`w-full px-0 py-3 border-0 border-b-2 ${getBorderColor(
                "message"
              )} bg-transparent text-black placeholder-gray-500 focus:outline-none transition-all duration-200 resize-none disabled:opacity-50 disabled:cursor-not-allowed`}
              placeholder="Your Message"
            />
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-sm mt-1"
              >
                {errors.message}
              </motion.p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={fadeInUp} transition={{ delay: 0.5 }}>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
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
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  Send
                </>
              )}
            </button>
          </motion.div>
        </form>

        {/* Copy Email Section */}
        <motion.div
          variants={fadeInUp}
          transition={{ delay: 0.6 }}
          className="mt-3 pt-6"
        >
          <div className="text-center flex items-center justify-center gap-2">
            <p className="text-sm text-gray-500">Click to copy email address</p>
            <button
              onClick={copyEmailToClipboard}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 group"
              aria-label="Copy email"
            >
              <svg
                className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
