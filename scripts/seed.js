require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Blog = require('../models/Blog');
const Project = require('../models/Project');
const Testimonial = require('../models/Testimonial');
const Lead = require('../models/Lead');
const Subscription = require('../models/Subscription');

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await Promise.all([
            User.deleteMany(),
            Blog.deleteMany(),
            Project.deleteMany(),
            Testimonial.deleteMany(),
            Lead.deleteMany(),
            Subscription.deleteMany(),
        ]);
        console.log('🗑 Cleared existing data');

        // ──────────── USERS ────────────
        await User.create([
            { name: 'Super Admin', email: 'admin@sproutsorgs.com', password: 'Admin@123', role: 'superadmin' },
            { name: 'Ravi Kumar', email: 'ravi@sproutsorgs.com', password: 'Admin@123', role: 'admin' },
            { name: 'Ananya Singh', email: 'ananya@student.com', password: 'Student@123', role: 'student' },
            { name: 'Deepak Raj', email: 'deepak@student.com', password: 'Student@123', role: 'student' },
            { name: 'Meera Pillai', email: 'meera@student.com', password: 'Student@123', role: 'student' },
        ]);
        console.log('👤 Users created');

        // ──────────── TESTIMONIALS ────────────
        await Testimonial.insertMany([
            { name: 'Priya Sharma', role: 'Founder & CEO', company: 'EduStart Labs', content: 'Sprouts Orgs completely transformed our EdTech startup. The team delivered a stunning, scalable platform in just 6 weeks. Professional, reliable, and incredibly talented!', rating: 5, service: 'Website Development', order: 1 },
            { name: 'Rahul Mehta', role: 'Marketing Head', company: 'GrowthBox Digital', content: 'Their digital marketing strategy doubled our lead generation in just 3 months. The team understood our niche perfectly and executed flawlessly. Highly recommended!', rating: 5, service: 'Digital Marketing', order: 2 },
            { name: 'Arjun Nair', role: 'Final Year Student', company: 'IIT Madras', content: 'Got exceptional project support for my B.Tech final year project on AI-based crop detection. The mentoring, code reviews, and documentation help was world-class!', rating: 5, service: 'Student Projects & EdTech Solutions', order: 3 },
            { name: 'Divya Krishnan', role: 'CTO', company: 'TechVentures Pvt. Ltd.', content: 'The custom ERP system they built for us is rock-solid. Highly scalable architecture, clean code, and the best post-delivery support I have ever experienced. 10/10!', rating: 5, service: 'Software Development', order: 4 },
            { name: 'Arun Vijay', role: 'Software Engineer', company: 'Infosys', content: 'Completed their 3-month React + Node.js internship program and got placed within 5 weeks of graduation. The hands-on projects and live industry experience made all the difference.', rating: 5, service: 'Internship / Training Programs', order: 5 },
            { name: 'Lakshmi Patel', role: 'Product Manager', company: 'HealthFirst Solutions', content: 'Sprouts Orgs built our patient management mobile app from scratch. The UI/UX is beautiful, performance is excellent, and they were always available for feedback rounds.', rating: 5, service: 'Software Development', order: 6 },
            { name: 'Mohammed Rafi', role: 'E-commerce Entrepreneur', company: 'Rafi Handicrafts', content: 'My online store was set up in under 2 weeks with payment gateway, inventory management, and admin panel. Sales went up 40% after launch. Amazing work by the Sprouts team!', rating: 5, service: 'Website Development', order: 7 },
            { name: 'Sneha Iyer', role: 'Data Science Student', company: 'VIT Vellore', content: 'The machine learning project support I received was beyond my expectations. The mentors broke down complex concepts and helped me build a production-ready sentiment analysis tool.', rating: 5, service: 'Student Projects & EdTech Solutions', order: 8 },
        ]);
        console.log('⭐ Testimonials seeded (8 records)');

        // ──────────── PROJECTS ────────────
        await Project.insertMany([
            {
                title: 'EduLearn Online Platform',
                slug: 'edulearn-online-platform',
                description: 'A full-featured e-learning platform with live video courses, quizzes, progress tracking, and blockchain certificates for verified credentials.',
                category: 'EdTech',
                client: 'EduStart Labs',
                techStack: ['React', 'Node.js', 'MongoDB', 'WebRTC', 'AWS S3'],
                liveUrl: 'https://edulearn.example.com',
                caseStudy: 'EduStart Labs needed a robust platform to host 500+ courses and support 10,000 concurrent students. We built a microservice architecture with video streaming, AI-powered quiz generation, and real-time progress analytics. Result: 98% uptime, 4.8/5 student satisfaction.',
                isFeatured: true,
                order: 1,
            },
            {
                title: 'GrowthBox CRM & Analytics',
                slug: 'growthbox-crm-analytics',
                description: 'A custom CRM system for a digital marketing agency featuring lead pipeline management, campaign analytics, and automated email workflows.',
                category: 'Software',
                client: 'GrowthBox Digital',
                techStack: ['Next.js', 'Express', 'PostgreSQL', 'Redis', 'Chart.js'],
                liveUrl: 'https://crm.growthbox.example.com',
                caseStudy: 'GrowthBox managed 2,000+ client leads manually via spreadsheets. We built them a custom CRM with drag-and-drop pipeline, email triggers, and a real-time analytics dashboard. Team productivity improved by 60%.',
                isFeatured: true,
                order: 2,
            },
            {
                title: 'ShopEase Multi-Vendor Marketplace',
                slug: 'shopease-multivendor-marketplace',
                description: 'A scalable multi-vendor e-commerce marketplace with real-time inventory tracking, multiple payment gateways, vendor dashboards, and delivery tracking.',
                category: 'Web Development',
                client: 'RetailPro Inc.',
                techStack: ['React', 'Node.js', 'Stripe', 'Razorpay', 'MongoDB', 'Socket.io'],
                liveUrl: 'https://shopease.example.com',
                caseStudy: 'RetailPro needed a marketplace to onboard 200+ vendors. We built a fully scalable platform with vendor onboarding, commission management, and real-time order tracking. GMV crossed ₹1 Crore in month 3.',
                isFeatured: false,
                order: 3,
            },
            {
                title: 'HealthTrack Patient Management App',
                slug: 'healthtrack-patient-app',
                description: 'A cross-platform mobile app for patient appointment booking, prescription management, doctor chat, and health record maintenance.',
                category: 'Mobile App',
                client: 'HealthFirst Clinic',
                techStack: ['React Native', 'Firebase', 'Node.js', 'Twilio', 'AWS'],
                caseStudy: 'HealthFirst Clinic handled 500+ appointments weekly via phone calls. Our app reduced no-shows by 45%, automated reminders, and gave doctors instant access to patient histories.',
                isFeatured: true,
                order: 4,
            },
            {
                title: 'AI Crop Disease Detector',
                slug: 'ai-crop-disease-detector',
                description: 'A machine learning web application that detects crop diseases from leaf images with 94% accuracy, helping farmers take early action to prevent losses.',
                category: 'AI Models',
                client: 'AgriTech Startup',
                techStack: ['Python', 'TensorFlow', 'Flask', 'React', 'OpenCV'],
                liveUrl: 'https://cropai.example.com',
                caseStudy: 'Built a CNN model trained on 50,000+ leaf images. Deployed as a Progressive Web App so farmers can use it without native app installation. Achieved 94.2% validation accuracy.',
                isFeatured: true,
                order: 5,
            },
            {
                title: 'HackSphere 2024 – AI Wellness App',
                slug: 'hacksphere-2024-wellness-app',
                description: 'A hackathon-winning project: An AI-powered mental wellness app with mood tracking, CBT-based exercises, and personalized mindfulness recommendations.',
                category: 'Hackathons',
                client: 'Internal / Hackathon',
                techStack: ['React Native', 'OpenAI API', 'Node.js', 'MongoDB'],
                isFeatured: false,
                order: 6,
            },
            {
                title: 'Rafi Handicrafts E-store',
                slug: 'rafi-handicrafts-estore',
                description: 'A beautifully designed e-commerce store for handmade handicraft products with artisan storytelling, custom gift wrapping, and Razorpay integration.',
                category: 'Web Development',
                client: 'Rafi Handicrafts',
                techStack: ['React', 'Node.js', 'MongoDB', 'Razorpay', 'Cloudinary'],
                liveUrl: 'https://rafi.example.com',
                isFeatured: false,
                order: 7,
            },
            {
                title: 'SmartLearn Student Dashboard',
                slug: 'smartlearn-student-dashboard',
                description: 'A student productivity dashboard with assignment tracking, grade analytics, study timer (Pomodoro), and peer collaboration features.',
                category: 'EdTech',
                client: 'VIT Vellore (Pilot)',
                techStack: ['React', 'Firebase', 'Chart.js', 'Tailwind CSS'],
                isFeatured: false,
                order: 8,
            },
        ]);
        console.log('📁 Projects seeded (8 records)');

        // ──────────── BLOGS ────────────
        await Blog.insertMany([
            {
                title: '5 Reasons Every Business Needs a Professional Website in 2024',
                slug: '5-reasons-professional-website-2024',
                excerpt: 'Discover why a professional website is the single most important investment for your business growth in the digital age.',
                content: '<h2>1. 24/7 Digital Presence</h2><p>A website works for your business around the clock, even while you sleep — capturing leads, answering FAQs, and building trust with potential customers globally.</p><h2>2. Credibility & Trust</h2><p>88% of consumers research businesses online before making a purchase. A professional website signals legitimacy and builds confidence.</p><h2>3. Lead Generation Machine</h2><p>With the right SEO strategy and landing pages, your website becomes your best salesperson — generating qualified leads on autopilot.</p><h2>4. Compete with Larger Brands</h2><p>A well-designed website levels the playing field, allowing small businesses to present themselves like established enterprises.</p><h2>5. Analytics & Insights</h2><p>Tools like Google Analytics let you understand exactly who visits your website, what they want, and how to convert them.</p>',
                category: 'Web Development',
                author: 'Sprouts Orgs Team',
                isPublished: true,
                tags: ['website', 'business', 'digital presence', 'growth'],
                views: 1240,
            },
            {
                title: 'How EdTech Is Transforming Education in Tier-2 Cities of India',
                slug: 'edtech-transforming-tier2-india',
                excerpt: 'EdTech platforms are bridging the education gap in smaller cities with affordable, quality learning experiences delivering real career outcomes.',
                content: '<h2>The EdTech Revolution</h2><p>The rise of affordable smartphones and 4G connectivity has made quality education accessible to millions in Tier-2 and Tier-3 cities across India.</p><h2>Key Drivers</h2><ul><li>Affordable data plans and smartphones</li><li>Vernacular content in regional languages</li><li>Government Digital India initiative</li><li>COVID-19 accelerated digital adoption</li></ul><h2>Success Stories</h2><p>Platforms like BYJU\'S, Unacademy, and local EdTech startups are producing IIT rankers and UPSC toppers from small towns that previously had no access to quality coaching.</p><h2>The Road Ahead</h2><p>With AI-personalized learning and VR classrooms on the horizon, EdTech will make world-class education truly borderless.</p>',
                category: 'EdTech',
                author: 'Sprouts Orgs Team',
                isPublished: true,
                tags: ['edtech', 'education', 'india', 'digital learning'],
                views: 876,
            },
            {
                title: 'Top 7 Final Year Project Ideas for CSE Students in 2024',
                slug: 'top-7-final-year-project-ideas-cse-2024',
                excerpt: 'Stuck on your final year project? Here are 7 innovative, resume-worthy tech projects that will impress recruiters at top MNCs.',
                content: '<h2>Choosing the Right Project</h2><p>Your final year project is often the first thing recruiters ask about. Choose something impactful, technically challenging, and aligned with industry trends.</p><h2>Top 7 Project Ideas</h2><ol><li><strong>AI-Powered Resume Scanner</strong> – NLP model that ranks resumes against job descriptions.</li><li><strong>Real-Time Disaster Alert System</strong> – IoT + ML for natural disaster prediction and alerting.</li><li><strong>Smart Attendance with Face Recognition</strong> – OpenCV + Deep Learning facial recognition system.</li><li><strong>Blockchain-Based Certificate Verification</strong> – Tamper-proof academic credentials on Ethereum.</li><li><strong>Mental Health Chatbot</strong> – NLP chatbot with sentiment analysis and CBT techniques.</li><li><strong>Telemedicine Platform</strong> – Video consultation, e-prescriptions, and health records.</li><li><strong>E-Waste Management Portal</strong> – Geo-tagged collection points and impact dashboard.</li></ol><h2>Tips for Success</h2><p>Pick a problem you\'re genuinely passionate about. The excitement will carry you through the tough implementation phases.</p>',
                category: 'Student Projects',
                author: 'Sprouts Orgs Mentors',
                isPublished: true,
                tags: ['student projects', 'final year', 'CSE', 'engineering', 'AI'],
                views: 3421,
            },
            {
                title: 'React vs Next.js in 2024: Which Should You Choose?',
                slug: 'react-vs-nextjs-2024',
                excerpt: 'A comprehensive comparison of React and Next.js to help developers and startups pick the right technology for their next web project.',
                content: '<h2>Understanding the Difference</h2><p>React is a UI library for building component-based interfaces. Next.js is a full-stack framework built on top of React that adds Server-Side Rendering, file-based routing, and API routes.</p><h2>When to Use React</h2><ul><li>Single Page Applications (SPAs)</li><li>Admin dashboards with complex state</li><li>Projects already using a separate backend (Node/Django/Laravel)</li></ul><h2>When to Use Next.js</h2><ul><li>SEO-critical websites and landing pages</li><li>E-commerce stores needing SSR for product pages</li><li>Full-stack applications wanting API routes in one codebase</li><li>Blogs and content sites using Static Site Generation (SSG)</li></ul><h2>Performance Comparison</h2><p>Next.js wins on Core Web Vitals for content-heavy sites due to SSR and automatic image optimization. React SPAs can match only with heavy client-side optimization.</p><h2>Verdict</h2><p>For new projects in 2024, Next.js is the default recommendation unless you have a strong reason to use plain React.</p>',
                category: 'Web Development',
                author: 'Ravi Kumar',
                isPublished: true,
                tags: ['react', 'nextjs', 'javascript', 'web development', 'comparison'],
                views: 2105,
            },
            {
                title: 'How to Get Hired as a Fresher in India\'s Tech Industry in 2024',
                slug: 'get-hired-fresher-tech-india-2024',
                excerpt: 'A practical, no-fluff guide for fresh graduates to land their first tech job — from building a portfolio to acing technical interviews.',
                content: '<h2>The Reality Check</h2><p>India produces 1.5 million engineering graduates every year. Standing out requires more than a degree — you need a demonstrable skill set, a strong portfolio, and interview preparation.</p><h2>Step 1: Master One Core Stack</h2><p>Don\'t spread thin. Pick one stack (MERN, Java Spring Boot, Python Django) and master it completely before exploring others.</p><h2>Step 2: Build 3 Real Projects</h2><p>Projects speak louder than certificates. Build an e-commerce app, a task management tool, and one API-integrated app. Host them on GitHub with proper READMEs.</p><h2>Step 3: Solve 150+ DSA Problems</h2><p>Most product companies have DSA rounds. Use LeetCode, focusing on Arrays, Strings, HashMaps, and Trees for the best coverage.</p><h2>Step 4: Craft a Strong LinkedIn Profile</h2><p>80% of tech recruiters scout LinkedIn daily. Optimize your headline, add your projects, and engage with tech content.</p><h2>Step 5: Apply Smart, Not Just Hard</h2><p>Focus on startups (easier to break into), attend hackathons, and reach out directly to hiring managers with customized messages.</p>',
                category: 'Career',
                author: 'Sprouts Orgs Mentors',
                isPublished: true,
                tags: ['career', 'fresher', 'job hunting', 'tech jobs', 'india'],
                views: 4892,
            },
            {
                title: 'The Ultimate Guide to Digital Marketing for Small Businesses',
                slug: 'digital-marketing-guide-small-business',
                excerpt: 'A step-by-step digital marketing playbook for small business owners with limited budgets who want maximum online impact.',
                content: '<h2>Why Digital Marketing?</h2><p>Traditional marketing costs 62% more than digital marketing and generates 3x fewer leads. For small businesses, digital is not optional — it\'s the great equalizer.</p><h2>The 5-Channel Framework</h2><ol><li><strong>SEO</strong> – Free, compounding organic traffic that builds over 6–12 months.</li><li><strong>Google Ads</strong> – Immediate visibility for high-intent buyers searching for your service.</li><li><strong>Instagram & Facebook</strong> – Visual storytelling and community building for brand awareness.</li><li><strong>Email Marketing</strong> – Highest ROI channel at ₹36 return per ₹1 spent.</li><li><strong>WhatsApp Marketing</strong> – 98% open rates make it unbeatable for local businesses in India.</li></ol><h2>Budget Allocation for ₹20,000/month</h2><ul><li>Google Ads: ₹8,000</li><li>Meta Ads: ₹5,000</li><li>Content Creation: ₹4,000</li><li>Email Tools: ₹3,000</li></ul><h2>Key Metrics to Track</h2><p>Focus on CAC (Customer Acquisition Cost), ROAS (Return on Ad Spend), and LTV (Lifetime Value) before anything else.</p>',
                category: 'Digital Marketing',
                author: 'Sprouts Orgs Team',
                isPublished: true,
                tags: ['digital marketing', 'small business', 'SEO', 'social media', 'google ads'],
                views: 1678,
            },
            {
                title: 'Building Your First REST API with Node.js and Express - Beginner Guide',
                slug: 'first-rest-api-nodejs-express-beginners',
                excerpt: 'A hands-on, beginner-friendly tutorial for building a production-ready REST API using Node.js, Express, and MongoDB in under 2 hours.',
                content: '<h2>Prerequisites</h2><p>Basic JavaScript knowledge, Node.js installed, and a MongoDB Atlas account (free tier works perfectly).</p><h2>Project Setup</h2><pre><code>mkdir my-api && cd my-api\nnpm init -y\nnpm install express mongoose dotenv cors bcryptjs jsonwebtoken</code></pre><h2>Core Structure</h2><p>Follow the MVC pattern: Models define data schemas, Controllers handle business logic, and Routes wire HTTP endpoints to controllers.</p><h2>Building the User API</h2><p>Create CRUD endpoints: POST /users (create), GET /users (list), GET /users/:id (single), PUT /users/:id (update), DELETE /users/:id (delete).</p><h2>Adding Authentication</h2><p>Implement JWT-based auth: hash passwords with bcrypt, sign tokens with jsonwebtoken, and protect routes using middleware that verifies tokens on each request.</p><h2>Deployment</h2><p>Deploy for free on Railway.app or Render.com with a single GitHub push and environment variable configuration.</p>',
                category: 'Web Development',
                author: 'Ravi Kumar',
                isPublished: true,
                tags: ['nodejs', 'express', 'REST API', 'backend', 'mongodb', 'tutorial'],
                views: 5310,
            },
            {
                title: 'Why Python is the Best Language for AI and Machine Learning in 2024',
                slug: 'python-best-language-ai-ml-2024',
                excerpt: 'Explore why Python dominates AI/ML development, the key libraries powering modern artificial intelligence, and how to get started.',
                content: '<h2>Python\'s Dominance in AI</h2><p>Over 85% of AI/ML projects worldwide use Python as their primary language. This isn\'t a coincidence — Python\'s simplicity, vast ecosystem, and community support make it the default choice.</p><h2>Key Libraries You Must Know</h2><ul><li><strong>NumPy & Pandas</strong> – Data manipulation and numerical computation</li><li><strong>Matplotlib & Seaborn</strong> – Data visualization</li><li><strong>Scikit-learn</strong> – Classical ML algorithms</li><li><strong>TensorFlow & Keras</strong> – Deep learning and neural networks</li><li><strong>PyTorch</strong> – Research-grade deep learning by Meta</li><li><strong>Hugging Face Transformers</strong> – State-of-the-art NLP models</li></ul><h2>Getting Started Roadmap</h2><p>Week 1-2: Python basics → Week 3-4: NumPy/Pandas → Month 2: Scikit-learn → Month 3-4: Deep Learning with TensorFlow</p><h2>Career Opportunities</h2><p>AI/ML engineers in India earn ₹12–40 LPA. With the global AI market projected at $1.8 trillion by 2030, now is the best time to start.</p>',
                category: 'AI Models',
                author: 'Sprouts Orgs Mentors',
                isPublished: true,
                tags: ['python', 'AI', 'machine learning', 'deep learning', 'tensorflow'],
                views: 2890,
            },
        ]);
        console.log('📝 Blogs seeded (8 records)');

        // ──────────── LEADS ────────────
        await Lead.insertMany([
            { name: 'Karthik Subramanian', email: 'karthik@techstart.com', phone: '9876543210', service: 'Website Development', budget: '₹50,000 - ₹1,00,000', timeline: '1-2 months', message: 'Need a corporate website and admin panel for our logistics startup.', status: 'new', source: 'website' },
            { name: 'Neha Gupta', email: 'neha@fashionhub.in', phone: '9123456780', service: 'Website Development', budget: '₹25,000 - ₹50,000', timeline: '2-4 weeks', message: 'Looking for an e-commerce store for our fashion brand with Razorpay integration.', status: 'contacted', source: 'instagram' },
            { name: 'Suresh Babu', email: 'suresh@agroindia.com', phone: '9988776655', service: 'Software Development', budget: '₹1,00,000 - ₹3,00,000', timeline: '3-6 months', message: 'Need an ERP system for our agricultural supply chain management.', status: 'converted', source: 'referral' },
            { name: 'Preethi Nair', email: 'preethi@healthclinic.com', phone: '8877665544', service: 'Software Development', budget: '₹50,000 - ₹1,00,000', timeline: '2-3 months', message: 'Patient appointment and records management mobile app needed.', status: 'new', source: 'google' },
            { name: 'Ajay Mehta', email: 'ajay.mba@gmail.com', phone: '7766554433', service: 'Digital Marketing', budget: '₹15,000 - ₹25,000', timeline: 'Ongoing monthly', message: 'Need Instagram + Google Ads management for our food delivery brand.', status: 'contacted', source: 'facebook' },
            { name: 'Divyashree R', email: 'divya@btech2024.edu', phone: '9001122334', service: 'Student Projects & EdTech Solutions', budget: '₹5,000 - ₹15,000', timeline: '1-2 months', message: 'Need help with my final year NLP project on sentiment analysis of social media data.', status: 'new', source: 'college' },
            { name: 'Venkatesh Iyer', email: 'venkat@codingbootcamp.in', phone: '8800990011', service: 'Internship / Training Programs', budget: '₹10,000 - ₹20,000', timeline: '3 months', message: 'Want to enroll 5 students from our coding bootcamp in the full-stack internship.', status: 'converted', source: 'website' },
            { name: 'Sowmya Krishnan', email: 'sowmya@realestate.com', phone: '9955441122', service: 'Website Development', budget: '₹30,000 - ₹60,000', timeline: '1 month', message: 'Need a real estate listing website with property search, filters, and contact forms.', status: 'closed', source: 'referral' },
            { name: 'Rahul Tripathi', email: 'rahul.trips@gmail.com', phone: '9876001234', service: 'Digital Marketing', budget: '₹20,000 - ₹40,000', timeline: 'Ongoing', message: 'SEO and content marketing for our travel blog. Currently getting 500 sessions/month, want to scale to 10,000.', status: 'new', source: 'google' },
            { name: 'Manoj Pillai', email: 'manoj@logistics.io', phone: '7788991100', service: 'Software Development', budget: '₹2,00,000+', timeline: '6+ months', message: 'Fleet management SaaS platform for 300+ vehicles with GPS tracking and driver analytics.', status: 'contacted', source: 'linkedin' },
        ]);
        console.log('👥 Leads seeded (10 records)');

        // ──────────── SUBSCRIPTIONS ────────────
        await Subscription.insertMany([
            { email: 'techie@gmail.com', source: 'newsletter' },
            { email: 'student2024@college.edu', source: 'blog' },
            { email: 'founder@startup.in', source: 'newsletter' },
            { email: 'developer.india@gmail.com', source: 'blog' },
            { email: 'marketing.guru@agency.com', source: 'newsletter' },
            { email: 'hr@techcompany.in', source: 'website' },
            { email: 'freelancer.web@gmail.com', source: 'blog' },
            { email: 'ceo.sme@business.com', source: 'newsletter' },
            { email: 'college.student@vit.edu', source: 'blog' },
            { email: 'investor@vc.in', source: 'newsletter' },
            { email: 'teacher@school.edu', source: 'website' },
            { email: 'appdev.mobile@gmail.com', source: 'blog' },
        ]);
        console.log('📧 Subscriptions seeded (12 records)');

        console.log('\n🎉 All data seeded successfully!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📌 Admin Login: admin@sproutsorgs.com | Admin@123');
        console.log('📌 Admin 2:     ravi@sproutsorgs.com  | Admin@123');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seed error:', err);
        process.exit(1);
    }
};

seed();
