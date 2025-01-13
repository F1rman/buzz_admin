import { authValidator } from "validators";
import { Schema } from "joi"; 

type SetErrorFunction = (prev: Record<string, string>) => Record<string, string>;

export const authValidate = (
    key: string,
    value: any,
    setError: (callback: SetErrorFunction) => void
): void => {
    const schema: Schema = authValidator.extract(key);
    const { error } = schema.validate(value);

    if (error) setError((prev) => ({ ...prev, [key]: error.message }));
}