/** Logo BHF redessiné en SVG (net à toutes les tailles) d'après Logo-BHF-Transparent.png */
export default function Logo({ className = "", withText = true }: { className?: string; withText?: boolean }) {
  return (
    <svg
      viewBox={withText ? "0 0 300 300" : "40 0 220 195"}
      className={className}
      role="img"
      aria-label="Logo Bois du Haut Forez"
    >
      <polygon points="150,10 250,145 50,145" fill="#9d4804" />
      <polygon points="150,50 250,185 50,185" fill="#228926" />
      {withText && (
        <text
          x="150"
          y="270"
          textAnchor="middle"
          fontFamily="Arial Black, Arial, sans-serif"
          fontWeight="900"
          fontSize="72"
          letterSpacing="22"
          fill="#228926"
        >
          BHF
        </text>
      )}
    </svg>
  );
}
