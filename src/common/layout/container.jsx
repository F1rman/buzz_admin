export default function Container(props) {
  return (
    <div {...props} className={`container ${props.className}`}>
      {props.children}
    </div>
  );
}
