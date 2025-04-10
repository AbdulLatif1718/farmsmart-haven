
// Initialize the theme based on localStorage
export const initializeTheme = (): void => {
  // Check for saved theme
  const savedTheme = localStorage.getItem('theme');
  
  // If theme is saved as dark, apply dark class
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};
