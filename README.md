# 🚀 Interactive GSAP Resume & Portfolio

> **Live Demo:** [View My Professional Portfolio](https://sahil-2526.github.io/Resume/)

A high-performance, visually engaging resume website built with **React**, **GSAP**, and **Tailwind CSS**. This project serves as my professional portfolio, focusing on high-end motion design and complex frontend architecture.

---

## ✨ Key Features

* **Custom Transition Engine:** A specialized GSAP `clip-path` reveal that stacks sections seamlessly, preventing "white-screen" flashes.
* **Scroll-Driven Storytelling:** Uses `ScrollTrigger` pinning to lock sections in place during transitions, creating a cinematic narrative flow.
* **Performance Optimized:** Utilizing `useGSAP` for memory management and hardware-accelerated transforms to maintain **60fps**.
* **Handoff Logic:** Custom logic to toggle between `fixed` and `relative` positioning, ensuring internal page scrolls and buttons remain fully functional.

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | React.js (Hooks & Context API) |
| **Animation** | GSAP (GreenSock), ScrollTrigger |
| **Styling** | Tailwind CSS |
| **Languages** | JavaScript, C++, Python |

---

## 🕹️ Technical Deep Dive: The Transition Lifecycle

The core of this site is the `PageTransition` component. It solves the common "Ghost Element" problem in GSAP (where invisible layers block clicks) by following a strict lifecycle:

1.  **Mount:** Next section is pre-set to `fixed` with a `circle(0%)` mask.
2.  **Scrub:** The user's scroll progress drives the `clip-path` expansion.
3.  **Handoff:** Upon completion (`onLeave`), the section is released to `position: relative`.
4.  **Cleanup:** Properties are cleared to restore the browser's natural "hit-detection" for buttons and links.

---


## 👨‍💻 About Me

I am a **Computer Science student** at **IIIT Manipur**. I am passionate about solving complex problems—whether it's optimizing DSA challenges or creating fluid UI/UX experiences. 

* **GitHub:** [Sahil-2526](https://github.com/Sahil-2526)
* **Interests:** Web Development, Problem Solving, Basketball, and Traveling.

---