
export const allAtmData = async () => {
    const backend = process.env.REACT_APP_BACKEND_URL;
    let url =   `${backend}/all_atms`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
};
