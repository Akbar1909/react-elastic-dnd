import {
  useEffect,
  useRef,
  MouseEvent,
  useState,
  useLayoutEffect,
} from "react";

const inital = {
  pos1: 0,
  pos2: 0,
  pos3: 0,
  pos4: 0,
};

const useDrag = ({ defaultPosition = {} }) => {
  const [mode, setMode] = useState("idle");
  const position = useRef(inital);
  const [translate, setTranslate] = useState({
    top: 0,
    left: 0,
    ...defaultPosition,
  });

  const draggableElRef = useRef(null);

  const onHandleDragMouseDown = (e) => {
    e.preventDefault();

    position.current.pos3 = e.clientX;
    position.current.pos4 = e.clientY;
    setMode("pressed");
    document.addEventListener("mousemove", onHandleMouseMove);
  };

  const onHandleMouseUp = () => {
    setMode("stopped");
    document.removeEventListener("mousemove", onHandleMouseMove);
  };

  const onDragStartHandler = (e) => {
    draggableElRef.current.dataTransfer.dropEffect = "copy";
    console.log("run");
    setMode("test");
  };

  const onHandleMouseMove = (e) => {
    e.preventDefault();

    if (mode === "stopped") return;
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

  useEffect(() => {
    document.addEventListener("mouseup", onHandleMouseUp);

    return () => {
      document.removeEventListener("mouseup", onHandleMouseUp);
      document.removeEventListener("mousemove", onHandleMouseMove);
    };
  }, []);

  useLayoutEffect(() => {
    if (draggableElRef.current && !defaultPosition) {
      setTranslate({
        top: draggableElRef.current.offsetTop,
        left: draggableElRef.current.offsetLeft,
      });
    }
  }, [draggableElRef, defaultPosition]);

  useLayoutEffect(() => {
    if (draggableElRef.current) {
      draggableElRef.current.style.position = "fixed";
      draggableElRef.current.style.top = `${translate.top}px`;
      draggableElRef.current.style.left = `${translate.left}px`;
    }
  }, [translate]);

  useLayoutEffect(() => {
    if (!draggableElRef.current) return;

    draggableElRef.current.addEventListener("mousedown", onHandleDragMouseDown);
    draggableElRef.current.addEventListener("dragstart", onDragStartHandler);
    return () => {
      draggableElRef.current.removeEventListener(
        "mousedown",
        onHandleDragMouseDown
      );

      draggableElRef.current.removeEventListener(
        "dragstart",
        onDragStartHandler
      );
    };
  }, []);

  return {
    ref: draggableElRef,
    mode,
  };
};

export default useDrag;
