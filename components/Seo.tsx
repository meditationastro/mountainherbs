
import React, { useEffect } from 'react';
import { useData } from '../App';

interface SeoProps {
  title?: string;
  description?: string;
  keywords?: string;
}

export const Seo: React.FC<SeoProps> = ({ title, description, keywords }) => {
  const { settings } = useData();

  const siteName = settings?.siteName || 'Mountain Herbs Nepal';
  const defaultDesc = settings?.siteDescription || 'Shop premium organic Himalayan herbs, pure Shilajit resin, wild honey, and Ayurvedic wellness products. Ethically sourced from Nepal, lab-tested, and 100% natural.';
  const defaultKeywords = settings?.keywords || 'himalayan herbs, organic shilajit, pure shilajit resin, wild honey, mad honey, nepal wellness, ayurvedic remedies, yarsagumba, cordyceps, natural immunity booster, yak wool, hemp seed oil, organic skincare, mountain herbs nepal, buy shilajit online, holistic health, natural supplements, kathmandu shopping, authentic nepali products, himalayan salt, timur pepper, organic tea, herbal tea, wellness gift sets, sustainable living, fair trade nepal, shilajit benefits, original shilajit price, yarsagumba benefits, organic honey nepal, immune support, herbal medicine, natural healing, pashmina shawl, handmade soap nepal';

  useEffect(() => {
    // Update Title
    const finalTitle = title ? `${title} | ${siteName}` : `${siteName} | Organic Shilajit, Honey & Wellness`;
    document.title = finalTitle;

    // Update Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description || defaultDesc);
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = description || defaultDesc;
      document.head.appendChild(newMeta);
    }

    // Update Keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords || defaultKeywords);
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'keywords';
      newMeta.content = keywords || defaultKeywords;
      document.head.appendChild(newMeta);
    }
  }, [title, description, keywords, siteName, defaultDesc, defaultKeywords]);

  return null;
};
