require('dotenv').config();
const { sequelize } = require('../config/db');
const Landmark = require('../models/Landmark');
const Person = require('../models/Person');

async function createHighCommanderLandmarks() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected\n');

    // Find the High Commander
    const highCommander = await Person.findOne({
      where: { relationshipType: 'high_commander' }
    });

    if (!highCommander) {
      console.error('❌ High Commander not found.');
      process.exit(1);
    }

    console.log(`📍 Creating comprehensive landmark system for: ${highCommander.fullName}\n`);

    // Delete existing landmarks for High Commander to start fresh
    const existingCount = await Landmark.count({
      where: { personId: highCommander.id }
    });

    if (existingCount > 0) {
      console.log(`🗑️  Found ${existingCount} existing landmarks. Keeping them and adding new ones...\n`);
    }

    const landmarks = [
      // LANDMARK 1: Samsung S23 & Video Equipment (CRITICAL BLOCKER)
      {
        title: 'Acquire Samsung S23 & Professional Video Equipment - CRITICAL BLOCKER',
        description: `**THE CRITICAL BLOCKER FOR ALL REVENUE GENERATION**

Purchase fairly used Samsung S23 smartphone with excellent camera quality, professional microphone, ring light, and lighting equipment. This equipment is THE bottleneck preventing:
- Filming curriculum tutorials
- Apprentice recruitment marketing
- Revenue Line 1 (apprenticeship fees)
- Revenue Line 2 (content monetization)
- Social media content creation

**FUNDING PLAN (EXTREME MEASURES):**
- 70K saved → Rent payment
- 250K from May salary → Buy equipment (ALL OF IT)
- 50K remaining → Food for the month
- Light & Internet bills → Will borrow
- Transport → Walk or borrow
- **Status: BROKE for 1 month, but EQUIPPED to unlock revenue**

**Equipment Breakdown:**
- Samsung S23 (fairly used): ~150K XAF
- Professional microphone: ~40K XAF
- Ring light: ~30K XAF
- Additional lighting: ~30K XAF
- **Total: 250K XAF**

Once acquired, this unlocks EVERYTHING:
→ Film embroidery motor installation
→ Film curriculum tutorials
→ Attract apprentices
→ Build YouTube presence
→ Generate 800K/month revenue target`,
        personId: highCommander.id,
        generalId: null,
        startDate: new Date('2026-05-03T00:00:00Z'),
        endDate: new Date('2026-05-31T23:59:59Z'),
        amount: 250000,
        currency: 'XAF',
        paymentStatus: 'pending',
        amountPaid: 0,
        status: 'pending',
        priority: 'critical',
        progress: 0,
        category: 'Content Creation Equipment',
        tags: ['samsung-s23', 'video-equipment', 'microphone', 'ring-light', 'revenue-blocker', 'critical', 'extreme-measures'],
        notes: 'CRITICAL BLOCKER. Without this, no revenue generation possible. Extreme measures: 250K from May salary, broke for 1 month, borrow for utilities. But this unlocks 800K/month potential.',
        checklist: [
          { id: 1, text: 'Secure 250K from May payment (ALL IN)', completed: false },
          { id: 2, text: 'Research Samsung S23 market prices and sellers', completed: false },
          { id: 3, text: 'Inspect Samsung S23 (battery, camera, screen, IMEI)', completed: false },
          { id: 4, text: 'Purchase Samsung S23', completed: false },
          { id: 5, text: 'Research and purchase professional microphone', completed: false },
          { id: 6, text: 'Purchase ring light', completed: false },
          { id: 7, text: 'Purchase additional lighting equipment', completed: false },
          { id: 8, text: 'Test all equipment together', completed: false },
          { id: 9, text: 'Set up video recording workspace', completed: false },
          { id: 10, text: 'Borrow money for light & internet bills', completed: false },
          { id: 11, text: 'Survive 1 month of extreme measures', completed: false },
          { id: 12, text: 'Film first test video (embroidery motor installation)', completed: false }
        ],
        reminderDays: 3
      },

      // LANDMARK 2: Install & Test Embroidery Motor (FILMED)
      {
        title: 'Install & Test Embroidery Motor - FILMED FOR SOCIAL MEDIA',
        description: `**FIRST VIDEO CONTENT + OPERATIONAL MACHINE**

Install the fixed embroidery motor and test the embroidery machine. Film the ENTIRE process for social media publication.

**Why Film This:**
- Proof of expertise (workshop setup, technical skills)
- Content for YouTube/TikTok
- Shows premium equipment capability
- Demonstrates problem-solving process
- Attracts tailoring apprentices
- Shows SuberCraftex workshop reality

**Video Series Name:** "Workshop Essentials | Installing Industrial Embroidery Motor"

**Video Structure:**
1. Introduction: The problem (motor was broken)
2. Parts and tools needed
3. Installation process (step-by-step)
4. Electrical connections and safety
5. Testing and calibration
6. Final results and capabilities

**Outcome:**
- Working embroidery machine for production
- First published video content
- Social media presence established`,
        personId: highCommander.id,
        generalId: null,
        startDate: new Date('2026-06-01T00:00:00Z'),
        endDate: new Date('2026-06-15T23:59:59Z'),
        amount: 0,
        currency: 'XAF',
        paymentStatus: 'paid',
        amountPaid: 0,
        status: 'pending',
        priority: 'high',
        progress: 0,
        category: 'Equipment & Content Creation',
        tags: ['embroidery-motor', 'video-content', 'workshop-essentials', 'first-video', 'equipment-setup'],
        notes: 'This is Video #1. Film everything. Post immediately after editing. Use this to establish YouTube channel and social media presence.',
        checklist: [
          { id: 1, text: 'Prepare embroidery machine for motor installation', completed: false },
          { id: 2, text: 'Gather all tools and parts needed', completed: false },
          { id: 3, text: 'Set up camera, lighting, and microphone', completed: false },
          { id: 4, text: 'Film introduction and problem explanation', completed: false },
          { id: 5, text: 'Film motor installation process (complete)', completed: false },
          { id: 6, text: 'Film electrical connections', completed: false },
          { id: 7, text: 'Film testing and calibration', completed: false },
          { id: 8, text: 'Film final results and demonstration', completed: false },
          { id: 9, text: 'Edit video (weekend)', completed: false },
          { id: 10, text: 'Create thumbnail and title', completed: false },
          { id: 11, text: 'Post to YouTube', completed: false },
          { id: 12, text: 'Post to TikTok', completed: false },
          { id: 13, text: 'Share on Facebook groups', completed: false },
          { id: 14, text: 'Verify machine operational for production', completed: false }
        ],
        reminderDays: 7
      },

      // LANDMARK 3: Master Video Editing Software
      {
        title: 'Master Video Editing Software - Learn While Filming',
        description: `**ESSENTIAL SKILL FOR CONTENT MONETIZATION**

Learn professional video editing to create high-quality content for YouTube and TikTok. Film the learning process itself as bonus content.

**Software Options:**
- **DaVinci Resolve** (FREE, professional-grade, recommended)
- **CapCut** (easier, mobile-friendly, good for TikTok)
- **Adobe Premiere** (industry standard but expensive)

**Learning Strategy:**
- Start with DaVinci Resolve (free and powerful)
- Film yourself learning the software
- Create "Design Lab | Video Editing Basics for Content Creators" series
- Practice on embroidery motor installation video
- Improve with each video

**Time Expectation:**
- First videos: 4-8 hours editing each (learning phase)
- Later videos: 2-4 hours each (proficient phase)
- Weekend dedicated to editing (Saturday-Sunday)

**Outcome:**
- Ability to produce professional video content
- Faster editing over time
- Additional tutorial content on video editing itself`,
        personId: highCommander.id,
        generalId: null,
        startDate: new Date('2026-06-01T00:00:00Z'),
        endDate: new Date('2026-07-31T23:59:59Z'),
        amount: 0,
        currency: 'XAF',
        paymentStatus: 'paid',
        amountPaid: 0,
        status: 'pending',
        priority: 'high',
        progress: 0,
        category: 'Skills Development',
        tags: ['video-editing', 'davinci-resolve', 'content-creation', 'skills', 'learning'],
        notes: 'Learn while doing. Film the learning process. First videos will take longer (4-8h), later videos faster (2-4h). Dedicate weekends to editing.',
        checklist: [
          { id: 1, text: 'Download and install DaVinci Resolve (FREE)', completed: false },
          { id: 2, text: 'Complete basic DaVinci Resolve tutorial (YouTube)', completed: false },
          { id: 3, text: 'Learn timeline editing basics', completed: false },
          { id: 4, text: 'Learn audio syncing and balancing', completed: false },
          { id: 5, text: 'Learn color correction basics', completed: false },
          { id: 6, text: 'Learn transitions and effects', completed: false },
          { id: 7, text: 'Learn text and titles', completed: false },
          { id: 8, text: 'Learn export settings for YouTube', completed: false },
          { id: 9, text: 'Learn export settings for TikTok', completed: false },
          { id: 10, text: 'Edit embroidery motor video (first project)', completed: false },
          { id: 11, text: 'Edit 5 more videos (practice)', completed: false },
          { id: 12, text: 'Achieve 2-4 hour editing speed', completed: false },
          { id: 13, text: 'Film "Design Lab | Video Editing Basics" tutorial', completed: false }
        ],
        reminderDays: 7
      },

      // LANDMARK 4: Master Fusion 360 for Furniture Design
      {
        title: 'Master Fusion 360 for Furniture & Woodworking Design',
        description: `**3D CAD/CAM FOR FURNITURE MANUFACTURING**

Learn Autodesk Fusion 360 for professional furniture and woodworking design. This is critical for transitioning from basic woodworking to smart furniture (IoT integration) in Phase 2 of the mission.

**Why Fusion 360:**
- Industry standard for furniture design
- CAD (Computer-Aided Design) for 3D modeling
- CAM (Computer-Aided Manufacturing) for CNC programming
- Free for hobbyists/startups
- Parametric design (easy modifications)
- Assembly modeling
- Rendering and visualization

**Learning Strategy:**
- YouTube tutorials (free)
- Film yourself learning
- Design first furniture piece in software
- Create "Design Lab | Fusion 360 - Furniture Design Basics" series
- Apply to real SuberCraftex projects

**Outcome:**
- Ability to design custom furniture digitally
- Professional client presentations (3D renders)
- Preparation for CNC machining
- Preparation for smart furniture (Phase 2)`,
        personId: highCommander.id,
        generalId: null,
        startDate: new Date('2026-06-15T00:00:00Z'),
        endDate: new Date('2026-08-31T23:59:59Z'),
        amount: 0,
        currency: 'XAF',
        paymentStatus: 'paid',
        amountPaid: 0,
        status: 'pending',
        priority: 'high',
        progress: 0,
        category: 'Skills Development',
        tags: ['fusion-360', 'cad', 'furniture-design', 'woodworking', 'smart-furniture', '3d-modeling'],
        notes: 'Essential for furniture business scaling. Film learning process. Apply to real projects. This prepares for Phase 2: Smart Furniture (IoT).',
        checklist: [
          { id: 1, text: 'Download and install Fusion 360 (free license)', completed: false },
          { id: 2, text: 'Complete Fusion 360 fundamentals course (YouTube)', completed: false },
          { id: 3, text: 'Learn sketching basics', completed: false },
          { id: 4, text: 'Learn 3D modeling (extrude, revolve, sweep)', completed: false },
          { id: 5, text: 'Learn parametric design', completed: false },
          { id: 6, text: 'Learn assembly modeling', completed: false },
          { id: 7, text: 'Learn joinery techniques in Fusion 360', completed: false },
          { id: 8, text: 'Learn rendering and visualization', completed: false },
          { id: 9, text: 'Design first simple furniture (chair)', completed: false },
          { id: 10, text: 'Design complex furniture (dining table)', completed: false },
          { id: 11, text: 'Film learning journey', completed: false },
          { id: 12, text: 'Create "Design Lab | Fusion 360" tutorial series', completed: false },
          { id: 13, text: 'Apply Fusion 360 to real SuberCraftex client project', completed: false }
        ],
        reminderDays: 7
      },

      // LANDMARK 5: Master Blender for Garment/Suit Design
      {
        title: 'Master Blender for Tailoring & Layered Garment Design',
        description: `**3D MODELING FOR SUIT AND GARMENT VISUALIZATION**

Learn Blender for modeling layered garments (suits, dresses, complex apparel). This allows professional visualization for premium clients and prepares for digital fashion design.

**Why Blender for Tailoring:**
- Suits are layered (lining, interfacing, outer fabric, buttons)
- 3D visualization helps clients see final product
- Cloth simulation for realistic draping
- Professional presentations for premium customers
- Future: Digital fashion and virtual try-ons

**Learning Strategy:**
- YouTube tutorials (Blender for fashion/garments)
- Film yourself learning
- Model first simple garment (shirt)
- Progress to complex suit (jacket, trousers, waistcoat)
- Create "Design Lab | Blender for Tailoring" series

**Outcome:**
- Ability to visualize garments in 3D
- Professional client presentations
- Understanding of layered construction
- Preparation for digital fashion (future revenue stream)`,
        personId: highCommander.id,
        generalId: null,
        startDate: new Date('2026-07-01T00:00:00Z'),
        endDate: new Date('2026-09-30T23:59:59Z'),
        amount: 0,
        currency: 'XAF',
        paymentStatus: 'paid',
        amountPaid: 0,
        status: 'pending',
        priority: 'high',
        progress: 0,
        category: 'Skills Development',
        tags: ['blender', '3d-modeling', 'tailoring', 'garment-design', 'suit-design', 'cloth-simulation'],
        notes: 'Blender for layered garments (suits). Film learning process. Apply to premium client presentations. Prepares for digital fashion.',
        checklist: [
          { id: 1, text: 'Download and install Blender (FREE)', completed: false },
          { id: 2, text: 'Complete Blender basics tutorial (YouTube)', completed: false },
          { id: 3, text: 'Learn 3D modeling fundamentals', completed: false },
          { id: 4, text: 'Learn cloth simulation', completed: false },
          { id: 5, text: 'Learn materials and textures (fabric)', completed: false },
          { id: 6, text: 'Learn layering techniques', completed: false },
          { id: 7, text: 'Model simple garment (shirt)', completed: false },
          { id: 8, text: 'Model complex garment (suit jacket)', completed: false },
          { id: 9, text: 'Model full suit (jacket, trousers, waistcoat)', completed: false },
          { id: 10, text: 'Learn rendering for client presentations', completed: false },
          { id: 11, text: 'Film learning journey', completed: false },
          { id: 12, text: 'Create "Design Lab | Blender for Tailoring" tutorial', completed: false },
          { id: 13, text: 'Apply Blender to real SuberCraftex client project', completed: false }
        ],
        reminderDays: 7
      },

      // LANDMARK 6: Film First 4 Curriculum Tutorial Videos
      {
        title: 'Film & Post First 4 Curriculum Tutorial Videos',
        description: `**LAUNCH CONTENT CREATION ENGINE**

Film yourself completing assignments from 4 different SuberCraftex curricula. These videos serve as:
- Marketing for apprenticeship program
- Proof of expertise
- Revenue Line 2 (content monetization)
- Apprentice recruitment material

**Curricula to Film (FIRST 4):**
1. **Tailoring** (most marketable, 74 assignments) - Film Level 1 basics
2. **Woodworking** (shop is complete) - Film Level 1 basics
3. **Device Repair** (high demand) - Film Level 1 basics
4. **Electronics** (impressive, high-tech) - Film Level 1 basics

**Video Format:**
- **Series Name**: "SuberCraftex [Trade] Academy | Level [X] - [Topic]"
- **Example**: "SuberCraftex Tailoring Academy | Level 1 - Threading the Industrial Machine"

**Production Schedule:**
- Batch film 3-4 assignments in one day
- Edit 1 video per weekend
- Post 1 video per week
- Build backlog over time

**Outcome:**
- 4 videos published (1 per week for 1 month)
- YouTube channel established
- Apprentice recruitment begins
- Social media presence growing`,
        personId: highCommander.id,
        generalId: null,
        startDate: new Date('2026-06-01T00:00:00Z'),
        endDate: new Date('2026-07-31T23:59:59Z'),
        amount: 0,
        currency: 'XAF',
        paymentStatus: 'paid',
        amountPaid: 0,
        status: 'pending',
        priority: 'critical',
        progress: 0,
        category: 'Content Creation',
        tags: ['curriculum-videos', 'tailoring', 'woodworking', 'device-repair', 'electronics', 'youtube', 'apprentice-marketing'],
        notes: 'Film 4 curricula: Tailoring, Woodworking, Device Repair, Electronics. 1 video/week. Batch filming strategy. This launches apprentice recruitment.',
        checklist: [
          { id: 1, text: 'Choose specific assignments to film (4 total)', completed: false },
          { id: 2, text: 'Prepare materials and tools for each assignment', completed: false },
          { id: 3, text: 'Set up filming workspace (camera, lighting, audio)', completed: false },
          { id: 4, text: 'Film Tailoring Level 1 assignment', completed: false },
          { id: 5, text: 'Film Woodworking Level 1 assignment', completed: false },
          { id: 6, text: 'Film Device Repair Level 1 assignment', completed: false },
          { id: 7, text: 'Film Electronics Level 1 assignment', completed: false },
          { id: 8, text: 'Edit Tailoring video (Weekend 1)', completed: false },
          { id: 9, text: 'Edit Woodworking video (Weekend 2)', completed: false },
          { id: 10, text: 'Edit Device Repair video (Weekend 3)', completed: false },
          { id: 11, text: 'Edit Electronics video (Weekend 4)', completed: false },
          { id: 12, text: 'Post Tailoring video to YouTube/TikTok', completed: false },
          { id: 13, text: 'Post Woodworking video to YouTube/TikTok', completed: false },
          { id: 14, text: 'Post Device Repair video to YouTube/TikTok', completed: false },
          { id: 15, text: 'Post Electronics video to YouTube/TikTok', completed: false }
        ],
        reminderDays: 7
      },

      // LANDMARK 7: Build YouTube/Social Media Presence
      {
        title: 'Build YouTube & Social Media Presence - 1000 Subscribers',
        description: `**ESTABLISH ONLINE BRAND & AUDIENCE**

Build SuberCraftex Academy presence on YouTube, TikTok, Facebook, and Instagram. Target 1,000 subscribers/followers in 90 days.

**Platform Strategy:**
- **YouTube**: Long-form tutorials (10-30 min), monetization potential
- **TikTok**: Short clips (30-60 sec), viral potential, young audience
- **Facebook**: Community groups, local audience in Cameroon
- **Instagram**: Visual portfolio, behind-the-scenes, Reels

**Content Cadence:**
- 1 YouTube video per week (curriculum tutorials)
- 3-5 TikTok clips per week (short excerpts, tips, behind-scenes)
- Daily Facebook/Instagram posts (progress updates, engagement)

**Engagement Strategy:**
- Respond to every comment
- Ask questions to viewers
- Create community (SuberCraftex Academy group)
- Share success stories (Fauzia's progress)

**Outcome:**
- 1,000+ YouTube subscribers
- 2,000+ TikTok followers
- Active Facebook community
- Apprentice inquiries coming in`,
        personId: highCommander.id,
        generalId: null,
        startDate: new Date('2026-06-01T00:00:00Z'),
        endDate: new Date('2026-08-31T23:59:59Z'),
        amount: 0,
        currency: 'XAF',
        paymentStatus: 'paid',
        amountPaid: 0,
        status: 'pending',
        priority: 'critical',
        progress: 0,
        category: 'Marketing & Brand Building',
        tags: ['youtube', 'tiktok', 'social-media', 'subscribers', 'brand-building', 'community'],
        notes: 'Build to 1000 subscribers in 90 days. 1 YouTube video/week, 3-5 TikTok clips/week, daily engagement. This drives apprentice recruitment.',
        checklist: [
          { id: 1, text: 'Create SuberCraftex Academy YouTube channel', completed: false },
          { id: 2, text: 'Create SuberCraftex Academy TikTok account', completed: false },
          { id: 3, text: 'Create SuberCraftex Academy Facebook page', completed: false },
          { id: 4, text: 'Create SuberCraftex Academy Instagram account', completed: false },
          { id: 5, text: 'Design channel branding (logo, banner, colors)', completed: false },
          { id: 6, text: 'Post first 4 YouTube videos (Week 1-4)', completed: false },
          { id: 7, text: 'Post 12 YouTube videos total (Week 1-12)', completed: false },
          { id: 8, text: 'Create 30 TikTok clips (from YouTube content)', completed: false },
          { id: 9, text: 'Join Cameroon Facebook groups (tailoring, woodworking, education)', completed: false },
          { id: 10, text: 'Engage daily (respond to comments, ask questions)', completed: false },
          { id: 11, text: 'Reach 100 YouTube subscribers', completed: false },
          { id: 12, text: 'Reach 500 YouTube subscribers', completed: false },
          { id: 13, text: 'Reach 1,000 YouTube subscribers', completed: false },
          { id: 14, text: 'Create SuberCraftex Academy Facebook community group', completed: false }
        ],
        reminderDays: 7
      },

      // LANDMARK 8: Launch SuberCraftex Academy (Apprentice Program)
      {
        title: 'Launch SuberCraftex Academy - Target 800K/Month Revenue',
        description: `**REVENUE LINE 1: APPRENTICESHIP PROGRAM**

Launch the formal SuberCraftex Academy apprenticeship program with pricing, enrollment system, and hybrid learning model.

**TARGET: 800K XAF/MONTH MINIMUM REVENUE**

**Pricing Model (RECOMMENDED - Tiered Access):**
- **Tier 1 - Online Only**: 5K/month (videos only, no practicals)
- **Tier 2 - Hybrid**: 15K/month (videos + 2 practicals/month)
- **Tier 3 - Intensive**: 30K/month (videos + 4 practicals/month + materials)

**Revenue Math to Hit 800K:**
- 30 Tier 1 (5K) = 150K
- 25 Tier 2 (15K) = 375K
- 10 Tier 3 (30K) = 300K
- **Total: 65 apprentices = 825K/month** ✅

**Recruitment Channels:**
- YouTube/TikTok subscribers (free content → paid program)
- Facebook groups (Cameroon job seekers, youth)
- Local community (churches, mosques, schools)
- Word of mouth (Fauzia tells friends/family)
- SuberCraftex website (dedicated Academy section)

**Workshop Schedule:**
- 50 apprentices MUST schedule in shifts
- Morning shift: 9am-12pm (25 apprentices)
- Afternoon shift: 2pm-5pm (25 apprentices)
- Rotate weekly

**Outcome:**
- 65+ apprentices enrolled
- 800K+ revenue per month
- Replaces Abba contract (300K) + growth
- Financial stability achieved`,
        personId: highCommander.id,
        generalId: null,
        startDate: new Date('2026-07-01T00:00:00Z'),
        endDate: new Date('2026-09-30T23:59:59Z'),
        amount: 0,
        currency: 'XAF',
        paymentStatus: 'paid',
        amountPaid: 0,
        status: 'pending',
        priority: 'critical',
        progress: 0,
        category: 'Business Launch',
        tags: ['academy-launch', 'apprenticeship', 'revenue', '800k-target', 'enrollment', 'hybrid-learning'],
        notes: 'TARGET: 65 apprentices = 825K/month. Tiered pricing (5K/15K/30K). Hybrid model. Schedule 50 apprentices in shifts. This is REVENUE LINE 1.',
        checklist: [
          { id: 1, text: 'Finalize pricing model (Tiered: 5K/15K/30K)', completed: false },
          { id: 2, text: 'Create enrollment form (Google Forms or SuberCraftex website)', completed: false },
          { id: 3, text: 'Set up payment collection (mobile money, bank transfer)', completed: false },
          { id: 4, text: 'Create curriculum access system (videos on YouTube/private)', completed: false },
          { id: 5, text: 'Design workshop practical schedule (shifts)', completed: false },
          { id: 6, text: 'Recruit first 10 apprentices', completed: false },
          { id: 7, text: 'Recruit 25 apprentices total', completed: false },
          { id: 8, text: 'Recruit 50 apprentices total', completed: false },
          { id: 9, text: 'Recruit 65 apprentices total (800K/month achieved)', completed: false },
          { id: 10, text: 'Conduct first practical session', completed: false },
          { id: 11, text: 'Implement shift rotation system', completed: false },
          { id: 12, text: 'Issue first certificates (completed levels)', completed: false },
          { id: 13, text: 'Collect testimonials and success stories', completed: false },
          { id: 14, text: 'Achieve 800K revenue for 3 consecutive months', completed: false }
        ],
        reminderDays: 7
      },

      // LANDMARK 9: Set Up Hybrid Learning System
      {
        title: 'Set Up Hybrid Learning Infrastructure (Online + Practical)',
        description: `**SCALABLE APPRENTICESHIP DELIVERY SYSTEM**

Build the infrastructure to deliver hybrid learning: online video access + in-person practicals.

**Online Component:**
- YouTube channel (public or unlisted videos)
- Enrollment tracking (Google Sheets or database)
- Payment tracking system
- Mobile money integration (MTN, Orange)

**Practical Component:**
- Workshop scheduling system (shifts)
- Attendance tracking
- Materials inventory management
- Progress tracking per apprentice
- Certificate issuance system

**Systems Needed:**
1. Enrollment & Payment Portal
2. Video Access System (YouTube playlists per tier)
3. Workshop Schedule (Google Calendar or custom)
4. Attendance Tracking (Google Sheets or app)
5. Progress Dashboard (per apprentice)
6. Certificate Generator (Canva templates or automated)

**Outcome:**
- Scalable system for 50+ apprentices
- Minimal manual overhead
- Clear tracking and accountability
- Professional presentation`,
        personId: highCommander.id,
        generalId: null,
        startDate: new Date('2026-06-15T00:00:00Z'),
        endDate: new Date('2026-08-15T23:59:59Z'),
        amount: 0,
        currency: 'XAF',
        paymentStatus: 'paid',
        amountPaid: 0,
        status: 'pending',
        priority: 'high',
        progress: 0,
        category: 'Infrastructure',
        tags: ['hybrid-learning', 'enrollment', 'payment-system', 'workshop-scheduling', 'infrastructure'],
        notes: 'Build systems to manage 50+ apprentices. YouTube + practical scheduling + payment tracking + certificates. Keep it simple and scalable.',
        checklist: [
          { id: 1, text: 'Create enrollment form (Google Forms)', completed: false },
          { id: 2, text: 'Set up apprentice database (Google Sheets or Airtable)', completed: false },
          { id: 3, text: 'Set up mobile money payment instructions', completed: false },
          { id: 4, text: 'Create payment tracking spreadsheet', completed: false },
          { id: 5, text: 'Organize YouTube videos into playlists (Tier 1/2/3)', completed: false },
          { id: 6, text: 'Create workshop schedule template (Google Calendar)', completed: false },
          { id: 7, text: 'Create attendance tracking sheet', completed: false },
          { id: 8, text: 'Create progress tracking sheet (per apprentice)', completed: false },
          { id: 9, text: 'Design certificate template (Canva)', completed: false },
          { id: 10, text: 'Test enrollment process with Fauzia (pilot)', completed: false },
          { id: 11, text: 'Test practical scheduling with first 5 apprentices', completed: false },
          { id: 12, text: 'Issue first certificate', completed: false }
        ],
        reminderDays: 7
      },

      // LANDMARK 10: Train Fauzia as Lead Apprentice & Future General 1
      {
        title: 'Train Fauzia as Lead Apprentice & Future General 1 (SuberCraftex Leader)',
        description: `**FAUZIA: YOUR FIRST APPRENTICE & FUTURE SUBERCRAFTEX LEADER**

Fauzia is learning ALL trades alongside you. She will eventually run SuberCraftex as General 1 while you move to other general establishments.

**Her Learning Path:**
- Learn all 9 curriculum tracks (in sync with you)
- Assist in all workshop tasks
- Film you working (camera operator)
- Manage social media (posting, engagement)
- Handle customer communication
- Progress from beginner to competent

**Her Roles NOW:**
1. **Camera Operator**: Films you working
2. **Apprentice #1**: Learns on camera (proof of concept)
3. **Social Media Manager**: Posts content, engages audience
4. **Customer Communication**: Responds to inquiries
5. **Workshop Assistant**: Helps with projects
6. **Quality Control**: Checks finished products

**Video Opportunity:**
- "Apprentice Chronicles | Fauzia's Journey" series
- Film her learning alongside you
- Show her progress from beginner to expert
- **This proves your apprenticeship program works**

**Timeline:**
- 6 months: Basic competency in Tailoring & Woodworking
- 12 months: Competent in 5+ trades
- 18 months: Can teach other apprentices
- 24 months: Can manage workshop independently
- 36 months: Promoted to General 1 (SuberCraftex Leader)

**Outcome:**
- Fauzia becomes lead apprentice and instructor
- She can manage SuberCraftex while you scale
- Proof that apprenticeship program works
- Content series showing transformation`,
        personId: highCommander.id,
        generalId: null,
        startDate: new Date('2026-05-03T00:00:00Z'),
        endDate: new Date('2029-05-03T23:59:59Z'),
        amount: 0,
        currency: 'XAF',
        paymentStatus: 'paid',
        amountPaid: 0,
        status: 'pending',
        priority: 'high',
        progress: 0,
        category: 'Team Development',
        tags: ['fauzia', 'apprentice', 'general-1', 'training', 'leadership', 'subercraftex'],
        notes: 'Fauzia learns ALL trades. She is camera operator, social media manager, apprentice #1. Film her journey. 3 years to General 1.',
        checklist: [
          { id: 1, text: 'Fauzia completes Tailoring Level 1', completed: false },
          { id: 2, text: 'Fauzia completes Woodworking Level 1', completed: false },
          { id: 3, text: 'Fauzia learns camera operation (Samsung S23)', completed: false },
          { id: 4, text: 'Fauzia manages social media posting (YouTube/TikTok)', completed: false },
          { id: 5, text: 'Fauzia handles customer inquiries (WhatsApp/calls)', completed: false },
          { id: 6, text: 'Film "Apprentice Chronicles | Fauzia Episode 1"', completed: false },
          { id: 7, text: 'Fauzia completes 3 curriculum tracks (basic competency)', completed: false },
          { id: 8, text: 'Fauzia completes 5 curriculum tracks (broad competency)', completed: false },
          { id: 9, text: 'Fauzia teaches first apprentice (instructor role)', completed: false },
          { id: 10, text: 'Fauzia manages workshop independently (1 week)', completed: false },
          { id: 11, text: 'Fauzia promoted to Workshop Manager', completed: false },
          { id: 12, text: 'Fauzia promoted to General 1 (SuberCraftex Leader)', completed: false }
        ],
        reminderDays: 30
      },

      // LANDMARK 11: Implement 800K/Month Revenue Target via Daily Timetable
      {
        title: 'Achieve 800K/Month Revenue via Disciplined Daily Timetable',
        description: `**EXECUTE DAILY TIMETABLE TO REACH 800K/MONTH TARGET**

Follow the daily timetable religiously to achieve 800K/month revenue target. Current 300K/month is "most basic life, cannot fuel car or eat properly." 800K is the minimum for:
- Proper living (fuel car, eat properly)
- Paying down 2.5M debt
- Investing in equipment and growth
- Supporting Fauzia
- Saving for expansion

**Daily Timetable (Weekdays):**
- 10pm-5am: Sleep (7h)
- 5am-8am: Deep Focus Software Work (3h) - CLIENT INCOME
- 8am-9am: Break/Breakfast (1h)
- 9am-9:30am: SuberCraftex Daily Planning (30m)
- 9:30am-10:30am: Active SuberCraftex Work (1h)
- 10:30am-11:30am: Progress Review & Wrap-Up (1h)
- 11:30am-12pm: Final Conclusion (30m)
- 12pm-1pm: Break/Lunch (1h)
- 1pm-3pm: Islam Study/Practice (2h)
- 3pm-5pm: Sales, Marketing & Outreach (2h)
- 5pm-10pm: Socializing & Family Time (5h)

**Weekends:**
- Video editing (6h total)
- Social media posting (1h)
- Rewiring/rest/family time (remaining)

**Success Metrics:**
- 80%+ adherence to timetable
- 800K/month revenue achieved
- 2.5M debt payment started
- Energy level sustained (3-5 stars)

**Outcome:**
- Consistent execution of plan
- Revenue target achieved
- Debt reduction started
- Sustainable work-life balance`,
        personId: highCommander.id,
        generalId: null,
        startDate: new Date('2026-06-01T00:00:00Z'),
        endDate: new Date('2026-09-30T23:59:59Z'),
        amount: 0,
        currency: 'XAF',
        paymentStatus: 'paid',
        amountPaid: 0,
        status: 'pending',
        priority: 'critical',
        progress: 0,
        category: 'Execution & Discipline',
        tags: ['daily-timetable', '800k-target', 'discipline', 'execution', 'revenue-goal'],
        notes: 'Follow daily timetable religiously. 80%+ adherence. Achieve 800K/month. Track via Daily Timetable Card system.',
        checklist: [
          { id: 1, text: 'Follow timetable for 7 consecutive days (first week)', completed: false },
          { id: 2, text: 'Follow timetable for 30 consecutive days (first month)', completed: false },
          { id: 3, text: 'Achieve 80%+ adherence score for 1 month', completed: false },
          { id: 4, text: 'Film first 4 curriculum videos (per schedule)', completed: false },
          { id: 5, text: 'Edit 4 videos (weekends)', completed: false },
          { id: 6, text: 'Post 1 video per week for 4 weeks', completed: false },
          { id: 7, text: 'Recruit first 10 apprentices', completed: false },
          { id: 8, text: 'Achieve 200K/month revenue (first milestone)', completed: false },
          { id: 9, text: 'Achieve 400K/month revenue (second milestone)', completed: false },
          { id: 10, text: 'Achieve 600K/month revenue (third milestone)', completed: false },
          { id: 11, text: 'Achieve 800K/month revenue (TARGET MET)', completed: false },
          { id: 12, text: 'Sustain 800K/month for 3 consecutive months', completed: false },
          { id: 13, text: 'Start paying down 2.5M debt', completed: false }
        ],
        reminderDays: 7
      }
    ];

    console.log(`📝 Creating ${landmarks.length} comprehensive landmarks...\n`);

    let created = 0;
    for (const landmarkData of landmarks) {
      // Check if landmark already exists
      const existing = await Landmark.findOne({
        where: { title: landmarkData.title }
      });

      if (existing) {
        console.log(`⏭️  Skipping existing: ${landmarkData.title}`);
        continue;
      }

      const landmark = await Landmark.create(landmarkData);
      created++;
      console.log(`✅ Created [${created}/${landmarks.length}]: ${landmark.title}`);
    }

    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('✨ HIGH COMMANDER LANDMARK SYSTEM CREATED SUCCESSFULLY! ✨');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`\n📊 Summary:`);
    console.log(`   Person: ${highCommander.fullName} (High Commander and Chief)`);
    console.log(`   New Landmarks Created: ${created}`);
    console.log(`   Total Landmarks: ${await Landmark.count({ where: { personId: highCommander.id } })}`);

    console.log(`\n🎯 Critical Path to 800K/Month:`);
    console.log(`   1. Buy Samsung S23 + Equipment (250K from May payment) - CRITICAL BLOCKER`);
    console.log(`   2. Install embroidery motor (FILMED)`);
    console.log(`   3. Master video editing (DaVinci Resolve)`);
    console.log(`   4. Film 4 curriculum videos (1/week for 1 month)`);
    console.log(`   5. Build YouTube presence (1000 subscribers)`);
    console.log(`   6. Launch SuberCraftex Academy`);
    console.log(`   7. Recruit 65 apprentices = 825K/month revenue`);
    console.log(`   8. Follow daily timetable religiously`);

    console.log(`\n📅 Timeline:`);
    console.log(`   May 2026: Buy equipment (extreme measures - broke for 1 month)`);
    console.log(`   June 2026: Film first videos, learn editing, install motor`);
    console.log(`   July 2026: Launch academy, recruit first apprentices`);
    console.log(`   August 2026: Scale to 25 apprentices (375K/month)`);
    console.log(`   September 2026: Scale to 65 apprentices (825K/month) - TARGET MET`);

    console.log(`\n💪 Supporting Activities:`);
    console.log(`   • Train Fauzia (camera, social media, apprentice #1)`);
    console.log(`   • Learn Fusion 360 (furniture design)`);
    console.log(`   • Learn Blender (garment/suit design)`);
    console.log(`   • Set up hybrid learning infrastructure`);
    console.log(`   • Build social media presence`);

    console.log(`\n🚀 Next Steps:`);
    console.log(`   1. Run timetable migration: node migrations/create_daily_timetables_table.js`);
    console.log(`   2. Run timetable seed: node scripts/seedHighCommanderTimetable.js`);
    console.log(`   3. View landmarks in Mission Control Dashboard`);
    console.log(`   4. Start executing daily timetable`);
    console.log(`   5. Extreme measures: Secure 250K from May payment\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating landmarks:', error);
    console.error('Error details:', error.message);
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
    process.exit(1);
  }
}

createHighCommanderLandmarks();
