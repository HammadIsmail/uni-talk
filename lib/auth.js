// lib/auth.js
"use server"
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function verifySession() {
  console.log('verifySession: Starting verification...');
  
  try {
    // Get cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    console.log('verifySession: Token exists:', !!token);
    
    if (!token) {
      console.log('verifySession: No token found');
      return null;
    }

    console.log('verifySession: Making API call to verify token...');
    
    // Include cookies in the fetch request
    const response = await fetch('https://uni-talk-backend-production.up.railway.app/api/auth/verify', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Cookie': `token=${token}` // Include cookie in request
      },
      credentials: 'include' // Include cookies
    });
    
    console.log('verifySession: API response status:', response.status);
    
    if (!response.ok) {
      console.log('verifySession: Invalid token response');
      return null;
    }
    
    const data = await response.json();
    console.log('verifySession: Success, user data:', data);
    
    // Check if the response has the expected structure
    if (!data.success || !data.user) {
      console.log('verifySession: Invalid response structure');
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('verifySession: Error during verification:', error);
    return null;
  }
}

export async function protectRoute() {
  console.log('protectRoute: Starting route protection...');
  
  const session = await verifySession();
  
  if (!session) {
    console.log('protectRoute: No session, redirecting to signup');
    redirect('/signup');
  }
  
  console.log('protectRoute: Session valid, allowing access');
  return session;
}

// Helper function to clear auth (for client components)
export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
}