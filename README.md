# Bankai Beats

A Centralized Event Portal for Asian Sub-culture Communities

Bankai Beats is a web-based platform developed for Dellusion Entertainment. The platform serves as the centralized digital interface for Asian-themed events, providing a streamlined hub for event discovery, community communication, and registration for attendees.

## Project Objective

The platform serves the logistical and communication needs of Dellusion Entertainment's event operations. It provides:

- Centralized Information: A single hub for event schedules, festival details and community announcements.

- Streamlined Interaction: Efficient registration and inquiry workflows for attendees

- Operational Efficiency: A "Write-ONly" data integration pattern that enables the Dellusion Entertainment team to manage event content and process attendee data using standard spreadsheet tools, eliminating the need for complex, resource-intensive administration dashboards.

## Technical Infrastructure

Built with a focused, high-performance tech stack:

- Framework: React 19/VIte
- Styling: Tailwind CSS (v4)
- Components: Shadcn/UI
- Type Safety: TypeScript
- Backend Ingestion: Optimized API routes for data transmission to Google Sheets.
- Deployment: Automateed CI/CD pipeline via Vercel.

## Architecture and Design Pattern

The application utilizes a Decoupled Data Ingestion Pattern to support internal operational workflows.

- Frontend: A performance-optimized client interface.
-Persistance Layer: Google Sheets serves as the administrative backend for Dellusion Entertainemnt, allowing event coordinators to process registrations and inquiries directly.
- Validation Layer: A two-tier validation framework (Client-side & Server-side) ensures data integrity and sanitization before records are written to the backend.

## Getting Started

### Prequisites
- Node.js (LTS version recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/zealborgium-bankai-beats.git
2. Install dependencies:
   ```bash
   npm install
3. Run in development mode:
   ```bash
   npm run dev

## Future Scope

- Relational Database Migration: Modular design allows for future transition to a relational database (e.g., PostgreSQL/Supbase) to support read-heavy operations or authenicated user profiles for Dellusion Entertainment attendes.

- Community Engagement Modules: Potential integration of community-driven content feeds to complement the existing event-discovery functionality.

## Author

Jeel Shah