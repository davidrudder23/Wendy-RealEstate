import React from 'react'

const RadioSelector = React.memo(({ register, required, name, array }) => {

    const selectedVal = React.createRef();

    // To create a radio group you must used uncontrolled components.
    // Documentation: https://reactjs.org/docs/uncontrolled-components.html

    return (
        <div style={{ display: "flex", flexDirection: "column"}}>
            {array.map((value) => (
                <label key={value}>
                    <input key={value} name={name} type="radio" value={value} defaultChecked={selectedVal === "test2"} ref={register({ required: required })} />
                    {value}
                </label>
            ))}
        </div>
    )
})

export default RadioSelector
