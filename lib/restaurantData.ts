export const restaurantInfo = {
  name: "Gra Pow",
  location: {
    address: "497 E Alessandro Blvd #D, Riverside, CA 92508",
    googleMapsUrl: "https://goo.gl/maps/...",
    directions: "Located in the Mission Grove Shopping Center, near the movie theater."
  },
  contact: {
    phone: "(951) 780-1132",
    email: "info@grapow.net" // Placeholder
  },
  hours: {
    "Mon-Thu": "11:00 AM - 9:00 PM",
    "Fri-Sat": "11:00 AM - 10:00 PM",
    "Sun": "11:00 AM - 9:00 PM"
  },
  happyHour: {
    details: "Daily 3pm - 6pm. $5 Drafts, $8 Signature Cocktails, Half-off selected appetizers.",
    location: "Bar and Patio only"
  },
  policies: {
    reservations: "Recommended for groups of 6+. Walk-ins welcome.",
    dressCode: "Casual / Smart Casual",
    payments: "Cash, Visa, MasterCard, Amex, Apple Pay"
  }
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'bot';
  content: string;
  type?: 'text' | 'reservation-form' | 'options';
  options?: string[];
};

export const initialMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'bot',
    content: "Sawasdee! 🙏 Welcome to Gra Pow. I'm your virtual host. How can I help you today?",
    type: 'options',
    options: ["📅 Make a Reservation", "🕒 View Hours", "📍 Directions", "🍹 Happy Hour Info"]
  }
];
