// app/dashboard/page.jsx
import { protectRoute } from '@/lib/auth';

export default async function StudentDashboard() {
  const session = await protectRoute();
  
  // If we get here, the session is valid
  return <div>Dashboard Content</div>;
}