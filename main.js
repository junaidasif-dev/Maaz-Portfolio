/**
 * ============================================================================
 * MAAZ SAQIB — PORTFOLIO ENGINE (main.js)
 * High-Converting Interactions, 3D Device Tilts, Modals & Lead Gen
 * ============================================================================
 */

// ==========================================
// 1. CONFIGURATION (Easy Link Updates)
// ==========================================
const CONFIG = {
  // Replace this with your actual Google Drive proof vault folder link anytime:
  DRIVE_VAULT_URL: "https://drive.google.com/drive/folders/1_MaazSaqib_PortfolioProof_Vault",
  
  // Contact details:
  PHONE_NUMBER: "923317671336",
  EMAIL: "maazsaqib80@gmail.com",
  LINKEDIN: "https://www.linkedin.com/in/maaz-saqib-209352246",
  INSTAGRAM_FACTIFY: "https://www.instagram.com/thefactify.pk?stkn=NnlkOXptdGN3MTJu&utm_source=qr"
};

document.addEventListener("DOMContentLoaded", () => {
  initCursor();
  initHeader();
  initCounters();
  initProofFilter();
  initProofModal();
  initVaultModal();
  init3DTilt();
  initCaseStudyTabs();
  initContactForm();
});

// ==========================================
// 2. CUSTOM CURSOR (Desktop Only)
// ==========================================
function initCursor() {
  const dot = document.getElementById("cursorDot");
  const outline = document.getElementById("cursorOutline");
  if (!dot || !outline) return;

  let mouseX = 0;
  let mouseY = 0;
  let outlineX = 0;
  let outlineY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    outline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateOutline);
  }
  animateOutline();

  // Hover effect over interactive elements
  const interactives = document.querySelectorAll("a, button, input, select, textarea, .proof-card, .tool-chip, .case-tab-btn");
  interactives.forEach(el => {
    el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });
}

// ==========================================
// 3. HEADER & MOBILE MENU
// ==========================================
function initHeader() {
  const header = document.getElementById("siteHeader");
  const toggle = document.getElementById("mobileToggle");
  const menu = document.getElementById("navMenu");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("open");
    });

    // Close when clicking nav link
    menu.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => menu.classList.remove("open"));
    });
  }
}

// ==========================================
// 4. ANIMATED METRICS COUNTER
// ==========================================
function initCounters() {
  const counters = document.querySelectorAll(".ribbon-val[data-target]");
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute("data-target"));
        const suffix = el.textContent.replace(/[\d.]/g, "");
        let current = 0;
        const step = target / 40;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = (Number.isInteger(target) ? Math.floor(current) : current.toFixed(1)) + suffix;
        }, 30);

        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// ==========================================
// 5. 3D INTERACTIVE TILT EFFECT
// ==========================================
function init3DTilt() {
  // Hero 3D Card
  const heroCard = document.getElementById("hero3DCard");
  if (heroCard) {
    applyTilt(heroCard, 14);
  }

  // All proof cards
  const proofWrappers = document.querySelectorAll(".proof-3d-wrapper");
  proofWrappers.forEach(wrap => {
    applyTilt(wrap, 10);
  });

  function applyTilt(element, maxAngle) {
    element.addEventListener("mousemove", (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxAngle;
      const rotateY = ((x - centerX) / centerX) * maxAngle;

      element.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(12px)`;
    });

    element.addEventListener("mouseleave", () => {
      element.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    });
  }
}

// ==========================================
// 6. PROOF FILTER TABS
// ==========================================
function initProofFilter() {
  const tabs = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".proof-card");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const filter = tab.getAttribute("data-filter");
      cards.forEach(card => {
        const categories = card.getAttribute("data-category") || "";
        if (filter === "all" || categories.includes(filter)) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
}

// ==========================================
// 7. PROOF LIGHTBOX MODAL
// ==========================================
function initProofModal() {
  const modal = document.getElementById("proofModal");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const modalSubtitle = document.getElementById("modalSubtitle");
  const closeBtn = document.getElementById("modalCloseBtn");
  const backdrop = document.getElementById("modalBackdrop");
  const modalVaultBtn = document.getElementById("modalVaultBtn");
  if (!modal) return;

  const proofCards = document.querySelectorAll(".proof-card");
  proofCards.forEach(card => {
    card.addEventListener("click", () => {
      const imgSrc = card.getAttribute("data-modal");
      const title = card.getAttribute("data-title") || "Verified Analytics";
      const subtitle = card.getAttribute("data-subtitle") || "Creator Studio Performance Screenshot";

      if (modalImg && imgSrc) modalImg.src = imgSrc;
      if (modalTitle) modalTitle.textContent = title;
      if (modalSubtitle) modalSubtitle.textContent = subtitle;

      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);

  if (modalVaultBtn) {
    modalVaultBtn.addEventListener("click", () => {
      closeModal();
      openVaultModal();
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });
}

// ==========================================
// 8. DRIVE VAULT POPUP MODAL
// ==========================================
function openVaultModal() {
  const vaultModal = document.getElementById("vaultModal");
  if (!vaultModal) return;
  vaultModal.classList.add("open");
  vaultModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeVaultModal() {
  const vaultModal = document.getElementById("vaultModal");
  if (!vaultModal) return;
  vaultModal.classList.remove("open");
  vaultModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function initVaultModal() {
  const vaultModal = document.getElementById("vaultModal");
  const closeBtn = document.getElementById("vaultCloseBtn");
  const backdrop = document.getElementById("vaultBackdrop");
  const dismissBtn = document.getElementById("vaultDismissBtn");
  const copyBtn = document.getElementById("driveCopyBtn");
  const bannerCopyBtn = document.getElementById("copyVaultBtn");
  const driveUrlInput = document.getElementById("driveUrlInput");
  const driveDirectLink = document.getElementById("driveDirectLink");

  // Sync configured URL
  if (driveUrlInput) driveUrlInput.value = CONFIG.DRIVE_VAULT_URL;
  if (driveDirectLink) driveDirectLink.href = CONFIG.DRIVE_VAULT_URL;

  // Trigger buttons
  const triggerIds = ["navVaultBtn", "heroVaultBtn", "bannerVaultBtn"];
  triggerIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openVaultModal();
      });
    }
  });

  if (closeBtn) closeBtn.addEventListener("click", closeVaultModal);
  if (backdrop) backdrop.addEventListener("click", closeVaultModal);
  if (dismissBtn) dismissBtn.addEventListener("click", closeVaultModal);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && vaultModal && vaultModal.classList.contains("open")) {
      closeVaultModal();
    }
  });

  // Copy Vault Link Handlers
  function copyLink(btnElement) {
    navigator.clipboard.writeText(CONFIG.DRIVE_VAULT_URL).then(() => {
      const originalHTML = btnElement.innerHTML;
      btnElement.innerHTML = `<i class="fa-solid fa-check"></i> <span>Copied!</span>`;
      setTimeout(() => {
        btnElement.innerHTML = originalHTML;
      }, 2200);
    }).catch(err => {
      console.error("Failed to copy URL:", err);
    });
  }

  if (copyBtn) copyBtn.addEventListener("click", () => copyLink(copyBtn));
  if (bannerCopyBtn) bannerCopyBtn.addEventListener("click", () => copyLink(bannerCopyBtn));
}

// ==========================================
// 9. CASE STUDY TABS (FACTIFY)
// ==========================================
function initCaseStudyTabs() {
  const tabBtns = document.querySelectorAll(".case-tab-btn");
  const tabContents = document.querySelectorAll(".case-tab-content");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-tab");

      tabBtns.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      const targetContent = document.getElementById(`tab-${targetTab}`);
      if (targetContent) {
        targetContent.classList.add("active");
      }
    });
  });
}

// ==========================================
// 10. INTERACTIVE LEAD GENERATION FORM
// ==========================================
function initContactForm() {
  const form = document.getElementById("projectInquiryForm");
  const emailBtn = document.getElementById("emailDraftBtn");

  if (!form) return;

  // WhatsApp Submission (Instant)
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("clientName").value.trim();
    const service = document.getElementById("serviceSelect").value;
    const details = document.getElementById("projectDetails").value.trim();

    const message = `👋 Hi Maaz! My name is ${name}.\n\n🎯 *Service Interested:* ${service}\n\n📝 *Project Goals:* ${details || "Let's discuss further on a call/chat."}\n\nLooking forward to hearing from you!`;

    const waUrl = `https://wa.me/${CONFIG.PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  });

  // Direct Email Draft Handler
  if (emailBtn) {
    emailBtn.addEventListener("click", () => {
      const name = document.getElementById("clientName").value.trim() || "Prospective Client";
      const service = document.getElementById("serviceSelect").value;
      const details = document.getElementById("projectDetails").value.trim();

      const subject = `Project Inquiry: ${service} (${name})`;
      const body = `Hi Maaz,\n\nMy name is ${name}.\n\nI am interested in: ${service}\n\nProject details:\n${details || "We'd like to discuss our monthly content/growth needs."}\n\nBest regards,\n${name}`;

      const mailtoUrl = `mailto:${CONFIG.EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;
    });
  }
}
