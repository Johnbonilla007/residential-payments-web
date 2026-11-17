import React, { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import {
  Backdrop,
  DragHandle,
  SheetBody,
  SheetCloseBtn,
  SheetFooter,
  SheetHeader,
  SheetPanel,
  SheetTitle,
} from "./styles";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Portal-based bottom sheet with focus trap, Escape handling, and focus
 * restoration when closed.
 */
export const BottomSheet = ({
  visible,
  onHide,
  title,
  footer,
  children,
  maxHeight = "85dvh",
  className = "",
}) => {
  const sheetRef = useRef(null);
  const previousFocusRef = useRef(null);
  const onHideRef = useRef(onHide);
  const titleId = useId();

  onHideRef.current = onHide;

  useEffect(() => {
    if (!visible) return undefined;

    previousFocusRef.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      const container = sheetRef.current;
      if (!container) return;
      const first = container.querySelector(FOCUSABLE_SELECTOR);
      if (first) {
        first.focus();
      } else {
        container.focus();
      }
    }, 20);

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onHideRef.current?.();
        return;
      }

      if (event.key !== "Tab" || !sheetRef.current) return;
      const focusables = Array.from(
        sheetRef.current.querySelectorAll(FOCUSABLE_SELECTOR),
      ).filter((el) => el.offsetParent !== null);

      if (focusables.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
      const prev = previousFocusRef.current;
      if (prev && typeof prev.focus === "function") {
        prev.focus();
      }
    };
  }, [visible]);

  if (!visible || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <Backdrop
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onHide?.();
        }
      }}
    >
      <SheetPanel
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : "Panel inferior"}
        tabIndex={-1}
        $maxHeight={maxHeight}
        className={className}
      >
        <DragHandle aria-hidden="true" />
        {title && (
          <SheetHeader>
            <SheetTitle id={titleId}>{title}</SheetTitle>
            <SheetCloseBtn
              type="button"
              onClick={onHide}
              aria-label="Cerrar"
            >
              <i className="pi pi-times" aria-hidden="true" />
            </SheetCloseBtn>
          </SheetHeader>
        )}
        <SheetBody>{children}</SheetBody>
        {footer && <SheetFooter>{footer}</SheetFooter>}
      </SheetPanel>
    </Backdrop>,
    document.body,
  );
};

export default BottomSheet;
