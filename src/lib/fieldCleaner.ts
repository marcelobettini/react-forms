import { type FormikValues } from "formik"

export default function fieldCleaner(valuesObject: FormikValues): void {
    const keys: string[] = Object.keys(valuesObject)
    const values: string[] = Object.values(valuesObject)
    const len: number = Object.keys(valuesObject).length
    for (let i = 0; i < len; i++) {
        if (typeof values[i] === 'string') {
            valuesObject[keys[i]] = values[i].trim().replace(/\s+/g, ' ')
        }
    }
}