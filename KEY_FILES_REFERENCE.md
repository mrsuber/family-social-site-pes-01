# KEY FILES REFERENCE GUIDE
## SuberCraftex & Family Social Site Project

---

## DOCUMENTATION FILES

### Master Vision Documents
- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/MASTER-MISSION-DOCUMENT.md`
  - Complete 30-year vision (2,061 lines)
  - All organizational structure, financial models, roadmaps
  - Mission Control platform documentation
  - Islamic governance framework

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/DEPLOYMENT_INSTRUCTIONS_MAY_2026.md`
  - Daily Timetable Card system setup
  - 11 Landmark goals for High Commander
  - Database migration instructions

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/RESTAURANT-MISSION-CONTROL-INTEGRATION.md`
  - Integration plan for restaurant operations into Mission Control
  - Restaurant data structures

---

## DATABASE MODELS (52 Total)

### Organizational Structure
- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/models/General.js`
  - 6 strategic divisions with objectives

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/models/Department.js`
  - Hierarchical departments under generals

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/models/Person.js`
  - All personnel: employees, contractors, family, investors
  - Performance ratings, relationship types, investment tracking

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/models/Project.js`
  - Strategic projects with timelines and budgets

### Leadership & Goals
- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/models/Landmark.js`
  - Goals with progress tracking, checklists, payments, photos

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/models/DailyTimetable.js`
  - Daily schedules with time blocks, adherence scoring

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/models/CommanderDiary.js`
  - Text/audio diary entries with mood tracking

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/models/BiographySection.js`
  - Biographical storytelling with sections and tags

### Financial
- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/models/IncomeStream.js`
  - Revenue tracking (active & target)

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/models/RecurringExpense.js`
  - Monthly/recurring costs with auto-calculated equivalents

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/models/PhysicalAsset.js`
  - Acquired & target assets with condition tracking

### Business Operations
- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/models/Restaurant.js`
  - Restaurant operations management

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/models/MenuItem.js`
  - Menu items with pricing

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/models/Recipe.js`
  - Food recipes with ingredients

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/models/InventoryItem.js`
  - Inventory tracking

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/models/Supplier.js`
  - Supplier management

### Learning Systems
- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/models/IslamicLesson.js`
  - Islamic education content

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/models/IslamicCourseModule.js`
  - Course organization

---

## CONTROLLERS (Backend Business Logic)

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/controllers/landmarkCtrl.js`
  - Goal/milestone CRUD operations

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/controllers/timetableCtrl.js`
  - Daily timetable management with weekday/weekend templates

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/controllers/restaurantCtrl.js`
  - Restaurant operations

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/controllers/missionControlCtrl.js`
  - Mission Control dashboard data aggregation

---

## API ROUTES

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/routes/landmarkRoutes.js`
  - GET/POST landmarks, progress tracking, payment status

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/routes/timetableRoutes.js`
  - GET/PUT daily timetables, time blocks, weekly views

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/routes/restaurantRoutes.js`
  - Restaurant CRUD and order management

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/routes/lifeOpsRoutes.js`
  - Daily operations, diary, calendar endpoints

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/routes/islamicCourseRoutes.js`
  - Islamic learning management system

---

## FRONTEND COMPONENTS

### Mission Control
- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/client/src/components/admin/missionControl/`
  - **MissionControlDashboard.jsx** - Main dashboard
  - **DailyTimetableCard.jsx** - Daily schedule visualization (RECENTLY UPDATED)
  - **FinancialDashboard.jsx** - Real-time financial overview
  - **CommanderDiary.jsx** - Diary entries
  - **CommanderCalendar.jsx** - Calendar events
  - **BiographyViewer.jsx** - Personal biography
  - **DailyOperations.jsx** - Daily operations overview
  - **LifeOperationsCanvas.jsx** - Life operations view

### Node Components
- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/client/src/components/admin/missionControl/nodes/`
  - GeneralNode.jsx
  - DepartmentNode.jsx
  - PersonNode.jsx
  - ProjectNode.jsx
  - RestaurantDetailModal.jsx

### Detail Modals
- **GeneralDetailModal.jsx** - Edit general information
- **DepartmentDetailModal.jsx** - Edit departments
- **PersonDetailModal.jsx** - Edit personnel
- **LandmarkDetailModal.jsx** - Edit goals
- **ProjectDetailModal.jsx** - Edit projects
- **AssetDetailModal.jsx** - Edit assets

---

## ADMIN PAGES

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/client/src/pages/admin/missionControl/`
  - Main admin dashboard area

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/client/src/pages/admin/home`
  - Dashboard homepage

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/client/src/pages/admin/restaurant`
  - Restaurant management interface

---

## SEED & MIGRATION SCRIPTS

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/seedMissionControl.js`
  - Seeds organizational structure, generals, departments

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/scripts/seedHighCommanderTimetable.js`
  - Creates daily timetable templates

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/scripts/createHighCommanderLandmarksComplete.js`
  - Creates 11 landmark goals for High Commander

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/migrations/`
  - Database migration files for all models

---

## SERVER & CONFIGURATION

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/server.js`
  - Express server setup with all route initialization

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/package.json`
  - Dependencies: Express, Sequelize, PostgreSQL, JWT, etc.

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/config/db.js`
  - Database connection and Sequelize configuration

---

## UTILITIES & HELPERS

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/middleware/auth.js`
  - JWT authentication middleware

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/utils/`
  - Frontend utility functions for API calls

---

## PROJECT STATUS FILES

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/.env`
  - Environment variables (database, ports, secrets)

- `/Users/camsoltechnology/dev/personal/family-social-site-pes-01/Procfile`
  - Heroku/deployment process file

---

## KEY STATISTICS

- **Total Models:** 52
- **Total Routes:** 15+ organized endpoint categories
- **Total Controllers:** 30+
- **Frontend Pages:** 9 admin pages + multiple sub-pages
- **Mission Control Components:** 20+ specialized components
- **Documentation:** 3,000+ lines across multiple files
- **Time Blocks (Daily):** 11 weekday blocks, 7 weekend blocks
- **Landmark Goals:** 11 for High Commander

---

## DEPLOYMENT INFO

**Current Deployment:**
- Server IP: 148.230.118.19
- Process Manager: PM2
- Reverse Proxy: Nginx
- OS: Ubuntu

**Environments:**
- Development: `npm start:dev` (nodemon)
- Production: `npm start` + `heroku-postbuild`

**Database:**
- PostgreSQL (primary)
- Sequelize ORM for Node.js

---

## QUICK START

1. **View the Vision:**
   ```
   cat /Users/camsoltechnology/dev/personal/family-social-site-pes-01/MASTER-MISSION-DOCUMENT.md
   ```

2. **Comprehensive Analysis:**
   ```
   cat /Users/camsoltechnology/dev/personal/family-social-site-pes-01/PROJECT_COMPREHENSIVE_ANALYSIS.md
   ```

3. **Understand the Database:**
   ```
   ls /Users/camsoltechnology/dev/personal/family-social-site-pes-01/models/
   ```

4. **See the Frontend:**
   ```
   ls /Users/camsoltechnology/dev/personal/family-social-site-pes-01/client/src/components/admin/missionControl/
   ```

5. **Check Financial Status:**
   - Open `/admin/missionControl` dashboard
   - View FinancialDashboard component

---

## CONTACT & MISSION

**Creator:** Mohamad Siysinyuy (High Commander and Chief)
**Email:** msiysinyuy@gmail.com
**Location:** Cameroon (Buea/Douala)

**Mission Control:** https://agent.subercraftex.com/admin/missionControl
**Website:** https://subercraftex.com

**Ultimate Goal:** Travel the stars through systematic capability building
**Timeline:** 30 years to first spacecraft launch (2050)
**Current Phase:** Foundation (Year 1-3 of 30)

