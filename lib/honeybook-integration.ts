// HoneyBook API Integration
// API Key: 943cdea5-c7ff-41d3-a24e-5927a7183dbf

const HONEYBOOK_API_KEY = '943cdea5-c7ff-41d3-a24e-5927a7183dbf';
const HONEYBOOK_API_BASE = 'https://api.honeybook.com/v2';

export interface HoneyBookContact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
}

export interface HoneyBookProject {
  id: string;
  name: string;
  status: string;
  client: HoneyBookContact;
  created_at: string;
  updated_at: string;
}

export interface HoneyBookTask {
  id: string;
  name: string;
  status: string;
  due_date?: string;
  project_id: string;
}

// API Request Helper
async function honeybookRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
  const url = `${HONEYBOOK_API_BASE}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${HONEYBOOK_API_KEY}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`HoneyBook API Error: ${error.message || response.statusText}`);
  }

  return response.json();
}

// Get all contacts from HoneyBook
export async function getHoneyBookContacts(): Promise<HoneyBookContact[]> {
  try {
    const data = await honeybookRequest('/contacts');
    return data.data || [];
  } catch (error) {
    console.error('Error fetching HoneyBook contacts:', error);
    throw error;
  }
}

// Get all projects from HoneyBook
export async function getHoneyBookProjects(): Promise<HoneyBookProject[]> {
  try {
    const data = await honeybookRequest('/projects');
    return data.data || [];
  } catch (error) {
    console.error('Error fetching HoneyBook projects:', error);
    throw error;
  }
}

// Create a new contact in HoneyBook
export async function createHoneyBookContact(contact: Partial<HoneyBookContact>): Promise<HoneyBookContact> {
  try {
    const data = await honeybookRequest('/contacts', {
      method: 'POST',
      body: JSON.stringify(contact),
    });
    return data.data;
  } catch (error) {
    console.error('Error creating HoneyBook contact:', error);
    throw error;
  }
}

// Create a new project in HoneyBook
export async function createHoneyBookProject(project: Partial<HoneyBookProject>): Promise<HoneyBookProject> {
  try {
    const data = await honeybookRequest('/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    });
    return data.data;
  } catch (error) {
    console.error('Error creating HoneyBook project:', error);
    throw error;
  }
}

// Sync dashboard lead to HoneyBook
export async function syncLeadToHoneyBook(lead: any): Promise<HoneyBookContact> {
  const contact = {
    name: `${lead.firstName} ${lead.lastName}`,
    email: lead.email,
    phone: lead.phone || '',
    company: lead.company || '',
    website: lead.website || '',
  };

  return await createHoneyBookContact(contact);
}

// Sync dashboard booking to HoneyBook project
export async function syncBookingToHoneyBook(booking: any, clientId: string): Promise<HoneyBookProject> {
  const project = {
    name: booking.title,
    status: 'active',
    client_id: clientId,
  };

  return await createHoneyBookProject(project);
}

// Test HoneyBook connection
export async function testHoneyBookConnection(): Promise<boolean> {
  try {
    await honeybookRequest('/contacts?limit=1');
    return true;
  } catch (error) {
    console.error('HoneyBook connection test failed:', error);
    return false;
  }
}