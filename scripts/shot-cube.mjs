import { chromium } from "playwright";
const browser = await chromium.launch({
  args: ["--use-gl=angle", "--enable-webgl", "--ignore-gpu-blocklist", "--enable-gpu"],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 860 }, deviceScaleFactor: 1 });
page.on("pageerror", (e) => console.log("PAGE", e.message));
page.on("console", (msg) => {
  if (msg.type() === "error") console.log("ERR", msg.text());
});
await page.goto("http://127.0.0.1:8080/", { waitUntil: "networkidle" });
await page.waitForTimeout(3200);
const info = await page.evaluate(() => {
  const hero = document.querySelector(".hero");
  const h1 = document.querySelector(".hero h1");
  const sub = document.querySelector(".hero-sub");
  const box = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { t: Math.round(r.top), b: Math.round(r.bottom), l: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height), text: el.innerText.slice(0, 40) };
  };
  return { hero: box(hero), h1: box(h1), sub: box(sub) };
});
console.log(JSON.stringify(info));
await page.screenshot({ path: "/workspace/screenshots/cube-check.png" });
await browser.close();
