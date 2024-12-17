"use client";
import useApp from "@/hooks/useApp";
import Modal from "@/ui/components/Modal";
import CoffeeInfo from "../CoffeeInfo";

const AppModals = () => {
  const app = useApp({ watch: ["modal"] });

  return (
    <>
      {app.state.modal?.type === "coffee" && (
        <Modal
          width="100%"
          height="unset"
          childrenContainerClassName="flex-1"
          handleClose={() => app.setState({ selectedCoffee: null })}
        >
          <CoffeeInfo
            coffeeId={app.state.modal.coffeeId}
            onDeselectAnimationComplete={() => {
              app.setState({ modal: null, hoveredCoffee: null });
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default AppModals;
