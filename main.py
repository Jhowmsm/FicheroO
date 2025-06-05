import os
import csv
import datetime
from tkinter import Tk, filedialog, messagebox

def seleccionar_carpeta():
    root = Tk()
    root.withdraw()
    carpeta = filedialog.askdirectory(title="Selecciona una carpeta")
    root.destroy()  # para cerrar la ventana oculta de Tk
    return carpeta

def procesar_archivos(ruta, nombre_carpeta, campos_fijos):
    datos = []

    for archivo in os.listdir(ruta):
        ruta_archivo = os.path.join(ruta, archivo)
        if os.path.isfile(ruta_archivo):
            nombre, _ = os.path.splitext(archivo)
            partes = nombre.split("_")

            if len(partes) >= 6:
                fila = [
                    campos_fijos["campo_1"],         # '"ME598"'
                    f'"{nombre_carpeta}"',           # este valor se mete manualmente (normalmente estos PDF se encuentran dos niveles adelante del número de la caja que necesitamos)
                    '""',
                    campos_fijos["campo_2"],         # '"59580"'
                    campos_fijos["campo_3"],         # '"595801"'
                    '""',
                    '""',
                    f'"{partes[1]}"',                # ej: "LAN572"
                    f'"{partes[2]}"',                # ej: "SCL-BOG"
                    '""',
                    f'"{partes[5]}"',                # ej: "DOCUMENTO"
                    '""',
                    '""',
                    '""',
                    f'"{partes[3]}"',                # ej: "ECNBN"
                    f'"{partes[4]}"',                # ej: "SALAS"
                    '""',
                    '""',
                    '""',
                    '""'
                ]
                datos.append(fila)
    return datos

def generar_nombre_archivo():
    ahora = datetime.datetime.now()
    fecha = ahora.strftime("%m%d%y")  # MMDDYY sin guiones
    hora = ahora.strftime("%H%M%S")   # HHMMSS
    nombre_archivo = f"ME-ME-FILE-{fecha}_{hora}.add.WIP"
    return nombre_archivo

def guardar_csv_sin_encabezado(datos, carpeta_destino):
    nombre_archivo = generar_nombre_archivo()
    ruta_csv = os.path.join(carpeta_destino, nombre_archivo)

    if datos:
        with open(ruta_csv, mode='w', newline='', encoding='utf-8') as f:
            # Como quieres las comillas y separador espacio, escribimos línea a línea
            for fila in datos:
                f.write(" ".join(fila) + "\n")
        return ruta_csv
    return None

def main():
    ruta = seleccionar_carpeta()
    if not ruta:
        messagebox.showinfo("Información", "No se seleccionó ninguna carpeta.")
        return

    campos_fijos = {
        "campo_1": '"ME598"',
        "campo_2": '"59580"',
        "campo_3": '"595801"'
    }

    nombre_carpeta = os.path.basename(ruta)
    datos = procesar_archivos(ruta, nombre_carpeta, campos_fijos)
    resultado = guardar_csv_sin_encabezado(datos, ruta)

    if resultado:
        messagebox.showinfo("Éxito", f"Archivo generado exitosamente en:\n{resultado}")
    else:
        messagebox.showwarning("Advertencia", "No se encontraron archivos válidos.")

if __name__ == "__main__":
    main()