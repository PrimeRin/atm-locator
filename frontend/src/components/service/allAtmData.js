
export const allAtmData = async () => {
    let url = 'http://localhost:8082/all_atms';
    const response = await fetch(url);
    const data = await response.json();
    return data;
};
