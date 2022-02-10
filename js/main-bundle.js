/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/

Array.prototype.forEach.call(document.querySelectorAll('input[type="range"]'), range => {
    range.nextElementSibling && (range.nextElementSibling.innerHTML = range.value);
});
document.querySelectorAll('input[type="range"]').forEach(el => {
    el.addEventListener('input', event => {
        el.nextElementSibling && (el.nextElementSibling.innerHTML = el?.value);
    });
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRTtJQUNyRixLQUFLLENBQUMsa0JBQWtCLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNqRixDQUFDLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUM1RCxFQUFFLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFO1FBQ25DLEVBQUUsQ0FBQyxrQkFBa0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLEdBQUksRUFBdUIsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMvRixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmlib25hY2NpLXBhdHRlcm5zLy4vc3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFt0eXBlPVwicmFuZ2VcIl0nKSwgcmFuZ2UgPT4ge1xuICByYW5nZS5uZXh0RWxlbWVudFNpYmxpbmcgJiYgKHJhbmdlLm5leHRFbGVtZW50U2libGluZy5pbm5lckhUTUwgPSByYW5nZS52YWx1ZSk7XG59KTtcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cInJhbmdlXCJdJykuZm9yRWFjaChlbCA9PiB7XG4gIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZXZlbnQgPT4ge1xuICAgIGVsLm5leHRFbGVtZW50U2libGluZyAmJiAoZWwubmV4dEVsZW1lbnRTaWJsaW5nLmlubmVySFRNTCA9IChlbCBhcyBIVE1MSW5wdXRFbGVtZW50KT8udmFsdWUpO1xuICB9KTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9