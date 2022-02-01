const SlickArrow = ({ currentSlide, slideCount, children, ...props }) => (
    <button {...props}>{children}</button>
);

export default SlickArrow;