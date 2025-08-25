// Mock data for milestone tracker
export const mockMilestones = [
  {
    id: 1,
    title: "Project Kickoff",
    description: "Initial project setup and team alignment meeting",
    achieveDate: "2024-01-15",
    completed: true,
    completedDate: "2024-01-14"
  },
  {
    id: 2,
    title: "Requirements Analysis",
    description: "Complete requirements gathering and documentation for the milestone tracking system",
    achieveDate: "2024-02-01",
    completed: true,
    completedDate: "2024-01-30"
  },
  {
    id: 3,
    title: "Backend Development",
    description: "Implement Spring Boot REST API with PostgreSQL database",
    achieveDate: "2024-02-28",
    completed: true,
    completedDate: "2024-02-25"
  },
  {
    id: 4,
    title: "Frontend Development",
    description: "Build React frontend with modern UI components and responsive design",
    achieveDate: "2024-03-15",
    completed: false,
    completedDate: null
  },
  {
    id: 5,
    title: "Testing & QA",
    description: "Comprehensive testing including unit tests, integration tests, and user acceptance testing",
    achieveDate: "2024-03-30",
    completed: false,
    completedDate: null
  },
  {
    id: 6,
    title: "Deployment",
    description: "Deploy application to production environment and setup monitoring",
    achieveDate: "2024-04-10",
    completed: false,
    completedDate: null
  }
];

export const addMockMilestone = (milestone) => {
  const newMilestone = {
    ...milestone,
    id: Date.now(), // Simple ID generation for mock
    completed: false,
    completedDate: null
  };
  mockMilestones.push(newMilestone);
  return newMilestone;
};

export const updateMockMilestone = (id, updates) => {
  const index = mockMilestones.findIndex(m => m.id === id);
  if (index !== -1) {
    mockMilestones[index] = { ...mockMilestones[index], ...updates };
    return mockMilestones[index];
  }
  return null;
};

export const deleteMockMilestone = (id) => {
  const index = mockMilestones.findIndex(m => m.id === id);
  if (index !== -1) {
    mockMilestones.splice(index, 1);
    return true;
  }
  return false;
};