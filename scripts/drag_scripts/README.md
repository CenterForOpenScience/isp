# CatThree and CatNine Helper Scripts
## About
These scripts require [pyautogui](http://pyautogui.readthedocs.io/en/latest/index.html) and python 3.
Pyautogui can access the position of the mouse cursor on screen. Once stored, it can click and drag objects between the positions. Here it is used to simplify testing of the CatThree and CatNine sections of the ISP survey.

## OSX install

* Activate virtual environment (if needed)
* $ pip install -r requirements.txt

## Instructions
* Make sure your terminal and browser windows are visible at the same time.
* Navigate the survey to the appropriate section (cat3 or cat9) in the survey on your browser.
* If you are using a dual monitor set up, make sure your browser is in your primary screen. If you are using a laptop and a monitor, your laptop is your primary screen.
* Open terminal and run the specific script (drag_cat3_helper.py corresponds to the first step, cat3. drag_cat9_helper.py corresponds to the seconds step, cat9). 
* Follow the commands printed in the terminal. After the last command is entered, the script will automatically run. While this is happening, do not touch the mouse or keyboard.
* In general for the top containers, you want to aim the cursor in the middle of the top most draggable box before you press enter.
* For the bottom containers, you want to aim the cursor in the middle of the box before you press enter.
* After the script runs, make sure no items are left. Depending on cursor placement during the recording step, one draggable box may still be in a top container.

## Known Problems

#### Window problem
As mentioned above, the script only works on your 'primary' or 'main' screen. Make sure you are running this script on a browser window located on your primary screen. This is an issue with pyautogui and is listed in its documentation.

#### Missing A Box
Occasionally, depending on speed and cursor placement, a box may be missed. If this is the case, you can just drag and drop it into the appropriate container after the script finishes. Changing the speed variables in the scripts can have an effect on this.
```python
pyautogui.PAUSE = .06
SPEED = .1
```

