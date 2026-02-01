

## Implementation Plan

### Part 1: Revert Contact Information

Update WhatsApp number and email across **7 files** back to the original values:

| File | Current → New |
|------|---------------|
| `src/pages/Contact.tsx` | WhatsApp: `12344528385` → `12495275672`, Email: `alexdesmond067@gmail.com` → `globaltechrecovery134@gmail.com` |
| `src/components/Hero.tsx` | WhatsApp link update |
| `src/components/Footer.tsx` | WhatsApp link update |
| `src/components/FloatingWhatsApp.tsx` | WhatsApp link update |
| `src/pages/ServicesPage.tsx` | WhatsApp link update |
| `src/pages/Index.tsx` | WhatsApp link update |
| `src/pages/HowItWorks.tsx` | WhatsApp link update |

**Contact Details:**
- **WhatsApp:** +1 (249) 527-5672 / `wa.me/12495275672`
- **Email:** globaltechrecovery134@gmail.com

---

### Part 2: Add Scroll-to-Top Button

**Create `src/components/ScrollToTop.tsx`**

A floating button that:
- Appears when user scrolls down 300+ pixels
- Smoothly fades in/out using framer-motion
- Scrolls to top with smooth behavior on click
- Positioned in bottom-right corner (above the floating WhatsApp button)
- Uses consistent neon styling to match the design system
- Icon: ChevronUp from lucide-react

**Update `src/App.tsx`**

Add the `ScrollToTop` component alongside the existing `FloatingWhatsApp` component so it's available on all pages.

---

### Technical Details

**ScrollToTop Component Structure:**
```text
┌─────────────────────────────────┐
│  useState for visibility        │
│  useEffect with scroll listener │
│  AnimatePresence for animation  │
│  motion.button with variants    │
│  window.scrollTo on click       │
└─────────────────────────────────┘
```

**Positioning:**
- Fixed position: bottom-right
- Stacked above FloatingWhatsApp (z-index management)
- Mobile-friendly touch target (44x44px minimum)

**Animation:**
- Initial: opacity 0, scale 0.8
- Animate: opacity 1, scale 1
- Exit: opacity 0, scale 0.8
- Transition: 0.2s ease-out

