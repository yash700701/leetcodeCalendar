/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API: string;
    // add more env vars here
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
