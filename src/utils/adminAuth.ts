// Simple secure admin authentication system
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'AgriVerse2024!Admin' // In production, this should be hashed and stored securely
};

const ADMIN_SESSION_KEY = 'agriverse_admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export interface AdminSession {
  isAuthenticated: boolean;
  loginTime: number;
  expiresAt: number;
}

export const adminAuth = {
  // Login function
  login: (username: string, password: string): boolean => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const now = Date.now();
      const session: AdminSession = {
        isAuthenticated: true,
        loginTime: now,
        expiresAt: now + SESSION_DURATION
      };
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
      return true;
    }
    return false;
  },

  // Check if admin is authenticated
  isAuthenticated: (): boolean => {
    try {
      const sessionData = localStorage.getItem(ADMIN_SESSION_KEY);
      if (!sessionData) return false;

      const session: AdminSession = JSON.parse(sessionData);
      const now = Date.now();

      if (now > session.expiresAt) {
        // Session expired, clean up
        localStorage.removeItem(ADMIN_SESSION_KEY);
        return false;
      }

      return session.isAuthenticated;
    } catch {
      return false;
    }
  },

  // Logout function
  logout: (): void => {
    localStorage.removeItem(ADMIN_SESSION_KEY);
  },

  // Get session info
  getSession: (): AdminSession | null => {
    try {
      const sessionData = localStorage.getItem(ADMIN_SESSION_KEY);
      if (!sessionData) return null;

      const session: AdminSession = JSON.parse(sessionData);
      const now = Date.now();

      if (now > session.expiresAt) {
        localStorage.removeItem(ADMIN_SESSION_KEY);
        return null;
      }

      return session;
    } catch {
      return null;
    }
  },

  // Extend session
  extendSession: (): void => {
    const session = adminAuth.getSession();
    if (session) {
      const now = Date.now();
      session.expiresAt = now + SESSION_DURATION;
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
    }
  }
};