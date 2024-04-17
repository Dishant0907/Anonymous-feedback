
import { ErrorMessage,Field } from "formik";
export const InputCred = ({id,placeholder,type,label,name}) => {
    return (
        <div className="mb-7 ">
            <label className=" text-[#754c22] block">{label}</label>
            < Field className=" text-black  p-3 rounded-md w-full focus:outline-none focus:to-blue-700"
                    type={type}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    // value={value}
                    // onChange={onChange}
                    >
                        
            </Field>
            <ErrorMessage name={name} component={'div'} className="text-red-500 bg-red-100 rounded-md p-1 m-1 text-xs"/>
        </div>
    )
}

