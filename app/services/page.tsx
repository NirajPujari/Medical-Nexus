"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
interface Service {
  name: string;
  description: string;
  details: string;
  staff: number;
  patients: number;
  rating: number;
  reviews: string;
}

const services:Service[] = [
  { name: "General Consultation", description: "Our general practitioners offer expert care and consultation for a wide range of health concerns, ensuring a comprehensive health checkup.", details: "General Consultation includes preventive health screenings, expert diagnosis, and personalized health recommendations.", staff: 15, patients: 1200, rating: 4.8, reviews: "Excellent service and very professional staff." },
  { name: "Pediatrics", description: "Our pediatric specialists provide compassionate care for children, from routine checkups to more complex health needs, ensuring their well-being.", details: "Comprehensive pediatric care including vaccinations, growth monitoring, and developmental assessments.", staff: 12, patients: 900, rating: 4.7, reviews: "Great care for kids, very friendly doctors." },
  { name: "Cardiology", description: "Our cardiology department offers advanced diagnostic tests, treatment, and management of heart conditions, ensuring your heart health.", details: "Heart health services including ECG, echocardiograms, and heart disease management.", staff: 18, patients: 800, rating: 4.9, reviews: "Highly skilled cardiologists and excellent facilities." },
  { name: "Orthopedics", description: "Our orthopedic specialists help treat and manage musculoskeletal conditions, including joint pain, fractures, and sports injuries.", details: "Advanced orthopedic care including joint replacement, fracture treatment, and sports injury rehabilitation.", staff: 10, patients: 750, rating: 4.6, reviews: "Very effective treatments and caring staff." },
  { name: "Neurology", description: "Our neurologists provide care for patients with neurological disorders, including epilepsy, strokes, and migraines, focusing on advanced treatments.", details: "Expert neurological evaluations, stroke management, and migraine treatment plans.", staff: 14, patients: 600, rating: 4.8, reviews: "Exceptional neurological care and modern treatments." },
  { name: "Dermatology", description: "Our dermatology team specializes in diagnosing and treating skin conditions, offering both medical and cosmetic treatments for all ages.", details: "Skin health services including acne treatment, skin cancer screening, and cosmetic dermatology.", staff: 8, patients: 700, rating: 4.5, reviews: "Great dermatologists and effective treatments." },
  { name: "Gastroenterology", description: "Our gastroenterology experts focus on the digestive system, diagnosing and treating conditions like IBS, ulcers, and liver diseases.", details: "Comprehensive digestive health services including endoscopy and liver function tests.", staff: 9, patients: 650, rating: 4.7, reviews: "Knowledgeable specialists and excellent care." },
  { name: "Psychiatry", description: "Our psychiatric services are dedicated to mental health, offering personalized care for conditions like anxiety, depression, and bipolar disorder.", details: "Mental health support including therapy, medication management, and crisis intervention.", staff: 11, patients: 550, rating: 4.8, reviews: "Compassionate and understanding doctors." },
  { name: "Obstetrics & Gynecology", description: "Our obstetrics and gynecology team provides comprehensive care for women's health, including prenatal care, childbirth, and reproductive health.", details: "Women's health services including pregnancy care, menopause management, and fertility treatments.", staff: 16, patients: 900, rating: 4.9, reviews: "Highly recommended for women's health needs." },
  { name: "Endocrinology", description: "Our endocrinologists provide specialized care for hormone-related conditions, including diabetes, thyroid issues, and metabolic disorders.", details: "Hormone health management including diabetes care, thyroid treatment, and metabolic disorder therapies.", staff: 7, patients: 500, rating: 4.6, reviews: "Excellent treatment plans and supportive care." },
  { name: "Pulmonology", description: "Our pulmonology department focuses on respiratory health, treating conditions such as asthma, COPD, and other lung diseases.", details: "Advanced respiratory treatments including pulmonary function tests and oxygen therapy.", staff: 9, patients: 580, rating: 4.7, reviews: "Expert pulmonologists and great facilities." },
  { name: "Rheumatology", description: "Our rheumatologists offer care for autoimmune and inflammatory conditions, including arthritis, lupus, and fibromyalgia.", details: "Autoimmune disease management including arthritis treatment and pain relief therapies.", staff: 6, patients: 400, rating: 4.5, reviews: "Specialists who truly care about patient health." },
  { name: "Urology", description: "Our urology specialists focus on the urinary system and male reproductive health, treating conditions like kidney stones and prostate issues.", details: "Urological care including kidney stone management, prostate exams, and bladder treatments.", staff: 8, patients: 450, rating: 4.6, reviews: "Professional and highly skilled team." },
  { name: "Ophthalmology", description: "Our ophthalmologists provide expert care for vision and eye health, from routine eye exams to the treatment of more serious conditions like cataracts.", details: "Eye care services including vision correction, cataract surgery, and glaucoma treatment.", staff: 10, patients: 700, rating: 4.8, reviews: "Very thorough and professional eye care." },
  { name: "ENT (Ear, Nose, and Throat)", description: "Our ENT specialists treat a wide range of ear, nose, and throat issues, including hearing problems, sinus conditions, and sleep apnea.", details: "ENT services including allergy treatments, hearing aids, and sinus surgeries.", staff: 9, patients: 600, rating: 4.7, reviews: "Great doctors and effective treatments." },
  { name: "Dentistry", description: "Our dental team provides comprehensive dental care, including routine cleanings, cosmetic dentistry, and treatments for complex oral health issues.", details: "Dental services including orthodontics, implants, and preventive dentistry.", staff: 12, patients: 800, rating: 4.8, reviews: "Gentle and professional dental care." },
  { name: "Physiotherapy", description: "Our physiotherapists offer rehabilitation services, helping patients recover from injuries and surgeries with personalized exercise programs.", details: "Rehabilitation programs including post-surgery recovery and sports therapy.", staff: 10, patients: 500, rating: 4.7, reviews: "Helpful and effective rehabilitation sessions." },
  { name: "Radiology", description: "Our radiology department uses advanced imaging technology to diagnose conditions, including X-rays, CT scans, MRIs, and ultrasound.", details: "State-of-the-art imaging services including MRIs, CT scans, and ultrasounds.", staff: 14, patients: 900, rating: 4.9, reviews: "Accurate diagnostics and top-notch equipment." },
  { name: "Surgery", description: "Our surgical team provides both elective and emergency surgeries, ensuring the highest level of care and advanced techniques for optimal outcomes.", details: "Surgical services including minimally invasive procedures and major surgeries.", staff: 20, patients: 750, rating: 4.8, reviews: "Highly skilled surgeons and excellent care." },
  { name: "Emergency Services", description: "Our emergency department is equipped to handle medical emergencies 24/7, providing fast and effective care during critical situations.", details: "24/7 emergency care including trauma management and urgent medical attention.", staff: 25, patients: 1500, rating: 4.9, reviews: "Fast response and life-saving medical care." }
];;

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <div className="px-4 py-8 overflow-hidden relative min-h-screen flex flex-col">
      <h1 className="text-4xl font-semibold text-primary mb-10 text-center">Explore Our Hospital Services</h1>
      <p className="text-lg text-foreground mb-12 max-w-3xl mx-auto text-center">
        At our hospital, we provide comprehensive healthcare services to meet all your needs. Our expert team is committed to providing high-quality care in various medical fields.
      </p>
      {!selectedService ? (
        <div className="text-center w-full">
          <div className="relative w-full flex justify-center items-center">
            <motion.div
              className="max-w-screen-2xl flex flex-wrap justify-center items-center gap-8 transition-all duration-500"
              animate={{ x: selectedService ? "-150%" : "0%" }}
            >
              {services.map((service, index) => (
                <div key={index} className="max-w-sm bg-card p-6 rounded-lg shadow-lg transition-500 hover:scale-105 hover:shadow-xl">
                  <h2 className="text-2xl font-medium text-foreground mb-4">{service.name}</h2>
                  <p className="text-sm text-foreground mb-4">{service.description}</p>
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-highlight1 font-semibold text-sm inline-block mt-4 transition-500 hover:text-highlight2"
                  >
                    Learn More &rarr;
                  </button>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "100%" }}
          className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center rounded-lg"
        >
          <h2 className="text-5xl font-bold text-primary mb-6">{selectedService.name}</h2>
          <p className="text-lg text-foreground max-w-3xl mb-6">{selectedService.details}</p>
          <div className="text-xl text-highlight1 space-y-4 bg-card p-6 rounded-lg shadow-md">
            <p>👨‍⚕️ <span className="font-semibold">Staff:</span> {selectedService.staff}</p>
            <p>🏥 <span className="font-semibold">Patients Treated:</span> {selectedService.patients}</p>
            <p>⭐ <span className="font-semibold">Rating:</span> {selectedService.rating}/5</p>
            <p className="italic">🗣️ "{selectedService.reviews}"</p>
          </div>
          <button
            onClick={() => setSelectedService(null)}
            className="mt-6 px-8 py-3 bg-card text-highlight1 font-semibold rounded-lg text-lg transition-500 hover:bg-highlight2 shadow-md"
          >
            &larr; Back
          </button>
        </motion.div>
      )}
    </div>
  );
}
