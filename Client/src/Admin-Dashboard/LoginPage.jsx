import { useState, } from "react";

export default function LoginPage () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    async function handleSubmit() {
        if (!email || !password) {
            alert('fill it guy');
            return;
        }

        try {
            const resp = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email, password })
            });

            const data = await resp.json();

            if (resp.ok) {
                window.location.href = '/dashboard'; //this force reloads, making way for context to work.
            } else {
                alert(data.error); // "Invalid credentials"
            }

        } catch (err) {
            alert('Something went wrong, try again');
            console.error(err);
        }
    }

    return (
        <div>
            <input type='email' className="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="email" required={true}/>
            <input type='password' className="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="password" required/>
            <button type='submit' onClick={handleSubmit} >Bro, done 👍</button>
        </div>
    );
}

