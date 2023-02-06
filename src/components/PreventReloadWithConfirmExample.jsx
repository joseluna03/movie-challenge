import React, { useEffect } from "react";

export default function PreventReloadWithConfirmExample() {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
      if (!confirm("Se perderán los datos. ¿Desea actualizar la página?")) {
        event.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return <></>;
}

