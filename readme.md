หากยังไม่เคย clone ลงไปเลย วิธี clone มีดังนี้
1. สร้าง Folder ลงเครื่องตัวเองโดยใชั
  ``` git clone https://github.com/stsnx/weebking-backend.git```
2. โปรเจกต์นี้ใช้ bootstrap กับ react-router-dom ถ้ารันแล้ว error อาจจะเพราะยังไม่ได้ติดตั้ง วิธีติดตั้งคือ 
  เข้าไปที่โปรเจกต์ เปิด terminal แล้วใช้<br />
  ```npm install bootstrap```<br />
  ```npm install react-router-dom ```<br />
 ลองไปเช็คที่ package.json ว่าติดตั้งสำเร็จหรือไม่ <br />
  ![image](https://user-images.githubusercontent.com/69145525/141767920-c90882eb-7b99-47aa-a48d-0ab16fa03413.png)<br /> (ไม่นับกับอันนี้นะ)<br />
2.1. ช้าก่อน!!! หากเคย clone ไปแล้ว อย่าลืม pull ก่อนจะแบกอะไรด้วย โดยใช้ <br />
``` git pull origin main```
3. เมื่อเรียบร้อยแล้วฝากแบกด้วย<br />
4. เมื่อแบกเสร็จแล้วอยากจะ push ขึ้นมาที่นี่ ให้ทำดังนี้ 
  ```git remote add origin https://github.com/stsnx/nekopedia-front.git ``` (เพื่ม remote repository)<br />
  ```git pull origin``` (pull remote repository)<br />
  ```git add .``` <br />
  ```git commit -m "comment"``` ใน "comment" ไว้ใส่คำอธิบายว่าทำอะไรมา<br />
  ```git checkout -b abcd``` โดย abcd คือชื่อ branch ใหม่ถ้ายังไม่มี หรือ  ```git checkout abcd``` กรณีมี branch แล้ว<br />
  *** สามารถตรวจสอบ branch ได้ด้วย ```git branch -v```***<br />
  ```git push -u origin abcd``` (push to remote repository)<br />
  ***ห้าม push ขี้น Main โดยเด็ดขาด ใคร push ขี้น Main กูตีมือหัก***<br />
 5. เมื่อ push ขี้นมาแล้ว ให้เข้าไปที่ github brouser แล้ว ไปที่ Compare & Pull request <br />
 6. ไปเรียกเจ้าของ repo นี้มาดูแล้วให้มัน merge <br />
 
 สุดท้ายนี้ <br />
 ```แ บ ก ด้ ว ย ค รั บ```
