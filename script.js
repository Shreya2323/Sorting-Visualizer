let originalArray = [80, 100, 60, 150, 90];

const arrayContainer = document.getElementById("array-container");
const sortedContainer = document.getElementById("sorted-container");
const logBox = document.getElementById("log-box");
const codeBlock = document.getElementById("code-block");
const sortedTitle = document.getElementById("sorted-title");

function getSpeed() {
  return Number(document.getElementById("speed").value);
}

/* Render ONLY original array once */
function renderOriginalArray() {
  arrayContainer.innerHTML = "";
  originalArray.forEach(val => {
    let bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = val + "px";
    bar.innerText = val;
    arrayContainer.appendChild(bar);
  });
}

/* Render sorted / working array */
function renderSortedArray(arr) {
  sortedContainer.innerHTML = "";
  arr.forEach(val => {
    let bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = val + "px";
    bar.innerText = val;
    sortedContainer.appendChild(bar);
  });
}

renderOriginalArray();

function addLog(msg) {
  let p = document.createElement("p");
  p.textContent = msg;
  logBox.appendChild(p);
  logBox.scrollTop = logBox.scrollHeight;
}

function highlightCode(id) {
  document.querySelectorAll(".code-line").forEach(l => l.classList.remove("active"));
  if (document.getElementById(id)) {
    document.getElementById(id).classList.add("active");
  }
}

function sleep() {
  return new Promise(res => setTimeout(res, getSpeed()));
}

function startSort() {
  logBox.innerHTML = "";
  sortedContainer.innerHTML = "";
  sortedTitle.style.display = "block";

  let type = document.getElementById("sortType").value;

  if (type === "bubble") {
    showBubbleCode();
    bubbleSort();
  } else {
    showSelectionCode();
    selectionSort();
  }
}

/* ---------------- BUBBLE SORT ---------------- */

async function bubbleSort() {
  let arr = [...originalArray];
  renderSortedArray(arr);

  for (let i = 0; i < arr.length - 1; i++) {
    highlightCode("b1");

    for (let j = 0; j < arr.length - i - 1; j++) {
      highlightCode("b2");

      let bars = sortedContainer.children;
      bars[j].classList.add("active");
      bars[j + 1].classList.add("active");

      addLog(`Comparing ${arr[j]} and ${arr[j + 1]}`);
      await sleep();

      if (arr[j] > arr[j + 1]) {
        highlightCode("b3");
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        renderSortedArray(arr);
        await sleep();
      }

      bars[j].classList.remove("active");
      bars[j + 1].classList.remove("active");
    }
  }

  addLog("✅ Bubble Sort Done");
}

/* ---------------- SELECTION SORT ---------------- */

async function selectionSort() {
  let arr = [...originalArray];
  renderSortedArray(arr);

  for (let i = 0; i < arr.length - 1; i++) {
    highlightCode("s1");
    let min = i;

    for (let j = i + 1; j < arr.length; j++) {
      highlightCode("s2");

      let bars = sortedContainer.children;
      bars[min].classList.add("active");
      bars[j].classList.add("active");

      await sleep();

      if (arr[j] < arr[min]) {
        highlightCode("s3");
        min = j;
      }

      bars[min].classList.remove("active");
      bars[j].classList.remove("active");
    }

    if (min !== i) {
      highlightCode("s4");
      [arr[i], arr[min]] = [arr[min], arr[i]];
      renderSortedArray(arr);
      await sleep();
    }
  }

  addLog("✅ Selection Sort Done");
}

/* ---------------- CODE DISPLAY ---------------- */

function showBubbleCode() {
  codeBlock.innerHTML = `
<span class="code-line" id="b1">for (i = 0; i &lt; n-1; i++)</span>
<span class="code-line" id="b2">  for (j = 0; j &lt; n-i-1; j++)</span>
<span class="code-line" id="b3">    if (arr[j] &gt; arr[j+1]) swap</span>`;
}

function showSelectionCode() {
  codeBlock.innerHTML = `
<span class="code-line" id="s1">for (i = 0; i &lt; n-1; i++)</span>
<span class="code-line" id="s2">  for (j = i+1; j &lt; n; j++)</span>
<span class="code-line" id="s3">    if (arr[j] &lt; min) min = j</span>
<span class="code-line" id="s4">swap(arr[i], arr[min])</span>`;
}
