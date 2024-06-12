## สรุปเนื้อหา

### `Fundamentals`
- `JSON.parse()` : สำหรับแปลง string เป็น object หรือ แปลง object เป็น array
- `JSON.stringify()` : สำหรับแปลงข้อมูลJSON เป็น string
- `React.lazy()` : เป็นฟังก์ชันที่โหลดคอมโพนนต์ (component) แบบ lazy-loading โดยสามารถแยกคอมโพนนต์เหล่านั้นออกไปจากโค้ดหลักและโหลดมันเฉพาะตอนที่มีการใช้งานจริงเท่านั้น โดยไม่ต้องโหลดคอมโพนนต์ทั้งหมดในการเริ่มต้นแอปพลิเคชัน
- `Route` : 
    - Static Route : 
        - สร้างหน้าของเว็บไซต์ที่ตรงกับ URL ที่กำหนดไว้
        - ทุก URL จะมีหน้าที่ตรงกับตำแหน่งของไฟล์ในโครงสร้างโฟลเดอร์
        - URL ที่เป็นรูปแบบคงที่ ไม่มีการเปลี่ยนแปลงบ่อย และไม่ต้องการข้อมูลแบบแอคทีฟ
        - ex. /about, /contact, /blog
    - Dynamic Route : 
        - สร้างหน้าของเว็บไซต์ตาม URL ที่มีลักษณะแปรปรวน ซึ่งมีส่วนที่เปลี่ยนแปลงได้ หรือมีพารามิเตอร์ต่างๆ
        - แต่ละ URL อาจจะมีหน้าที่ตรงกับไฟล์ในโฟลเดอร์เดียวกัน แต่มีการกำหนดพารามิเตอร์ต่าง ๆ ใน URL ที่ต่างกัน
        - ex. /products/[id], /posts/[slug], /users/[username]
- `Pages router` :
    - `Project Structure` : สร้าง file ที่เราต้องการให้ มี route ไว้ในโฟล์เดอร์ pages มีไฟล์ชื่อว่า index.tsx
    - `404 page` : จากภาพด้านบนจะเห็นไฟล์ชื่อ 404.tsx ซึ่งก็คือไฟล์ที่ไว้ใช้ในการ custom handle error เมื่อ path ผิดนั่นเอง
    - `Fetch data` : การ fetch แบบ server-side ซึ่งวิธีสังเกตง่าย ๆ คือ ลองใช้ console.log(data) ดูก็จะเห็นว่า log ของเราจะไม่แสดงที่ browser(client) แต่จะแเสดงที่ comand line แทน

        - getServerSideProps: เป็นฟังก์ชันที่ใช้ใน Next.js เพื่อดึงข้อมูลจากแหล่งภายนอกทุกครั้งที่มีการเข้าถึงหน้าเว็บ ทำงานบนฝั่งเซิร์ฟเวอร์ และสามารถสร้างหน้าเว็บไซต์ที่มีข้อมูลที่ถูกปรับปรุงแบบแอคทีฟได้

        - getStaticProps: เป็นฟังก์ชันที่ใช้ใน Next.js เพื่อ pre-render หน้าเว็บด้วยข้อมูลที่ถูกดึงมาจากแหล่งภายนอก ทำงานบนฝั่งเซิร์ฟเวอร์ และสร้างหน้าเว็บที่ถูกเก็บไว้ล่วงหน้าเพื่อการโหลดเว็บไซต์ที่รวดเร็วและมีประสิทธิภาพ

        - getStaticPaths: เป็นฟังก์ชันที่ใช้ใน Next.js เพื่อระบุ paths ที่ต้องการ pre-render ไว้ล่วงหน้าด้วย getStaticProps ซึ่งใช้งานร่วมกันเพื่อสร้างหน้าเว็บสำหรับ paths ที่เปลี่ยนแปลงได้หรือมีจำนวนมากโดยอัตโนมัติ

        - getStaticProps() + getStaticPath() ไว้ใช้กับ static web ซึ่งมันจะสร้าง HTML page ไว้ตั้งแต่ตอน build

- `App Router` : 
    - `Project Structure` : สร้าง file ที่เราต้องการให้ มี route ไว้ในโฟล์เดอร์ app แทน pages มีไฟล์จาก index.tsx เป็น page.tsx แทน
    - `fetch data` : สามารถเรียก fetch ใน โฟลเดอร์ app/page.js ได้เลย เพราะว่าใน app router component หรือ ไฟล์ ที่เราสร้าง จะเป็น server-component (default) และถ้าเราจะใช้พวก client state ต่างๆ เราจะต้อง ประกาศ ‘use client’ ไว้ที่ด้านบนสุดของไฟล์นั้นๆ
    - `not-found page` : ตัวนี้จะทำงานคล้าย ๆ ตัว 404.tsx ใน pages router ต่างกันตรงที่ชื่อไฟล์ต้องเป็นคำว่า not-found เท่านั้น
    - เพิ่ม Metadata เข้ามาเพื่อช่วยประกาศค่า meta นี้ โดยเราสามารถสร้างตัวแปรชื่อ metadata แล้วคืนกลับจากไฟล์ pages.ts หรือ layout.ts ได้ เช่น ถ้าต้องการให้ทุก ๆ หน้าของเพจเรามี title และ description
    - Route Groups :
        โดยปกติแล้วถ้าเราสร้าง folder ไว้ใน app นั่นจะหมายความว่าเราต้องการให้ next js สร้าง route นั้นขึ้นมา แต่ถ้าเกิดว่าเราต้องการแค่ folder ไว้เก็บของในนั้นโดยที่ไม่อยากให้มันรก(ช่วยจดระเบียบ folder ไม่สร้าง route เพิ่ม) => (folderName)/about/page.tsx 
    - Nesting Layouts : เเยก layout.tsx ตาม route ได้

### `Rendering`
- `Suspense` : เป็นคอมโพเนนต์ใน React ที่ช่วยในการจัดการกับการโหลดข้อมูลแบบ lazy หรือข้อมูลที่จำเป็นต้องใช้เวลาในการโหลด เพื่อให้แสดง fallback content ในขณะที่ข้อมูลกำลังถูกโหลดอยู่ ซึ่งมักจะเป็นข้อความ "Loading..." หรือการแสดงอินดิเคเตอร์ให้ผู้ใช้รู้ว่าเว็บไซต์กำลังโหลดข้อมูลอยู่.
- `Server component` : 
    - มีการ set default component ให้เป็น server side ทั้งหมด ดังนั้นถ้าเราพยายามใช้ browser api หรือ useState, useEffect ต้อง declare “use client” ไว้บนสุดของ file นั้นเสมอ
    - ไม่ต้องเขียน function getServerSideProps, getStaticProps ให้เมื่อยมืออีกต่อไป. โดยทาง nextjs จะย้าย 2 function ข้างต้นมาไว้ใน fetch แทน. ใช่ครับ fetch ของ pure js ดังนี้
    ```bach
    1. getStaticProps เปลี่ยนเป็น fetch(URL, { cache: 'force-cache' }) // default ของ nextjs จะเป็นตัวนี้เมื่อใช้ fetch
    2. getServerSideProps เปลี่ยนเป็น fetch(URL, { cache: 'no-store' }) // ยิง api ใหม่ตลอดเมื่อ route มายังหน้านี้
    3. fetch(URL, { next: { revalidate: 10 }}) // เก็ย cache ไว้ 10 วิ
    ```
    - metadata (SEO) :
        - สามารถทำ SEO ได้ง่ายๆ ตาม route(page) โดยการประกาศ ตัวแปร metadata แต่อย่าลืมนะว่ามันทำงานเฉพาะ server component เท่านั้น
        - ให้รองรับการทำ(SEO) dynamic route 
        ```bash
        export async function generateMetadata({ params}: any) {
            return { title: params.id, .... }
            }
        ```
### `SEO`