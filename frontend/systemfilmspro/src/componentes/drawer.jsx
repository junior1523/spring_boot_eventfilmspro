import { motion, AnimatePresence } from "framer-motion";

export default function Drawer({
  abierto,
  cerrar,
  titulo,
  children,
  width = "60%"
}) {
  return (
    <AnimatePresence>
      {abierto && (
        <div className="fixed inset-0 z-50 flex">

          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(6px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            onClick={cerrar}
          />

          <motion.div
            className="relative ml-auto h-full bg-white shadow-xl p-5 overflow-y-auto"
            style={{ width }}
            initial={{ x: "100%", opacity: 0.6 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.6 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold">{titulo}</h2>

              <button
                onClick={cerrar}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}