import { Field } from "formik"

const FormInput = (props) => {
  const { name, label, placeholder, ...otherProps } = props

  return (
    <Field name={name}>
      {
        ({ field, meta }) => (
          <label
            name={label}
            className="flex flex-col gap-2 mx-auto mt-4"
          >
            <span className="text-sm font-bold">{label}</span>
            <input
              {...field}
              {...otherProps}
              autoComplete="off"
              placeholder={placeholder}
              className="border px-2 py-1 rounded-xl bg-slate-700"
            />
            {meta.touched && meta.error && field.value.length > 0 ? (
              <span className="text-sm text-red-600 flex gap-2 items-center">
                {meta.error}
              </span>
            )
              : null
            }
          </label>
        )
      }
    </Field>
  )
}

export default FormInput