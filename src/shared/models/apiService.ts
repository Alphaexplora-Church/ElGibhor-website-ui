import type { Ministry } from './types';

// Mock data to simulate a backend database
const mockMinistries: Ministry[] = [
  { id: '1', title: 'Worship Services', description: 'Join us every Sunday for a time of passionate worship and powerful word.', imageUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&q=80' },
  { id: '2', title: 'Discipleship Groups', description: 'Grow in your faith journey with a community of believers.', imageUrl: 'https://images.unsplash.com/photo-1445445290350-18a3b86e0b5b?w=800&q=80' },
  { id: '3', title: 'Youth Ministry', description: 'Empowering the next generation to lead and serve.', imageUrl: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80' },
  { id: '4', title: 'Outreach Programs', description: 'Being the hands and feet of Jesus to our local community.', imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80' },
];

// Simulate an API fetch call
export const fetchMinistries = async (): Promise<Ministry[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockMinistries), 800)); // 800ms fake delay
};