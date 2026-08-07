export default function Container({ children, className = '', as: Tag = 'div', ...rest }) {
  return (
    <Tag className={`gr-container${className ? ` ${className}` : ''}`} {...rest}>
      {children}
    </Tag>
  );
}
