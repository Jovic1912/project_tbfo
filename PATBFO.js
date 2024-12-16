function createTape(size) {
    const tapeContainer = document.getElementById("tape");
    tapeContainer.innerHTML = "";
    for (let i = 0; i < size; i++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      tapeContainer.appendChild(cell);
    }
  }
  
  function updateTape(tape, headPosition) {
    const tapeContainer = document.getElementById("tape").children;
    for (let i = 0; i < tapeContainer.length; i++) {
      tapeContainer[i].textContent = tape[i] !== null ? tape[i] : "";
      tapeContainer[i].className = "cell";
      if (i === headPosition) tapeContainer[i].classList.add("head");
    }
  }
  
  async function runTuringMachine() {
    const start = parseFloat(document.getElementById("start").value);
    const diff = parseFloat(document.getElementById("diff").value);
    const terms = parseInt(document.getElementById("terms").value);
    const seriesType = document.getElementById("seriesType").value;
    const statusText = document.getElementById("statusText");
    const currentState = document.getElementById("currentState");
  
    if (isNaN(start) || isNaN(diff) || isNaN(terms)) {
      alert("Masukkan semua input dengan benar!");
      return;
    }
  
    const tape = Array(terms).fill(null);
    let head = 0;
    let state = "q0";
    let currentValue = start;
  
    createTape(tape.length);
    statusText.textContent = "Mesin sedang berjalan...";
    statusText.className = "running";
    currentState.textContent = state;
  
    while (state !== "qf") {
      updateTape(tape, head);
      await new Promise((resolve) => setTimeout(resolve, 500));
  
      switch (state) {
        case "q0":
          tape[head] = currentValue;
          state = "q1";
          currentState.textContent = state;
          break;
        case "q1":
          if (head < terms - 1) {
            head++;
            currentValue = seriesType === "arithmetic" ? currentValue + diff : currentValue * diff;
            state = "q2";
            currentState.textContent = state;
          } else {
            state = "qf";
            currentState.textContent = state;
          }
          break;
        case "q2":
          state = "q0";
          currentState.textContent = state;
          break;
      }
    }
  
    updateTape(tape, head);
    const sum = tape.reduce((acc, val) => acc + (val || 0), 0);
    document.getElementById("result").textContent = 
      `Deret: ${tape.filter((x) => x !== null).join(", ")}`;
    document.getElementById("total").textContent = 
      `Jumlah total deret: ${sum}`;
    statusText.textContent = "Simulasi selesai!";
    statusText.className = "";
  }  