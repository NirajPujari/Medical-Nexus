"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import Image from "next/image";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    access_key: "296f8672-e1f5-4573-a4e9-3431049f5c8a", // Replace with your actual access key
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required.";
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Valid 10-digit phone number is required.";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSuccessMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setSuccessMessage("Form submitted successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
          access_key: "YOUR_WEB3FORMS_ACCESS_KEY",
        });
      } else {
        setErrors({ form: "Something went wrong. Please try again." });
      }
    } catch (error) {
      console.error(error);
      setErrors({ form: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-lg bg-primary p-6 text-secondary shadow-md sm:p-8">
        <div className="relative mb-8 mt-[21rem] flex flex-col items-center text-center">
          <Image
            src="/images/background/contact.png"
            alt="Contact Background"
            width={1200}
            height={1200}
            className="absolute -top-[30rem]"
          />
          <Heart className="mx-auto h-12 w-12 text-[#C42021]" />
          <h1 className="mt-4 text-3xl font-bold">Contact Form</h1>
        </div>

        {successMessage && <p className="mb-4 text-green-500">{successMessage}</p>}
        {errors.form && <p className="mb-4 text-red-500">{errors.form}</p>}

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-secondary">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full rounded-lg border p-2 text-secondary focus:ring ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full rounded-lg border p-2 text-secondary focus:ring ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-lg border p-2 text-secondary focus:ring ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full rounded-lg border p-2 text-secondary focus:ring ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`min-h-[120px] w-full rounded-lg border p-2 text-secondary focus:ring ${
                errors.message ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className={`w-full rounded-lg py-2 text-primary transition ${
              isSubmitting ? "cursor-not-allowed bg-gray-400" : "bg-card hover:bg-highlight2"
            }`}
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Form →"}
          </button>
        </form>
      </div>
    </div>
  );
}
