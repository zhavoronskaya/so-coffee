"use client";
type Props = {
  children: React.ReactNode;
  className: string;
};

const ScrollToTopButton = ({ className, children }: Props) => {
  const onClick = () => {
    document.scrollingElement?.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
      // behavior: "instant",
    });
  };
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default ScrollToTopButton;
