
// Initialize the theme based on localStorage or system preference
export const initializeTheme = (): void => {
  // Check for saved theme
  const savedTheme = localStorage.getItem('theme');
  
  // Check if user has set a theme preference
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    // If no preference is set, use system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
};

// Toggle between dark and light themes
export const toggleTheme = (): void => {
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
};

// Get current theme
export const getCurrentTheme = (): 'dark' | 'light' => {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
};
