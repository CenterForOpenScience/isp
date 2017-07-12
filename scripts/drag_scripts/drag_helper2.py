import pyautogui

pyautogui.PAUSE = .05
print (pyautogui.position())

positions = []


print("input top sections")
input("1")

left_position = pyautogui.position()


input("2")

center_position = pyautogui.position()


input("3")

right_position = pyautogui.position()


print("input bottom sections")

for i in range(9):
    input(i)
    positions.append(pyautogui.position())


for i, x in zip([3, 6, 11, 10], range(4)):
    offset = (- left_position[0] + positions[x][0], - left_position[1] + positions[x][1])

    for k in range(i):
        pyautogui.moveTo(left_position[0], left_position[1], .1)
        pyautogui.click()
        pyautogui.dragRel(offset[0], offset[1], .1, button='left')
        pyautogui.click()

for i, x in zip([5, 20, 5], range(3, 6)):
    offset = (- center_position[0] + positions[x][0], - center_position[1] + positions[x][1])

    for k in range(i):
        pyautogui.moveTo(center_position[0], center_position[1], .1)
        pyautogui.click()
        pyautogui.dragRel(offset[0], offset[1], .1, button='left')
        pyautogui.click()


for i, x in zip([10, 11, 6, 3], range(5, 9)):
    offset = (- right_position[0] + positions[x][0], - right_position[1] + positions[x][1])

    for k in range(i):
        pyautogui.moveTo(right_position[0], right_position[1], .1)
        pyautogui.click()
        pyautogui.dragRel(offset[0], offset[1], .1, button='left')
        pyautogui.click()
