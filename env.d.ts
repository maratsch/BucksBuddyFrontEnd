/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_API_KEY: string;
    // Weitere Umgebungsvariablen hier hinzufügen, falls nötig
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}