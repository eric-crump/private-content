"use client"
import { useState, useEffect } from 'react';

export default function Home() {
    const [entry, setEntry] = useState({});

        const getContent = async () => {
            console.log('foo');
            // const entry = await Stack.getElementWithProperty('appconfig', 'url_slug', params.app_slug);
            // console.log('page', entry)
            // setEntry(entry);
        }

        useEffect(() => {
            console.log('use effect');
        }, []);

    return (
        <div>
            stuff
        </div>
    );
}
