

export async function mikrotikRequest(ip, username, password, port, commands = []) {
    // const url = `https://${ip}:${port}/api`;
    const url = `http://${ip}/rest`;
    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa(`${username}:${password}`),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(commands)
    };

    try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error connecting to MikroTik:', error);
        return null;
    }
}
