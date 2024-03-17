max=int(input("숫자 게임 최댓값을 입력해주세요 : "))
print("1부터",max,"까지의 숫자를 하나 생각하세요.")
input("준비가 되었다면 Enter를 누르세요.")

min_val = 1
max_val = max
attempts = 0

while min_val <=max_val:
  attempts += 1
  mid_val = (min_val + max_val) // 2
  print("당신이 생각한 숫자는",mid_val,"입니까?")
  answer=input("제가 맞췄다면 '맞음', 제가 제시한 숫자보다 크다면 '큼', 작다면 '작음'을 입력해주세요:")

  if answer == "맞음" :
      print(attempts, "번만에 맞췄다")
      break

  elif answer == "큼" :
      min_val = mid_val + 1
  elif answer == "작음" :
      max_val = mid_val -1
  else :
      print("'맞음', '큼', '작음' 중 하나를 입력해주세요.")