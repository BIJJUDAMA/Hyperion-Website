export interface GalleryItem {
    image: string;
    alt: string;
    orientation: 'landscape' | 'portrait';
    width: number;
    height: number;
}

export const galleryData = {
    sectionNumber: '07',
    sectionLabel: 'GALLERY',
    title: 'Moments from the journey.',
    items: [
        { image: '/gallery/1.webp', alt: 'Presentation 1', orientation: 'portrait' as const, width: 1200, height: 1600 },
        { image: '/gallery/2.webp', alt: 'Presentation 2', orientation: 'portrait' as const, width: 1200, height: 1600 },
        { image: '/gallery/3.webp', alt: 'Team Hyperion', orientation: 'landscape' as const, width: 1200, height: 900 },
        { image: '/gallery/4.webp', alt: 'Late Night Work Session', orientation: 'portrait' as const, width: 1200, height: 2133 },
        { image: '/gallery/5.webp', alt: 'Judges Review', orientation: 'landscape' as const, width: 1200, height: 900 },
        { image: '/gallery/6.webp', alt: 'On the Rooftop', orientation: 'landscape' as const, width: 1200, height: 900 },
    ] as GalleryItem[],
};
