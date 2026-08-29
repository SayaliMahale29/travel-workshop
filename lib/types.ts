export type SiteContent = {
  siteName: string;
  title: string;
  tagline: string;
  creator: {
    name: string;
    intro: string;
    voiceSection: string;
    social: { youtube: string; instagram: string };
  };
  workshop: {
    dates: string;
    time: string;
    duration: string;
    mode: string;
    seats: string;
    originalPrice: number;
    price: number;
    currency: string;
    registrationOpen: boolean;
    joinDetails: string;
    day1: WorkshopDay;
    day2: WorkshopDay;
  };
  privacy: {
    refundPolicy: string;
    contactEmail: string;
  };
};

export type WorkshopDay = {
  title: string;
  sections: {
    title: string;
    subtitle?: string;
    items: string[];
  }[];
};

export type Registration = {
  id: string;
  name: string;
  email: string;
  phone: string;
  age?: string;
  location?: string;
  socialLink?: string;
  experience?: string;
  biggestChallenge?: string;
  learningGoal?: string;
  favoriteAkashContent?: string;
  transactionId?: string;
  paymentScreenshotPath?: string;
  paymentScreenshotType?: string;
  amount: number;
  currency: string;
  status: "pending" | "submitted" | "paid" | "failed";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt: string;
  paidAt?: string;
};
