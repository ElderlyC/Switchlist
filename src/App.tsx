import { useState, ChangeEvent } from "react";
import { Button, TextField, Box, Radio, Typography } from "@mui/material";
import "./App.css";

function App() {
  const [itemList, setItemList] = useState<string>("");
  const [currentItem, setCurrentItem] = useState<string>("");
  const [looping, setLooping] = useState<boolean>(false);
  const [intervalTime, setIntervalTime] = useState<number>(1);
  const [isRandom, setRandom] = useState<Boolean>(false);
  const [selectedRadio, setSelectedRadio] = useState<string>("loop");

  const totalTime = parseFloat(
    (itemList.split("\n").filter(Boolean).length * intervalTime).toFixed(2)
  );

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

    if (isRandom) {
      const getRandomValue = () => Math.random() - 0.5;
      itemsArray.sort(getRandomValue);
    }

    if (itemsArray.length > 0) {
      setLooping(true);
      setCurrentItem(itemsArray[0]);
      let currentIndex = 1;

      const intervalId = setInterval(() => {
        if (currentIndex < itemsArray.length) {
          setCurrentItem(itemsArray[currentIndex]);
          currentIndex += 1;
        } else {
          clearInterval(intervalId);
          setCurrentItem("");
          setLooping(false);
        }
      }, intervalTime * 1000);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {!looping && (
          <div>
            <Typography variant="h1">SwitchList</Typography>
            <Typography variant="h5" sx={{ marginBottom: "20px" }}>
              Enter a list of anything, set the intervals, then start the loop.
            </Typography>
            <Box
              sx={{
                backgroundColor: "transparent",
                color: "black",
                fontSize: "1.5rem",
              }}
            >
              <TextField
                id="itemlist"
                label="Enter list items separated by line"
                multiline
                rows={10}
                variant="outlined"
                fullWidth
                value={itemList}
                onChange={handleChange}
                InputProps={{
                  sx: {
                    lineHeight: "30px",
                    textarea: { fontSize: "1.5rem" },
                  },
                }}
              />
              <Box
                sx={{
                  border: "rgba(0, 0, 0, 0.23) solid 1px",
                  borderRadius: "3px",
                  marginBottom: "10px",
                }}
              >
                <Box sx={{ margin: "20px 0px 15px" }}>
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
                    sx={{ marginLeft: "20px" }}
                  />
                  <label htmlFor="random">Random</label>
                </Box>
                <Box
                  sx={{
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
                      },
                      step: 0.1,
                      min: 0.1,
                    }}
                  />
                  {` second${intervalTime !== 1 ? "s" : ""}`}
                </Box>
                <Box sx={{ margin: "20px 0px 30px" }}>
                  {`Total Time: ${totalTime} second${
                    totalTime === 1 ? "" : "s"
                  }`}
                </Box>
              </Box>
            </Box>
            <Button
              onClick={handleStart}
              variant="contained"
              color="primary"
              size="large"
            >
              Start!
            </Button>
          </div>
        )}
        <Box sx={{ fontSize: "3rem" }}>{currentItem}</Box>
      </header>
    </div>
  );
}

export default App;
