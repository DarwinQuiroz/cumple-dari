const firebaseConfig = {
  apiKey: "AIzaSyBD3kKuQ6ZoPMzt5Ewiw8qD9xQ9a9NPymA",
  authDomain: "luz-html.firebaseapp.com",
  projectId: "luz-html",
  storageBucket: "luz-html.firebasestorage.app",
  messagingSenderId: "966256347636",
  appId: "1:966256347636:web:22ca68e77db86011f5d1a1",
  measurementId: "G-4WGPST90BG",
  databaseURL: "https://luz-html-default-rtdb.firebaseio.com/",
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Variables globales
let datosRef = db.ref("visitas-dari");

firebase
  .database()
  .ref(".info/connected")
  .on("value", (snapshot) => {
    console.log(
      snapshot.val() ? "✓ Conectado a Firebase" : "✗ Desconectado"
    );
  });

// Detectar IP
async function detectarIP() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Error al detectar IP:", error);
    return "No disponible";
  }
}

// Fecha y hora actual formateada
function obtenerFechaHora() {
  const ahora = new Date();
  const opciones = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  return ahora.toLocaleString("es-ES", opciones);
}

// Detectar navegador
function detectarNavegador() {
  const ua = navigator.userAgent;
  let navegador = "Desconocido";

  if (ua.indexOf("Firefox") > -1) navegador = "Firefox";
  else if (ua.indexOf("Chrome") > -1) navegador = "Chrome";
  else if (ua.indexOf("Safari") > -1) navegador = "Safari";
  else if (ua.indexOf("Edge") > -1) navegador = "Edge";
  else if (ua.indexOf("Opera") > -1) navegador = "Opera";
  else if (ua.indexOf("Trident") > -1) navegador = "Internet Explorer";

  return navegador;
}

// Función para agregar datos
async function agregarDatos(pagina) {
  if (window.location.hostname.includes("localhost")) return;

  const ip = await detectarIP();

  if (ip === "No disponible") {
    console.warn("Esperando a detectar tu IP...");
    return;
  }

  try {
    await datosRef.push({
      ip: ip,
      fecha: obtenerFechaHora(),
      pagina: pagina,
      navegador: detectarNavegador(),
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    });
    console.log("✓ Datos guardados correctamente");
  } catch (error) {
    console.error("Error al guardar:", error.message);
  }
}

// Inicializar tracking
agregarDatos("Dari");
