Array.prototype.forEach.call(document.querySelectorAll('input[type="range"]'), range => {
  range.nextElementSibling && (range.nextElementSibling.innerHTML = range.value);
});

document.querySelectorAll('input[type="range"]').forEach(el => {
  el.addEventListener('input', event => {
    el.nextElementSibling && (el.nextElementSibling.innerHTML = (el as HTMLInputElement)?.value);
  });
});
