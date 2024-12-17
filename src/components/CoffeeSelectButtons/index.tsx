"use client";

import useApp from "@/hooks/useApp";
import { CoffeeId } from "@/types";
import Device from "@/ui/utils/device";

// type Props = {};

const CoffeeSelectButtons = () => {
  return (
    <div>
      <div className="overflow-hidden">
        <div className="third1-block-el translate-y-[8rem] opacity-0 mix-blend-difference">
          <Button coffeeId="rugbano">Rugbano</Button>
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="third1-block-el translate-y-[8rem] opacity-0 mix-blend-difference">
          <Button coffeeId="java">Java Misiones</Button>
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="third1-block-el translate-y-[8rem] opacity-0 mix-blend-difference">
          <Button coffeeId="salvador">Finca Majahual</Button>
        </div>
      </div>
    </div>
  );
};

type ButtonProps = {
  coffeeId: CoffeeId;
  children: React.ReactNode;
};
const Button = ({ coffeeId, children }: ButtonProps) => {
  const app = useApp();
  const isTouchScreen = Device.isTouchScreen();

  const onPointerEnter = isTouchScreen
    ? undefined
    : () => app.setState({ hoveredCoffee: coffeeId });

  const onPointerLeave = isTouchScreen
    ? undefined
    : () => app.setState({ hoveredCoffee: null });

  const handleScrolltoCenter = () => {
    const el = document.querySelector(".section-3") as HTMLElement;

    if (!el) return;
    const top = el.offsetTop - (window.innerHeight - el.offsetHeight) / 2;

    document.scrollingElement?.scrollTo({
      left: 0,
      top: top,
      behavior: "smooth",
    });
  };

  return (
    <button
      className="opacity-40 hover:opacity-100 uppercase text-8xl font-semibold text-start tracking-tight"
      onClick={() => {
        handleScrolltoCenter();
        app.setState({
          selectedCoffee: coffeeId,
          modal: { type: "coffee", coffeeId },
        });
      }}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </button>
  );
};
export default CoffeeSelectButtons;
