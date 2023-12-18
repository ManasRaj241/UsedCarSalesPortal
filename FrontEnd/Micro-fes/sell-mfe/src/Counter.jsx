import { useState } from "react";

const Counter = () => {
    const [count, setCount] = useState(0);
    return (
        <>
            <div>Count = {count}</div>
            <button onClick={() => setCount(count + 1)}>Add Count</button>
        </>
    )
}

export default Counter;