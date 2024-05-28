export const atmCount = async (type) => {
    let url;
    if (type === 'bank') {
      url = `http://localhost:8082/atm_count?type=bank`;
    } 

    if (type === 'dzongkhag') {
      url = `http://localhost:8082/atm_count?type=dzongkhag`;
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
  