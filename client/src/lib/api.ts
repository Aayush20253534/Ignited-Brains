export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  message: string;
}

export interface ApplicationPayload {
  applicantType: 'school' | 'student' | 'educator' | 'partner';
  name: string;
  email: string;
  phone: string;
  organization?: string;
  message?: string;
}

export interface ApiResponse<T = unknown> {
  message: string;
  id?: string;
  applicantType?: string;
  error?: string;
  details?: T;
}

const API_BASE = '/api/v1';

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });
  const data = (await res.json().catch(() => ({}))) as ApiResponse<T>;
  if (!res.ok) {
    throw new Error(data.error || data.message || 'Request failed');
  }
  return data;
}

export async function submitContact(payload: ContactPayload) {
  return request('/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function submitApplication(payload: ApplicationPayload) {
  return request('/applications', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
