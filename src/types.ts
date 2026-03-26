/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type BusinessCategory = 'Restaurant' | 'School' | 'Hospital' | 'General' | 'Custom';

export interface BusinessResource {
  label: string;
  total: number;
  available: number;
}

export interface Table {
  id: string;
  number: string;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved';
}

export interface Room {
  id: string;
  name: string;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved';
}

export interface Menu {
  id: string;
  name: string;
  type: 'pdf' | 'excel' | 'word' | 'jpg';
  url: string;
  uploadedAt: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  joinedAt: string;
}

export interface BusinessConfig {
  name: string;
  category: BusinessCategory;
  description: string;
  services: string[];
  hours: string;
  contactEmail: string;
  contactPhone: string;
  faq: { question: string; answer: string }[];
  resources: BusinessResource[];
  tables?: Table[];
  rooms?: Room[];
  menus?: Menu[];
  staff?: Staff[];
}

export const DEFAULT_CONFIG: BusinessConfig = {
  name: "Maya's Restaurant",
  category: 'Restaurant',
  description: "A cozy restaurant serving authentic Nepali and international cuisine with a warm 'Namaste' greeting.",
  services: ["Table Reservations", "Menu Guidance", "Special Event Booking", "Home Delivery"],
  hours: "Sunday - Saturday, 10:00 AM - 10:00 PM",
  contactEmail: "reservations@mayarestaurant.com",
  contactPhone: "+977 1-4444444",
  faq: [
    { question: "What are your specialties?", answer: "We specialize in authentic Thakali sets, MoMo, and Newari khaja sets." },
    { question: "Do you have parking?", answer: "Yes, we have free parking for our customers." },
    { question: "Can I book a table for a large group?", answer: "Yes, we handle large group bookings and private events. Please call us to discuss your requirements." }
  ],
  resources: [
    { label: "Tables", total: 20, available: 5 },
    { label: "Private Cabins", total: 4, available: 1 }
  ]
};

export const CATEGORY_TEMPLATES: Record<BusinessCategory, Partial<BusinessConfig>> = {
  Restaurant: {
    description: "A cozy restaurant serving authentic Nepali and international cuisine.",
    services: ["Dine-in", "Takeaway", "Home Delivery", "Table Reservations"],
    faq: [
      { question: "What are your specialties?", answer: "We specialize in Thakali sets, MoMo, and Newari khaja sets." },
      { question: "Do you have parking?", answer: "Yes, we have free parking for our customers." }
    ],
    resources: [
      { label: "Tables", total: 20, available: 5 },
      { label: "Private Cabins", total: 4, available: 1 }
    ]
  },
  School: {
    description: "An educational institution committed to academic excellence and holistic development.",
    services: ["Primary Education", "Secondary Education", "Extracurricular Activities", "Library Services"],
    faq: [
      { question: "What is the admission process?", answer: "Admissions are open for the new academic session. Please visit our office for an entrance test." },
      { question: "Do you provide transportation?", answer: "Yes, we have school bus services across the city." }
    ],
    resources: [
      { label: "Classrooms", total: 15, available: 2 },
      { label: "Lab Seats", total: 30, available: 10 }
    ]
  },
  Hospital: {
    description: "A multi-specialty healthcare facility providing quality medical services.",
    services: ["Emergency Care", "OPD Services", "Diagnostic Lab", "Pharmacy", "In-patient Care"],
    faq: [
      { question: "How do I book an appointment with a specialist?", answer: "You can book via our reception desk or call our appointment line." },
      { question: "Is the emergency room open 24/7?", answer: "Yes, our emergency services are available 24 hours a day, 7 days a week." }
    ],
    resources: [
      { label: "ICU Beds", total: 10, available: 2 },
      { label: "General Ward Beds", total: 50, available: 15 },
      { label: "Operation Theaters", total: 3, available: 1 }
    ]
  },
  General: {
    description: "A professional business providing high-quality services.",
    services: ["Consultation", "Customer Support"],
    faq: []
  },
  Custom: {
    description: "",
    services: [],
    faq: []
  }
};
