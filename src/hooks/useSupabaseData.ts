import { useState, useEffect } from 'react';
import { supabase, getStorageUrl, preloadImage, preloadVideo } from '@/utils/supabase';

interface SupabaseData {
  navLinks: any[];
  socialLinks: any;
  teamMembers: any[];
  talents: any[];
  youtubeVideos: string[];
  gallery: any[];
  services: any[];
  events: any[];
  loading: boolean;
  galleryLoading: boolean;
  hasMoreGallery: boolean;
  error: string | null;
}

export function useSupabaseData() {
  const [data, setData] = useState<SupabaseData>({
    navLinks: [],
    socialLinks: {},
    teamMembers: [],
    talents: [],
    youtubeVideos: [],
    gallery: [],
    services: [],
    events: [],
    loading: true,
    galleryLoading: false,
    hasMoreGallery: true,
    error: null,
  });

  const [galleryPage, setGalleryPage] = useState(0);
  const GALLERY_PAGE_SIZE = 25;

  useEffect(() => {
    async function fetchData() {
      try {
        const [
          { data: nav },
          { data: settings },
          { data: team },
          { data: talentList },
          { data: videos },
          { data: fanart },
          { data: serviceList },
          { data: eventList }
        ] = await Promise.all([
          supabase.from('navigation').select('*').order('order_index', { ascending: true }),
          supabase.from('site_settings').select('*'),
          supabase.from('team_members').select('*').order('order_index', { ascending: true }),
          supabase.from('talents').select('*, talents_images(*)').order('order_index', { ascending: true }).order('order_index', { foreignTable: 'talents_images', ascending: true }),
          supabase.from('youtube_videos').select('*').order('order_index', { ascending: true }),
          supabase.from('gallery').select('*').order('created_at', { ascending: false }).range(0, GALLERY_PAGE_SIZE - 1),
          supabase.from('services').select('*').order('order_index', { ascending: true }),
          supabase.from('events').select('*').order('date', { ascending: false }).limit(1)
        ]);

        const socialLinksSetting = settings?.find((s: any) => s.key === 'social_links');

        setData({
          navLinks: nav || [],
          socialLinks: socialLinksSetting?.value || {},
          teamMembers: (team || []).map(m => ({
            ...m,
            profile_image: getStorageUrl('nobles', m.profile_image)
          })),
          talents: (talentList || []).map(t => ({
            ...t,
            image: getStorageUrl('talents', t.image),
            portfolio: (t.talents_images || []).map((img: any) => getStorageUrl('talents', img.url))
          })),
          youtubeVideos: (videos || []).map((v: any) => v.video_id),
          gallery: (fanart || [])
            .map(f => ({
              ...f,
              url: getStorageUrl('gallery', f.url)
            }))
            .sort(() => Math.random() - 0.5),
          services: serviceList || [],
          events: (eventList || []).map(e => ({
            ...e,
            image_url: getStorageUrl('events', e.image_url)
          })),
          loading: false,
          galleryLoading: false,
          hasMoreGallery: (fanart || []).length === GALLERY_PAGE_SIZE,
          error: null,
        });

        // Preload images and videos in background
        (fanart || []).forEach(f => {
          const url = getStorageUrl('gallery', f.url);
          if (f.type === 'video') preloadVideo(url).catch(() => { });
          else preloadImage(url).catch(() => { });
        });

        const urlsToPreload = [
          ...(team || []).map(m => getStorageUrl('nobles', m.profile_image)),
          ...(talentList || []).map(t => getStorageUrl('talents', t.image))
        ];

        Promise.all(urlsToPreload.map(url => preloadImage(url).catch(() => { })));
      } catch (err: any) {
        console.error('Error fetching Supabase data:', err);
        setData(prev => ({ ...prev, loading: false, error: err.message }));
      }
    }

    fetchData();
  }, []);

  const fetchMoreGallery = async () => {
    if (data.galleryLoading || !data.hasMoreGallery) return;

    setData(prev => ({ ...prev, galleryLoading: true }));

    try {
      const nextPage = galleryPage + 1;
      const from = nextPage * GALLERY_PAGE_SIZE;
      const to = from + GALLERY_PAGE_SIZE - 1;

      const { data: nextFanart, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      if (nextFanart) {
        const mappedNextFanart = nextFanart.map(f => ({
          ...f,
          url: getStorageUrl('gallery', f.url)
        }));

        setData(prev => ({
          ...prev,
          gallery: [...prev.gallery, ...mappedNextFanart],
          galleryLoading: false,
          hasMoreGallery: nextFanart.length === GALLERY_PAGE_SIZE
        }));
        setGalleryPage(nextPage);

        // Preload the next batch images and videos
        mappedNextFanart.forEach(f => {
          if (f.type === 'video') preloadVideo(f.url).catch(() => { });
          else preloadImage(f.url).catch(() => { });
        });
      }
    } catch (err: any) {
      console.error('Error fetching more gallery:', err);
      setData(prev => ({ ...prev, galleryLoading: false, error: err.message }));
    }
  };

  return { ...data, fetchMoreGallery };
}
