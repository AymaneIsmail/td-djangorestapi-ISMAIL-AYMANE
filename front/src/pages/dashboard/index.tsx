import { api } from "@/api/client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";


export default function Dashbord() {

    const welcomeMessage = "Bienvenue !";
    const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    async function getToken() {
        const response = await fetch('http://127.0.0.1:8000/api/v1/auth-token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'admin',
                password: 'adminpassword',
            }),
        });
        const json = await response.json();
        console.log('Token:', json.token);
    }
    getToken();

    async function testConn() {
      
        const response = await fetch('http://127.0.0.1:8000/api/v1/project/', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Token 2e7798af8e9ddea2138e672b7b1403b7e9f651b1'
            },
        })
        const json = await response.json();
    }

    testConn();
}, []);

console.log('Token:', token);

    return (
        <div>
            <h1>{welcomeMessage}</h1>
            <Button type="button">
                Voir le message secret
            </Button>
        </div>
    );
}