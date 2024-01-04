import { useState, useEffect, ChangeEvent } from "react";
import { Button, TextField, Box, Radio } from "@mui/material";
import "./App.css";

function App() {
  const [itemList, setItemList] = useState<string>("");
  const [currentItem, setCurrentItem] = useState<string>("");
  const [looping, setLooping] = useState<boolean>(false);
  const [intervalTime, setIntervalTime] = useState<number>(1);
  const [isRandom, setRandom] = useState<Boolean>(false);
  const [selectedRadio, setSelectedRadio] = useState<string>("loop");

  const totalTime = itemList.split("\n").filter(Boolean).length * intervalTime;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setItemList(e.target.value);
  };

  const handleIntervalChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIntervalTime(parseFloat(e.target.value));
  };

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedRadio(e.target.id);
    setRandom(e.target.id === "random");
  };

  const handleStart = () => {
    const itemsArray = itemList.split("\n").filter(Boolean); // Splitting by lines and removing empty strings
    if (itemsArray.length > 0) setLooping(true);

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
            <h5>
              Enter a list of anything, set the intervals, then start the cycle.
            </h5>
            <div>
              <TextField
                id="itemlist"
                label="Enter list items separated by line"
                multiline
                rows={10}
                variant="outlined"
                fullWidth
                value={itemList}
                onChange={handleChange}
                style={{
                  color: "white",
                }}
                InputLabelProps={{
                  style: { color: "white" },
                }}
                InputProps={{ style: { color: "white", border: "green" } }}
              />
              <Box sx={{ border: "lightblue solid 2px" }}>
                <Box style={{ margin: "10px" }}>
                  <Radio
                    id="loop"
                    name="cycling"
                    checked={selectedRadio === "loop"}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="loop">Loop</label>
                  <Radio
                    id="random"
                    name="cycling"
                    checked={selectedRadio === "random"}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="random">Random</label>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {"Interval Time: "}
                  <TextField
                    id="timeInterval"
                    type="number"
                    defaultValue={intervalTime}
                    variant="outlined"
                    onChange={handleIntervalChange}
                    sx={{ width: "80px", margin: "10px" }}
                    inputProps={{
                      style: {
                        fontSize: "1.5rem",
                        background: "white",
                        padding: 5,
                        border: "#469  solid 5px",
                      },
                      step: 0.1,
                    }}
                  />
                  {` second${intervalTime !== 1 ? "s" : ""}`}
                </Box>
                <p>
                  {`Total Time: ${totalTime} second${
                    totalTime === 1 ? "" : "s"
                  }`}
                </p>
              </Box>
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
