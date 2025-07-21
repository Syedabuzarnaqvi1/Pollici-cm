import type { APIRoute } from 'astro';
import { parseCSV } from '../utils/csvParser';
import csvData from '../assets/Inches to CM Data.csv?raw';

export const GET: APIRoute = async () => {
  const conversions = parseCSV(csvData);
  const baseUrl = 'https://pollici-in-cm.it';
  
  // Get current date in ISO format
  const lastmod = new Date().toISOString().split('T')[0];
  
  // Static pages
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    { url: '/chi-siamo', priority: '0.8', changefreq: 'monthly' },
    { url: '/conversioni-popolari', priority: '0.9', changefreq: 'weekly' }
  ];
  
  // Generate XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add static pages
  staticPages.forEach(page => {
    xml += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  // Add conversion pages
  conversions.forEach(conversion => {
    xml += `
  <url>
    <loc>${baseUrl}/${conversion.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  xml += `
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400' // Cache for 24 hours
    }
  });
};