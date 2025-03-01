import './Icon.css';

interface IconProps {
  id: string;
}

function Icon({ id }: IconProps) {
  return (
    <span>
      {id === 'logo' ? (
        <svg id="logo" viewBox="0 0 300 500">
          <defs>
            <linearGradient
              id="s-shadow-right-gradient"
              gradientUnits="userSpaceOnUse"
              x1="290.5082"
              x2="140.5082"
              y1="140.5082"
              y2="290.5082"
            >
              <stop offset="0" stopColor="var(--color-primary)" />
              <stop
                offset="0.5"
                stopColor="var(--color-primary)"
                stopOpacity="0"
              />
            </linearGradient>

            <linearGradient
              id="s-shadow-left-gradient"
              gradientUnits="userSpaceOnUse"
              x1="159.4918"
              x2="9.4918"
              y1="209.4918"
              y2="359.4918"
            >
              <stop
                offset="0.5"
                stopColor="var(--color-primary)"
                stopOpacity="0"
              />
              <stop offset="1" stopColor="var(--color-primary)" />
            </linearGradient>
          </defs>

          <path
            className="s-shadow-right"
            d="M150,200v100c82.7,0,150-67.3,150-150H200C200,177.6,177.6,200,150,200z"
          />
          <path
            className="s-shadow-left"
            d="M150,300V200C67.3,200,0,267.3,0,350h100
		                    C100,322.4,122.4,300,150,300z"
          />
          <path
            className="s"
            d="M150,200c-27.6,0-50-22.4-50-50s22.4-50,50-50s50,22.4,50,50h100C300,67.3,232.7,0,150,0C67.3,0,0,67.3,0,150
                            c0,82.7,67.3,150,150,150c27.6,0,50,22.4,50,50s-22.4,50-50,50s-50-22.4-50-50H0c0,82.7,67.3,150,150,150c82.7,0,150-67.3,150-150
                            C300,267.3,232.7,200,150,200z"
          />
        </svg>
      ) : id === 'play' ? (
        <></>
      ) : null}
    </span>
  );
}

export default Icon;
