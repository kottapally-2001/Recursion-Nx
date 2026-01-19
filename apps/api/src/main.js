import express from "express";
import cors from "cors";

const app = express();
app.use(cors({ origin: "*" }));

// ---- Fibonacci (Iterative) ----
function fibs(n) {
  n = Number(n);
  if (!Number.isFinite(n) || n < 1) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];

  const a = [0, 1];
  for (let i = 2; i < n; i++) {
    a.push(a[i - 1] + a[i - 2]);
  }
  return a;
}

// ---- Fibonacci (Recursive) ----
function fibsRec(n) {
  n = Number(n);
  if (!Number.isFinite(n) || n < 1) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];

  const r = fibsRec(n - 1);
  r.push(r[r.length - 1] + r[r.length - 2]);
  return r;
}

// ---- Merge Sort ----
function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (Number(left[i]) <= Number(right[j])) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  while (i < left.length) result.push(left[i++]);
  while (j < right.length) result.push(right[j++]);

  return result;
}

function mergeSort(arr) {
  if (!Array.isArray(arr)) return [];
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  return merge(
    mergeSort(arr.slice(0, mid)),
    mergeSort(arr.slice(mid))
  );
}

// ---- Routes ----

// ITERATIVE FIB
app.get("/fib/:n", (req, res) => {
  const n = Number(req.params.n);
  if (!Number.isInteger(n) || n < 1) {
    return res.status(400).json({ error: "n must be a positive integer >= 1" });
  }
  res.json(fibs(n));
});

// RECURSIVE FIB
app.get("/fib-rec/:n", (req, res) => {
  const n = Number(req.params.n);
  if (!Number.isInteger(n) || n < 1) {
    return res.status(400).json({ error: "n must be a positive integer >= 1" });
  }
  res.json(fibsRec(n));
});

// SMART SORT (Digit OR Number List)
app.get("/sort", (req, res) => {
  const raw = req.query.arr;
  if (!raw) return res.json([]);

  // Mode B: comma-separated list
  if (raw.includes(",")) {
    const arr = raw
      .split(",")
      .map(s => Number(s.trim()))
      .filter(n => !isNaN(n));
    return res.json(mergeSort(arr));
  }

  // Mode A: pure digit sorting
  const digits = raw
    .split("")
    .map(n => Number(n))
    .filter(n => !isNaN(n));

  return res.json(mergeSort(digits));
});

// ---- Server ----
app.listen(3001, () => console.log("api on 3001"));
