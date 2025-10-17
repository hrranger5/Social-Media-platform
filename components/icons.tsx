import React from 'react';

// Props for all icons
interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const SunIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-6.364-.386 1.591-1.591M3 12h2.25m.386-6.364 1.591 1.591M12 12a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
  </svg>
);

export const MoonIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

export const UserPlusIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0-2.25-2.25M18 9.75l2.25-2.25m-1.5 12V13.5m0 0V11.25m0 2.25H13.5m2.25 0H18m-6.75-1.5h-3.75a1.5 1.5 0 0 0-1.5 1.5v3.75a1.5 1.5 0 0 0 1.5 1.5h3.75a1.5 1.5 0 0 0 1.5-1.5v-3.75a1.5 1.5 0 0 0-1.5-1.5Z" />
    </svg>
);

export const CheckIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
);

export const HeartIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>
);

export const ChatBubbleIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.375 3.375c.395.165.823.295 1.275.405a11.96 11.96 0 0 0 1.275-.405m-1.275.405a11.956 11.956 0 0 1-2.625 2.152L2.25 16.5m1.275-3.375a11.956 11.956 0 0 0 2.625-2.152m-2.625 2.152a11.956 11.956 0 0 1-1.275-.405m1.275.405c.395.165.823.295 1.275.405m0 0a11.956 11.956 0 0 1 2.625 2.152L12 21.75m-9.375-3.375a11.956 11.956 0 0 0 2.625 2.152L12 21.75m-9.375-3.375a11.956 11.956 0 0 1-1.275-.405m-1.275-.405c.395.165.823.295 1.275.405m-1.275.405a11.96 11.96 0 0 0-1.275.405m1.275-.405 1.591 1.591m0 0-1.591-1.591m1.591 1.591L12 16.5m0 0 3.375-3.375m0 0L12 16.5m3.375-3.375a11.956 11.956 0 0 1 2.625-2.152L21.75 12m-9.375 3.375a11.956 11.956 0 0 0 2.625 2.152L12 21.75m9.375-9.375a11.956 11.956 0 0 0-2.625-2.152L12 3.375m9.375 9.375a11.956 11.956 0 0 1-2.625 2.152L12 21.75m-9.375-9.375a11.956 11.956 0 0 1-2.625-2.152L2.25 12m9.375 3.375a11.956 11.956 0 0 1 2.625 2.152L12 21.75" />
    </svg>
);
