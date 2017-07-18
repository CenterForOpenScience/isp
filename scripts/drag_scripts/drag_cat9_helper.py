import pyautogui

pyautogui.PAUSE = .06  # can make it faster, but can cause issues with placement etc
SPEED = .1
positions = []
print("If you have a dual monitor set up, make sure the browser window is located on your main monitor.\n If you are using a screen and laptop, the laptop is your main monitor.")
print("Please align your browser so you can see all category boxes. While you input and follow these commands, do not move or scroll your browswer window!")
input("Please mouse over the top most draggable option in the left most category box. It should be labeled with 'Uncharacteristic'. Then press return.")
left_position = pyautogui.position()

input("Please mouse over the top most draggable option in the middle category box. It should be labeled with 'Neutral'. Then press return.")
center_position = pyautogui.position()

input("Please mouse over the top most draggable option in the right most category box. It should be labeled with 'Characteristic'. Then press return.")
right_position = pyautogui.position()

print("Now, for each of the bottom category boxes, mouse over them and press return, then move onto the next box. There should be 9 boxes in total.")
for categorynum in range(9):
    input(categorynum)
    positions.append(pyautogui.position())


# the below counts in the array smy look odd, but it was just the easiest way to break the containers. Since the first one needs 3 in it, second needs 6 in it etc..
# it adds up to 30 because at the end of running the script for cat 3, each container will have 30 in it. In the middle part, the 5 is there because that container has
# 5 slots in it left over after 10 are placed in it from the first loop.
# The general idea is, starting on the left, place cards into the containers till full,
# then move onto the next container. if a container fills up or contains no more cards, move onto the next.

# the first array in the zip corresponds to the amount that needs to go in the below containers on cat9,
# and adds up the 30. the range(4) is there to grab the appropriate offset for containers 1-4 etc.
for card_count, pos_count in zip([3, 6, 11, 10], range(4)):
    offset = (- left_position[0] + positions[pos_count][0], - left_position[1] + positions[pos_count][1])
    for k in range(card_count):
        pyautogui.moveTo(left_position[0], left_position[1], SPEED)
        pyautogui.click()
        pyautogui.dragRel(offset[0], offset[1], SPEED, button='left')
        pyautogui.click()

# the first array in the zip corresponds to the amount that needs to go in the below containers on cat9, and adds up the 30.
# the range(3,6) is there to grab the appropriate offset for containers 3-6 etc.
for card_count, pos_count in zip([5, 20, 5], range(3, 6)):
    offset = (- center_position[0] + positions[pos_count][0], - center_position[1] + positions[pos_count][1])
    for k in range(card_count):
        pyautogui.moveTo(center_position[0], center_position[1], SPEED)
        pyautogui.click()
        pyautogui.dragRel(offset[0], offset[1], SPEED, button='left')
        pyautogui.click()

# the first array in the zip corresponds to the amount that needs to go in the below containers on cat9,
# and adds up the 30. the range(4) is there to grab the appropriate offset for containers 5-6 etc.
for card_count, pos_count in zip([10, 11, 6, 3], range(5, 9)):
    offset = (- right_position[0] + positions[pos_count][0], - right_position[1] + positions[pos_count][1])
    for k in range(card_count):
        pyautogui.moveTo(right_position[0], right_position[1], SPEED)
        pyautogui.click()
        pyautogui.dragRel(offset[0], offset[1], SPEED, button='left')
        pyautogui.click()
