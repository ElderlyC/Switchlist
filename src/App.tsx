import { useState, useEffect, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./App.css";

function App() {
  const [itemList, setItemList] = useState<string>("");
  const [currentItem, setCurrentItem] = useState<string>("");
  const [looping, setLooping] = useState<boolean>(false);
  const [intervalTime, setIntervalTime] = useState<number>(1);
  const [isRandom, setRandom] = useState<Boolean>(false);
  const [selectedRadio, setSelectedRadio] = useState<string>("loop");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setItemList(e.target.value);
  };

  const handleIntervalChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIntervalTime(parseInt(e.target.value));
  };

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedRadio(e.target.id);
    setRandom(e.target.id === "random");
  };

  const handleStart = () => {
    const itemsArray = itemList.split("\n").filter(Boolean); // Splitting by lines and removing empty strings
    setLooping(true);

    if (isRandom) {
      const getRandomValue = () => Math.random() - 0.5;
      itemsArray.sort(getRandomValue);
    }

    if (itemsArray.length > 0) {
      setCurrentItem(itemsArray[0]); // Set the initial currentItem
      let currentIndex = 1;

      const intervalId = setInterval(() => {
        if (looping) {
          // If looping is enabled, cycle through the items
          setCurrentItem(itemsArray[currentIndex]);
          currentIndex = (currentIndex + 1) % itemsArray.length;
        } else {
          // If not looping, stop the interval when all items are shown
          if (currentIndex < itemsArray.length) {
            setCurrentItem(itemsArray[currentIndex]);
            currentIndex += 1;
          } else {
            clearInterval(intervalId);
            setCurrentItem(""); // Reset currentItem when done
            setLooping(false);
          }
        }
      }, intervalTime * 1000); // Convert seconds to milliseconds

      // Clear the interval when looping state changes
      return () => clearInterval(intervalId);
    }
  };

  useEffect(() => {
    // Reset currentItem when itemList changes
    setCurrentItem("");
  }, [itemList]);

  return (
    <div className="App">
      <header className="App-header">
        {!looping && (
          <div>
            <h1>SwitchList</h1>
            <p>
              Enter a list of anything, set the intervals, then start the cycle.
            </p>
            <div>
              <textarea
                id="itemlist"
                placeholder="Enter list items separated by line"
                rows={10}
                onChange={handleChange}
                value={itemList}
              ></textarea>
              <div>
                <input
                  type="radio"
                  id="loop"
                  name="cycling"
                  checked={selectedRadio === "loop"}
                  onChange={handleRadioChange}
                />
                <label htmlFor="loop">Loop</label>
                <input
                  type="radio"
                  id="random"
                  name="cycling"
                  checked={selectedRadio === "random"}
                  onChange={handleRadioChange}
                />
                <label htmlFor="random">Random</label>
              </div>
              <div>
                {"Interval Time: "}
                <TextField
                  id="timeInterval"
                  type="number"
                  defaultValue={intervalTime}
                  variant="outlined"
                  onChange={handleIntervalChange}
                  sx={{ width: "100px" }}
                  inputProps={{
                    style: { fontSize: "1.5rem", background: "white" },
                  }}
                />
                {" seconds"}
              </div>
              <p>
                Total Time:{" "}
                {itemList.split("\n").filter(Boolean).length * intervalTime}{" "}
                seconds
              </p>
            </div>
            <Button onClick={handleStart} variant="contained" color="primary">
              Start!
            </Button>
          </div>
        )}
        <div id="currentitem">{currentItem}</div>
      </header>
    </div>
  );
}

export default App;
