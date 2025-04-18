import React, { useEffect, useState } from 'react'

const EmojiFinder = () => {
    
    const [emojis, setEmojis] = useState([]);
    const [search, setSearch] = useState("");

    const toEmojiChar = (unified) => {
        return String.fromCodePoint(...unified.split('-').map(u => parseInt(u, 16)));
    };

    useEffect(() => {
        // Fetch JSON file from public folder
        const fetchEmojis = async () => {
            try {
                const response = await fetch('/emoji.json'); // 👈 make sure it's in /public
                const data = await response.json(); // 👈 this must be awaited directly after fetch
                setEmojis(data);
            } catch (error) {
                console.error('Error fetching emoji data:', error);
            }
        };
    
        fetchEmojis(); // Call the async function
    },[])

    const getFilteredEmojis = () => {
        if(search!=='')
        return emojis.filter((emoji) => emoji.name.toLowerCase().includes(search.toLowerCase()))

        return emojis
    }

    const copyColor = (emoji_name) => {
        navigator.clipboard.writeText(emoji_name);
        alert('Emoji Name Copied')
    }

    const filteredEmojis = getFilteredEmojis();
    
    return (
        <div>
            <input name='search' className='form-control' placeholder='Search Here' onChange={(e) => setSearch(e.target.value)} />
            <h2>Emoji Names</h2>
            <ul className="list-group">
            {filteredEmojis.length && filteredEmojis.map((emoji, index) => (
                <li key={index} className={`list-group-item d-flex justify-content-between align-items-start`}>
                    <div className='ms-2 me-auto'>
                        <label 
                        className="form-check-label" 
                        htmlFor={`index`}
                        >{toEmojiChar(emoji.unified)} — {emoji.name}</label>
                    </div>
                    <span className="badge text-bg-primary rounded-pill" onClick={()=>copyColor(emoji.name)} style={{cursor: 'pointer'}}>
                        Copy
                    </span>
                </li>
            ))}
            </ul>
        </div>
    )
}

export default EmojiFinder