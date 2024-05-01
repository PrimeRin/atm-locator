export const fetchAtmData = async () => {
   try {
      const cachedData = localStorage.getItem('atmData');
      if (cachedData) {
        return JSON.parse(cachedData);
      }
  
      const response = await fetch(`http://localhost:8082/atm_info`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      localStorage.setItem('atmData', JSON.stringify(data));
      return data;
   } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
      return null;
   }
  };
  