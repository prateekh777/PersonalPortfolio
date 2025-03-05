// API client for the frontend

// Get the API URL from environment variables or use an empty string for relative URLs
const API_URL = import.meta.env.VITE_API_URL || '';

// Generic fetch function with error handling
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}

// API functions for different endpoints
export const api = {
  // Sections
  getSections: (type: string) => fetchAPI<any[]>(`/api/sections/${type}`),
  createSection: (data: any) => fetchAPI<any>('/api/sections', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateSection: (id: number, data: any) => fetchAPI<any>(`/api/sections/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
  deleteSection: (id: number) => fetchAPI<void>(`/api/sections/${id}`, {
    method: 'DELETE',
  }),

  // Projects
  getProjects: () => fetchAPI<any[]>('/api/projects'),
  createProject: (data: any) => fetchAPI<any>('/api/projects', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateProject: (id: number, data: any) => fetchAPI<any>(`/api/projects/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
  deleteProject: (id: number) => fetchAPI<void>(`/api/projects/${id}`, {
    method: 'DELETE',
  }),

  // Case Studies
  getCaseStudies: () => fetchAPI<any[]>('/api/case-studies'),
  createCaseStudy: (data: any) => fetchAPI<any>('/api/case-studies', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateCaseStudy: (id: number, data: any) => fetchAPI<any>(`/api/case-studies/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
  deleteCaseStudy: (id: number) => fetchAPI<void>(`/api/case-studies/${id}`, {
    method: 'DELETE',
  }),

  // AI Works
  getAiWorks: () => fetchAPI<any[]>('/api/ai-works'),
  createAiWork: (data: any) => fetchAPI<any>('/api/ai-works', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateAiWork: (id: number, data: any) => fetchAPI<any>(`/api/ai-works/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
  deleteAiWork: (id: number) => fetchAPI<void>(`/api/ai-works/${id}`, {
    method: 'DELETE',
  }),

  // Interests
  getInterests: () => fetchAPI<any[]>('/api/interests'),
  createInterest: (data: any) => fetchAPI<any>('/api/interests', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateInterest: (id: number, data: any) => fetchAPI<any>(`/api/interests/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
  deleteInterest: (id: number) => fetchAPI<void>(`/api/interests/${id}`, {
    method: 'DELETE',
  }),

  // Contact
  sendContactForm: (data: any) => fetchAPI<any>('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
}; 