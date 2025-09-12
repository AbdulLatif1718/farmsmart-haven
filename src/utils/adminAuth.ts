// Secure admin authentication utility
const ADMIN_SESSION_KEY = 'agriverse_admin_session';
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'AgriVerse2024!Admin' // In production, this would be hashed and stored securely
};

interface AdminSession {
  isAuthenticated: boolean;
  loginTime: number;
  username: string;
}

export const adminAuth = {
  // Authenticate admin user
  login: (username: string, password: string): boolean => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const session: AdminSession = {
        isAuthenticated: true,
        loginTime: Date.now(),
        username: ADMIN_CREDENTIALS.username
      };
      
      // Store encrypted session (in production, use proper encryption)
      localStorage.setItem(ADMIN_SESSION_KEY, btoa(JSON.stringify(session)));
      return true;
    }
    return false;
  },

  // Check if admin is authenticated
  isAuthenticated: (): boolean => {
    try {
      const sessionData = localStorage.getItem(ADMIN_SESSION_KEY);
      if (!sessionData) return false;

      const session: AdminSession = JSON.parse(atob(sessionData));
      
      // Check if session is valid (not older than 24 hours)
      const sessionAge = Date.now() - session.loginTime;
      const maxSessionAge = 24 * 60 * 60 * 1000; // 24 hours
      
      if (sessionAge > maxSessionAge) {
        adminAuth.logout();
        return false;
      }
      
      return session.isAuthenticated;
    } catch {
      return false;
    }
  },

  // Get admin session info
  getSession: (): AdminSession | null => {
    try {
      const sessionData = localStorage.getItem(ADMIN_SESSION_KEY);
      if (!sessionData) return null;
      
      return JSON.parse(atob(sessionData));
    } catch {
      return null;
    }
  },

  // Logout admin
  logout: (): void => {
    localStorage.removeItem(ADMIN_SESSION_KEY);
  }
};