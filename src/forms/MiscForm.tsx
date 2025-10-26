import { useRef } from "react"
import { useForm } from "react-hook-form"
import './Signupform.css'

const provinces = [
    "Buenos Aires",
    "Catamarca",
    "Chaco",
    "Chubut",
    "Córdoba",
    "Corrientes",
    "Entre Ríos",
    "Formosa",
    "Jujuy",
    "La Pampa",
    "La Rioja",
    "Mendoza",
    "Misiones",
    "Neuquén",
    "Río Negro",
    "Salta",
    "San Juan",
    "San Luis",
    "Santa Cruz",
    "Santa Fe",
    "Santiago del Estero",
    "Tierra del Fuego",
    "Tucumán",
]
export default function MiscForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset,
    } = useForm({
        defaultValues: {
            nombre: "",
            correo: "",
            fechaNacimiento: "",
            password: "",
            confirmarPassword: "",
            pais: "",
            provincia: "",
            archivo: "",
            aceptaTerminos: false,
        },
    })

    const password = useRef<string | null>(null)
    password.current = watch("password", "")

    const onSubmit = handleSubmit((data) => {
        alert(JSON.stringify(data, null, 2))
        reset({
            nombre: "",
            correo: "",
            fechaNacimiento: "",
            password: "",
            confirmarPassword: "",
            pais: "",
            archivo: "",
            aceptaTerminos: false,
        })
        reset()
    })

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Nombre:</label>
                <input
                    type="text"
                    {...register("nombre", {
                        required: {
                            value: true,
                            message: "Nombre es requerido",
                        },
                        maxLength: {
                            value: 20,
                            message: "Nombre no debe ser mayor a 20 caracteres",
                        },
                        minLength: {
                            value: 2,
                            message: "Nombre debe ser mayor a 2 caracteres",
                        },
                    })}
                />
                {errors.nombre && <div className="error">{errors.nombre?.message}</div>}
            </div>

            <div className="form-group">
                <label>Correo Electrónico:</label>
                <input
                    type="email"
                    {...register("correo", {
                        required: {
                            value: true,
                            message: "Correo es requerido",
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                            message: "Correo no válido",
                        },
                    })}
                />
                {errors.correo && <div className="error">{errors.correo.message}</div>}
            </div>

            <div className="form-group">
                <label>Fecha de Nacimiento:</label>
                <input
                    type="date"
                    {...register("fechaNacimiento", {
                        required: {
                            value: true,
                            message: "Fecha de nacimiento es requerida",
                        },
                        validate: (value) => {
                            const fechaNacimiento = new Date(value)
                            const fechaActual = new Date()
                            const edad =
                                fechaActual.getFullYear() - fechaNacimiento.getFullYear()
                            return edad >= 18 || "Debes ser mayor de edad"
                        },
                    })}
                />
                {errors.fechaNacimiento && (
                    <div className="error">{errors.fechaNacimiento.message}</div>
                )}
            </div>

            <div className="form-group">
                <label>Contraseña:</label>
                <input
                    type="password"
                    {...register("password", {
                        required: {
                            value: true,
                            message: "Contraseña es requerida",
                        },
                        minLength: {
                            value: 6,
                            message: "Contraseña debe ser mayor a 6 caracteres",
                        },
                    })}
                />
                {errors.password && <div className="error">{errors.password.message}</div>}
            </div>

            <div className="form-group">
                <label>Confirma Contraseña:</label>
                <input
                    type="password"
                    {...register("confirmarPassword", {
                        required: {
                            value: true,
                            message: "Confirmar contraseña es requerida",
                        },
                        minLength: {
                            value: 6,
                            message: "Confirmar contraseña debe ser mayor a 6 caracteres",
                        },
                        validate: (value) =>
                            value === password.current || "Las contraseñas no coinciden",
                    })}
                />
                {errors.confirmarPassword && (
                    <div className="error">{errors.confirmarPassword.message}</div>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="pais">Pais:</label>
                <select id="pais" {...register("pais", {
                    required: {
                        value: true,
                        message: "Elija un país"
                    }
                })}>
                    <option value="mx">México</option>
                    <option value="co">Colombia</option>
                    <option value="ch">Chile</option>
                    <option value="ar">Argentina</option>
                </select>

                {watch("pais") === "ar" && (
                    <>
                        <input
                            type="text"
                            placeholder="Provincia"
                            list="provinces"
                            {...register("provincia", {
                                required: {
                                    value: true,
                                    message: "Elija una provincia argentina"
                                }
                            })}
                        />
                        <datalist id="provinces">
                            {provinces.map((province, index) => (
                                <option key={index} value={province} />
                            ))}
                        </datalist>
                    </>
                )}
                {errors.provincia && (<div className="error">{errors.provincia.message}</div>)}
            </div>

            <div className="form-group">
                <label htmlFor="archivo">subir nombre de archivo:</label>
                <input
                    type="file"
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            setValue("archivo", e.target.files[0].name)
                        }
                    }}
                />
                {errors.archivo && <div className="error">{errors.archivo.message}</div>}
            </div>

            <div className="form-group">
                <div className="radio">
                    <input
                        type="checkbox"
                        {...register("aceptaTerminos", {
                            required: {
                                value: true,
                                message: "Acepta los términos y condiciones",
                            },
                        })}
                    />
                    <label>Acepto términos y condiciones</label>
                </div>
                {errors.aceptaTerminos && <div className="error">{errors.aceptaTerminos.message}</div>}
            </div>

            <button type="submit">Enviar</button>
            <pre style={{ width: "400px" }}>{JSON.stringify(watch(), null, 2)}</pre>
        </form>
    )
}


