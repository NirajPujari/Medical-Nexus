import Link from 'next/link';
import React from 'react';

const services = [
  { name: "General Consultation", description: "Our general practitioners offer expert care and consultation for a wide range of health concerns, ensuring a comprehensive health checkup." },
  { name: "Pediatrics", description: "Our pediatric specialists provide compassionate care for children, from routine checkups to more complex health needs, ensuring their well-being." },
  { name: "Cardiology", description: "Our cardiology department offers advanced diagnostic tests, treatment, and management of heart conditions, ensuring your heart health." },
  { name: "Orthopedics", description: "Our orthopedic specialists help treat and manage musculoskeletal conditions, including joint pain, fractures, and sports injuries." },
  { name: "Neurology", description: "Our neurologists provide care for patients with neurological disorders, including epilepsy, strokes, and migraines, focusing on advanced treatments." },
  { name: "Dermatology", description: "Our dermatology team specializes in diagnosing and treating skin conditions, offering both medical and cosmetic treatments for all ages." },
  { name: "Gastroenterology", description: "Our gastroenterology experts focus on the digestive system, diagnosing and treating conditions like IBS, ulcers, and liver diseases." },
  { name: "Psychiatry", description: "Our psychiatric services are dedicated to mental health, offering personalized care for conditions like anxiety, depression, and bipolar disorder." },
  { name: "Obstetrics & Gynecology", description: "Our obstetrics and gynecology team provides comprehensive care for women's health, including prenatal care, childbirth, and reproductive health." },
  { name: "Endocrinology", description: "Our endocrinologists provide specialized care for hormone-related conditions, including diabetes, thyroid issues, and metabolic disorders." },
  { name: "Pulmonology", description: "Our pulmonology department focuses on respiratory health, treating conditions such as asthma, COPD, and other lung diseases." },
  { name: "Rheumatology", description: "Our rheumatologists offer care for autoimmune and inflammatory conditions, including arthritis, lupus, and fibromyalgia." },
  { name: "Urology", description: "Our urology specialists focus on the urinary system and male reproductive health, treating conditions like kidney stones and prostate issues." },
  { name: "Ophthalmology", description: "Our ophthalmologists provide expert care for vision and eye health, from routine eye exams to the treatment of more serious conditions like cataracts." },
  { name: "ENT (Ear, Nose, and Throat)", description: "Our ENT specialists treat a wide range of ear, nose, and throat issues, including hearing problems, sinus conditions, and sleep apnea." },
  { name: "Dentistry", description: "Our dental team provides comprehensive dental care, including routine cleanings, cosmetic dentistry, and treatments for complex oral health issues." },
  { name: "Physiotherapy", description: "Our physiotherapists offer rehabilitation services, helping patients recover from injuries and surgeries with personalized exercise programs." },
  { name: "Radiology", description: "Our radiology department uses advanced imaging technology to diagnose conditions, including X-rays, CT scans, MRIs, and ultrasound." },
  { name: "Surgery", description: "Our surgical team provides both elective and emergency surgeries, ensuring the highest level of care and advanced techniques for optimal outcomes." },
  { name: "Emergency Services", description: "Our emergency department is equipped to handle medical emergencies 24/7, providing fast and effective care during critical situations." }
];

export default function ServicesPage() {
  return (
    <div className="px-4 py-8">
      <h1 className="text-4xl font-semibold text-center text-primary mb-10">Explore Our Hospital Services</h1>
      <p className="text-lg text-center text-foreground mb-12">
        At our hospital, we provide comprehensive healthcare services to meet all your needs. Our expert team is committed to providing high-quality care in various medical fields.
      </p>
      <div className='flex justify-center items-center'>
        <div className="max-w-screen-2xl flex flex-wrap justify-center items-center gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="max-w-sm bg-card p-6 rounded-lg shadow-lg transition-500 hover:scale-105 hover:shadow-xl"
            >
              <h2 className="text-2xl font-medium text-foreground mb-4">{service.name}</h2>
              <p className="text-sm text-foreground mb-4">
                {service.description}
              </p>
              <Link
                href="#"
                className="text-highlight1 font-semibold text-sm inline-block mt-4 transition-500 hover:text-highlight2"
              >
                Learn More &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-semibold text-primary mb-4">Why Choose Us?</h2>
        <p className="text-lg text-foreground max-w-3xl mx-auto">
          Our hospital offers advanced medical technology, compassionate care, and a multidisciplinary approach to health and wellness. Our doctors, nurses, and healthcare providers work together to ensure the best outcomes for our patients.
        </p>
      </div>
    </div>
  );
}
