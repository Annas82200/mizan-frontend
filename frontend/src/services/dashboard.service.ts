import apiClient from '@/lib/api-client';

// ============================================
// SUPERADMIN API SERVICES
// ============================================

export const superadminService = {
  // Dashboard Home
  async getStats() {
    const response = await apiClient.get('/api/superadmin/stats');
    return response.data;
  },

  async getTenants(params?: { page?: number; limit?: number; search?: string; plan?: string; status?: string }) {
    const response = await apiClient.get('/api/superadmin/tenants', { params });
    return response.data;
  },

  async getRevenue(params?: { timeRange?: string }) {
    const response = await apiClient.get('/api/superadmin/revenue', { params });
    return response.data;
  },

  async getActivity(params?: { limit?: number }) {
    const response = await apiClient.get('/api/superadmin/activity', { params });
    return response.data;
  },

  // Tenant Management
  async getTenantById(id: number) {
    const response = await apiClient.get(`/api/superadmin/tenants/${id}`);
    return response.data;
  },

  async createTenant(data: any) {
    const response = await apiClient.post('/api/superadmin/tenants', data);
    return response.data;
  },

  async updateTenant(id: number, data: any) {
    const response = await apiClient.put(`/api/superadmin/tenants/${id}`, data);
    return response.data;
  },

  async suspendTenant(id: number) {
    const response = await apiClient.post(`/api/superadmin/tenants/${id}/suspend`);
    return response.data;
  },

  async impersonateTenant(id: number) {
    const response = await apiClient.post(`/api/superadmin/tenants/${id}/impersonate`);
    return response.data;
  },

  // System Analytics
  async getUsageStats(params?: { timeRange?: string }) {
    const response = await apiClient.get('/api/superadmin/analytics/usage', { params });
    return response.data;
  },

  async getApiStats(params?: { timeRange?: string }) {
    const response = await apiClient.get('/api/superadmin/analytics/api', { params });
    return response.data;
  },

  async getAgentStats(params?: { timeRange?: string }) {
    const response = await apiClient.get('/api/superadmin/analytics/agents', { params });
    return response.data;
  },

  async getPerformanceMetrics(params?: { timeRange?: string }) {
    const response = await apiClient.get('/api/superadmin/analytics/performance', { params });
    return response.data;
  },

  // Module Access (with tenant selector)
  async runStructureAnalysis(tenantId: number, data: any) {
    const response = await apiClient.post(`/api/superadmin/structure/analyze?tenantId=${tenantId}`, data);
    return response.data;
  },

  async getStructureReports(tenantId: number) {
    const response = await apiClient.get(`/api/superadmin/structure/reports?tenantId=${tenantId}`);
    return response.data;
  },

  async runCultureAnalysis(tenantId: number, data: any) {
    const response = await apiClient.post(`/api/superadmin/culture/analyze?tenantId=${tenantId}`, data);
    return response.data;
  },

  async getCultureReports(tenantId: number) {
    const response = await apiClient.get(`/api/superadmin/culture/reports?tenantId=${tenantId}`);
    return response.data;
  },

  // Billing & Revenue
  async getBillingOverview() {
    const response = await apiClient.get('/api/superadmin/billing/overview');
    return response.data;
  },

  async getInvoices(params?: { page?: number; limit?: number }) {
    const response = await apiClient.get('/api/superadmin/billing/invoices', { params });
    return response.data;
  },
};

// ============================================
// ADMIN API SERVICES
// ============================================

export const adminService = {
  // Dashboard Home
  async getOverview() {
    const response = await apiClient.get('/api/admin/overview');
    return response.data;
  },

  async getCylinderHealth() {
    const response = await apiClient.get('/api/admin/cylinders/health');
    return response.data;
  },

  async getRecentAnalyses() {
    const response = await apiClient.get('/api/admin/analyses/recent');
    return response.data;
  },

  // Structure Analysis
  async uploadOrgChart(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post('/api/admin/structure/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  async analyzeStructure(data: any) {
    const response = await apiClient.post('/api/admin/structure/analyze', data);
    return response.data;
  },

  async getStructureReports() {
    const response = await apiClient.get('/api/admin/structure/reports');
    return response.data;
  },

  // Culture Analysis
  async launchCultureSurvey(data: any) {
    const response = await apiClient.post('/api/admin/culture/survey/launch', data);
    return response.data;
  },

  async getCultureResults() {
    const response = await apiClient.get('/api/admin/culture/results');
    return response.data;
  },

  // Team Management
  async getEmployees(params?: { page?: number; limit?: number; search?: string }) {
    const response = await apiClient.get('/api/admin/employees', { params });
    return response.data;
  },

  async createEmployee(data: any) {
    const response = await apiClient.post('/api/admin/employees', data);
    return response.data;
  },

  async updateEmployee(id: number, data: any) {
    const response = await apiClient.put(`/api/admin/employees/${id}`, data);
    return response.data;
  },

  async deleteEmployee(id: number) {
    const response = await apiClient.delete(`/api/admin/employees/${id}`);
    return response.data;
  },
};

// ============================================
// EMPLOYEE API SERVICES
// ============================================

export const employeeService = {
  // Dashboard Home
  async getDashboard() {
    const response = await apiClient.get('/api/employee/dashboard');
    return response.data;
  },

  async getMyProfile() {
    const response = await apiClient.get('/api/employee/profile');
    return response.data;
  },

  async updateMyProfile(data: any) {
    const response = await apiClient.put('/api/employee/profile', data);
    return response.data;
  },

  // Growth & Skills
  async getMySkills() {
    const response = await apiClient.get('/api/employee/skills');
    return response.data;
  },

  async getLearningPaths() {
    const response = await apiClient.get('/api/employee/learning/paths');
    return response.data;
  },

  // Performance
  async getMyGoals() {
    const response = await apiClient.get('/api/employee/goals');
    return response.data;
  },

  async getMyFeedback() {
    const response = await apiClient.get('/api/employee/feedback');
    return response.data;
  },

  // Team
  async getMyTeam() {
    const response = await apiClient.get('/api/employee/team');
    return response.data;
  },
};

// ============================================
// SHARED/COMMON SERVICES
// ============================================

export const commonService = {
  async getNotifications() {
    const response = await apiClient.get('/api/notifications');
    return response.data;
  },

  async markNotificationRead(id: number) {
    const response = await apiClient.put(`/api/notifications/${id}/read`);
    return response.data;
  },

  async getCurrentUser() {
    const response = await apiClient.get('/api/auth/me');
    return response.data;
  },
};

// ============================================
// SOCIAL MEDIA SERVICES
// ============================================

export const socialMediaService = {
  async generate(data: {
    platform: string;
    contentPillar: string;
    topic: string;
    targetAudience?: string;
    includeVisuals?: boolean;
  }) {
    // Single post generation with AI takes 20-30 seconds
    const response = await apiClient.post('/api/social-media/generate', data, {
      timeout: 60000 // 1 minute
    });
    return response.data;
  },

  async generateBatch(week: number) {
    // Batch generation takes ~60-90 seconds (3 posts x 3 AI providers each)
    const response = await apiClient.post('/api/social-media/generate-batch', { week }, {
      timeout: 180000 // 3 minutes
    });
    return response.data;
  },

  async getTemplates() {
    const response = await apiClient.get('/api/social-media/templates');
    return response.data;
  },

  async getStrategy() {
    const response = await apiClient.get('/api/social-media/strategy');
    return response.data;
  },

  // Buffer Integration
  async scheduleToBuffer(data: {
    content: string;
    profileIds: string[];
    scheduledAt?: string;
    mediaUrl?: string;
  }) {
    const response = await apiClient.post('/api/social-media/schedule-to-buffer', data);
    return response.data;
  },

  async getBufferProfiles() {
    const response = await apiClient.get('/api/social-media/buffer/profiles');
    return response.data;
  },

  async getBufferPendingPosts(profileId: string) {
    const response = await apiClient.get(`/api/social-media/buffer/pending/${profileId}`);
    return response.data;
  },

  async deleteBufferPost(postId: string) {
    const response = await apiClient.delete(`/api/social-media/buffer/post/${postId}`);
    return response.data;
  },

  async getBufferAnalytics(postId: string) {
    const response = await apiClient.get(`/api/social-media/buffer/analytics/${postId}`);
    return response.data;
  },
};
