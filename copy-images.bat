@echo off
echo ===================================
echo Image Copy Helper for Your Website
echo ===================================
echo.
echo This will help you copy your paintings to the website.
echo.
echo Instructions:
echo 1. Place this file in the same folder as your images
echo 2. Double-click on this file to run it
echo 3. It will copy your images to the correct location
echo.
echo Press any key to continue...
pause > nul

echo.
echo Copying your paintings to the website...

:: Copy all the images with the correct names
if exist painting1.jpg copy /Y painting1.jpg "images\painting1.jpg"
if exist painting2.jpg copy /Y painting2.jpg "images\painting2.jpg" 
if exist painting3.jpg copy /Y painting3.jpg "images\painting3.jpg"
if exist painting4.jpg copy /Y painting4.jpg "images\painting4.jpg"
if exist painting5.jpg copy /Y painting5.jpg "images\painting5.jpg"
if exist painting6.jpg copy /Y painting6.jpg "images\painting6.jpg"

:: Copy any image as hero background if it exists
if exist hero-bg.jpg copy /Y hero-bg.jpg "images\hero-bg.jpg"

echo.
echo Images copied successfully!
echo.
echo Now open index.html to see your website with your paintings.
echo.
echo Press any key to exit...
pause > nul 