import React, {useState} from 'react';

const Parent = () => {
    return (
        <div>
            <button onClick={()=> console.log('hello')}>Click me!</button>
        </div>
    );
};

export default Parent;