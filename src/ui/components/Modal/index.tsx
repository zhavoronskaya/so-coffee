"use client";
import { createPortal } from "react-dom";
import React from "react";
import { cn } from "@/ui/utils/classNames";
import useScrollLock from "@/ui/hooks/useScrollLock";

type Props = {
  width?: string;
  height?: string;
  backdropColor?: string;
  backdropBlur?: string;
  handleClose: () => void;
  childrenContainerClassName?: string;
  children: React.ReactNode;
};

const Modal = ({
  children,
  width = "700px",
  height = "auto",
  backdropColor = "#0D121A99",
  backdropBlur = "8px",
  childrenContainerClassName,
  handleClose,
}: Props) => {
  useScrollLock();

  return createPortal(
    <dialog
      open
      className="fixed z-[50] inset-0 "
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div
        className="fixed z-10 inset-0"
        style={{
          display: "none",
          background: backdropColor,
          backdropFilter: `blur(${backdropBlur})`,
        }}
      />

      <div
        className="fixed z-[10] inset-0 overflow-y-auto"
        onClick={handleClose}
      >
        <div className="flex flex-col min-h-full items-center justify-center pt-32 pb-20 px-16">
          {/* 
          Modal panel, show/hide based on modal state.

          Entering: "ease-out duration-300"
            From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            To: "opacity-100 translate-y-0 sm:scale-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100 translate-y-0 sm:scale-100"
            To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" 
          */}
          <div
            className={cn(
              "relative overflow-hidden max-w-full",
              childrenContainerClassName
            )}
            onClick={(e) => e.stopPropagation()}
            style={{ width, height }}
          >
            <div className="sm:grid grid-cols-12 gap-4">
              <div className="sm:col-start-1 sm:col-span-5 mt-12">
                <div className="overflow-hidden">
                  <button
                    className="z-10 text-xl modal translate-y-[2rem] opacity-0"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                </div>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </dialog>,
    document.body
  );
};

export default Modal;
