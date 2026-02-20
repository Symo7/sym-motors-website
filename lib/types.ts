export type KenyaLocation = "Nairobi" | "Nakuru" | "Kisii" | "Kisumu";

export type CarStatus = "Available" | "Sold" | "Reserved";
export type HireStatus = "Available" | "Rented";
export type DriveMode = "Self-Drive" | "Chauffeured" | "Both";

export interface SaleCar {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  engine_cc: number;
  fuel: string;
  transmission: string;
  mileage_km: number;
  price_kes: number;
  negotiable: boolean;
  location: KenyaLocation;
  description: string;
  features: string[];
  photos: string[];
  status: CarStatus;
  slug: string;
  is_featured: boolean;
  created_at: string;
}

export interface HireCar {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  daily_price_kes: number;
  weekly_price_kes: number | null;
  deposit_policy_text: string;
  drive_mode: DriveMode;
  location: KenyaLocation;
  status: HireStatus;
  features: string[];
  photos: string[];
  slug: string;
  is_featured: boolean;
  created_at: string;
}
