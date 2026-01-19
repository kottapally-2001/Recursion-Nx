"use client";

import { useState } from "react";
import "./styles.css";

function fibs(n) {
  n = Number(n);
  if (n < 1) return [];
  if (n === 1) return [0];
  if (n === 2) return [0,1];
  const a=[0,1];
  for(let i=2;i<n;i++) a.push(a[i-1]+a[i-2]);
  return a;
}

function fibsRec(n) {
  n = Number(n);
  if (n < 1) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];
  const r = fibsRec(n-1);
  r.push(r[r.length-1]+r[r.length-2]);
  return r;
}

function merge(left,right) {
  const out=[],a=left,b=right;
  let i=0,j=0;
  while(i<a.length && j<b.length) out.push(a[i]<=b[j]?a[i++]:b[j++]);
  return out.concat(a.slice(i),b.slice(j));
}

function mergeSort(arr) {
  if(!Array.isArray(arr)) return [];
  if(arr.length<=1) return arr;
  const mid=Math.floor(arr.length/2);
  return merge(
    mergeSort(arr.slice(0,mid)),
    mergeSort(arr.slice(mid))
  );
}

export default function Page() {
  const [n,setN]=useState(10);
  const [arr,setArr]=useState("3,2,1,5");
  const [res,setRes]=useState(null);

  function runSort(input){
    if(!input) return setRes([]);

    // comma list
    if(input.includes(",")){
      const list=input.split(",")
        .map(s=>Number(s.trim()))
        .filter(n=>!isNaN(n));
      return setRes(mergeSort(list));
    }

    // digit sort
    const digits=input.split("")
      .map(Number)
      .filter(n=>!isNaN(n));

    return setRes(mergeSort(digits));
  }

  return (
    <div className="app-root">
      <div className="panel">
        <h1>Algorithms Playground</h1>

        <div className="input-row">
          <input
            value={n}
            onChange={e=>setN(e.target.value)}
            placeholder="Enter N for Fibonacci"
          />
          <div className="btn-row">
            <button onClick={()=>setRes(fibs(n))}>Fib</button>
            <button onClick={()=>setRes(fibsRec(n))}>FibRec</button>
          </div>
        </div>

        <div className="input-row">
          <input
            value={arr}
            onChange={e=>setArr(e.target.value)}
            placeholder="Enter 3,2,1,5 or 45426"
          />
          <div className="btn-row">
            <button onClick={()=>runSort(arr)}>Sort</button>
          </div>
        </div>

        {res && <pre>{JSON.stringify(res,null,2)}</pre>}

        <div className="quote">
          Algorithms are <span>logic</span> turned into motion.
        </div>
      </div>
    </div>
  );
}
