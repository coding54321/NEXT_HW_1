from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time
from datetime import datetime
import csv

chromedriver_path = '/Users/kim-gangmin/Desktop/NEXT/Session/NEXT_Session_6/chromedriver-mac-arm64/chromedriver'
user_data_dir = "/Users/kim-gangmin/Desktop/NEXT/HW/NEXT_HW_6/Cache"

chrome_options = Options()
chrome_options.add_argument(f"user-data-dir={user_data_dir}")
service = Service(executable_path=chromedriver_path)

driver = webdriver.Chrome(service=service, options=chrome_options)


driver.get('https://www.kurly.com/collection-groups/market-best?page=1&collection=market-best')
time.sleep(5)

today = datetime.now().strftime('%Y%m%d')
with open(f'{today}_kurly.csv', mode="w", newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(["상품명", "가격", "상품설명"])


    products = driver.find_elements(By.CSS_SELECTOR, 'a.css-8bebpy.e1c07x487')
    for product in products:
        name = product.find_element(By.CSS_SELECTOR, 'span.css-1dry2r1.e1c07x485').text
        price = product.find_element(By.CSS_SELECTOR, 'span.sales-price.css-18tpqqq.ei5rudb1').text
        try:
            description = product.find_element(By.CSS_SELECTOR, 'p.css-1wejlc3.e1c07x483').text
        except:
            description = "설명 없음"
        writer.writerow([name, price, description])

driver.quit()
