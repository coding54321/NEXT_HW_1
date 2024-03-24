from bs4 import BeautifulSoup as bs
import requests
from datetime import datetime
from openpyxl import Workbook

url = 'https://noonnu.cc/index?size=31'

try:
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15'}
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        soup = bs(response.text, 'html.parser')
        
        # 폰트 이미지에 대한 태그들을 찾아 폰트 이름 추출 
        font_images = soup.find_all('img', class_='h-full object-contain group-hover-noon-background font-image-preview') 
        font_names = [img['alt'] for img in font_images]
        
        # 제작사 정보 추출
        font_artists = [artist.text.strip() for artist in soup.find_all(class_='text-sm font-bold truncate')] 
        
        # openpyxl Workbook 객체 생성
        wb = Workbook()
        ws = wb.active
        
        ws.append(["순위", "폰트명", "제작"])
        
        for i, (name, artist) in enumerate(zip(font_names, font_artists), start=1):
            ws.append([i, name, artist])
        
        # 오늘 날짜를 'YYYYMMDD' 형식으로 포맷팅
        today = datetime.now().strftime('%Y%m%d')
        
        # 엑셀 파일로 저장
        filename = f'noonnu_chart_{today}.xlsx'
        wb.save(filename)
        print(f"엑셀 파일 저장 완료: {filename}")
    else:
        print(f"Error: HTTP 요청 실패, 상태 코드 :{response.status_code}")
        
except requests.exceptions.RequestException as e:
    print(f"Error: 요청 중 오류 발생. 오류 메세지: {e}")
