import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const getStorageUrl = (bucket: string, path: string | null) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    const cleanPath = path.startsWith("/") ? path.substring(1) : path;
    return `${supabaseUrl}/storage/v1/object/public/${bucket}/${cleanPath}`;
};
export const preloadImage = (url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (!url) {
            resolve();
            return;
        }
        const img = new Image();
        img.src = url;
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Resolve anyway to not break Promise.all
    });
};
export const preloadVideo = (url: string): Promise<void> => {
    return new Promise((resolve) => {
        if (!url) {
            resolve();
            return;
        }
        // Using fetch to trigger browser cache for the video
        fetch(url, { mode: 'cors' })
            .then(() => resolve())
            .catch(() => resolve());
    });
};
