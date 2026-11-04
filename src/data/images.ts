/**
 * Image registry. Every photo sits in a fixed-ratio slot (object-fit: cover), so a real photo can replace a file
 * in src/assets/images without code changes. Exported from Figma "HER TABLE · Final Design (Website)".
 */
import type { ImageMetadata } from 'astro';
import heroMain from '../assets/images/heroMain.jpg';
import heroSmall from '../assets/images/heroSmall.jpg';
import logo from '../assets/images/logo.png';
import societyArch from '../assets/images/societyArch.jpg';
import table01Bg from '../assets/images/table01Bg.jpg';
import table01Poster from '../assets/images/table01Poster.jpg';
import privacyBg from '../assets/images/privacyBg.jpg';
import catDinner from '../assets/images/catDinner.jpg';
import catWellness from '../assets/images/catWellness.jpg';
import catActivities from '../assets/images/catActivities.jpg';
import catBookClub from '../assets/images/catBookClub.jpg';
import optionEvents from '../assets/images/optionEvents.jpg';
import optionMembership from '../assets/images/optionMembership.jpg';
import footer from '../assets/images/footer.jpg';
import eventDesert from '../assets/images/eventDesert.jpg';

export const images = {
  heroMain, heroSmall, logo, societyArch, table01Bg, table01Poster, privacyBg,
  catDinner, catWellness, catActivities, catBookClub, optionEvents, optionMembership, footer, eventDesert,
} satisfies Record<string, ImageMetadata>;

export type ImageKey = keyof typeof images;
