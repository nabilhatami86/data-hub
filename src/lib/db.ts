export const documents = [
  {
    id: 1,
    header: "Cover page",
    type: "Cover page",
    status: "In Process",
    target: "18",
    limit: "5",
    reviewer: "Eddie Lake",
  },
  {
    id: 2,
    header: "Table of contents",
    type: "Table of contents",
    status: "Done",
    target: "29",
    limit: "24",
    reviewer: "Eddie Lake",
  },
  {
    id: 3,
    header: "Executive summary",
    type: "Narrative",
    status: "Done",
    target: "10",
    limit: "13",
    reviewer: "Eddie Lake",
  },
  {
    id: 4,
    header: "Technical approach",
    type: "Narrative",
    status: "Done",
    target: "27",
    limit: "23",
    reviewer: "Jamik Tashpulatov",
  },
];

// ------------------------ LIFECYCLE
export const lifecycle = [
  {
    id: "L1",
    stage: "Initiation",
    progress: 45,
    owner: "Eddie Lake",
    status: "In Progress",
  },
  {
    id: "L2",
    stage: "Planning",
    progress: 88,
    owner: "Emily Duncan",
    status: "Done",
  },
  {
    id: "L3",
    stage: "Execution",
    progress: 60,
    owner: "Jamik Tashpulatov",
    status: "In Progress",
  },
  {
    id: "L4",
    stage: "Monitoring",
    progress: 30,
    owner: "Carlos Rivera",
    status: "Delayed",
  },
  {
    id: "L5",
    stage: "Closing",
    progress: 15,
    owner: "Sarah James",
    status: "Not Started",
  },
];

// ------------------------ PROJECTS
export const projects = [
  {
    id: "P1",
    name: "Healthcare AI Platform",
    budget: 85000,
    progress: 72,
    manager: "Eddie Lake",
    status: "Active",
  },
  {
    id: "P2",
    name: "E-Learning Mobile App",
    budget: 42000,
    progress: 40,
    manager: "Nina Patel",
    status: "In Progress",
  },
  {
    id: "P3",
    name: "IoT Security Framework",
    budget: 110000,
    progress: 90,
    manager: "Michael Chen",
    status: "Completed",
  },
  {
    id: "P4",
    name: "Cloud Migration Initiative",
    budget: 65000,
    progress: 10,
    manager: "Sophia Martinez",
    status: "Not Started",
  },
];

// ------------------------ ANALYTICS
export const analytics = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
];

// ------------------------ TEAM
export const team = [
  {
    id: "T1",
    name: "Eddie Lake",
    role: "Project Manager",
    email: "eddie@example.com",
    status: "Active",
  },
  {
    id: "T2",
    name: "Jamik Tashpulatov",
    role: "Lead Developer",
    email: "jamik@example.com",
    status: "Active",
  },
  {
    id: "T3",
    name: "Emily Whalen",
    role: "UI/UX Designer",
    email: "emily@example.com",
    status: "On Leave",
  },
];

// ------------------------ WORD ASSISTANT
export const wordAssistant = [
  {
    id: "W1",
    title: "System Architecture Overview",
    lastEdited: "2 hours ago",
  },
  { id: "W2", title: "Deployment Strategy Draft", lastEdited: "Yesterday" },
  { id: "W3", title: "User Personas Revision", lastEdited: "3 days ago" },
];

// ------------------------ GLOBAL EXPORT
export const db = {
  documents,
  lifecycle,
  projects,
  analytics,
  team,
  wordAssistant,
};

export default db;
