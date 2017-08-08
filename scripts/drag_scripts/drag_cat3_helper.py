import time

import pyautogui

HESITATE = 3  # time to wait before starting clickstorm
SPEED = .1
pyautogui.PAUSE = .06
positions = []

print("If you have a dual monitor set up, make sure the browser window is "
      "located on your main monitor.\nIf you are using a screen and laptop, "
      "the laptop is your main monitor.\n")

print("Please align your browser so you can see all category boxes. While "
      "you input and follow these commands, do not move or scroll your "
      "browser window!\n")

input("Please put your mouse over the top box, near the middle if possible, "
      "then return.")
center_position = pyautogui.position()

input("Please mouse over the left most box, and press return.")
positions.append(pyautogui.position())

input("Please mouse over the middle box, and press return.")
positions.append(pyautogui.position())

input("Please mouse over the right most box, and press return")
positions.append(pyautogui.position())

print("Please switch back to your browser window. The script will begin "
      "in {} seconds".format(HESITATE))
time.sleep(HESITATE)

offsets = []
for position in positions:
    offset = (- center_position[0] + position[0],
              - center_position[1] + position[1])
    offsets.append(offset)

# cardset is just the next 3 cards, eg, each category gets a card, then do the
# next set, for 90 in total.
for cardset in range(30):
    for offset in offsets:
        pyautogui.moveTo(center_position[0], center_position[1], SPEED)
        pyautogui.click()
        pyautogui.dragRel(offset[0], offset[1], SPEED, button='left')
        pyautogui.click()
