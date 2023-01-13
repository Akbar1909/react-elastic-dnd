import { useRef, MouseEvent, useState, useMemo } from "react";

const inital = {
  pos1: 0,
  pos2: 0,
  pos3: 0,
  pos4: 0,
};

const useDrag = () => {
  const [mode, setMode] = useState("stopped");
  const position = useRef(inital);
  const [translate, setTranslate] = useState({
    top: 0,
    left: 0,
  });

  const draggableElRef = useRef(null);

  const onHandleDragMouseDown = (e) => {
    e.preventDefault();

    position.current.pos3 = e.clientX;
    position.current.pos4 = e.clientY;
    setMode("pressed");

    document.addEventListener("mousemove", onHandleMouseMove);
    document.addEventListener("mouseup", onHandleMouseUp);
  };

  const onHandleMouseUp = () => {
    setMode("stopped");
    document.removeEventListener("mouseup", onHandleMouseUp);
    document.removeEventListener("mousemove", onHandleMouseMove);
  };

  const onHandleMouseMove = (e) => {
    e.preventDefault();

    setMode("dragging");
    const newPos1 = position.current.pos3 - e.clientX;
    const newPos2 = position.current.pos4 - e.clientY;
    position.current = {
      pos1: newPos1,
      pos2: newPos2,
      pos3: e.clientX,
      pos4: e.clientY,
    };

    setTranslate({
      top: draggableElRef.current?.offsetTop - newPos2,
      left: draggableElRef.current?.offsetLeft - newPos1,
    });
  };

  const cursorStyle = useMemo(() => {
    if (mode === "dragging") return "grabbing";
    if (mode === "pressed") return "grab";
    return "initial";
  }, [mode]);

  const style = {
    position: "fixed",
    top: `${translate.top}px`,
    left: `${translate.left}px`,
    cursor: cursorStyle,
  };

  return {
    style,
    ref: draggableElRef,
    onHandleDragMouseDown,
  };
};

export default useDrag;
