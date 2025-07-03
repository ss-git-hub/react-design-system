# React Design System

A modern, accessible, and customizable **React Design System** built with [React](https://react.dev/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/), and [react-aria-components](https://react-spectrum.adobe.com/react-aria/react-aria-components.html).  
This project provides a robust foundation for building consistent, reusable UI components for your applications.

---

## 🚀 Main Technologies

- **React** – UI library for building interactive interfaces
- **Vite** – Modern build tool and dev server
- **TypeScript** – Static typing for safer, scalable code
- **react-aria-components** – Accessible primitives for building custom UI
- **SCSS Modules** – Scoped, maintainable component styles

---

## 📦 Getting Started

### Prerequisites

- You must have Node.js 20. Use nvm to install and use different node versions.

### 1. **Install dependencies**

```bash
npm install
```

### 2. **Run the development server**

```bash
npm run dev
```

### 3. **Run tests**

```bash
npm run test
```

### 3. **Build for production**

```bash
npm run build
```

### 4. **Lint the code**

```bash
npm run lint
```

### Input

A customizable, accessible text input component.

### Example

```bash
<Input
  label="Username"
  name="username"
  ariaLabel="Username input"
  value={username}
  onChange={e => setUsername(e.target.value)}
  required
  minLength={3}
  maxLength={20}
/>
```

### Button

A flexible, accessible button component with variants and icon support.

### Example

```bash
<Button
  size="md"
  variant="contained"
  color="primary"
  onClick={() => alert('Clicked!')}
>
  Submit
</Button>
```

### NumberInput

A numeric input with increment/decrement logic and validation.

### Example

```bash
<NumberInput
  label="Size (GB)"
  value={size}
  min={0}
  max={100}
  onChange={setSize}
/>
```

### Slider

An accessible slider for selecting a value or range.

### Example

```bash
<Slider
  label="Volume"
  min={0}
  max={100}
  value={volume}
  onChange={setVolume}
/>
```
