import axios  from 'axios';

//URLs for the services
const urlPica = process.env.PICAGEM_URL; // Replace with your actual API endpoint
const urlNotif = process.env.NOTIFICATION_URL; // Replace with your actual API endpoint

//Details for the "Picagem" service
const user = process.env.PICAGEM_USER;
const pass = process.env.PICAGEM_PASS;
const companyCode = process.env.PICAGEM_COMPANY_CODE;
const companyPath = process.env.PICAGEM_COMPANY_PATH;

// Function to make the HTTP request to the specified URL with a random delay
const callUrlWithRandomDelay = async (tipoDePicagem) => {
    const randomDelay = Math.floor(Math.random() * 0); // Random delay between 0 and 10 minutes
    console.log(`[${new Date().toISOString()}}] [${tipoDePicagem}] Waiting for ${randomDelay} minutes before making the HTTP requests`);

    //setTimeout(async () => {

        try {
            const bodyPica = `codigo=${user}&senha=${pass}&tipo_movimento=${encodeURIComponent(tipoDePicagem)}&lat=38.6465792&lon=-9.043968&pontocontrolo=false&pontocontroloid=0&empresa_id=${companyCode}&empresa_url=${companyPath}&is_root=false&modulo_pausas=false`
            const response = await axios.post(urlPica, bodyPica);
            const body = response.data;
            console.log(`[${new Date().toISOString()}}] [${tipoDePicagem}] HTTP request to "Picagem" successful. Response: "${body.msg}"`);
        } catch (error) {
            console.log(`[${new Date().toISOString()}}] [${tipoDePicagem}] Error making HTTP request to "Picagem": ${error.message}`);
        }

        try {
            const response = await axios.post(urlNotif, `Picagem de ${tipoDePicagem}`);
            console.log(`[${new Date().toISOString()}}] [${tipoDePicagem}] HTTP request to NTFY successful.`);
        } catch (error) {
            console.log(`[${new Date().toISOString()}}] [${tipoDePicagem}] Error making HTTP request to NTFY: ${error.message}`);
        }

    //}, randomDelay * 60 * 1000); // Convert minutes to milliseconds
};

callUrlWithRandomDelay("Entrada");

console.log('Scheduled tasks for every working day at 7:55, 11:55, 12:55, and 16:55 with random [0-10] minute delays.');