export default function Form({ children, className = "" }) {
    return (<div className={`auth_form ${className}`}>
        {children}
    </div>);
}