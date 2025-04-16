import React, { useState } from 'react'

const ColorChanger = () => {

    const [color, setColor] = useState('#FF6B6B');

    const colors = [
        "#FF6B6B", // Soft Red
        "#6BCB77", // Mint Green
        "#4D96FF", // Soft Blue
        "#FFD93D", // Bright Yellow
        "#FF6F91", // Coral Pink
        "#845EC2", // Purple
        "#00C9A7", // Aqua
        "#2C73D2", // Royal Blue
        "#F9F871", // Light Yellow
        "#F67280", // Rose
        "#C34A36", // Brick Red
        "#0081CF", // Sky Blue
        "#B39CD0", // Lavender
        "#FFB86F", // Peach
        "#00A8CC", // Ocean Blue
        "#FF9F1C", // Vibrant Orange
        "#70C1B3", // Teal Green
        "#F25F5C", // Watermelon Red
      ];

    const changeColor = () => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setColor(randomColor);
    }

    const copyColor = () => {
        navigator.clipboard.writeText(color);
        alert('Color Copied')
    }

    return (
        <>
            <div style={{height:'500px', width:'100%', background: color}}>
                <div className='row'>
                    <button className='btn btn-success' onClick={()=>changeColor()}>Click to Change Color</button>
                </div>
            </div>
            <div className='row'>
                <button className='btn btn-primary' onClick={() => copyColor()}>Click to Copy</button>
            </div>
        </>
    )
}

export default ColorChanger