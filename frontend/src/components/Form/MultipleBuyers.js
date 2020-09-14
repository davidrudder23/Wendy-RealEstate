import React from 'react';
import InputField from "./InputField";
import * as S from "./FormStyled"

const buyerCountToText = ["Second", "Third","Fourth","Fifth", "Sixth", "Seventh", "Eighth", "Ninth", "Tenth"];
let buyers = ["Second"];

const MultipleBuyers = ({errors, register, required }) => {
    const [buyerCount, setBuyerCount] = React.useState(1);
    const MAX_BUYERS = 9;
    const addBuyerRef = React.createRef();

    const increaseBuyerCount = (event) => {
        event.preventDefault();
        if(buyerCount < MAX_BUYERS){
            setBuyerCount(buyerCount+1);
            buyers.push(buyerCountToText[buyerCount]);
        }
    }

    const decreaseBuyerCount = (event) => {
        event.preventDefault();
        setBuyerCount(buyerCount-1);
        buyers.pop();
    }

    let firstBuyerError = 
    errors.firstBuyersFirstName && 
    errors.firstBuyersLastName && 
    errors.firstBuyersPhoneNumber && 
    errors.firstBuyersFullAddress &&
    errors.firstBuyersEmailAddress;

    return (
        <>
            <S.FieldWrapper error={firstBuyerError}>
                        <S.FieldTitle>First Buyer</S.FieldTitle>
                        <div style={{ display: "flex", flexDirection: "row"}}>
                            <InputField name="firstBuyersFirstName" label="First Name" errors={errors.firstBuyersFirstName} register={register} required={true}/>
                            <InputField name="firstBuyersLastName" label="Last Name" errors={errors.firstBuyersLastName} register={register} required={true}/>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row"}}>
                            <InputField name="firstBuyersPhoneNumber" label="Phone Number" errors={errors.firstBuyersPhoneNumber} register={register} required={true}/>
                            <InputField name="firstBuyersEmailAddress" label="Email Address" errors={errors.firstBuyersEmailAddress} register={register} required={true}/>
                        </div>
                        <div>
                            <InputField name="firstBuyersFullAddress" label="Full Address" errors={errors.firstBuyersFullAddress} register={register} required={true}/>
                        </div>
            </S.FieldWrapper>
            {buyers.map(value => (
                <S.FieldWrapper error={false} key={value}>
                        <S.FieldTitle>{value} Buyer</S.FieldTitle>
                        <div style={{ display: "flex", flexDirection: "row"}}>
                            <InputField name={`${value}BuyersFirstName`} label="First Name" errors={false} register={register} required={false}/>
                            <InputField name={`${value}BuyersLastName`} label="Last Name" errors={false} register={register} required={false}/>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row"}}>
                            <InputField name={`${value}BuyersPhoneNumber`} label="Phone Number" errors={false} register={register} required={false}/>
                            <InputField name={`${value}BuyersEmailAddress`} label="Email Address" errors={false} register={register} required={false}/>
                        </div>
                        <div>
                            <InputField name={`${value}BuyersFullAddress`} label="Full Address" errors={errors.firstBuyersFullAddress} register={register} required={false}/>
                        </div>
            </S.FieldWrapper>
            ))}
            { buyerCount === MAX_BUYERS ? <S.Button ref={addBuyerRef}>Max Buyer Count Reached</S.Button> : <S.Button ref={addBuyerRef} onClick={increaseBuyerCount}>Add Buyer</S.Button> }
            { buyerCount > 0 || MAX_BUYERS === buyerCount ? <S.Button style={{ float: "right" }} onClick={decreaseBuyerCount}>Remove Buyer</S.Button> : null }
        </>
    )
}

export default MultipleBuyers

// import React, { useState } from "react";
 
// function App() {
//   const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);
 
//   // handle input change
//   const handleInputChange = (e, index) => {
//     const { name, value } = e.target;
//     const list = [...inputList];
//     list[index][name] = value;
//     setInputList(list);
//   };
 
//   // handle click event of the Remove button
//   const handleRemoveClick = index => {
//     const list = [...inputList];
//     list.splice(index, 1);
//     setInputList(list);
//   };
 
//   // handle click event of the Add button
//   const handleAddClick = () => {
//     setInputList([...inputList, { firstName: "", lastName: "" }]);
//   };
 
//   return (
//     <div className="App">
//       <h3><a href="https://cluemediator.com">Clue Mediator</a></h3>
//       {inputList.map((x, i) => {
//         return (
//           <div className="box">
//             <input
//               name="firstName"
//    placeholder="Enter First Name"
//               value={x.firstName}
//               onChange={e => handleInputChange(e, i)}
//             />
//             <input
//               className="ml10"
//               name="lastName"
//    placeholder="Enter Last Name"
//               value={x.lastName}
//               onChange={e => handleInputChange(e, i)}
//             />
//             <div className="btn-box">
//               {inputList.length !== 1 && <button
//                 className="mr10"
//                 onClick={() => handleRemoveClick(i)}>Remove</button>}
//               {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
//             </div>
//           </div>
//         );
//       })}
//       <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
//     </div>
//   );
// }
 
// export default App;