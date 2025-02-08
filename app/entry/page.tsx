"use client";

import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

export default function EntryForm() {
  const { user,isSignedIn } = useUser();
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    bloodGroup: "",
    medicalHistory: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user?.emailAddresses?.length) {
      setFormData((prev) => ({
        ...prev,
        email: user.emailAddresses[0]?.emailAddress || "",
      }));
    }
  }, [user]);
  
  useEffect(() => {
    if (isSignedIn) {
      router.back()
    }
  }, [isSignedIn]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!validateForm()) return;

      setIsSubmitting(true);
      try {
        const response = await fetch("/api/patient", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: `${formData.firstName} ${formData.lastName}`,
            age: Number(formData.age),
            bloodGroup: formData.bloodGroup,
            medicalHistory: formData.medicalHistory,
          }),
        });

        if (!response.ok) throw new Error("Failed to submit form.");

        const data = await response.json();
        await user?.update({
          unsafeMetadata: { isNewUser: false, clientId: data.id },
        });

        await fetch("/api/mongo/patient", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: `${formData.firstName} ${formData.lastName}`,
            id: data.id,
            email: formData.email,
          }),
        });

        router.replace("/");
      } catch (error) {
        console.error(error);
        alert("Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: user?.emailAddresses?.[0]?.emailAddress || "",
          age: "",
          bloodGroup: "",
          medicalHistory: "",
        });
      }
    },
    [formData, user, router],
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
          {/* First Name & Last Name */}
          <div className="flex gap-4">
            {["firstName", "lastName"].map((field) => (
              <div key={field} className="flex-1">
                <label className="block text-sm font-medium text-secondary">
                  {field === "firstName" ? "First Name" : "Last Name"}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className={`w-full rounded-lg border p-2 text-secondary focus:ring ${
                    errors[field] ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                />
                {errors[field] && (
                  <p className="text-xs text-red-500">{errors[field]}</p>
                )}
              </div>
            ))}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-secondary">
              Email
            </label>
            <input
              type="email"
              name="email"
              disabled
              value={formData.email}
              className="w-full cursor-not-allowed rounded-lg border bg-gray-100 p-2 text-secondary"
            />
          </div>

          {/* Age & Blood Group */}
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
                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                  (group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ),
                )}
              </select>
              {errors.bloodGroup && (
                <p className="text-xs text-red-500">{errors.bloodGroup}</p>
              )}
            </div>
          </div>

          {/* Medical History */}
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
                errors.medicalHistory ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {errors.medicalHistory && (
              <p className="text-xs text-red-500">{errors.medicalHistory}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full rounded-lg py-2 transition ${
              isSubmitting
                ? "cursor-not-allowed bg-gray-400"
                : "bg-card hover:bg-highlight2"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Form →"}
          </button>
        </form>
      </div>
    </div>
  );
}
