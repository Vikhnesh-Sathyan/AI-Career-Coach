function Button({ text, type = "button" }) {
    return (
        <button className="primary-btn" type={type}>
            {text}
        </button>
    );
}

export default Button;