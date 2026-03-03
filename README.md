# Notification – Developer Guide

This README is about the **notification feature** and how to work on it.

---

## Install & Run

**1. Install dependencies**

```bash
npm install
```

**2. Start the dev server**

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

**Run on a different port (e.g. if 3000 is in use)**

```bash
PORT=3001 npm run dev
# or
npm run dev -- -p 3001
```

---

## 1. Overview

- The **notification bell** lives in the **header** (top-right).
- Clicking it opens a **dropdown panel** that is currently an **empty template**.
- Your job is to **design and build the notification UI** inside that panel (list, empty state, actions).

---

## 2. Where to Work

| What | File |
|------|------|
| Notification bell + dropdown | `src/components/NotificationBell.tsx` |

All notification UI work happens in this file. No backend integration is required for now; use mock data until you hook up an API.

---

## 3. What’s Already There

- **Bell button** – toggles the panel open/closed.
- **Panel shell** – positioned under the bell, with:
  - A **header** titled “Notifications”.
  - An **empty content area** with `TODO` comments marking where to add the list and empty state.

You only need to **fill in the content area** (and optionally adjust the header).

---

## 4. What You Need to Build

1. **Notification list**
   - One row per notification (e.g. title, description, time, read/unread).
   - Optional: icon/avatar, category, “mark as read” per item.

2. **Empty state**
   - What to show when there are no notifications (e.g. “You’re all caught up” or an illustration).

3. **Optional**
   - “Mark all as read” in the header.
   - Unread count badge on the bell.
   - Tabs or filters (e.g. All / Unread).

---

## 5. Type for Notifications

The file exports a `Notification` type you can use for list items and later for API data:

```ts
type Notification = {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
  category?: "info" | "warning" | "success";
};
```

Use this when you add mock data or connect to an API.

---

## 6. Quick Reference

- **Open/close:** `useState` in `NotificationBell` – no need to change unless you add extra behavior (e.g. close on outside click).
- **Panel:** The dropdown is a single component; style the header and the content `div` as you like.
- **System color:** Use `#1692b3` for primary actions and accents so it matches the rest of the app.

---

## 7. Summary

| Task | Action |
|------|--------|
| Find the UI | Open `src/components/NotificationBell.tsx` |
| Build the list | Add your notification rows in the panel content area (see TODOs in the file) |
| Build empty state | Show a message or component when there are no items |
| Optional | Badge, “Mark all as read”, filters – add in header or content as needed |

Keep everything **inside** `NotificationBell.tsx` (or small subcomponents in the same file) so the notification feature stays in one place.
