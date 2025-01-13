import { useEffect, useRef, ReactNode } from "react";

interface IProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  children: ReactNode;
  fullScreen?: boolean;
  contentClassName?: string;
}

export default function OutsideModal({
  openModal,
  setOpenModal,
  children,
  fullScreen = false,
  contentClassName = "",
}: IProps) {
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openModal]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenModal(false);
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [setOpenModal]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target as Node)
      ) {
        setOpenModal(false);
      }
    };

    if (openModal) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModal, setOpenModal]);

  return (
    <div
      className={`flex z-[1099999222222] justify-center items-center fixed w-full h-full top-0 left-0
      transition-all duration-300 ease-in-out 
      ${!openModal ? "pointer-events-none opacity-0 visibility-hidden" : "opacity-100 pointer-events-auto visible"}
      `}
    >
      <div
        onClick={() => {
          setOpenModal(false);
        }}
        className={`left-0 top-0 fixed w-full h-full transition-all bg-[#0000003d] z-[999999] ${
          !openModal
            ? "pointer-events-none opacity-0 visibility-hidden"
            : "opacity-100 pointer-events-auto visible"
        }`}
      ></div>
      <div
        ref={modalContentRef}
        className={`flex ${contentClassName} items-end absolute w-full z-[1099999222222] justify-center transition-all duration-300 transform max-w-max px-[15px] ${
          fullScreen &&
          "!max-w-full !px-0  h-full top-0 max-h-[100vh] bg-white  overflow-hidden overflow-y-auto"
        }  mx-auto items-center  ${
          !openModal
            ? "scale-90 pointer-events-none opacity-0 visibility-hidden"
            : "scale-100 opacity-100 pointer-events-auto visible"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
