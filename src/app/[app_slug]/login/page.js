"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Stack, { onEntryChange } from '@/cstack';

export default function Page({ params }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginValid, setLoginValid] = useState(true);
    const [entry, setEntry] = useState({});
    const [users, setUsers] = useState([]);
    const router = useRouter();

    const getContent = async () => {
        const entry = await Stack.getElementWithPropertyWithRefs('appconfig', 'url_slug', params.app_slug, ['users.user']);
        console.log('page', entry[0])
        if (entry.length > 0){
            setEntry(entry[0]);
            let temp = [];
            entry[0].users?.forEach((user) => {
                temp.push(user.user[0].title);
            })
            setUsers(temp);
        }
    }

    useEffect(() => {
        onEntryChange(getContent);
    }, []);


    function login() {
        console.log('username:', username)
        console.log('users', users);
        if(users.includes(username)){
            console.log('valid');
            localStorage.setItem('user', username);
            router.push('/' + params.app_slug + '/portal');
        }
        else{
            console.log('invalid');
            setLoginValid(false);
            setUsername('');
            setPassword('');
        }
    }

    return (
        <div>
            {Object.keys(entry).length > 0 &&
                <div >
                    <div className="md:flex hidden h-screen w-screen  bg-neutral-700">
                        <div className="h-[600px] w-[800px] mx-auto my-auto flex">
                            <div
                                className="w-1/2 h-full  rounded-l-lg flex"
                                style={{ backgroundColor: entry?.login?.color?.hex }}
                            >
                                <img className="h-32 mx-auto my-auto" src={entry?.login?.image?.url} />
                            </div>
                            <div className="w-1/2 h-full bg-neutral-800 rounded-r-lg text-white flex-col">
                                <p className="text-center text-2xl font-semibold mt-32">{entry?.login?.text}</p>
                                <p className={"text-center text-xl text-red-500 m-4 " + (loginValid ? "invisible" : "")}>INVALID LOGIN</p>
                                <div className="mx-auto w-full px-16 ">
                                    <p>Please log into your account</p>
                                    <input
                                        className="bg-transparent border border-slate-500 p-1 rounded mt-4 w-full px-2"
                                        placeholder="Username"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                    >
                                    </input>
                                    <input
                                        className="bg-transparent border border-slate-500 p-1 rounded mt-4 w-full px-2"
                                        placeholder="Password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        type="password"
                                    >
                                    </input>
                                    <button
                                        className="bg-[#C41320] text-white mt-4 w-full p-2 rounded text-sm"
                                        onClick={login}
                                    >LOG IN</button>
                                    <p className="text-center mt-4">Forgot password?</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:hidden bg-neutral-800 h-screen text-white">
                        <div className=""
                            style={{ backgroundColor: entry?.login?.color?.hex }}
                        >
                            <img className="h-24 mx-auto my-auto"  src={entry?.login?.image?.url} />
                        </div>

                        <div className="px-4">
                            <p className="mt-24 text-center text-3xl font-bold">{entry?.login?.text}</p>

                            <p className="font-semibold text-lg mt-10">Please log into your account</p>

                            <input
                                className="bg-transparent border border-slate-500 p-1 rounded mt-4 w-full px-2"
                                placeholder="Username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            >
                            </input>
                            <input
                                className="bg-transparent border border-slate-500 p-1 rounded mt-4 w-full px-2"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                            >
                            </input>
                            <button
                                className="bg-[#C41320] text-white mt-4 w-full p-2 rounded text-sm"
                                onClick={login}
                            >LOG IN</button>
                            <p className="text-center mt-4">Forgot password?</p>
                        </div>
                    </div>
                </div>}
        </div>
    )
}