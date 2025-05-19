
export type UserRole = "manager" | "resident";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  unitNumber?: string;
  avatarUrl?: string;
}

export interface Unit {
  id: string;
  number: string;
  owner: string;
  ownerId?: string;
  residents: number;
  isOccupied: boolean;
}

export interface Fee {
  id: string;
  unitId: string;
  unitNumber: string;
  description: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending";
  paymentDate?: string;
  receiptUrl?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdBy: string;
  createdById: string;
  createdAt: string;
  attachmentUrl?: string;
  important?: boolean;
}

export interface CommonArea {
  id: string;
  name: string;
  description?: string;
  rules?: string;
  availableTimeStart: string;
  availableTimeEnd: string;
  imageUrl?: string;
}

export interface Reservation {
  id: string;
  areaId: string;
  areaName: string;
  unitNumber: string;
  residentId: string;
  residentName: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  status: "pending" | "approved" | "rejected";
  reason?: string;
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  unitNumber: string;
  residentId: string;
  residentName: string;
  createdAt: string;
  status: "pending" | "in-progress" | "resolved";
  response?: string;
  responseDate?: string;
}
