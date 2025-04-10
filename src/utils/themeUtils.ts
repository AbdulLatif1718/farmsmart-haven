
/**
 * Initialize theme based on user preference or system settings
 */
export const initializeTheme = () => {
  // First check for a saved theme preference in localStorage
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) {
    // Apply saved theme preference
    applyTheme(savedTheme);
    return;
  }
  
  // If no saved preference, check system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Apply theme based on system preference
  const initialTheme = prefersDark ? 'dark' : 'light';
  applyTheme(initialTheme);
  
  // Save the initial theme to localStorage
  localStorage.setItem('theme', initialTheme);
};

/**
 * Apply theme by toggling dark class on document element
 */
export const applyTheme = (theme: string) => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

/**
 * Toggle between light and dark mode
 */
export const toggleTheme = () => {
  const currentTheme = localStorage.getItem('theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  // Apply the new theme
  applyTheme(newTheme);
  
  // Save the new theme preference
  localStorage.setItem('theme', newTheme);
  
  return newTheme;
};
