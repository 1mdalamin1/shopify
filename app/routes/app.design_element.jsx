import { useState } from "react";

export default function SectionInstallPage() {
  const [isLoading, setIsLoading] = useState(false);

  const addSectionToTheme = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/add-section', {
        method: 'POST', // Changed from PUT to POST
        headers: {
          'Content-Type': 'application/json',
        },
        // No body needed - backend handles everything
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('Section created!', result);
        alert('Section installed successfully!');
      } else if (result.errors) {
        console.error('Failed to install section:', result.errors);
        alert(`Failed to install section: ${result.errors[0]?.message || 'Unknown error'}`);
      } else {
        alert('Failed to install section: Unknown error');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('A network error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const testClick = () => {
    console.log("Test button clicked!");
    alert('Test button was clicked!');
  };

  return (
    <div className="bufy-container">
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img className="rounded-t-lg" src="/buildify-feature.jpg" alt="Tanvir Md Al Amin" />
        </a>
        <div className="p-5">
          <a href="#">
            <div className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">A Feature Section</div>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 pb-6">
            This section will be added to your current theme. You can customize it further in the Shopify theme editor.
          </p>
          <button 
            className="bufy-btn-blue"
            onClick={addSectionToTheme} 
            disabled={isLoading}
          >
            {isLoading ? 'Installing...' : 'Install Section'}
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
          </button>
        </div>
        
        {/* <button onClick={testClick}>Test Click Alert</button> */}
      </div>
    </div>
  );
}
