import type { Ministry } from './types';

// Mock data to simulate a backend database
const mockMinistries: Ministry[] = [
  { id: '1', title: 'Worship Services', description: 'Join us every Sunday for a time of passionate worship and powerful word.', imageUrl: '/assets/Photos/Image3.jpg' },
  { id: '2', title: 'Discipleship Groups', description: 'Grow in your faith journey with a community of believers.', imageUrl: '/assets/Photos/discipleship1.jpg' },
  { id: '3', title: 'Youth Ministry', description: 'Empowering the next generation to lead and serve.', imageUrl: '/assets/Photos/youth1.jpg' },
  { id: '4', title: 'Outreach Programs', description: 'Being the hands and feet of Jesus to our local community.', imageUrl: '/assets/Photos/Image4.jpg' },
];

// Simulate an API fetch call
export const fetchMinistries = async (): Promise<Ministry[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockMinistries), 800)); // 800ms fake delay
};