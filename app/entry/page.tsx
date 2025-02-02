"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";

export default function EntryForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    bloodGroup: "",
    medicalHistory: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim())
      newErrors.lastName = "Last name is required.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email.";
    if (
      !formData.age.trim() ||
      isNaN(Number(formData.age)) ||
      Number(formData.age) <= 0
    )
      newErrors.age = "Enter a valid age.";
    if (!formData.bloodGroup.trim())
      newErrors.bloodGroup = "Blood group is required.";
    if (!formData.medicalHistory.trim())
      newErrors.medicalHistory = "Medical history is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     setIsSubmitting(true);
  //     console.log("Form Submitted:", formData);
  //   }
  // };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (validateForm()) {
        setIsSubmitting(true);
        setTimeout(() => {
          setIsSubmitting(false);
          alert("Form submitted successfully!");
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            age: "",
            bloodGroup: "",
            medicalHistory: "",
          });
        }, 2000);
        router.replace("/")
      }
    },
    [formData],
  );

  return (
    <div className="flex min-h-screen items-center justify-center p-10">
      <div className="w-full max-w-4xl rounded-lg bg-primary p-6 text-secondary shadow-md sm:p-8">
        {/* Header */}
        <div className="relative mb-8 mt-[21rem] flex flex-col items-center text-center">
          <Image
            src="/images/background/contact.png"
            alt="Contact Background"
            width={1200}
            height={1200}
            className="absolute -top-[30rem]"
          />
          <Heart className="mx-auto h-12 w-12 text-[#C42021]" />
          <h1 className="mt-4 text-3xl font-bold">Additional Data</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 text-highlight1">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-secondary">
                First Name
              </label>
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
              {errors.firstName && (
                <p className="text-xs text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-secondary">
                Last Name
              </label>
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
              {errors.lastName && (
                <p className="text-xs text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary">
              Email
            </label>
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
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-secondary">
                Age
              </label>
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className={`w-full appearance-none rounded-lg border p-2 text-secondary focus:ring ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                pattern="[0-9]*"
                inputMode="numeric"
              />
              {errors.age && (
                <p className="text-sm text-red-500">{errors.age}</p>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-secondary">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full rounded-lg border bg-white p-2 text-secondary focus:ring"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
              {errors.bloodGroup && (
                <p className="text-sm text-red-500">{errors.bloodGroup}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary">
              Medical History
            </label>
            <textarea
              name="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleChange}
              rows={3}
              className={`min-h-[120px] w-full rounded-lg border p-2 text-secondary focus:ring ${
                errors.message ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {errors.message && (
              <p className="text-xs text-red-500">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full rounded-lg py-2 text-primary transition ${
              isSubmitting
                ? "cursor-not-allowed bg-gray-400"
                : "bg-card hover:bg-highlight2"
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
