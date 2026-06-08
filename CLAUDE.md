@AGENTS.md
# Project Instructions for Diaspora Network Platform

This document outlines the complete instructions for developing the "Diaspora Network" web application. You must strictly adhere to these guidelines.

## 1. Project Overview

**Project Name:** Diaspora Network

**Goal:** Create a community-driven platform that helps Indonesian students and professionals abroad (diaspora) find projects, events, and connect with mentors.

**Target Users:**
- Students studying overseas.
- Professionals working internationally.
- Students and professionals in Indonesia seeking international exposure.
- Mentors looking to guide the next generation.

## 2. Core Features

### A. User Authentication & Profiles
- **Role-based System**: Students/Professionals (Seekers) and Mentors (Providers).
- **Profile Fields**:
  - **Seekers**: University, Major, Graduation Year, CV, Portfolio Link, Location (City/Country).
  - **Mentors**: Company, Position, Expertise Areas, Years of Experience, Availability Status.
- **Authentication**: Secure sign-up and login using **NextAuth.js** with Email/Password and Google OAuth.

### B. Event & Project Marketplace
- **Dual Listings**: The platform serves as a marketplace for two distinct types of opportunities:
  1. **Student Projects**: Capstone projects, thesis research collaborations, hackathons.
  2. **Professional Events**: Webinars, conferences, workshops, networking sessions.
- **Listing Details**:
  - Title, Category, Date/Time, Duration, Location (Physical or Virtual).
  - Description, Requirements, Target Audience.
  - Organizer Contact.

### C. Mentorship Matching
- **Matching Algorithm**: Simple keyword-based matching between Seeker interests and Mentor expertise.
- **Interaction**: Seekers can send "Connection Requests" to Mentors.
- **Scheduling**: Integrated calendar (or link to external tools like Calendly) to book mentorship sessions.

## 3. Technology Stack

### Frontend
- **Framework**: **Next.js 16** (App Router).
- **Language**: **TypeScript**.
- **Styling**: **Tailwind CSS**.
- **UI Components**: Use **Shadcn/ui** components.
- **Icons**: Lucide React.

### Backend & Database
- **Database**: **PostgreSQL**.
- **ORM**: **Prisma**.
- **Authentication**: **NextAuth.js**.
- **Backend Logic**: TypeScript functions within Next.js API Routes or Server Actions.

## 4. Database Schema (Prisma)

Create the following Prisma models:

```prisma
model User {
  id          String   @id @default(cuid())
  email       String   @unique
  name        String?
  avatar      String?
  role        Role
  profile     Profile?
  connections Connection[]
  events      Event[] // Events organized by user
  bookings    Booking[] // Mentorship bookings
}

enum Role {
  STUDENT
  PROFESSIONAL
  MENTOR
}

model Profile {
  id        String @id @default(cuid())
  userId    String @unique
  user      User   @relation(fields: [userId], references: [id])
  
  // Seeker Fields
  university String?
  major      String?
  graduationDate DateTime?
  
  // Mentor Fields
  company    String?
  position   String?
  expertise  String[] // Tags: "AI", "Finance", "Product Management"
  
  cvUrl      String? // Link to CV/Resume
  portfolioUrl String? // Link to Portfolio/LinkedIn
}

model Event {
  id          String   @id @default(cuid())
  title       String
  description String
  category    String // e.g., "Hackathon", "Webinar"
  dateTime    DateTime
  location    String // "Virtual" or "University Name"
  duration    String // "3 hours"
  
  organizerId String
  organizer   User     @relation(fields: [organizerId], references: [id])
  
  // For Projects: Who is seeking help?
  seekerId    String?
  seeker      User?    @relation("SeekerEvents", fields: [seekerId], references: [id])
  
  bookings    Booking[]
}

model Booking {
  id        String   @id @default(cuid())
  eventId   String
  event     Event    @relation(fields: [eventId], references: [id])
  
  seekerId  String
  seeker    User     @relation(fields: [seekerId], references: [id])
  
  mentorId  String
  mentor    User     @relation(fields: [mentorId], references: [id])
  
  status    BookingStatus @default(PENDING)
  scheduledAt DateTime
}

enum BookingStatus {
  PENDING
  CONFIRMED
  COMPLETED
  CANCELLED
}
```

## 5. UI/UX Design Guidelines

- **Color Palette**:
  - **Primary**: Navy Blue (#0F172A)
  - **Secondary**: Gold/Yellow (#FBBF24)
  - **Accent**: White/Light Gray (#F8FAFC)

- **Layout**:
  - **Navbar**: Clean, sticky header with Logo, "Discover", "Events", "Mentors", and Auth buttons.
  - **Homepage**: Hero section with value proposition, followed by featured events and projects.
  - **Dashboard**: Personalized views for Seekers (My Events, Bookings) and Mentors (My Calendar, Connection Requests).

- **Responsiveness**: Mobile-first approach. Must look perfect on phones, tablets, and desktops.

## 6. Development Steps

1. **Setup Project**:
   - `npx create-next-app@latest diaspora-network --typescript --tailwind --app`
   - Install Prisma: `bun add prisma` and `bun add @prisma/client`.
   - Install Shadcn/ui components as needed.

2. **Database Configuration**:
   - Configure `prisma/schema.prisma` with the models defined in Section 4.
   - Run `npx prisma db push` to create tables.

3. **Authentication**:
   - Set up NextAuth.js in `app/api/auth/[...nextauth]/route.ts`.
   - Implement routes: `/login`, `/signup`.
   - Add `SessionProvider` in `app/layout.tsx`.

4. **Build Pages**:
   - **Homepage (`/`)**: Hero, Featured Content.
   - **Event Marketplace (`/events`)**: List view with filters.
   - **Event Details (`/events/[id]`)**:
     - Display event info.
     - For Seekers: "Join Event" (or link out).
     - For Mentors: "Host Event".
   - **Mentorship (`/mentors`)**:
     - List of mentors with expertise tags.
     - Clicking a mentor opens `MentorProfile.tsx`.
   - **Profile Pages (`/profile/[id]`)**:
     - Display user info, CV/Portfolio links, expertise.

5. **Implement Features**:
   - **Booking**: Allow Seekers to book sessions with Mentors.
   - **Matching**: Simple logic to suggest mentors based on keywords.

## 7. Code Quality Rules

- **TypeScript**: Use strict typing. Avoid `any`.
- **Server Components**: Use Server Components by default for better performance.
- **Client Components**: Use "use client" only when necessary (interactivity, hooks).
- **Modular Code**: Break down pages into smaller components in the `components/` directory.
- **Styling**: Keep styles consistent with the Tailwind/Shadcn theme.

## 8. Submission

Once development is complete, provide:
1. The full codebase.
2. A brief video demo of the working application.
3. Instructions on how to run the project locally.

Begin development immediately.
