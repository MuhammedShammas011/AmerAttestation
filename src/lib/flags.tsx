type StripeSpec = { type: "h" | "v"; colors: string[] };

const stripeFlags: Record<string, StripeSpec> = {
  AF: { type: "v", colors: ["#000000", "#D32011", "#007A36"] },
  AL: { type: "h", colors: ["#E41E20"] },
  DZ: { type: "v", colors: ["#006233", "#FFFFFF"] },
  AR: { type: "h", colors: ["#74ACDF", "#FFFFFF", "#74ACDF"] },
  AM: { type: "h", colors: ["#D90012", "#0033A0", "#F2A800"] },
  AT: { type: "h", colors: ["#ED2939", "#FFFFFF", "#ED2939"] },
  AZ: { type: "h", colors: ["#00B9E4", "#EF3340", "#509E2F"] },
  BH: { type: "v", colors: ["#FFFFFF", "#CE1126"] },
  BD: { type: "h", colors: ["#006A4E"] },
  BY: { type: "h", colors: ["#C8313E", "#4AA657"] },
  BE: { type: "v", colors: ["#000000", "#FAE042", "#ED2939"] },
  BA: { type: "h", colors: ["#002395", "#FECB00"] },
  BG: { type: "h", colors: ["#FFFFFF", "#00966E", "#D62612"] },
  KH: { type: "h", colors: ["#032EA1", "#E00025", "#032EA1"] },
  CM: { type: "v", colors: ["#007A5E", "#CE1126", "#FCD116"] },
  CL: { type: "h", colors: ["#FFFFFF", "#D52B1E"] },
  CO: { type: "h", colors: ["#FCD116", "#003893", "#CE1126"] },
  HR: { type: "h", colors: ["#FF0000", "#FFFFFF", "#171796"] },
  CY: { type: "h", colors: ["#FFFFFF", "#D57800"] },
  CZ: { type: "h", colors: ["#FFFFFF", "#D7141A"] },
  EG: { type: "h", colors: ["#CE1126", "#FFFFFF", "#000000"] },
  ET: { type: "h", colors: ["#078930", "#FCDD09", "#DA121A"] },
  FJ: { type: "h", colors: ["#68BFE5"] },
  FR: { type: "v", colors: ["#0055A4", "#FFFFFF", "#EF4135"] },
  GE: { type: "h", colors: ["#FFFFFF", "#FF0000"] },
  DE: { type: "h", colors: ["#000000", "#DD0000", "#FFCE00"] },
  GH: { type: "h", colors: ["#CE1126", "#FCD116", "#006B3F"] },
  GR: { type: "h", colors: ["#0D5EAF", "#FFFFFF"] },
  HK: { type: "h", colors: ["#DE2910"] },
  HU: { type: "h", colors: ["#CD2A3E", "#FFFFFF", "#436F4D"] },
  ID: { type: "h", colors: ["#FF0000", "#FFFFFF"] },
  IR: { type: "h", colors: ["#239F40", "#FFFFFF", "#DA0000"] },
  IQ: { type: "h", colors: ["#CE1126", "#FFFFFF", "#000000"] },
  IE: { type: "v", colors: ["#169B62", "#FFFFFF", "#FF883E"] },
  IT: { type: "v", colors: ["#009246", "#FFFFFF", "#CE2B37"] },
  JM: { type: "h", colors: ["#009B3A", "#FED100"] },
  JO: { type: "h", colors: ["#000000", "#FFFFFF", "#007A3D"] },
  KZ: { type: "h", colors: ["#00AFCA"] },
  KE: { type: "h", colors: ["#000000", "#BE3A34", "#006600"] },
  KW: { type: "h", colors: ["#007A3D", "#FFFFFF", "#CE1126"] },
  KG: { type: "h", colors: ["#E8112D"] },
  LV: { type: "h", colors: ["#9E1B32", "#FFFFFF", "#9E1B32"] },
  LY: { type: "h", colors: ["#E70013", "#000000", "#239E46"] },
  LT: { type: "h", colors: ["#FDB913", "#006A44", "#C1272D"] },
  LU: { type: "h", colors: ["#ED2939", "#FFFFFF", "#00A1DE"] },
  MY: { type: "h", colors: ["#CC0001", "#FFFFFF"] },
  MV: { type: "h", colors: ["#D21034", "#007E3A", "#D21034"] },
  MT: { type: "v", colors: ["#FFFFFF", "#CF142B"] },
  MU: { type: "h", colors: ["#EA2839", "#1A206D", "#FFD500", "#00A551"] },
  MX: { type: "v", colors: ["#006847", "#FFFFFF", "#CE1126"] },
  MD: { type: "v", colors: ["#003DA5", "#FFD200", "#CE1126"] },
  MC: { type: "h", colors: ["#CE1126", "#FFFFFF"] },
  MN: { type: "v", colors: ["#C4272F", "#015197", "#C4272F"] },
  ME: { type: "h", colors: ["#D31627"] },
  MA: { type: "h", colors: ["#C1272D"] },
  MM: { type: "h", colors: ["#FECB00", "#34B233", "#EA2839"] },
  NP: { type: "h", colors: ["#DC143C"] },
  NL: { type: "h", colors: ["#AE1C28", "#FFFFFF", "#21468B"] },
  NG: { type: "v", colors: ["#008751", "#FFFFFF", "#008751"] },
  MK: { type: "h", colors: ["#D20000"] },
  OM: { type: "h", colors: ["#FFFFFF", "#DB161B", "#008000"] },
  PS: { type: "h", colors: ["#000000", "#FFFFFF", "#007A3D"] },
  PA: { type: "h", colors: ["#FFFFFF", "#DA121A"] },
  PE: { type: "v", colors: ["#D91023", "#FFFFFF", "#D91023"] },
  PL: { type: "h", colors: ["#FFFFFF", "#DC143C"] },
  QA: { type: "v", colors: ["#FFFFFF", "#8D1B3D"] },
  RO: { type: "v", colors: ["#002B7F", "#FCD116", "#CE1126"] },
  RU: { type: "h", colors: ["#FFFFFF", "#0039A6", "#D52B1E"] },
  RW: { type: "h", colors: ["#00A1DE", "#FAD201", "#20603D"] },
  SN: { type: "v", colors: ["#00853F", "#FDEF42", "#E31B23"] },
  RS: { type: "h", colors: ["#C6363C", "#0C4076", "#FFFFFF"] },
  SC: { type: "v", colors: ["#003F87", "#FCD856", "#D62828", "#FFFFFF", "#007A3D"] },
  SG: { type: "h", colors: ["#EF3340", "#FFFFFF"] },
  SK: { type: "h", colors: ["#FFFFFF", "#0B4EA2", "#EE1C25"] },
  SI: { type: "h", colors: ["#FFFFFF", "#0043A8", "#FF0000"] },
  SO: { type: "h", colors: ["#4189DD"] },
  ZA: { type: "h", colors: ["#DE3831", "#FFFFFF", "#007A4D", "#FFFFFF", "#001489"] },
  ES: { type: "h", colors: ["#AA151B", "#F1BF00", "#AA151B"] },
  LK: { type: "v", colors: ["#FFB300", "#8D2433"] },
  SD: { type: "h", colors: ["#D21034", "#FFFFFF", "#000000"] },
  SY: { type: "h", colors: ["#CE1126", "#FFFFFF", "#000000"] },
  TJ: { type: "h", colors: ["#CC0000", "#FFFFFF", "#006600"] },
  TZ: { type: "v", colors: ["#1EB53A", "#00A3DD"] },
  TM: { type: "h", colors: ["#00843D"] },
  UG: { type: "h", colors: ["#000000", "#FCDC04", "#D90000"] },
  UA: { type: "h", colors: ["#0057B7", "#FFD700"] },
  UY: { type: "h", colors: ["#FFFFFF", "#0038A8"] },
  UZ: { type: "h", colors: ["#0099B5", "#FFFFFF", "#1EB53A"] },
  VE: { type: "h", colors: ["#FFCC00", "#00247D", "#CE1126"] },
  VN: { type: "h", colors: ["#DA251D"] },
  YE: { type: "h", colors: ["#CE1126", "#FFFFFF", "#000000"] },
  ZM: { type: "h", colors: ["#198A00"] },
  ZW: { type: "h", colors: ["#006400", "#FFD200", "#D40000", "#000000"] },
};

function Stripes({ type, colors }: StripeSpec) {
  const n = colors.length;
  if (type === "h") {
    const h = 100 / n;
    return (
      <>
        {colors.map((c, i) => (
          <rect key={i} x={0} y={i * h} width={100} height={h} fill={c} />
        ))}
      </>
    );
  }
  const w = 100 / n;
  return (
    <>
      {colors.map((c, i) => (
        <rect key={i} x={i * w} y={0} width={w} height={100} fill={c} />
      ))}
    </>
  );
}

function NordicCross({ bg, cross, inner }: { bg: string; cross: string; inner?: string }) {
  return (
    <>
      <rect width={100} height={100} fill={bg} />
      <rect x={32} width={18} height={100} fill={cross} />
      <rect y={38} width={100} height={18} fill={cross} />
      {inner && (
        <>
          <rect x={37} width={8} height={100} fill={inner} />
          <rect y={43} width={100} height={8} fill={inner} />
        </>
      )}
    </>
  );
}

function Star({ cx, cy, r, fill }: { cx: number; cy: number; r: number; fill: string }) {
  const points = Array.from({ length: 10 }, (_, i) => {
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    const radius = i % 2 === 0 ? r : r * 0.4;
    return `${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`;
  }).join(" ");
  return <polygon points={points} fill={fill} />;
}

const customFlags: Record<string, () => React.ReactElement> = {
  GB: () => (
    <>
      <rect width={100} height={100} fill="#00247D" />
      <polygon points="0,0 12,0 100,88 100,100 88,100 0,12" fill="#fff" />
      <polygon points="88,0 100,0 100,12 12,100 0,100 0,88" fill="#fff" />
      <polygon points="0,0 7,0 100,93 100,100 93,100 0,7" fill="#CF142B" />
      <polygon points="93,0 100,0 100,7 7,100 0,100 0,93" fill="#CF142B" />
      <rect x={40} width={20} height={100} fill="#fff" />
      <rect y={40} width={100} height={20} fill="#fff" />
      <rect x={44} width={12} height={100} fill="#CF142B" />
      <rect y={44} width={100} height={12} fill="#CF142B" />
    </>
  ),
  US: () => (
    <>
      <rect width={100} height={100} fill="#fff" />
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} y={i * (100 / 13) * 2} width={100} height={100 / 13} fill="#B22234" />
      ))}
      <rect width={55} height={53.8} fill="#3C3B6E" />
      {Array.from({ length: 12 }, (_, i) => (
        <circle key={i} cx={8 + (i % 4) * 13} cy={8 + Math.floor(i / 4) * 15} r={2.6} fill="#fff" />
      ))}
    </>
  ),
  AE: () => (
    <>
      <rect x={25} y={0} width={75} height={33.3} fill="#00732F" />
      <rect x={25} y={33.3} width={75} height={33.3} fill="#fff" />
      <rect x={25} y={66.6} width={75} height={33.4} fill="#000000" />
      <rect x={0} y={0} width={25} height={100} fill="#FF0000" />
    </>
  ),
  IN: () => (
    <>
      <rect width={100} height={33.3} fill="#FF9933" />
      <rect y={33.3} width={100} height={33.3} fill="#fff" />
      <rect y={66.6} width={100} height={33.4} fill="#138808" />
      <circle cx={50} cy={50} r={9} fill="none" stroke="#000080" strokeWidth={1.4} />
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (Math.PI / 6) * i;
        return (
          <line
            key={i}
            x1={50}
            y1={50}
            x2={50 + 9 * Math.cos(angle)}
            y2={50 + 9 * Math.sin(angle)}
            stroke="#000080"
            strokeWidth={0.6}
          />
        );
      })}
    </>
  ),
  PT: () => (
    <>
      <rect width={40} height={100} fill="#046A38" />
      <rect x={40} width={60} height={100} fill="#DA291C" />
      <circle cx={40} cy={50} r={13} fill="#FFCC00" />
      <circle cx={40} cy={50} r={9} fill="#DA291C" />
    </>
  ),
  AU: () => (
    <>
      <rect width={100} height={100} fill="#00247D" />
      <rect width={45} height={30} fill="#00247D" />
      <polygon points="0,0 5,0 45,27 45,30 40,30 0,3" fill="#fff" />
      <polygon points="40,0 45,0 45,3 5,30 0,30 0,27" fill="#fff" />
      <rect x={18} width={9} height={30} fill="#fff" />
      <rect y={12} width={45} height={9} fill="#fff" />
      <rect x={20.5} width={4} height={30} fill="#CF142B" />
      <rect y={14.5} width={45} height={4} fill="#CF142B" />
      <Star cx={72} cy={30} r={7} fill="#fff" />
      <Star cx={82} cy={62} r={6} fill="#fff" />
      <Star cx={62} cy={72} r={5} fill="#fff" />
      <Star cx={80} cy={85} r={5} fill="#fff" />
      <Star cx={30} cy={70} r={9} fill="#fff" />
    </>
  ),
  LB: () => (
    <>
      <rect width={100} height={25} fill="#EE161F" />
      <rect y={25} width={100} height={50} fill="#fff" />
      <rect y={75} width={100} height={25} fill="#EE161F" />
      <polygon points="50,38 42,58 58,58" fill="#00A651" />
      <rect x={47} y={56} width={6} height={12} fill="#00A651" />
    </>
  ),
  PH: () => (
    <>
      <rect width={100} height={50} fill="#0038A8" />
      <rect y={50} width={100} height={50} fill="#CE1126" />
      <polygon points="0,0 45,50 0,100" fill="#fff" />
      <circle cx={15} cy={50} r={7} fill="#FCD116" />
      <Star cx={8} cy={22} r={3.5} fill="#FCD116" />
      <Star cx={8} cy={78} r={3.5} fill="#FCD116" />
      <Star cx={30} cy={50} r={3.5} fill="#FCD116" />
    </>
  ),
  PK: () => (
    <>
      <rect width={100} height={100} fill="#01411C" />
      <rect width={25} height={100} fill="#fff" />
      <circle cx={62} cy={45} r={16} fill="#fff" />
      <circle cx={67} cy={41} r={13} fill="#01411C" />
      <Star cx={80} cy={35} r={6} fill="#fff" />
    </>
  ),
  CA: () => (
    <>
      <rect width={25} height={100} fill="#FF0000" />
      <rect x={25} width={50} height={100} fill="#fff" />
      <rect x={75} width={25} height={100} fill="#FF0000" />
      <polygon points="50,32 55,48 68,42 60,56 72,62 56,64 58,80 50,68 42,80 44,64 28,62 40,56 32,42 45,48" fill="#FF0000" />
    </>
  ),
  BR: () => (
    <>
      <rect width={100} height={100} fill="#009739" />
      <polygon points="50,14 92,50 50,86 8,50" fill="#FEDD00" />
      <circle cx={50} cy={50} r={17} fill="#012169" />
    </>
  ),
  VG: () => (
    <>
      <rect width={100} height={100} fill="#00247D" />
      <rect width={40} height={26} fill="#00247D" />
      <polygon points="0,0 5,0 40,24 40,26 35,26 0,2" fill="#fff" />
      <polygon points="35,0 40,0 40,2 5,26 0,26 0,24" fill="#fff" />
      <rect x={16} width={8} height={26} fill="#fff" />
      <rect y={11} width={40} height={8} fill="#fff" />
      <rect x={18} width={4} height={26} fill="#CF142B" />
      <rect y={13} width={40} height={4} fill="#CF142B" />
      <circle cx={66} cy={58} r={22} fill="#fff" />
      <circle cx={66} cy={58} r={17} fill="#00A651" />
    </>
  ),
  JP: () => (
    <>
      <rect width={100} height={100} fill="#fff" />
      <circle cx={50} cy={50} r={22} fill="#BC002D" />
    </>
  ),
  CN: () => (
    <>
      <rect width={100} height={100} fill="#DE2910" />
      <Star cx={25} cy={25} r={13} fill="#FFDE00" />
      <Star cx={45} cy={12} r={4} fill="#FFDE00" />
      <Star cx={52} cy={20} r={4} fill="#FFDE00" />
      <Star cx={52} cy={32} r={4} fill="#FFDE00" />
      <Star cx={45} cy={40} r={4} fill="#FFDE00" />
    </>
  ),
  TW: () => (
    <>
      <rect width={100} height={100} fill="#FE0000" />
      <rect width={50} height={50} fill="#000095" />
      <circle cx={25} cy={25} r={12} fill="#fff" />
    </>
  ),
  KR: () => (
    <>
      <rect width={100} height={100} fill="#fff" />
      <path d="M50,30 A10,10 0 0,1 50,50 A10,10 0 0,0 50,70 A20,20 0 0,0 50,30 Z" fill="#CD2E3A" />
      <path d="M50,30 A10,10 0 0,0 50,50 A10,10 0 0,1 50,70 A20,20 0 0,1 50,30 Z" fill="#0047A0" />
    </>
  ),
  CH: () => (
    <>
      <rect width={100} height={100} fill="#D52B1E" />
      <rect x={40} y={20} width={20} height={60} fill="#fff" />
      <rect x={20} y={40} width={60} height={20} fill="#fff" />
    </>
  ),
  TR: () => (
    <>
      <rect width={100} height={100} fill="#E30A17" />
      <circle cx={44} cy={50} r={18} fill="#fff" />
      <circle cx={49} cy={50} r={14.5} fill="#E30A17" />
      <Star cx={64} cy={50} r={6} fill="#fff" />
    </>
  ),
  TN: () => (
    <>
      <rect width={100} height={100} fill="#E70013" />
      <circle cx={50} cy={50} r={25} fill="#fff" />
      <circle cx={55} cy={50} r={17} fill="#E70013" />
      <circle cx={47} cy={50} r={17} fill="#fff" />
      <Star cx={51} cy={50} r={6} fill="#E70013" />
    </>
  ),
  IL: () => (
    <>
      <rect width={100} height={100} fill="#fff" />
      <rect y={15} width={100} height={9} fill="#0038B8" />
      <rect y={76} width={100} height={9} fill="#0038B8" />
      <polygon points="50,36 58,50 42,50" fill="none" stroke="#0038B8" strokeWidth={3} />
      <polygon points="50,64 58,50 42,50" fill="none" stroke="#0038B8" strokeWidth={3} />
    </>
  ),
  DK: () => <NordicCross bg="#C60C30" cross="#fff" />,
  FI: () => <NordicCross bg="#fff" cross="#003580" />,
  NO: () => <NordicCross bg="#EF2B2D" cross="#fff" inner="#002868" />,
  SE: () => <NordicCross bg="#006AA7" cross="#FECC00" />,
  IS: () => <NordicCross bg="#02529C" cross="#fff" inner="#DC1E35" />,
  NZ: () => (
    <>
      <rect width={100} height={100} fill="#00247D" />
      <rect width={45} height={30} fill="#00247D" />
      <polygon points="0,0 5,0 45,27 45,30 40,30 0,3" fill="#fff" />
      <polygon points="40,0 45,0 45,3 5,30 0,30 0,27" fill="#fff" />
      <rect x={18} width={9} height={30} fill="#fff" />
      <rect y={12} width={45} height={9} fill="#fff" />
      <rect x={20.5} width={4} height={30} fill="#CF142B" />
      <rect y={14.5} width={45} height={4} fill="#CF142B" />
      <Star cx={75} cy={30} r={6} fill="#CF142B" />
      <Star cx={85} cy={55} r={7} fill="#CF142B" />
      <Star cx={68} cy={72} r={6} fill="#CF142B" />
      <Star cx={82} cy={82} r={5} fill="#CF142B" />
    </>
  ),
  SA: () => (
    <>
      <rect width={100} height={100} fill="#006C35" />
      <rect x={20} y={46} width={60} height={4} fill="#fff" />
      <rect x={22} y={58} width={45} height={4} fill="#fff" />
    </>
  ),
  TH: () => (
    <>
      <rect width={100} height={100} fill="#A51931" />
      <rect y={16.7} width={100} height={66.6} fill="#fff" />
      <rect y={33.3} width={100} height={33.4} fill="#2D2A4A" />
    </>
  ),
};

export function CircleFlag({
  code,
  size = 32,
  className,
}: {
  code: string;
  size?: number;
  className?: string;
}) {
  const upper = code.toUpperCase();
  const clipId = `flag-clip-${upper}`;
  const CustomFlag = customFlags[upper];
  const stripe = stripeFlags[upper];

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <circle cx={50} cy={50} r={50} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        {CustomFlag ? (
          <CustomFlag />
        ) : stripe ? (
          <Stripes {...stripe} />
        ) : (
          <rect width={100} height={100} fill="#9CA3AF" />
        )}
      </g>
      <circle cx={50} cy={50} r={49} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth={2} />
    </svg>
  );
}
