import { useNavigate } from "react-router";
import Input from "../../componentes/ui/Input";
import { useState } from "react";
import Boton from "../../componentes/ui/Boton";
import { motion, AnimatePresence } from "framer-motion";

const usuario_correcto = {
    email: "prueba@gmail.com",
    passsword: "1234",
};

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const login = () => {
        if (
            email === usuario_correcto.email &&
            password === usuario_correcto.passsword
        ) {
            setLoading(true);

             sessionStorage.removeItem("cortinaMostrada");

            setTimeout(() => {
                navigate("/dashboard");
            }, 800);
        } else {
            setError(true);
        }
    };

    return (
        <div className="w-full h-screen flex">

            <div className="hidden md:flex w-1/2 h-full relative">
                <img
                    src="https://i.pinimg.com/1200x/aa/58/53/aa58539319f76f204092903487662e7c.jpg"
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/10 backdrop-blur-[2px]" />

                <div className="absolute bottom-10 left-10 text-white">
                    <h2 className="text-3xl font-bold">
                        Event Films Pro
                    </h2>
                    <p className="text-sm opacity-80 mt-2">
                        Gestiona tus eventos y producciones
                    </p>
                </div>
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50">

                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-[90%] max-w-md bg-white shadow-xl rounded-2xl p-8"
                >
                    <h3 className="text-2xl font-bold mb-2">
                        Bienvenido
                    </h3>

                    <p className="text-gray-500 mb-6">
                        Inicia sesión para continuar
                    </p>

                    <div className="flex flex-col gap-4">
                        <Input
                            label="Email"
                            tipo="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Ingrese su correo..."
                        />

                        <Input
                            label="Contraseña"
                            tipo="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Ingrese su contraseña..."
                        />

                        <Boton
                            onClick={login}
                            texto={loading ? "Ingresando..." : "Iniciar sesión"}
                            color="primario"
                        />
                    </div>
                </motion.div>

            </div>

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="bg-white rounded-xl p-6 shadow-lg"
                        >
                            <h2 className="text-red-500 font-semibold">
                                Error
                            </h2>
                            <p className="text-gray-600 mt-2">
                                Usuario o contraseña incorrectos
                            </p>

                            <Boton
                                className="mt-4"
                                onClick={() => setError(false)}
                                texto="Cerrar"
                                color="primario"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>


        </div>
    );
}