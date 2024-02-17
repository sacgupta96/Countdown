import React, { ChangeEvent, FC, forwardRef, useState } from "react";

type CountDownInputType = {
    value: string;
    placeholder: string;
    onHandleChange: (value: string) => void;
}


const CountDownInput = forwardRef<HTMLInputElement , CountDownInputType>(({value , placeholder , onHandleChange} , ref) =>  {
        const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
          const input = e.target;
          if(input.value.length > 2) input.value = input.value.slice(0, 2);
            onHandleChange(e.target.value)
          }
    
        return <input ref={ref} type='text' value={value} onChange={handleOnChange} placeholder={placeholder} />
    
})

export default CountDownInput;