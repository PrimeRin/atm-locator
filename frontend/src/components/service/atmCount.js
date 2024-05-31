export const atmCount = async (type) => {
  const backend = process.env.REACT_APP_BACKEND_URL;
    let url;
    if (type === 'bank') {
      url = `${backend}/atm_count?type=bank`;
    } 

    if (type === 'dzongkhag') {
      url = `${backend}/atm_count?type=dzongkhag`;
    }
  
    const token = localStorage.getItem('jwtToken');
    console.log('jwt token', token); 
  
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
    };
  
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data;
  };
  