import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "../../assets/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../assets/icons/EyeSlashFilledIcon";

export default function InputRenderer({ className, error, required, placeholder, helperText, value, onClickShowPassword, ...props }) {
    return (         
        <Input
            value={value || ''}
            className={className + " text-left"}
            {...props}
            size="md"
            isRequired={required}
            fullWidth={true}
            isInvalid={error}
            label={placeholder}
            placeholder={"Enter " + placeholder}
            errorMessage={helperText}
            variant="bordered"
            endContent={
                (props.name === "password" || props.name === "confirmPassword") &&
                <button className="focus:outline-none" type="button" onClick={onClickShowPassword}>
                    {props.type === "password" ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                </button>
            }
        />
    )
}