import React, { useCallback, useRef, useState } from "react";
import "./App.css";
import produce from "immer";
import ButtonControl from "./components/Button";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

const numRows: number = 10;
const numCols: number = 10;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const createEmtyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

const App: React.FC = () => {
  const [grid, setGrid] = useState(() => {
    return createEmtyGrid();
  });

  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });
    setTimeout(runSimulation, 100);
  }, []);

  const handleStartButton = () => {
    setRunning(!running);
    if (!running) {
      runningRef.current = true;
      runSimulation();
    }
  };
  const handleRandomButton = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(
        Array.from(Array(numCols), () => (Math.random() > 0.5 ? 1 : 0))
      );
    }
    setGrid(rows);
  };
  const handleClearButton = () => {
    setGrid(createEmtyGrid());
  };

  return (
    <>
      <NavBar />
      <img src="https://thietbiketnoi.com/wp-content/uploads/2020/01/tong-hop-hinh-nen-background-vector-designer-dep-do-phan-giai-fhd-2k-4k-moi-nhat-14.jpg" className="bg-content"></img>
      <Container className="text-center mt-4">
        <ButtonControl
          handleStartButton={handleStartButton}
          handleRandomButton={handleRandomButton}
          handleClearButton={handleClearButton}
          running={running}
        ></ButtonControl>
        <div className="d-flex justify-content-center mt-5">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${numCols}, 50px)`,
            }}
            className="grid-content"
          >
            {grid.map((rows, rowIndex) =>
              rows.map((col, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => {
                    const newGrid = produce(grid, (gridCopy) => {
                      gridCopy[rowIndex][colIndex] = grid[rowIndex][colIndex]
                        ? 0
                        : 1;
                    });
                    setGrid(newGrid);
                  }}
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: grid[rowIndex][colIndex]
                      ? "BurlyWood"
                      : undefined,
                    border: "1px solid green",
                  }}
                />
              ))
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default App;
