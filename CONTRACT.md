# Milestone Tracker - API Contracts & Integration Plan

## Backend API Endpoints (Spring Boot)

### Base URL
```
http://localhost:8080
```

### API Contracts

#### 1. GET /milestones
**Response:**
```json
[
  {
    "id": 1,
    "title": "Project Kickoff",
    "description": "Initial project setup and team alignment meeting",
    "achieveDate": "2024-01-15",
    "completed": true,
    "completedDate": "2024-01-14"
  }
]
```

#### 2. GET /milestones/{id}
**Response:**
```json
{
  "id": 1,
  "title": "Project Kickoff",
  "description": "Initial project setup and team alignment meeting",
  "achieveDate": "2024-01-15",
  "completed": true,
  "completedDate": "2024-01-14"
}
```

#### 3. POST /milestones
**Request:**
```json
{
  "title": "New Milestone",
  "description": "Description of the milestone",
  "achieveDate": "2024-03-15"
}
```
**Response:**
```json
{
  "id": 7,
  "title": "New Milestone",
  "description": "Description of the milestone",
  "achieveDate": "2024-03-15",
  "completed": false,
  "completedDate": null
}
```

#### 4. PUT /milestones/{id}
**Request:**
```json
{
  "title": "Updated Milestone",
  "description": "Updated description",
  "achieveDate": "2024-03-20",
  "completed": true,
  "completedDate": "2024-03-18"
}
```
**Response:**
```json
{
  "id": 1,
  "title": "Updated Milestone",
  "description": "Updated description",
  "achieveDate": "2024-03-20",
  "completed": true,
  "completedDate": "2024-03-18"
}
```

#### 5. DELETE /milestones/{id}
**Response:**
```
204 No Content
```

## Mock Data to Replace

### Current Mock Data (mockData.js)
- 6 predefined milestones with various completion states
- Mock functions: addMockMilestone, updateMockMilestone, deleteMockMilestone
- Client-side ID generation using Date.now()

### Integration Points

1. **Replace mockMilestones array** with API call to GET /milestones
2. **Replace addMockMilestone** with POST /milestones
3. **Replace updateMockMilestone** with PUT /milestones/{id}
4. **Replace deleteMockMilestone** with DELETE /milestones/{id}

## Backend Implementation Needed

### 1. API Service Layer (apiService.js)
```javascript
// Base configuration for axios
const API_BASE_URL = 'http://localhost:8080';

// Functions to implement:
- getAllMilestones()
- getMilestoneById(id)
- createMilestone(data)
- updateMilestone(id, data)
- deleteMilestone(id)
```



### Additional Features to Add
- 🔄 Milestone reordering (drag & drop) - requires backend order field
- 🔄 Bulk operations (mark multiple as complete)
- 🔄 Export functionality
- 🔄 Milestone categories/tags

## Testing Strategy

1. **Test all CRUD operations** with real Spring Boot API
2. **Test error scenarios** (network errors, validation errors)
3. **Test loading states** and user feedback
4. **Test responsive design** on mobile/desktop
5. **Test search and filtering** with real data
6. **Test form validation** and submission

## CORS Configuration
Ensure Spring Boot backend allows requests from http://localhost:3000

```java
@CrossOrigin(origins = "http://localhost:3000")
```