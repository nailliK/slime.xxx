'use client';

import { useRef } from 'react';
import { useColorCycle } from '../utils/useColorCycle';

export default function SlimeLogo() {
  const ref = useRef<HTMLDivElement>(null);
  useColorCycle(ref);

  return (
    <div ref={ref} className="fixed top-4 left-4 z-0 pointer-events-none" style={{ color: 'var(--cycle-color)' }}>
      <svg
        viewBox="0 0 510 584"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-32 h-32"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M280 335.301L230 248.699C158.38 290.049 133.746 381.982 175.096 453.603L261.699 403.603C247.899 379.7 256.098 349.101 280 335.301Z"
          fill="url(#paint0_linear_2_66)"
        />
        <path
          d="M229.5 247.833L279.5 334.435C351.12 293.085 375.754 201.152 334.404 129.531L247.801 179.531C261.601 203.434 253.402 234.033 229.5 247.833Z"
          fill="url(#paint1_linear_2_66)"
        />
        <path
          d="M230 248.699C206.098 262.499 175.499 254.3 161.699 230.397C147.899 206.495 156.098 175.896 180 162.096C203.902 148.296 234.501 156.495 248.301 180.397L334.904 130.397C293.554 58.7772 201.62 34.1436 130 75.4936C58.3797 116.844 33.7462 208.777 75.0962 280.397C116.446 352.018 208.38 376.651 280 335.301C303.902 321.501 334.501 329.7 348.301 353.603C362.101 377.505 353.902 408.104 330 421.904C306.098 435.704 275.499 427.505 261.699 403.603L175.096 453.603C216.446 525.223 308.38 549.856 380 508.506C451.62 467.156 476.254 375.223 434.904 303.603C393.554 231.982 301.62 207.349 230 248.699Z"
          fill="currentColor"
        />
        <defs>
          <linearGradient id="paint0_linear_2_66" x1="260.833" y1="404.103" x2="256.037" y2="342.429" gradientUnits="userSpaceOnUse">
            <stop stopColor="currentColor" />
            <stop offset="0.665" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="paint1_linear_2_66" x1="248.667" y1="179.031" x2="253.463" y2="240.705" gradientUnits="userSpaceOnUse">
            <stop stopColor="currentColor" />
            <stop offset="0.665" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
