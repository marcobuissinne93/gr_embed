import { icons } from './diagramIcons';

export default function ProductCard({ icon, name, description }) {
  return (
    <li className="gr-product-card">
      <span className="gr-product-card__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="24" height="24" focusable="false">
          {icons[icon]}
        </svg>
      </span>
      <h3 className="gr-product-card__name">{name}</h3>
      <p className="gr-product-card__desc">{description}</p>
    </li>
  );
}
