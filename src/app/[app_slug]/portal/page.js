"use client"
import { useState, useEffect } from 'react';
import Stack, { onEntryChange } from '@/cstack';
import { DocumentIcon } from "@heroicons/react/24/outline";

export default function Page({ params }){
    const [entry, setEntry] = useState({});
    const [pageEntry, setPageEntry] = useState({});
    const [docs, setDocs] = useState([]);

    const getUserGroups = async () => {
        const config = await Stack.getElementWithPropertyWithRefs('appconfig', 'url_slug', params.app_slug, ['users.user']);
        console.log('portal', config[0])
        setPageEntry(config[0]);

        console.log(localStorage.getItem('user'));
        const entry = await Stack.getElementWithProperty('user', 'title', localStorage.getItem('user'));
        const temp = [];
        console.log('user entry', entry);
        entry[0].taxonomies.forEach((group) => {
            console.log('group', group.term_uid);
            temp.push(group.term_uid);
        })
        getContent(temp);
    }

    const getContent = async (groups) => {
        const entry = await Stack.getTaxonomies('alert', groups);
        setEntry(entry);

        const docs = await Stack.getAssets(groups);
        setDocs(docs);
    }

    useEffect(() => {
        onEntryChange(getUserGroups);
    }, []);

    return(
        <div>
            <div className="w-full bg-[#C41329]" style={{backgroundColor: pageEntry.portal?.color?.hex}}>
                <img className="h-24 mx-auto my-auto" src={pageEntry.portal?.image?.url} />
            </div>

            <div className="md:p-16 p-4">
                <p className="text-3xl font-semibold">ALERTS</p>

                <div className="border rounded-xl mt-4 bg-gray-50">
                    {Object.keys(entry).length > 0 && entry[0].map((alert, index) => {
                        console.log(alert)
                        return <p key={index} className="p-4">{alert.text}</p>
                    })}
                </div>
                
                <p className="text-3xl font-semibold mt-16 ">Documents</p>
                <div className="mt-4 rounded-xl bg-gray-50 border p-4">
                    {docs.length > 0 && docs[0].map((doc, index) => (
                        <a 
                            key={index} 
                            className={"flex " + (index > 0 ? "mt-4" : "")}
                            href={doc.url}    
                        >
                            <DocumentIcon className="h-8" />
                            <p className="my-auto ml-5 font-light">{doc.filename}</p>
                        </a>
                    ))}
                </div>
                
            </div>
        </div>
    )
}