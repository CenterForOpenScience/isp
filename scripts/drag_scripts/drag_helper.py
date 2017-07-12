import pyautogui


pyautogui.PAUSE = .05
print (pyautogui.position())

positions = []

input("1")

center_position = pyautogui.position()


input("2")

positions.append(pyautogui.position())


input("3")

positions.append(pyautogui.position())


input("4")

positions.append(pyautogui.position())


offsets = []
for position in positions:
    temp = (- center_position[0] + position[0], - center_position[1] + position[1])
    offsets.append(temp)


for i in range(30):
    for offset in offsets:
        pyautogui.moveTo(center_position[0], center_position[1], .1)
        pyautogui.click()
        pyautogui.dragRel(offset[0], offset[1], .1, button='left')
        pyautogui.click()
